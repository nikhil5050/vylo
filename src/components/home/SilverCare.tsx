import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { careTips } from "@/config/productContent";
import { headingId } from "@/content/blog";

// The care section of the 925 sterling silver guide (BlogBody gives each H2 a headingId anchor).
const careGuideHref = `/blog/why-vylore-chooses-925-sterling-silver/#${headingId(
  "How to Care for 925 Sterling Silver Jewellery",
)}`;

export function SilverCare() {
  return (
    <section className="bg-burgundy-dark py-16 lg:py-[120px]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <FadeIn>
            <p className="eyebrow text-xs text-gold">Silver Care</p>
            <h2 className="mt-4 font-serif text-4xl text-moonlight sm:text-5xl">
              Keep Your Silver Shining.
            </h2>
            <p className="mt-4 max-w-lg text-base text-moonlight/75">
              925 sterling silver can tarnish over time. A few simple habits keep
              your Vylore jewellery bright, beautiful and ready to wear.
            </p>
          </FadeIn>
          <Link
            href={careGuideHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-moonlight"
          >
            Read the Full Care Guide
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {careTips.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <FadeIn delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30">
                    <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-moonlight sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-moonlight/70">{text}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
