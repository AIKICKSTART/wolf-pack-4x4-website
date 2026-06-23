/**
 * Demo data for the Business analytics screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) marketing + revenue fixtures:
 * revenue trend, local-SEO ranking, social performance, the running cost of the
 * Torque assistant, plus the top-performing pages on the site. All copy is
 * production-ready language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is "Torque". The legacy
 * internal codename is never surfaced in any string in this file.
 */

import type { AreaSeries } from "../../components/charts/area-chart"
import type { BarSeries } from "../../components/charts/bar-chart"
import type { DonutSegment } from "../../components/charts/donut-chart"
import type { GaugeClusterDatum } from "../../components/charts/gauge-cluster"
import type { SparklineTone } from "../../components/charts/sparkline"
import type { DateRangePresetEntry, KpiTone } from "../../components/reports/reports-types"
import type { DrilldownRow } from "../../components/reports/drilldown-inspector"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const REPORTING_PERIOD = "1–28 May 2026"

/** A headline KPI tile (clickable snapshot) with a trend sparkline. */
export interface AnalyticsKpi {
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

/** A single top-performing page row for the table. */
export interface TopPageRow {
  id: string
  page: string
  path: string
  intent: "Exhaust" | "Servicing" | "Fabrication" | "Local" | "Brand"
  views: number
  leads: number
  convRate: string
  avgPos: string
  trend: number[]
  trendTone: SparklineTone
}

/** Date-range presets for the analytics control. */
export const DATE_RANGES: ReadonlyArray<DateRangePresetEntry> = [
  { id: "7d", label: "7 days", hint: "22–28 May" },
  { id: "28d", label: "28 days", hint: "This period" },
  { id: "qtr", label: "Quarter", hint: "Autumn FY26" },
  { id: "ytd", label: "Year", hint: "Since Jan" },
]

/** Headline KPI tiles. */
export const ANALYTICS_KPIS: ReadonlyArray<AnalyticsKpi> = [
  {
    id: "revenue",
    label: "Revenue (28d)",
    value: "$162,400",
    deltaLabel: "16.4% vs prior",
    deltaTone: "positive",
    comparisonLabel: "vs $139,500 in April",
    spark: [4900, 5200, 5800, 5400, 6100, 6600, 7100],
    sparkTone: "green",
  },
  {
    id: "bookings",
    label: "Bookings",
    value: "318",
    unit: "jobs",
    deltaLabel: "11.2% vs prior",
    deltaTone: "positive",
    comparisonLabel: "286 last period",
    spark: [9, 11, 10, 13, 12, 14, 16],
    sparkTone: "teal",
  },
  {
    id: "seo",
    label: "Local rank — “Oak Flats exhaust”",
    value: "#1",
    deltaLabel: "up from #3",
    deltaTone: "positive",
    comparisonLabel: "Map pack, last 28d",
    spark: [6, 5, 4, 4, 3, 2, 1],
    sparkTone: "amber",
  },
  {
    id: "cost",
    label: "Torque running cost",
    value: "$41.80",
    unit: "/ 28d",
    deltaLabel: "3.1% vs prior",
    deltaTone: "warning",
    comparisonLabel: "$0.13 per handled lead",
    spark: [1.2, 1.4, 1.3, 1.6, 1.5, 1.7, 1.5],
    sparkTone: "red",
  },
]

/** 12-week revenue trend, split exhaust vs servicing vs fabrication (stacked area). */
export const REVENUE_TREND: ReadonlyArray<AreaSeries> = [
  {
    label: "Exhaust systems",
    tone: "red",
    values: [18, 19, 21, 20, 23, 24, 22, 26, 27, 25, 29, 31],
  },
  {
    label: "Servicing & rego",
    tone: "teal",
    values: [11, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17],
  },
  {
    label: "Custom fabrication",
    tone: "amber",
    values: [4, 5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 11],
  },
]

export const REVENUE_WEEKS: ReadonlyArray<string> = [
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

/** Local-SEO ranking position for the keywords that win jobs (grouped bars, lower = better is reframed as visibility score). */
export const SEO_VISIBILITY: ReadonlyArray<BarSeries> = [
  {
    label: "Visibility score",
    tone: "teal",
    values: [96, 88, 74, 81, 67, 59],
  },
  {
    label: "Map-pack share",
    tone: "amber",
    values: [71, 64, 52, 58, 44, 38],
  },
]

export const SEO_KEYWORDS: ReadonlyArray<string> = [
  "Oak Flats exhaust",
  "Illawarra muffler",
  "DPF delete NSW",
  "cat-back Shellharbour",
  "4WD exhaust Wollongong",
  "log book service",
]

/** Social performance — reach by channel this period (donut). */
export const SOCIAL_REACH: ReadonlyArray<DonutSegment> = [
  { label: "Instagram reels", value: 38, tone: "red" },
  { label: "Facebook page", value: 27, tone: "teal" },
  { label: "Google posts", value: 21, tone: "amber" },
  { label: "TikTok builds", value: 14, tone: "green" },
]

/** Engagement strip metrics that sit under the social donut. */
export interface SocialMetric {
  id: string
  label: string
  value: string
  unit?: string
  direction: "up" | "down" | "flat"
  delta: string
}

export const SOCIAL_METRICS: ReadonlyArray<SocialMetric> = [
  { id: "reach", label: "Total reach", value: "84.6k", direction: "up", delta: "22%" },
  { id: "saves", label: "Saves", value: "2,410", direction: "up", delta: "31%" },
  { id: "ctr", label: "Profile → site", value: "3.8%", unit: "CTR", direction: "up", delta: "0.6pt" },
]

/** Agent-cost gauges — exactly three, for the GaugeCluster. */
export const COST_GAUGES: [GaugeClusterDatum, GaugeClusterDatum, GaugeClusterDatum] = [
  { label: "Budget used", value: 42, tone: "teal", unit: "%" },
  { label: "Auto-resolved", value: 87, tone: "green", unit: "%" },
  { label: "Escalated", value: 13, tone: "amber", unit: "%" },
]

/** 14-day Torque cost sparkline in dollars (footer of the cost tile). */
export const COST_TREND: ReadonlyArray<number> = [
  1.2, 1.4, 1.3, 1.6, 1.5, 1.7, 1.5, 1.8, 1.6, 1.9, 1.7, 2.0, 1.8, 1.5,
]

/** Where this period's revenue came from (drilldown contributors). */
export const REVENUE_DRILLDOWN: ReadonlyArray<DrilldownRow> = [
  { id: "catback", label: "Cat-back & full systems", value: "$58,900", sharePct: 36 },
  { id: "fabrication", label: "Custom fabrication", value: "$39,200", sharePct: 24 },
  { id: "servicing", label: "Servicing & rego checks", value: "$31,500", sharePct: 19 },
  { id: "dpf", label: "DPF-back & diesel", value: "$22,300", sharePct: 14 },
  { id: "repairs", label: "Muffler repairs & welds", value: "$10,500", sharePct: 7 },
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
    id: "avg-ticket",
    metricLabel: "Average ticket",
    currentValue: "$1,640",
    currentLabel: "This period",
    priorValue: "$1,520",
    priorLabel: "Prior period",
    deltaLabel: "7.9%",
    deltaTone: "positive",
    spark: [1480, 1510, 1495, 1560, 1590, 1620, 1640],
    sparkTone: "green",
  },
  {
    id: "lead-response",
    metricLabel: "Lead response time",
    currentValue: "2m 10s",
    currentLabel: "Torque median",
    priorValue: "41m",
    priorLabel: "Before Torque",
    deltaLabel: "94% faster",
    deltaTone: "positive",
    spark: [41, 28, 19, 11, 6, 3, 2],
    sparkTone: "teal",
  },
  {
    id: "review-rating",
    metricLabel: "Google rating",
    currentValue: "4.9",
    currentLabel: "Live (318 reviews)",
    priorValue: "4.8",
    priorLabel: "Start of period",
    deltaLabel: "+0.1",
    deltaTone: "positive",
    spark: [4.8, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9],
    sparkTone: "amber",
  },
]

/** Top-performing pages on the Mufflermen site this period. */
export const TOP_PAGES: ReadonlyArray<TopPageRow> = [
  {
    id: "p-catback",
    page: "Cat-back exhaust systems",
    path: "/services/cat-back-exhaust",
    intent: "Exhaust",
    views: 9420,
    leads: 184,
    convRate: "1.95%",
    avgPos: "1.2",
    trend: [120, 140, 160, 150, 190, 210, 240],
    trendTone: "green",
  },
  {
    id: "p-dpf",
    page: "DPF-back & diesel performance",
    path: "/services/dpf-back-diesel",
    intent: "Exhaust",
    views: 6810,
    leads: 142,
    convRate: "2.08%",
    avgPos: "1.5",
    trend: [90, 110, 105, 130, 150, 160, 175],
    trendTone: "teal",
  },
  {
    id: "p-fab",
    page: "Custom fabrication & one-off builds",
    path: "/services/custom-fabrication",
    intent: "Fabrication",
    views: 5230,
    leads: 96,
    convRate: "1.84%",
    avgPos: "2.1",
    trend: [60, 72, 80, 78, 95, 110, 124],
    trendTone: "amber",
  },
  {
    id: "p-local",
    page: "Exhaust shop in Oak Flats",
    path: "/oak-flats-exhaust",
    intent: "Local",
    views: 4870,
    leads: 131,
    convRate: "2.69%",
    avgPos: "1.0",
    trend: [80, 95, 110, 120, 140, 165, 188],
    trendTone: "green",
  },
  {
    id: "p-service",
    page: "Log book servicing & rego inspections",
    path: "/services/log-book-servicing",
    intent: "Servicing",
    views: 4110,
    leads: 88,
    convRate: "2.14%",
    avgPos: "1.8",
    trend: [70, 68, 75, 82, 90, 96, 102],
    trendTone: "teal",
  },
  {
    id: "p-brand",
    page: "Our workshop & the Muffler Men crew",
    path: "/about",
    intent: "Brand",
    views: 3290,
    leads: 34,
    convRate: "1.03%",
    avgPos: "3.4",
    trend: [40, 44, 41, 48, 52, 50, 58],
    trendTone: "red",
  },
]
