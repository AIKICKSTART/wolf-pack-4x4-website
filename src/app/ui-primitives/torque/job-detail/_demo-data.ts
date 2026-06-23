/**
 * Demo fixtures for the Workshop job detail screen (Torque work-order cockpit).
 *
 * A single real Oak Flats Muffler Men exhaust job — a Ford Ranger PX3 3″
 * turbo-back build with a hi-flow cat and dyno verification — rendered end to
 * end: vehicle + customer header, service line items + parts, technician
 * allocation + time entries, a DVI inspection sheet, the status timeline, the
 * quote→invoice money, payment collection, and a high-value approval gate.
 *
 * Every shape conforms to the EXISTING primitive prop contracts; nothing here
 * modifies a primitive.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque"
 * (the underlying console is never named to the customer).
 */

import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { MediaTrayItem } from "../../components/data-display/media-tray"
import type { StatusBadgeSpec } from "../../components/data-display/status-badge-grid"
import type {
  CustomerProfile,
  InspectionSection,
  Mechanic,
  PartPullEntry,
  PaymentCollection,
  QuoteRow,
  ServiceTicket,
  ShiftBlock,
  VehicleHealth,
} from "../../components/workshop-ops/workshop-ops-types"

/* ------------------------------------------------------------------ *
 * Business identity
 * ------------------------------------------------------------------ */

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"
export const TODAY_LABEL = "Friday 29 May 2026"
export const DAY_LABEL = "Friday 29 May"

/* ------------------------------------------------------------------ *
 * The job
 * ------------------------------------------------------------------ */

export const JOB_NUMBER = "WO-2611"
export const QUOTE_NUMBER = "QT-4470"
export const INVOICE_NUMBER = "INV-2611"

/* ------------------------------------------------------------------ *
 * Crew (workshop-ops Mechanic contract)
 * ------------------------------------------------------------------ */

export const CREW: ReadonlyArray<Mechanic> = [
  {
    id: "m-deano",
    name: "Deano Falzon",
    initials: "DF",
    role: "Workshop Manager",
    level: "master",
    tone: "red",
  },
  {
    id: "m-rhys",
    name: "Rhys McAllister",
    initials: "RM",
    role: "Senior Exhaust Tech",
    level: "tech",
    tone: "teal",
  },
  {
    id: "m-jordy",
    name: "Jordy Petrovic",
    initials: "JP",
    role: "Apprentice Y3",
    level: "apprentice",
    tone: "amber",
  },
]

const CREW_BY_ID: Readonly<Record<string, Mechanic>> = Object.fromEntries(
  CREW.map((mechanic) => [mechanic.id, mechanic]),
)

export function mechanicById(id: string | undefined): Mechanic | undefined {
  return id ? CREW_BY_ID[id] : undefined
}

/* ------------------------------------------------------------------ *
 * Service ticket / work order (workshop-ops ServiceTicket contract)
 * ------------------------------------------------------------------ */

export const JOB_TICKET: ServiceTicket = {
  id: "t-2611",
  number: JOB_NUMBER,
  customerName: "Sam Whittaker",
  vehicleLabel: "2021 Ford Ranger PX3 Wildtrak 2.0L Bi-Turbo",
  rego: "DZ-84-QK",
  vin: "MNCUMFF80MW412889",
  mileageKm: 68420,
  bayId: "bay-4-hoist",
  mechanicId: "m-rhys",
  status: "in-progress",
  priority: "rush",
  loggedAt: "10:32 am",
  etaLabel: "2:45 pm",
  totalAud: 3286,
  services: [
    { id: "sv-1", label: "Remove factory DPF-back system", hours: 1, done: true },
    { id: "sv-2", label: "Fabricate 3″ mandrel-bent turbo-back", hours: 3, done: true },
    { id: "sv-3", label: "Fit hi-flow metallic cat converter", hours: 1, done: false },
    { id: "sv-4", label: "Hang twin 304 stainless rear exit", hours: 1.5, done: false },
    { id: "sv-5", label: "Dyno verify + ADR drive-by sound check", hours: 1, done: false },
  ],
}

