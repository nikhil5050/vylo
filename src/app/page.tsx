import type { Metadata } from "next";
import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComingSoon } from "@/components/home/ComingSoon";
import { FinalCta } from "@/components/home/FinalCta";
// import { MaterialStory } from "@/components/home/MaterialStory";
import { OfferBanner } from "@/components/home/OfferBanner";
// import { OurPackaging } from "@/components/home/OurPackaging";
// import { Testimonials } from "@/components/home/Testimonials";
// import { TrustSection } from "@/components/home/TrustSection";
import { isComingSoon } from "@/config/launch";
// import { HeroGrid } from "@/components/home/HeroGrid";
import { Faq } from "@/components/home/Faq";
import { VyloreExperienceLazy as VyloreExperience } from "@/components/home/vylore-experience/VyloreExperienceLazy";
import { buildMetadata } from "@/utils/metadata";

// Without this, the static home page is cached forever after build (Next's
// default for a page with no request-time APIs) — a new/updated product
// added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  // The root layout's title template only applies to child segments, never to
  // this page itself, so the brand is written out here.
  title: "Silver Rings, Necklaces & Earrings | Vylore Jewellery",
  absoluteTitle: true,
  description:
    "Explore modern silver rings, necklaces, earrings, bracelets, chains and more, designed with intention and crafted with attention to detail.",
  path: "/",
});

export default function Home() {
  if (isComingSoon) return <ComingSoon />;

  return (
    <main className="flex flex-1 flex-col">
     <VyloreExperience />
      <CategoryGrid />
      {/* <HeroGrid /> */}
      <OfferBanner />
      <Bestsellers />
      {/* <OurPackaging /> */}
      {/* <TrustSection /> */}
      {/* <MaterialStory />  */}
      {/* Hidden for now — restore along with the import above. */}
      {/* <Testimonials /> */}
      <FinalCta />
      <Faq />
      
    </main>
  );
}
