import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

// about/page.tsx is a client component ("use client", for its video
// lightbox/carousel interactions) and can't export metadata itself — this
// layout is the only place in the App Router that can carry it for this route.
export const metadata: Metadata = buildMetadata({
  title: "About Vylore | Contemporary 925 Sterling Silver Jewellery",
  absoluteTitle: true,
  description:
    "Discover Vylore, a contemporary 925 sterling silver jewellery brand shaped by 25+ years of family expertise, thoughtful design and craftsmanship.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
