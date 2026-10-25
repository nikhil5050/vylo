import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPostBySlug, type BlogPost } from "@/content/blog";

// Hand-picked rather than "latest" (every post shares a publish date): the
// guides that back the home page's purity, buying and gifting searches.
const featuredSlugs = [
  "why-vylore-chooses-925-sterling-silver",
  "how-to-buy-silver-jewelry-online",
  "gift-jewelry-for-women-meaningful-designs",
];

const posts = featuredSlugs
  .map((slug) => getPostBySlug(slug))
  .filter((post): post is BlogPost => post !== undefined);

export function FromTheJournal() {
  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">The Vylore Journal</p>
            <h2 className="mt-4 font-serif text-4xl text-burgundy sm:text-5xl">
              Guides to Sterling Silver.
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted">
              Practical guides to 925 sterling silver, buying jewellery online and
              choosing the perfect gift.
            </p>
          </FadeIn>
          <Button href="/blog" variant="ghost" size="md">
            Read the Journal
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08} className="grid">
              <BlogCard post={post} headingLevel="h3" />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
