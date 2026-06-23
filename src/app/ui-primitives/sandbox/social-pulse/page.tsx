import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Eye, Heart, MessageSquare, Repeat2 } from "lucide-react"

import {
  AreaChart,
  BarChart,
  HeatmapCalendar,
  type AreaSeries,
  type BarSeries,
  type HeatCell,
} from "../../components/charts"
import { ButtonDnaLink } from "../../components/button-dna-link"

import styles from "./social-pulse.module.css"

export const metadata: Metadata = {
  title: "Muffler Pulse dashboard slice | UI Primitives — Sandbox",
  description:
    "Sandbox surface for a Muffler Pulse mini-dashboard composing area-chart, bar-chart, and heatmap-calendar.",
}

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const audienceSeries: AreaSeries[] = [
  { label: "Instagram", values: [320, 380, 360, 420, 480, 540, 610], tone: "red" },
  { label: "TikTok", values: [180, 220, 260, 320, 340, 380, 460], tone: "teal" },
  { label: "YouTube", values: [60, 80, 90, 110, 140, 180, 220], tone: "amber" },
]

const engagementSeries: BarSeries[] = [
  { label: "Saves", values: [42, 58, 71, 64, 88, 110, 132], tone: "amber" },
  { label: "Shares", values: [12, 18, 24, 22, 36, 48, 62], tone: "teal" },
  { label: "Replies", values: [6, 9, 14, 11, 18, 22, 28], tone: "green" },
]

// Build a deterministic 12-week heatmap (84 cells) of publishing cadence.
function buildHeatmapCells(): HeatCell[] {
  const cells: HeatCell[] = []
  const start = new Date("2026-03-02T00:00:00Z")
  for (let week = 0; week < 12; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start)
      date.setUTCDate(start.getUTCDate() + week * 7 + day)
      // Deterministic pseudo-value: peaks midweek + Saturdays, valleys on Sundays/Tuesdays.
      const base = (day + 1) * (week % 3) + ((week * 3 + day * 7) % 6)
      const peak = day === 5 ? 4 : day === 0 ? 0 : 0
      const value = Math.max(0, Math.min(8, base + peak))
      cells.push({ date: date.toISOString().slice(0, 10), value })
    }
  }
  return cells
}

const heatmapCells = buildHeatmapCells()

const monthLabels = ["Mar", "", "", "Apr", "", "", "May", "", "", "Jun", "", ""]

const summaryStats = [
  { label: "Reach", value: "184.2K", delta: "+18%", icon: Eye, tone: "teal" as const },
  { label: "Engagement", value: "7.8%", delta: "+1.4 pp", icon: Heart, tone: "red" as const },
  { label: "Replies", value: "412", delta: "+12%", icon: MessageSquare, tone: "amber" as const },
  { label: "Reposts", value: "186", delta: "+8%", icon: Repeat2, tone: "green" as const },
]

export default function SocialPulseSandbox() {
  return (
    <main className={styles.page} aria-labelledby="social-pulse-title">
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Sandbox · Muffler Pulse slice</span>
          <h1 id="social-pulse-title" className={styles.headline}>
            Workshop social signal at a glance
          </h1>
          <p className={styles.subhead}>
            Sliced version of the Muffler Pulse dashboard. Stacked area shows the audience
            mix across three channels; grouped bars compare engagement types day by day; the
            12-week heatmap reveals the publishing cadence and quiet weeks at a glance.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)", justifyContent: "flex-end" }}>
          <ButtonDnaLink />
          <Link href="/ui-primitives/sandbox" className={styles.backLink}>
            <ArrowUpRight aria-hidden="true" />
            Back to sandbox
          </Link>
        </div>
      </header>

      <section className={styles.statsRow} aria-label="Headline social stats">
        {summaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label} className={styles.statCard} data-tone={stat.tone}>
              <span className={styles.statIcon} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
              <strong className={styles.statValue}>{stat.value}</strong>
              <span className={styles.statDelta}>{stat.delta}</span>
            </article>
          )
        })}
      </section>

      <section className={styles.chartRow} aria-label="Audience and engagement charts">
        <article className={styles.chartCard}>
          <header className={styles.chartHead}>
            <span className={styles.chartKicker}>Audience growth · 7 days</span>
            <h2 className={styles.chartTitle}>Stacked reach by channel</h2>
          </header>
          <AreaChart
            ariaLabel="Stacked weekly reach by channel: Instagram, TikTok, YouTube"
            series={audienceSeries}
            xLabels={weekLabels}
            unit=""
          />
        </article>

        <article className={styles.chartCard}>
          <header className={styles.chartHead}>
            <span className={styles.chartKicker}>Engagement breakdown · 7 days</span>
            <h2 className={styles.chartTitle}>Saves / shares / replies</h2>
          </header>
          <BarChart
            ariaLabel="Grouped daily engagement counts: saves, shares, replies"
            series={engagementSeries}
            xLabels={weekLabels}
            mode="grouped"
          />
        </article>
      </section>

      <section className={styles.heatmapSection} aria-label="Publishing cadence heatmap">
        <header className={styles.heatmapHead}>
          <span className={styles.chartKicker}>Publishing cadence · 12 weeks</span>
          <h2 className={styles.chartTitle}>When the workshop ships content</h2>
        </header>
        <HeatmapCalendar
          ariaLabel="GitHub-style heatmap of posts published per day across 12 weeks"
          cells={heatmapCells}
          tone="teal"
          weeks={12}
          monthLabels={monthLabels}
        />
      </section>
    </main>
  )
}
