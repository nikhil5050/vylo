import { ProductListing } from "@/components/shop/ProductListing";
import { ShopFaqGrid } from "@/components/shop/ShopFaqGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { faqCategories } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getThemes } from "@/services/theme.service";
import { getAllProducts } from "@/services/product.service";
import Image from "next/image";
import Link from "next/link";

const shopPosters = {
  top: "https://ik.imagekit.io/vyloreimgs/vylore/banners/2.webp",
  bottom: "https://ik.imagekit.io/vyloreimgs/vylore/banners/posterbottom.png",
};

// A shopping-focused slice of the same source used on the homepage/FAQ page —
// purity, payments, shipping and returns are the questions most likely to be
// on a buyer's mind on this exact page, so they double as good AEO/GEO bait.
const shopFaqIds = [
  "purity-1",
  "orders-1",
  "shipping-1",
  "shipping-2",
  "payments-1",
  "payments-2",
  "returns-1",
  "care-2",
];

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
        {/* <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Define Your Style.</h1>
        <p className="eyebrow mt-2 text-xs text-muted">Discover Your Vylore.</p> */}

        <div id="shop-products" className="mt-10 mb-0">
          <ProductListing products={products} categories={categories} themes={themes} themeTiles />
        </div>
      </Container>
      <ShopPoster position="bottom" />
      <ShopFaq />
      <ShopSeoContent />
      <ShopFinalCta />
    </main>
  );
}

function ShopPoster({ position, className = "" }: { position: "top" | "bottom"; className?: string }) {
  return (
    <section
      className={`${position === "top" ? "mb-12" : "mt-16"} ${className}`}
      aria-label={`Vylore jewellery collection ${position} poster`}
    >
      <Link href={position === "top" ? "#shop-products" : "/contact"}>
        <div
          className={`relative w-full overflow-hidden bg-charcoal ${
            position === "bottom" ? "h-[360px] sm:h-[420px]" : "h-48 sm:h-64"
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

function ShopFaq() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="shop-faq-heading">
      <Container>
        <FadeIn className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-xs text-burgundy">Got Questions?</p>
          <h1
            id="shop-faq-heading"
            className="mt-4 font-serif text-4xl leading-none text-[#680307] sm:text-5xl"
          >
            Answers Before You Buy.
          </h1>
          <p className="mt-5 text-sm leading-6 text-muted">
            Purity, payments, shipping and returns — tap a question to expand it.
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
    <section className="py-16 lg:py-10" aria-labelledby="shop-content-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">The Vylore Shop</p>
            <h2 id="shop-content-heading" className="mt-4 font-serif text-4xl text-[#680307] sm:text-5xl">
              Contemporary Silver Jewellery, Made to Last.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Vylore&apos;s online jewellery shop brings together rings, earrings, pendants,
              bracelets and more in genuine 925 sterling silver, designed for everyday wear
              and finished with the same attention to detail as fine jewellery. Every product
              listing states its material, purity, weight and care instructions clearly, so
              you always know exactly what you&apos;re buying.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you&apos;re after a minimal everyday piece, a statement design for a
              special occasion, or a custom piece of your own, the collection is organised by
              category and theme to help you find it faster — backed by secure payments,
              nationwide shipping across India and dedicated support at every step.
            </p>
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
