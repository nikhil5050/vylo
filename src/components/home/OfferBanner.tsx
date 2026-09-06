import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { getBanners } from "@/services/banner.service";
import type { Banner } from "@/types/banner";

// Tuned so the loop takes roughly this long per banner, regardless of how
// many are configured — a 2-banner and a 6-banner set both feel like they're
// moving at the same pace instead of the whole set taking a fixed duration.
const SECONDS_PER_BANNER = 6;

function BannerCard({ banner, duplicate }: { banner: Banner; duplicate: boolean }) {
  const image = (
    <div className="relative aspect-[16/9] w-[280px] shrink-0 overflow-hidden rounded-2xl sm:w-[420px] lg:w-[560px]">
      <ProductThumbnail src={banner.imageUrl} alt={banner.title ?? "Offer"} fit="contain" transform="w-1600" />
    </div>
  );

  if (!banner.linkUrl) {
    return (
      <div aria-hidden={duplicate || undefined} className="shrink-0">
        {image}
      </div>
    );
  }

  return (
    <Link
      href={banner.linkUrl}
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      className="group block shrink-0"
    >
      {image}
    </Link>
  );
}

// Fails closed: no banners (or a fetch error) just means the section
// doesn't render, instead of breaking the homepage. getBanners() already
// returns banners sorted by sort_order ascending, so the marquee plays them
// out left-to-right in that order.
export async function OfferBanner() {
  const banners = await getBanners().catch(() => []);
  if (banners.length === 0) return null;

  const durationSeconds = banners.length * SECONDS_PER_BANNER;

  return (
    <section className="offer-banner-marquee py-6 lg:py-10">
      <FadeIn>
        <div className="marquee-viewport">
          <div
            className="marquee-track flex items-center gap-4 sm:gap-6"
            style={{ animationDuration: `${durationSeconds}s` }}
          >
            {[0, 1].map((loopIndex) => (
              <div key={loopIndex} className="flex shrink-0 items-center gap-4 sm:gap-6" aria-hidden={loopIndex === 1 || undefined}>
                {banners.map((banner) => (
                  <BannerCard key={banner.id} banner={banner} duplicate={loopIndex === 1} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
