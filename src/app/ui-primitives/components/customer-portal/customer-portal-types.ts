/**
 * Shared types for the customer-portal primitive family.
 *
 * Customer-facing self-serve surface for Oak Flats Mufflermen — what Mick,
 * Karen, Bec see on mufflermen.com.au after login. Booking wizard, quote
 * viewer, invoice pay, garage, service history, loyalty stamps, document
 * downloads, referral share, NPS feedback, address book, notification prefs,
 * account summary, upcoming appointments, and the workshop chat thread.
 *
 * Pure type module — no runtime imports.
 */

export type PortalTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "violet"
  | "neutral"

export type LoyaltyTier = "starter" | "silver" | "gold" | "platinum"

export const LOYALTY_TIER_LABEL: Readonly<Record<LoyaltyTier, string>> = {
  starter: "Starter",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
}

export const LOYALTY_TIER_TONE: Readonly<Record<LoyaltyTier, PortalTone>> = {
  starter: "neutral",
  silver: "teal",
  gold: "amber",
  platinum: "violet",
}

/* ------------------------------------------------------------------ *
 * Customer profile
 * ------------------------------------------------------------------ */

export interface PortalCustomer {
  id: string
  name: string
  initials: string
  memberSince: string
  tier: LoyaltyTier
  vehicleCount: number
  nextRewardLabel?: string
  loyaltyProgressPct: number
}

/* ------------------------------------------------------------------ *
 * Vehicles — customer-facing
 * ------------------------------------------------------------------ */

export type ServiceDueState = "fresh" | "due-soon" | "overdue"

export interface PortalVehicle {
  id: string
  label: string
  yearMade: number
  rego: string
  bodyColour: string
  odometerKm: number
  lastServiceAt: string
  nextServiceDueAt: string
  daysUntilService: number
  serviceState: ServiceDueState
  /** Optional roadworthy expiry callout. */
  roadworthyExpiresAt?: string
  /** True when vehicle has an active recall outstanding. */
  hasActiveRecall?: boolean
}

export const SERVICE_DUE_LABEL: Readonly<Record<ServiceDueState, string>> = {
  fresh: "Fresh",
  "due-soon": "Due soon",
  overdue: "Overdue",
}

export const SERVICE_DUE_TONE: Readonly<Record<ServiceDueState, PortalTone>> = {
  fresh: "green",
  "due-soon": "amber",
  overdue: "red",
}

/* ------------------------------------------------------------------ *
 * Booking wizard
 * ------------------------------------------------------------------ */

export type BookingStep = "service" | "vehicle" | "date" | "confirm"

export interface BookingServiceOption {
  id: string
  label: string
  description: string
  durationHours: number
  estimateAud: number
  iconKey:
    | "exhaust"
    | "spanner"
    | "tachometer"
    | "shield"
    | "brake"
    | "coolant"
}

export interface BookingTimeSlot {
  id: string
  /** ISO date string (yyyy-mm-dd). */
  date: string
  /** Decimal hour, e.g. 9.5 = 09:30. */
  startHour: number
  /** True when this slot is full. */
  taken?: boolean
}

/* ------------------------------------------------------------------ *
 * Quote
 * ------------------------------------------------------------------ */

export type QuoteLineKind = "part" | "labour" | "fee"

export interface QuoteLineItem {
  id: string
  kind: QuoteLineKind
  label: string
  detail?: string
  quantity: number
  unitAud: number
  /** True when GST is already included in unitAud. */
  gstIncluded?: boolean
}

export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "declined"
  | "expired"

export interface CustomerQuote {
  id: string
  number: string
  vehicleLabel: string
  rego: string
  preparedBy: string
  preparedAt: string
  validUntil: string
  status: QuoteStatus
  lineItems: ReadonlyArray<QuoteLineItem>
  /** Optional customer note shown above the line items. */
  note?: string
}

export const QUOTE_STATUS_LABEL: Readonly<Record<QuoteStatus, string>> = {
  draft: "Draft",
  sent: "Awaiting your call",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
}

export const QUOTE_STATUS_TONE: Readonly<Record<QuoteStatus, PortalTone>> = {
  draft: "neutral",
  sent: "amber",
  accepted: "green",
  declined: "red",
  expired: "neutral",
}

/* ------------------------------------------------------------------ *
 * Invoice
 * ------------------------------------------------------------------ */

export type InvoiceStatus =
  | "outstanding"
  | "scheduled"
  | "partial"
  | "paid"
  | "overdue"

