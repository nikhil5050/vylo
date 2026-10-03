"use client";

import { useEffect, useRef, useState } from "react";

// Trustindex widget id (from the embed code in the Trustindex dashboard).
// The widget's layout, colours and which reviews it shows are configured
// there, not here.
const WIDGET_SRC = "https://cdn.trustindex.io/loader.js?c7fe0bd82d1582485906c15fddd";

// Trustindex's loader renders the widget next to its own <script> tag, so the
// tag has to live inside this container. A script in JSX (or via next/script)
// wouldn't do that: React never executes inline <script> elements, and
// next/script injects into <head>/<body> instead.
export function TrustindexWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hide the skeleton as soon as Trustindex inserts its markup.
    const observer = new MutationObserver(() => {
      if (container.querySelector(".ti-widget")) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.defer = true;
    container.appendChild(script);

    return () => {
      observer.disconnect();
      // Clears the script and rendered widget so a remount (client-side
      // navigation back to home, Strict Mode in dev) doesn't render it twice.
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="relative min-h-[280px]">
      {!loaded && (
        <div className="absolute inset-0 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`animate-pulse rounded-2xl border border-silver/50 bg-white p-6 sm:p-8 ${i > 0 ? "hidden md:block" : ""} ${i > 1 ? "md:hidden lg:block" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-silver/40" />
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-silver/40" />
                  <div className="h-2.5 w-16 rounded bg-silver/30" />
                </div>
              </div>
              <div className="mt-6 h-3 w-24 rounded bg-silver/40" />
              <div className="mt-5 space-y-2.5">
                <div className="h-3 rounded bg-silver/30" />
                <div className="h-3 rounded bg-silver/30" />
                <div className="h-3 w-2/3 rounded bg-silver/30" />
              </div>
            </div>
          ))}
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
