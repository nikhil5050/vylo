import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shop Silver Jewellery Online for Women | Vylore",
  description:
    "Shop Vylore's contemporary sterling silver jewellery for women online, including earrings, anklets, bracelets, necklaces, rings and ear cuffs for everyday wear.",
  path: "/shop",
  keywords: [
    "Silver Earrings for Women",
    "Silver Anklets for Women",
    "Silver Bracelets for Women",
    "Silver Necklaces for Women",
    "Silver Rings for Women",
    "Contemporary Silver Ear Cuffs",
    "buy silver earrings online",
    "silver earrings for women",
    "minimalist silver earrings",
    "statement silver earrings",
    "silver hoop earrings for women",
    "buy silver anklets online",
    "silver anklets for women",
    "minimalist silver anklets",
    "buy silver bracelets online",
    "silver bracelets for women",
    "silver charm bracelet",
    "buy silver necklaces online",
    "silver necklaces for women",
    "minimalist silver necklace",
    "silver pendant necklace",
    "buy silver rings online",
    "silver rings for women",
    "designer silver rings",
    "silver band ring",
    "cocktail silver ring",
    "silver ear cuffs for women",
    "best silver jewellery brands in India",
    "where to buy silver jewellery online",
    "shop silver jewellery online",
    "silver jewellery for women",
    "everyday silver jewellery for women",
    "affordable silver jewellery online",
  ],
});

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
