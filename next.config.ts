import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No "output: export" — this app has dynamic, runtime-created content
  // (products/orders/customers via the admin panel), which static export
  // can't support without a full rebuild+redeploy on every change. Deployed
  // on Vercel (not Hostinger — that plan has no Node.js runtime support),
  // so a real Next.js server handles this normally.
  trailingSlash: true,
  // Dev-only: the dev server resolves dynamic route params (any [slug]-style
  // segment) in a separate `static-paths-worker` process. In this
  // environment that child process fails to start at all, surfacing as
  // "Jest worker encountered 2 child process exceptions, exceeding retry
  // limit" on every dynamic route (reproduced even on routes with no
  // custom logic, e.g. /cart/shared/[token]) — a process-spawn problem
  // (antivirus, exec inheritance), not an app bug. Forcing worker_threads
  // runs that worker in-process instead of forking a new node.exe, which
  // sidesteps it.
  experimental: {
    workerThreads: true,
  },
  // Next's built-in optimizer stays off: its server-side fetch to
  // ik.imagekit.io timed out in this environment ("upstream image response
  // timed out"), rendering broken images. The custom loader instead points
  // each srcset entry straight at ImageKit's own resizing (or Pexels'), so
  // next/image still emits responsive srcsets without that server fetch.
  // Note `unoptimized: true` can't be combined with this — it makes
  // next/image ignore the loader and drop the srcset.
  images: {
    loader: "custom",
    loaderFile: "./src/utils/imageLoader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      // Blog editorial photography (src/content/blog/images.ts).
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  // Everything under public/ (necklace frames, logos, icons) is a static file
  // that only changes when we replace it in a deploy — Vercel's default for
  // public/ is `max-age=0, must-revalidate`, which makes every repeat visit
  // re-check every image with the server instead of using the cached copy.
  // `immutable` tells the browser it never needs to revalidate for the life
  // of this max-age, which is safe here since a changed file gets a new
  // deploy (and CDN cache key) anyway, not an in-place edit at the same URL.
  // The ring size checker page was removed; send old links and search
  // results to Contact, where the team helps with sizing.
  async redirects() {
    return [
      { source: "/ring-size-checker", destination: "/contact/", permanent: true },
      // Anklets are discontinued and the category was removed, so its page
      // 404s. Send old links and search results to the full shop instead.
      { source: "/category/anklets", destination: "/shop/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|gif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
