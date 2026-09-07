import { ProductListing } from "@/components/shop/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getThemes } from "@/services/theme.service";
import { getAllProducts } from "@/services/product.service";
import Image from "next/image";

const shopPosters = {
  top: "https://ik.imagekit.io/vyloreimgs/vylore/banners/posterbottom.png",
  bottom: "https://ik.imagekit.io/vyloreimgs/vylore/banners/bottomposter.png",
};

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

  return (
    <main className="flex flex-1 flex-col pb-0 pt-16 lg:pt-24">
      {products.length > 0 && <JsonLd data={itemListJsonLd} />}
     
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
         <ShopPoster position="top" className="mt-6" />
        {/* <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Define Your Style.</h1>
        <p className="eyebrow mt-2 text-xs text-muted">Discover Your Vylore.</p> */}

        <div className="mt-10 mb-0">
          <ProductListing products={products} categories={categories} themes={themes} themeTiles />
        </div>
      </Container>
      <ShopPoster position="bottom" />
    </main>
  );
}

function ShopPoster({ position, className = "" }: { position: "top" | "bottom"; className?: string }) {
  return (
    <section
      className={`${position === "top" ? "mb-12" : "mt-16"} ${className}`}
      aria-label={`Vylore jewellery collection ${position} poster`}
    >
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
    </section>
  );
}