/* ------------------------------------------------------------------ *
 * Customer 360 (workshop-ops CustomerProfile contract)
 * ------------------------------------------------------------------ */

export const CUSTOMER: CustomerProfile = {
  id: "c-whittaker",
  name: "Sam Whittaker",
  initials: "SW",
  phone: "0412 884 219",
  email: "sam.whittaker@gmail.com",
  suburb: "Albion Park · NSW",
  joinedAt: "Mar 2022",
  lifetimeValueAud: 11840,
  visitsCount: 9,
  loyaltyTier: "champion",
  vehicles: [
    {
      id: "v-ranger",
      label: "Ford Ranger PX3 Wildtrak",
      rego: "DZ-84-QK",
      bodyColour: "Meteor Grey",
      yearMade: 2021,
    },
    {
      id: "v-territory",
      label: "Ford Territory TX",
      rego: "BQ-19-LM",
      bodyColour: "Silhouette Black",
      yearMade: 2016,
    },
  ],
  comms: [
    {
      id: "cm-1",
      channel: "sms",
      when: "10:48 am",
      summary: "Quote QT-4470 sent — $3,286 inc. GST. Replied APPROVE.",
      inbound: true,
    },
    {
      id: "cm-2",
      channel: "call",
      when: "9:55 am",
      summary: "Confirmed 3″ turbo-back, asked to keep it ADR-legal for daily driving.",
      inbound: true,
    },
    {
      id: "cm-3",
      channel: "in-person",
      when: "Yesterday",
      summary: "Dropped the Ranger in for a quote after the drone complaint.",
      inbound: true,
    },
  ],
}

export const CUSTOMER_SPEND_TREND: ReadonlyArray<number> = [
  320, 0, 0, 890, 0, 1240, 0, 0, 2100, 0, 480, 3286,
]

/* ------------------------------------------------------------------ *
 * Vehicle health (workshop-ops VehicleHealth contract)
 * ------------------------------------------------------------------ */

export const VEHICLE_HEALTH: VehicleHealth = {
  vehicleId: "v-ranger",
  vehicleLabel: "Ford Ranger PX3 Wildtrak",
  rego: "DZ-84-QK",
  ownerLabel: "Sam Whittaker · Albion Park",
  lastServiceAt: "12 Feb 2026",
  lastServiceMileageKm: 60100,
  nextServiceDueAt: "12 Aug 2026",
  daysUntilNextService: 75,
  oilDial: { score: 64, label: "Oil life" },
  brakeDial: { score: 48, label: "Brake pads" },
  tyreDial: { score: 81, label: "Tyre tread" },
}

/* ------------------------------------------------------------------ *
 * Quote → invoice line items (workshop-ops QuoteRow contract)
 * ------------------------------------------------------------------ */

export const QUOTE_ROWS: ReadonlyArray<QuoteRow> = [
  {
    id: "q-1",
    kind: "part",
    label: "Custom 3″ mandrel-bent turbo-back — 409 aluminised",
    quantity: 1,
    unitAud: 940,
    markupPct: 26,
    notes: "Shop-fabricated, twin rear exit, ceramic-coated dump",
  },
  {
    id: "q-2",
    kind: "part",
    label: "Hi-flow 200-cell metallic cat converter",
    quantity: 1,
    unitAud: 285,
    markupPct: 30,
  },
  {
    id: "q-3",
    kind: "part",
    label: "304 stainless angle-cut tips (pair)",
    quantity: 2,
    unitAud: 88,
    markupPct: 35,
  },
  {
    id: "q-4",
    kind: "labour",
    label: "Fabrication, fit-up, hanger work & leak test",
    quantity: 1,
    unitAud: 924,
    hours: 7,
    ratePerHourAud: 132,
  },
  {
    id: "q-5",
    kind: "labour",
    label: "Dyno verification + ADR drive-by sound check",
    quantity: 1,
    unitAud: 198,
    hours: 1.5,
    ratePerHourAud: 132,
  },
  {
    id: "q-6",
    kind: "fee",
    label: "Workshop consumables & EPA disposal",
    quantity: 1,
    unitAud: 55,
  },
]

