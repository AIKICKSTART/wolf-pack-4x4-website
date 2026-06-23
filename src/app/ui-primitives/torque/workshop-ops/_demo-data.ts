/**
 * Demo fixtures for the Workshop operations board (Torque shop-floor cockpit).
 *
 * Realistic Oak Flats Muffler Men data — Illawarra NSW exhaust + servicing
 * jobs across six bays, a real crew, today's quote→job pipeline, and a live
 * bay-occupancy strip. Every shape conforms to the EXISTING primitive prop
 * contracts; nothing here modifies a primitive.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque"
 * (the underlying console is never named to the customer).
 */

import type {
  KanbanColumn,
  KanbanCard,
} from "../../components/data-display/kanban-board"
import type { StatusBadgeSpec } from "../../components/data-display/status-badge-grid"
import type {
  NextUpEntry,
} from "../../components/workshop-floor-live/next-up-queue"
import type {
  BayId,
  BayLiveState,
} from "../../components/workshop-floor-live/workshop-floor-types"
import type {
  NowServingJob,
} from "../../components/bay-display/now-serving-strip"
import type {
  Mechanic,
  QuoteRow,
  ServiceTicket,
  ShiftBlock,
} from "../../components/workshop-ops/workshop-ops-types"

/* ------------------------------------------------------------------ *
 * Business identity
 * ------------------------------------------------------------------ */

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"
export const TODAY_LABEL = "Friday 29 May 2026"
export const DAY_LABEL = "Friday 29 May"

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
    id: "m-talia",
    name: "Talia Nguyen",
    initials: "TN",
    role: "Diagnostics & Tune",
    level: "tech",
    tone: "green",
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
 * Quote → job pipeline (data-display Kanban contract)
 * ------------------------------------------------------------------ */

const QUOTED: ReadonlyArray<KanbanCard> = [
  {
    id: "k-q1",
    code: "QT-4471",
    title: "Holden Colorado RG · 3″ DPF-back",
    sub: "Manta cat-back, raw 409 stainless",
    tags: ["Exhaust", "Quote sent"],
    priority: "med",
    due: "Quoted 8:10am",
    assignees: [{ name: "Talia Nguyen" }],
  },
  {
    id: "k-q2",
    code: "QT-4472",
    title: "Subaru WRX VA · resonator delete",
    sub: "Awaiting customer go-ahead on tip finish",
    tags: ["Performance", "Awaiting OK"],
    priority: "low",
    due: "Quoted 8:40am",
    assignees: [{ name: "Rhys McAllister" }],
  },
  {
    id: "k-q3",
    code: "QT-4473",
    title: "Toyota Hiace KDH · full system + muffler",
    sub: "Fleet vehicle — Shellharbour Couriers",
    tags: ["Fleet", "Exhaust"],
    priority: "high",
    due: "Quoted 9:05am",
    assignees: [{ name: "Deano Falzon" }],
  },
]

const APPROVED: ReadonlyArray<KanbanCard> = [
  {
    id: "k-a1",
    code: "WO-2611",
    title: "Ford Ranger PX3 · 3″ turbo-back",
    sub: "Approved by SMS — booked Bay 4 hoist",
    tags: ["Exhaust", "Booked"],
    priority: "high",
    due: "Drop-off 10:30am",
    assignees: [{ name: "Rhys McAllister" }],
  },
  {
    id: "k-a2",
    code: "WO-2612",
    title: "Mazda BT-50 · centre + rear muffler",
    sub: "Deposit paid, parts pulled",
    tags: ["Exhaust"],
    priority: "med",
    due: "Drop-off 11:15am",
    assignees: [{ name: "Jordy Petrovic" }],
  },
]

