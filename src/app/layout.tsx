import type { Metadata } from "next";
import Script from "next/script";
import { preconnect } from "react-dom";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
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
        {/* next/script hoists these into <head> itself regardless of
            strategy — they need to live inside <body> in the JSX tree (per
            Next's own root-layout example) for React 19's script-ordering
            check to have somewhere to hoist them from. Rendering them as
            siblings of <body> under <html> left React unable to determine
            load order at all.
            All four load with lazyOnload (after the window load event, when
            the browser is idle): together they were ~4.5s of main-thread
            work on a throttled phone, and as beforeInteractive/afterInteractive
            they ran (and the gtag.js preload downloaded) alongside the hero
            photo and hydration. Each queues its own calls until it loads,
            so the page view is still recorded, just after the page is up. */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(analyticsConfig.gtmId)});`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4Id}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(analyticsConfig.ga4Id)});`}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(analyticsConfig.metaPixelId)});
fbq('track', 'PageView');`}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(analyticsConfig.clarityId)});`}
        </Script>
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
