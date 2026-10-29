import Link from "next/link";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Category } from "@/types/category";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (categories.length === 0) return null;

  return (
    // Flex-wrap rather than a grid so a part-filled last row (or fewer than
    // six categories on desktop) sits centred instead of hugging the left.
    <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative block aspect-[3/4] w-[calc((100%-0.75rem)/2)] max-w-48 overflow-hidden bg-charcoal sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-5rem)/6)]"
        >
          <ProductThumbnail
            src={category.imageUrl}
            alt={`${category.name} from the Vylore collection`}
            sizes="192px"
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