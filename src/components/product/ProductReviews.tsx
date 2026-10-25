import { GemIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";

// No review data source exists yet — show an honest empty state rather than fabricated ratings.
// Burgundy-dark band in the product page's alternating sections, so the empty
// state is drawn here in light colours rather than with the shared EmptyState.
export function ProductReviews() {
  return (
    <section className="bg-burgundy-dark py-16 lg:py-24">
      <Container>
        <p className="eyebrow text-xs text-gold">Reviews</p>
        <h2 className="mt-4 font-serif text-3xl text-moonlight sm:text-4xl">Customer Reviews</h2>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30">
            <GemIcon className="h-6 w-6" />
          </span>
          <h3 className="font-serif text-2xl text-moonlight">No reviews yet</h3>
          <p className="max-w-sm text-sm text-moonlight/70">
            Be among the first to share your experience with this piece.
          </p>
        </div>
      </Container>
    </section>
  );
}
