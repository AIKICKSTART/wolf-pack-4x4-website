/**
 * Shared types for the workshop-ops primitive family.
 *
 * Operational CRM surface for Oak Flats Mufflermen — service tickets,
 * bay scheduling, mechanic shifts, parts pulls, customer 360, SMS,
 * quotes, vehicle inspections, dyno results, payments, roadworthy
 * certs, manufacturer recalls, loyalty stamp cards, and the vehicle
 * health tile. Pure type module — no runtime imports.
 */

export type OpsTone = "red" | "amber" | "teal" | "green" | "violet" | "neutral"

/* ------------------------------------------------------------------ *
 * Bays + mechanics — match the existing Mufflermen vocabulary
 * ------------------------------------------------------------------ */

export type WorkshopBayId =
  | "bay-1"
  | "bay-2"
  | "bay-3"
  | "bay-4-hoist"
  | "bay-5-alignment"
  | "bay-6-dyno"

export type BayState = "free" | "in-use" | "dirty" | "blocked"

export type MechanicLevel = "master" | "tech" | "apprentice"

export interface Mechanic {
  id: string
  name: string
  initials: string
  role: string
  level: MechanicLevel
  tone: OpsTone
}

export const BAY_LABEL: Readonly<Record<WorkshopBayId, string>> = {
  "bay-1": "Bay 1",
  "bay-2": "Bay 2",
  "bay-3": "Bay 3",
  "bay-4-hoist": "Bay 4 · Hoist",
  "bay-5-alignment": "Bay 5 · Alignment",
  "bay-6-dyno": "Bay 6 · Dyno",
}

export const BAY_SHORT_LABEL: Readonly<Record<WorkshopBayId, string>> = {
  "bay-1": "B1",
  "bay-2": "B2",
  "bay-3": "B3",
  "bay-4-hoist": "B4",
  "bay-5-alignment": "B5",
  "bay-6-dyno": "B6",
}

export const BAY_ID_ORDER: ReadonlyArray<WorkshopBayId> = [
  "bay-1",
  "bay-2",
  "bay-3",
  "bay-4-hoist",
  "bay-5-alignment",
  "bay-6-dyno",
]

export const BAY_STATE_LABEL: Readonly<Record<BayState, string>> = {
  free: "Free",
  "in-use": "In use",
  dirty: "Needs wipe-down",
  blocked: "Blocked",
}

export const BAY_STATE_TONE: Readonly<Record<BayState, OpsTone>> = {
  free: "green",
  "in-use": "amber",
  dirty: "neutral",
  blocked: "red",
}

/* ------------------------------------------------------------------ *
 * Service tickets / work orders
 * ------------------------------------------------------------------ */

export type TicketStatus =
  | "drop-off"
  | "diagnosed"
  | "awaiting-parts"
  | "in-progress"
  | "quality-check"
  | "ready"
  | "delivered"

export type TicketPriority = "standard" | "rush" | "vip"

export interface ServiceLineItem {
  id: string
  label: string
  hours: number
  done: boolean
}

export interface ServiceTicket {
  id: string
  number: string
  customerName: string
  vehicleLabel: string
  rego: string
  vin: string
  mileageKm: number
  bayId?: WorkshopBayId
  mechanicId?: string
  status: TicketStatus
  priority: TicketPriority
  loggedAt: string
  etaLabel: string
  totalAud: number
  services: ReadonlyArray<ServiceLineItem>
}

export const TICKET_STATUS_LABEL: Readonly<Record<TicketStatus, string>> = {
  "drop-off": "Drop-off",
  diagnosed: "Diagnosed",
  "awaiting-parts": "Awaiting parts",
  "in-progress": "In progress",
  "quality-check": "Quality check",
  ready: "Ready for pickup",
  delivered: "Delivered",
}

export const TICKET_STATUS_TONE: Readonly<Record<TicketStatus, OpsTone>> = {
  "drop-off": "neutral",
  diagnosed: "teal",
  "awaiting-parts": "amber",
  "in-progress": "amber",
  "quality-check": "violet",
  ready: "green",
  delivered: "neutral",
}

export const TICKET_PRIORITY_LABEL: Readonly<Record<TicketPriority, string>> = {
  standard: "Standard",
  rush: "Rush",
  vip: "VIP",
}

export const TICKET_PRIORITY_TONE: Readonly<Record<TicketPriority, OpsTone>> = {
  standard: "neutral",
  rush: "amber",
  vip: "red",
}

