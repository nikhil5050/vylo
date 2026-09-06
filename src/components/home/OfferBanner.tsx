import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { OfferBannerCarousel } from "@/components/home/OfferBannerCarousel";
import { getBanners } from "@/services/banner.service";

// Fails closed: no banners (or a fetch error) just means the section
// doesn't render, instead of breaking the homepage. getBanners() already
// returns banners sorted by sort_order ascending, so the carousel plays
// them out in that order.
export async function OfferBanner() {
  const banners = await getBanners().catch(() => []);
  if (banners.length === 0) return null;

  return (
    <section className="py-6 lg:py-10">
      <Container>
        <FadeIn>
          <OfferBannerCarousel banners={banners} />
        </FadeIn>
      </Container>
    </section>
  );
}
