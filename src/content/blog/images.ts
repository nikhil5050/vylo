import { siteConfig } from "@/config/site";

// Editorial stock photography from Pexels (free for commercial use, no
// attribution required — https://www.pexels.com/license/). Swap these for
// original Vylore product shots as they become available; only `src` needs
// to change. The `w` param lets the CDN resize for cards vs. the hero.
export function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

// Re-request the same Pexels photo at a smaller width (cards, related posts).
export function resizePexels(src: string, width: number) {
  return src.replace(/([?&])w=\d+/, `$1w=${width}`);
}

// Covers served from public/blogs/ are site-relative; JSON-LD and the sitemap
// need a full URL (absoluteUrl() would append a trailing slash to the file).
export function absoluteImageUrl(src: string) {
  return src.startsWith("/") ? `${siteConfig.url}${src}` : src;
}

// Covers in public/blogs/ are finished 16:9 banners with the headline set in
// the artwork, so they must be shown uncropped and without a text overlay.
export function isBannerCover(src: string) {
  return src.startsWith("/blogs/");
}
