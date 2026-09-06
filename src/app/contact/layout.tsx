import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact Vylore Jewellery | Customer Support & Enquiries",
  description:
    "Contact Vylore for jewellery orders, product questions, custom sterling silver designs, WhatsApp support, and boutique visits in Belhe, Maharashtra.",
  path: "/contact",
  keywords: [
    "contact Vylore jewellery",
    "Vylore customer support",
    "Vylore contact number",
    "Vylore WhatsApp support",
    "jewellery order support India",
    "custom sterling silver jewellery enquiry",
    "Vylore jewellery store Belhe",
    "jewellery boutique Maharashtra",
    "silver jewellery customer service",
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