/* ------------------------------------------------------------------ *
 * Parts pull list (workshop-ops PartPullEntry contract)
 * ------------------------------------------------------------------ */

export const PARTS_PULL: ReadonlyArray<PartPullEntry> = [
  {
    id: "p-1",
    partNumber: "OFM-RGR-300TB",
    label: "3″ turbo-back tube kit — Ranger PX3",
    supplier: "In-house fab",
    bin: "FAB-A2",
    stock: "in-stock",
    quantity: 1,
    unitPriceAud: 940,
    pulled: true,
  },
  {
    id: "p-2",
    partNumber: "XF-CAT-200HF",
    label: "Hi-flow 200-cell metallic cat",
    supplier: "XForce · Wollongong",
    bin: "CAT-12",
    stock: "in-stock",
    quantity: 1,
    unitPriceAud: 285,
    pulled: true,
  },
  {
    id: "p-3",
    partNumber: "TIP-304-AC4",
    label: "4″ angle-cut 304 tip",
    supplier: "Manta · Smeaton Grange",
    bin: "TIP-07",
    stock: "low",
    quantity: 2,
    unitPriceAud: 88,
    pulled: false,
  },
  {
    id: "p-4",
    partNumber: "HGR-RUB-12",
    label: "Rubber exhaust hanger mount",
    supplier: "Burson · Shellharbour",
    bin: "GEN-31",
    stock: "in-stock",
    quantity: 4,
    unitPriceAud: 9.5,
    pulled: false,
  },
  {
    id: "p-5",
    partNumber: "CLP-VB-300",
    label: "3″ stainless V-band clamp",
    supplier: "Supplier pull",
    bin: "—",
    stock: "supplier-pull",
    quantity: 2,
    unitPriceAud: 34,
    pulled: false,
  },
]

/* ------------------------------------------------------------------ *
 * Technician allocation + time entries (workshop-ops ShiftBlock contract)
 * ------------------------------------------------------------------ */

export const SHIFT_HOUR_TICKS: ReadonlyArray<number> = [9, 10.5, 12, 13.5, 15, 16.5]

export const SHIFT_BLOCKS: ReadonlyArray<ShiftBlock> = [
  {
    id: "tb-rhys-1",
    mechanicId: "m-rhys",
    kind: "shift",
    startHour: 10.5,
    durationHours: 1.5,
    note: "Strip factory system + measure up",
  },
  { id: "tb-rhys-l", mechanicId: "m-rhys", kind: "lunch", startHour: 12, durationHours: 0.5 },
  {
    id: "tb-rhys-2",
    mechanicId: "m-rhys",
    kind: "shift",
    startHour: 12.5,
    durationHours: 4,
    note: "Fabricate + fit turbo-back",
  },
  {
    id: "tb-jordy-1",
    mechanicId: "m-jordy",
    kind: "shift",
    startHour: 11,
    durationHours: 1,
    note: "Pull parts + prep hangers",
  },
  { id: "tb-jordy-b", mechanicId: "m-jordy", kind: "break", startHour: 12, durationHours: 0.25 },
  {
    id: "tb-jordy-2",
    mechanicId: "m-jordy",
    kind: "shift",
    startHour: 12.5,
    durationHours: 2,
    note: "Assist fit-up + tip alignment",
  },
  {
    id: "tb-deano-1",
    mechanicId: "m-deano",
    kind: "shift",
    startHour: 15,
    durationHours: 1.5,
    note: "Dyno verify + sign-off",
  },
]

