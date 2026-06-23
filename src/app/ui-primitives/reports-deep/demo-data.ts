/**
 * Shared demo data for reports-deep sub-routes.
 * Mufflermen domain: weekly revenue $42,180, dyno bookings, parts margin,
 * suburb performance (Wollongong $18k vs Albion Park $4.2k).
 * All AUD inc GST. Anomalies on quote conversion drop.
 */

import type {
  AnomalyEvent,
  BuilderDimension,
  BuilderFilterChip,
  BuilderMeasure,
  CohortRow,
  DashboardWidget,
  DataSourceConnection,
  DrillDownEntry,
  FilterChipGroupDef,
  FilterFieldDef,
  ForecastPoint,
  FunnelStage,
  GoalProgress,
  PivotAxisGroup,
  PivotMatrixCell,
  PivotMeasure,
  ScheduledExportConfig,
  SharePermissionEntry,
} from "../components/reports-deep/reports-deep-types"

export const BUILDER_FILTERS: ReadonlyArray<BuilderFilterChip> = [
  { id: "f-current-week", label: "Date", value: "Week 22 FY26" },
  { id: "f-status", label: "Job status", value: "completed" },
  { id: "f-region", label: "Region", value: "Illawarra" },
  { id: "f-bay", label: "Bay", value: "any" },
]

export const BUILDER_DIMENSIONS: ReadonlyArray<BuilderDimension> = [
  { id: "d-suburb", label: "Suburb", source: "jobs" },
  { id: "d-service", label: "Service line", source: "jobs" },
  { id: "d-technician", label: "Technician", source: "rota" },
  { id: "d-vehicle-make", label: "Vehicle make", source: "vehicles" },
  { id: "d-supplier", label: "Parts supplier", source: "inventory" },
  { id: "d-week", label: "ISO week", source: "calendar" },
]

export const BUILDER_MEASURES: ReadonlyArray<BuilderMeasure> = [
  { id: "m-revenue", label: "Revenue inc GST", aggregator: "sum", unit: "AUD" },
  { id: "m-margin", label: "Parts margin", aggregator: "sum", unit: "AUD" },
  { id: "m-jobs", label: "Jobs completed", aggregator: "count" },
  { id: "m-dyno", label: "Dyno bookings", aggregator: "count" },
  { id: "m-labour", label: "Labour hours", aggregator: "sum", unit: "h" },
  { id: "m-quote-conv", label: "Quote conversion", aggregator: "avg", unit: "%" },
]

export const SCHEDULED_EXPORTS: ReadonlyArray<ScheduledExportConfig> = [
  {
    id: "se-weekly-revenue",
    reportName: "Weekly revenue snapshot",
    cronLabel: "0 6 * * 1",
    cadence: "weekly",
    nextRun: "Mon 02 Jun · 06:00 AEST",
    format: "pdf",
    recipients: [
      { id: "r-ops", label: "ops@oakflats-mufflermen.com.au", channel: "email" },
      { id: "r-slack", label: "#workshop-ops", channel: "slack" },
    ],
    enabled: true,
  },
  {
    id: "se-dyno",
    reportName: "Dyno bookings · weekly",
    cronLabel: "30 7 * * 1",
    cadence: "weekly",
    nextRun: "Mon 02 Jun · 07:30 AEST",
    format: "csv",
    recipients: [
      { id: "r-eng", label: "perf@oakflats-mufflermen.com.au", channel: "email" },
      { id: "r-hook", label: "https://hub.mufflermen…/dyno", channel: "webhook" },
    ],
    enabled: true,
  },
  {
    id: "se-parts-margin",
    reportName: "Parts margin · monthly",
    cronLabel: "0 5 1 * *",
    cadence: "monthly",
    nextRun: "Mon 01 Jun · 05:00 AEST",
    format: "xlsx",
    recipients: [
      { id: "r-fin", label: "finance@oakflats-mufflermen.com.au", channel: "email" },
    ],
    enabled: false,
  },
  {
    id: "se-suburb",
    reportName: "Suburb performance · monthly",
    cronLabel: "0 6 1 * *",
    cadence: "monthly",
    nextRun: "Mon 01 Jun · 06:00 AEST",
    format: "pdf",
    recipients: [
      { id: "r-dir", label: "directors@oakflats-mufflermen.com.au", channel: "email" },
      { id: "r-teams", label: "Directors · Teams", channel: "teams" },
    ],
    enabled: true,
  },
]

