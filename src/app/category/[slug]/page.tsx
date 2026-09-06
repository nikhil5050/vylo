import { notFound } from "next/navigation";
import { ProductListing } from "@/components/shop/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getThemes } from "@/services/theme.service";
import { getProductsByCategory } from "@/services/product.service";

// Without this, each static category page is cached forever after build
// (Next's default for a page with no request-time APIs) — a new/updated
// product added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;

  // `null` means the backend was unreachable — distinct from a successful
  // fetch that just doesn't contain this slug. Conflating the two would 404
  // a real category during a transient outage, which is both wrong and bad
  // for SEO (a real page briefly reporting itself gone).
  const categories = await getCategories().catch(() => null);

  if (categories === null) {
    return (
      <main className="flex flex-1 flex-col py-16 lg:py-24">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]} />
          <EmptyState
            title="This category is temporarily unavailable"
            description="We're having trouble reaching the catalog. Please try again shortly."
          />
        </Container>
      </main>
    );
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  // Categories are known-good above; only these can still fail (separate
  // requests), so they fail closed into ProductListing's own empty
  // state/no-theme-filter rather than taking the page down.
  const [products, themes] = await Promise.all([
    getProductsByCategory(slug).catch(() => []),
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
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      {products.length > 0 && <JsonLd data={itemListJsonLd} />}
      <Container>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
        />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-xl text-base text-muted">{category.description}</p>

        <div className="mt-10">
          <ProductListing products={products} themes={themes} />
        </div>
      </Container>
    </main>
  );
}