/* ------------------------------------------------------------------ *
 * Bay scheduler
 * ------------------------------------------------------------------ */

export interface BayBooking {
  id: string
  bayId: WorkshopBayId
  /** Inclusive start hour 0–23 in 24h time. */
  startHour: number
  /** Block duration in hours (supports halves: 1, 1.5, 2…). */
  durationHours: number
  customerLabel: string
  vehicleLabel: string
  mechanicId?: string
  priority: TicketPriority
  status: TicketStatus
  pinned?: boolean
}

export interface BayDayState {
  bayId: WorkshopBayId
  state: BayState
  note?: string
}

/* ------------------------------------------------------------------ *
 * Mechanic shift timeline
 * ------------------------------------------------------------------ */

export type ShiftBlockKind = "shift" | "break" | "lunch" | "leave" | "sick" | "training"

export interface ShiftBlock {
  id: string
  mechanicId: string
  kind: ShiftBlockKind
  /** Decimal hour from 24h midnight (e.g. 7.5 = 7:30). */
  startHour: number
  /** Decimal duration. */
  durationHours: number
  note?: string
}

export const SHIFT_BLOCK_LABEL: Readonly<Record<ShiftBlockKind, string>> = {
  shift: "On shift",
  break: "Smoko",
  lunch: "Lunch",
  leave: "Annual",
  sick: "Sick",
  training: "Training",
}

export const SHIFT_BLOCK_TONE: Readonly<Record<ShiftBlockKind, OpsTone>> = {
  shift: "green",
  break: "amber",
  lunch: "amber",
  leave: "neutral",
  sick: "red",
  training: "teal",
}

/* ------------------------------------------------------------------ *
 * Parts pulls
 * ------------------------------------------------------------------ */

export type PartStock = "in-stock" | "low" | "back-order" | "supplier-pull"

export interface PartPullEntry {
  id: string
  partNumber: string
  label: string
  supplier: string
  bin: string
  stock: PartStock
  quantity: number
  unitPriceAud: number
  pulled: boolean
}

export const PART_STOCK_LABEL: Readonly<Record<PartStock, string>> = {
  "in-stock": "In stock",
  low: "Low",
  "back-order": "Back-order",
  "supplier-pull": "Supplier pull",
}

export const PART_STOCK_TONE: Readonly<Record<PartStock, OpsTone>> = {
  "in-stock": "green",
  low: "amber",
  "back-order": "red",
  "supplier-pull": "teal",
}

/* ------------------------------------------------------------------ *
 * Customer 360
 * ------------------------------------------------------------------ */

export interface CustomerVehicle {
  id: string
  label: string
  rego: string
  bodyColour: string
  yearMade: number
}

export type CommsChannel = "sms" | "call" | "email" | "in-person"

export interface CustomerCommsEntry {
  id: string
  channel: CommsChannel
  when: string
  summary: string
  mechanicId?: string
  inbound: boolean
}

export interface CustomerProfile {
  id: string
  name: string
  initials: string
  phone: string
  email: string
  suburb: string
  joinedAt: string
  lifetimeValueAud: number
  visitsCount: number
  loyaltyTier: "first-timer" | "regular" | "champion" | "lifer"
  vehicles: ReadonlyArray<CustomerVehicle>
  comms: ReadonlyArray<CustomerCommsEntry>
}

export const COMMS_CHANNEL_LABEL: Readonly<Record<CommsChannel, string>> = {
  sms: "SMS",
  call: "Call",
  email: "Email",
  "in-person": "Walk-in",
}

export const COMMS_CHANNEL_TONE: Readonly<Record<CommsChannel, OpsTone>> = {
  sms: "teal",
  call: "amber",
  email: "violet",
  "in-person": "green",
}

/* ------------------------------------------------------------------ *
 * SMS thread
 * ------------------------------------------------------------------ */

export type SmsDirection = "in" | "out"

export type SmsStatus = "queued" | "sent" | "delivered" | "read" | "failed"

export interface SmsMessage {
  id: string
  direction: SmsDirection
  body: string
  sentAt: string
  status: SmsStatus
  templateUsed?: string
}

export interface SmsTemplate {
  id: string
  label: string
  body: string
}

/* ------------------------------------------------------------------ *
 * Quote builder line item
 * ------------------------------------------------------------------ */

export type QuoteRowKind = "part" | "labour" | "fee"

