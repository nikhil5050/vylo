import { TrustindexWidget } from "@/components/home/TrustindexWidget";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function Testimonials() {
  return (
    <section className="bg-moonlight py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="text-center">
          <p className="eyebrow text-xs text-muted">In Their Words</p>
          <h2 className="mt-4 font-serif text-4xl text-[#680307] sm:text-5xl">The Vylore Experience.</h2>
          <p className="mt-4 text-base text-muted">
            Jewellery is personal. So is the experience of finding the right piece.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          <TrustindexWidget />
        </FadeIn>
      </Container>
    </section>
  );
}
