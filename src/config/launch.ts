// Toggle the whole site into "coming soon" mode: "/" shows ComingSoon and
// every other route redirects back to it (see src/proxy.ts). Production
// builds are always gated, regardless of the COMING_SOON env var — remove
// the NODE_ENV check once ready to launch. In development the env var still
// applies (.env.local sets COMING_SOON=false so the real site renders), and
// a missing env var fails toward "still gated."
export const isComingSoon =
  process.env.NODE_ENV === "production" || process.env.COMING_SOON !== "false";

// Target for the countdown on the ComingSoon page (IST, UTC+05:30). Once
// it passes, the timer simply holds at 00:00:00:00.
export const launchDate = "2026-10-11T11:00:11+05:30";
