"use client";

import { useId } from "react";
import type { Category } from "@/types/category";
import type { Theme } from "@/types/theme";

export interface FilterState {
  categorySlugs: string[];
  themeSlugs: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
}

interface PriceBand {
  label: string;
  min?: number;
  max?: number;
}

const priceBands: PriceBand[] = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 – ₹8,000", min: 5000, max: 8000 },
  { label: "Above ₹8,000", min: 8000 },
];

// Custom-drawn controls in the brand palette: the native white boxes clashed
// with the shop's moonlight background. The real <input> stays in place
// (keyboard, screen readers, form semantics); only its look is replaced.
const optionLabel =
  "group flex cursor-pointer items-center gap-3 py-1 text-sm text-charcoal transition-colors hover:text-burgundy has-checked:font-medium has-checked:text-burgundy";

const controlBase =
  "peer h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none border border-burgundy/35 bg-burgundy/[0.05] transition-colors group-hover:border-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/30 focus-visible:ring-offset-1";

function FilterCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <span className="relative flex">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`${controlBase} rounded-[4px] checked:border-burgundy checked:bg-burgundy`}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-ivory opacity-0 transition-opacity peer-checked:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5 6.5 12 13 4.5" />
      </svg>
    </span>
  );
}

function FilterRadio({ name, checked, onChange }: { name: string; checked: boolean; onChange: () => void }) {
  return (
    <span className="relative flex">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className={`${controlBase} rounded-full checked:border-burgundy`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-2 w-2 scale-0 rounded-full bg-burgundy transition-transform peer-checked:scale-100"
      />
    </span>
  );
}

interface FiltersPanelProps {
  categories?: Category[];
  themes?: Theme[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FiltersPanel({ categories, themes, filters, onChange }: FiltersPanelProps) {
  // Unique per mounted instance: ProductListing renders FiltersPanel twice
  // (desktop aside + mobile drawer), and native <input type="radio"> groups
  // by `name` across the whole document, not per-component — a shared
  // literal name here made the two panels' price radios fight each other.
  const priceBandName = useId();

  function toggleCategory(slug: string) {
    const next = filters.categorySlugs.includes(slug)
      ? filters.categorySlugs.filter((s) => s !== slug)
      : [...filters.categorySlugs, slug];
    onChange({ ...filters, categorySlugs: next });
  }

  function toggleTheme(slug: string) {
    const next = filters.themeSlugs.includes(slug)
      ? filters.themeSlugs.filter((s) => s !== slug)
      : [...filters.themeSlugs, slug];
    onChange({ ...filters, themeSlugs: next });
  }

  function selectPriceBand(band: PriceBand) {
    const isActive = filters.minPrice === band.min && filters.maxPrice === band.max;
    onChange({
      ...filters,
      minPrice: isActive ? undefined : band.min,
      maxPrice: isActive ? undefined : band.max,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {categories && categories.length > 0 && (
        <div>
          <p className="eyebrow text-xs text-muted">Category</p>
          <div className="mt-4 flex flex-col gap-3">
            {categories.map((category) => (
              <label key={category.slug} className={optionLabel}>
                <FilterCheckbox
                  checked={filters.categorySlugs.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {themes && themes.length > 0 && (
        <div>
          <p className="eyebrow text-xs text-muted">Theme</p>
          <div className="mt-4 flex flex-col gap-3">
            {themes.map((theme) => (
              <label key={theme.slug} className={optionLabel}>
                <FilterCheckbox
                  checked={filters.themeSlugs.includes(theme.slug)}
                  onChange={() => toggleTheme(theme.slug)}
                />
                {theme.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow text-xs text-muted">Price</p>
        <div className="mt-4 flex flex-col gap-3">
          {priceBands.map((band) => (
            <label key={band.label} className={optionLabel}>
              <FilterRadio
                name={priceBandName}
                checked={filters.minPrice === band.min && filters.maxPrice === band.max}
                onChange={() => selectPriceBand(band)}
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={optionLabel}>
          <FilterCheckbox
            checked={filters.inStockOnly}
            onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}
