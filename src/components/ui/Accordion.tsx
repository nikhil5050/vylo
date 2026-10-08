"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  headingLevel?: 2 | 3;
}

export function Accordion({ items, defaultOpenId, headingLevel = 3 }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);
  const baseId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="divide-y divide-silver/30 border-y border-silver/30">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-trigger`;

        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                onClick={() => setOpenId(isOpen ? undefined : item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy"
              >
                <span className="font-serif text-lg text-charcoal">{item.title}</span>
                <ChevronDownIcon
                  className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>
            </Heading>
            {/* Collapsed panels stay in the server-rendered HTML (0fr→1fr
                grid-row transition rather than unmounting) so their text is
                indexable page content; `inert` keeps it out of tab order and
                the accessibility tree until opened. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
