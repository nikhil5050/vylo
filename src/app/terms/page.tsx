import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { contactInfo } from "@/config/contact";

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm leading-6 text-muted">Last updated: September 12, 2026</p>

        <p className="mt-6 border border-champagne/40 bg-champagne/10 p-4 text-sm text-muted">
          Our legal entity name and registration details are pending confirmation and will be added below once
          available.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <p>
              These Terms &amp; Conditions govern your use of the Vylore website and your purchase of Vylore
              jewellery. By accessing the website or placing an order, you agree to these Terms &amp; Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">About Vylore</h2>
            <p className="mt-2">
              Vylore is a jewellery brand specialising in contemporary 925 sterling silver jewellery, combining
              thoughtful design, craftsmanship and refined finishing.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Legal Entity: to be confirmed.</li>
              <li>Registered Address: {contactInfo.address}.</li>
              <li>
                Customer Support Email:{" "}
                <a href={`mailto:${contactInfo.email}`} className="text-burgundy underline underline-offset-2">
                  {contactInfo.email}
                </a>
                .
              </li>
              <li>Contact Number: {contactInfo.phone}.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Product Information</h2>
            <p className="mt-2">
              Vylore makes reasonable efforts to provide accurate product descriptions, photographs,
              specifications, sizes, weights and pricing. Minor variations may occur due to hand-finishing,
              craftsmanship, lighting and photography, individual screen settings, natural characteristics of
              silver, or different polishing or finishing techniques. Such variations do not automatically
              constitute a product defect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">925 Sterling Silver &amp; Hallmarked Jewellery</h2>
            <p className="mt-2">
              Vylore jewellery is crafted using 925 sterling silver, unless otherwise specified. 925 sterling
              silver contains 92.5% pure silver. Where applicable, jewellery may carry the relevant hallmark or
              purity identification, which represents the applicable silver purity of the jewellery and supports
              confidence in the material used.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Polish &amp; Finish</h2>
            <p className="mt-2">
              Silver jewellery may be available with different finishes or polishing styles. Certain designs may
              intentionally feature an oxidised finish as part of their aesthetic. Differences in polish, finish,
              texture or appearance may therefore be intentional design characteristics and should not
              automatically be considered defects.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Natural Silver Appearance</h2>
            <p className="mt-2">
              Silver is a natural material and its appearance can change depending on environmental exposure, wear
              and care. Exposure to air, moisture, perspiration, perfumes, cosmetics, detergents and chemicals may
              affect the appearance or finish of jewellery, which may gradually appear dull depending on
              environmental conditions, usage and care. Such natural changes in appearance do not automatically
              constitute a manufacturing defect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">18K Gold Electroplating</h2>
            <p className="mt-2">
              Where a Vylore product features 18K gold electroplating, the finish requires appropriate care.
              Customers should avoid direct exposure to perfumes, detergents, harsh chemicals, chemical-based
              cleaning products, excessive moisture, and other substances that may affect the plated surface. With
              appropriate care, the 18K gold electroplated finish may last 8 months or longer, depending on usage,
              frequency of wear, exposure and care of the jewellery. This duration is an approximate expected
              period and is not an unconditional guarantee of plating performance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Jewellery Care</h2>
            <p className="mt-2">To preserve the appearance and finish of your Vylore jewellery:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Keep jewellery away from perfumes and cosmetics where possible.</li>
              <li>Avoid detergents and harsh chemicals.</li>
              <li>Remove jewellery before activities involving chemicals or excessive moisture.</li>
              <li>Store jewellery carefully when not in use.</li>
              <li>Avoid unnecessary friction or impact.</li>
              <li>Follow any product-specific care instructions provided by Vylore.</li>
            </ul>
            <p className="mt-2">Proper care can help maintain the finish and appearance of your jewellery for longer.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Product Pricing</h2>
            <p className="mt-2">
              Product prices displayed on the website may change without prior notice. Vylore reserves the right
              to correct genuine pricing, description or listing errors. If an obvious error affects an order,
              Vylore may contact the customer before fulfilment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Product Availability</h2>
            <p className="mt-2">
              All products are subject to availability. Certain Vylore designs may be produced in limited
              quantities or as one-of-one pieces. If a product becomes unavailable after an eligible replacement
              has been approved, Vylore will connect with the customer regarding the appropriate available
              resolution.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Orders</h2>
            <p className="mt-2">
              Placing an order constitutes a request to purchase the selected product. Vylore may decline or
              cancel an order where reasonably necessary, including because of product unavailability, pricing or
              listing errors, suspected fraudulent activity, payment issues, incorrect customer information, or
              technical or operational issues.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Payment</h2>
            <p className="mt-2">
              Payments may be processed through authorised third-party payment service providers. Customers are
              responsible for providing accurate billing and payment information. An order is considered
              successfully placed after payment has been successfully authorised or confirmed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Cancellation</h2>
            <p className="mt-2">
              Cancellation availability may depend on the status of the order. For customised, personalised,
              made-to-order or advance-order products, cancellation restrictions may apply once production or
              processing has commenced. Customers should contact Vylore as soon as possible regarding any
              cancellation request.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Policy</h2>
            <p className="mt-2">
              Vylore follows a replacement-only policy. Eligible replacement requests must be raised within 7 days
              of delivery, for reasons including a wrong product, a defective product, a genuine sizing issue,
              damage, or missing stones or components. Customised, personalised and made-to-order jewellery is not
              eligible for replacement. Where the issue is confirmed to be from Vylore&apos;s end, applicable
              replacement shipping costs will be covered by Vylore. The complete procedure is set out in our{" "}
              <Link href="/returns" className="text-burgundy underline underline-offset-2">
                Replacement Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Customised Jewellery</h2>
            <p className="mt-2">
              Customised jewellery is created according to customer-approved requirements and is not eligible for
              replacement. Customers are responsible for carefully confirming design requirements, measurements,
              sizes, personalisation details and other specifications provided to Vylore.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Promotions &amp; Offers</h2>
            <p className="mt-2">
              Promotional offers, discounts and campaigns may be subject to separate terms. Vylore may modify,
              suspend or discontinue promotional offers where reasonably necessary.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Intellectual Property</h2>
            <p className="mt-2">
              All designs, logos, and content on the Vylore website are the property of Vylore and may not be used
              without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Limitation of Liability</h2>
            <p className="mt-2">
              Vylore is not liable for indirect or consequential losses arising from the use of this website, to
              the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Governing Law</h2>
            <p className="mt-2">These terms are governed by the laws of India.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Changes to These Terms</h2>
            <p className="mt-2">
              Vylore may update these terms from time to time. Continued use of the website means you accept the
              current terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Contact Us</h2>
            <p className="mt-2">
              For questions about these terms, please reach out via our{" "}
              <Link href="/contact" className="text-burgundy underline underline-offset-2">
                Contact page
              </Link>{" "}
              or at{" "}
              <a href={`mailto:${contactInfo.email}`} className="text-burgundy underline underline-offset-2">
                {contactInfo.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 border-t border-silver/30 pt-6 text-sm leading-6 text-muted">
          Related:{" "}
          <Link href="/returns" className="text-burgundy underline underline-offset-2">
            Replacement Policy
          </Link>{" "}
          ·{" "}
          <Link href="/shipping" className="text-burgundy underline underline-offset-2">
            Shipping Policy
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
