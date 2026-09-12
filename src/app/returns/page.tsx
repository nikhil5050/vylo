import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { contactInfo } from "@/config/contact";

export default function ReplacementPolicyPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Replacement Policy" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Replacement Policy</h1>
        <p className="mt-4 text-sm leading-6 text-muted">Last updated: September 12, 2026</p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <p>
              At Vylore, every piece of jewellery is prepared with attention to craftsmanship, finish and
              presentation. We want every order to reach you in the condition and form you expect.
            </p>
            <p className="mt-2">
              Vylore follows a <strong className="text-charcoal">replacement-only policy</strong>. We do not offer
              general returns, refunds or exchanges. Replacement is available only in the specific circumstances
              described below. By placing an order with Vylore, you acknowledge and agree to this Replacement
              Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">When Is a Replacement Available?</h2>
            <p className="mt-2">
              A replacement may be requested within 7 days of delivery if the product falls under one of the
              following valid reasons, subject to verification and approval by the Vylore team:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>The wrong product was delivered.</li>
              <li>The product is defective.</li>
              <li>The jewellery does not fit due to a genuine sizing issue.</li>
              <li>The product arrived damaged.</li>
              <li>Stones or other intended components are missing from the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Request Period</h2>
            <p className="mt-2">
              Eligible replacement requests must be raised within 7 days of delivery. We encourage customers to
              inspect their jewellery immediately after receiving the order and contact us as soon as an issue is
              identified. Requests submitted after 7 days may not be accepted unless otherwise required under
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Conditions for Replacement</h2>
            <p className="mt-2">For a replacement request to be considered, please:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Keep the jewellery in its original condition.</li>
              <li>Avoid wearing or using the product once an issue has been identified.</li>
              <li>Retain the original packaging.</li>
              <li>Keep all tags, cards, certificates and accessories supplied with the order.</li>
              <li>Provide the order number and relevant product information.</li>
              <li>Provide photographs or videos when requested by Vylore.</li>
            </ul>
            <p className="mt-2">Vylore may assess the product and supporting evidence before approving the replacement.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Damaged Product — Required Proof</h2>
            <p className="mt-2">If a product appears damaged when received:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Avoid wearing or using the jewellery.</li>
              <li>Keep the jewellery and original packaging safely.</li>
              <li>Record an unboxing video showing the package, label and seal before and during opening.</li>
              <li>
                The package label/seal should be clearly visible and should not have been torn apart before the
                unboxing evidence is recorded.
              </li>
              <li>Provide clear photographs of the damaged jewellery if requested.</li>
              <li>Contact Vylore within 7 days of delivery, with your order number and any other information requested.</li>
            </ul>
            <p className="mt-2">
              An unboxing video may be particularly important when reporting transit damage, missing stones or
              missing components. Vylore may request additional photographs, videos or information where necessary
              to assess the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Wrong Product</h2>
            <p className="mt-2">
              If you receive a product different from the one ordered, please contact us within 7 days of delivery.
              After verification, if the error is confirmed to have occurred from Vylore&apos;s end, the eligible
              product will be replaced subject to availability.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Defective Product</h2>
            <p className="mt-2">
              If the jewellery has a confirmed manufacturing defect, you may request a replacement within 7 days of
              delivery. Vylore may inspect the product to determine whether the issue is a manufacturing defect or
              has resulted from wear, handling, storage, chemicals, accidental damage or other external factors. If
              the defect is confirmed, Vylore will proceed with the replacement in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Size-Related Replacement</h2>
            <p className="mt-2">
              We recognise that jewellery sizing is important for a comfortable fit. If a product does not fit due
              to a genuine sizing issue, contact us within 7 days of delivery for assessment. You may be required to
              provide relevant size information, photographs or other details. Any replacement for a sizing issue
              remains subject to product availability and assessment — please carefully review the size information
              on the product page before ordering.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Customised and Personalised Jewellery</h2>
            <p className="mt-2">
              Customised, personalised and made-to-order jewellery is not eligible for replacement, because these
              pieces are created specifically according to the customer&apos;s requirements. This includes:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Change of mind.</li>
              <li>Personal preference.</li>
              <li>Customer-requested design specifications.</li>
              <li>Customer-provided measurements or information.</li>
              <li>Design preferences after production.</li>
              <li>Minor variations resulting from handcrafted production.</li>
            </ul>
            <p className="mt-2">
              Please carefully confirm all design, size, measurement and personalisation details before approving a
              customised order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">What Is Not Covered</h2>
            <p className="mt-2">Replacement is not available for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Change of mind or personal preference.</li>
              <li>Jewellery that has been worn or damaged after delivery.</li>
              <li>Scratches, dents or marks caused by use.</li>
              <li>Improper handling or storage.</li>
              <li>Damage caused by perfumes, detergents, chemicals or other unsuitable substances.</li>
              <li>Damage caused by failure to follow jewellery-care instructions.</li>
              <li>Normal changes in appearance associated with wear or environmental exposure.</li>
              <li>Products altered, repaired, resized or modified after delivery without Vylore&apos;s approval.</li>
              <li>Customised, personalised or made-to-order jewellery.</li>
            </ul>
            <p className="mt-2">Nothing in this policy limits any rights available to customers under applicable law.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Shipping Cost</h2>
            <p className="mt-2">
              If the issue is confirmed to have occurred from Vylore&apos;s end, we will bear the applicable shipping
              cost for the approved replacement. This includes eligible situations such as the wrong product being
              sent, a confirmed product defect, confirmed transit damage, or missing stones/components attributable
              to an issue from Vylore&apos;s end. Where the issue is not attributable to Vylore, any applicable cost
              will be communicated before proceeding.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Product</h2>
            <p className="mt-2">
              Where a replacement is approved, Vylore will generally provide the same product, subject to
              availability. If the product is a one-of-one piece and the exact product is no longer available, we
              will connect with you to discuss the appropriate resolution — which may include repair of the
              original piece where feasible, or a mutually discussed alternative product. The applicable resolution
              depends on the condition of the jewellery, availability, the nature of the issue and the circumstances
              of the order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Assessment</h2>
            <p className="mt-2">
              Every replacement request is subject to assessment by Vylore. We may request order details,
              photographs, an unboxing video, product videos, size information, or additional information relating
              to the reported issue. Submitting a request does not automatically guarantee approval — replacement is
              processed only after the request has been reviewed and approved.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement Process</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Contact Vylore within 7 days of delivery.</li>
              <li>Share your order number and product information.</li>
              <li>Provide photographs, videos or an unboxing video where required.</li>
              <li>Our team reviews the request.</li>
              <li>If the request qualifies, we confirm the replacement process.</li>
              <li>Where required, the product may be inspected.</li>
              <li>The same product is arranged, subject to availability.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Start a Replacement Request</h2>
            <p className="mt-2">
              Contact us via our{" "}
              <Link href="/contact" className="text-burgundy underline underline-offset-2">
                Contact page
              </Link>{" "}
              or at{" "}
              <a href={`mailto:${contactInfo.email}`} className="text-burgundy underline underline-offset-2">
                {contactInfo.email}
              </a>{" "}
              with your order ID and details of the issue, and our team will guide you through the next steps.
            </p>
          </section>
        </div>

        <p className="mt-10 border-t border-silver/30 pt-6 text-sm leading-6 text-muted">
          Related:{" "}
          <Link href="/shipping" className="text-burgundy underline underline-offset-2">
            Shipping Policy
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
