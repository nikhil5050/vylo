import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isComingSoon } from "@/config/launch";
import { siteConfig } from "@/config/site";

// Next.js 16 renamed the middleware.ts convention to proxy.ts (same
// NextRequest/NextResponse API, function just needs to be named `proxy` —
// see node_modules/next/dist/docs/.../file-conventions/proxy.md).

// Stays reachable while the storefront is gated: the admin panel (has its
// own login-based auth in RequireAdmin) and /login, which is exactly where
// RequireAdmin sends an unauthenticated admin. "/" is never redirected — it
// already renders ComingSoon directly (see src/app/page.tsx) when the gate
// is on.
const ALLOWED_PREFIXES = ["/admin", "/login"];

function isAllowedPath(pathname: string) {
  if (pathname === "/") return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return true;
  // Anything with a file extension is a static asset (images, fonts, the
  // manifest, robots.txt, sitemap.xml, etc.) — the matcher below already
  // excludes _next/static, _next/image and favicon.ico, but public/
  // assets like /logo/logo.png or /images/about/*.jpg still flow through
  // here and must not get redirected.
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

// Every canonical tag, sitemap URL and robots.txt points at the www host
// (siteConfig.url), but the bare domain was also answering 200 with the same
// content — a full duplicate of the site. Send it permanently to www. Done
// here rather than in next.config redirects(), whose path matching drops the
// trailing slash and so would add a second hop (apex /shop/ -> www /shop ->
// www /shop/). Only the exact apex host matches, so localhost and
// *.vercel.app previews are unaffected. If the Vercel domain settings are
// ever switched to redirect www -> apex, this must go or it will loop.
const canonicalHost = new URL(siteConfig.url).host;
const apexHost = canonicalHost.replace(/^www\./, "");

export function proxy(request: NextRequest) {
  if (apexHost !== canonicalHost && request.headers.get("host") === apexHost) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (!isComingSoon) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (isAllowedPath(pathname)) return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

// robots.txt and sitemap.xml aren't excluded so the apex host redirect above
// covers them too; isAllowedPath already lets them through the launch gate.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
