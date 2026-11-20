"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  EXPRESS_CHECKOUT_ENABLED,
  FALLBACK_URL,
  loadExpressCheckout,
  openExpressCheckout,
} from "@/services/express-checkout.service";
import { type CartLine, useCartStore } from "@/store/cart.store";

// Drives every "Checkout" button. With express checkout on, a click opens the
// Shiprocket popup for the current bag; if anything fails (script blocked,
// item out of stock, Shiprocket down) the customer lands on our own checkout
// instead, so a click never dead-ends.
export function useExpressCheckout() {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const addItem = useCartStore((state) => state.addItem);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    // warm the script so the popup opens without a visible wait — only once
    // there's something to buy, so browsing pages don't load it
    if (EXPRESS_CHECKOUT_ENABLED && lines.length > 0) loadExpressCheckout().catch(() => {});
  }, [lines.length]);

  const start = useCallback(
    async (event: React.MouseEvent) => {
      if (!EXPRESS_CHECKOUT_ENABLED || lines.length === 0 || opening) return;
      event.preventDefault();
      const nativeEvent = event.nativeEvent;
      setOpening(true);
      try {
        await openExpressCheckout(nativeEvent, lines, "bag");
      } catch {
        router.push(FALLBACK_URL);
      } finally {
        setOpening(false);
      }
    },
    [lines, opening, router],
  );

  // Buy Now: the popup for just these lines (one product), bag untouched. If the
  // popup can't open, the product goes into the bag and the customer lands on
  // our own checkout, as Buy Now did before.
  const buyNow = useCallback(
    async (event: React.MouseEvent, buyLines: CartLine[]) => {
      if (opening) return;
      const nativeEvent = event.nativeEvent;
      setOpening(true);
      try {
        await openExpressCheckout(nativeEvent, buyLines, "buy-now");
      } catch {
        for (const line of buyLines) {
          addItem(line.product, { size: line.size, variantId: line.variantId, quantity: line.quantity });
        }
        router.push(FALLBACK_URL);
      } finally {
        setOpening(false);
      }
    },
    [addItem, opening, router],
  );

  return { enabled: EXPRESS_CHECKOUT_ENABLED, start, buyNow, opening };
}
