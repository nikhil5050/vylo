import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private, per-visitor pages — also left out of sitemap.ts.
      disallow: ["/account", "/cart", "/checkout", "/wishlist", "/order-confirmation"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
