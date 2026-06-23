/**
 * Demo data for the Owner business command centre screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) fixtures: today's bookings,
 * revenue, social/SEO posture, and the Torque assistant activity feed. All copy
 * is production-ready marketing/operations language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is "Torque". The legacy
 * internal codename is never surfaced in any string below.
 */

import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { AreaSeries } from "../../components/charts/area-chart"
import type { BarSeries } from "../../components/charts/bar-chart"
import type { DonutSegment } from "../../components/charts/donut-chart"

/** A headline KPI tile with a trend sparkline. */
export interface OwnerKpi {
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
export interface TodayJob {
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

/** A marketing/SEO channel health row. */
export interface ChannelStatus {
  id: string
  channel: string
  detail: string
  level: 0 | 1 | 2 | 3 | 4 | 5
  tone: "red" | "amber" | "teal" | "green"
}

/** A single quick action the owner can fire at Torque. */
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

export const OWNER_KPIS: ReadonlyArray<OwnerKpi> = [
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
    id: "jobs",
    label: "Jobs on the board",
    value: "14",
    unit: "in bays",
    meta: "3 awaiting parts",
    delta: { label: "2 over capacity", direction: "up" },
    spark: [9, 11, 10, 13, 12, 15, 14],
    sparkTone: "amber",
  },
  {
    id: "bookings",
    label: "Bookings this week",
    value: "38",
    unit: "confirmed",
    meta: "6 still to call back",
    delta: { label: "12% vs last wk", direction: "up" },
    spark: [22, 26, 25, 30, 33, 35, 38],
    sparkTone: "teal",
  },
  {
    id: "rating",
    label: "Google rating",
    value: "4.9",
    unit: "/ 5",
    meta: "312 reviews · 4 new",
    delta: { label: "+8 reviews / 30d", direction: "up" },
    spark: [4.7, 4.7, 4.8, 4.8, 4.8, 4.9, 4.9],
    sparkTone: "amber",
  },
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

/** 8-week booking-source trend (stacked area). */
export const BOOKING_TREND: ReadonlyArray<AreaSeries> = [
  {
    label: "Google / search",
    tone: "teal",
    values: [14, 16, 15, 19, 21, 20, 24, 26],
  },
  {
    label: "Repeat & referral",
    tone: "green",
    values: [9, 10, 11, 10, 12, 13, 12, 14],
  },
  {
    label: "Social / Mufflerpulse",
    tone: "amber",
    values: [3, 4, 5, 6, 5, 7, 8, 9],
  },
]

export const BOOKING_WEEKS: ReadonlyArray<string> = [
  "W1",
  "W2",
  "W3",
  "W4",
  "W5",
  "W6",
  "W7",
  "W8",
]

/** Where this week's leads came from (donut). */
export const LEAD_MIX: ReadonlyArray<DonutSegment> = [
  { label: "Google Business", value: 46, tone: "teal" },
  { label: "Repeat customers", value: 28, tone: "green" },
  { label: "Social posts", value: 16, tone: "amber" },
  { label: "Walk-in & phone", value: 10, tone: "red" },
]

export const TODAY_JOBS: ReadonlyArray<TodayJob> = [
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
    service: "Twin 2.5\" + extractors",
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
    service: "3\" mandrel exhaust",
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
]

export const CHANNELS: ReadonlyArray<ChannelStatus> = [
  {
    id: "gbp",
    channel: "Google Business Profile",
    detail: "Indexed · 4 new reviews · posts current",
    level: 5,
    tone: "green",
  },
  {
    id: "seo",
    channel: "Local SEO — Oak Flats exhaust",
    detail: "Ranking #1 · 3 new backlinks this week",
    level: 4,
    tone: "teal",
  },
  {
    id: "social",
    channel: "Mufflerpulse social",
    detail: "5 posts queued · Reel due 3pm",
    level: 4,
    tone: "amber",
  },
  {
    id: "site",
    channel: "Website health",
    detail: "Core Web Vitals green · uptime 99.98%",
    level: 5,
    tone: "green",
  },
  {
    id: "facebook",
    channel: "Facebook page",
    detail: "Reach down 12% · boost the Raptor reel",
    level: 2,
    tone: "red",
  },
]

export const QUICK_ACTIONS: ReadonlyArray<QuickAction> = [
  {
    id: "quote",
    title: "Draft a quote",
    hint: "Cat-back, extractors, full system",
    glyph: "$",
    tone: "red",
  },
  {
    id: "post",
    title: "Schedule a post",
    hint: "Push today's Raptor build to socials",
    glyph: "◷",
    tone: "amber",
  },
  {
    id: "callback",
    title: "Clear the call-backs",
    hint: "6 leads waiting on a reply",
    glyph: "☏",
    tone: "teal",
  },
  {
    id: "report",
    title: "Weekly owner report",
    hint: "Revenue, bookings, reviews, SEO",
    glyph: "▥",
    tone: "green",
  },
]

export const TORQUE_ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-1",
    title: "Replied to a Google review from “Kel R.”",
    description:
      "Thanked her for the 5-star on the Hilux DPF-back job and invited her back for the next logbook service.",
    timestamp: "6 min ago",
    tone: "success",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-2",
    title: "Drafted a quote for the Patrol Y62 3″ mandrel exhaust",
    description: "Sent to Frank P. for approval — $2,980, two-day turnaround, parts in stock.",
    timestamp: "24 min ago",
    tone: "info",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-3",
    title: "Queued the Ranger Raptor build reel for Mufflerpulse",
    description: "Scheduled 3:00pm to Instagram + Facebook with #IllawarraExhaust tags.",
    timestamp: "1 hr ago",
    tone: "info",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-4",
    title: "Flagged low stock: 2.5″ mandrel bends",
    description: "Down to 4 — reorder raised with the supplier portal to keep Bay 3 moving.",
    timestamp: "2 hr ago",
    tone: "warn",
    actor: { name: "Torque assistant" },
  },
  {
    id: "act-5",
    title: "Published the “Commodore VE twin system” service page",
    description: "Live on the site, submitted to Google, internal links added from the Holden hub.",
    timestamp: "Today, 7:42am",
    tone: "success",
    actor: { name: "Torque assistant" },
  },
]