export const FILTER_CHIPS: ReadonlyArray<FilterChipGroupDef> = [
  {
    id: "service-lines",
    label: "Service line",
    options: [
      { id: "exhaust", label: "Exhaust" },
      { id: "muffler", label: "Muffler" },
      { id: "manta", label: "Manta install" },
      { id: "dyno", label: "Dyno tune" },
      { id: "rwc", label: "RWC inspection" },
    ],
  },
  {
    id: "suburbs",
    label: "Suburb",
    options: [
      { id: "wollongong", label: "Wollongong" },
      { id: "oak-flats", label: "Oak Flats" },
      { id: "albion-park", label: "Albion Park" },
      { id: "shellharbour", label: "Shellharbour" },
      { id: "kiama", label: "Kiama" },
    ],
  },
  {
    id: "supplier",
    label: "Parts supplier",
    options: [
      { id: "manta", label: "Manta" },
      { id: "xforce", label: "XForce" },
      { id: "magnaflow", label: "Magnaflow" },
      { id: "pacemaker", label: "Pacemaker" },
      { id: "redback", label: "Redback" },
    ],
  },
]

export const FILTER_TEXT_FIELDS: ReadonlyArray<FilterFieldDef> = [
  { id: "rego", label: "Rego search", kind: "text", hint: "e.g. ABC123" },
  { id: "invoice", label: "Invoice ref", kind: "text", hint: "INV-2026-…" },
]

export const DASHBOARD_WIDGETS: ReadonlyArray<DashboardWidget> = [
  {
    id: "w-revenue-week",
    title: "Weekly revenue",
    subtitle: "Week 22 FY26 · inc GST",
    span: 2,
    heightUnits: 1,
    accent: "teal",
    value: "$42,180",
    delta: "+6.4% vs prior week",
  },
  {
    id: "w-dyno",
    title: "Dyno bookings",
    subtitle: "Week 22 FY26",
    span: 1,
    heightUnits: 1,
    accent: "amber",
    value: "27",
    delta: "+3 vs avg",
  },
  {
    id: "w-parts-margin",
    title: "Parts margin",
    subtitle: "Month to date",
    span: 1,
    heightUnits: 1,
    accent: "green",
    value: "$11,840",
    delta: "+2.1 pts",
  },
  {
    id: "w-quote-conv",
    title: "Quote conversion",
    subtitle: "Rolling 14 days",
    span: 1,
    heightUnits: 1,
    accent: "red",
    value: "48.2%",
    delta: "−6.4 pts ⚠",
  },
  {
    id: "w-wollongong",
    title: "Wollongong",
    subtitle: "Weekly revenue · 11 jobs",
    span: 1,
    heightUnits: 1,
    accent: "teal",
    value: "$18,040",
  },
  {
    id: "w-albion",
    title: "Albion Park",
    subtitle: "Weekly revenue · 4 jobs",
    span: 1,
    heightUnits: 1,
    accent: "violet",
    value: "$4,210",
  },
  {
    id: "w-oak-flats",
    title: "Oak Flats",
    subtitle: "Weekly revenue · 8 jobs",
    span: 1,
    heightUnits: 1,
    accent: "amber",
    value: "$12,640",
  },
  {
    id: "w-shellharbour",
    title: "Shellharbour",
    subtitle: "Weekly revenue · 5 jobs",
    span: 1,
    heightUnits: 1,
    accent: "green",
    value: "$7,290",
  },
]

export const KPI_SPARKS_DEEP: Record<string, number[]> = {
  revenue: [38.1, 39.2, 38.8, 40.0, 39.6, 41.4, 42.18],
  dyno: [22, 24, 23, 25, 24, 26, 27],
  partsMargin: [9.8, 10.1, 10.4, 10.7, 11.0, 11.4, 11.84],
  conversion: [54.6, 53.2, 52.0, 51.1, 50.4, 49.0, 48.2],
}

const ROW_GROUPS: ReadonlyArray<PivotAxisGroup> = [
  {
    id: "performance",
    label: "Performance",
    leaves: ["Manta sport install", "Cat-back system", "Dyno tune"],
  },
  {
    id: "service",
    label: "Service",
    leaves: ["Exhaust replace", "Muffler retrofit", "RWC inspection"],
  },
]

const COL_GROUPS: ReadonlyArray<PivotAxisGroup> = [
  {
    id: "north",
    label: "Northern Illawarra",
    leaves: ["Wollongong", "Oak Flats"],
  },
  {
    id: "south",
    label: "Southern Illawarra",
    leaves: ["Albion Park", "Shellharbour", "Kiama"],
  },
]

