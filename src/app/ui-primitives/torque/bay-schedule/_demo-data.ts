/**
 * Demo data for the Bay schedule & calendar screen ("bay-schedule").
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) fixtures for the Workshop Pro
 * service-bay scheduler: a week of bay reservations as tone-coloured job blocks,
 * the four-bay floor, the technician lane, today's hour-by-hour bay occupancy,
 * scheduling conflicts and the waiting-list. All copy is production-ready
 * exhaust / servicing operations language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque". The
 * legacy internal codename is never surfaced in any string below.
 */

import type { WeekEvent } from "../../components/calendar/calendar-week-view"
import type { BayRow } from "../../components/calendar/availability-grid"
import type { MediaTrayItem } from "../../components/data-display/media-tray"
import type {
  FloorPlanBay,
  FloorPlanTechnician,
} from "../../components/workshop-floor-live/workshop-floor-plan"
import type { NextUpEntry } from "../../components/workshop-floor-live/next-up-queue"
import type {
  BayId,
  BayLiveState,
  TechLocation,
} from "../../components/workshop-floor-live/workshop-floor-types"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"

/**
 * Fixed reference "today" so the demo is deterministic across SSR/CSR and
 * theme toggles. Thursday 28 May 2026 — mid-week, every bay busy.
 */
export const TODAY = new Date(2026, 4, 28, 11, 18)
export const WEEK_REFERENCE = TODAY
export const TODAY_LABEL = "Thursday 28 May 2026"

/** First / last visible hour for the week grid + today's occupancy strip. */
export const DAY_START_HOUR = 7
export const DAY_END_HOUR = 18

/** A bay reservation block placed in the week calendar. */
export interface BayBooking {
  id: string
  bay: BayId
  /** Day offset from the Monday at the start of the visible week (0 = Mon). */
  dayOffset: number
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  vehicle: string
  service: string
  tone: WeekEvent["tone"]
  /** Set when this booking overlaps another in the same bay. */
  conflict?: boolean
}

const MONDAY = (() => {
  const d = new Date(TODAY)
  const day = d.getDay()
  const diff = (day + 6) % 7 // days since Monday
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
})()

function bookingDate(dayOffset: number, hour: number, minute: number): Date {
  const d = new Date(MONDAY)
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d
}

/**
 * The week's bay reservations. Each block carries the bay it belongs to so the
 * sub-line reads "Bay N · service" inside the week-grid event chip.
 */
