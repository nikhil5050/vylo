import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/BlogBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { absoluteUrl, organizationId, siteConfig } from "@/config/site";
import {
  blogPosts,
  formatPostDate,
  getPostBySlug,
  getRelatedPosts,
  getTableOfContents,
  readingTimeMinutes,
} from "@/content/blog";
import { buildMetadata } from "@/utils/metadata";

// Every article is known at build time; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle,
    absoluteTitle: post.seoTitle.includes("Vylore"),
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.cover.src,
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      section: post.category,
      tags: post.keywords,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const toc = getTableOfContents(post);
  const related = getRelatedPosts(post);
  const minutes = readingTimeMinutes(post);

  // BlogPosting is schema.org's Article subtype for blog content; Google reads
  // it as an Article.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [post.cover.src],
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: post.body.split(/\s+/).filter(Boolean).length,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "en-IN",
    // Posts carry no individual byline; the visible "By Vylore Jewellery" matches this.
    author: { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: absoluteUrl("/") },
    publisher: { "@id": organizationId },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* FAQPage only when the FAQ section below actually renders. */}
      <JsonLd data={post.faqs.length > 0 ? [articleJsonLd, faqJsonLd] : articleJsonLd} />

      <article>
        <header className="bg-moonlight/60">
          <Container className="max-w-5xl pt-12 pb-10 lg:pt-16">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <p className="eyebrow mt-8 text-xs font-semibold text-burgundy">{post.category}</p>
            <h1 className="mt-3 font-serif text-3xl leading-[1.12] text-charcoal sm:text-4xl lg:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="font-medium text-charcoal">By {siteConfig.name}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-silver" />
              <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-silver" />
              <span>{minutes} min read</span>
            </div>
          </Container>
        </header>

        <Container className="max-w-6xl">
          <figure className="relative -mt-0 overflow-hidden rounded-b-3xl sm:rounded-3xl sm:mt-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/8]">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              />
              <p className="absolute right-6 bottom-6 left-6 max-w-xl font-serif text-2xl leading-tight text-white sm:right-10 sm:bottom-10 sm:left-10 sm:text-4xl">
                {post.coverHeadline}
              </p>
            </div>
          </figure>
        </Container>

        <Container className="max-w-6xl py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="min-w-0 max-w-[46rem]">
              {/* Mobile table of contents */}
              <details className="group mb-10 rounded-2xl border border-silver/40 p-5 lg:hidden">
                <summary className="eyebrow flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-charcoal">
                  In this article
                  <span aria-hidden="true" className="text-burgundy transition-transform group-open:rotate-45">+</span>
                </summary>
                <ol className="mt-4 flex flex-col gap-2.5 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-muted transition-colors hover:text-burgundy">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <BlogBody body={post.body} inlineImage={post.inlineImage} />

              {post.faqs.length > 0 && (
                <section aria-labelledby="faq-heading" className="mt-16">
                  <p className="eyebrow text-xs font-semibold text-burgundy">Good to know</p>
                  <h2 id="faq-heading" className="mt-2 mb-6 scroll-mt-28 font-serif text-2xl text-charcoal sm:text-[1.75rem]">
                    Frequently asked questions
                  </h2>
                  <Accordion
                    items={post.faqs.map((faq, index) => ({
                      id: `faq-${index}`,
                      title: faq.question,
                      content: <p>{faq.answer}</p>,
                    }))}
                  />
                </section>
              )}

              <aside className="relative mt-16 overflow-hidden rounded-3xl bg-burgundy-dark p-8 text-ivory sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-white/5"
                />
                <p className="eyebrow text-[11px] font-semibold text-ivory/60">Discover Vylore</p>
                <p className="relative mt-3 max-w-lg font-serif text-xl leading-snug sm:text-2xl">{post.cta.text}</p>
                <Link
                  href={post.cta.href}
                  className="eyebrow relative mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-[11px] font-semibold text-burgundy-dark transition-colors hover:bg-moonlight"
                >
                  {post.cta.label}
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </aside>
            </div>

            {/* Desktop table of contents */}
            <aside className="hidden lg:block">
              <nav aria-label="Table of contents" className="sticky top-28">
                <p className="eyebrow text-[11px] font-semibold text-charcoal">In this article</p>
                <ol className="mt-4 flex flex-col gap-3 border-l border-silver/40 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted transition-colors hover:border-burgundy hover:text-burgundy"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                  {post.faqs.length > 0 && (
                    <li>
                      <a
                        href="#faq-heading"
                        className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted transition-colors hover:border-burgundy hover:text-burgundy"
                      >
                        Frequently asked questions
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </aside>
          </div>
        </Container>
      </article>

      <section aria-labelledby="related-heading" className="border-t border-silver/30 bg-moonlight/40">
        <Container className="py-16 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-heading" className="font-serif text-2xl text-charcoal sm:text-3xl">
              Keep reading
            </h2>
            <Link href="/blog" className="eyebrow text-[11px] font-semibold text-burgundy hover:underline">
              All articles
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
