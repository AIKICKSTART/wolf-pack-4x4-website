/**
 * Shared types for the Oak Flats Mufflermen point-of-sale primitive pack.
 *
 * Intentionally small — only the discriminator unions and money / receipt
 * shapes the rest of the pack composes from. Business rules live in the
 * showcase fixtures, not here.
 */

/** Accent tone vocabulary shared across the POS primitives. */
export type PosTone = "red" | "amber" | "teal" | "green" | "neutral"

/** Workshop register loyalty buckets. */
export type LoyaltyTier = "casual" | "trade" | "fleet" | "vip"

/** EFTPOS terminal states the operator sees on Bay 1 Tyro. */
export type EftposStatus =
  | "idle"
  | "waiting"
  | "approved"
  | "declined"
  | "cancelled"
  | "offline"

/** Receipt printer queue states. */
export type ReceiptStatus = "queued" | "printing" | "printed" | "failed"

/** Refund flow steps. */
export type RefundStep = "select-items" | "reason" | "method" | "confirm"

/** Available refund methods. */
export type RefundMethod = "card" | "cash" | "store-credit"

/** Discount kinds the workshop can apply. */
export type DiscountKind = "percent" | "dollar" | "coupon"

/** Tender split contribution. */
export interface SplitTenderEntry {
  /** Stable client-side key. */
  id: string
  /** Tender method label (Cash, Card, Voucher). */
  method: "cash" | "card" | "voucher" | "loyalty"
  /** AUD value, two-decimal precision. */
  amount: number
}

/** Quick product tile in the top-seller grid. */
export interface QuickProduct {
  /** SKU, e.g. MANTA-CB-25. */
  sku: string
  /** Display title shown in the tile. */
  title: string
  /** Unit price in AUD inc GST. */
  price: number
  /** Single character / emoji or short glyph code. */
  glyph: string
  /** Optional tag chip on the tile. */
  tag?: string
}

/** Cart line driving the active register. */
export interface PosCartLine {
  /** Stable id (sku + variant). */
  id: string
  /** SKU shown in the row. */
  sku: string
  /** Display title. */
  title: string
  /** Unit price inc GST in AUD. */
  unitPrice: number
  /** Current quantity (>= 1). */
  quantity: number
  /** Optional short variant note, e.g. "Aluminised". */
  note?: string
}

/** Daily tally drawer entry. */
export interface DenominationCount {
  /** Denomination face value, e.g. 100, 50, 20, 10, 5, 2, 1, 0.5. */
  denomination: number
  /** Counted number of notes / coins. */
  count: number
}

/** Receipt printer queue row item. */
export interface ReceiptQueueItem {
  /** Stable id, e.g. receipt-30418. */
  id: string
  /** Receipt number shown in the queue, e.g. "OFM-30418". */
  receiptNumber: string
  /** Type of document being printed. */
  kind: "sale" | "refund" | "void" | "tax-invoice" | "duplicate"
  /** Operator who triggered the print. */
  operator: string
  /** When the print job was added (relative label, e.g. "32s ago"). */
  enqueuedLabel: string
  /** Current printer status. */
  status: ReceiptStatus
}

/** Customer record returned by the lookup card. */
export interface PosCustomer {
  /** Internal id. */
  id: string
  /** Display name. */
  name: string
  /** Primary contact phone (AU format). */
  phone: string
  /** Email. */
  email: string
  /** Optional vehicle rego the workshop has on file. */
  rego?: string
  /** Loyalty tier. */
  tier: LoyaltyTier
  /** Lifetime spend in AUD. */
  lifetimeSpend: number
  /** Number of visits on record. */
  visitCount: number
}

/** ABN payload captured on the tax summary tile. */
export interface AbnDetails {
  /** 11-digit Australian Business Number, raw string. */
  abn: string
  /** Trading name on the tax invoice. */
  tradingName: string
}
