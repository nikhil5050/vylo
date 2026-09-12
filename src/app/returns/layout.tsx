import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Replacement Policy",
  description: "Vylore's replacement-only policy — when a replacement is available and how to request one.",
  path: "/returns",
  keywords: ["Vylore replacement policy", "jewellery replacement", "no returns no refunds"],
});

export default function ReplacementPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
