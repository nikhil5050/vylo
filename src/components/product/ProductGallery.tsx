"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { SearchIcon } from "@/components/icons/Icons";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useCanHover } from "@/hooks/useCanHover";
import type { ProductImage } from "@/types/product";
import { cn } from "@/utils/cn";

// Pan/pinch-zoom gesture handling is only needed once someone actually opens
// it, so it stays out of the initial product-page bundle until then.
const ProductImageZoom = dynamic(
  () => import("./ProductImageZoom").then((mod) => mod.ProductImageZoom),
  { ssr: false }
);

// How far the cursor-hover lens magnifies the main image.
const LENS_ZOOM = 2.2;
const SWIPE_THRESHOLD_PX = 40;

interface ProductGalleryProps {
  productName: string;
  images: ProductImage[];
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [lensActive, setLensActive] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Coarse/touch pointers don't get the hover lens — there's no cursor to
  // track, and the listeners would otherwise fire from stray touch events.
  const canHover = useCanHover();

  const views = images.length > 0 ? images : [undefined];
  const activeImage = views[active];

  function goTo(index: number) {
    setActive(Math.min(views.length - 1, Math.max(0, index)));
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLensPos({
      x: Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)),
    });
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? startX) - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    goTo(active + (deltaX < 0 ? 1 : -1));
  }

  return (
    <div>
      <div
        ref={stageRef}
        className="relative aspect-[4/5] w-full overflow-hidden"
        onMouseEnter={() => canHover && setLensActive(true)}
        onMouseLeave={() => setLensActive(false)}
        onMouseMove={canHover ? handleMouseMove : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {activeImage ? (
              <button
                type="button"
                onClick={() => setZoomIndex(active)}
                aria-label={`${productName} — zoom image ${active + 1}`}
                className="block h-full w-full cursor-zoom-in"
              >
                <ProductThumbnail src={activeImage.url} alt={activeImage.altText ?? productName} transform="w-1200" />
              </button>
            ) : (
              <PlaceholderImage />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cursor-follow magnifier: a same-image layer scaled up and panned
            via background-position, faded in only on hover so the base
            <ProductThumbnail> above still handles loading/error states. */}
        {canHover && activeImage?.url && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-no-repeat opacity-0 transition-opacity duration-200",
              lensActive && "opacity-100",
            )}
            style={{
              backgroundImage: `url(${activeImage.url}?tr=w-1800)`,
              backgroundSize: `${LENS_ZOOM * 100}%`,
              backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
            }}
          />
        )}

        {activeImage && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-charcoal shadow-md backdrop-blur-sm">
            <SearchIcon className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>

      {zoomIndex !== null && (
        <ProductImageZoom
          productName={productName}
          images={images}
          initialIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}

      {views.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {views.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${productName} — view ${index + 1}`}
              aria-current={active === index}
              className={cn(
                "aspect-[4/5] overflow-hidden border transition-colors",
                active === index ? "border-burgundy" : "border-transparent",
              )}
            >
              {image ? (
                <ProductThumbnail src={image.url} alt={image.altText ?? productName} transform="w-200" />
              ) : (
                <PlaceholderImage />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
