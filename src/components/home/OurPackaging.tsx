import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const packagingHighlights = [
  "Gift-Ready Presentation",
  "Reusable Jewellery Box",
  "Certificate of Authenticity",
];

export function OurPackaging() {
  return (
    <section className="bg-[#FAF9F6] py-10 lg:py-14">
      <Container className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
        <FadeIn direction="left" className="flex flex-col items-start lg:order-1">
          <p className="eyebrow text-xs text-muted">Our Packaging</p>
          <h2 className="mt-2 font-serif text-2xl text-[#680307] sm:text-3xl lg:text-4xl">
            Considered Down To The Box.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted sm:text-base">
            The unboxing is part of the experience. Every Vylore order arrives in
            packaging built to protect, present and last.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {packagingHighlights.map((item) => (
              <span key={item} className="text-xs font-medium text-charcoal sm:text-sm">
                <span className="mr-1.5 text-burgundy">•</span>
                {item}
              </span>
            ))}
          </div>

          <Button href="/shop" variant="secondary" size="sm" className="mt-6">
            Shop The Collection
          </Button>
        </FadeIn>

        <FadeIn direction="right" delay={0.1} className="lg:order-2">
          <div className="relative h-[220px] w-full sm:h-[260px] lg:h-[300px]">
            <Image
              src="https://ik.imagekit.io/vyloreimgs/vylore/packaging.png?tr=e-removedotbg,f-png"
              alt="Vylore Jewellery Packaging"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