export interface QuoteRow {
  id: string
  kind: QuoteRowKind
  label: string
  quantity: number
  unitAud: number
  /** Markup % over cost (parts only). */
  markupPct?: number
  /** Hours billed (labour only). */
  hours?: number
  /** Hourly rate AUD (labour only). */
  ratePerHourAud?: number
  /** True if line includes GST in unitAud. */
  gstIncluded?: boolean
  notes?: string
}

export const QUOTE_KIND_LABEL: Readonly<Record<QuoteRowKind, string>> = {
  part: "Part",
  labour: "Labour",
  fee: "Fee",
}

export const QUOTE_KIND_TONE: Readonly<Record<QuoteRowKind, OpsTone>> = {
  part: "amber",
  labour: "teal",
  fee: "violet",
}

/* ------------------------------------------------------------------ *
 * Vehicle inspection checklist
 * ------------------------------------------------------------------ */

export type InspectionResult = "pass" | "warn" | "fail" | "skip"

export interface InspectionItem {
  id: string
  label: string
  result: InspectionResult
  note?: string
}

export interface InspectionSection {
  id: string
  label: string
  items: ReadonlyArray<InspectionItem>
}

export const INSPECTION_RESULT_LABEL: Readonly<Record<InspectionResult, string>> = {
  pass: "Pass",
  warn: "Watch",
  fail: "Fail",
  skip: "N/A",
}

export const INSPECTION_RESULT_TONE: Readonly<Record<InspectionResult, OpsTone>> = {
  pass: "green",
  warn: "amber",
  fail: "red",
  skip: "neutral",
}

/* ------------------------------------------------------------------ *
 * Dyno run
 * ------------------------------------------------------------------ */

export interface DynoCurvePoint {
  rpm: number
  power: number
  torque: number
}

export interface DynoRun {
  id: string
  label: string
  recordedAt: string
  peakPowerKw: number
  peakTorqueNm: number
  peakRpm: number
  beforeCurve: ReadonlyArray<DynoCurvePoint>
  afterCurve: ReadonlyArray<DynoCurvePoint>
  notes?: string
}

/* ------------------------------------------------------------------ *
 * Payment collection
 * ------------------------------------------------------------------ */

export type PaymentProvider = "stripe" | "square" | "tyro" | "cash" | "bank-transfer"

export type PaymentStatus =
  | "pending"
  | "authorised"
  | "captured"
  | "settled"
  | "refunded"
  | "failed"

export interface PaymentCollection {
  id: string
  invoiceNumber: string
  amountAud: number
  gstAud: number
  provider: PaymentProvider
  status: PaymentStatus
  collectedAt?: string
  reference: string
  customerLabel: string
  /** True when partial refund issued. */
  partialRefund?: boolean
  /** Refunded amount AUD if any. */
  refundedAud?: number
}

export const PAYMENT_PROVIDER_LABEL: Readonly<Record<PaymentProvider, string>> = {
  stripe: "Stripe",
  square: "Square",
  tyro: "Tyro",
  cash: "Cash",
  "bank-transfer": "Bank transfer",
}

export const PAYMENT_STATUS_LABEL: Readonly<Record<PaymentStatus, string>> = {
  pending: "Pending",
  authorised: "Authorised",
  captured: "Captured",
  settled: "Settled",
  refunded: "Refunded",
  failed: "Failed",
}

export const PAYMENT_STATUS_TONE: Readonly<Record<PaymentStatus, OpsTone>> = {
  pending: "neutral",
  authorised: "teal",
  captured: "teal",
  settled: "green",
  refunded: "amber",
  failed: "red",
}

/* ------------------------------------------------------------------ *
 * Roadworthy / NSW RTA pink-slip
 * ------------------------------------------------------------------ */

export type CertType = "pink-slip" | "blue-slip" | "safety-check"

export type CertStatus =
  | "pre-inspection"
  | "in-progress"
  | "issued"
  | "rejected"
  | "expired"

export interface RoadworthyCert {
  id: string
  certType: CertType
  status: CertStatus
  rego: string
  vehicleLabel: string
  customerLabel: string
  inspectorName: string
  certNumber: string
  issuedAt?: string
  expiresAt?: string
  ervVerifiedAt?: string
  faultCount: number
}

export const CERT_TYPE_LABEL: Readonly<Record<CertType, string>> = {
  "pink-slip": "Pink-slip (eSafety)",
  "blue-slip": "Blue-slip (AUVIS)",
  "safety-check": "Safety check",
}

