/**
 * Demo data for the Model manager & usage screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) AI-model fixtures: the models
 * the Torque assistant can run on (tier / context window / per-million cost),
 * how the routed traffic splits between them, per-model token + dollar usage,
 * and the 28-day budget. All copy is production-ready language for the real
 * workshop (exhausts, servicing, custom fabrication).
 *
 * Brand note (dev-only): the customer-facing assistant is "Torque". The legacy
 * internal codename is never surfaced in any string in this file.
 */

import type { AreaSeries } from "../../components/charts/area-chart"
import type { BarSeries } from "../../components/charts/bar-chart"
import type { GaugeClusterDatum } from "../../components/charts/gauge-cluster"
import type { SparklineTone } from "../../components/charts/sparkline"
import type { ModelOption } from "../../components/ai/model-selector"
import type { DateRangePresetEntry, KpiTone } from "../../components/reports/reports-types"
import type { DrilldownRow } from "../../components/reports/drilldown-inspector"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const REPORTING_PERIOD = "1–28 May 2026"
export const TORQUE_NAME = "Torque"

/** The 28-day token budget that funds every model the assistant routes to. */
export const TOKEN_BUDGET = 12_000_000
export const TOKENS_USED = 7_980_000
export const BUDGET_SPEND = 41.8
export const BUDGET_CAP = 60

/** Models the assistant can route work to. Drives the ModelSelector + the cards. */
export const TORQUE_MODELS: ReadonlyArray<ModelOption> = [
  {
    id: "torque-reason",
    name: "Torque Reason",
    tier: "opus",
    contextWindow: "200K",
    costPerMillion: "$15.00",
    description: "Deepest reasoning. Reserved for quotes, fabrication scoping and tricky diagnostics.",
  },
  {
    id: "torque-shop",
    name: "Torque Shop",
    tier: "sonnet",
    contextWindow: "200K",
    costPerMillion: "$3.00",
    description: "The default. Handles bookings, exhaust selection and customer replies all day.",
  },
  {
    id: "torque-quick",
    name: "Torque Quick",
    tier: "haiku",
    contextWindow: "200K",
    costPerMillion: "$0.80",
    description: "Fast + cheap. Out-of-hours auto-replies, SMS confirmations and FAQ deflection.",
  },
  {
    id: "torque-draft",
    name: "Torque Draft",
    tier: "flash",
    contextWindow: "1M",
    costPerMillion: "$0.35",
    description: "Long-context drafting for blog posts, service write-ups and social captions.",
  },
]

/** The model the assistant runs on by default until the owner changes it. */
export const DEFAULT_MODEL_ID = "torque-shop"

/** Date-range presets for the manager control band. */
export const DATE_RANGES: ReadonlyArray<DateRangePresetEntry> = [
  { id: "7d", label: "7 days", hint: "22–28 May" },
  { id: "28d", label: "28 days", hint: "This period" },
  { id: "qtr", label: "Quarter", hint: "Autumn FY26" },
  { id: "ytd", label: "Year", hint: "Since Jan" },
]

/** A per-model usage card: live token meter, role, status, cost-to-date. */
export interface ModelUsageCard {
  id: string
  role: string
  tokensUsed: number
  tokenBudget: number
  requests: number
  costToDate: string
  health: "live" | "fallback" | "paused"
  spark: number[]
  sparkTone: SparklineTone
}

export const MODEL_USAGE: ReadonlyArray<ModelUsageCard> = [
  {
    id: "torque-shop",
    role: "Front-of-house · default route",
    tokensUsed: 4_120_000,
    tokenBudget: 6_000_000,
    requests: 5_840,
    costToDate: "$24.10",
    health: "live",
    spark: [120, 142, 138, 165, 158, 181, 174],
    sparkTone: "teal",
  },
  {
    id: "torque-quick",
    role: "After-hours auto-reply · SMS",
    tokensUsed: 1_980_000,
    tokenBudget: 3_000_000,
    requests: 9_310,
    costToDate: "$4.30",
    health: "live",
    spark: [40, 52, 48, 61, 70, 66, 78],
    sparkTone: "green",
  },
  {
    id: "torque-draft",
    role: "Content drafting · long context",
    tokensUsed: 1_410_000,
    tokenBudget: 2_400_000,
    requests: 412,
    costToDate: "$8.40",
    health: "live",
    spark: [18, 22, 31, 27, 36, 41, 38],
    sparkTone: "amber",
  },
  {
    id: "torque-reason",
    role: "Quotes & diagnostics · escalation only",
    tokensUsed: 470_000,
    tokenBudget: 1_200_000,
    requests: 96,
    costToDate: "$5.00",
    health: "fallback",
    spark: [6, 9, 7, 12, 10, 14, 11],
    sparkTone: "red",
  },
]

