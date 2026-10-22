import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Vylore orders, shipping, returns, silver purity, and payments.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children;
}
