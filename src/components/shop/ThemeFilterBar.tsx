"use client";

import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Theme } from "@/types/theme";
import { cn } from "@/utils/cn";

interface ThemeFilterBarProps {
  themes: Theme[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

// Visual theme picker replacing the plain checkbox list on /shop — "All" plus
// one tile per theme, image-first with a label bar underneath. Horizontal
// scroll on mobile (more tiles than fit a phone width), an even row on
// desktop. Tile photos are placeholders until real theme imagery exists —
// these are hardcoded per theme (not admin-uploaded), so swap PlaceholderImage
// for a real <img> here once assets are supplied.
export function ThemeFilterBar({ themes, selectedSlug, onSelect }: ThemeFilterBarProps) {
  const tiles: { slug: string | null; name: string }[] = [
    { slug: null, name: "All" },
    ...themes.map((theme) => ({ slug: theme.slug, name: theme.name })),
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
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
              <div className="aspect-square w-full">
                <PlaceholderImage tone={isActive ? "burgundy" : "ivory"} />
              </div>
              <div
                className={cn(
                  "py-2 text-center text-[11px] font-medium tracking-wider uppercase transition-colors",
                  isActive ? "bg-charcoal text-ivory" : "bg-ivory text-charcoal",
                )}
              >
                {tile.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
