/**
 * Realistic Mufflermen roster fixtures shared across sub-routes.
 * Pure data — no React. Sub-routes import what they need.
 */

import type { WeekEvent } from "../components/calendar/calendar-week-view"
import type { BayRow } from "../components/calendar/availability-grid"
import type {
  BayAssignmentCell,
  BayAssignmentRow,
} from "../components/roster/bay-assignment-grid"
import type {
  BreakStatus,
} from "../components/roster/lunch-break-tracker"
import type {
  CoverageMark,
  TechnicianTint,
} from "../components/roster/roster-calendar-overlay"
import type { ScheduleBlock } from "../components/roster/daily-schedule-strip"
import type {
  SkillCertColumn,
  SkillCertRow,
} from "../components/roster/skill-cert-matrix"
import type { TechnicianRef } from "../components/roster/roster-types"

export const TECHNICIANS: ReadonlyArray<TechnicianRef> = [
  { id: "jordan-pace", name: "Jordan Pace", role: "Apprentice Y3" },
  { id: "sophie-tan", name: "Sophie Tan", role: "Workshop Manager" },
  { id: "bec-lawson", name: "Bec Lawson", role: "Front Desk" },
  { id: "marcus-halverson", name: "Marcus Halverson", role: "Owner" },
  { id: "trent-williams", name: "Trent Williams", role: "Senior Technician" },
]

export const TECH_TINTS: ReadonlyArray<TechnicianTint> = [
  { id: "jordan-pace", name: "Jordan Pace", tone: "teal" },
  { id: "sophie-tan", name: "Sophie Tan", tone: "amber" },
  { id: "bec-lawson", name: "Bec Lawson", tone: "neutral" },
  { id: "marcus-halverson", name: "Marcus Halverson", tone: "red" },
  { id: "trent-williams", name: "Trent Williams", tone: "green" },
]

/** Stable reference date — Tue 2 Jun 2026 inside a known week. */
export const REF_TODAY = new Date("2026-06-02T08:30:00+10:00")

function at(hour: number, minute: number, dayOffset: number = 0): Date {
  const date = new Date(REF_TODAY.getTime())
  date.setDate(date.getDate() + dayOffset)
  date.setHours(hour, minute, 0, 0)
  return date
}

export const TRENT_DAY: ReadonlyArray<ScheduleBlock> = [
  {
    id: "t-job-1",
    kind: "job",
    title: "Hilux N80 cat-back",
    start: at(7, 30),
    end: at(10, 0),
    location: "Bay 2 · ECC-001",
  },
  {
    id: "t-break-1",
    kind: "break",
    title: "Smoko",
    start: at(10, 0),
    end: at(10, 15),
  },
  {
    id: "t-job-2",
    kind: "job",
    title: "Patrol Y62 ADR sound",
    start: at(10, 15),
    end: at(12, 30),
    location: "Bay 3 · BRR-902",
  },
  {
    id: "t-lunch",
    kind: "break",
    title: "Lunch",
    start: at(12, 30),
    end: at(13, 0),
  },
  {
    id: "t-training",
    kind: "training",
    title: "TIG cert refresher",
    start: at(13, 0),
    end: at(14, 30),
    location: "Mezzanine",
  },
  {
    id: "t-job-3",
    kind: "job",
    title: "MX-5 NB resonator",
    start: at(14, 30),
    end: at(17, 0),
    location: "Bay 1 · MX-NB",
  },
]

export const WEEK_EVENTS: ReadonlyArray<WeekEvent> = [
  {
    id: "we-1",
    start: at(7, 30, -1),
    end: at(15, 30, -1),
    title: "Trent · Bay 1",
    tone: "green",
    sub: "Senior",
  },
  {
    id: "we-2",
    start: at(7, 30),
    end: at(17, 0),
    title: "Trent · Bay 2",
    tone: "green",
    sub: "Long day",
  },
  {
    id: "we-3",
    start: at(8, 0),
    end: at(16, 0),
    title: "Sophie · Floor mgr",
    tone: "amber",
    sub: "Mgmt",
  },
  {
    id: "we-4",
    start: at(8, 0),
    end: at(16, 0, 1),
    title: "Sophie · Floor mgr",
    tone: "amber",
    sub: "Mgmt",
  },
  {
    id: "we-5",
    start: at(9, 0),
    end: at(15, 0),
    title: "Jordan · Apprentice",
    tone: "teal",
    sub: "Y3",
  },
  {
    id: "we-6",
    start: at(8, 30),
    end: at(16, 30, 2),
    title: "Jordan · Bay 3",
    tone: "teal",
    sub: "Y3",
  },
  {
    id: "we-7",
    start: at(8, 0),
    end: at(16, 0),
    title: "Bec · Front desk",
    tone: "neutral",
    sub: "Reception",
  },
  {
    id: "we-8",
    start: at(8, 0),
    end: at(16, 0, 3),
    title: "Bec · Front desk",
    tone: "neutral",
    sub: "Reception",
  },
  {
    id: "we-9",
    start: at(10, 0, 3),
    end: at(15, 0, 3),
    title: "Marcus · Mobile fit",
    tone: "red",
    sub: "Callout",
  },
]

