"use client";

import { useEffect, useState } from "react";

const BUMP_DURATION_MS = 500;

// Flips true for a moment whenever `value` increases (e.g. cart item count
// after an add-to-cart) — drives a one-shot "bounce" animation without the
// caller having to diff previous/next values itself. Uses the
// store-previous-value-in-state pattern (not an effect) to detect the
// change during render; only the auto-reset timer needs an effect.
export function useBumpOnIncrease(value: number): boolean {
  const [prevValue, setPrevValue] = useState(value);
  const [bumped, setBumped] = useState(false);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value > prevValue) setBumped(true);
  }

  useEffect(() => {
    if (!bumped) return;
    const timer = setTimeout(() => setBumped(false), BUMP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [bumped]);

  return bumped;
}
