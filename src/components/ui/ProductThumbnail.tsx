"use client";

import { useCallback, useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  // ImageKit URL transformation, e.g. "w-800" — appended as `tr=` (see imageKitUrl).
  transform?: string;
  // Above-the-fold hero/banner images: load eagerly at high fetch priority
  // instead of competing with every other image on the page.
  priority?: boolean;
  // Below-the-fold images: let the browser defer them until near the viewport.
  loading?: "lazy" | "eager";
  // Responsive ImageKit widths, e.g. [640, 1024, 1600] — emitted as a srcset
  // (each as `tr=w-<n>`) so phones don't download the desktop-sized file.
  // Needs `sizes` to be useful.
  widths?: number[];
  sizes?: string;
}

// Backend image URLs already carry a query string (`...webp?updatedAt=123`),
// so the transform has to be joined with `&` — a second `?` makes ImageKit
// read it as part of `updatedAt` and silently serve the full-size original.
export function imageKitUrl(src: string, transform: string): string {
  return `${src}${src.includes("?") ? "&" : "?"}tr=${transform}`;
}

// Falls back to the decorative placeholder when there's no image yet, or the
// URL fails to load, instead of a broken-image icon. Shows a shimmer skeleton
// in place of blank space while the image is still fetching.
export function ProductThumbnail({
  src,
  alt = "",
  className,
  fit = "cover",
  transform,
  priority = false,
  loading,
  widths,
  sizes,
}: ProductThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The <img> is in the server HTML, so a fast/cached image can finish
  // loading before React hydrates and attaches onLoad — the event is then
  // missed and the image would sit at opacity-0 forever (or until a
  // re-render). Checking `complete` when the element mounts catches that.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (!src || failed) return <PlaceholderImage className={className} />;

  // className carries box-level concerns (position, hover transforms) for the
  // wrapper — e.g. ProductCard's hover image-swap passes "absolute inset-0"
  // to overlay a second thumbnail, so skip the default "relative" then to
  // avoid two conflicting position utilities landing on the same element.
  const isAbsolute = className?.includes("absolute");

  const srcSet = widths?.map((w) => `${imageKitUrl(src, `w-${w}`)} ${w}w`).join(", ");

  return (
    <div className={`${isAbsolute ? "" : "relative"} h-full w-full ${!loaded ? "shimmer" : ""} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={transform ? imageKitUrl(src, transform) : src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`h-full w-full object-${fit} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
