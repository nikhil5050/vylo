// Long-form copy for the /shop page. Kept here rather than inline in
// app/shop/page.tsx so the page file stays about layout, and so copy edits
// don't touch component code. Claims stay within what the FAQ/policy pages
// already state (925 silver, PayU, India-only shipping, 2–4 day dispatch) —
// nothing here promises a return window, free shipping or a hallmark that
// isn't backed elsewhere on the site.

export interface ShopCategoryGuide {
  slug: string;
  name: string;
  heading: string;
  paragraphs: string[];
  tags: string[];
}

export const shopIntro = {
  heading: "Shop Sterling Silver Jewellery for Women",
  body: "Explore Vylore's complete collection of contemporary 925 sterling silver jewellery — rings, necklaces, earrings, bracelets and anklets designed for everyday wear, gifting and the occasions in between. Filter by category or theme, compare designs and order online with secure checkout and delivery across India.",
};

export const shopCategoryGuides: ShopCategoryGuide[] = [
  {
    slug: "rings",
    name: "Rings",
    heading: "Silver Rings for Women",
    paragraphs: [
      "From fine stackable bands to sculptural open rings and solitaire-style statement pieces, Vylore's silver rings are made to be worn on their own or layered across several fingers. Botanical shapes, crossover silhouettes, textured bands and stone accents give each design its own character, with gold-plated silver options for a warmer tone alongside classic bright silver.",
      "Many ring designs come in multiple sizes, listed on each product page, so you can choose the right fit before adding to your bag.",
    ],
    tags: ["Stackable bands", "Gold-plated silver", "Statement rings"],
  },
  {
    slug: "necklace",
    name: "Necklaces",
    heading: "Silver Necklaces & Pendant Sets",
    paragraphs: [
      "Vylore's silver necklaces range from delicate everyday chains with a single pendant to coordinated necklace sets with matching earrings. Teardrop, geometric and celestial motifs — some set with emerald, ruby or blue-toned stones — make it easy to find a piece that suits a crisp office outfit as well as festive wear.",
      "Layer a fine pendant with a longer chain for a modern stacked look, or let a statement set carry the whole outfit.",
    ],
    tags: ["Pendant necklaces", "Necklace sets", "Stone-accent designs"],
  },
  {
    slug: "earrings",
    name: "Earrings",
    heading: "Silver Earrings: Studs, Drops & Statement Pairs",
    paragraphs: [
      "Our silver earrings cover every mood — minimal studs for daily wear, floral drops in green, pink and blue tones, butterfly designs and bold geometric statement pairs for evenings out. Lightweight construction keeps longer drops comfortable through the day.",
      "Pair a subtle stud with a matching necklace for a polished, coordinated look, or mix finishes and shapes for something more personal.",
    ],
    tags: ["Everyday studs", "Drop earrings", "Statement earrings"],
  },
  {
    slug: "bracelet",
    name: "Bracelets",
    heading: "Silver Bracelets & Cuffs",
    paragraphs: [
      "Choose from slim link bracelets, pavé crossover designs, textured bar bracelets and open cuffs that slip on easily. Vylore's silver bracelets are designed to stack with a watch or other bracelets, or to stand alone as a clean, minimal accent on the wrist.",
      "Open cuffs suit most wrist sizes, while chain styles are a timeless choice for gifting.",
    ],
    tags: ["Link bracelets", "Open cuffs", "Pavé designs"],
  },
  {
    slug: "anklets",
    name: "Anklets",
    heading: "Silver Anklets for Women",
    paragraphs: [
      "Silver anklets have long been part of Indian jewellery tradition, and Vylore's designs give that tradition a contemporary update — fine chains and minimal silhouettes that look just as good with sneakers as with sarees.",
      "Wear a single delicate anklet every day or pair two for a layered festive look.",
    ],
    tags: ["Minimal chains", "Everyday wear", "Festive layering"],
  },
];

export const shopStory = [
  "Vylore's online jewellery shop brings together rings, necklaces, earrings, bracelets and anklets in genuine 925 sterling silver, designed for everyday wear and finished with the same attention to detail as fine jewellery. Every product listing states its material, purity and available sizes clearly, so you always know exactly what you're buying.",
  "Sterling silver is one of the most versatile metals in jewellery: it has a cool, bright lustre that works with both western and Indian outfits, it pairs well with coloured stones, and it is far more accessible than gold — which makes it ideal for building a jewellery wardrobe you'll actually wear. Our designs lean contemporary, drawing on botanical forms, geometry and celestial motifs, while keeping silhouettes wearable for the office, college, weddings and weekends alike.",
  "Whether you're after a minimal everyday piece, a statement design for a special occasion, a thoughtful gift, or a custom piece of your own, the collection is organised by category and theme to help you find it faster — backed by secure payments, nationwide shipping across India and dedicated support at every step.",
];

export const shopBuyingGuide = [
  {
    title: "What Does 925 Sterling Silver Mean?",
    body: "925 sterling silver is an alloy of 92.5% pure silver and 7.5% other metals, usually copper. Pure silver on its own is too soft for jewellery that's worn daily, so this small addition gives each piece the strength to hold its shape, keep stones secure and resist everyday knocks — while retaining silver's bright, white shine. It's the international standard for quality silver jewellery.",
  },
  {
    title: "Choosing the Right Size",
    body: "Ring sizes are listed on each product page. If you're unsure of your size, measure a ring that already fits the intended finger, or wrap a thin strip of paper around the base of the finger, mark where it overlaps and compare the length with a standard ring-size chart. Open rings and cuffs offer a little flexibility, and our team is happy to help on the Contact page if you're between sizes.",
  },
  {
    title: "Styling Silver Jewellery",
    body: "Silver suits cool and neutral palettes beautifully and adds a modern edge to bright festive colours. For everyday wear, keep to one focal piece — a pendant or a pair of drops — and add fine rings or a slim bracelet. For occasions, coordinated necklace sets and statement earrings do the work. Mixing textures, such as a pavé bracelet with a plain band, keeps a stacked look interesting.",
  },
  {
    title: "Caring for Your Silver",
    body: "All silver naturally tarnishes over time when exposed to air and moisture. To keep pieces bright, put jewellery on after perfume, lotion and hairspray, take it off before swimming, bathing or exercising, and store each piece separately in a dry pouch or box. A soft polishing cloth restores the shine in seconds. Regular wear actually helps, as gentle friction slows tarnish.",
  },
];

// FAQ ids from config/faq.ts shown on /shop, in display order — purity,
// payments, shipping and returns are the questions most likely to be on a
// buyer's mind on this page.
export const shopFaqIds = [
  "purity-1",
  "purity-2",
  "orders-1",
  "shipping-1",
  "shipping-2",
  "payments-1",
  "payments-2",
  "returns-1",
  "care-1",
  "care-2",
  "custom-1",
  "tracking-1",
];
