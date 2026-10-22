import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { absoluteUrl, organizationId } from "@/config/site";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Silver Jewellery Blog: Guides & Styling",
  description:
    "The Vylore Journal: expert guides to 925 sterling silver, styling earrings, rings, necklaces, bracelets and anklets, gifting, and contemporary jewellery design.",
  path: "/blog",
  image: blogPosts[0].cover.src,
});

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "The Vylore Journal",
  url: absoluteUrl("/blog"),
  description: "Guides, styling notes and design stories on contemporary 925 sterling silver jewellery.",
  publisher: { "@id": organizationId },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.cover.src,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
  })),
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={blogJsonLd} />

      <section className="relative overflow-hidden bg-moonlight/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-burgundy/10 blur-3xl"
        />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-xs font-semibold text-burgundy">The Vylore Journal</p>
              <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
                Stories in sterling silver
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted lg:justify-self-end">
              Practical guides to 925 sterling silver, styling notes for every category, and the design thinking
              behind Vylore — written to help you choose jewellery with intention.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <BlogCard post={featured} featured />
      </Container>

      <Container className="pb-20 lg:pb-28">
        <h2 className="sr-only">All articles</h2>
        <BlogGrid posts={rest} />
      </Container>
    </main>
  );
}