// Matrix[measureIndex][rowLeafIndex][colLeafIndex]
const REVENUE_MATRIX: ReadonlyArray<ReadonlyArray<PivotMatrixCell>> = [
  // Manta sport install
  [
    { value: 8420, emphasis: "value" },
    { value: 5210 },
    { value: 1820 },
    { value: 2240 },
    { value: 1010 },
  ],
  // Cat-back system
  [
    { value: 4860 },
    { value: 3120 },
    { value: 940 },
    { value: 1840 },
    { value: 560 },
  ],
  // Dyno tune
  [
    { value: 2410 },
    { value: 1280 },
    { value: 420 },
    { value: 980 },
    { value: 320 },
  ],
  // Exhaust replace
  [
    { value: 1980 },
    { value: 1620 },
    { value: 540 },
    { value: 1280 },
    { value: 380 },
  ],
  // Muffler retrofit
  [
    { value: 620 },
    { value: 980 },
    { value: 320 },
    { value: 540 },
    { value: 210 },
  ],
  // RWC inspection
  [
    { value: 240 },
    { value: 410 },
    { value: 180 },
    { value: 260 },
    { value: 120 },
  ],
]

const JOBS_MATRIX: ReadonlyArray<ReadonlyArray<PivotMatrixCell>> = [
  [{ value: 6 }, { value: 4 }, { value: 1 }, { value: 2 }, { value: 1 }],
  [{ value: 5 }, { value: 3 }, { value: 1 }, { value: 2 }, { value: 1 }],
  [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 0 }],
  [{ value: 3 }, { value: 3 }, { value: 1 }, { value: 2 }, { value: 1 }],
  [{ value: 1 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }],
]

const MARGIN_MATRIX: ReadonlyArray<ReadonlyArray<PivotMatrixCell>> = [
  [{ value: 2940, emphasis: "value" }, { value: 1820 }, { value: 560 }, { value: 720 }, { value: 320 }],
  [{ value: 1610 }, { value: 1020 }, { value: 280 }, { value: 580 }, { value: 180 }],
  [{ value: 820 }, { value: 410 }, { value: 140 }, { value: 320 }, { value: 110 }],
  [{ value: 660 }, { value: 540 }, { value: 180 }, { value: 410 }, { value: 120 }],
  [{ value: 210 }, { value: 320 }, { value: 110 }, { value: 180 }, { value: 70 }],
  [{ value: 80 }, { value: 140 }, { value: 60 }, { value: 90 }, { value: 40 }],
]

export const PIVOT_TITLE = "Suburb x service line · Week 22 FY26"

export const PIVOT_ROW_GROUPS = ROW_GROUPS
export const PIVOT_COL_GROUPS = COL_GROUPS

export const PIVOT_MEASURES: ReadonlyArray<PivotMeasure> = [
  { id: "m-revenue", label: "Revenue", format: "aud" },
  { id: "m-jobs", label: "Jobs", format: "count" },
  { id: "m-margin", label: "Margin", format: "aud" },
]

export const PIVOT_MATRIX: ReadonlyArray<ReadonlyArray<ReadonlyArray<PivotMatrixCell>>> = [
  REVENUE_MATRIX,
  JOBS_MATRIX,
  MARGIN_MATRIX,
]

