/**
 * Demo data for the Quote builder screen (Workshop Pro federation surface).
 *
 * Real Oak Flats Muffler Men (Illawarra NSW) exhaust quote: a 2021 Ford Ranger
 * PX III 2.0L Bi-Turbo getting a 3" turbo-back system, hi-flow cat, fabricated
 * hangers and a Tradie's diesel tune. Parts carry a markup over cost, labour is
 * billed at the workshop hourly rate, and a workshop fee covers consumables.
 * Every figure is production-ready language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque". The
 * legacy internal codename is never surfaced in any string in this module.
 */

import type {
  AcceptanceEvent,
  AcceptanceState,
  AppliedDiscount,
  QuoteLineItemOption,
  SignatureRequest,
  TaxLine,
} from "../../components/quotes"
import type { MediaTrayItem } from "../../components/data-display/media-tray"
import type { QuoteRow } from "../../components/workshop-ops/workshop-ops-types"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Oak Flats · Illawarra NSW"

/* ------------------------------------------------------------------ *
 * Customer + vehicle the quote is for
 * ------------------------------------------------------------------ */

export interface QuoteCustomer {
  name: string
  initials: string
  phone: string
  email: string
  suburb: string
}

export interface QuoteVehicle {
  label: string
  rego: string
  vin: string
  odometerKm: number
  engine: string
  notes: string
}

export const CUSTOMER: QuoteCustomer = {
  name: "Dane Mercer",
  initials: "DM",
  phone: "0428 117 904",
  email: "dane.mercer@gmail.com",
  suburb: "Albion Park Rail NSW 2527",
}

export const VEHICLE: QuoteVehicle = {
  label: "2021 Ford Ranger PX III XLT",
  rego: "DKM-42E",
  vin: "MPBUMFF40MX118742",
  odometerKm: 68420,
  engine: "2.0L Bi-Turbo diesel · auto 4x4",
  notes: "Stock exhaust drones on the highway, wants more low-end and a deeper note for towing the van.",
}

/* ------------------------------------------------------------------ *
 * Quote metadata
 * ------------------------------------------------------------------ */

export const QUOTE_NUMBER = "QT-4498"
export const QUOTE_DATE_LABEL = "Quoted Thu 29 May 2026 · 9:42am"
export const GST_PERCENT = 10

/** 14 days out from the quote date — drives the validity countdown. */
export const QUOTE_EXPIRES_AT = "2026-06-12T17:00:00+10:00"
/** Fixed reference "now" so the showcase renders deterministically. */
export const QUOTE_NOW_OVERRIDE = "2026-05-29T09:42:00+10:00"

/* ------------------------------------------------------------------ *
 * The quote lines (QuoteBuilderRow contract: part / labour / fee)
 * ------------------------------------------------------------------ */

export const QUOTE_ROWS: ReadonlyArray<QuoteRow> = [
  {
    id: "ln-1",
    kind: "part",
    label: 'XForce 3" turbo-back system — Ranger PX III 2.0L',
    quantity: 1,
    unitAud: 1180,
    markupPct: 26,
    notes: "409 raw stainless, mandrel-bent, twin 4″ rolled rear exit",
  },
  {
    id: "ln-2",
    kind: "part",
    label: "Hi-flow 200-cell metallic cat converter",
    quantity: 1,
    unitAud: 285,
    markupPct: 30,
    notes: "Keeps it eSafety-legal, no DPF delete",
  },
  {
    id: "ln-3",
    kind: "part",
    label: "Hangers, V-band clamps & vibration mounts",
    quantity: 1,
    unitAud: 96,
    markupPct: 35,
  },
  {
    id: "ln-4",
    kind: "labour",
    label: "Remove old system, fit turbo-back, fab hangers, leak test",
    quantity: 1,
    unitAud: 660,
    hours: 5,
    ratePerHourAud: 132,
  },
  {
    id: "ln-5",
    kind: "labour",
    label: "Dyno-verified Tradie's diesel tune (in-house cell)",
    quantity: 1,
    unitAud: 396,
    hours: 3,
    ratePerHourAud: 132,
  },
  {
    id: "ln-6",
    kind: "fee",
    label: "Workshop consumables, welding gas & disposal",
    quantity: 1,
    unitAud: 55,
  },
]

/** Catalogue offered by the "add line" select — real Mufflermen line items. */
export const LINE_CATALOGUE: ReadonlyArray<QuoteLineItemOption> = [
  { value: "xforce-3-turbo-back", label: 'XForce 3" turbo-back system' },
  { value: "manta-3-cat-back", label: 'Manta 3" cat-back system' },
  { value: "hiflow-cat", label: "Hi-flow 200-cell metallic cat" },
  { value: "muffler-delete", label: "Centre muffler delete + resonator" },
  { value: "hangers-kit", label: "Hangers, clamps & mounts kit" },
  { value: "labour-fit", label: "Labour — remove & fit (per hour)" },
  { value: "labour-fab", label: "Labour — custom fabrication (per hour)" },
  { value: "dyno-tune", label: "Dyno-verified diesel tune" },
  { value: "workshop-fee", label: "Workshop consumables & disposal" },
]

/** Single illustrative line for the in-table add/edit demo row. */
export const NEW_LINE_DRAFT = {
  id: "ln-draft",
  title: 'Centre muffler delete + resonator',
  sku: "muffler-delete",
  quantity: 1,
  unitPrice: 220,
} as const

/* ------------------------------------------------------------------ *
 * Markup / discount editor
 * ------------------------------------------------------------------ */

export const DISCOUNT_SCOPES: ReadonlyArray<string> = [
  "Whole quote",
  "Parts only",
  "Labour only",
  "Dyno tune",
]

