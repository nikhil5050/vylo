"use client";

import { apiFetch } from "@/lib/api";
import { getProductBySlug } from "@/services/product.service";
import { useAuthStore } from "@/store/auth.store";
import { useWishlistStore } from "@/store/wishlist.store";

interface BackendWishlist {
  items: { product_id: number; product_slug: string }[];
}

// The wishlist used to live only in this browser's localStorage
// ("vylore-wishlist"), so it vanished in any other browser — the same problem
// the bag had (see cart-sync.service.ts). The account now keeps a copy
// (backend /wishlist): hearts are mirrored to it while signed in, and the two
// are merged at login. All best-effort: the local wishlist always works on
// its own, and a failed sync must never block the UI or signing in.

const signedIn = () => useAuthStore.getState().token !== null;

export function saveWishlistAdd(productId: string): void {
  if (!signedIn()) return;
  apiFetch("/wishlist/items", { method: "POST", body: { product_id: Number(productId) } }).catch(() => {});
}

export function saveWishlistRemove(productId: string): void {
  if (!signedIn()) return;
  apiFetch(`/wishlist/items/${encodeURIComponent(productId)}`, { method: "DELETE" }).catch(() => {});
}

// Right after login/register: union of this browser's wishlist and the
// account's — nothing hearted on either side is lost.
export async function syncWishlistWithAccount(): Promise<void> {
  try {
    const local = useWishlistStore.getState().items;
    const merged = await apiFetch<BackendWishlist>("/wishlist/merge", {
      method: "POST",
      body: { product_ids: local.map((product) => Number(product.id)) },
    });
    const have = new Set(local.map((product) => product.id));
    const missing = merged.items.filter((item) => !have.has(String(item.product_id)));
    const products = await Promise.all(
      missing.map((item) => getProductBySlug(item.product_slug).catch(() => undefined)),
    );
    const found = products.filter((product): product is NonNullable<typeof product> => product !== undefined);
    if (found.length > 0) useWishlistStore.getState().addMany(found);
  } catch {
    // Offline or backend down — the local wishlist stays as it was.
  }
}
