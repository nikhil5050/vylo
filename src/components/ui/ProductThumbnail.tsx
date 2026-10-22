"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  // The image's rendered width per breakpoint, e.g. "(min-width: 1024px) 25vw,
  // 50vw". next/image turns it into a srcset of ImageKit-resized files (see
  // utils/imageLoader.ts), so phones don't download the desktop-sized file.
  sizes: string;
  // Above-the-fold hero/banner images: preload at high fetch priority
  // instead of competing with every other image on the page.
  priority?: boolean;
  // next/image lazy-loads by default; "eager" is for images that are visible
  // on load but not important enough to preload (e.g. a listing's first row).
  loading?: "lazy" | "eager";
}

// Falls back to the decorative placeholder when there's no image yet, or the
// URL fails to load, instead of a broken-image icon. Shows a shimmer skeleton
// in place of blank space while the image is still fetching.
export function ProductThumbnail({
  src,
  alt = "",
  className,
  fit = "cover",
  sizes,
  priority = false,
  loading,
}: ProductThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) return <PlaceholderImage className={className} />;

  // className carries box-level concerns (position, hover transforms) for the
  // wrapper — e.g. ProductCard's hover image-swap passes "absolute inset-0"
  // to overlay a second thumbnail, so skip the default "relative" then to
  // avoid two conflicting position utilities landing on the same element.
  // Either way the wrapper is positioned, which `fill` needs.
  const isAbsolute = className?.includes("absolute");

  return (
    <div className={`${isAbsolute ? "" : "relative"} h-full w-full ${!loaded ? "shimmer" : ""} ${className ?? ""}`}>
      {/* next/image also fires onLoad for an image that finished loading
          before hydration, so the shimmer can't get stuck on cached images. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : loading}
        className={`object-${fit} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