export const DRILL_LEVELS: ReadonlyArray<{
  readonly id: string
  readonly label: string
  readonly summaryMetric: string
  readonly summaryValue: string
  readonly entries: ReadonlyArray<DrillDownEntry>
}> = [
  {
    id: "all-suburbs",
    label: "All suburbs",
    summaryMetric: "Weekly revenue inc GST",
    summaryValue: "$42,180",
    entries: [
      {
        id: "wollongong",
        dimensionLabel: "Suburb",
        dimensionValue: "Wollongong",
        metric: "Revenue",
        metricValue: "$18,040",
        contribution: 42.8,
      },
      {
        id: "oak-flats",
        dimensionLabel: "Suburb",
        dimensionValue: "Oak Flats",
        metric: "Revenue",
        metricValue: "$12,640",
        contribution: 30.0,
      },
      {
        id: "shellharbour",
        dimensionLabel: "Suburb",
        dimensionValue: "Shellharbour",
        metric: "Revenue",
        metricValue: "$7,290",
        contribution: 17.3,
      },
      {
        id: "albion-park",
        dimensionLabel: "Suburb",
        dimensionValue: "Albion Park",
        metric: "Revenue",
        metricValue: "$4,210",
        contribution: 10.0,
      },
    ],
  },
  {
    id: "wollongong-services",
    label: "Wollongong → services",
    summaryMetric: "Wollongong revenue",
    summaryValue: "$18,040",
    entries: [
      {
        id: "manta",
        dimensionLabel: "Service",
        dimensionValue: "Manta sport install",
        metric: "Revenue",
        metricValue: "$8,420",
        contribution: 46.7,
      },
      {
        id: "catback",
        dimensionLabel: "Service",
        dimensionValue: "Cat-back system",
        metric: "Revenue",
        metricValue: "$4,860",
        contribution: 27.0,
      },
      {
        id: "dyno",
        dimensionLabel: "Service",
        dimensionValue: "Dyno tune",
        metric: "Revenue",
        metricValue: "$2,410",
        contribution: 13.4,
      },
      {
        id: "exhaust",
        dimensionLabel: "Service",
        dimensionValue: "Exhaust replace",
        metric: "Revenue",
        metricValue: "$1,980",
        contribution: 11.0,
      },
    ],
  },
  {
    id: "manta-vehicles",
    label: "Manta install → vehicle make",
    summaryMetric: "Manta sport install",
    summaryValue: "$8,420",
    entries: [
      {
        id: "ford",
        dimensionLabel: "Vehicle make",
        dimensionValue: "Ford Ranger",
        metric: "Revenue",
        metricValue: "$3,720",
        contribution: 44.2,
      },
      {
        id: "toyota",
        dimensionLabel: "Vehicle make",
        dimensionValue: "Toyota Hilux",
        metric: "Revenue",
        metricValue: "$2,640",
        contribution: 31.4,
      },
      {
        id: "holden",
        dimensionLabel: "Vehicle make",
        dimensionValue: "Holden Commodore",
        metric: "Revenue",
        metricValue: "$1,180",
        contribution: 14.0,
      },
      {
        id: "subaru",
        dimensionLabel: "Vehicle make",
        dimensionValue: "Subaru WRX",
        metric: "Revenue",
        metricValue: "$880",
        contribution: 10.4,
      },
    ],
  },
]

export const FUNNEL_STAGES: ReadonlyArray<FunnelStage> = [
  { id: "lead", label: "Lead captured", current: 184, prior: 172 },
  { id: "quote", label: "Quote issued", current: 142, prior: 128 },
  { id: "approved", label: "Quote approved", current: 68, prior: 74 },
  { id: "booked", label: "Booked into bay", current: 56, prior: 58 },
  { id: "completed", label: "Job completed", current: 49, prior: 54 },
]

export const COHORT_PERIODS = ["Wk 0", "Wk 4", "Wk 8", "Wk 12", "Wk 16", "Wk 20", "Wk 24"]

export const COHORT_RETENTION: ReadonlyArray<CohortRow> = [
  { id: "fy26-w14", cohortLabel: "Wk 14 FY26", size: 84, cells: [1.0, 0.78, 0.62, 0.54, 0.48, 0.44, 0.41] },
  { id: "fy26-w15", cohortLabel: "Wk 15 FY26", size: 76, cells: [1.0, 0.81, 0.66, 0.58, 0.52, 0.48, 0] },
  { id: "fy26-w16", cohortLabel: "Wk 16 FY26", size: 92, cells: [1.0, 0.74, 0.6, 0.5, 0.46, 0, 0] },
  { id: "fy26-w17", cohortLabel: "Wk 17 FY26", size: 88, cells: [1.0, 0.79, 0.64, 0.56, 0, 0, 0] },
  { id: "fy26-w18", cohortLabel: "Wk 18 FY26", size: 81, cells: [1.0, 0.82, 0.68, 0, 0, 0, 0] },
  { id: "fy26-w19", cohortLabel: "Wk 19 FY26", size: 95, cells: [1.0, 0.76, 0, 0, 0, 0, 0] },
  { id: "fy26-w20", cohortLabel: "Wk 20 FY26", size: 102, cells: [1.0, 0, 0, 0, 0, 0, 0] },
]

