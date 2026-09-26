"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { imageKitUrl, ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Banner } from "@/types/banner";
import { cn } from "@/utils/cn";

const AUTO_ADVANCE_MS = 4500;
const BANNER_WIDTHS = [640, 1024, 1600];
// Container caps at 1440px minus 40px side padding; below that the banner
// is effectively full-width.
const BANNER_SIZES = "(min-width: 1440px) 1360px, 100vw";

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -48 : 48, opacity: 0 }),
};

// One banner at a time, auto-advancing on a timer with a directional
// slide+fade, plus dot indicators — the app-style offer carousel this
// replaced a continuous marquee with (a marquee doesn't read as "an offer"
// the way a single, changing hero banner does).
export function OfferBannerCarousel({ banners }: { banners: Banner[] }) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const pausedRef = useRef(false);

  // Direction is decided from the raw (pre-wrap) index so auto-advancing
  // past the last banner (nextIndex === banners.length) still reads as
  // "forward" once it wraps to 0, instead of slide direction flipping at
  // the loop boundary.
  const goTo = useCallback(
    (nextIndex: number) => {
      setSlide(([current]) => {
        const direction = nextIndex === current ? 1 : nextIndex > current ? 1 : -1;
        const wrapped = ((nextIndex % banners.length) + banners.length) % banners.length;
        return [wrapped, direction];
      });
    },
    [banners.length],
  );

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) goTo(index + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [banners.length, goTo, index]);

  // Warm the cache for the remaining banners once the first one is showing,
  // so each auto-advance swaps in an already-downloaded image instead of
  // sliding in an empty shimmer box. Same srcset/sizes as the visible <img>
  // so the browser picks (and caches) the same width it will render.
  useEffect(() => {
    const preload = () => {
      banners.slice(1).forEach((b) => {
        const img = new Image();
        img.sizes = BANNER_SIZES;
        img.srcset = BANNER_WIDTHS.map((w) => `${imageKitUrl(b.imageUrl, `w-${w}`)} ${w}w`).join(", ");
        img.src = imageKitUrl(b.imageUrl, "w-1600");
      });
    };
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload, { once: true });
    return () => window.removeEventListener("load", preload);
  }, [banners]);

  const banner = banners[index];
  const image = (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
      <ProductThumbnail
        src={banner.imageUrl}
        alt={banner.title ?? "Offer"}
        fit="contain"
        transform="w-1600"
        widths={BANNER_WIDTHS}
        sizes={BANNER_SIZES}
        priority={index === 0}
      />
    </div>
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={banner.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {banner.linkUrl ? (
              <Link href={banner.linkUrl} className="block">
                {image}
              </Link>
            ) : (
              image
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {banners.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Go to offer ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-burgundy" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
