"use client";

import { useLayoutEffect } from "react";
import { isHistoryNavigation } from "@/utils/historyNavigation";

// Opening a product (from the shop grid, related products, search…) always
// starts at the top of the page. Back/Forward is left alone so the browser
// returns the visitor to where they were on that product.
export function ScrollToTopOnOpen() {
  useLayoutEffect(() => {
    if (isHistoryNavigation()) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