export const COHORT_REVENUE: ReadonlyArray<CohortRow> = [
  { id: "fy26-w14r", cohortLabel: "Wk 14 FY26", size: 84, cells: [38120, 22480, 14210, 9840, 7220, 5180, 4040] },
  { id: "fy26-w15r", cohortLabel: "Wk 15 FY26", size: 76, cells: [34620, 21120, 14080, 10240, 7480, 5320, 0] },
  { id: "fy26-w16r", cohortLabel: "Wk 16 FY26", size: 92, cells: [42180, 25640, 16240, 11080, 7920, 0, 0] },
  { id: "fy26-w17r", cohortLabel: "Wk 17 FY26", size: 88, cells: [40220, 24820, 15960, 11120, 0, 0, 0] },
  { id: "fy26-w18r", cohortLabel: "Wk 18 FY26", size: 81, cells: [36810, 23180, 15040, 0, 0, 0, 0] },
  { id: "fy26-w19r", cohortLabel: "Wk 19 FY26", size: 95, cells: [43240, 26420, 0, 0, 0, 0, 0] },
  { id: "fy26-w20r", cohortLabel: "Wk 20 FY26", size: 102, cells: [46810, 0, 0, 0, 0, 0, 0] },
]

export const COHORT_ENGAGEMENT: ReadonlyArray<CohortRow> = [
  { id: "fy26-w14e", cohortLabel: "Wk 14 FY26", size: 84, cells: [3.8, 3.1, 2.4, 2.0, 1.6, 1.4, 1.2] },
  { id: "fy26-w15e", cohortLabel: "Wk 15 FY26", size: 76, cells: [3.9, 3.2, 2.6, 2.1, 1.8, 1.5, 0] },
  { id: "fy26-w16e", cohortLabel: "Wk 16 FY26", size: 92, cells: [4.1, 3.3, 2.6, 2.2, 1.9, 0, 0] },
  { id: "fy26-w17e", cohortLabel: "Wk 17 FY26", size: 88, cells: [4.0, 3.2, 2.5, 2.1, 0, 0, 0] },
  { id: "fy26-w18e", cohortLabel: "Wk 18 FY26", size: 81, cells: [3.9, 3.4, 2.6, 0, 0, 0, 0] },
  { id: "fy26-w19e", cohortLabel: "Wk 19 FY26", size: 95, cells: [4.2, 3.3, 0, 0, 0, 0, 0] },
  { id: "fy26-w20e", cohortLabel: "Wk 20 FY26", size: 102, cells: [4.3, 0, 0, 0, 0, 0, 0] },
]

export const FORECAST_POINTS: ReadonlyArray<ForecastPoint> = [
  { label: "Mar W1", actual: 38420, forecast: 38420, lowerBound: 37000, upperBound: 39800 },
  { label: "Mar W2", actual: 39860, forecast: 39860, lowerBound: 38400, upperBound: 41200 },
  { label: "Mar W3", actual: 40510, forecast: 40510, lowerBound: 39100, upperBound: 42000 },
  { label: "Mar W4", actual: 41240, forecast: 41240, lowerBound: 39800, upperBound: 42700 },
  { label: "Apr W1", actual: 41080, forecast: 41080, lowerBound: 39600, upperBound: 42600 },
  { label: "Apr W2", actual: 42150, forecast: 42150, lowerBound: 40700, upperBound: 43600 },
  { label: "Apr W3", actual: 42180, forecast: 42180, lowerBound: 40700, upperBound: 43700 },
  { label: "May W1", forecast: 42820, lowerBound: 40100, upperBound: 45540 },
  { label: "May W2", forecast: 43470, lowerBound: 40300, upperBound: 46640 },
  { label: "May W3", forecast: 43990, lowerBound: 40200, upperBound: 47780 },
  { label: "May W4", forecast: 44680, lowerBound: 40400, upperBound: 48960 },
  { label: "Jun W1", forecast: 45320, lowerBound: 40600, upperBound: 50040 },
  { label: "Jun W2", forecast: 45980, lowerBound: 40800, upperBound: 51160 },
]

