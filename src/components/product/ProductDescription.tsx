"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

export function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    setIsTruncatable(el.scrollHeight > el.clientHeight + 1);
  }, [description]);

  return (
    <div className="mt-5 max-w-md">
      <p
        ref={measureRef}
        className={expanded ? "text-base text-muted" : "line-clamp-4 text-base text-muted"}
      >
        {description}
      </p>

      {isTruncatable && (
        <motion.button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1.5 text-sm font-medium text-charcoal underline decoration-silver/60 underline-offset-2 transition-colors hover:text-burgundy"
          whileTap={{ scale: 0.96 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? "less" : "more"}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              {expanded ? "Read less" : "Read more"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  );
}
