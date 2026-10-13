export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export type BlogCategory = "Brand Story" | "Material Guide" | "Style Guide" | "Buying Guide" | "Craft & Design";

export interface BlogPost {
  slug: string;
  // On-page H1 — the article's editorial headline.
  title: string;
  // <title> / og:title. The root layout appends " | Vylore Jewellery".
  seoTitle: string;
  metaDescription: string;
  // Card + hero standfirst, from the featured-image content brief.
  excerpt: string;
  // Optional overlay headline for the hero image.
  coverHeadline: string;
  category: BlogCategory;
  keywords: string[];
  datePublished: string;
  dateModified?: string;
  cover: BlogImage;
  // Shown where the body contains a line reading exactly `{{image}}`.
  inlineImage?: BlogImage;
  // Lightweight markdown: ## / ### headings, blank-line paragraphs, "- " and
  // "1. " lists, "- [ ] " checklists, pipe tables, **bold** and [links](url).
  body: string;
  faqs: BlogFaq[];
  cta: { text: string; label: string; href: string };
}
