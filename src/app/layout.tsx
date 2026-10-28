import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { analyticsConfig } from "@/config/analytics";
import { absoluteAssetUrl, absoluteUrl, organizationId, siteConfig, socialLinks, websiteId } from "@/config/site";
import { isComingSoon } from "@/config/launch";
import { defaultOgImage } from "@/utils/metadata";

// Primary (headings, --font-display): Cormorant Garamond — high-contrast serif
// with a true italic for the gold accent lines. If the licensed "Black Mango"
// files arrive, swap this for a next/font/local call and keep the variable name
// so no other file needs to change.
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Secondary (body and UI, --font-body): Jost — clean geometric sans.
const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Silver Jewellery`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Renders <meta name="facebook-domain-verification" content="…"> in <head>.
  verification: {
    other: { "facebook-domain-verification": "qz2ea7rowqd1y65eflcztucmnyowgc" },
  },
  // Pages built with buildMetadata set this themselves; this covers any route
  // that doesn't (e.g. not-found) while the site is gated.
  ...(isComingSoon ? { robots: { index: false, follow: false } } : {}),
  // Replaces the old placeholder gem-shaped app/icon.svg — this points
  // straight at the real logo instead, so there's only one favicon source.
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage.url],
  },
};

// One @graph instead of separate Organization/WebSite blocks, so the two
// nodes (and every page that references their @id) resolve as one entity.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      // TODO(client): legalName
      url: absoluteUrl("/"),
      description: siteConfig.description,
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl("/logo/logo.png"),
        width: 2277,
        height: 2044,
      },
      image: absoluteAssetUrl(defaultOgImage.url),
      founder: { "@type": "Person", name: siteConfig.founder },
      sameAs: Object.values(socialLinks),
      // TODO(client): telephone — config/contact.ts still marks the phone and
      // email as unconfirmed placeholders, so no ContactPoint is published.
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      inLanguage: "en-IN",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Every product/category/banner image is served from ImageKit — opening
  // the connection (DNS + TLS) up front saves a round-trip on the first one.
  preconnect("https://ik.imagekit.io");

  return (
    <html
      lang="en-IN"
      // globals.css sets scroll-behavior: smooth; this tells Next 16 to
      // switch it off during route changes so a new page jumps straight to
      // the top instead of animating (and stopping partway down).
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-ivory text-charcoal"
        suppressHydrationWarning
      >
        {/* Tag snippets load on first interaction — see AnalyticsScripts. */}
        <AnalyticsScripts />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
          {/* Meta's noscript fallback requires a plain tracking image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${analyticsConfig.metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <JsonLd data={siteJsonLd} />
        <SiteChrome comingSoon={isComingSoon}>{children}</SiteChrome>
      </body>
    </html>
  );
}
