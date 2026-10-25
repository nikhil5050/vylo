import Link from "next/link";
import { ArrowRight, Flower2, Gem, Gift, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const features = [
  {
    icon: Gem,
    title: "Premium 925 Silver",
    text: "Skin Friendly & Long Lasting",
    href: "/blog/why-vylore-chooses-925-sterling-silver",
  },
  { icon: Flower2, title: "Elegant Designs", text: "For Every Occasion", href: "/shop" },
  { icon: Gift, title: "Beautifully Packed", text: "Delivered with Care", href: "/shipping" },
  // TODO(client): confirm the customer count before launch.
  { icon: Heart, title: "Trusted by 12K+ Customers", text: "Loved Across India", href: "/about" },
];

// ImageKit resizes on the fly via `tr=w-…`. Desktop original is 1536×1024; the
// portrait mobile crop (900×1600) leaves empty curtain across its top ~40% for the copy.
// `updatedAt` pins the ImageKit version, so a re-upload under the same name
// isn't masked by a cached copy; bump it after replacing either file.
const HERO_BG =
  "https://ik.imagekit.io/vyloreimgs/vylore/banners/vylore-bg.webp?updatedAt=1792892283352";
const HERO_BG_MOBILE =
  "https://ik.imagekit.io/vyloreimgs/vylore/banners/vylore_mobileview-bg.webp?updatedAt=1792893195453";

/**
 * Home hero — full-bleed burgundy lounge photo (served from ImageKit, see HERO_BG),
 * running up behind the transparent header, with the copy over the empty left
 * side and the features as one row below.
 * Mobile: a portrait crop of the same scene, copy over the curtain at the top and
 * the features pinned to the bottom, below the model.
 *
 * Replaces the scroll-driven necklace animation (VyloreExperience), which is
 * commented out in app/page.tsx.
 */
export function Hero() {
  return (
    // Pulled up by the header's height (h-16 / lg:h-20) so the photo also fills the bar.
    <section className="relative isolate -mt-16 w-full overflow-hidden bg-maroon-dark text-white lg:-mt-20">
      {/* --- Background scene --- */}
      {/* Below lg the browser only fetches the portrait source. */}
      <picture>
        <source
          media="(max-width: 1023px)"
          srcSet={HERO_BG_MOBILE}
          width={900}
          height={1600}
        />
        <img
          src={HERO_BG}
          srcSet={`${HERO_BG}&tr=w-900 900w, ${HERO_BG} 1536w`}
          sizes="100vw"
          width={1536}
          height={1024}
          alt="Woman in a burgundy velvet gown wearing Vylore silver drop earrings, ring and tennis bracelet in a candlelit lounge"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
      </picture>
      {/* Legibility scrims: top and bottom on mobile (copy over the curtain,
          features under the model), left-to-right on desktop. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-transparent to-black/80 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/15 lg:to-transparent"
      />

      <Container className="flex min-h-[100dvh] flex-col justify-between gap-10 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-24 lg:justify-center lg:gap-14 lg:pb-8 lg:pt-28">
        {/* --- Copy --- */}
        <FadeIn className="relative z-10 max-w-xl lg:max-w-[56%] xl:max-w-[50%]">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/85 sm:text-xs">
              The Vylore Signature
            </p>
          </div>

          {/* Each line kept whole; the phone size scales with the viewport so the
              first line fits even on narrow screens. */}
          <h1 className="mt-5 font-serif text-[clamp(1.75rem,9.6vw,2.75rem)] leading-[1.02] text-white sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
            <span className="block whitespace-nowrap">The Silver Jewellery</span>{" "}
            <span className="block whitespace-nowrap italic text-gold">You&rsquo;ve Dreamed Of.</span>
          </h1>

          <p className="mt-4 max-w-[15rem] text-[15px] leading-relaxed text-white/80 sm:max-w-sm sm:text-base lg:mt-7">
            Designed to be treasured, made in 925 sterling silver for the
            moments you&rsquo;ll remember forever.
          </p>

          <Link
            href="/shop"
            data-cursor="cta"
            className="group mt-6 inline-flex h-14 items-center gap-3 rounded-full border border-gold/70 bg-maroon px-9 font-serif text-lg text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:bg-maroon-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-dark lg:mt-9 lg:h-16 lg:px-10 lg:text-xl"
          >
            Shop Collection
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>

          <Link
            href="/about"
            className="group ml-6 hidden items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-gold sm:inline-flex"
          >
            Our Story
            <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
          </Link>

          {/* Decorative slide markers (single slide for now); desktop only, so the
              mobile copy stays above the model's face. */}
          <div aria-hidden="true" className="mt-9 hidden items-center gap-3 lg:flex">
            <span className="h-3 w-3 rounded-full bg-white" />
            <span className="h-3 w-3 rounded-full border border-white/70" />
            <span className="h-3 w-3 rounded-full border border-white/70" />
            <span className="h-3 w-3 rounded-full border border-white/70" />
            <span className="ml-3 hidden h-px w-32 bg-white/30 lg:block" />
          </div>
        </FadeIn>

        {/* --- Features --- */}
        <FadeIn delay={0.2}>
          {/* Four columns at every size; desktop sets icon and text side by side. */}
          <ul className="grid grid-cols-4 divide-x divide-white/15 lg:border-t lg:border-white/15 lg:pt-7">
            {features.map(({ icon: Icon, title, text, href }) => (
              <li key={title} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <Link
                  href={href}
                  className="group flex flex-col items-center gap-2 px-1 text-center lg:flex-row lg:gap-4 lg:px-0 lg:text-left"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-maroon-dark sm:h-14 sm:w-14 lg:h-12 lg:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.4} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[13px] leading-snug text-white sm:text-base">
                      {title}
                    </span>
                    <span className="mt-1 block text-[10px] leading-snug text-white/65 sm:text-xs">
                      {text}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
