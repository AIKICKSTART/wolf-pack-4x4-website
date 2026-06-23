/**
 * Demo data for the cloud-cost management showcase routes.
 * AWS ap-southeast-2 (Sydney) and ap-southeast-4 (Melbourne).
 * AUD pricing. Numbers are illustrative.
 */

import type {
  AllocationSegment,
  ChargebackRow,
  CostResourceRow,
  DailyCostPoint,
  RegionSpendCell,
  ServiceSpendRow,
} from "../components/cloud-costs"

export const DEMO_ACCOUNT = {
  label: "verridian-prod (Sydney)",
  monthLabel: "May 2026",
  periodLabel: "May 2026",
}

export const DEMO_SERVICE_SPEND: ReadonlyArray<ServiceSpendRow> = [
  { service: "EC2", spend: 18420.5 },
  { service: "RDS", spend: 9840.2 },
  { service: "S3", spend: 5210.8 },
  { service: "Lambda", spend: 1820.4 },
  { service: "CloudFront", spend: 3140.1 },
]

export const DEMO_TOP_RESOURCES: ReadonlyArray<CostResourceRow> = [
  {
    id: "i-0a1b2c3d4e5f6a7b8",
    name: "muffler-pulse-api-prod",
    service: "EC2",
    region: "ap-southeast-2",
    spend: 4820.4,
    attributes: ["m5.2xlarge", "Linux", "az-2a"],
  },
  {
    id: "db-prod-mufflerpulse-pg",
    name: "muffler-pulse-pg-prod",
    service: "RDS",
    region: "ap-southeast-2",
    spend: 3240.1,
    attributes: ["db.m5.xlarge", "Postgres 15", "Multi-AZ"],
  },
  {
    id: "i-0fb83a2c14e9d72c1",
    name: "kvcache-worker-pool",
    service: "EC2",
    region: "ap-southeast-4",
    spend: 2810.5,
    attributes: ["c6g.4xlarge", "Graviton", "Spot"],
  },
  {
    id: "arn:aws:s3:::oakflats-content-prod",
    name: "oakflats-content-prod",
    service: "S3",
    region: "ap-southeast-2",
    spend: 1840.2,
    attributes: ["IA", "Versioning on", "62 TB"],
  },
  {
    id: "arn:aws:cloudfront::DIST-EDFGHIJ",
    name: "oakflats-cdn-prod",
    service: "CloudFront",
    region: "us-east-1",
    spend: 1640.4,
    attributes: ["AU edges", "Cache-on"],
  },
  {
    id: "fn-process-images",
    name: "process-images-fn",
    service: "Lambda",
    region: "ap-southeast-2",
    spend: 1180.3,
    attributes: ["1 vCPU", "ARM64", "12M invokes"],
  },
  {
    id: "db-replica-mufflerpulse-pg",
    name: "muffler-pulse-pg-replica",
    service: "RDS",
    region: "ap-southeast-4",
    spend: 980.6,
    attributes: ["db.m5.large", "Read replica"],
  },
  {
    id: "i-0c4e2b81d9f7a6e30",
    name: "media-encoder",
    service: "EC2",
    region: "ap-southeast-2",
    spend: 920.4,
    attributes: ["g4dn.xlarge", "GPU"],
  },
]

export const DEMO_OVERVIEW = {
  mtdSpend: 22840.5,
  forecastSpend: 41280.2,
  budget: 38000.0,
  lastMonthSpend: 36420.0,
  trendLabels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"],
  budgetSeries: [7600, 15200, 22800, 30400, 38000],
  actualSeries: [6840, 14820, 22840, 31420, 39280],
}

export const DEMO_TAG_ALLOCATION: ReadonlyArray<AllocationSegment> = [
  { label: "production", value: 21420.5, tone: "red" },
  { label: "staging", value: 6240.0, tone: "amber" },
  { label: "development", value: 4180.0, tone: "teal" },
  { label: "data-platform", value: 5210.0, tone: "green" },
]

export const DEMO_TAG_UNTAGGED = 1380.4

export const DEMO_DAILY_POINTS: ReadonlyArray<DailyCostPoint> = (() => {
  const result: Array<{ dateISO: string; actual: number; forecast?: number }> = []
  const base = new Date("2026-03-01")
  // 90 days of synthetic daily data.
  for (let i = 0; i < 90; i += 1) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const seasonal = 1140 + Math.sin(i / 6) * 180
    const drift = i * 6.4
    const noise = ((i * 37) % 17) - 8
    const actual = Math.round(seasonal + drift + noise)
    const forecast = i >= 60 ? Math.round(actual * 1.06) : undefined
    result.push({
      dateISO: d.toISOString().slice(0, 10),
      actual,
      forecast,
    })
  }
  return result
})()

export const DEMO_BURNDOWN = (() => {
  const days = 31
  const budget = 38000
  const target = Array.from({ length: days }, (_, idx) =>
    Math.round((budget / days) * (idx + 1))
  )
  const actual = Array.from({ length: days }, (_, idx) => {
    const dailyAvg = budget / days
    const drift = idx > 18 ? 80 : -40
    return Math.round(dailyAvg * (idx + 1) + drift * (idx - 6))
  })
  const dateLabels = Array.from({ length: days }, (_, idx) => {
    const d = new Date("2026-05-01")
    d.setDate(d.getDate() + idx)
    return d.toISOString().slice(0, 10)
  })
  return { budget, target, actual, dateLabels }
})()

export const DEMO_CHARGEBACK_ROWS: ReadonlyArray<ChargebackRow> = [
  {
    id: "team-platform",
    team: "Platform engineering",
    contact: "rebecca.lim@verridian.ai",
    spend: 18420.4,
    allocationPct: 46.4,
    trend: [10.2, 11.4, 12.6, 13.1, 14.4, 15.8, 17.2, 18.4],
  },
  {
    id: "team-mufflerpulse",
    team: "MufflerPulse",
    contact: "dan.fleuren@verridian.ai",
    spend: 9840.2,
    allocationPct: 24.8,
    trend: [7.8, 7.4, 8.2, 8.6, 9.0, 9.2, 9.6, 9.8],
  },
  {
    id: "team-data",
    team: "Data & ML",
    contact: "kara.thompson@verridian.ai",
    spend: 6840.0,
    allocationPct: 17.2,
    trend: [4.1, 4.6, 5.2, 5.8, 6.0, 6.4, 6.6, 6.8],
  },
  {
    id: "team-content",
    team: "Content & marketing",
    contact: "marco.tan@verridian.ai",
    spend: 2840.6,
    allocationPct: 7.2,
    trend: [1.8, 2.1, 2.4, 2.6, 2.7, 2.7, 2.8, 2.84],
  },
  {
    id: "team-internal",
    team: "Internal tooling",
    contact: "ops@verridian.ai",
    spend: 1740.4,
    allocationPct: 4.4,
    trend: [1.4, 1.4, 1.5, 1.6, 1.6, 1.7, 1.7, 1.74],
  },
]

export const DEMO_REGION_CELLS: ReadonlyArray<RegionSpendCell> = [
  { region: "ap-southeast-2", label: "Sydney", spend: 26420.5 },
  { region: "ap-southeast-4", label: "Melbourne", spend: 7240.0 },
  { region: "ap-southeast-1", label: "Singapore", spend: 2840.4 },
  { region: "us-east-1", label: "N. Virginia", spend: 2210.6 },
  { region: "us-west-2", label: "Oregon", spend: 1480.2 },
  { region: "eu-west-1", label: "Ireland", spend: 1080.0 },
]
