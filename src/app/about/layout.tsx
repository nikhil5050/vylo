import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

// about/page.tsx is a client component ("use client", for its video
// lightbox/carousel interactions) and can't export metadata itself — this
// layout is the only place in the App Router that can carry it for this route.
export const metadata: Metadata = buildMetadata({
  title: "About Vylore | Contemporary 925 Sterling Silver Jewellery",
  description:
    "Discover Vylore, a contemporary 925 sterling silver jewellery brand shaped by 25+ years of family expertise, thoughtful design and craftsmanship.",
  path: "/about",
  keywords: [
    "about Vylore",
    "Vylore story",
    "silver jewellery brand India",
    "Akash Kapile",
    "sterling silver jewellery craftsmanship",
    "handcrafted silver jewellery India",
    "jewellery brand heritage",
    "contemporary silver jewellery design",
    "Vylore jewellery philosophy",
    "Vylore design inspiration",
    "Vylore jewellery collection",
    "Vylore silver jewellery quality",
    "Vylore jewellery materials",
    "Vylore jewellery sustainability",
    "Vylore jewellery innovation",
    "Vylore jewellery customer experience",
    "Vylore jewellery awards",
    "Vylore jewellery collaborations",
    "Vylore jewellery press coverage",
    "Vylore jewellery testimonials",
    
  ],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
