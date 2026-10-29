import Image from "next/image";
import Link from "next/link";
import { readingTimeMinutes, type BlogPost } from "@/content/blog";
import { resizePexels } from "@/content/blog/images";
import { cn } from "@/utils/cn";

export function BlogCard({
  post,
  featured = false,
  headingLevel = "h2",
}: {
  post: BlogPost;
  featured?: boolean;
  // h3 where the card sits under another section's h2 (e.g. the home page).
  headingLevel?: "h2" | "h3";
}) {
  const href = `/blog/${post.slug}/`;
  const Heading = headingLevel;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-silver/30 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(104,3,7,0.35)]",
        featured && "lg:grid lg:grid-cols-[1.25fr_1fr]",
      )}
    >
      <div className={cn("relative aspect-video overflow-hidden bg-moonlight", featured && "lg:self-center")}>
        <Image
          src={resizePexels(post.cover.src, featured ? 1400 : 800)}
          alt={post.cover.alt}
          fill
          priority={featured}
          sizes={featured ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-burgundy backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "lg:justify-center lg:gap-5 lg:p-12")}>
        {featured && <p className="eyebrow text-[11px] font-semibold text-burgundy">Featured story</p>}
        <Heading
          className={cn(
            "font-serif leading-snug text-charcoal transition-colors group-hover:text-burgundy",
            featured ? "text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-tight" : "text-xl",
          )}
        >
          {/* Stretched link: the whole card is clickable, one link in the a11y tree. */}
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className={cn("text-muted", featured ? "text-base leading-relaxed" : "line-clamp-2 text-sm leading-relaxed")}>
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
          <span>{readingTimeMinutes(post)} min read</span>
          <span className="eyebrow inline-flex items-center gap-2 text-[10px] font-semibold text-charcoal transition-colors group-hover:text-burgundy">
            Read article
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
