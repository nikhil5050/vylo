"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-medium text-ivory",
            className ?? "absolute -right-1.5 -top-1.5",
          )}
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