export const BAY_BOOKINGS: ReadonlyArray<BayBooking> = [
  // ---- Monday ----
  {
    id: "bk-mon-1",
    bay: "bay-1",
    dayOffset: 0,
    startHour: 8,
    startMinute: 0,
    endHour: 11,
    endMinute: 0,
    vehicle: "Ranger Raptor",
    service: "Cat-back + tune",
    tone: "red",
  },
  {
    id: "bk-mon-2",
    bay: "bay-2",
    dayOffset: 0,
    startHour: 9,
    startMinute: 30,
    endHour: 12,
    endMinute: 0,
    vehicle: "Hilux 2.8",
    service: "DPF-back system",
    tone: "amber",
  },
  {
    id: "bk-mon-3",
    bay: "bay-3",
    dayOffset: 0,
    startHour: 13,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    vehicle: "Commodore VE",
    service: 'Twin 2.5" + extractors',
    tone: "red",
  },
  {
    id: "bk-mon-4",
    bay: "bay-4",
    dayOffset: 0,
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    vehicle: "BT-50",
    service: "Logbook service",
    tone: "teal",
  },
  // ---- Tuesday ----
  {
    id: "bk-tue-1",
    bay: "bay-1",
    dayOffset: 1,
    startHour: 8,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    vehicle: "WRX STI",
    service: "Turbo-back + dump",
    tone: "red",
  },
  {
    id: "bk-tue-2",
    bay: "bay-1",
    dayOffset: 1,
    startHour: 10,
    startMinute: 30,
    endHour: 13,
    endMinute: 0,
    vehicle: "Patrol Y62",
    service: '3" mandrel exhaust',
    tone: "amber",
  },
  {
    id: "bk-tue-3",
    bay: "bay-2",
    dayOffset: 1,
    startHour: 9,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    vehicle: "Amarok V6",
    service: "Hi-flow cat + pipework",
    tone: "amber",
  },
  {
    id: "bk-tue-4",
    bay: "bay-4",
    dayOffset: 1,
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    vehicle: "200 Series",
    service: "Dyno tune · power run",
    tone: "green",
  },
  // ---- Wednesday ----
  {
    id: "bk-wed-1",
    bay: "bay-1",
    dayOffset: 2,
    startHour: 8,
    startMinute: 30,
    endHour: 12,
    endMinute: 0,
    vehicle: "Falcon XC",
    service: 'Cobra 2.5" duals',
    tone: "red",
  },
  {
    id: "bk-wed-2",
    bay: "bay-3",
    dayOffset: 2,
    startHour: 9,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    vehicle: "FPV GT-F",
    service: "Custom fabrication",
    tone: "red",
  },
  {
    id: "bk-wed-3",
    bay: "bay-2",
    dayOffset: 2,
    startHour: 14,
    startMinute: 30,
    endHour: 16,
    endMinute: 0,
    vehicle: "Mazda 3",
    service: "Resonator delete",
    tone: "teal",
  },
  // ---- Thursday (today) ----
  {
    id: "bk-thu-1",
    bay: "bay-1",
    dayOffset: 3,
    startHour: 8,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    vehicle: "Ranger Raptor",
    service: "Cat-back + tune",
    tone: "red",
  },
  {
    id: "bk-thu-2",
    bay: "bay-2",
    dayOffset: 3,
    startHour: 9,
    startMinute: 30,
    endHour: 12,
    endMinute: 30,
    vehicle: "Hilux 2.8",
    service: "DPF-back, volume-legal",
    tone: "amber",
  },
  {
    id: "bk-thu-3",
    bay: "bay-3",
    dayOffset: 3,
    startHour: 10,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    vehicle: "Commodore VE",
    service: 'Twin 2.5" — held on parts',
    tone: "red",
  },
  {
    id: "bk-thu-4",
    bay: "bay-4",
    dayOffset: 3,
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    vehicle: "200 Series",
    service: "Dyno tune · power run",
    tone: "green",
  },
  // Thursday conflict: a walk-in double-booked onto Bay 4's dyno slot.
  {
    id: "bk-thu-5",
    bay: "bay-4",
    dayOffset: 3,
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    vehicle: "Golf R (walk-in)",
    service: "⚠ Clash · dyno booked",
    tone: "neutral",
    conflict: true,
  },
  // ---- Friday ----
  {
    id: "bk-fri-1",
    bay: "bay-1",
    dayOffset: 4,
    startHour: 8,
    startMinute: 0,
    endHour: 10,
    endMinute: 30,
    vehicle: "Navara NP300",
    service: "Muffler + tailpipe",
    tone: "teal",
  },
  {
    id: "bk-fri-2",
    bay: "bay-2",
    dayOffset: 4,
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    vehicle: "Territory SZ",
    service: "Full system + cat",
    tone: "amber",
  },
  {
    id: "bk-fri-3",
    bay: "bay-3",
    dayOffset: 4,
    startHour: 11,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    vehicle: "HSV GTS",
    service: "Twin 3\" + headers",
    tone: "red",
  },
  {
    id: "bk-fri-4",
    bay: "bay-4",
    dayOffset: 4,
    startHour: 8,
    startMinute: 30,
    endHour: 10,
    endMinute: 0,
    vehicle: "Corolla ZR",
    service: "Logbook service",
    tone: "teal",
  },
]

/** Bay reservations mapped to week-grid events (one block per booking). */
export const WEEK_EVENTS: ReadonlyArray<WeekEvent> = BAY_BOOKINGS.map(
  (booking) => ({
    id: booking.id,
    start: bookingDate(booking.dayOffset, booking.startHour, booking.startMinute),
    end: bookingDate(booking.dayOffset, booking.endHour, booking.endMinute),
    title: booking.vehicle,
    tone: booking.tone,
    sub: `Bay ${booking.bay.slice(-1)} · ${booking.service}`,
  }),
)

