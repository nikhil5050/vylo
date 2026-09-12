import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shipping Policy",
  description: "How Vylore processes, ships and delivers your jewellery order.",
  path: "/shipping",
  keywords: ["Vylore shipping policy", "jewellery delivery timeline", "international shipping"],
});

export default function ShippingPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
