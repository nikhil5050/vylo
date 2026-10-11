export const siteConfig = {
  name: "Vylore Jewellery",
  // Used for canonical URLs, Open Graph, and sitemap/robots generation.
  url: "https://www.vylore.in",
  tagline: "Jewellery That Speaks Your Style.",
  description:
    "Discover contemporary silver jewellery designed with intention. Explore distinctive rings, necklaces, earrings, bracelets, anklets and ear cuffs created for everyday expression.",
  announcement: "CRAFTED WITH PRECISION • DESIGNED WITHOUT COMPROMISE",
};

// Absolute URL for a site path, always ending in "/" to match
// trailingSlash: true in next.config.ts. Without it every sitemap and
// canonical URL 308-redirects to the slashed version, and Google reports
// them as "Page with redirect" instead of indexing them.
export function absoluteUrl(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return `${siteConfig.url}/${trimmed ? `${trimmed}/` : ""}`;
}
