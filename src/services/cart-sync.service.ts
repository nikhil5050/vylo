"use client";

import { apiFetch } from "@/lib/api";
import { syncCartToBackend } from "@/services/checkout.service";
import { getProductBySlug } from "@/services/product.service";
import { useCartStore } from "@/store/cart.store";

interface BackendCartItem {
  product_slug: string;
  variant_id: number | null;
  quantity: number;
}

interface BackendCart {
  items: BackendCartItem[];
}

// The bag lives in this browser's localStorage ("vylore-cart"), so on its own
// it never follows the customer to another browser — e.g. the email
// verification link opening in Gmail's in-app browser, where the bag looked
// "discarded". The account's backend cart is the bridge: checkout already
// writes it (syncCartToBackend) before the verified-email check rejects the
// order. Called right after login/register:
// - this browser has items → save them to the account (they win: they're
//   what the customer was just looking at);
// - this browser's bag is empty → restore whatever the account has saved.
// Best-effort: a failure here must never block signing in.
export async function syncCartWithAccount(): Promise<void> {
  try {
    const { lines, addItem } = useCartStore.getState();
    if (lines.length > 0) {
      await syncCartToBackend(lines);
      return;
    }

    const cart = await apiFetch<BackendCart>("/cart");
    const restored = await Promise.all(
      cart.items.map(async (item) => {
        const product = await getProductBySlug(item.product_slug).catch(() => undefined);
        if (!product || !product.inStock) return null;
        // Same variant_id → {size, id} mapping SharedCartView uses, so the
        // restored line keeps its size and can sync back at checkout.
        const variant =
          item.variant_id != null ? product.variants?.find((v) => v.id === String(item.variant_id)) : undefined;
        return { product, quantity: item.quantity, size: variant?.size, variantId: variant?.id };
      }),
    );

    // Re-check: the customer may have added something while this was loading.
    if (useCartStore.getState().lines.length > 0) return;
    for (const line of restored) {
      if (line) addItem(line.product, { quantity: line.quantity, size: line.size, variantId: line.variantId });
    }
  } catch {
    // Offline, backend down, or no saved cart — the local bag stays as it was.
  }
}