const IN_BAY: ReadonlyArray<KanbanCard> = [
  {
    id: "k-b1",
    code: "WO-2604",
    title: "Nissan Patrol Y62 · custom 3.5″ build",
    sub: "Bay 1 — mandrel bends tacked, fitting tips",
    tags: ["Fabrication", "In bay"],
    priority: "high",
    due: "ETA 12:40pm",
    assignees: [{ name: "Deano Falzon" }, { name: "Jordy Petrovic" }],
  },
  {
    id: "k-b2",
    code: "WO-2607",
    title: "VW Amarok · DPF clean + diagnostic",
    sub: "Bay 3 — EGT logging on the scan tool",
    tags: ["Diagnostic", "Servicing"],
    priority: "med",
    due: "ETA 1:20pm",
    assignees: [{ name: "Talia Nguyen" }],
  },
  {
    id: "k-b3",
    code: "WO-2609",
    title: "HSV Clubsport · dyno tune + sound check",
    sub: "Bay 6 dyno — ADR drive-by pass",
    tags: ["Dyno", "Performance"],
    priority: "high",
    due: "ETA 2:00pm",
    assignees: [{ name: "Rhys McAllister" }],
  },
]

const READY: ReadonlyArray<KanbanCard> = [
  {
    id: "k-d1",
    code: "WO-2598",
    title: "Isuzu D-Max · rear muffler swap",
    sub: "Washed, photos sent, invoice settled",
    tags: ["Exhaust", "Paid"],
    priority: "low",
    due: "Picked up 9:50am",
    assignees: [{ name: "Jordy Petrovic" }],
  },
  {
    id: "k-d2",
    code: "WO-2601",
    title: "Hyundai i30 N · cat-back fit",
    sub: "Handover SMS sent — collecting at 3pm",
    tags: ["Performance", "Ready"],
    priority: "med",
    due: "Ready 11:05am",
    assignees: [{ name: "Rhys McAllister" }],
  },
]

export const PIPELINE_COLUMNS: ReadonlyArray<KanbanColumn> = [
  { stage: "backlog", title: "Quoted", cards: QUOTED },
  { stage: "progress", title: "Approved · booked", cards: APPROVED },
  { stage: "review", title: "In the bays", cards: IN_BAY },
  { stage: "done", title: "Ready / collected", cards: READY },
]

/* ------------------------------------------------------------------ *
 * Live bay status cards (workshop-floor-live contract — 4 live bays)
 * ------------------------------------------------------------------ */

export interface LiveBay {
  bay: BayId
  state: BayLiveState
  vehicle?: string
  customer?: string
  technician: { name: string; role: string }
  jobNumber?: string
  elapsedMinutes: number
  etaHandover?: string
  progressPercent: number
}

export const LIVE_BAYS: ReadonlyArray<LiveBay> = [
  {
    bay: "bay-1",
    state: "in-progress",
    vehicle: "Nissan Patrol Y62 · CV-21-RT",
    customer: "Marko Aleksic",
    technician: { name: "Deano Falzon", role: "Workshop Manager" },
    jobNumber: "WO-2604",
    elapsedMinutes: 96,
    etaHandover: "12:40 pm",
    progressPercent: 68,
  },
  {
    bay: "bay-2",
    state: "handover",
    vehicle: "Hyundai i30 N · BX-09-KM",
    customer: "Priya Sharma",
    technician: { name: "Rhys McAllister", role: "Senior Exhaust Tech" },
    jobNumber: "WO-2601",
    elapsedMinutes: 42,
    etaHandover: "Ready · 3:00 pm",
    progressPercent: 100,
  },
  {
    bay: "bay-3",
    state: "diagnostic",
    vehicle: "VW Amarok TDI · DF-47-PL",
    customer: "Glenn Roberts",
    technician: { name: "Talia Nguyen", role: "Diagnostics & Tune" },
    jobNumber: "WO-2607",
    elapsedMinutes: 31,
    etaHandover: "1:20 pm",
    progressPercent: 45,
  },
  {
    bay: "bay-4",
    state: "idle",
    technician: { name: "Jordy Petrovic", role: "Apprentice Y3" },
    elapsedMinutes: 0,
    progressPercent: 0,
  },
]

/* ------------------------------------------------------------------ *
 * Now-serving occupancy strip (bay-display contract)
 * ------------------------------------------------------------------ */

