import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { faqCategories } from "@/config/faq";

const shippingCategory = faqCategories.find((category) => category.id === "shipping")!;

export default function ShippingPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Shipping</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          Everything you need to know about how your order gets to you.
        </p>

        <div className="mt-10">
          <Accordion
            items={shippingCategory.items.map((item) => ({
              id: item.id,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </div>

        <p className="mt-10 text-sm leading-6 text-muted">
          Want to check on an order already placed?{" "}
          <Link href="/track-order" className="text-burgundy underline underline-offset-2">
            Track your order
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-burgundy underline underline-offset-2">
            contact us
          </Link>{" "}
          with your order ID.
        </p>
      </Container>
    </main>
  );
}
