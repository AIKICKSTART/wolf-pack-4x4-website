import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./reports-deep.module.css"

export const metadata: Metadata = {
  title: "Deep analytics + reporting | UI Primitives",
  description:
    "Deep analytics primitives — drag-drop builder, pivot, drilldown, cohorts, forecasts, anomalies, goals, data sources and share.",
}

interface DeepScene {
  readonly kicker: string
  readonly title: string
  readonly body: string
  readonly href: string
  readonly accent: "teal" | "amber" | "red" | "green" | "violet"
  readonly glyph: string
  readonly state: string
}

const SCENES: ReadonlyArray<DeepScene> = [
  {
    kicker: "Primitive 01",
    title: "Report builder canvas",
    body: "Drag-drop canvas: filter chips, dimensions, measures, chart kind picker.",
    href: "/ui-primitives/reports-deep/report-builder-canvas",
    accent: "red",
    glyph: "⊞",
    state: "Stateful · DnD",
  },
  {
    kicker: "Primitive 02",
    title: "Scheduled export row",
    body: "Cron expression, format chip, recipients across email/slack/teams/webhook.",
    href: "/ui-primitives/reports-deep/scheduled-export-row",
    accent: "amber",
    glyph: "◷",
    state: "Stateful · switch",
  },
  {
    kicker: "Primitive 03",
    title: "Filter panel",
    body: "Left-rail filters — date range, select, numeric range, chip groups, search.",
    href: "/ui-primitives/reports-deep/filter-panel",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 04",
    title: "Dashboard pin grid",
    body: "Pinnable widget grid that re-flows pinned tiles to the top of the layout.",
    href: "/ui-primitives/reports-deep/dashboard-pin-grid",
    accent: "violet",
    glyph: "▦",
    state: "Stateful · pin",
  },
  {
    kicker: "Primitive 05",
    title: "KPI card · large",
    body: "Goal arc + delta chip + comparison + sparkline footer.",
    href: "/ui-primitives/reports-deep/kpi-card-large",
    accent: "green",
    glyph: "◐",
    state: "Stateless · arc",
  },
  {
    kicker: "Primitive 06",
    title: "Drill-down panel",
    body: "Stack with breadcrumb — drill into the next dimension level inline.",
    href: "/ui-primitives/reports-deep/drill-down-panel",
    accent: "red",
    glyph: "▷",
    state: "Stateful · stack",
  },
  {
    kicker: "Primitive 07",
    title: "Pivot table",
    body: "Row + column grouping, measure picker, subtotals, grand total.",
    href: "/ui-primitives/reports-deep/pivot-table",
    accent: "amber",
    glyph: "⊟",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 08",
    title: "Funnel comparison card",
    body: "Period-over-period funnel — current vs prior, deltas per stage.",
    href: "/ui-primitives/reports-deep/funnel-comparison-card",
    accent: "teal",
    glyph: "▽",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Cohort grid",
    body: "Retention / revenue / engagement heatmap with metric toggle.",
    href: "/ui-primitives/reports-deep/cohort-grid",
    accent: "violet",
    glyph: "▩",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 10",
    title: "Forecast chart card",
    body: "Actual + forecast + confidence band with split-point marker.",
    href: "/ui-primitives/reports-deep/forecast-chart-card",
    accent: "green",
    glyph: "≈",
    state: "Stateless · svg",
  },
  {
    kicker: "Primitive 11",
    title: "Anomaly callout row",
    body: "Severity chip, deviation, reason, detected-at timestamp, investigate CTA.",
    href: "/ui-primitives/reports-deep/anomaly-callout-row",
    accent: "red",
    glyph: "!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Goal tracker card",
    body: "Target + projected + variance with status chip and progress bar.",
    href: "/ui-primitives/reports-deep/goal-tracker-card",
    accent: "amber",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Data source row",
    body: "Connected source — state dot, record count, refresh, last/next sync.",
    href: "/ui-primitives/reports-deep/data-source-row",
    accent: "teal",
    glyph: "⇄",
    state: "Stateful · refresh",
  },
  {
    kicker: "Primitive 14",
    title: "Share report card",
    body: "Link / embed / email / Slack tabs with permission picker + access list.",
    href: "/ui-primitives/reports-deep/share-report-card",
    accent: "green",
    glyph: "↗",
    state: "Stateful · tabs",
  },
  {
    kicker: "Composition",
    title: "Full analytics",
    body: "Builder + filters + pivot + cohort + forecast + anomalies + goals + share.",
    href: "/ui-primitives/reports-deep/full-analytics",
    accent: "red",
    glyph: "⊞◷",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<DeepScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function ReportsDeepIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Reports-deep / 14 primitives + composition"
        title="Deep analytics + reporting"
        description="The advanced analytics stack — drag-drop builder, scheduled exports, filter rails, pinnable dashboards, drilldown panels, pivot, funnel, cohorts, forecasts, anomalies, goals, data sources and share. Realistic Mufflermen weekly revenue $42,180, dyno bookings, parts margin and suburb performance (Wollongong $18k vs Albion Park $4.2k)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — no live data wired</span>

      <section className={styles.grid} aria-label="Deep reports primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