export const CERT_STATUS_LABEL: Readonly<Record<CertStatus, string>> = {
  "pre-inspection": "Pre-inspection",
  "in-progress": "In progress",
  issued: "Issued",
  rejected: "Rejected",
  expired: "Expired",
}

export const CERT_STATUS_TONE: Readonly<Record<CertStatus, OpsTone>> = {
  "pre-inspection": "neutral",
  "in-progress": "amber",
  issued: "green",
  rejected: "red",
  expired: "amber",
}

/* ------------------------------------------------------------------ *
 * Manufacturer recall
 * ------------------------------------------------------------------ */

export type RecallSeverity = "low" | "moderate" | "high" | "stop-drive"

export type RecallStatus = "open" | "reaching-out" | "scheduled" | "completed"

export interface RecallRow {
  id: string
  manufacturer: string
  campaignCode: string
  title: string
  description: string
  severity: RecallSeverity
  status: RecallStatus
  affectedCount: number
  reachedCount: number
  affectedYearRange: string
  affectedModel: string
  noticeIssuedAt: string
}

export const RECALL_SEVERITY_LABEL: Readonly<Record<RecallSeverity, string>> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  "stop-drive": "Stop-drive",
}

export const RECALL_SEVERITY_TONE: Readonly<Record<RecallSeverity, OpsTone>> = {
  low: "neutral",
  moderate: "amber",
  high: "red",
  "stop-drive": "red",
}

export const RECALL_STATUS_LABEL: Readonly<Record<RecallStatus, string>> = {
  open: "Open",
  "reaching-out": "Reaching out",
  scheduled: "Scheduled",
  completed: "Completed",
}

/* ------------------------------------------------------------------ *
 * Loyalty stamp
 * ------------------------------------------------------------------ */

export interface LoyaltyCard {
  id: string
  customerLabel: string
  currentStamps: number
  totalStamps: number
  /** Reward description, e.g. "Free DPF clean". */
  reward: string
  /** True when current reward has been earned but not yet redeemed. */
  rewardReady: boolean
  joinedAt: string
  lastVisit?: string
}

/* ------------------------------------------------------------------ *
 * Vehicle health tile
 * ------------------------------------------------------------------ */

export interface VehicleHealthDial {
  /** 0–100 — 100 = fresh, 0 = service needed now. */
  score: number
  /** Display label like "Oil life" or "Brake pads". */
  label: string
}

export interface VehicleHealth {
  vehicleId: string
  vehicleLabel: string
  rego: string
  ownerLabel: string
  lastServiceAt: string
  lastServiceMileageKm: number
  nextServiceDueAt: string
  daysUntilNextService: number
  oilDial: VehicleHealthDial
  brakeDial: VehicleHealthDial
  tyreDial: VehicleHealthDial
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

export function formatAud(amount: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export function formatHour(decimalHour: number): string {
  const totalMinutes = Math.round(decimalHour * 60)
  const hh = Math.floor(totalMinutes / 60)
  const mm = totalMinutes % 60
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`
}

export function formatHoursLabel(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`
  }
  if (Number.isInteger(hours)) {
    return `${hours}h`
  }
  return `${hours.toFixed(1)}h`
}

export function formatRpm(rpm: number): string {
  return `${rpm.toLocaleString("en-AU")} rpm`
}

export function formatKw(value: number): string {
  return `${value.toFixed(1)} kW`
}

export function formatNm(value: number): string {
  return `${Math.round(value)} Nm`
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-AU")} km`
}

export function opsToneToChip(tone: OpsTone): "red" | "amber" | "teal" | "green" | "neutral" {
  if (tone === "violet") return "neutral"
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") return tone
  return "neutral"
}

export function opsToneToRadial(tone: OpsTone): "red" | "amber" | "teal" | "green" | "neutral" {
  return opsToneToChip(tone)
}

export function opsToneToVar(tone: OpsTone): string {
  switch (tone) {
    case "red":
      return "var(--primitive-red, #e62028)"
    case "amber":
      return "var(--primitive-amber, #ffc14f)"
    case "teal":
      return "var(--primitive-teal, #40bcff)"
    case "green":
      return "var(--primitive-green, #37d67a)"
    case "violet":
      return "var(--primitive-violet, #a878ff)"
    case "neutral":
    default:
      return "var(--primitive-body, #c7c9d0)"
  }
}
