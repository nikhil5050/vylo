"use client";

import { useState } from "react";
import type { BlogCategory, BlogPost } from "@/content/blog";
import { cn } from "@/utils/cn";
import { BlogCard } from "./BlogCard";

// Category filter over the listing. Initial state is "All", so every card is
// in the server-rendered HTML and crawlable; filtering only hides cards.
export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const [active, setActive] = useState<BlogCategory | "All">("All");
  const visible = active === "All" ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by topic" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {(["All", ...categories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "eyebrow shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors",
              active === category
                ? "border-burgundy bg-burgundy text-ivory"
                : "border-silver/60 text-charcoal hover:border-burgundy hover:text-burgundy",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
