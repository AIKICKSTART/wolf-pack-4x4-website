/**
 * Demo data for the Workshop manager home screen ("workshop-dashboard").
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) fixtures for the workshop
 * manager cockpit: today's jobs across the bays, bay occupancy, revenue split,
 * the technician roster, the quote pipeline snapshot, and the manager-facing
 * Torque activity feed. All copy is production-ready operations/marketing
 * language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque". The
 * legacy internal codename is never surfaced in any string below.
 */

import type { AreaSeries } from "../../components/charts/area-chart"
import type { BarSeries } from "../../components/charts/bar-chart"
import type { DonutSegment } from "../../components/charts/donut-chart"
import type { GaugeClusterDatum } from "../../components/charts/gauge-cluster"
import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { MediaTrayItem } from "../../components/data-display/media-tray"

/** A headline manager KPI tile with a trend sparkline. */
export interface ManagerKpi {
  id: string
  label: string
  value: string
  unit?: string
  meta: string
  delta: { label: string; direction: "up" | "down" | "flat" }
  spark: number[]
  sparkTone: "red" | "amber" | "teal" | "green"
}

/** A single scheduled job on today's board. */
export interface ManagerJob {
  id: string
  time: string
  vehicle: string
  rego: string
  service: string
  bay: string
  tech: string
  status: "In bay" | "Booked" | "Awaiting parts" | "Quote sent" | "Ready"
  value: string
}

/** A roster row for the technician roster table. */
export interface RosterRow {
  id: string
  name: string
  trade: string
  bay: string
  shift: string
  load: 0 | 1 | 2 | 3 | 4 | 5
  loadTone: "red" | "amber" | "teal" | "green"
  jobs: string
  status: "On the tools" | "On break" | "Quoting" | "Off today"
}

/** A single quick action the manager can fire at Torque. */
export interface QuickAction {
  id: string
  title: string
  hint: string
  glyph: string
  tone: "red" | "amber" | "teal" | "green"
}

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const TODAY_LABEL = "Friday 29 May 2026"

export const MANAGER_KPIS: ReadonlyArray<ManagerKpi> = [
  {
    id: "jobs",
    label: "Jobs today",
    value: "14",
    unit: "on the board",
    meta: "6 in bays · 3 awaiting parts",
    delta: { label: "2 over a normal Fri", direction: "up" },
    spark: [9, 11, 10, 13, 12, 15, 14],
    sparkTone: "red",
  },
  {
    id: "occupancy",
    label: "Bay occupancy",
    value: "88",
    unit: "%",
    meta: "6 of 7 bays + 2 hoists live",
    delta: { label: "Near capacity", direction: "up" },
    spark: [62, 71, 68, 80, 84, 90, 88],
    sparkTone: "amber",
  },
  {
    id: "revenue",
    label: "Revenue today",
    value: "$7,480",
    meta: "11 invoices settled",
    delta: { label: "18% vs avg Fri", direction: "up" },
    spark: [3200, 4100, 3850, 5200, 4800, 6100, 7480],
    sparkTone: "green",
  },
  {
    id: "techs",
    label: "Technicians on",
    value: "5",
    unit: "of 6",
    meta: "Sticks finishing at 2pm",
    delta: { label: "Fully crewed", direction: "flat" },
    spark: [4, 5, 5, 6, 5, 6, 5],
    sparkTone: "teal",
  },
]

/**
 * Bay occupancy gauge cluster — exactly three radial gauges.
 *
 * TS note (dev-only): GaugeCluster types `gauges` as a MUTABLE readonly 3-tuple.
 * The page spreads `[...BAY_GAUGES]` into a fresh 3-tuple at the call site, so
 * this stays a plain typed tuple here (no `as const`, which would yield a
 * deeply-readonly tuple and trip TS4104 against the mutable element type).
 */
export const BAY_GAUGES: readonly [
  GaugeClusterDatum,
  GaugeClusterDatum,
  GaugeClusterDatum,
] = [
  { label: "Bays", value: 88, max: 100, unit: "%", tone: "red" },
  { label: "Hoists", value: 75, max: 100, unit: "%", tone: "amber" },
  { label: "Dyno", value: 40, max: 100, unit: "%", tone: "teal" },
]