/** Logged time entries against the job — figures use tabular-nums in the UI. */
export interface JobTimeEntry {
  id: string
  mechanicId: string
  task: string
  fromLabel: string
  toLabel: string
  hours: number
  billable: boolean
}

export const TIME_ENTRIES: ReadonlyArray<JobTimeEntry> = [
  {
    id: "te-1",
    mechanicId: "m-rhys",
    task: "Strip factory DPF-back, measure & template",
    fromLabel: "10:32",
    toLabel: "12:00",
    hours: 1.5,
    billable: true,
  },
  {
    id: "te-2",
    mechanicId: "m-jordy",
    task: "Pull parts from fab bench + prep hangers",
    fromLabel: "11:00",
    toLabel: "12:00",
    hours: 1,
    billable: true,
  },
  {
    id: "te-3",
    mechanicId: "m-rhys",
    task: "Fabricate 3″ mandrel mid-section + tack tips",
    fromLabel: "12:30",
    toLabel: "14:15",
    hours: 1.75,
    billable: true,
  },
  {
    id: "te-4",
    mechanicId: "m-jordy",
    task: "Hanger fit-up + tip alignment (in progress)",
    fromLabel: "12:30",
    toLabel: "—",
    hours: 0.5,
    billable: true,
  },
]

export const TIME_BOOKED_HOURS = 8.5
export const TIME_LOGGED_HOURS = 4.75

/* ------------------------------------------------------------------ *
 * DVI inspection checklist (workshop-ops InspectionSection contract)
 * ------------------------------------------------------------------ */

export const INSPECTOR_NAME = "Rhys McAllister"
export const INSPECTED_AT = "Today · 11:10 am"

