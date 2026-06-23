/**
 * Shared types for the billing primitives.
 * Stripe-style subscription management vocabulary, Australian flavour.
 */

export type SubscriptionStatus =
  | "active"
  | "trial"
  | "past_due"
  | "cancelled"
  | "paused"
  | "incomplete"

export type BillingInterval = "monthly" | "quarterly" | "annual"

export type RefundReason =
  | "duplicate"
  | "fraudulent"
  | "requested_by_customer"
  | "service_not_delivered"
  | "other"

export type MandateStatus = "pending" | "active" | "revoked" | "failed"

export type MeteredMetric =
  | "api_calls"
  | "active_users"
  | "storage_gb"
  | "sms_sent"
  | "minutes_streamed"
  | "documents_signed"

export type InvoiceStatus =
  | "draft"
  | "open"
  | "paid"
  | "overdue"
  | "uncollectible"
  | "void"

export type DunningStage = "first_notice" | "retry_scheduled" | "final_notice" | "service_suspended"

export type CardBrand = "visa" | "mastercard" | "amex" | "diners" | "unknown"

export type TaxExemptionStatus = "pending" | "active" | "expired"

export interface MoneyAmount {
  /** Amount expressed in major units (e.g. dollars, not cents). */
  value: number
  /** ISO 4217 currency code, default AUD. */
  currency: "AUD" | "USD" | "NZD" | "GBP"
}

export interface BillingPeriod {
  startISO: string
  endISO: string
}

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitAmount: MoneyAmount
  taxable: boolean
}

export interface MeteredFeatureUsage {
  metric: MeteredMetric
  label: string
  used: number
  included: number
  unitLabel: string
  ratePerUnitAUD: number
}

export interface CreditLedgerEntry {
  id: string
  reason: string
  amount: MoneyAmount
  appliedISO: string
}

/** Australian GST rate (10%). Exposed so primitives can stay consistent. */
export const AU_GST_RATE = 0.1

export function formatMoney(amount: MoneyAmount): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: amount.currency,
    minimumFractionDigits: 2,
  }).format(amount.value)
}

export function statusToLabel(status: SubscriptionStatus): string {
  switch (status) {
    case "active":
      return "Active"
    case "trial":
      return "Trial"
    case "past_due":
      return "Past due"
    case "cancelled":
      return "Cancelled"
    case "paused":
      return "Paused"
    case "incomplete":
      return "Incomplete"
  }
}

export function invoiceStatusToLabel(status: InvoiceStatus): string {
  switch (status) {
    case "draft":
      return "Draft"
    case "open":
      return "Open"
    case "paid":
      return "Paid"
    case "overdue":
      return "Overdue"
    case "uncollectible":
      return "Uncollectible"
    case "void":
      return "Void"
  }
}

export function mandateStatusToLabel(status: MandateStatus): string {
  switch (status) {
    case "pending":
      return "Pending"
    case "active":
      return "Active"
    case "revoked":
      return "Revoked"
    case "failed":
      return "Failed"
  }
}

export function exemptionStatusToLabel(status: TaxExemptionStatus): string {
  switch (status) {
    case "pending":
      return "Pending"
    case "active":
      return "Active"
    case "expired":
      return "Expired"
  }
}