export const ANOMALY_EVENTS: ReadonlyArray<AnomalyEvent> = [
  {
    id: "an-quote-drop",
    metric: "Quote conversion",
    observedValue: "48.2%",
    expectedValue: "54.6%",
    deviationPct: -11.7,
    severity: "severe",
    reason:
      "Conversion dropped sharply across Albion Park + Shellharbour after Manta price increase on 22 May. Outliers concentrated in light-vehicle segment.",
    detectedAt: "28 May 2026 · 04:18 AEST",
  },
  {
    id: "an-dyno-spike",
    metric: "Dyno wait time",
    observedValue: "11.2 days",
    expectedValue: "6.4 days",
    deviationPct: 75.0,
    severity: "critical",
    reason:
      "Dyno bay 2 calibration drift triggered re-runs; queue backlog tripled. Recommend rebalancing toward bay 1 until Monday service.",
    detectedAt: "28 May 2026 · 05:02 AEST",
  },
  {
    id: "an-parts-margin",
    metric: "Parts margin · Magnaflow",
    observedValue: "18.4%",
    expectedValue: "23.1%",
    deviationPct: -20.3,
    severity: "moderate",
    reason:
      "Magnaflow wholesale rates rose 6.4% effective 20 May. Margin compression visible on retrofit jobs.",
    detectedAt: "27 May 2026 · 19:44 AEST",
  },
  {
    id: "an-shell-lead",
    metric: "Shellharbour leads",
    observedValue: "3 leads",
    expectedValue: "11 leads",
    deviationPct: -72.7,
    severity: "minor",
    reason:
      "Lead capture dropped during local Telstra outage on Tuesday. No customer-facing impact.",
    detectedAt: "26 May 2026 · 14:08 AEST",
  },
]

export const GOAL_REVENUE_WEEK: GoalProgress = {
  id: "g-revenue-week",
  label: "Weekly revenue · Week 22 FY26",
  cadence: "weekly",
  target: 45000,
  current: 42180,
  projected: 43900,
  unit: "AUD inc GST",
  formatter: "aud",
  daysRemaining: 2,
}

export const GOAL_DYNO_MONTH: GoalProgress = {
  id: "g-dyno-month",
  label: "Dyno bookings · May FY26",
  cadence: "monthly",
  target: 120,
  current: 96,
  projected: 124,
  unit: "bookings",
  formatter: "count",
  daysRemaining: 4,
}

export const GOAL_PARTS_QUARTER: GoalProgress = {
  id: "g-parts-quarter",
  label: "Parts margin · Q1 FY27",
  cadence: "quarterly",
  target: 48000,
  current: 11840,
  projected: 46200,
  unit: "AUD",
  formatter: "aud",
  daysRemaining: 64,
}

export const DATA_SOURCES: ReadonlyArray<DataSourceConnection> = [
  {
    id: "ds-pos",
    name: "Workshop POS",
    kind: "MySQL",
    state: "ok",
    recordCount: 184220,
    lastSyncedLabel: "28 May · 04:55 AEST",
    nextSyncLabel: "28 May · 05:55 AEST",
    cadenceLabel: "Every 60 min",
  },
  {
    id: "ds-dyno",
    name: "Dynojet feed",
    kind: "Webhook",
    state: "syncing",
    recordCount: 8420,
    lastSyncedLabel: "28 May · 04:32 AEST",
    nextSyncLabel: "Streaming",
    cadenceLabel: "Real-time",
  },
  {
    id: "ds-inventory",
    name: "Parts inventory · Manta",
    kind: "SFTP",
    state: "stale",
    recordCount: 12640,
    lastSyncedLabel: "26 May · 22:10 AEST",
    nextSyncLabel: "28 May · 22:10 AEST",
    cadenceLabel: "Every 48 hours",
  },
  {
    id: "ds-google",
    name: "Google Business · reviews",
    kind: "REST",
    state: "auth-needed",
    recordCount: 1820,
    lastSyncedLabel: "24 May · 12:18 AEST",
    nextSyncLabel: "Paused",
    cadenceLabel: "Daily",
  },
  {
    id: "ds-xero",
    name: "Xero · invoices",
    kind: "OAuth2",
    state: "ok",
    recordCount: 28420,
    lastSyncedLabel: "28 May · 04:01 AEST",
    nextSyncLabel: "29 May · 04:01 AEST",
    cadenceLabel: "Daily",
  },
]

export const SHARE_ENTRIES: ReadonlyArray<SharePermissionEntry> = [
  { id: "s-ops", label: "Workshop ops (5)", permission: "edit" },
  { id: "s-finance", label: "Finance (2)", permission: "comment" },
  { id: "s-directors", label: "Directors (3)", permission: "admin" },
  { id: "s-external-acc", label: "External accountant", permission: "view" },
  { id: "s-insurance", label: "AAMI · insurance partner", permission: "view" },
]

export const SHARE_URL =
  "https://reports.oakflats-mufflermen.com.au/share/wk22-fy26-revenue?token=z8K-q4Lp"

export const SHARE_EMBED = `<iframe
  src="https://reports.oakflats-mufflermen.com.au/embed/wk22-revenue"
  width="640" height="420"
  loading="lazy"
  title="Oak Flats Mufflermen · weekly revenue"
></iframe>`
