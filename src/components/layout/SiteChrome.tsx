"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { StoreToaster } from "@/components/ui/AddedToBagToast";

// The /admin section renders its own sidebar/header chrome (see
// app/admin/layout.tsx) and must not be wrapped in the storefront's
// Header/Footer — this is the one place that decides which shell applies.
// `comingSoon` comes from the root layout (a server component, so it can
// read the COMING_SOON env var directly) — while it's on, "/" renders the
// full-screen ComingSoon page and shouldn't get nav links pointing at
// routes proxy.ts is redirecting away from anyway.
export function SiteChrome({ children, comingSoon }: { children: ReactNode; comingSoon: boolean }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isComingSoonRoot = comingSoon && pathname === "/";

  // The route fade only runs after a client-side navigation, never on the
  // first page load: fading the server-rendered page in from opacity 0 held
  // back the hero photo (the mobile LCP element) from counting as painted
  // until the fade finished, which Lighthouse then chained behind all the
  // hydration JS. Set during render (React's "store info from previous
  // renders" pattern) so the very first frame of a new route already has
  // the class, with no flash of unfaded content.
  const [initialPathname] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);
  if (!hasNavigated && pathname !== initialPathname) setHasNavigated(true);
  const fadeIn = hasNavigated || pathname !== initialPathname;

  if (isAdmin || isComingSoonRoot) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-burgundy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Header />
      {/* Route fade-in is a CSS animation (.page-enter in globals.css), not a
          framer-motion AnimatePresence transition: with mode="wait", a JS
          enter animation that got interrupted or paused (slow CPU, back/
          forward, tab hidden mid-navigation) left this wrapper stuck at
          opacity 0 — the new page fully rendered but invisible until a
          refresh. A CSS animation always settles on the visible end state. */}
      <div key={pathname} id="main-content" className={`${fadeIn ? "page-enter " : ""}flex flex-1 flex-col`}>
        {children}
      </div>
      <Footer />
      <StoreToaster />
    </>
  );
}
