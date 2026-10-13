import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  keywords?: string[];
  // Absolute or site-relative URL. Without an explicit og:image, Google (incl.
  // AI Overviews) picks a thumbnail itself — often from another site.
  image?: string;
  // Skip the root layout's "%s | Vylore Jewellery" template — for titles that
  // already name the brand and would otherwise repeat it.
  absoluteTitle?: boolean;
  // Marks the page as an article (og:type "article" + publish/modified times)
  // instead of the default "website".
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
}

export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export function buildMetadata({ title, description, path, noIndex, keywords, image, absoluteTitle, article }: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  // The root layout applies a "%s | Vylore" title template to `title`, but that
  // template doesn't cascade into nested openGraph/twitter fields, so build the
  // full title explicitly for those.
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image ? { url: image, alt: title } : defaultOgImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [ogImage],
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            section: article.section,
            tags: article.tags,
            authors: [siteConfig.name],
          }
        : { type: "website" as const }),
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