/** Headline week-posture stat chips for the scheduler band. */
export interface ScheduleStat {
  id: string
  label: string
  value: string
  tone: "red" | "amber" | "teal" | "green"
}

export const WEEK_STATS: ReadonlyArray<ScheduleStat> = [
  { id: "booked", label: "Booked this week", value: "23", tone: "red" },
  { id: "utilisation", label: "Bay utilisation", value: "82%", tone: "amber" },
  { id: "open", label: "Open slots", value: "9", tone: "teal" },
  { id: "conflicts", label: "Conflicts to clear", value: "1", tone: "red" },
]

/**
 * Today's per-bay occupancy across the 7am–6pm workshop day, one state per
 * visible hour. Drives the AvailabilityGrid "today's timeline".
 */
export const TODAY_BAYS: ReadonlyArray<BayRow> = [
  {
    id: "bay-1",
    label: "Bay 1 · Fabrication",
    hours: [
      "free",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
      "free",
      "busy",
      "busy",
      "free",
      "free",
    ],
  },
  {
    id: "bay-2",
    label: "Bay 2 · Systems",
    hours: [
      "free",
      "free",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
      "free",
      "busy",
      "busy",
      "free",
    ],
  },
  {
    id: "bay-3",
    label: "Bay 3 · Welding",
    hours: [
      "free",
      "free",
      "free",
      "blocked",
      "blocked",
      "blocked",
      "blocked",
      "blocked",
      "free",
      "free",
      "free",
    ],
  },
  {
    id: "bay-4",
    label: "Bay 4 · Dyno cell",
    hours: [
      "maintenance",
      "free",
      "free",
      "free",
      "free",
      "free",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
    ],
  },
]

/** Per-bay live lane card (today). */
export interface BayLane {
  bay: BayId
  state: BayLiveState
  vehicle: string
  customer: string
  technician: { name: string; role: string }
  jobNumber: string
  elapsedMinutes: number
  etaHandover: string
  progressPercent: number
}

export const BAY_LANES: ReadonlyArray<BayLane> = [
  {
    bay: "bay-1",
    state: "in-progress",
    vehicle: "Ford Ranger Raptor · DXR-42P",
    customer: "Mitch C.",
    technician: { name: "Macca", role: "Exhaust fabricator" },
    jobNumber: "WS-2805-11",
    elapsedMinutes: 198,
    etaHandover: "11:30 am",
    progressPercent: 78,
  },
  {
    bay: "bay-2",
    state: "diagnostic",
    vehicle: "Toyota Hilux 2.8L · CKL-118",
    customer: "Sandra P.",
    technician: { name: "Davo", role: "Lead technician" },
    jobNumber: "WS-2805-12",
    elapsedMinutes: 96,
    etaHandover: "12:30 pm",
    progressPercent: 45,
  },
  {
    bay: "bay-3",
    state: "blocked",
    vehicle: "Holden Commodore VE · BNH-907",
    customer: "Frank P.",
    technician: { name: "Sticks", role: "Welder / fabricator" },
    jobNumber: "WS-2805-13",
    elapsedMinutes: 72,
    etaHandover: "Held — parts",
    progressPercent: 30,
  },
  {
    bay: "bay-4",
    state: "dyno-running",
    vehicle: "LandCruiser 200 Series · LCX-200",
    customer: "Performance build",
    technician: { name: "Browny", role: "Tuner / service tech" },
    jobNumber: "WS-2805-14",
    elapsedMinutes: 24,
    etaHandover: "5:00 pm",
    progressPercent: 22,
  },
]

/** Floor-plan bays (top-down 4-bay floor). */
export const FLOOR_BAYS: ReadonlyArray<FloorPlanBay> = [
  { bay: "bay-1", state: "in-progress", label: "Raptor cat-back" },
  { bay: "bay-2", state: "diagnostic", label: "Hilux DPF-back" },
  { bay: "bay-3", state: "blocked", label: "VE — held" },
  { bay: "bay-4", state: "dyno-running", label: "200 Series tune" },
]

