import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact Vylore Jewellery | Customer Support & Enquiries",
  absoluteTitle: true,
  description:
    "Contact Vylore for jewellery orders, product questions, custom sterling silver designs, WhatsApp support, and boutique visits in Belhe, Maharashtra.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
