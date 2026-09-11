"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  // ImageKit URL transformation, e.g. "w-800" — appended as `?tr=`.
  transform?: string;
}

// Falls back to the decorative placeholder when there's no image yet, or the
// URL fails to load, instead of a broken-image icon. Shows a shimmer skeleton
// in place of blank space while the image is still fetching.
export function ProductThumbnail({ src, alt = "", className, fit = "cover", transform }: ProductThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) return <PlaceholderImage className={className} />;

  // className carries box-level concerns (position, hover transforms) for the
  // wrapper — e.g. ProductCard's hover image-swap passes "absolute inset-0"
  // to overlay a second thumbnail, so skip the default "relative" then to
  // avoid two conflicting position utilities landing on the same element.
  const isAbsolute = className?.includes("absolute");

  return (
    <div className={`${isAbsolute ? "" : "relative"} h-full w-full ${!loaded ? "shimmer" : ""} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={transform ? `${src}?tr=${transform}` : src}
        alt={alt}
        className={`h-full w-full object-${fit} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
