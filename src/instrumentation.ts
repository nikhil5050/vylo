// Runs once per server instance, before it handles requests.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // api.vylore.in resolves to both an IPv4 and an IPv6 address. On networks
  // whose IPv6 route to it is unreliable (e.g. NAT64 — a 64:ff9b:: address),
  // Node's default order tries IPv6 only and server-side fetches intermittently
  // hit UND_ERR_CONNECT_TIMEOUT; pages that fail closed (shop, home sections)
  // then render with no products. Prefer IPv4, which reaches the API reliably.
  const dns = await import("node:dns");
  dns.setDefaultResultOrder("ipv4first");
}