export const COVERAGE: ReadonlyArray<CoverageMark> = [
  { label: "Mon", coverHours: 32, requiredHours: 28 },
  { label: "Tue", coverHours: 34, requiredHours: 32 },
  { label: "Wed", coverHours: 24, requiredHours: 32 },
  { label: "Thu", coverHours: 18, requiredHours: 28 },
  { label: "Fri", coverHours: 30, requiredHours: 28 },
  { label: "Sat", coverHours: 12, requiredHours: 16 },
  { label: "Sun", coverHours: 0, requiredHours: 0 },
]

export const BAY_AVAILABILITY: ReadonlyArray<BayRow> = [
  {
    id: "bay-1",
    label: "Bay 1",
    hours: ["busy", "busy", "busy", "free", "free", "busy", "busy", "busy", "busy", "free", "maintenance"],
  },
  {
    id: "bay-2",
    label: "Bay 2",
    hours: ["busy", "busy", "busy", "busy", "busy", "free", "busy", "busy", "busy", "free", "free"],
  },
  {
    id: "bay-3",
    label: "Bay 3",
    hours: ["free", "busy", "busy", "blocked", "blocked", "free", "busy", "busy", "free", "free", "free"],
  },
  {
    id: "bay-4",
    label: "Bay 4",
    hours: ["blocked", "blocked", "busy", "busy", "busy", "blocked", "free", "free", "blocked", "blocked", "blocked"],
  },
]

const trent: BayAssignmentCell = { techShort: "TW", techName: "Trent Williams", tone: "green" }
const sophie: BayAssignmentCell = { techShort: "ST", techName: "Sophie Tan", tone: "amber" }
const jordan: BayAssignmentCell = { techShort: "JP", techName: "Jordan Pace", tone: "teal" }
const marcus: BayAssignmentCell = { techShort: "MH", techName: "Marcus Halverson", tone: "red" }

export const BAY_ASSIGNMENTS: ReadonlyArray<BayAssignmentRow> = [
  {
    bay: "bay-1",
    cells: [trent, trent, trent, sophie, sophie, sophie, trent, trent, null, null, null],
  },
  {
    bay: "bay-2",
    cells: [trent, trent, trent, trent, trent, null, sophie, sophie, sophie, sophie, null],
  },
  {
    bay: "bay-3",
    cells: [jordan, jordan, jordan, null, null, jordan, jordan, jordan, null, null, null],
  },
  {
    bay: "bay-4",
    cells: [null, null, marcus, marcus, marcus, null, null, null, null, null, null],
  },
]

export const BREAKS: ReadonlyArray<BreakStatus> = [
  {
    technician: TECHNICIANS[0],
    takenMinutes: 12,
    allowanceMinutes: 30,
    inProgress: true,
  },
  {
    technician: TECHNICIANS[4],
    takenMinutes: 28,
    allowanceMinutes: 30,
    inProgress: true,
  },
  {
    technician: TECHNICIANS[2],
    takenMinutes: 30,
    allowanceMinutes: 30,
    inProgress: false,
  },
]

export const CERT_COLUMNS: ReadonlyArray<SkillCertColumn> = [
  { id: "adr-sound", label: "ADR sound" },
  { id: "tig", label: "TIG cert" },
  { id: "mig", label: "MIG cert" },
  { id: "ohs", label: "OH&S" },
  { id: "forklift", label: "Forklift" },
]

export const CERT_ROWS: ReadonlyArray<SkillCertRow> = [
  {
    technicianId: "trent-williams",
    technicianName: "Trent Williams",
    cells: {
      "adr-sound": { level: "master" },
      tig: { level: "master", daysToExpiry: 240 },
      mig: { level: "master", daysToExpiry: 240 },
      ohs: { level: "proficient", daysToExpiry: 18 },
      forklift: { level: "competent", daysToExpiry: 410 },
    },
  },
  {
    technicianId: "sophie-tan",
    technicianName: "Sophie Tan",
    cells: {
      "adr-sound": { level: "proficient" },
      tig: { level: "competent" },
      mig: { level: "proficient", daysToExpiry: 90 },
      ohs: { level: "master", daysToExpiry: 540 },
      forklift: { level: "master", daysToExpiry: 720 },
    },
  },
  {
    technicianId: "jordan-pace",
    technicianName: "Jordan Pace",
    cells: {
      "adr-sound": { level: "novice" },
      tig: { level: "competent", daysToExpiry: 60 },
      mig: { level: "competent", daysToExpiry: 60 },
      ohs: { level: "competent", daysToExpiry: -4 },
      forklift: { level: "novice" },
    },
  },
  {
    technicianId: "marcus-halverson",
    technicianName: "Marcus Halverson",
    cells: {
      "adr-sound": { level: "master" },
      tig: { level: "proficient" },
      mig: { level: "master" },
      ohs: { level: "master", daysToExpiry: 360 },
      forklift: { level: "proficient", daysToExpiry: 420 },
    },
  },
  {
    technicianId: "bec-lawson",
    technicianName: "Bec Lawson",
    cells: {
      "adr-sound": { level: "novice" },
      tig: { level: "novice" },
      mig: { level: "novice" },
      ohs: { level: "competent", daysToExpiry: 200 },
      forklift: { level: "novice" },
    },
  },
]
