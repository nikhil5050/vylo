import { post as post01 } from "./posts/01-contemporary-silver-jewellery-legacy";
import { post as post02 } from "./posts/02-certified-925-sterling-silver";
import { post as post03 } from "./posts/03-design-philosophy";
import { post as post04 } from "./posts/04-silver-earrings";
import { post as post05 } from "./posts/05-silver-anklets";
import { post as post06 } from "./posts/06-silver-bracelets";
import { post as post07 } from "./posts/07-silver-necklaces";
import { post as post08 } from "./posts/08-silver-rings";
import { post as post09 } from "./posts/09-jewellery-for-women";
import { post as post10 } from "./posts/10-design-led-indian-jewellery";
import { post as post11 } from "./posts/11-silver-chains";
import { post as post12 } from "./posts/12-gift-jewellery-for-women";
import { post as post13 } from "./posts/13-office-jewellery";
import { post as post14 } from "./posts/14-craftsmanship-signature-finish";
import { post as post15 } from "./posts/15-buy-silver-jewellery-online";
import type { BlogPost } from "./types";

export type { BlogPost, BlogCategory, BlogFaq, BlogImage } from "./types";

// Listing order on /blog (first entry is the featured post).
export const blogPosts: BlogPost[] = [
  post01, post02, post03, post04, post05, post06, post07, post08,
  post09, post10, post11, post12, post13, post14, post15,
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

// Same-category posts first, then fill with the rest in listing order.
export function getRelatedPosts(post: BlogPost, count = 3) {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export function readingTimeMinutes(post: BlogPost) {
  const text = post.body + post.faqs.map((f) => `${f.question} ${f.answer}`).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[’'"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// H2s drive the "In this article" table of contents.
export function getTableOfContents(post: BlogPost) {
  return post.body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: headingId(text), text };
    });
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