/** Headline usage KPI tiles. */
export interface UsageKpi {
  id: string
  label: string
  value: string
  unit?: string
  deltaLabel: string
  deltaTone: KpiTone
  comparisonLabel: string
  spark: number[]
  sparkTone: SparklineTone
}

export const USAGE_KPIS: ReadonlyArray<UsageKpi> = [
  {
    id: "tokens",
    label: "Tokens used (28d)",
    value: "7.98M",
    unit: "/ 12M",
    deltaLabel: "9.2% vs prior",
    deltaTone: "warning",
    comparisonLabel: "66% of the monthly budget",
    spark: [180, 210, 198, 240, 232, 266, 281],
    sparkTone: "teal",
  },
  {
    id: "spend",
    label: "Spend (28d)",
    value: "$41.80",
    deltaLabel: "3.1% vs prior",
    deltaTone: "warning",
    comparisonLabel: "$0.13 per handled lead",
    spark: [1.2, 1.4, 1.3, 1.6, 1.5, 1.7, 1.5],
    sparkTone: "red",
  },
  {
    id: "requests",
    label: "Requests routed",
    value: "15,658",
    unit: "calls",
    deltaLabel: "14.6% vs prior",
    deltaTone: "positive",
    comparisonLabel: "across 4 models",
    spark: [380, 410, 405, 470, 512, 540, 578],
    sparkTone: "green",
  },
  {
    id: "resolved",
    label: "Auto-resolved",
    value: "87%",
    deltaLabel: "up from 82%",
    deltaTone: "positive",
    comparisonLabel: "13% escalated to the crew",
    spark: [78, 80, 81, 83, 84, 86, 87],
    sparkTone: "amber",
  },
]

/** 12-week token consumption split by model (stacked area, millions of tokens). */
export const TOKEN_TREND: ReadonlyArray<AreaSeries> = [
  {
    label: "Torque Shop",
    tone: "teal",
    values: [0.7, 0.8, 0.75, 0.9, 0.85, 0.95, 0.9, 1.0, 0.95, 1.05, 1.0, 1.1],
  },
  {
    label: "Torque Quick",
    tone: "green",
    values: [0.3, 0.35, 0.32, 0.4, 0.38, 0.42, 0.45, 0.48, 0.5, 0.52, 0.55, 0.58],
  },
  {
    label: "Torque Draft",
    tone: "amber",
    values: [0.2, 0.22, 0.28, 0.25, 0.32, 0.3, 0.35, 0.33, 0.38, 0.36, 0.4, 0.42],
  },
  {
    label: "Torque Reason",
    tone: "red",
    values: [0.06, 0.08, 0.07, 0.1, 0.09, 0.12, 0.1, 0.13, 0.11, 0.14, 0.12, 0.15],
  },
]

export const USAGE_WEEKS: ReadonlyArray<string> = [
  "W1",
  "W2",
  "W3",
  "W4",
  "W5",
  "W6",
  "W7",
  "W8",
  "W9",
  "W10",
  "W11",
  "W12",
]

/** Per-model dollar cost over the last 6 reporting weeks (grouped bars, dollars). */
export const COST_BY_MODEL: ReadonlyArray<BarSeries> = [
  {
    label: "Torque Shop",
    tone: "teal",
    values: [4.2, 4.6, 4.4, 5.1, 4.9, 5.4],
  },
  {
    label: "Torque Draft",
    tone: "amber",
    values: [1.2, 1.4, 1.6, 1.5, 1.8, 1.9],
  },
  {
    label: "Torque Reason",
    tone: "red",
    values: [0.8, 1.1, 0.9, 1.3, 1.0, 1.2],
  },
]

export const COST_WEEKS: ReadonlyArray<string> = ["W23", "W24", "W25", "W26", "W27", "W28"]

/** Budget gauges — exactly three, for the GaugeCluster. */
export const BUDGET_GAUGES: [GaugeClusterDatum, GaugeClusterDatum, GaugeClusterDatum] = [
  { label: "Token budget", value: 66, tone: "teal", unit: "%" },
  { label: "Spend cap", value: 70, tone: "amber", unit: "%" },
  { label: "Cache hit", value: 41, tone: "green", unit: "%" },
]

