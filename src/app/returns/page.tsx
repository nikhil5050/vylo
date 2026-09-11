import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { faqCategories } from "@/config/faq";

const returnsCategory = faqCategories.find((category) => category.id === "returns")!;

export default function ReturnsPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Returns" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Returns &amp; Exchanges</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          Questions about returning or exchanging an order.
        </p>

        <div className="mt-10">
          <Accordion
            items={returnsCategory.items.map((item) => ({
              id: item.id,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </div>

        <p className="mt-10 text-sm leading-6 text-muted">
          Ready to start a return or exchange?{" "}
          <Link href="/contact" className="text-burgundy underline underline-offset-2">
            Contact us
          </Link>{" "}
          with your order ID and we&apos;ll take it from there.
        </p>
      </Container>
    </main>
  );
}
