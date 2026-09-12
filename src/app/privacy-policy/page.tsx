import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { contactInfo } from "@/config/contact";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-6 text-muted">Last updated: September 12, 2026</p>

        <p className="mt-6 border border-champagne/40 bg-champagne/10 p-4 text-sm text-muted">
          Our legal entity name and registration details are pending confirmation and will be added below once
          available.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <p>
              Vylore respects your privacy and is committed to handling your personal information responsibly.
              This Privacy Policy explains what information we collect, why we collect it, how we use it, when it
              may be shared and the choices available to you. By using the Vylore website or purchasing our
              products, you acknowledge the practices described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">About Us</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Legal Entity: to be confirmed.</li>
              <li>Address: {contactInfo.address}.</li>
              <li>
                Privacy Contact:{" "}
                <a href={`mailto:${contactInfo.email}`} className="text-burgundy underline underline-offset-2">
                  {contactInfo.email}
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Information We Collect</h2>
            <p className="mt-2">Depending on how you interact with Vylore, we may collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Full name, email address, and mobile or telephone number.</li>
              <li>Billing and shipping address.</li>
              <li>Order information, jewellery preferences, and product or collection interests.</li>
              <li>Jewellery size or measurement information.</li>
              <li>Customisation or personalisation information, where applicable.</li>
              <li>Advance-order or pre-order information.</li>
              <li>Customer account information and customer service communications.</li>
              <li>Enquiry details, reviews and feedback.</li>
              <li>Information, photographs or videos submitted to support a replacement request.</li>
              <li>Information relating to product damage, missing stones or sizing concerns.</li>
            </ul>
            <p className="mt-2">
              We collect only information that is reasonably relevant to the purpose for which it is provided or
              required.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Jewellery Size Information</h2>
            <p className="mt-2">
              When you provide ring, bracelet, anklet or other jewellery sizing information, we may use it to
              process the order, prepare the correct product, respond to sizing enquiries, assess eligible
              sizing-related replacement requests, and provide customer support. You are responsible for providing
              accurate sizing information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Customised &amp; Personalised Jewellery Information</h2>
            <p className="mt-2">
              Where you request customised or personalised jewellery, we may collect design references,
              measurements, personalisation details, customer-approved specifications, images or reference
              materials, and communication relating to the custom order. This information is used to understand,
              create and fulfil your requested design. Customised jewellery is not eligible for replacement under
              our{" "}
              <Link href="/returns" className="text-burgundy underline underline-offset-2">
                Replacement Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Advance Orders &amp; Pre-Orders</h2>
            <p className="mt-2">
              Where Vylore offers advance orders or pre-orders, we may collect and process information necessary
              to record the order, confirm payment, communicate production or availability information, arrange
              fulfilment and delivery, and provide customer support. Applicable conditions will be communicated
              during the ordering process.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Payment Information</h2>
            <p className="mt-2">
              Payments may be processed through authorised third-party payment providers. Where payment is handled
              by a third-party provider, Vylore may not directly receive or store complete payment-card
              information. Payment providers may process payment information according to their own terms and
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Replacement-Related Information</h2>
            <p className="mt-2">
              If you submit a replacement request, we may collect information required to assess and process it,
              including your order number, product information, reason for replacement, size information,
              photographs, unboxing videos, images of the product or packaging, information concerning missing
              stones or components, and related communications. For damaged-product claims, you may be asked to
              provide an unboxing video showing the package label and seal before or during opening, together with
              photographs where required. This information is used only as reasonably necessary to assess the
              request, verify the issue, prevent misuse and process an eligible replacement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Why We Use Your Information</h2>
            <p className="mt-2">Vylore may use collected information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Process and fulfil orders, and arrange delivery.</li>
              <li>Provide customer support and respond to enquiries.</li>
              <li>Process eligible replacement requests and assess sizing-related concerns.</li>
              <li>Communicate order updates and manage customised, personalised and advance orders.</li>
              <li>Process payments through authorised providers.</li>
              <li>Improve products, services and website functionality, and understand customer preferences.</li>
              <li>Conduct analytics, prevent fraud and misuse, and protect website and customer security.</li>
              <li>Meet legal and regulatory obligations and enforce our policies.</li>
              <li>Send marketing communications where permitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Product Care &amp; Jewellery Enquiries</h2>
            <p className="mt-2">
              If you contact us regarding anti-tarnish care, silver appearance, gold electroplating, polish or
              finish, jewellery maintenance, perfume or chemical exposure, or product condition, we may retain
              relevant communication and product information to provide customer support and maintain appropriate
              service records.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Jewellery Quality &amp; Product Information</h2>
            <p className="mt-2">
              Information relating to your purchased jewellery may be associated with your order record, including
              product name, category, silver purity information, hallmark or product identification, size, finish
              or polish, plating information, and order and delivery details. This information may be used for
              order fulfilment, customer service, replacement assessment, product support and record-keeping.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Customer Communications</h2>
            <p className="mt-2">
              We may contact you regarding orders, payments, delivery, sizing, customised jewellery, advance
              orders, replacement requests, product-care enquiries, customer support, account-related matters, and
              important service updates. Service-related communications may continue even if you opt out of
              promotional communications.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Marketing Communications</h2>
            <p className="mt-2">
              Where permitted, Vylore may send promotional communications relating to new collections, product
              launches, offers, campaigns, events and brand updates. You may opt out of promotional communications
              using the unsubscribe option provided or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Cookies &amp; Similar Technologies</h2>
            <p className="mt-2">
              We may use cookies and similar technologies to remember preferences, maintain shopping-cart
              functionality, understand website traffic, improve website performance, analyse customer
              interactions, support website security, measure marketing effectiveness, and provide relevant website
              experiences. You may be able to control cookies through your browser settings; disabling certain
              cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Analytics</h2>
            <p className="mt-2">
              We may use analytics services to understand how visitors interact with the website, including which
              pages receive visits, how customers navigate the site, website performance, general traffic patterns,
              user interactions, and product and collection engagement. Analytics providers may process information
              according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">How We Share Information</h2>
            <p className="mt-2">
              Vylore does not sell personal information as a standalone commercial product. We may share relevant
              information with trusted service providers where necessary to operate our business, including
              payment providers, courier and logistics partners, website hosting providers, technology providers,
              analytics providers, marketing and communication providers, customer support providers,
              fraud-prevention and security providers, and professional advisers. Information may also be disclosed
              where required by law or where reasonably necessary to protect Vylore&apos;s legal rights, customers,
              website or business.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Data Security</h2>
            <p className="mt-2">
              Vylore takes reasonable technical and organisational measures to protect personal information
              against unauthorised access, misuse, alteration, disclosure or loss. However, no method of internet
              transmission or electronic storage can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Data Retention</h2>
            <p className="mt-2">
              We may retain personal information for as long as reasonably necessary to fulfil orders, provide
              customer support, maintain order and business records, process replacement requests, resolve
              disputes, and meet legal and regulatory obligations. When information is no longer required, it may
              be securely deleted, anonymised or otherwise handled in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Your Privacy Rights</h2>
            <p className="mt-2">Subject to applicable law, you may have rights relating to your personal information, including the ability to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Request access to information held about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion where legally applicable.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Opt out of promotional communications.</li>
              <li>Raise a privacy-related complaint.</li>
            </ul>
            <p className="mt-2">Requests may be made using the contact details in this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Account Security</h2>
            <p className="mt-2">
              If you create an account on the Vylore website, you are responsible for maintaining the
              confidentiality of your account credentials. Please notify us promptly if you believe your account
              has been accessed without authorisation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Children&apos;s Privacy</h2>
            <p className="mt-2">
              The Vylore website is not intended to knowingly collect personal information from children without an
              appropriate legal basis or parental/guardian involvement where required by applicable law. If you
              believe that a child has provided personal information to us improperly, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">International Data Transfers</h2>
            <p className="mt-2">
              Where Vylore or its service providers process information outside India, information may be
              transferred or processed in other jurisdictions in accordance with applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Third-Party Websites</h2>
            <p className="mt-2">
              The Vylore website may contain links to third-party websites or services. Vylore is not responsible
              for the privacy practices, content or security of third-party websites. Please review the privacy
              policies of those websites before providing personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Social Media</h2>
            <p className="mt-2">
              If you interact with Vylore through social media platforms, information may also be processed by
              those platforms according to their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Fraud &amp; Security</h2>
            <p className="mt-2">
              Vylore may use personal and technical information to identify suspicious activity, prevent
              fraudulent transactions, protect customers, maintain website security, and investigate potential
              misuse of services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Changes to This Privacy Policy</h2>
            <p className="mt-2">
              Vylore may update this Privacy Policy from time to time to reflect changes in our business,
              technology, services or applicable legal requirements. The revised policy will be published on this
              page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Contact Us</h2>
            <p className="mt-2">
              For questions, concerns or requests regarding this Privacy Policy or the way your information is
              handled, please contact us via our{" "}
              <Link href="/contact" className="text-burgundy underline underline-offset-2">
                Contact page
              </Link>
              , at{" "}
              <a href={`mailto:${contactInfo.email}`} className="text-burgundy underline underline-offset-2">
                {contactInfo.email}
              </a>
              , or by phone at {contactInfo.phone}.
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
          <Link href="/terms" className="text-burgundy underline underline-offset-2">
            Terms &amp; Conditions
          </Link>
        </p>
      </Container>
    </main>
  );
}