export const DVI_SECTIONS: ReadonlyArray<InspectionSection> = [
  {
    id: "sec-exhaust",
    label: "Exhaust & emissions",
    items: [
      { id: "i-1", label: "Factory DPF-back condition", result: "warn", note: "Inner muffler rattle, baffle collapsing" },
      { id: "i-2", label: "Manifold & turbo flange seals", result: "pass" },
      { id: "i-3", label: "Cat converter (factory)", result: "pass", note: "Re-using factory location, fitting hi-flow" },
      { id: "i-4", label: "Hanger rubbers & mounts", result: "fail", note: "2 perished, replacing all 4" },
    ],
  },
  {
    id: "sec-underbody",
    label: "Underbody & driveline",
    items: [
      { id: "i-5", label: "Chassis rails / crossmember clearance", result: "pass" },
      { id: "i-6", label: "Fuel & brake line routing", result: "pass" },
      { id: "i-7", label: "Heat-shield integrity near tank", result: "warn", note: "Recommend wrap on dump pipe" },
    ],
  },
  {
    id: "sec-safety",
    label: "Safety & roadworthy",
    items: [
      { id: "i-8", label: "Front brake pad life", result: "warn", note: "48% — flag at next service" },
      { id: "i-9", label: "Tyre tread & condition", result: "pass" },
      { id: "i-10", label: "Drive-by sound (pre-build baseline)", result: "skip", note: "Re-test on dyno post-fit" },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Status timeline (data-display ActivityFeed contract)
 * ------------------------------------------------------------------ */

export const STATUS_TIMELINE: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "tl-1",
    title: "Quote QT-4470 sent to customer",
    description: "Torque drafted the 3″ turbo-back quote at $3,286 inc. GST and SMS'd Sam the link.",
    timestamp: "10:42 am",
    tone: "info",
    actor: { name: "Torque" },
  },
  {
    id: "tl-2",
    title: "Customer approved by SMS",
    description: "Sam replied APPROVE. Torque flipped the quote to a work order and booked Bay 4 hoist.",
    timestamp: "10:48 am",
    tone: "success",
    actor: { name: "Sam Whittaker" },
  },
  {
    id: "tl-3",
    title: "Job started on Bay 4 hoist",
    description: "Rhys clocked on and began stripping the factory DPF-back system.",
    timestamp: "10:32 am",
    tone: "info",
    actor: { name: "Rhys McAllister" },
  },
  {
    id: "tl-4",
    title: "Hanger rubbers flagged on DVI",
    description: "Two perished mounts found — all four being replaced. Added to the invoice, no price change to customer.",
    timestamp: "11:14 am",
    tone: "warn",
    actor: { name: "Rhys McAllister" },
  },
  {
    id: "tl-5",
    title: "Dyno cell booked for verification",
    description: "Deano holds the 3:00 pm dyno slot for the ADR drive-by sound check before handover.",
    timestamp: "11:30 am",
    tone: "info",
    actor: { name: "Torque" },
  },
]

/* ------------------------------------------------------------------ *
 * Payment collection (workshop-ops PaymentCollection contract)
 * ------------------------------------------------------------------ */

export const PAYMENT: PaymentCollection = {
  id: "pay-2611",
  invoiceNumber: INVOICE_NUMBER,
  amountAud: 3286,
  gstAud: 298.73,
  provider: "tyro",
  status: "authorised",
  reference: "WO-2611 · Ranger turbo-back",
  customerLabel: "Sam Whittaker",
}

export const DEPOSIT_AUD = 1000
export const BALANCE_DUE_AUD = 2286

/* ------------------------------------------------------------------ *
 * High-value approval gate (composed from primitive chrome)
 * ------------------------------------------------------------------ */

export interface ApprovalThreshold {
  id: string
  label: string
  value: string
  caption: string
  tone: "red" | "amber" | "teal" | "green" | "neutral"
}

export const APPROVAL_THRESHOLD_AUD = 2500

export const APPROVAL_THRESHOLDS: ReadonlyArray<ApprovalThreshold> = [
  {
    id: "th-total",
    label: "Job total inc. GST",
    value: "$3,286",
    caption: "Above the $2,500 sign-off line",
    tone: "red",
  },
  {
    id: "th-margin",
    label: "Gross margin",
    value: "41%",
    caption: "Parts markup + labour",
    tone: "green",
  },
  {
    id: "th-deposit",
    label: "Deposit held",
    value: "$1,000",
    caption: "Tyro pre-auth · 10:51 am",
    tone: "teal",
  },
]

/** Status badge legend for the approval gate. */
export const APPROVAL_BADGES: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "success", label: "Customer approved" },
  { tone: "warn", label: "Awaiting manager sign-off" },
  { tone: "info", label: "Deposit pre-authorised" },
]

/* ------------------------------------------------------------------ *
 * Job photos (data-display MediaTray contract — brand media)
 * ------------------------------------------------------------------ */

const MEDIA_ROOT = "/media/generated"

export const JOB_MEDIA: ReadonlyArray<MediaTrayItem> = [
  {
    id: "media-1",
    title: "On the hoist · Bay 4",
    meta: "Factory system stripped",
    tag: "Before",
    src: `${MEDIA_ROOT}/ford-ranger-raptor-undercarriage-hoist.webp`,
  },
  {
    id: "media-2",
    title: "3″ mandrel turbo-back tacked",
    meta: "Twin rear exit fab",
    tag: "In progress",
    src: `${MEDIA_ROOT}/ford-ranger-raptor-exhaust-closeup.webp`,
  },
  {
    id: "media-3",
    title: "Rear exit mock-up",
    meta: "304 stainless angle-cut tips",
    tag: "Fit-up",
    src: `${MEDIA_ROOT}/ford-ranger-raptor-end-frame-rear-hero.webp`,
  },
  {
    id: "media-4",
    title: "Out the door reference",
    meta: "Side profile for the customer gallery",
    tag: "Handover",
    src: `${MEDIA_ROOT}/ford-ranger-raptor-side-profile-reference.webp`,
  },
]
