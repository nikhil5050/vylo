import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";

export const dynamic = "force-static";

const staticPaths = ["", "/shop", "/about", "/contact", "/faq", "/track-order", "/ring-size-checker"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const lastModified = new Date();

  const staticRoutes = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));

  const productRoutes = products.map((product) => ({
    url: absoluteUrl(`/product/${product.slug}`),
    lastModified,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: absoluteUrl(`/category/${category.slug}`),
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
