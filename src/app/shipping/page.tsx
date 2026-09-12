import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function ShippingPolicyPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Shipping Policy</h1>
        <p className="mt-4 text-sm leading-6 text-muted">Last updated: September 12, 2026</p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <p>
              Vylore is committed to carefully preparing, securely packaging and dispatching every jewellery
              order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Shipping Availability</h2>
            <p className="mt-2">
              Vylore offers shipping within India and internationally, subject to service availability for the
              destination.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Order Processing</h2>
            <p className="mt-2">
              Orders are processed after successful payment confirmation. Processing time may vary depending on
              the product and order type — customised, personalised, made-to-order and advance-order products may
              require additional preparation or production time. The applicable timeline will be communicated on
              the relevant product page or during the ordering process.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Delivery Timeline</h2>
            <p className="mt-2">
              For standard orders, customers can generally expect delivery within approximately 4–6 business
              days, subject to destination, courier operations and other circumstances. Delivery timelines are
              estimates and may vary due to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Courier delays.</li>
              <li>Weather conditions.</li>
              <li>Public holidays.</li>
              <li>High order volumes.</li>
              <li>Transportation disruptions.</li>
              <li>Regional restrictions.</li>
              <li>Natural events.</li>
              <li>Circumstances beyond Vylore&apos;s reasonable control.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Shipping Charges</h2>
            <p className="mt-2">
              Applicable shipping charges, if any, will be displayed during checkout before the order is
              completed. Vylore may offer free shipping on selected products, campaigns or orders, subject to
              applicable conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Delivery Address</h2>
            <p className="mt-2">Customers are responsible for providing complete and accurate delivery information, including:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Full name.</li>
              <li>Complete address.</li>
              <li>City and state.</li>
              <li>PIN/postal code.</li>
              <li>Valid contact number.</li>
            </ul>
            <p className="mt-2">
              Vylore is not responsible for delays or failed deliveries resulting from incorrect or incomplete
              information provided by the customer.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Order Tracking</h2>
            <p className="mt-2">
              Once an order has been dispatched, tracking information may be shared through the customer&apos;s
              registered email address, mobile number or applicable communication channel. Tracking information
              may take some time to become active after dispatch.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">International Orders</h2>
            <p className="mt-2">
              For international orders, delivery timelines, shipping charges, customs requirements, import duties
              and local taxes may vary according to the destination country. Unless specifically stated otherwise,
              applicable customs duties, import taxes and local charges may be payable by the customer.
              Customs-related delays are outside Vylore&apos;s direct control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Damaged or Tampered Package</h2>
            <p className="mt-2">If the package appears damaged, opened or tampered with at the time of delivery:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Photograph the package before opening it.</li>
              <li>Record the condition of the package where possible.</li>
              <li>Ensure the package label and seal are visible in the unboxing evidence.</li>
              <li>Retain the original packaging.</li>
              <li>Contact Vylore as soon as possible.</li>
              <li>If the jewellery is damaged or components are missing, raise a replacement request within 7 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Shipments</h2>
            <p className="mt-2">
              Approved replacement shipments are governed by our{" "}
              <Link href="/returns" className="text-burgundy underline underline-offset-2">
                Replacement Policy
              </Link>
              . Where the issue is confirmed to be from Vylore&apos;s end, applicable replacement shipping costs
              will be covered by Vylore.
            </p>
          </section>
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

        <p className="mt-4 border-t border-silver/30 pt-6 text-sm leading-6 text-muted">
          Related:{" "}
          <Link href="/returns" className="text-burgundy underline underline-offset-2">
            Replacement Policy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="text-burgundy underline underline-offset-2">
            Terms &amp; Conditions
          </Link>{" "}
          ·{" "}
          <Link href="/privacy-policy" className="text-burgundy underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </Container>
    </main>
  );
}
