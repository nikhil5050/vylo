import { ProductListing } from "@/components/shop/ProductListing";
import { ShopFaqGrid } from "@/components/shop/ShopFaqGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { ArrowRightIcon } from "@/components/icons/Icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { faqCategories } from "@/config/faq";
import { shopBuyingGuide, shopCategoryGuides, shopFaqIds, shopIntro, shopStory } from "@/config/shop";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getThemes } from "@/services/theme.service";
import { getAllProducts } from "@/services/product.service";
import type { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

const shopPosters = {
  top: "https://ik.imagekit.io/vyloreimgs/vylore/banners/2.webp",
  bottom: "https://ik.imagekit.io/vyloreimgs/vylore/banners/posterbottom.png",
};

// Shopping-focused slice of the shared FAQ source; the ids and their order
// live in config/shop.ts alongside the rest of the shop copy.
const shopFaqs = faqCategories
  .flatMap((category) => category.items)
  .filter((item) => shopFaqIds.includes(item.id))
  .sort((a, b) => shopFaqIds.indexOf(a.id) - shopFaqIds.indexOf(b.id));

const shopHighlights = [
  {
    title: "Genuine 925 Silver",
    description:
      "Every piece is crafted in certified 925 sterling silver, with metal and purity stated clearly on each product page.",
  },
  {
    title: "Curated by Category & Theme",
    description:
      "Browse rings, earrings, pendants and more, or shop by theme to find pieces that match your personal style faster.",
  },
  {
    title: "Secure Checkout",
    description:
      "Pay confidently via PayU with cards, UPI or netbanking — Vylore never stores your card or payment details.",
  },
  {
    title: "Shipped Across India",
    description:
      "Orders are dispatched within 2–4 business days and can be tracked anytime from our Track Order page.",
  },
];

// Without this, the static shop page is cached forever after build (Next's
// default for a page with no request-time APIs) — a new/updated product
// added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export default async function ShopPage() {
  // Fails closed, same as the homepage sections: an unreachable backend
  // (DNS blip, cold start, outage) renders the page shell with an empty
  // listing — ProductListing's own empty state — instead of a 500.
  const [products, categories, themes] = await Promise.all([
    getAllProducts().catch(() => []),
    getCategories().catch(() => []),
    getThemes().catch(() => []),
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/product/${product.slug}`,
      name: product.name,
    })),
  };

  const shopFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: shopFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="flex flex-1 flex-col pb-0 pt-16 lg:pt-24">
      {products.length > 0 && <JsonLd data={itemListJsonLd} />}
      {shopFaqs.length > 0 && <JsonLd data={shopFaqJsonLd} />}

      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        <ShopPoster position="top" className="mt-6" />
        <ShopIntro categories={categories} />

        <div id="shop-products" className="mt-10 mb-0">
          <ProductListing products={products} categories={categories} themes={themes} themeTiles />
        </div>
      </Container>
      <ShopPoster position="bottom" />
      <ShopCategoryGuide categories={categories} />
      <ShopSeoContent />
      <ShopBuyingGuide />
      <ShopFaq />
      <ShopFinalCta />
    </main>
  );
}

function ShopPoster({ position, className = "" }: { position: "top" | "bottom"; className?: string }) {
  return (
    <section
      className={`${position === "top" ? "mb-10" : "mt-16"} ${className}`}
      aria-label={`Vylore jewellery collection ${position} poster`}
    >
      <Link href={position === "top" ? "#shop-products" : "/contact"}>
        <div
          className={`relative w-full overflow-hidden bg-charcoal ${
            // posterbottom.png is a wide 2048x768 banner — a fixed height on
            // mobile (the old "h-[360px]") forced object-cover to crop most
            // of it away. Sizing by its own aspect ratio below `sm` shows the
            // full banner instead; the fixed height takes back over from
            // `sm` up, where the viewport is wide enough for it to look
            // right without becoming absurdly tall.
            position === "bottom" ? "aspect-[2048/768] sm:aspect-auto sm:h-[420px]" : "h-48 sm:h-64"
          }`}
        >
          <Image
            src={shopPosters[position]}
            alt="Vylore contemporary silver jewellery collection"
            fill
            priority={position === "top"}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </Link>
    </section>

  );
}

function ShopIntro({ categories }: { categories: Category[] }) {
  // Only link categories that actually exist in the catalogue, so a chip
  // never points at an empty /category page.
  const live = shopCategoryGuides.filter((guide) => categories.some((c) => c.slug === guide.slug));

  // Keep "for Women" together so the last word never wraps onto a line of
  // its own on narrower screens.
  const heading = shopIntro.heading.replace(/ (\S+)$/, "\u00a0$1");

  return (
    <header className="relative isolate mx-auto py-8 text-center sm:py-12">
      {/* Soft champagne glow behind the heading. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-64 max-w-3xl -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,164,108,0.14),transparent_70%)]"
      />
      {/* Mirrored floral line art in the empty space either side; only from
          xl, where there's room beside the one-line heading. */}
      {(["left", "right"] as const).map((side) => (
        <Image
          key={side}
          src="/images/decor/shop-intro-sprig.svg"
          alt=""
          aria-hidden
          width={260}
          height={300}
          className={`pointer-events-none absolute top-[62%] hidden h-auto w-[clamp(160px,13vw,210px)] -translate-y-1/2 select-none opacity-60 xl:block ${
            side === "left" ? "left-0" : "right-0 -scale-x-100"
          }`}
        />
      ))}

      <div className="relative mx-auto max-w-4xl">
        <p className="eyebrow flex items-center justify-center gap-3 text-xs text-burgundy">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold sm:w-16" />
          The Vylore Collection
          <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold sm:w-16" />
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-[#680307] sm:text-4xl lg:whitespace-nowrap lg:text-[2.6rem] xl:text-5xl">
          {heading}
        </h1>
        {/* Gold hairline divider with a centre sparkle. */}
        <div aria-hidden className="mx-auto mt-5 flex w-48 items-center gap-3 text-gold">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8 1Q9 7 15 8Q9 9 8 15Q7 9 1 8Q7 7 8 1Z" />
          </svg>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{shopIntro.body}</p>
        {live.length > 0 && (
          <nav aria-label="Shop by category" className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {live.map((guide) => (
              <Link
                key={guide.slug}
                href={`/category/${guide.slug}`}
                className="rounded-full border border-gold/40 bg-white/80 px-4 py-2 text-xs tracking-wide text-charcoal shadow-[0_1px_2px_rgba(104,3,7,0.06)] transition-colors duration-300 hover:border-burgundy hover:bg-burgundy hover:text-ivory sm:px-5 sm:text-[13px]"
              >
                Silver {guide.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function ShopCategoryGuide({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="shop-category-guide-heading">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-xs text-burgundy">Shop by Category</p>
          <h2
            id="shop-category-guide-heading"
            className="mt-4 font-serif text-4xl leading-tight text-[#680307] sm:text-5xl"
          >
            Find Your Kind of Silver.
          </h2>
          <p className="mt-5 text-sm leading-6 text-muted sm:text-base">
            Every category in the collection is designed in 925 sterling silver — here&apos;s what
            you&apos;ll find in each, and how to wear it.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-col gap-6 lg:gap-8">
          {shopCategoryGuides.map((guide, index) => {
            const category = categories.find((c) => c.slug === guide.slug);
            const reversed = index % 2 === 1;
            return (
              <FadeIn key={guide.slug} delay={0.05}>
                <article className="grid overflow-hidden border border-silver/40 bg-white md:grid-cols-5">
                  <div
                    className={`relative aspect-[16/9] bg-charcoal md:col-span-2 md:aspect-auto md:min-h-72 ${
                      reversed ? "md:order-2" : ""
                    }`}
                  >
                    <ProductThumbnail
                      src={category?.imageUrl}
                      alt={guide.heading}
                      transform="w-800"
                      loading="lazy"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3 lg:p-10">
                    <p className="eyebrow text-xs text-burgundy">
                      0{index + 1} · {guide.name}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-charcoal sm:text-3xl">{guide.heading}</h3>
                    {guide.paragraphs.map((paragraph, i) => (
                      <p key={i} className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {guide.tags.map((tag) => (
                        <li key={tag} className="bg-burgundy/5 px-3 py-1 text-[11px] tracking-wide text-burgundy">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {category && (
                      <Link
                        href={`/category/${guide.slug}`}
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-charcoal underline decoration-silver/60 underline-offset-4 transition-colors hover:text-burgundy"
                      >
                        Shop Silver {guide.name}
                        <ArrowRightIcon className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ShopBuyingGuide() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="shop-buying-guide-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-xs text-burgundy">Silver Jewellery Guide</p>
            <h2
              id="shop-buying-guide-heading"
              className="mt-4 font-serif text-4xl leading-tight text-[#680307] sm:text-5xl"
            >
              Buying Silver, Simplified.
            </h2>
            <p className="mt-5 text-sm leading-6 text-muted sm:text-base">
              A few essentials to help you choose with confidence and keep every piece looking its
              best for years.
            </p>
          </FadeIn>

          <div className="grid gap-px overflow-hidden border border-silver/40 bg-silver/40 sm:grid-cols-2 lg:col-span-2">
            {shopBuyingGuide.map((topic, index) => (
              <FadeIn key={topic.title} delay={index * 0.05} className="bg-white p-6 sm:p-8">
                <span className="font-serif text-3xl text-burgundy/30">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-xl text-charcoal">{topic.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{topic.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ShopFaq() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="shop-faq-heading">
      <Container>
        <FadeIn className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-xs text-burgundy">Got Questions?</p>
          <h2
            id="shop-faq-heading"
            className="mt-4 font-serif text-4xl leading-none text-[#680307] sm:text-5xl"
          >
            Answers Before You Buy.
          </h2>
          <p className="mt-5 text-sm leading-6 text-muted">
            Purity, payments, shipping, care and returns — tap a question to expand it.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <ShopFaqGrid faqs={shopFaqs} />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 text-center">
          <Button href="/faq" variant="secondary" size="md">
            View All FAQs <span aria-hidden="true">↗</span>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}

function ShopSeoContent() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="shop-content-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">Why Shop Vylore</p>
            <h2 id="shop-content-heading" className="mt-4 font-serif text-4xl text-[#680307] sm:text-5xl">
              Contemporary Silver Jewellery, Made to Last.
            </h2>
            {shopStory.map((paragraph, index) => (
              <p key={index} className={`${index === 0 ? "mt-6" : "mt-4"} text-base leading-relaxed text-muted`}>
                {paragraph}
              </p>
            ))}
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
              <Image
                src="https://ik.imagekit.io/vyloreimgs/vylore/banners/DSC03013.JPG.webp"
                alt="Vylore silver jewellery styled for everyday wear"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shopHighlights.map((highlight, index) => (
            <FadeIn key={highlight.title} delay={index * 0.05}>
              <Card className="h-full p-6">
                <p className="eyebrow text-xs text-burgundy">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-lg text-charcoal">{highlight.title}</h3>
                <p className="mt-2 text-sm text-muted">{highlight.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShopFinalCta() {
  return (
    <section className="border-t border-silver/30 bg-white py-14 sm:py-16">
      <Container className="flex flex-col items-center text-center">
        <FadeIn>
          <p className="eyebrow text-xs text-[#810201]">Still Deciding?</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[#680307] sm:text-4xl">
            Let&apos;s Find Your Perfect Piece.
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Have a question about sizing, purity or a custom design? Our team is happy to
            help you choose the right piece from the collection.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
            Talk to Us
          </Button>
          <Button href="#shop-products" variant="secondary" size="lg" className="w-full sm:w-auto">
            Back to Collection
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