/** 7-day revenue split by exhaust work vs general servicing (stacked bars). */
export const REVENUE_BARS: ReadonlyArray<BarSeries> = [
  {
    label: "Exhaust & fabrication",
    tone: "red",
    values: [3100, 2800, 3600, 4200, 5100, 4400, 4900],
  },
  {
    label: "Servicing & rego",
    tone: "teal",
    values: [1800, 2100, 1900, 2300, 2600, 2200, 2580],
  },
]

export const REVENUE_DAYS: ReadonlyArray<string> = [
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
]

/** 8-week throughput trend (jobs completed), split by work type (stacked area). */
export const THROUGHPUT_TREND: ReadonlyArray<AreaSeries> = [
  {
    label: "Exhaust & fabrication",
    tone: "red",
    values: [38, 41, 39, 44, 46, 45, 49, 52],
  },
  {
    label: "Servicing & rego",
    tone: "teal",
    values: [26, 28, 27, 30, 31, 30, 33, 35],
  },
]

export const THROUGHPUT_WEEKS: ReadonlyArray<string> = [
  "W1",
  "W2",
  "W3",
  "W4",
  "W5",
  "W6",
  "W7",
  "W8",
]

/** Quote pipeline by stage (donut). */
export const QUOTE_PIPELINE: ReadonlyArray<DonutSegment> = [
  { label: "Sent · awaiting", value: 9, tone: "amber" },
  { label: "Accepted · to book", value: 6, tone: "green" },
  { label: "In draft", value: 4, tone: "teal" },
  { label: "Declined / cold", value: 3, tone: "red" },
]

export const TODAY_JOBS: ReadonlyArray<ManagerJob> = [
  {
    id: "J-4821",
    time: "08:00",
    vehicle: "Ford Ranger Raptor",
    rego: "DXR-42P",
    service: "Cat-back system + tune",
    bay: "Bay 1",
    tech: "Macca",
    status: "In bay",
    value: "$2,450",
  },
  {
    id: "J-4822",
    time: "09:30",
    vehicle: "Toyota Hilux 2.8L",
    rego: "CKL-118",
    service: "DPF-back, volume-legal",
    bay: "Bay 2",
    tech: "Davo",
    status: "In bay",
    value: "$1,890",
  },
  {
    id: "J-4823",
    time: "10:15",
    vehicle: "Holden Commodore VE",
    rego: "BNH-907",
    service: 'Twin 2.5" + extractors',
    bay: "Bay 3",
    tech: "Sticks",
    status: "Awaiting parts",
    value: "$3,120",
  },
  {
    id: "J-4824",
    time: "11:00",
    vehicle: "Subaru WRX",
    rego: "EQT-330",
    service: "Resonator delete + weld",
    bay: "Hoist 2",
    tech: "Macca",
    status: "Booked",
    value: "$640",
  },
  {
    id: "J-4825",
    time: "13:30",
    vehicle: "Nissan Patrol Y62",
    rego: "FZP-201",
    service: '3" mandrel exhaust',
    bay: "Bay 1",
    tech: "Davo",
    status: "Quote sent",
    value: "$2,980",
  },
  {
    id: "J-4826",
    time: "14:45",
    vehicle: "Mazda BT-50",
    rego: "GKR-556",
    service: "Logbook service + muffler",
    bay: "Bay 2",
    tech: "Sticks",
    status: "Ready",
    value: "$780",
  },
  {
    id: "J-4827",
    time: "15:30",
    vehicle: "VW Amarok V6",
    rego: "HLN-714",
    service: "Hi-flow cat + pipework",
    bay: "Hoist 1",
    tech: "Browny",
    status: "Booked",
    value: "$1,420",
  },
]

