import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Ring Size Checker",
  description: "Find your Indian ring size online — place your ring on the screen and match the circle to its inner edge.",
  path: "/ring-size-checker",
  keywords: ["ring size checker", "Indian ring size chart", "ring size guide"],
});

export default function RingSizeCheckerLayout({ children }: { children: ReactNode }) {
  return children;
}