export type WalletBrand =
  | "apple-pay"
  | "google-pay"
  | "stripe"
  | "tyro"
  | "bank-transfer"

export interface InvoicePaymentOption {
  id: string
  label: string
  brand: WalletBrand
  hint?: string
}

export interface CustomerInvoice {
  id: string
  number: string
  vehicleLabel: string
  rego: string
  amountAud: number
  gstAud: number
  /** Already paid (deposit) amount in AUD, optional. */
  paidAud?: number
  dueAt: string
  status: InvoiceStatus
  paymentOptions: ReadonlyArray<InvoicePaymentOption>
}

export const INVOICE_STATUS_LABEL: Readonly<Record<InvoiceStatus, string>> = {
  outstanding: "Outstanding",
  scheduled: "Scheduled",
  partial: "Part-paid",
  paid: "Paid in full",
  overdue: "Overdue",
}

export const INVOICE_STATUS_TONE: Readonly<Record<InvoiceStatus, PortalTone>> = {
  outstanding: "amber",
  scheduled: "teal",
  partial: "violet",
  paid: "green",
  overdue: "red",
}

/* ------------------------------------------------------------------ *
 * Service history
 * ------------------------------------------------------------------ */

export type ServiceHistoryKind =
  | "service"
  | "exhaust"
  | "roadworthy"
  | "dyno"
  | "warranty"
  | "recall"

export interface ServiceHistoryEntry {
  id: string
  vehicleId: string
  date: string
  kind: ServiceHistoryKind
  title: string
  summary: string
  odometerKm: number
  techName: string
  invoiceAud: number
  /** Optional download URL for the PDF receipt. */
  pdfHref?: string
  pdfLabel?: string
}

export const SERVICE_KIND_LABEL: Readonly<Record<ServiceHistoryKind, string>> = {
  service: "Service",
  exhaust: "Exhaust",
  roadworthy: "Pink-slip",
  dyno: "Dyno",
  warranty: "Warranty",
  recall: "Recall",
}

export const SERVICE_KIND_TONE: Readonly<Record<ServiceHistoryKind, PortalTone>> = {
  service: "teal",
  exhaust: "amber",
  roadworthy: "violet",
  dyno: "red",
  warranty: "green",
  recall: "red",
}

/* ------------------------------------------------------------------ *
 * Loyalty
 * ------------------------------------------------------------------ */

export interface CustomerLoyalty {
  id: string
  customerLabel: string
  tier: LoyaltyTier
  currentStamps: number
  totalStamps: number
  nextReward: string
  rewardReady: boolean
  joinedAt: string
  lastVisitAt?: string
  /** Lifetime visits, used as decorative caption. */
  visitsCount: number
}

/* ------------------------------------------------------------------ *
 * Documents
 * ------------------------------------------------------------------ */

export type PortalDocKind =
  | "receipt"
  | "roadworthy"
  | "dyno-chart"
  | "warranty"
  | "manual"

export interface PortalDocument {
  id: string
  title: string
  kind: PortalDocKind
  vehicleLabel?: string
  issuedAt: string
  byteSizeKb: number
  pageCount?: number
}

export const DOC_KIND_LABEL: Readonly<Record<PortalDocKind, string>> = {
  receipt: "Receipt",
  roadworthy: "Pink-slip",
  "dyno-chart": "Dyno chart",
  warranty: "Warranty",
  manual: "Manual",
}

export const DOC_KIND_TONE: Readonly<Record<PortalDocKind, PortalTone>> = {
  receipt: "teal",
  roadworthy: "violet",
  "dyno-chart": "red",
  warranty: "green",
  manual: "neutral",
}

/* ------------------------------------------------------------------ *
 * Referral
 * ------------------------------------------------------------------ */

export interface ReferralActivity {
  id: string
  mateName: string
  status: "invited" | "booked" | "rewarded"
  rewardAud?: number
  when: string
}

export interface ReferralProgram {
  code: string
  /** Public share URL the customer can copy. */
  shareUrl: string
  rewardLabel: string
  invitedCount: number
  bookedCount: number
  rewardedTotalAud: number
  /** Most-recent activity entries. */
  activity: ReadonlyArray<ReferralActivity>
}

/* ------------------------------------------------------------------ *
 * NPS / feedback
 * ------------------------------------------------------------------ */

export interface FeedbackContext {
  vehicleLabel: string
  serviceLabel: string
  techName: string
  servicedAt: string
  promptLabel?: string
}

