"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { safeNextPath } from "@/utils/safeNext";

// The "Create an account" / "Sign in" link between /login and /register —
// carries ?next= across, so switching forms mid-checkout doesn't lose the
// way back to /checkout.
export function AuthSwitchLink({ href, children }: { href: "/login" | "/register"; children: ReactNode }) {
  const next = safeNextPath(useSearchParams().get("next"));
  return (
    <Link
      href={next ? `${href}?next=${encodeURIComponent(next)}` : href}
      className="font-medium text-burgundy transition-colors hover:text-burgundy-dark"
    >
      {children}
    </Link>
  );
}
