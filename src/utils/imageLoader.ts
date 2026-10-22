"use client";

import type { ImageLoaderProps } from "next/image";

// next/image loader (images.loaderFile in next.config.ts). It only builds CDN
// URLs — nothing goes through Next's own optimizer, whose server-side fetch to
// ik.imagekit.io timed out here — so each <Image> gets a real srcset of
// ImageKit-resized files instead of one full-size original.

// Backend image URLs already carry a query string (`...webp?updatedAt=123`),
// so the transform has to be joined with `&` — a second `?` makes ImageKit
// read it as part of `updatedAt` and silently serve the full-size original.
// A URL that already has a `tr=` (e.g. a background-removal step) gets the
// new transform appended to that same step instead of a second `tr=`.
export function imageKitUrl(src: string, transform: string): string {
  if (/[?&]tr=/.test(src)) return src.replace(/([?&]tr=)([^&#]*)/, `$1$2,${transform}`);
  return `${src}${src.includes("?") ? "&" : "?"}tr=${transform}`;
}

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    // Site-relative files from public/ (logos, decor SVGs) have no resizing
    // service behind them and are served as-is.
    return src;
  }

  // c-at_max: shrink to fit the width but never upscale past the original.
  if (url.hostname === "ik.imagekit.io") return imageKitUrl(src, `w-${width},c-at_max`);

  if (url.hostname === "images.pexels.com") {
    url.searchParams.set("auto", "compress");
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  return src;
}
