"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import { cn } from "@/utils/cn";
import type { FaqItem } from "@/config/faq";

// Deliberately not the shared Accordion component: each card here toggles
// independently (both columns can be open at once), styled as a boxed grid
// rather than a single divide-y list, so the shop page's FAQ reads
// differently from the homepage/FAQ page while reusing the same tokens.
export function ShopFaqGrid({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {faqs.map((item, index) => (
        <ShopFaqCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function ShopFaqCard({ item, index }: { item: FaqItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `shop-faq-${item.id}-panel`;

  return (
    <div
      className={cn(
        "rounded-[2px] border bg-white p-6 transition-colors duration-300",
        isOpen ? "border-burgundy" : "border-silver/40",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy"
      >
        <span>
          <span className="eyebrow block text-xs text-burgundy">0{index + 1}</span>
          <span className="mt-2 block font-serif text-lg text-charcoal">{item.question}</span>
        </span>
        <span
          className={cn(
            "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            isOpen ? "border-burgundy text-burgundy" : "border-silver/60 text-muted",
          )}
        >
          <ChevronDownIcon className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-silver/30 pt-4 text-sm leading-relaxed text-muted">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
