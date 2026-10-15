import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";
import { blogPosts } from "@/content/blog";

// Regenerated at most once an hour (ISR) instead of once per deploy, so
// products/categories added or removed in the admin reach the sitemap without
// a redeploy. If the backend is down during a regeneration the previous good
// sitemap keeps being served.
export const revalidate = 3600;

const staticPaths = ["", "/shop", "/about", "/contact", "/faq", "/track-order", "/ring-size-checker", "/blog"];

// Next's sitemap serializer interpolates `url` and `images` into the XML
// as-is, without escaping. A raw "&" (e.g. in the Pexels cover URLs'
// "?auto=compress&cs=tinysrgb") makes the whole file invalid XML ("EntityRef:
// expecting ';'"), so every value is escaped here before it reaches it.
function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  // No lastModified for static, product or category URLs: the backend has no
  // reliable updated-at, and stamping every URL with the generation time
  // teaches Google to ignore lastmod for the whole site. Blog posts carry real
  // publish/modified dates.
  const staticRoutes = staticPaths.map((path) => ({ url: absoluteUrl(path) }));

  const productRoutes = products
    .filter((product) => product.slug)
    .map((product) => ({ url: absoluteUrl(`/product/${product.slug}`) }));

  const categoryRoutes = categories
    .filter((category) => category.slug)
    .map((category) => ({ url: absoluteUrl(`/category/${category.slug}`) }));

  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.dateModified ?? post.datePublished),
    images: [xmlEscape(post.cover.src)],
  }));

  // One entry per URL — a duplicate slug in the catalog would otherwise list
  // the same page twice.
  const seen = new Set<string>();
  const routes: MetadataRoute.Sitemap = [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
  return routes
    .filter((entry) => !seen.has(entry.url) && seen.add(entry.url))
    .map((entry) => ({ ...entry, url: xmlEscape(entry.url) }));
}