/** Technicians positioned on the floor. */
export const FLOOR_TECHS: ReadonlyArray<FloorPlanTechnician> = [
  { id: "t-macca", name: "Macca", location: "bay-1" },
  { id: "t-davo", name: "Davo", location: "bay-2" },
  { id: "t-sticks", name: "Sticks", location: "parts" },
  { id: "t-browny", name: "Browny", location: "dyno" },
  { id: "t-kel", name: "Kel", location: "bay-1" },
]

/** Technician lane (who's on, where, doing what). */
export interface TechLaneEntry {
  id: string
  name: string
  role: string
  location: TechLocation
  doing: string
  online: boolean
}

export const TECH_LANE: ReadonlyArray<TechLaneEntry> = [
  {
    id: "t-macca",
    name: "Macca",
    role: "Exhaust fabricator",
    location: "bay-1",
    doing: "Welding Raptor Y-pipe",
    online: true,
  },
  {
    id: "t-davo",
    name: "Davo",
    role: "Lead technician",
    location: "bay-2",
    doing: "Scoping Hilux DPF-back",
    online: true,
  },
  {
    id: "t-sticks",
    name: "Sticks",
    role: "Welder / fabricator",
    location: "parts",
    doing: "Chasing 2.5\" bends",
    online: true,
  },
  {
    id: "t-browny",
    name: "Browny",
    role: "Tuner / service tech",
    location: "dyno",
    doing: "200 Series power run",
    online: true,
  },
  {
    id: "t-kel",
    name: "Kel",
    role: "Apprentice (3rd yr)",
    location: "bay-1",
    doing: "Assisting Bay 1",
    online: true,
  },
  {
    id: "t-pricey",
    name: "Pricey",
    role: "Service technician",
    location: "off-floor",
    doing: "Rostered off — back Mon",
    online: false,
  },
]

/** Waiting list — what's coming into the bays next. */
export const NEXT_UP: ReadonlyArray<NextUpEntry> = [
  {
    id: "nu-1",
    vehicle: "VW Amarok V6",
    customer: "Dale R.",
    bookedAt: "11:45 am",
    bay: "bay-1",
    service: "Hi-flow cat + pipework",
    arrived: true,
  },
  {
    id: "nu-2",
    vehicle: "Nissan Patrol Y62",
    customer: "Frank P.",
    bookedAt: "1:30 pm",
    bay: "bay-1",
    service: '3" mandrel exhaust',
    arrived: false,
  },
  {
    id: "nu-3",
    vehicle: "Mazda BT-50",
    customer: "Karen W.",
    bookedAt: "2:45 pm",
    bay: "bay-2",
    service: "Logbook service + muffler",
    arrived: false,
  },
  {
    id: "nu-4",
    vehicle: "Subaru WRX",
    customer: "Josh T.",
    bookedAt: "3:30 pm",
    service: "Resonator delete + weld",
    arrived: false,
  },
]

/** A flagged scheduling conflict surfaced to the owner. */
export interface ScheduleConflict {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  bayLabel: string
  tone: "red" | "amber"
}

export const CONFLICTS: ReadonlyArray<ScheduleConflict> = [
  {
    id: "cf-1",
    title: "Bay 4 double-booked",
    description:
      "A Golf R walk-in is sitting on top of the 200 Series dyno run. Bump it to Bay 2 at 3:30pm or hold for tomorrow morning.",
    start: bookingDate(3, 14, 0),
    end: bookingDate(3, 15, 0),
    bayLabel: "Bay 4 · Dyno cell",
    tone: "red",
  },
  {
    id: "cf-2",
    title: "Bay 3 parts hold",
    description:
      'Commodore VE twin 2.5" is stalled waiting on mandrel bends. Reorder is in — slot won\'t clear before 3pm.',
    start: bookingDate(3, 10, 0),
    end: bookingDate(3, 15, 0),
    bayLabel: "Bay 3 · Welding",
    tone: "amber",
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
    meta: "Bay 3 · Davo · last wk",
    tag: "Delivered",
    src: "/media/generated/fpv-gt-f-exhaust-closeup.webp",
  },
]
