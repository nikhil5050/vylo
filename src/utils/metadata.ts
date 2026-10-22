import type { Metadata } from "next";
import { isComingSoon } from "@/config/launch";
import { absoluteUrl, siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
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

// Google truncates titles past ~60 characters and descriptions past ~160;
// these are the longest lengths allowed (kept strictly under both).
const MAX_TITLE = 59;
const MAX_DESCRIPTION = 159;

export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

// Cuts at the last word boundary that fits and adds an ellipsis, so a long
// product name or CMS description never ends mid-word.
function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, "")}…`;
}

export function buildMetadata({ title, description, path, noIndex, image, absoluteTitle, article }: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const brandSuffix = ` | ${siteConfig.name}`;
  // Drop the brand suffix rather than let Google cut the title itself when a
  // (usually CMS-supplied) title is too long to carry it.
  const useAbsolute = absoluteTitle || title.trim().length + brandSuffix.length > MAX_TITLE;
  const pageTitle = truncate(title, MAX_TITLE);
  // The root layout applies a "%s | Vylore" title template to `title`, but that
  // template doesn't cascade into nested openGraph/twitter fields, so build the
  // full title explicitly for those.
  const fullTitle = useAbsolute ? pageTitle : `${pageTitle}${brandSuffix}`;
  const metaDescription = truncate(description, MAX_DESCRIPTION);
  const ogImage = image ? { url: image, alt: pageTitle } : defaultOgImage;

  return {
    title: useAbsolute ? { absolute: pageTitle } : pageTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
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
      description: metaDescription,
      images: [ogImage.url],
    },
    // The whole storefront stays out of the index while it's gated behind
    // the coming-soon page (see config/launch.ts).
    ...(noIndex || isComingSoon ? { robots: { index: false, follow: false } } : {}),
  };
}
