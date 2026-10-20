// Only same-site paths are honoured for ?next= after login/register — an
// absolute or protocol-relative URL ("//evil.example") would turn the auth
// forms into an open redirect.
export function safeNextPath(next: string | null): string | null {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}
