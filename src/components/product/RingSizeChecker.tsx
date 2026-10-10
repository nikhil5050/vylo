"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const MIN_SIZE = 1;
const MAX_SIZE = 30;
const DEFAULT_SIZE = 7;

// Indian ring sizes: circumference grows 1mm per size (size 5 = 45mm), with
// diameters matching the industry chart used by most Indian jewellers.
const RING_SIZES = Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => {
  const size = MIN_SIZE + i;
  return {
    size,
    circumference: 40 + size,
    diameter: Number((14.33 + (size - 5) * 0.32).toFixed(2)),
  };
});

const ROW_HEIGHT = 64;
const VISIBLE_ROWS = 5;

function clampSize(value: number) {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(value)));
}

export function RingSizeChecker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Start on the size picked on the product page (?size=12) when it's numeric.
  const [size, setSize] = useState(() => {
    const initial = Number(searchParams.get("size"));
    return Number.isFinite(initial) && initial >= MIN_SIZE && initial <= MAX_SIZE ? clampSize(initial) : DEFAULT_SIZE;
  });
  const tableRef = useRef<HTMLDivElement>(null);
  const current = RING_SIZES[size - MIN_SIZE];

  // Keep the selected row centred in the table. Scrolls only the table box —
  // scrollIntoView would also yank the whole page on every slider tick.
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const index = size - MIN_SIZE;
    table.scrollTo({ top: (index - Math.floor(VISIBLE_ROWS / 2)) * ROW_HEIGHT, behavior: "smooth" });
  }, [size]);

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/category/rings");
  }

  const progress = ((size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE)) * 100;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex items-center gap-4 border-b border-silver/40 pb-5">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center text-charcoal transition-colors hover:text-burgundy"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-serif text-2xl text-charcoal sm:text-3xl">Ring Size Checker</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-14">
        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-4 sm:gap-8">
            <p className="text-sm leading-relaxed text-charcoal sm:text-base">
              Put your ring on the circle and adjust the size using the slider. The circle should overlap with the
              inner edge of your ring to get a near accurate measurement.
            </p>

            <div
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle, color-mix(in srgb, var(--silver) 90%, transparent) 1px, transparent 1.2px)",
                backgroundSize: "8px 8px",
              }}
            >
              {/* Inner diameter of the drawn ring equals the chart diameter, in CSS mm. */}
              <div
                aria-hidden="true"
                className="rounded-full border-[3px] border-charcoal transition-[width,height] duration-200 ease-out"
                style={{
                  width: `calc(${current.diameter}mm + 6px)`,
                  height: `calc(${current.diameter}mm + 6px)`,
                }}
              />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Smaller size"
              onClick={() => setSize((s) => clampSize(s - 1))}
              disabled={size === MIN_SIZE}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-silver/60 text-lg text-charcoal transition-colors hover:border-burgundy hover:text-burgundy disabled:opacity-40"
            >
              −
            </button>
            <input
              type="range"
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={1}
              value={size}
              onChange={(e) => setSize(clampSize(Number(e.target.value)))}
              aria-label="Ring size"
              aria-valuetext={`Size ${size}`}
              className={cn(
                "h-2 w-full cursor-pointer appearance-none rounded-full border border-burgundy/40 bg-transparent",
                "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-burgundy [&::-webkit-slider-thumb]:shadow-[0_0_0_7px_color-mix(in_srgb,var(--maroon)_12%,transparent)]",
                "[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-burgundy [&::-moz-range-thumb]:shadow-[0_0_0_7px_color-mix(in_srgb,var(--maroon)_12%,transparent)]",
              )}
              style={{
                background: `linear-gradient(to right, color-mix(in srgb, var(--maroon) 25%, transparent) ${progress}%, transparent ${progress}%)`,
              }}
            />
            <button
              type="button"
              aria-label="Larger size"
              onClick={() => setSize((s) => clampSize(s + 1))}
              disabled={size === MAX_SIZE}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-silver/60 text-lg text-charcoal transition-colors hover:border-burgundy hover:text-burgundy disabled:opacity-40"
            >
              +
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
            Your ring size is <span className="font-serif text-2xl text-burgundy">{size}</span>
            <span className="ml-2">
              ({current.diameter} mm diameter · {current.circumference} mm circumference)
            </span>
          </p>
        </section>

        <section className="rounded-lg border border-silver/40 bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-4">
          <div className="grid grid-cols-3 rounded-md bg-burgundy/10 py-4 text-center text-xs font-medium text-charcoal sm:text-sm">
            <span>Indian Size</span>
            <span className="border-x border-charcoal/60">Circumference (mm)</span>
            <span>Diameter (mm)</span>
          </div>

          <div
            ref={tableRef}
            className="relative overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ height: ROW_HEIGHT * VISIBLE_ROWS }}
          >
            {RING_SIZES.map((row) => {
              const selected = row.size === size;
              return (
                <button
                  key={row.size}
                  type="button"
                  onClick={() => setSize(row.size)}
                  aria-pressed={selected}
                  className={cn(
                    "grid w-full grid-cols-3 items-center text-center text-sm transition-colors sm:text-base",
                    selected ? "bg-burgundy/5 font-medium text-burgundy" : "text-muted hover:bg-moonlight/40",
                  )}
                  style={{ height: ROW_HEIGHT }}
                >
                  <span>{row.size}</span>
                  <span>{row.circumference}</span>
                  <span>{row.diameter.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-10 rounded-lg bg-moonlight/50 p-5 text-sm leading-relaxed text-muted sm:p-6">
        <h2 className="font-serif text-lg text-charcoal">Tips for an accurate measurement</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Keep your browser zoom at 100% — screen sizes vary, so treat the result as a close estimate.</li>
          <li>Use a ring that fits the intended finger comfortably, and place it flat on the screen.</li>
          <li>Fingers swell in warm weather and later in the day; measure at a normal temperature.</li>
          <li>If you&apos;re between two sizes, choose the larger one.</li>
        </ul>
      </div>
    </div>
  );
}
