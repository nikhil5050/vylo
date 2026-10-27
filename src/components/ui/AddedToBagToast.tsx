"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Product } from "@/types/product";

/**
 * Storefront toaster (the admin panel mounts its own, themed one). Top-centre,
 * clear of the sticky header — at the bottom it would sit under the mobile
 * bottom nav and the PDP's sticky Add to Cart bar.
 */
export function StoreToaster() {
  return <Toaster position="top-center" offset={88} mobileOffset={{ top: 72 }} />;
}

interface BagToastContent {
  image?: string;
  // Product name, or a summary when several pieces were added at once.
  subtitle: string;
  details?: string;
}

// White card with a green tick: "Added to Bag", what was added, and a View Bag link.
function showBagToast({ image, subtitle, details }: BagToastContent) {
  toast.custom(
    (id) => (
      <div
        role="status"
        className="flex w-[min(92vw,420px)] items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_20px_50px_-15px_rgba(24,25,22,0.35)] ring-1 ring-silver/40"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
        </span>

        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-moonlight">
          <ProductThumbnail src={image} alt="" sizes="48px" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-charcoal">Added to Bag</span>
          <span className="line-clamp-2 text-xs leading-snug text-muted">{subtitle}</span>
          {details && <span className="block text-[11px] text-muted/80">{details}</span>}
        </span>

        <Link
          href="/cart"
          onClick={() => toast.dismiss(id)}
          className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-burgundy underline-offset-4 hover:underline"
        >
          View Bag
        </Link>

        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          aria-label="Dismiss"
          className="-mr-1 shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-charcoal/5 hover:text-charcoal"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    ),
    { duration: 3500 },
  );
}

/** One product added (PDP, sticky mobile bar, wishlist). */
export function showAddedToBag(product: Product, options: { quantity?: number; size?: string } = {}) {
  const quantity = options.quantity ?? 1;
  const details = [quantity > 1 ? `Qty ${quantity}` : null, options.size ? `Size ${options.size}` : null]
    .filter(Boolean)
    .join(" · ");
  showBagToast({ image: product.images[0]?.url, subtitle: product.name, details: details || undefined });
}

/** A line taken out of the bag (quantity stepped below 1). Same card, no View Bag link. */
export function showRemovedFromBag(product: Product) {
  toast.custom(
    (id) => (
      <div
        role="status"
        className="flex w-[min(92vw,420px)] items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_20px_50px_-15px_rgba(24,25,22,0.35)] ring-1 ring-silver/40"
      >
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-moonlight">
          <ProductThumbnail src={product.images[0]?.url} alt="" sizes="48px" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-charcoal">Product removed from your bag.</span>
          <span className="line-clamp-2 text-xs leading-snug text-muted">{product.name}</span>
        </span>

        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          aria-label="Dismiss"
          className="-mr-1 shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-charcoal/5 hover:text-charcoal"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    ),
    { duration: 3500 },
  );
}

/** Several products added in one go (shared cart's "Add All"); one summary toast. */
export function showAddedManyToBag(products: Product[], skipped = 0) {
  if (products.length === 0) return;
  if (products.length === 1 && skipped === 0) {
    showAddedToBag(products[0]);
    return;
  }
  showBagToast({
    image: products[0].images[0]?.url,
    subtitle:
      products.length === 1
        ? products[0].name
        : `${products.length} pieces from the shared bag`,
    details: skipped > 0 ? `${skipped} couldn't be added` : undefined,
  });
}
