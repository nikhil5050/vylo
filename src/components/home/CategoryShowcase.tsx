import Link from "next/link";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Category } from "@/types/category";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (categories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:gap-3 lg:grid-cols-6 lg:gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative block aspect-[3/4] w-full max-w-48 overflow-hidden bg-charcoal"
        >
          <ProductThumbnail
            src={category.imageUrl}
            alt={category.name}
            transform="w-600"
            loading="lazy"
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-2 pb-3 text-center text-white sm:px-3 sm:pb-4">
            <h3 className="font-serif text-[11px] uppercase tracking-[0.12em] sm:text-sm">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-1 line-clamp-2 text-[9px] leading-tight text-white/85 sm:text-xs">
                {category.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}