// Tracks whether the route currently mounting was reached via the browser's
// Back/Forward buttons rather than a link click/router.push. Pages use this
// to decide between "restore where the visitor was" (shop listing) and
// "start at the top" (product page). Cleared by the next click, since any
// click-driven navigation is a fresh visit.
let historyNavigationPending = false;

// Minimal typing for the Navigation API (not yet in TypeScript's DOM lib).
interface NavigateEventLike extends Event {
  navigationType: "push" | "replace" | "reload" | "traverse";
}

if (typeof window !== "undefined") {
  const markHistoryNavigation = () => {
    historyNavigationPending = true;
  };

  // In Chrome, Next renders the previous page before `popstate` is
  // delivered, so popstate alone would flag it too late. The Navigation
  // API's `navigate` event fires as soon as Back/Forward starts; popstate
  // stays as the fallback for browsers without it.
  const navigation = (window as Window & { navigation?: EventTarget }).navigation;
  navigation?.addEventListener("navigate", (event) => {
    if ((event as NavigateEventLike).navigationType === "traverse") markHistoryNavigation();
  });
  window.addEventListener("popstate", markHistoryNavigation, { capture: true });

  document.addEventListener(
    "click",
    () => {
      historyNavigationPending = false;
    },
    { capture: true },
  );
}

export function isHistoryNavigation(): boolean {
  return historyNavigationPending;
}

// Content above the target (banner images, the restored product grid) can
// still be laying out for a few frames after mount, shifting everything
// below it. So the target is recomputed and re-applied each frame until it
// has held steady for a while, rather than scrolled to once. Any input from
// the visitor (wheel, touch, keys) hands control straight back to them.
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

export function restoreScrollPosition(getTop: () => number) {
  let frames = 0;
  let stableFrames = 0;
  let lastTop: number | null = null;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, cancel));
  };
  USER_SCROLL_EVENTS.forEach((type) => window.addEventListener(type, cancel, { passive: true }));

  const apply = () => {
    if (cancelled) return;
    const top = Math.max(0, Math.round(getTop()));
    window.scrollTo({ top, behavior: "instant" });
    stableFrames = top === lastTop ? stableFrames + 1 : 0;
    lastTop = top;
    if (frames++ < 120 && stableFrames < 20) requestAnimationFrame(apply);
    else cancel();
  };

  requestAnimationFrame(apply);
}
