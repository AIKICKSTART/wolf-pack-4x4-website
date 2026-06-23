/**
 * Shared supplier portal primitive types.
 *
 * Discriminator unions only. No business rules live here — components
 * map these to tone tokens locally.
 */

/** Lifecycle of a PO between a workshop and a supplier. */
export type OrderState =
  | "requested"
  | "acknowledged"
  | "partial"
  | "shipped"
  | "delivered"
  | "declined"

/** Lifecycle of a supplier invoice as the workshop's books see it. */
export type PaymentState = "paid" | "in-approval" | "disputed" | "overdue"

/** Why a SKU isn't shipping on the requested schedule. */
export type BackorderReason =
  | "stock-out"
  | "freight-delay"
  | "manufacturer-recall"
  | "discontinued"
  | "qc-hold"

/** Compliance certificate the supplier can upload. */
export type CertificateKind =
  | "adr"
  | "iso-9001"
  | "msds"
  | "insurance"
  | "trade-licence"

/** Acknowledgement decision a supplier returns on an inbound PO. */
export type AcknowledgementDecision = "accept" | "partial" | "decline"

/** Tone vocabulary shared with primitives/chip + progress-linear. */
export type SupplierTone = "red" | "amber" | "teal" | "green"

/** Shipping carrier picker options used by the acknowledgement form. */
export type ShippingCarrier =
  | "startrack"
  | "tnt"
  | "toll"
  | "auspost"
  | "own-fleet"
  | "pickup"