export const ROSTER: ReadonlyArray<RosterRow> = [
  {
    id: "tech-macca",
    name: "Macca",
    trade: "Exhaust fabricator",
    bay: "Bay 1 · Hoist 2",
    shift: "7:30a – 4:00p",
    load: 5,
    loadTone: "red",
    jobs: "2 live · 1 booked",
    status: "On the tools",
  },
  {
    id: "tech-davo",
    name: "Davo",
    trade: "Lead technician",
    bay: "Bay 2",
    shift: "7:30a – 4:00p",
    load: 4,
    loadTone: "amber",
    jobs: "2 live",
    status: "On the tools",
  },
  {
    id: "tech-sticks",
    name: "Sticks",
    trade: "Welder / fabricator",
    bay: "Bay 3",
    shift: "6:30a – 2:00p",
    load: 4,
    loadTone: "amber",
    jobs: "1 live · waiting on parts",
    status: "Quoting",
  },
  {
    id: "tech-browny",
    name: "Browny",
    trade: "Service technician",
    bay: "Hoist 1",
    shift: "8:00a – 4:30p",
    load: 2,
    loadTone: "teal",
    jobs: "1 booked 3:30p",
    status: "On break",
  },
  {
    id: "tech-kel",
    name: "Kel",
    trade: "Apprentice (3rd yr)",
    bay: "Floating",
    shift: "8:00a – 4:30p",
    load: 3,
    loadTone: "teal",
    jobs: "Assisting Bay 1",
    status: "On the tools",
  },
  {
    id: "tech-pricey",
    name: "Pricey",
    trade: "Service technician",
    bay: "—",
    shift: "Rostered off",
    load: 0,
    loadTone: "green",
    jobs: "Back Monday",
    status: "Off today",
  },
]

export const QUICK_ACTIONS: ReadonlyArray<QuickAction> = [
  {
    id: "assign",
    title: "Assign the next job",
    hint: "Amarok hi-flow cat → free hoist",
    glyph: "⤿",
    tone: "red",
  },
  {
    id: "parts",
    title: "Chase the parts order",
    hint: 'Bay 3 waiting on 2.5" bends',
    glyph: "▤",
    tone: "amber",
  },
  {
    id: "quote",
    title: "Send the open quotes",
    hint: "4 drafts ready to fire out",
    glyph: "$",
    tone: "teal",
  },
  {
    id: "handover",
    title: "Print the handover sheet",
    hint: "Ready jobs for front desk",
    glyph: "▥",
    tone: "green",
  },
]

/** Recent completed builds for the media tray — real brand imagery. */
export const RECENT_BUILDS: ReadonlyArray<MediaTrayItem> = [
  {
    id: "build-raptor",
    title: "Ranger Raptor cat-back",
    meta: "Bay 1 · Macca · today",
    tag: "In bay",
    src: "/media/generated/ford-ranger-raptor-exhaust-closeup.webp",
  },
  {
    id: "build-gts",
    title: "HSV GTS twin system",
    meta: "Bay 3 · Sticks · Tue",
    tag: "Delivered",
    src: "/media/generated/featured-hsv-gts-twin-system.webp",
  },
  {
    id: "build-falcon",
    title: 'Falcon XC Cobra 2.5" duals',
    meta: "Fabrication · Macca · Mon",
    tag: "Delivered",
    src: "/media/generated/falcon-xc-cobra-exhaust-closeup.webp",
  },
  {
    id: "build-fpv",
    title: "FPV GT-F custom pipework",
    meta: "Hoist 2 · Davo · last wk",
    tag: "Delivered",
    src: "/media/generated/fpv-gt-f-exhaust-closeup.webp",
  },
]

export const TORQUE_ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-1",
    title: "Reassigned the Amarok hi-flow cat to Hoist 1",
    description:
      "Browny is free from 3:00pm — moved the booking off Bay 2 so Davo can finish the Hilux DPF-back without a backlog.",
    timestamp: "4 min ago",
    tone: "success",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-2",
    title: 'Flagged Bay 3 stalled: waiting on 2.5" mandrel bends',
    description:
      "Commodore VE extractors are on hold. Reorder raised with the supplier portal — ETA tomorrow 9am, Sticks moved onto quoting in the meantime.",
    timestamp: "21 min ago",
    tone: "warn",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-3",
    title: "Drafted the Patrol Y62 3″ mandrel quote",
    description: "Sent to Frank P. for approval — $2,980, two-day turnaround, parts in stock.",
    timestamp: "38 min ago",
    tone: "info",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-4",
    title: "Marked the Mazda BT-50 ready for pickup",
    description: "Logbook service + muffler signed off by Sticks. SMS sent to the customer, invoice queued at front desk.",
    timestamp: "1 hr ago",
    tone: "success",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-5",
    title: "Built tomorrow's run sheet across all bays",
    description:
      "Nine jobs balanced against the roster — Pricey is off, so two services shifted to Browny and the apprentice.",
    timestamp: "Today, 7:48am",
    tone: "info",
    actor: { name: "Torque assistant" },
  },
]
