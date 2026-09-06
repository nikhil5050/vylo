export type ProductBadge = "NEW" | "BESTSELLER" | "SIGNATURE" | "LIMITED";

export interface ProductImage {
  url: string;
  altText?: string;
}

// Pairs a size label with the backend variant id it resolves to, so the size
// selected on the PDP can be sent to the backend cart as a variant_id instead
// of getting silently dropped (see cart.store.ts's CartLine.variantId).
export interface ProductVariantOption {
  id: string;
  size: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: ProductImage[];
  story?: string;
  metal?: string;
  // purity/weight are left unset until confirmed product data exists — the PDP
  // only renders these rows when a value is present.
  purity?: string;
  weight?: number;
  sizes?: string[];
  variants?: ProductVariantOption[];
  badge?: ProductBadge;
  inStock: boolean;
  collectionSlugs?: string[];
}
