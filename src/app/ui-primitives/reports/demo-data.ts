/**
 * Shared demo data for the reports sub-routes.
 * Realistic Mufflermen domain: bay utilisation, parts SKUs, jobs, AUD revenue.
 */

import type {
  BuilderField,
} from "../components/reports/report-builder-canvas"
import type { ReportRun } from "../components/reports/report-run-history-table"
import type { DrilldownRow } from "../components/reports/drilldown-inspector"
import type {
  DateRangePresetEntry,
  FilterGroup,
  PivotRow,
} from "../components/reports/reports-types"

export const BUILDER_FIELDS: ReadonlyArray<BuilderField> = [
  { id: "suburb", label: "Suburb", type: "geography" },
  { id: "bay", label: "Service bay", type: "dimension" },
  { id: "technician", label: "Technician", type: "dimension" },
  { id: "vehicle-make", label: "Vehicle make", type: "dimension" },
  { id: "job-type", label: "Job type", type: "dimension" },
  { id: "completed-at", label: "Completed at", type: "date" },
  { id: "revenue-aud", label: "Revenue (AUD)", type: "measure" },
  { id: "labour-hours", label: "Labour hours", type: "measure" },
  { id: "manta-units", label: "Manta units sold", type: "measure" },
]

export const PRESETS: ReadonlyArray<DateRangePresetEntry> = [
  { id: "today", label: "Today", hint: "Tue 28 May" },
  { id: "yesterday", label: "Yesterday", hint: "Mon 27 May" },
  { id: "last-7", label: "Last 7 days", hint: "Wed 21 — Tue 28" },
  { id: "this-month", label: "This month", hint: "1 May — 28 May" },
  { id: "last-month", label: "Last month", hint: "1 — 30 Apr" },
  { id: "last-quarter", label: "Last quarter", hint: "Q1 FY26" },
  { id: "ytd", label: "Year to date", hint: "1 Jul — 28 May" },
  { id: "custom", label: "Custom", hint: "Pick range" },
]

export const RUN_HISTORY: ReadonlyArray<ReportRun> = [
  {
    id: "run-2026-05-28-06",
    timestamp: "28 May 2026 · 06:00 AEST",
    durationMs: 42800,
    rows: 18420,
    size: "1.8 MB",
    status: "ok",
    downloadHref: "#",
  },
  {
    id: "run-2026-05-21-06",
    timestamp: "21 May 2026 · 06:00 AEST",
    durationMs: 38120,
    rows: 17988,
    size: "1.7 MB",
    status: "ok",
    downloadHref: "#",
  },
  {
    id: "run-2026-05-14-06",
    timestamp: "14 May 2026 · 06:00 AEST",
    durationMs: 90240,
    rows: 17440,
    size: "1.6 MB",
    status: "warn",
    downloadHref: "#",
  },
  {
    id: "run-2026-05-07-06",
    timestamp: "07 May 2026 · 06:00 AEST",
    durationMs: 4200,
    rows: 0,
    size: "—",
    status: "failed",
  },
  {
    id: "run-2026-04-30-06",
    timestamp: "30 Apr 2026 · 06:00 AEST",
    durationMs: 36500,
    rows: 17021,
    size: "1.6 MB",
    status: "ok",
    downloadHref: "#",
  },
]

export const PIVOT_HEADERS: ReadonlyArray<string> = [
  "Oak Flats",
  "Albion Park",
  "Shellharbour",
  "Total",
]

export const PIVOT_ROWS: ReadonlyArray<PivotRow> = [
  {
    header: "Exhaust replace",
    cells: [
      { value: "$48,210" },
      { value: "$31,540" },
      { value: "$22,180" },
      { value: "$101,930", emphasis: "value" },
    ],
  },
  {
    header: "Muffler retrofit",
    cells: [
      { value: "$28,640" },
      { value: "$19,810" },
      { value: "$14,220" },
      { value: "$62,670", emphasis: "value" },
    ],
  },
  {
    header: "Manta sport install",
    cells: [
      { value: "$66,820" },
      { value: "$38,720" },
      { value: "$24,640" },
      { value: "$130,180", emphasis: "value" },
    ],
  },
  {
    header: "Inspection · subtotal",
    subtotal: true,
    cells: [
      { value: "$143,670" },
      { value: "$90,070" },
      { value: "$61,040" },
      { value: "$294,780", emphasis: "value" },
    ],
  },
]

export const PIVOT_TOTALS: ReadonlyArray<string> = [
  "$208,520",
  "$132,820",
  "$84,680",
  "$426,020",
]

export const FILTER_TREE: FilterGroup = {
  id: "root",
  logic: "AND",
  conditions: [
    { id: "c-1", field: "completed_at", operator: "between", value: "2026-05-01..2026-05-28" },
    { id: "c-2", field: "status", operator: "equals", value: "completed" },
  ],
  groups: [
    {
      id: "g-1",
      logic: "OR",
      conditions: [
        { id: "c-3", field: "suburb", operator: "equals", value: "Oak Flats" },
        { id: "c-4", field: "suburb", operator: "equals", value: "Albion Park" },
        { id: "c-5", field: "suburb", operator: "equals", value: "Shellharbour" },
      ],
    },
  ],
}

export const DRILLDOWN_ROWS: ReadonlyArray<DrilldownRow> = [
  { id: "manta", label: "Manta sport install", value: "$130,180", sharePct: 30.6 },
  { id: "exhaust", label: "Exhaust replace", value: "$101,930", sharePct: 23.9 },
  { id: "muffler", label: "Muffler retrofit", value: "$62,670", sharePct: 14.7 },
  { id: "diag", label: "Diagnostics", value: "$48,210", sharePct: 11.3 },
  { id: "rwc", label: "RWC inspection", value: "$31,540", sharePct: 7.4 },
  { id: "other", label: "Other", value: "$51,490", sharePct: 12.1 },
]

export const KPI_SPARKS: Record<string, number[]> = {
  utilisation: [62, 64, 66, 65, 68, 70, 71, 73, 74, 76, 78, 80, 82],
  revenue: [12.4, 12.7, 13.2, 13.0, 13.6, 14.1, 14.8, 15.0, 14.6, 15.5, 16.1, 17.2, 18.4],
  jobs: [38, 40, 39, 42, 44, 45, 46, 47, 49, 51, 50, 52, 54],
  ltv: [1850, 1880, 1890, 1900, 1920, 1955, 1970, 1990, 2010, 2025, 2045, 2080, 2110],
}