export const INITIAL_DISCOUNT: AppliedDiscount = {
  kind: "fixed",
  amount: 120,
  scope: "Whole quote",
  reason: "Repeat customer — 3rd build with us this year. Knock off the tune setup.",
}

/* ------------------------------------------------------------------ *
 * Totals rail (derived from QUOTE_ROWS so the page and the rail agree)
 * ------------------------------------------------------------------ */

function lineExGst(row: QuoteRow): number {
  if (row.kind === "labour" && row.hours && row.ratePerHourAud) {
    return row.hours * row.ratePerHourAud
  }
  const base = row.unitAud * row.quantity
  if (row.kind === "part" && row.markupPct) {
    return base * (1 + row.markupPct / 100)
  }
  return base
}

export const PARTS_SUBTOTAL = QUOTE_ROWS.filter((r) => r.kind === "part").reduce(
  (sum, r) => sum + lineExGst(r),
  0,
)
export const LABOUR_SUBTOTAL = QUOTE_ROWS.filter((r) => r.kind === "labour").reduce(
  (sum, r) => sum + lineExGst(r),
  0,
)
export const FEE_SUBTOTAL = QUOTE_ROWS.filter((r) => r.kind === "fee").reduce(
  (sum, r) => sum + lineExGst(r),
  0,
)

export const DISCOUNT_AMOUNT = INITIAL_DISCOUNT.amount

export const SUBTOTAL_EX_GST =
  PARTS_SUBTOTAL + LABOUR_SUBTOTAL + FEE_SUBTOTAL - DISCOUNT_AMOUNT
export const GST_AMOUNT = SUBTOTAL_EX_GST * (GST_PERCENT / 100)
export const GRAND_TOTAL = SUBTOTAL_EX_GST + GST_AMOUNT
/** A 50% deposit to secure the parts order. */
export const DEPOSIT_DUE = GRAND_TOTAL * 0.5

export const TAX_LINES: ReadonlyArray<TaxLine> = [
  { label: "GST", rate: GST_PERCENT, amount: GST_AMOUNT },
]

export interface RailLine {
  id: string
  label: string
  amount: number
  hint?: string
}

export const RAIL_LINES: ReadonlyArray<RailLine> = [
  { id: "parts", label: "Parts (incl. markup)", amount: PARTS_SUBTOTAL, hint: "3 line items" },
  { id: "labour", label: "Labour", amount: LABOUR_SUBTOTAL, hint: "8.0 hrs @ $132/hr" },
  { id: "fees", label: "Workshop fees", amount: FEE_SUBTOTAL },
  { id: "discount", label: "Loyalty discount", amount: -DISCOUNT_AMOUNT, hint: "Whole quote" },
]

/* ------------------------------------------------------------------ *
 * Build reference imagery — real brand media
 * ------------------------------------------------------------------ */

export const BUILD_MEDIA: ReadonlyArray<MediaTrayItem> = [
  {
    id: "m-1",
    title: 'XForce 3" turbo-back — Ranger PX III',
    meta: "409 raw stainless, twin rear exit",
    tag: "This build",
    src: "/media/generated/ford-ranger-raptor-exhaust-closeup.webp",
  },
  {
    id: "m-2",
    title: "On the hoist — undercarriage clearance check",
    meta: "Bay 4 · custom hanger fab",
    tag: "Reference",
    src: "/media/generated/ford-ranger-raptor-undercarriage-hoist.webp",
  },
  {
    id: "m-3",
    title: "Finished rear quarter — rolled tips",
    meta: "Sits flush under the bar",
    tag: "Reference",
    src: "/media/generated/ford-ranger-raptor-end-frame-rear-hero.webp",
  },
]

/* ------------------------------------------------------------------ *
 * Duplicate detection — a similar prior quote
 * ------------------------------------------------------------------ */

export interface DuplicateSummary {
  quoteNumber: string
  customerName: string
  vehicleLabel: string
  totalAud: number
  age: string
  matchPercent: number
}

export const DUPLICATE: DuplicateSummary = {
  quoteNumber: "QT-4471",
  customerName: "Dane Mercer",
  vehicleLabel: "2021 Ford Ranger PX III XLT",
  totalAud: 3120,
  age: "drafted 6 days ago",
  matchPercent: 82,
}

/* ------------------------------------------------------------------ *
 * Send-for-approval defaults
 * ------------------------------------------------------------------ */

export const SIGNATURE_DEFAULTS: SignatureRequest = {
  signerName: CUSTOMER.name,
  signerEmail: CUSTOMER.email,
  subject: `Your exhaust quote ${QUOTE_NUMBER} — ${BUSINESS_NAME}`,
  coverNote:
    "G'day Dane, here's the quote for the 3\" turbo-back on the Ranger as we chatted about. " +
    "Tap the link to view it in full, approve it, or send back a counter. Quote holds for 14 days " +
    "and we can get you booked into Bay 4 once the deposit's in. — The team at Oak Flats Muffler Men.",
}

/* ------------------------------------------------------------------ *
 * Acceptance lifecycle tracker
 * ------------------------------------------------------------------ */

export const ACCEPTANCE_CURRENT: AcceptanceState = "viewed"

export const ACCEPTANCE_EVENTS: ReadonlyArray<AcceptanceEvent> = [
  { state: "sent", occurredAt: "29 May · 9:48am", detail: "Emailed to dane.mercer@gmail.com" },
  { state: "opened", occurredAt: "29 May · 10:12am", detail: "Opened on mobile" },
  { state: "viewed", occurredAt: "29 May · 10:14am", detail: "Spent 3m on the line items" },
]
