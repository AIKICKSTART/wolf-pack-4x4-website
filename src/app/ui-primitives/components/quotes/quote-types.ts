/**
 * Shared types for the in-app quotes + proposals primitives.
 * All primitives import from this module — keeps prop shapes consistent across
 * line item, discount, signature, acceptance, and counter-offer surfaces.
 */

/** Discount strategies an editor / line item supports. */
export type DiscountKind = "percentage" | "fixed" | "bulk-tier"

/** How a customer signs / accepts a quote. */
export type SignatureMethod = "typed" | "drawn" | "uploaded"

/** Acceptance pipeline state for a sent quote. */
export type AcceptanceState =
  | "sent"
  | "opened"
  | "viewed"
  | "accepted"
  | "declined"
  | "countered"

/** Terminal outcome for a quote — used by trackers and counter-offer cards. */
export type QuoteOutcome = "pending" | "accepted" | "declined" | "expired" | "countered"

/** Tone palette reused across chips, banners, and section accents. */
export type QuoteTone = "neutral" | "red" | "amber" | "teal" | "green"

/** A single discount applied to a scope (line, bundle, quote-wide). */
export interface AppliedDiscount {
  kind: DiscountKind
  amount: number
  scope: string
  reason?: string
}

/** Generic line shape — line-item, bundle, and counter-offer all use this. */
export interface QuoteLine {
  id: string
  title: string
  sku: string
  quantity: number
  unitPrice: number
  discount?: AppliedDiscount
}

/** Acceptance timeline event — feeds the QuoteAcceptanceTracker. */
export interface AcceptanceEvent {
  state: AcceptanceState
  occurredAt: string
  detail?: string
}

/** Currency formatter — keeps formatting consistent across every primitive. */
export function formatCurrency(value: number, currency: string = "AUD"): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

/** Percentage formatter used by discount editors and tax strips. */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

/** Computes the post-discount line subtotal. Pure — no mutation. */
export function lineSubtotal(line: QuoteLine): number {
  const gross = line.quantity * line.unitPrice
  if (!line.discount) {
    return gross
  }
  if (line.discount.kind === "percentage") {
    return gross * (1 - line.discount.amount / 100)
  }
  return Math.max(0, gross - line.discount.amount)
}