/** 14-day daily spend sparkline in dollars (budget tile footer). */
export const SPEND_TREND: ReadonlyArray<number> = [
  1.2, 1.4, 1.3, 1.6, 1.5, 1.7, 1.5, 1.8, 1.6, 1.9, 1.7, 2.0, 1.8, 1.5,
]

/** Where the 28-day spend went, by model (drilldown contributors). */
export const SPEND_DRILLDOWN: ReadonlyArray<DrilldownRow> = [
  { id: "shop", label: "Torque Shop · front-of-house", value: "$24.10", sharePct: 58 },
  { id: "draft", label: "Torque Draft · content", value: "$8.40", sharePct: 20 },
  { id: "reason", label: "Torque Reason · quotes", value: "$5.00", sharePct: 12 },
  { id: "quick", label: "Torque Quick · after-hours", value: "$4.30", sharePct: 10 },
]

/** Period-over-period comparison strips. */
export interface PeriodCompare {
  id: string
  metricLabel: string
  currentValue: string
  currentLabel: string
  priorValue: string
  priorLabel: string
  deltaLabel: string
  deltaTone: KpiTone
  spark: number[]
  sparkTone: SparklineTone
}

export const PERIOD_COMPARISONS: ReadonlyArray<PeriodCompare> = [
  {
    id: "cost-per-lead",
    metricLabel: "Cost per handled lead",
    currentValue: "$0.13",
    currentLabel: "This period",
    priorValue: "$0.17",
    priorLabel: "Prior period",
    deltaLabel: "24% cheaper",
    deltaTone: "positive",
    spark: [0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13],
    sparkTone: "green",
  },
  {
    id: "cache",
    metricLabel: "Prompt-cache hit rate",
    currentValue: "41%",
    currentLabel: "This period",
    priorValue: "29%",
    priorLabel: "Prior period",
    deltaLabel: "+12pt",
    deltaTone: "positive",
    spark: [27, 30, 32, 35, 37, 39, 41],
    sparkTone: "teal",
  },
  {
    id: "latency",
    metricLabel: "Median first-token",
    currentValue: "0.8s",
    currentLabel: "Torque Shop",
    priorValue: "1.3s",
    priorLabel: "Prior period",
    deltaLabel: "38% faster",
    deltaTone: "positive",
    spark: [1.3, 1.2, 1.1, 1.0, 0.9, 0.85, 0.8],
    sparkTone: "amber",
  },
]

/** Per-model usage row for the detail table. */
export interface ModelUsageRow {
  id: string
  model: string
  tier: "Opus" | "Sonnet" | "Haiku" | "Flash"
  route: string
  tokens: number
  requests: number
  cost: string
  status: "Live" | "Fallback" | "Paused"
  trend: number[]
  trendTone: SparklineTone
}

export const MODEL_USAGE_ROWS: ReadonlyArray<ModelUsageRow> = [
  {
    id: "r-shop",
    model: "Torque Shop",
    tier: "Sonnet",
    route: "Default · front-of-house",
    tokens: 4_120_000,
    requests: 5_840,
    cost: "$24.10",
    status: "Live",
    trend: [120, 142, 138, 165, 158, 181, 174],
    trendTone: "teal",
  },
  {
    id: "r-quick",
    model: "Torque Quick",
    tier: "Haiku",
    route: "After-hours · SMS",
    tokens: 1_980_000,
    requests: 9_310,
    cost: "$4.30",
    status: "Live",
    trend: [40, 52, 48, 61, 70, 66, 78],
    trendTone: "green",
  },
  {
    id: "r-draft",
    model: "Torque Draft",
    tier: "Flash",
    route: "Content · long context",
    tokens: 1_410_000,
    requests: 412,
    cost: "$8.40",
    status: "Live",
    trend: [18, 22, 31, 27, 36, 41, 38],
    trendTone: "amber",
  },
  {
    id: "r-reason",
    model: "Torque Reason",
    tier: "Opus",
    route: "Quotes · escalation only",
    tokens: 470_000,
    requests: 96,
    cost: "$5.00",
    status: "Fallback",
    trend: [6, 9, 7, 12, 10, 14, 11],
    trendTone: "red",
  },
]
