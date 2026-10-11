// Toggle the whole site into "coming soon" mode: "/" shows ComingSoon and
// every other route redirects back to it (see src/proxy.ts). The site has
// launched, so this is off everywhere — set it back to `true` to re-gate.
export const isComingSoon: boolean = false;

// Target for the countdown on the ComingSoon page (IST, UTC+05:30). Once
// it passes, the timer simply holds at 00:00:00:00.
export const launchDate = "2026-10-11T11:00:11+05:30";
