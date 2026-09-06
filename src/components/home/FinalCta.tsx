import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function FinalCta() {
  return (
    <section className="border-t border-silver/30 bg-white py-14 sm:py-16">
      <Container className="flex flex-col items-center text-center">
        <FadeIn>
          <p className="eyebrow text-xs text-[#810201]">Shop Vylore</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[#680307] sm:text-4xl">
            Your Story, Set in Silver.
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Discover genuine 925 sterling silver jewellery designed for everyday wear.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          <Button href="/shop" variant="primary" size="lg" className="w-full sm:w-auto">
            Shop All Jewellery
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
