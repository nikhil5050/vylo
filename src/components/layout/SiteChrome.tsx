"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
      <div key={pathname} id="main-content" className="page-enter flex flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
}
