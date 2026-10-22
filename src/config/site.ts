export const siteConfig = {
  name: "Vylore Jewellery",
  // Used for canonical URLs, Open Graph, and sitemap/robots generation.
  url: "https://www.vylore.in",
  tagline: "Jewellery That Speaks Your Style.",
  description:
    "Discover contemporary silver jewellery designed with intention. Explore distinctive rings, necklaces, earrings, bracelets, anklets and ear cuffs created for everyday expression.",
  announcement: "CRAFTED WITH PRECISION • DESIGNED WITHOUT COMPROMISE",
  founder: "Akash Kapile",
  // TODO(client): legalName — the registered business name, for Organization JSON-LD.
};

// Brand profiles, linked from the footer and listed as the Organization's
// sameAs in the root layout JSON-LD. Kept free of share/tracking parameters
// (the old footer links carried Instagram "stkn" and YouTube "fbclid" ones).
export const socialLinks = {
  instagram: "https://www.instagram.com/vylore.in/",
  // TODO(client): facebook — this is a share redirect, not the page's own URL.
  facebook: "https://www.facebook.com/share/1BumDiprJ1/",
  linkedin: "https://www.linkedin.com/company/vylore/",
  pinterest: "https://in.pinterest.com/businessvylore/",
  x: "https://x.com/BusinessVylore",
  youtube: "https://www.youtube.com/@business.vylore",
};

// JSON-LD node ids for the site-wide Organization and WebSite (emitted once,
// in the root layout). Other pages reference them as { "@id": ... } instead
// of repeating the organization's details.
const siteOrigin = siteConfig.url.replace(/\/+$/, "");
export const organizationId = `${siteOrigin}/#organization`;
export const websiteId = `${siteOrigin}/#website`;

// og:image and other asset paths may be site-relative ("/og-image.jpg") or
// already absolute.
export function absoluteAssetUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `${siteOrigin}/${url.replace(/^\/+/, "")}`;
}

// Absolute URL for a site path, always ending in "/" to match
// trailingSlash: true in next.config.ts. Without it every sitemap and
// canonical URL 308-redirects to the slashed version, and Google reports
// them as "Page with redirect" instead of indexing them.
export function absoluteUrl(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return `${siteConfig.url}/${trimmed ? `${trimmed}/` : ""}`;
}
