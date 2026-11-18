import { apiFetch } from "@/lib/api";
import type { CartLine } from "@/store/cart.store";

// Shiprocket Checkout ("express checkout"): a one-click popup with phone/OTP
// login, saved addresses and payment through our PayU account. The backend
// creates the session (prices always come from its DB, never from here) and
// imports the finished order; this module only loads Shiprocket's script and
// opens the popup.
//
// Off unless NEXT_PUBLIC_EXPRESS_CHECKOUT=true, so it can ship before the
// Shiprocket account is fully onboarded. Every failure falls back to our own
// /checkout page.
export const EXPRESS_CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_EXPRESS_CHECKOUT === "true";

const SCRIPT_URL = "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js";
const STYLE_URL = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
export const FALLBACK_URL = "/checkout/";

interface HeadlessCheckoutApi {
  addToCart: (event: Event, token: string, options?: { fallbackUrl?: string }) => void;
}

declare global {
  interface Window {
    HeadlessCheckout?: HeadlessCheckoutApi;
  }
}

let assetsPromise: Promise<HeadlessCheckoutApi> | null = null;

export function loadExpressCheckout(): Promise<HeadlessCheckoutApi> {
  if (typeof window === "undefined") return Promise.reject(new Error("Not in a browser"));
  if (window.HeadlessCheckout) return Promise.resolve(window.HeadlessCheckout);
  if (assetsPromise) return assetsPromise;

  assetsPromise = new Promise<HeadlessCheckoutApi>((resolve, reject) => {
    if (!document.querySelector(`link[href="${STYLE_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_URL;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () =>
      window.HeadlessCheckout ? resolve(window.HeadlessCheckout) : reject(new Error("Express checkout did not load"));
    script.onerror = () => reject(new Error("Express checkout did not load"));
    document.body.appendChild(script);
  }).catch((error) => {
    assetsPromise = null; // allow a retry on the next click
    throw error;
  });

  return assetsPromise;
}

interface SessionResponse {
  token: string;
  expires_at: string | null;
  shiprocket_order_id: string | null;
}

// Guests are allowed; a logged-in customer's token is sent automatically so the
// order lands in their account.
export async function createExpressSession(lines: CartLine[]): Promise<string> {
  const session = await apiFetch<SessionResponse>("/shiprocket-checkout/session", {
    method: "POST",
    body: {
      items: lines.map((line) => ({
        product_id: Number(line.product.id),
        variant_id: line.variantId ? Number(line.variantId) : undefined,
        quantity: line.quantity,
      })),
    },
  });
  return session.token;
}

export async function openExpressCheckout(event: Event, lines: CartLine[]): Promise<void> {
  // load the script and create the session in parallel
  const [checkout, token] = await Promise.all([loadExpressCheckout(), createExpressSession(lines)]);
  checkout.addToCart(event, token, { fallbackUrl: FALLBACK_URL });
}

export interface ExpressOrderConfirmation {
  state: "created" | "existing" | "pending" | "failed";
  order_number: string | null;
  order_id: number | null;
}

// Creates our order from Shiprocket's (if the webhook hasn't already) and
// returns its number. `shiprocketOrderId` is the `oid` Shiprocket appends to
// the redirect URL.
export async function confirmExpressOrder(shiprocketOrderId: string): Promise<ExpressOrderConfirmation> {
  return apiFetch<ExpressOrderConfirmation>(
    `/express-checkout/orders/${encodeURIComponent(shiprocketOrderId)}/confirm`,
    { method: "POST", auth: false },
  );
}
