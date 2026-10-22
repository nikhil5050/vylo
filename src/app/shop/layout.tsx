import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shop Silver Jewellery Online for Women",
  description:
    "Shop Vylore's contemporary sterling silver jewellery for women online, including earrings, anklets, bracelets, necklaces, rings and ear cuffs.",
  path: "/shop",
});

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
