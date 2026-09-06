// Mirrors the backend's app/services/invoice_service.py exactly: prices are
// GST-inclusive, so this decomposes an order's existing subtotal into taxable
// value + SGST + CGST for display only — it never changes what was charged.
// Rates match the backend's GST_SGST_RATE/GST_CGST_RATE defaults (1.5% each).
export const SGST_RATE = 0.015;
export const CGST_RATE = 0.015;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function gstBreakdown(inclusiveAmount: number): { taxableValue: number; sgst: number; cgst: number } {
  const combinedRate = SGST_RATE + CGST_RATE;
  const taxableValue = round2(inclusiveAmount / (1 + combinedRate));
  const sgst = round2(taxableValue * SGST_RATE);
  const cgst = round2(inclusiveAmount - taxableValue - sgst);
  return { taxableValue, sgst, cgst };
}

// Whatever's left over after subtotal/discount/tax/shipping is accounted for
// is the COD handling fee — it isn't its own column on the order (see
// checkout_service.create_order on the backend), so it has to be derived the
// same way the invoice does.
export function otherCharges(summary: { subtotal: number; discount: number; tax: number; shipping: number; total: number }): number {
  return round2(summary.total - summary.subtotal + summary.discount - summary.tax - summary.shipping);
}
