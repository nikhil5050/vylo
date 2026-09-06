import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactInfo } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { isComingSoon } from "@/config/launch";

// TEMPORARY stand-in for "Black Mango" (a paid/personal-use display font,
// not on Google Fonts — see AGENTS.md note or ask about licensing). Swap this
// next/font/google call for a next/font/local call against the licensed
// Black Mango files once available; keep the "--font-display" variable name
// so no other file needs to change.
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Silver Jewellery`,
    template: `%s | ${siteConfig.name}`,
  },
  
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
  },
  twitter: {
    card: "summary",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: `${siteConfig.url}/logo/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    areaServed: "IN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
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
            load order at all. */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K6SXZHSJ');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GX4R2NYDD0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GX4R2NYDD0');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6SXZHSJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteChrome comingSoon={isComingSoon}>{children}</SiteChrome>
      </body>
    </html>
  );
}
