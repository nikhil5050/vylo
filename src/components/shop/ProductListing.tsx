"use client";

import { useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { Theme } from "@/types/theme";
import { FilterDrawer } from "./FilterDrawer";
import { FiltersPanel, type FilterState } from "./FiltersPanel";
import { SortSelect, type SortOption } from "./SortSelect";
import { ThemeFilterBar } from "./ThemeFilterBar";
import { isHistoryNavigation, restoreScrollPosition } from "@/utils/historyNavigation";

const PAGE_SIZE = 8;
const EMPTY_FILTERS: FilterState = { categorySlugs: [], themeSlugs: [], inStockOnly: false };

// Snapshot taken when a product is opened, so Back can rebuild the grid as
// it was (filters, sort, how many "Load More" pages were open) and return to
// the same scroll position — without it the grid resets to the first 8
// pieces and a product further down no longer exists to scroll back to.
interface ListingSnapshot {
  filters: FilterState;
  sort: SortOption;
  visibleCount: number;
  scrollY: number;
  // The opened product and where its card sat in the viewport — restoring
  // relative to the card keeps it in place even if content above it ends up
  // a slightly different height than before.
  productHref: string;
  productTop: number;
}

interface ProductListingProps {
  products: Product[];
  categories?: Category[];
  themes?: Theme[];
  // /shop shows themes as a visual tile row above the listing instead of a
  // checkbox section in the sidebar filters — category pages keep the
  // checkbox version, since there's no theme-tiles design for those yet.
  themeTiles?: boolean;
}

function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.categorySlugs.length > 0 && !filters.categorySlugs.includes(product.categorySlug)) {
      return false;
    }
    if (filters.themeSlugs.length > 0 && (!product.themeSlug || !filters.themeSlugs.includes(product.themeSlug))) {
      return false;
    }
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    return true;
  });
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function ProductListing({ products, categories, themes, themeTiles }: ProductListingProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const storageKey = `listing:${pathname}`;
  const listingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // A fresh visit starts clean. On Back/Forward the snapshot is kept (not
    // consumed) because Next can mount the listing more than once while it
    // refreshes the page data — each mount needs to restore the same state.
    if (!isHistoryNavigation()) {
      sessionStorage.removeItem(storageKey);
      return;
    }
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const snapshot = JSON.parse(raw) as ListingSnapshot;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off restore from sessionStorage, which isn't readable during SSR
      setFilters(snapshot.filters);
      setSort(snapshot.sort);
      setVisibleCount(snapshot.visibleCount);
      restoreScrollPosition(() => {
        const card = listingRef.current?.querySelector(`a[href="${snapshot.productHref}"]`);
        return card
          ? window.scrollY + card.getBoundingClientRect().top - snapshot.productTop
          : snapshot.scrollY;
      });
    } catch {
      // Malformed snapshot — just show the default listing.
    }
  }, [storageKey]);

  function saveSnapshotOnProductOpen(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest('a[href^="/product/"]');
    if (!link) return;
    const snapshot: ListingSnapshot = {
      filters,
      sort,
      visibleCount,
      scrollY: window.scrollY,
      productHref: link.getAttribute("href") ?? "",
      productTop: link.getBoundingClientRect().top,
    };
    sessionStorage.setItem(storageKey, JSON.stringify(snapshot));
  }

  const filtered = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);
  const visible = filtered.slice(0, visibleCount);
  const showThemeTiles = themeTiles && themes && themes.length > 0;

  function handleFiltersChange(next: FilterState) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }

  function selectTile(slug: string | null) {
    handleFiltersChange({ ...filters, themeSlugs: slug ? [slug] : [] });
  }

  return (
    <div ref={listingRef} onClickCapture={saveSnapshotOnProductOpen}>
      {showThemeTiles && (
        <div className="mb-10">
          <ThemeFilterBar themes={themes} selectedSlug={filters.themeSlugs[0] ?? null} onSelect={selectTile} />
        </div>
      )}

      <div className="flex items-center justify-between border-b border-silver/30 pb-4">
        <p className="text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="eyebrow text-xs text-charcoal lg:hidden"
          >
            Filters
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel categories={categories} themes={showThemeTiles ? undefined : themes} filters={filters} onChange={handleFiltersChange} />
        </aside>

        <div>
          {visible.length === 0 ? (
            <EmptyState
              title="No pieces match"
              description="Try adjusting or clearing your filters to see more of the collection."
              action={
                <Button variant="secondary" size="sm" onClick={() => handleFiltersChange(EMPTY_FILTERS)}>
                  Clear Filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-12 flex justify-center">
              <Button variant="secondary" size="md" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Load More
              </Button>
            </div>
          )}

          {/* Googlebot never clicks "Load More", so without these the
              products past the first page had no crawlable link from the
              shop or category pages. Hidden from users, who reach the same
              products through the button. */}
          {visibleCount < filtered.length && (
            <ul hidden>
              {filtered.slice(visibleCount).map((product) => (
                <li key={product.id}>
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FiltersPanel categories={categories} themes={themes} filters={filters} onChange={handleFiltersChange} />
      </FilterDrawer>
    </div>
  );
}
