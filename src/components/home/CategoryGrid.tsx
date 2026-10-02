import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/types/category";

// Preferred display order for the homepage category rail. Slugs not listed
// here (a future category the backend adds) sort after all of these, in
// whatever order the backend returned them.
const CATEGORY_ORDER = [
  "necklace",
  "chain",
  "earrings",
  "ear-cuffs",
  "rings",
  "bracelet",
  "anklets",
];

function sortForHomepage(categories: Category[]): Category[] {
  const rank = (category: Category) => {
    const index = CATEGORY_ORDER.indexOf(category.slug.trim().toLowerCase());
    return index === -1 ? CATEGORY_ORDER.length : index;
  };
  return [...categories].sort((a, b) => rank(a) - rank(b));
}

// Fails closed like OfferBanner: an unreachable backend (DNS blip, Railway
// cold start, outage) hides this one section instead of throwing and taking
// the whole homepage down with a 500.
export async function CategoryGrid() {
  const categories = await getCategories().catch(() => []);
  if (categories.length === 0) return null;

  return (
    <section className="pt-10 pb-0 sm:py-10 lg:py-10">
      <Container>
        <FadeIn className="mb-8 text-center sm:mb-10">
          <p className="eyebrow text-xs text-muted">Shop by Category</p>
          <h2 className="mt-4 font-serif text-4xl text-[#680307] sm:text-5xl">
            Find Your Signature Piece.
          </h2>
          {/* <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Explore silver necklaces, chains, earrings, rings, bracelets and anklets,
            each designed to be worn and loved every day.
          </p> */}
        </FadeIn>
        <CategoryShowcase categories={sortForHomepage(categories)} />
      </Container>
    </section>
  );
}