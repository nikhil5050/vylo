"use client";

import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Theme } from "@/types/theme";
import { cn } from "@/utils/cn";

interface ThemeFilterBarProps {
  themes: Theme[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

// Hardcoded per theme slug (not admin-uploaded) since themes aren't backed by
// a media asset on the backend. "statement" reuses the "Hero Piece" shot —
// there's no themed asset named "Statement".
const THEME_IMAGES: Record<string, string> = {
  bridal: "https://ik.imagekit.io/vyloreimgs/vylore/theme%20imges/Bridal.webp?updatedAt=1788783144989",
  party: "https://ik.imagekit.io/vyloreimgs/vylore/theme%20imges/Party%20Wear.webp?updatedAt=1788783145582",
  minimalist: "https://ik.imagekit.io/vyloreimgs/vylore/theme%20imges/Minimalist.webp?updatedAt=1788783145610",
  personalised: "https://ik.imagekit.io/vyloreimgs/vylore/theme%20imges/Personalized.webp?updatedAt=1788783146457",
  statement: "https://ik.imagekit.io/vyloreimgs/vylore/theme%20imges/Hero%20Peice.webp?updatedAt=1788783147413",
};

// Visual theme picker replacing the plain checkbox list on /shop — "All" plus
// one tile per theme, image-first with a label bar underneath. Horizontal
// scroll on mobile (more tiles than fit a phone width), an even row on
// desktop. "All" has no themed asset, so it keeps the decorative placeholder.
export function ThemeFilterBar({ themes, selectedSlug, onSelect }: ThemeFilterBarProps) {
  const tiles: { slug: string | null; name: string }[] = [
    { slug: null, name: "All" },
    ...themes.map((theme) => ({ slug: theme.slug, name: theme.name })),
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible ">
      {tiles.map((tile) => {
        const isActive = tile.slug === selectedSlug;
        return (
          <button
            key={tile.slug ?? "all"}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(tile.slug)}
            className="w-24 shrink-0 text-left lg:w-full"
          >
            <div
              className={cn(
                "overflow-hidden rounded-lg border transition-colors",
                isActive ? "border-charcoal" : "border-transparent hover:border-silver/50",
              )}
            >
              <div className="aspect-square w-full ">
                <ProductThumbnail src={tile.slug ? THEME_IMAGES[tile.slug] : undefined} alt={tile.name} transform="w-200" />
              </div>
              <div
                className={cn(
                  "flex h-9 items-center justify-center px-1 text-center text-[11px] font-medium tracking-wider uppercase transition-colors ",
                  isActive ? "bg-[#8B0000] text-ivory" : "bg-ivory text-charcoal",
                )}
              >
                <span className="truncate">{tile.name}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
