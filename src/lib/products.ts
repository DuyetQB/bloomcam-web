export type ProductVariantId = "core" | "studio-kit";

export type ProductVariant = {
  id: ProductVariantId;
  nameKey: string;
  taglineKey: string;
  priceCents: number;
  compareAtCents?: number;
  badgeKey?: string;
  featureKeys: string[];
  highlight?: boolean;
};

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: "core",
    nameKey: "core.name",
    taglineKey: "core.tagline",
    priceCents: 9900,
    badgeKey: "core.badge",
    featureKeys: [
      "core.features.camera",
      "core.features.usbc",
      "core.features.wifi",
      "core.features.app",
      "core.features.export",
    ],
  },
  {
    id: "studio-kit",
    nameKey: "studio.name",
    taglineKey: "studio.tagline",
    priceCents: 14900,
    compareAtCents: 17900,
    badgeKey: "studio.badge",
    highlight: true,
    featureKeys: [
      "studio.features.everything",
      "studio.features.tripod",
      "studio.features.accessories",
      "studio.features.flexibility",
    ],
  },
];

export function getVariant(id: ProductVariantId): ProductVariant {
  const variant = PRODUCT_VARIANTS.find((v) => v.id === id);
  if (!variant) throw new Error(`Unknown variant: ${id}`);
  return variant;
}

export function formatMoney(cents: number, locale: string, currency = "USD") {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function calculateSubtotal(variantId: ProductVariantId, quantity: number) {
  return getVariant(variantId).priceCents * quantity;
}
