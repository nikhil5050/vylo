import type { ReactNode } from "react";
import { GemIcon } from "@/components/icons/Icons";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  // 1 when the empty state is the whole page (404, catalog unavailable), so
  // the page still has its one h1.
  headingLevel?: 1 | 2 | 3;
}

export function EmptyState({ title, description, action, headingLevel = 3 }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <GemIcon className="h-8 w-8 text-silver" />
      <Heading className="font-serif text-2xl text-charcoal">{title}</Heading>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
