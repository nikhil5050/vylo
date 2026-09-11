"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useCanHover } from "@/hooks/useCanHover";

type CursorVariant = "image" | "cta" | null;

// Small gold dot over product imagery, a cherry-red ring over CTAs — an
// accent layered on top of the native cursor, not a replacement for it, so
// it never interferes with normal text/click affordances elsewhere.
const VARIANT_STYLE: Record<Exclude<CursorVariant, null>, { size: number; background: string; borderWidth: number }> = {
  image: { size: 10, background: "var(--gold)", borderWidth: 0 },
  cta: { size: 34, background: "transparent", borderWidth: 1.5 },
};

export function CustomCursor() {
  const canHover = useCanHover();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });
  const [variant, setVariant] = useState<CursorVariant>(null);

  useEffect(() => {
    if (!canHover) return;

    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      const next = target?.dataset.cursor;
      setVariant(next === "image" || next === "cta" ? next : null);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [canHover, x, y]);

  if (!canHover) return null;

  const style = variant ? VARIANT_STYLE[variant] : { size: 0, background: "transparent", borderWidth: 0 };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border-solid"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", borderColor: "var(--cherry)" }}
      animate={{
        width: style.size,
        height: style.size,
        backgroundColor: style.background,
        borderWidth: style.borderWidth,
        opacity: variant ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    />
  );
}
