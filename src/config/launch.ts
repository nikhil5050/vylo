// Toggle the whole site into "coming soon" mode: "/" shows ComingSoon and
// every other route redirects back to it (see src/proxy.ts). Production
// builds are always gated, regardless of the COMING_SOON env var — remove
// the NODE_ENV check once ready to launch. In development the env var still
// applies (.env.local sets COMING_SOON=false so the real site renders), and
// a missing env var fails toward "still gated."
export const isComingSoon =
  process.env.NODE_ENV === "production" || process.env.COMING_SOON !== "false";