export const NOW_SERVING: ReadonlyArray<NowServingJob> = [
  { id: "ns-1", bay: "bay-1", vehicle: "Patrol Y62 3.5″ build", status: "in-bay" },
  { id: "ns-2", bay: "bay-2", vehicle: "i30 N cat-back", status: "ready" },
  { id: "ns-3", bay: "bay-3", vehicle: "Amarok DPF diagnostic", status: "diagnostic" },
  { id: "ns-4", bay: "bay-4", vehicle: "Ranger PX3 — booked 10:30", status: "waiting" },
]

/* ------------------------------------------------------------------ *
 * Next-up queue (workshop-floor-live contract)
 * ------------------------------------------------------------------ */

export const NEXT_UP: ReadonlyArray<NextUpEntry> = [
  {
    id: "nu-1",
    vehicle: "Ford Ranger PX3",
    customer: "Sam Whittaker",
    bookedAt: "10:30 am",
    bay: "bay-4",
    service: "3″ turbo-back + muffler",
    arrived: false,
  },
  {
    id: "nu-2",
    vehicle: "Mazda BT-50",
    customer: "Lucy Tran",
    bookedAt: "11:15 am",
    bay: "bay-4",
    service: "Centre + rear muffler",
    arrived: false,
  },
  {
    id: "nu-3",
    vehicle: "Toyota 79 Series",
    customer: "Barossa Earthworks",
    bookedAt: "12:00 pm",
    service: "Dump pipe + DPF delete (off-road)",
    arrived: true,
  },
  {
    id: "nu-4",
    vehicle: "Subaru WRX VA",
    customer: "Jaiden Cole",
    bookedAt: "1:30 pm",
    service: "Resonator delete + tune",
    arrived: false,
  },
]

/* ------------------------------------------------------------------ *
 * Crew shift timeline (workshop-ops contract)
 * ------------------------------------------------------------------ */

export const SHIFT_HOUR_TICKS: ReadonlyArray<number> = [7.5, 9, 10.5, 12, 13.5, 15, 17]

export const SHIFT_BLOCKS: ReadonlyArray<ShiftBlock> = [
  { id: "s-deano-1", mechanicId: "m-deano", kind: "shift", startHour: 7.5, durationHours: 4.5 },
  { id: "s-deano-l", mechanicId: "m-deano", kind: "lunch", startHour: 12, durationHours: 0.5 },
  { id: "s-deano-2", mechanicId: "m-deano", kind: "shift", startHour: 12.5, durationHours: 4.5 },
  { id: "s-rhys-1", mechanicId: "m-rhys", kind: "shift", startHour: 7.5, durationHours: 3 },
  { id: "s-rhys-b", mechanicId: "m-rhys", kind: "break", startHour: 10.5, durationHours: 0.25 },
  { id: "s-rhys-2", mechanicId: "m-rhys", kind: "shift", startHour: 10.75, durationHours: 6.25 },
  { id: "s-talia-1", mechanicId: "m-talia", kind: "shift", startHour: 9, durationHours: 3 },
  { id: "s-talia-t", mechanicId: "m-talia", kind: "training", startHour: 12, durationHours: 1.5, note: "Hilux scan-tool cert" },
  { id: "s-talia-2", mechanicId: "m-talia", kind: "shift", startHour: 13.5, durationHours: 3.5 },
  { id: "s-jordy-1", mechanicId: "m-jordy", kind: "shift", startHour: 7.5, durationHours: 5 },
  { id: "s-jordy-tafe", mechanicId: "m-jordy", kind: "leave", startHour: 12.5, durationHours: 4.5, note: "TAFE — Wollongong" },
]

/* ------------------------------------------------------------------ *
 * Featured service tickets (workshop-ops contract)
 * ------------------------------------------------------------------ */

