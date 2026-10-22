// Tracking IDs, overridable per environment (e.g. a staging GTM container).
// Each fallback is the production ID that used to be hard-coded in the root
// layout, so an environment without these variables tracks exactly as before.
// NEXT_PUBLIC_* values are inlined at build time — changing one needs a rebuild.
export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-K6SXZHSJ",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-GX4R2NYDD0",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "1035289126003863",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "yrtm2bshlh",
};
