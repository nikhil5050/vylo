// JSON.stringify doesn't escape "<", so a value containing "</script>" could
// break out of the tag (XSS) — Next.js docs recommend replacing it with its
// unicode equivalent. Centralizing that here means every JSON-LD block on the
// site gets it for free instead of each page remembering to do it.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
