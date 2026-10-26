"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveWishlistAdd, saveWishlistRemove } from "@/services/wishlist.service";
import type { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  // merging the account's wishlist in at login (wishlist.service.ts) — local
  // only, those items already exist on the account
  addMany: (products: Product[]) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        set({
          items: exists
            ? get().items.filter((item) => item.id !== product.id)
            : [...get().items, product],
        });
        // mirrored to the account while signed in, so it follows the customer
        if (exists) saveWishlistRemove(product.id);
        else saveWishlistAdd(product.id);
      },
      remove: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
        saveWishlistRemove(productId);
      },
      addMany: (products) => {
        const have = new Set(get().items.map((item) => item.id));
        set({ items: [...get().items, ...products.filter((product) => !have.has(product.id))] });
      },
    }),
    { name: "vylore-wishlist" },
  ),
);