export const FEATURED_TICKETS: ReadonlyArray<ServiceTicket> = [
  {
    id: "t-2604",
    number: "WO-2604",
    customerName: "Marko Aleksic",
    vehicleLabel: "2019 Nissan Patrol Y62 Ti-L",
    rego: "CV-21-RT",
    vin: "JN1TANY62U0123456",
    mileageKm: 84200,
    bayId: "bay-1",
    mechanicId: "m-deano",
    status: "in-progress",
    priority: "vip",
    loggedAt: "8:05 am",
    etaLabel: "12:40 pm",
    totalAud: 3480,
    services: [
      { id: "sv-1", label: "Fabricate 3.5″ mandrel mid-section", hours: 2.5, done: true },
      { id: "sv-2", label: "Fit twin 4″ angle-cut tips", hours: 1, done: false },
      { id: "sv-3", label: "Hanger alignment + leak test", hours: 0.5, done: false },
    ],
  },
  {
    id: "t-2607",
    number: "WO-2607",
    customerName: "Glenn Roberts",
    vehicleLabel: "2021 VW Amarok V6 TDI550",
    rego: "DF-47-PL",
    vin: "WV1ZZZ2HZMA098765",
    mileageKm: 121640,
    bayId: "bay-3",
    mechanicId: "m-talia",
    status: "diagnosed",
    priority: "rush",
    loggedAt: "8:50 am",
    etaLabel: "1:20 pm",
    totalAud: 690,
    services: [
      { id: "sv-4", label: "Forced DPF regen + soot read", hours: 1, done: true },
      { id: "sv-5", label: "EGT sensor diagnostic", hours: 0.75, done: true },
      { id: "sv-6", label: "Road-test + clear codes", hours: 0.5, done: false },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Quote pipeline detail (workshop-ops QuoteBuilderRow contract)
 * ------------------------------------------------------------------ */

export const FEATURED_QUOTE: ReadonlyArray<QuoteRow> = [
  {
    id: "q-1",
    kind: "part",
    label: "Manta 3″ cat-back system — Colorado RG",
    quantity: 1,
    unitAud: 880,
    markupPct: 28,
    notes: "Raw 409 stainless, twin rear exit",
  },
  {
    id: "q-2",
    kind: "part",
    label: "Hi-flow metallic cat converter",
    quantity: 1,
    unitAud: 240,
    markupPct: 30,
  },
  {
    id: "q-3",
    kind: "labour",
    label: "Remove & fit, hanger fab, leak test",
    quantity: 1,
    unitAud: 528,
    hours: 4,
    ratePerHourAud: 132,
  },
  {
    id: "q-4",
    kind: "fee",
    label: "Workshop consumables & disposal",
    quantity: 1,
    unitAud: 45,
  },
]

/* ------------------------------------------------------------------ *
 * Live revenue pulse (workshop-floor-live contract)
 * ------------------------------------------------------------------ */

export const REVENUE_TODAY_AUD = 9840
export const REVENUE_YESTERDAY_AUD = 8620
export const JOBS_COMPLETED = 7
export const REVENUE_TREND: ReadonlyArray<number> = [
  0, 420, 980, 1860, 3120, 4480, 5990, 7240, 8810, 9840,
]

/* ------------------------------------------------------------------ *
 * Status badge legend (data-display contract)
 * ------------------------------------------------------------------ */

export const STATUS_LEGEND: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "brand", label: "In bay" },
  { tone: "info", label: "Booked" },
  { tone: "warn", label: "Awaiting parts" },
  { tone: "neutral", label: "Quote sent" },
  { tone: "success", label: "Ready" },
  { tone: "error", label: "Blocked" },
]

/* ------------------------------------------------------------------ *
 * Floor KPIs (rendered via bespoke chrome — figures use tabular-nums)
 * ------------------------------------------------------------------ */

export interface FloorKpi {
  id: string
  label: string
  value: string
  hint: string
  tone: "red" | "amber" | "teal" | "green"
}

export const FLOOR_KPIS: ReadonlyArray<FloorKpi> = [
  { id: "kpi-bays", label: "Bays running", value: "3 / 6", hint: "Bay 4 free at 10:30", tone: "red" },
  { id: "kpi-jobs", label: "Jobs on board", value: "14", hint: "5 quoted · 2 booked", tone: "amber" },
  { id: "kpi-crew", label: "Crew on shift", value: "3 / 4", hint: "Jordy at TAFE pm", tone: "teal" },
  { id: "kpi-queue", label: "Next intake", value: "10:30 am", hint: "Ranger PX3 — Bay 4", tone: "green" },
]
