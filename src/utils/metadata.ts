import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  keywords?: string[];
  // Absolute or site-relative URL. Without an explicit og:image, Google (incl.
  // AI Overviews) picks a thumbnail itself — often from another site.
  image?: string;
}

export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export function buildMetadata({ title, description, path, noIndex, keywords, image }: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  // The root layout applies a "%s | Vylore" title template to `title`, but that
  // template doesn't cascade into nested openGraph/twitter fields, so build the
  // full title explicitly for those.
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImage = image ? { url: image, alt: title } : defaultOgImage;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
