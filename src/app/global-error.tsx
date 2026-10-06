"use client";

import { useEffect } from "react";
import "./globals.css";

// Replaces the root layout when something above app/error.tsx throws (Header,
// SiteChrome, the persisted cart/wishlist stores…). Without this file such a
// crash renders as a blank white page in production.
//
// The most common trigger is a tab still running a previous deployment: its
// JS chunks no longer exist after a redeploy, so the next navigation fails
// with a ChunkLoadError. A single hard reload picks up the current build;
// the sessionStorage flag stops that from looping if the error persists.
const RELOAD_FLAG = "vylore-chunk-reload";

function isChunkLoadError(error: Error) {
  return (
    error.name === "ChunkLoadError" ||
    /Loading (CSS )?chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
      error.message,
    )
  );
}

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
    if (!isChunkLoadError(error)) return;
    try {
      if (sessionStorage.getItem(RELOAD_FLAG)) return;
      sessionStorage.setItem(RELOAD_FLAG, "1");
    } catch {
      return;
    }
    window.location.reload();
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-4 text-center text-charcoal">
        <h1 className="font-serif text-2xl">Something went wrong</h1>
        <p className="max-w-md text-sm text-muted">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="bg-burgundy px-6 py-3 text-sm text-ivory"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-charcoal px-6 py-3 text-sm"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
