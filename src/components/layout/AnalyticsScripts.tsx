"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsConfig } from "@/config/analytics";

// GTM, both GA4 tags, the Meta pixel and Clarity were ~5.5s of main-thread
// work on a throttled phone — most of the page's Total Blocking Time. Even
// with lazyOnload they still ran in the first seconds after load, while
// the page was settling. They now load on the visitor's first interaction
// (scroll, tap, key, mouse move), or FALLBACK_MS after the load event for
// someone who just reads the first screen. Each snippet queues its own
// calls until its library arrives, so the PageView is still recorded.
const INTERACTION_EVENTS = ["scroll", "pointerdown", "touchstart", "keydown", "mousemove", "wheel"] as const;
const FALLBACK_MS = 10_000;

export function AnalyticsScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const start = () => setReady(true);
    const startFallback = () => {
      timer = window.setTimeout(start, FALLBACK_MS);
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, start, { once: true, passive: true }),
    );
    if (document.readyState === "complete") startFallback();
    else window.addEventListener("load", startFallback, { once: true });

    return () => {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, start));
      window.removeEventListener("load", startFallback);
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <Script id="google-tag-manager">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(analyticsConfig.gtmId)});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4Id}`} />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(analyticsConfig.ga4Id)});`}
      </Script>
      <Script id="meta-pixel">
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
      <Script id="microsoft-clarity">
        {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(analyticsConfig.clarityId)});`}
      </Script>
    </>
  );
}
