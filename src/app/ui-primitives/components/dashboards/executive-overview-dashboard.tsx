"use client"

import { AreaChart } from "../charts/area-chart"
import { HeatmapCalendar } from "../charts/heatmap-calendar"
import { MetricBlock } from "../data-display/metric-block"
import type { HeatCell } from "../charts/heatmap-calendar"
import type { MetricBlockItem } from "../data-display/metric-block"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./executive-overview-dashboard.module.css"

interface BigStat {
  id: string
  label: string
  value: string
  unit?: string
  delta: string
  hint: string
  tone: "red" | "amber" | "teal" | "green"
}

const BIG_STATS: ReadonlyArray<BigStat> = [
  {
    id: "rev",
    label: "Revenue · YTD",
    value: "$1.42M",
    delta: "+18.2% YoY",
    hint: "5 months in. Tracking ahead of FY26 target by $84k.",
    tone: "red",
  },
  {
    id: "active",
    label: "Active customers",
    value: "612",
    delta: "+12% QoQ",
    hint: "Trailing 90d active. Repeat rate steady at 62%.",
    tone: "amber",
  },
  {
    id: "util",
    label: "Bay utilization",
    value: "74",
    unit: "%",
    delta: "+6 pts QoQ",
    hint: "Above target band. Add evening shift trial Jun 17?",
    tone: "teal",
  },
  {
    id: "nps",
    label: "Net promoter",
    value: "74",
    delta: "+4 pts",
    hint: "Survey n=208. Workshop hospitality remains the top driver.",
    tone: "green",
  },
]

const TREND_LABELS = [
  "Mar W1",
  "W2",
  "W3",
  "W4",
  "Apr W1",
  "W2",
  "W3",
  "W4",
  "May W1",
  "W2",
  "W3",
  "W4",
]
const TREND_SERIES = [
  {
    label: "Revenue",
    values: [82_400, 91_200, 88_800, 96_400, 102_100, 99_800, 108_400, 116_800, 119_200, 124_600, 128_400, 134_200],
    tone: "amber" as const,
  },
  {
    label: "Service plans",
    values: [14_800, 15_400, 16_200, 17_400, 18_600, 19_400, 20_200, 21_400, 22_800, 23_600, 24_800, 25_400],
    tone: "teal" as const,
  },
]

function buildHeatmap(): ReadonlyArray<HeatCell> {
  // 12 weeks of jobs/day with a sensible decreasing pattern.
  const out: HeatCell[] = []
  const start = new Date(2026, 2, 1)
  let day = new Date(start)
  for (let i = 0; i < 84; i += 1) {
    const dow = day.getDay()
    // Sundays mostly zero, Saturdays moderate, Mon-Fri ramped.
    let v = 0
    if (dow === 0) v = 0
    else if (dow === 6) v = 2 + ((i * 13) % 4)
    else v = 4 + ((i * 7) % 6)
    // Increase trend across weeks.
    v += Math.floor(i / 28)
    out.push({
      date: day.toISOString().slice(0, 10),
      value: v,
    })
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  }
  return out
}

const HEATMAP_CELLS = buildHeatmap()
const MONTH_LABELS = ["Mar", "", "", "", "Apr", "", "", "", "May", "", "", ""]

const LEADING_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "lead",
    label: "Lead time",
    value: "3.4",
    unit: "d",
    delta: { label: "-0.6d MoM", direction: "down" },
  },
  {
    id: "convert",
    label: "Quote → job",
    value: "62",
    unit: "%",
    delta: { label: "+4 pts", direction: "up" },
  },
  {
    id: "rebook",
    label: "Re-book < 6mo",
    value: "38",
    unit: "%",
    delta: { label: "+2 pts", direction: "up" },
  },
  {
    id: "warranty",
    label: "Warranty rate",
    value: "0.8",
    unit: "%",
    delta: { label: "-0.2 pts", direction: "down" },
  },
]

export function ExecutiveOverviewDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Executive overview / Owner"
        title="The whole company"
        subtitle="Four numbers that matter, the 12-week trend, where the workshop is busy, and the small set of leading indicators worth steering by."
        toolbar={<span>FY26 · YTD May</span>}
        ariaLabel="Executive overview dashboard"
        density="comfortable"
        columns={1}
      >
        <DashboardTile label="Top-line · YTD" aside="May 2026" span={1} tone="red">
          <div className={styles.bigStats}>
            {BIG_STATS.map((stat) => (
              <article
                key={stat.id}
                className={`${styles.bigStat} ${
                  stat.tone === "red"
                    ? styles.toneRed
                    : stat.tone === "amber"
                    ? styles.toneAmber
                    : stat.tone === "teal"
                    ? styles.toneTeal
                    : styles.toneGreen
                }`}
              >
                <span className={styles.bigStatLabel}>{stat.label}</span>
                <span className={styles.bigStatValue}>
                  {stat.value}
                  {stat.unit ? <em className={styles.bigStatUnit}>{stat.unit}</em> : null}
                </span>
                <span className={styles.bigStatDelta}>{stat.delta}</span>
                <p className={styles.bigStatHint}>{stat.hint}</p>
              </article>
            ))}
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Revenue · 12-week trend" aside="AUD weekly" tone="amber">
          <AreaChart
            series={TREND_SERIES}
            xLabels={TREND_LABELS}
            height={240}
            unit=""
            ariaLabel="Revenue and service plan revenue over the last 12 weeks"
          />
        </DashboardTile>

        <DashboardTile label="Workshop heatmap" aside="Mar — May" tone="teal">
          <HeatmapCalendar
            cells={[...HEATMAP_CELLS]}
            tone="teal"
            weeks={12}
            monthLabels={MONTH_LABELS}
            ariaLabel="Daily job volume heatmap across 12 weeks"
          />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Leading indicators"
        title="What we steer by"
        ariaLabel="Executive leading indicators"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Indicators" span={1} tone="green">
          <MetricBlock metrics={LEADING_METRICS} />
        </DashboardTile>
      </DashboardShell>

      <DashboardShell
        kicker="Plan posture"
        title="Where we sit"
        ariaLabel="Pricing tier ribbon"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Subscription tiers" span={1} tone="amber">
          <div className={styles.pricingRibbon}>
            <div className={styles.pricingTile}>
              <span className={styles.pricingTier}>Tier 1</span>
              <span className={styles.pricingName}>Mate-rate</span>
              <span className={styles.pricingPrice}>$89/mo · single owner</span>
            </div>
            <div className={styles.pricingTile}>
              <span className={styles.pricingTier}>Tier 2</span>
              <span className={styles.pricingName}>Workshop</span>
              <span className={styles.pricingPrice}>$249/mo · most teams</span>
            </div>
            <div className={styles.pricingTile} data-current="true">
              <span className={styles.pricingTier}>Current</span>
              <span className={styles.pricingName}>Workshop Pro</span>
              <span className={styles.pricingPrice}>$489/mo · multi-bay</span>
            </div>
          </div>
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default ExecutiveOverviewDashboard
