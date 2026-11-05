"use client";

import { useEffect } from "react";

type Props = {
  id: string;
  name: string;
  category: string;
  price: number;
};

type Fbq = (...args: unknown[]) => void;

// The Meta pixel only loads on the visitor's first interaction (see
// AnalyticsScripts), so window.fbq may not exist yet when a product page
// mounts. We must not define a stub ourselves — the pixel snippet bails out if
// window.fbq already exists, which would stop the library from loading. So we
// wait for the snippet's own fbq, then send the event (it queues internally).
const POLL_MS = 500;
const GIVE_UP_MS = 30_000;

export function ViewContentTracker({ id, name, category, price }: Props) {
  useEffect(() => {
    // Meta requires value to be a number greater than zero.
    if (!(price > 0)) return;

    const send = (fbq: Fbq) =>
      fbq("track", "ViewContent", {
        content_ids: [id],
        content_type: "product",
        content_name: name,
        content_category: category,
        value: price,
        currency: "INR",
      });

    const existing = (window as unknown as { fbq?: Fbq }).fbq;
    if (existing) {
      send(existing);
      return;
    }

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const fbq = (window as unknown as { fbq?: Fbq }).fbq;
      if (fbq) {
        window.clearInterval(timer);
        send(fbq);
      } else if (Date.now() - startedAt > GIVE_UP_MS) {
        window.clearInterval(timer);
      }
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [id, name, category, price]);

  return null;
}
