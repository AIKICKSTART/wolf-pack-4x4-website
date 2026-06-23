/* Shared types for the parts-pages primitive cluster. */

export type PartTone = "red" | "amber" | "teal" | "green"

export type SupplierTone = "manta" | "redback" | "xforce" | "pacemaker" | "lukey" | "hushpower" | "neutral"

export interface FitmentNote {
  id: string
  make: string
  model: string
  years: string
  body?: string
  engine?: string
  notes?: string
  adapterRequired?: boolean
}

export interface PartSpecRow {
  label: string
  value: string
  /** Optional numeric value used only for aria-sort hints when present. */
  rank?: number
}

export interface PartSpecGroup {
  id: string
  title: string
  rows: ReadonlyArray<PartSpecRow>
}

export interface PartSupplierBadge {
  id: string
  name: string
  tone: SupplierTone
  /** Optional short tag like "Aussie made" or "Authorised dealer". */
  tag?: string
  /** Optional warranty descriptor — e.g. "Lifetime mufflers". */
  warranty?: string
  /** Boolean — show verified chip. */
  verified?: boolean
}

export interface PartCategoryRef {
  slug: string
  title: string
  tone: PartTone
  /** Optional short label, e.g. "Performance". */
  group?: string
}

export interface PartGalleryImage {
  id: string
  src?: string
  alt: string
  caption?: string
  /** Show watermark frame for known supplier-watermarked media. */
  supplierWatermark?: boolean
}

export interface PartPrice {
  /** Manufacturer recommended retail price in cents (AUD). */
  rrpCents: number
  /** Workshop / current price in cents. Omit to show RRP only. */
  currentCents?: number
  /** Optional installment-plan hint, e.g. "or 4 x $24.99 fortnightly". */
  installmentHint?: string
}

export interface PartCardSummary {
  id: string
  sku: string
  title: string
  supplier: string
  supplierTone: SupplierTone
  category: string
  categoryTone: PartTone
  /** Optional image URL — leave undefined for a fallback tile. */
  image?: string
  imageAlt: string
  /** Optional watermark flag — surfaces a supplier-watermark frame. */
  supplierWatermark?: boolean
  price: PartPrice
  /** Short list of fitment chip labels, e.g. ["Hilux N80", "Ranger PX3"]. */
  fitment: ReadonlyArray<string>
  href: string
}

export interface PartBreadcrumbItem {
  label: string
  href?: string
  tone?: PartTone
}

export interface PartsFaqItem {
  id: string
  question: string
  answer: string
}
