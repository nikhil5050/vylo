import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BadgeCheckIcon, GemIcon, LockIcon } from "@/components/icons/Icons";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { ProductActions } from "./ProductActions";
import { ProductDescription } from "./ProductDescription";

const trustPoints = [
  { icon: LockIcon, label: "Secure Checkout" },
  { icon: GemIcon, label: "Crafted With Care" },
  { icon: BadgeCheckIcon, label: "No Compromise Promise" },
];

export function ProductInfo({ product }: { product: Product }) {
  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : undefined;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <p className="eyebrow mt-6 text-xs text-muted">{product.category}</p>
      <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">{product.name}</h1>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-xl text-charcoal">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            <span className="text-sm text-burgundy">{discountPercent}% off</span>
          </>
        )}
      </div>

      <ProductDescription description={product.description} />

      <dl className="mt-6 flex flex-col gap-2 text-sm">
        {product.metal && (
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">Metal</dt>
            <dd className="text-charcoal">{product.metal}</dd>
          </div>
        )}
        {product.purity && (
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">Purity</dt>
            <dd className="text-charcoal">{product.purity}</dd>
          </div>
        )}
        {product.weight && (
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">Weight</dt>
            <dd className="text-charcoal">{product.weight}g</dd>
          </div>
        )}
      </dl>

      <div className="mt-8">
        <ProductActions product={product} />
      </div>

      <p className="mt-6 text-sm text-charcoal">
        {product.inStock ? "In Stock" : "Currently Unavailable"}
      </p>

      <div className="mt-2 border-t border-silver/30 pt-4 text-sm text-muted">
        <p>Estimated dispatch: 2–4 business days.</p>
        <p>Exact delivery timelines are confirmed at checkout.</p>
      </div>

      <ul className="mt-6 grid grid-cols-3 divide-x divide-silver/20 border-t border-silver/30 pt-6">
        {trustPoints.map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-center gap-2 px-2 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-charcoal sm:text-xs">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
