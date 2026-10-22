import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/services/category.service";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // getCategoryBySlug's underlying getCategories() call is unguarded, so a
  // backend outage here would otherwise crash metadata generation and take
  // the whole page down; falling back to default metadata is fine instead.
  const category = await getCategoryBySlug(slug).catch(() => undefined);
  if (!category) return {};

  return buildMetadata({
    // "Rings" alone is a weak title next to what shoppers search ("silver rings").
    title: /silver/i.test(category.name) ? category.name : `Silver ${category.name}`,
    description:
      category.description ||
      `Explore Vylore's collection of silver ${category.name.toLowerCase()}, designed for everyday wear and special occasions.`,
    path: `/category/${category.slug}`,
  });
}

// The unknown-slug check lives here, not only in page.tsx: the page renders
// inside loading.tsx's Suspense boundary, so by the time its notFound() runs
// the 200 status has already been streamed and Google sees a soft 404. A
// layout sits outside that boundary, so notFound() here still sends a real
// 404. A backend outage (null) falls through to the page's own
// "temporarily unavailable" state rather than 404ing a real category.
export default async function CategoryLayout({ children, params }: LayoutProps<"/category/[slug]">) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => null);
  if (categories && !categories.some((category) => category.slug === slug)) notFound();

  return children;
}
