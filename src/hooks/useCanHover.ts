"use client";

import { useSyncExternalStore } from "react";

// True on pointers that can genuinely hover (mouse/trackpad) — used to gate
// hover-only affordances like the PDP cursor-zoom lens that touch has no
// equivalent for.
const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCanHover(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