/* ------------------------------------------------------------------ *
 * Address book
 * ------------------------------------------------------------------ */

export type AddressUse = "service" | "billing" | "delivery"

export interface PortalAddress {
  id: string
  label: string
  street: string
  suburb: string
  postcode: string
  state: string
  use: AddressUse
  isDefault?: boolean
}

export const ADDRESS_USE_LABEL: Readonly<Record<AddressUse, string>> = {
  service: "Service",
  billing: "Billing",
  delivery: "Delivery",
}

export const ADDRESS_USE_TONE: Readonly<Record<AddressUse, PortalTone>> = {
  service: "teal",
  billing: "amber",
  delivery: "green",
}

/* ------------------------------------------------------------------ *
 * Notification preferences
 * ------------------------------------------------------------------ */

export type NotificationChannel = "sms" | "email" | "push"

export interface NotificationTopic {
  id: string
  label: string
  description: string
  channels: Readonly<Record<NotificationChannel, boolean>>
}

export const CHANNEL_LABEL: Readonly<Record<NotificationChannel, string>> = {
  sms: "SMS",
  email: "Email",
  push: "Push",
}

/* ------------------------------------------------------------------ *
 * Appointments
 * ------------------------------------------------------------------ */

export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "needs-review"
  | "completed"

export interface PortalAppointment {
  id: string
  serviceLabel: string
  serviceSummary: string
  vehicleLabel: string
  rego: string
  startsAt: string
  durationMinutes: number
  bayLabel: string
  techName: string
  status: AppointmentStatus
  /** True when reschedule is locked (e.g. <24h). */
  rescheduleLocked?: boolean
}

export const APPT_STATUS_LABEL: Readonly<Record<AppointmentStatus, string>> = {
  confirmed: "Confirmed",
  pending: "Pending",
  "needs-review": "Action needed",
  completed: "Completed",
}

export const APPT_STATUS_TONE: Readonly<Record<AppointmentStatus, PortalTone>> = {
  confirmed: "green",
  pending: "amber",
  "needs-review": "red",
  completed: "neutral",
}

/* ------------------------------------------------------------------ *
 * Workshop chat
 * ------------------------------------------------------------------ */

export type ChatSender = "customer" | "workshop" | "hermes"

export type ChatStatus = "sent" | "delivered" | "read"

export interface CustomerChatMessage {
  id: string
  sender: ChatSender
  body: string
  sentAt: string
  status?: ChatStatus
  authorName?: string
}

export const CHAT_SENDER_LABEL: Readonly<Record<ChatSender, string>> = {
  customer: "You",
  workshop: "Workshop",
  hermes: "Hermes",
}

/* ------------------------------------------------------------------ *
 * Format + tone helpers
 * ------------------------------------------------------------------ */

export function formatAud(amount: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-AU")} km`
}

export function formatHour(decimalHour: number): string {
  const total = Math.round(decimalHour * 60)
  const hh = Math.floor(total / 60)
  const mm = total % 60
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`
}

export function formatDaysFromNow(days: number): string {
  if (days === 0) return "today"
  if (days < 0) {
    const abs = Math.abs(days)
    return `${abs}d overdue`
  }
  if (days === 1) return "tomorrow"
  if (days < 7) return `${days}d away`
  if (days < 30) {
    const weeks = Math.round(days / 7)
    return `${weeks}w away`
  }
  const months = Math.round(days / 30)
  return `${months}mo away`
}

export type PortalChipTone = "neutral" | "red" | "amber" | "teal" | "green"

export function portalToneToChip(tone: PortalTone): PortalChipTone {
  if (tone === "violet") return "neutral"
  if (
    tone === "red" ||
    tone === "amber" ||
    tone === "teal" ||
    tone === "green"
  ) {
    return tone
  }
  return "neutral"
}

export function portalToneToRadial(tone: PortalTone): PortalChipTone {
  return portalToneToChip(tone)
}

export function portalToneToVar(tone: PortalTone): string {
  switch (tone) {
    case "red":
      return "var(--primitive-red)"
    case "amber":
      return "var(--primitive-amber)"
    case "teal":
      return "var(--primitive-teal)"
    case "green":
      return "var(--primitive-green)"
    case "violet":
      // Semantic "platinum/roadworthy" accent maps to the central
      // theme-aware violet primitive.
      return "var(--primitive-violet)"
    case "neutral":
    default:
      return "var(--primitive-body)"
  }
}
