// Toggle the whole site into "coming soon" mode: "/" shows ComingSoon and
// every other route redirects back to it (see src/proxy.ts). The site is
// live by default; set the COMING_SOON env var to "true" to gate it again.
export const isComingSoon = process.env.COMING_SOON === "true";
