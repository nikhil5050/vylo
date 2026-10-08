import type { FaqItem } from "@/config/faq";
import type { Product } from "@/types/product";

// Supplementary copy for product detail pages. Every product already has its
// own description/story from the admin; this adds the category-level styling
// guidance, care notes and buyer FAQ that silver jewellery PDPs typically
// carry. FAQ answers are templated with the product's own name/category/
// sizes so each page's copy is specific to it, and every claim mirrors the
// FAQ (config/faq.ts) and Replacement Policy (app/returns) pages.

const stylingByCategory: Record<string, string[]> = {
  rings: [
    "Wear it alone on the index or middle finger to let the design stand out.",
    "Stack it with one or two fine bands for a layered, modern look.",
    "Pair it with silver studs or a slim bracelet to keep the look cohesive.",
  ],
  necklace: [
    "Wear it with open or V-neck necklines so the pendant sits clearly.",
    "Layer a finer chain alongside it for a contemporary stacked look.",
    "Keep earrings minimal so the necklace remains the focal point.",
  ],
  earrings: [
    "Wear hair tucked back or tied up to show off the design.",
    "Pair with a delicate pendant for a coordinated, polished look.",
    "Lightweight enough for long days at work as well as evenings out.",
  ],
  bracelet: [
    "Wear it on its own for a clean, minimal accent on the wrist.",
    "Stack it with a watch or another slim silver bracelet.",
    "Match it with silver rings on the same hand to tie the look together.",
  ],
  anklets: [
    "Wear it with flats, sandals or sneakers for everyday style.",
    "Pair two fine anklets for a layered, festive look.",
    "Remove before swimming or bathing to protect the finish.",
  ],
};

const defaultStyling = [
  "Wear it on its own as a focal piece, or pair it with minimal silver accents.",
  "Silver complements cool, neutral and bright festive colours alike.",
  "Mix textures — polished with pavé or stone-set pieces — for a curated look.",
];

// Category names are plural ("Rings", "Earrings"); FAQ/highlight copy needs a
// singular noun ("this ring", "this pair of earrings").
const singularByCategory: Record<string, string> = {
  rings: "ring",
  necklace: "necklace",
  earrings: "pair of earrings",
  bracelet: "bracelet",
  anklets: "anklet",
};

function singularNoun(product: Product) {
  return singularByCategory[product.categorySlug] ?? "piece";
}

export function getStylingTips(product: Product): string[] {
  return stylingByCategory[product.categorySlug] ?? defaultStyling;
}

export const careTips = [
  "Put jewellery on after perfume, lotion and hairspray.",
  "Remove before swimming, bathing, exercising or cleaning.",
  "Store separately in a dry pouch or box, away from moisture and direct sunlight.",
  "Wipe gently with a soft polishing cloth to restore shine — avoid harsh chemicals.",
];

export function getProductHighlights(product: Product) {
  return [
    {
      title: product.metal ?? "925 Sterling Silver",
      description: product.purity
        ? `Crafted in ${product.purity} purity, stated clearly so you know exactly what you're buying.`
        : "Certified sterling silver with a bright, durable finish made for regular wear.",
    },
    {
      title: "Designed for Everyday",
      description: "Made to move easily from daily wear to festive and special occasions.",
    },
    {
      title: "Dispatched in 2–4 Days",
      description: "Shipped across India, with tracking available from our Track Order page.",
    },
    {
      title: "Secure Checkout",
      description: "Pay by card, UPI or netbanking via PayU — we never store your payment details.",
    },
  ];
}

export function getProductFaqs(product: Product): FaqItem[] {
  const material = product.metal ?? "925 sterling silver";
  const noun = singularNoun(product);

  const faqs = [
    {
      question: `What is the ${product.name} made of?`,
      answer: `The ${product.name} is crafted in ${material}${
        product.purity ? ` (${product.purity})` : ""
      }. 925 sterling silver is 92.5% pure silver alloyed with other metals for strength, so the piece holds its shape and shine with regular wear.`,
    },
  ];

  if (product.sizes?.length) {
    faqs.push({
      question: `What sizes is the ${product.name} available in?`,
      answer: `It is available in ${product.sizes.join(", ")}. Please check the size carefully before ordering — if you're unsure, contact our team and we'll help you choose.`,
    });
  }

  faqs.push(
    {
      question: `Can I wear this ${noun} every day?`,
      answer:
        "Yes, it's designed for regular wear. To keep it looking its best, avoid contact with water, perfume and harsh chemicals, and store it in a dry place when you're not wearing it.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are typically dispatched within 2–4 business days and shipped across India. Exact delivery timelines are confirmed after your order is placed, and you can follow your order on the Track Order page.",
    },
    {
      question: "Can I get a replacement if there's a problem?",
      answer:
        "A replacement may be requested within 7 days of delivery if the wrong product arrived, the piece is damaged or defective, components are missing, or there is a genuine sizing issue — subject to verification. See our Replacement Policy for full details.",
    },
  );

  return faqs.map((faq, index) => ({ id: `product-${index + 1}`, ...faq }));
}
