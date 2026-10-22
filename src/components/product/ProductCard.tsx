import Link from "next/link";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { WishlistButton } from "./WishlistButton";

// Cards sit in 2-column grids on mobile and 3–4 columns from lg, inside the
// 1440px container.
const CARD_IMAGE_SIZES = "(min-width: 1440px) 360px, (min-width: 1024px) 33vw, 50vw";

interface ProductCardProps {
  product: Product;
  // Lazy by default; listings pass "eager" for the cards visible on load.
  imageLoading?: "lazy" | "eager";
}

export function ProductCard({ product, imageLoading = "lazy" }: ProductCardProps) {
  const [firstImage, secondImage] = product.images ?? [];

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden" data-cursor="image">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <ProductThumbnail
            src={firstImage?.url}
            alt={firstImage?.altText ?? `${product.name}, ${product.category.toLowerCase()} by Vylore`}
            sizes={CARD_IMAGE_SIZES}
            loading={imageLoading}
            className={`transition-opacity duration-500 ${secondImage ? "group-hover:opacity-0" : "group-hover:scale-[1.03] transition-transform"}`}
          />

          {secondImage && (
            <ProductThumbnail
              src={secondImage.url}
              alt={secondImage.altText ?? `${product.name}, alternate view`}
              sizes={CARD_IMAGE_SIZES}
              // Only seen on hover — no reason to compete with visible images.
              loading="lazy"
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] text-charcoal">
            {product.badge}
          </span>
        )}

        <div className="absolute right-3 top-3">
          <WishlistButton product={product} />
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3 block">
        <p className="eyebrow text-[11px] text-muted">{product.category}</p>
        <h3 className="mt-1 font-serif text-lg text-charcoal transition-colors group-hover:text-burgundy">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className="text-charcoal">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
