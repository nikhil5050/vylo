import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function FinalCta() {
  return (
    <section className="border-t border-white/10 bg-burgundy-dark py-14 sm:py-16">
      <Container className="flex flex-col items-center text-center">
        <FadeIn>
          <p className="eyebrow text-xs text-gold">Shop Vylore</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-moonlight sm:text-4xl">
            Your Story, Set in Silver.
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-moonlight/75 sm:text-base">
            Discover genuine 925 sterling silver jewellery designed for everyday wear.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          {/* Light button on the dark section; moonlight hover instead of the
              inverse variant's cherry, which would sink into the background. */}
          <Button
            href="/shop"
            variant="inverse"
            size="lg"
            className="w-full hover:bg-moonlight! hover:text-burgundy! sm:w-auto"
          >
            Shop All Jewellery
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
