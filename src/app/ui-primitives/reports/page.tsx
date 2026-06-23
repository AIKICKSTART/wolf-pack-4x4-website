import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./reports.module.css"

export const metadata: Metadata = {
  title: "Reports + scheduled delivery | UI Primitives",
  description:
    "Reports, exports and scheduled-delivery primitives — builder canvas, saved reports, schedule + format pickers, run history, pivot, filter tree, KPI tiles, drilldown and share.",
}

interface ReportScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ReportScene> = [
  {
    kicker: "Primitive 01",
    title: "Report builder canvas",
    body: "Three-pane drag canvas — field library, drop zones, live preview.",
    href: "/ui-primitives/reports/report-builder-canvas",
    accent: "red",
    glyph: "⊞",
    state: "Stateful · DnD",
  },
  {
    kicker: "Primitive 02",
    title: "Saved report card",
    body: "Tile with owner, last-run, schedule chip, and report-level actions.",
    href: "/ui-primitives/reports/saved-report-card",
    accent: "teal",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Schedule report form",
    body: "Frequency segments, recipients, format picker, attach-data toggle.",
    href: "/ui-primitives/reports/schedule-report-form",
    accent: "amber",
    glyph: "◷",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 04",
    title: "Export format picker",
    body: "PDF / CSV / Excel / JSON / Parquet with file-size chip and trim toggle.",
    href: "/ui-primitives/reports/export-format-picker",
    accent: "green",
    glyph: "↓",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 05",
    title: "Run history table",
    body: "DataTable run log — timestamp, duration, rows, size, status, download.",
    href: "/ui-primitives/reports/report-run-history-table",
    accent: "teal",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Pivot table preview",
    body: "Compact pivot — row + col headers, cells, subtotals, totals row.",
    href: "/ui-primitives/reports/pivot-table-preview",
    accent: "amber",
    glyph: "⊟",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Filter builder tree",
    body: "Nested AND/OR groups, add/remove conditions, WHERE preview.",
    href: "/ui-primitives/reports/filter-builder-tree",
    accent: "violet",
    glyph: "⌥",
    state: "Stateful · tree",
  },
  {
    kicker: "Primitive 08",
    title: "Date range presets",
    body: "Quick chip row — Today, Last 7, This month, YTD, Custom.",
    href: "/ui-primitives/reports/date-range-presets",
    accent: "red",
    glyph: "▩",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 09",
    title: "KPI snapshot tile",
    body: "Label, value, delta, comparison, sparkline, drill-down arrow.",
    href: "/ui-primitives/reports/kpi-snapshot-tile",
    accent: "green",
    glyph: "▲",
    state: "Stateless · live",
  },
  {
    kicker: "Primitive 10",
    title: "Subscription row",
    body: "Subscriber identity, frequency chip, last-sent, unsubscribe.",
    href: "/ui-primitives/reports/report-subscription-row",
    accent: "teal",
    glyph: "@",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Scheduled delivery preview",
    body: "How the email/Slack will appear — from, subject, preheader, mini chart.",
    href: "/ui-primitives/reports/scheduled-delivery-preview",
    accent: "amber",
    glyph: "✉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Period comparison strip",
    body: "Current vs prior period with delta chip and trend mini sparkline.",
    href: "/ui-primitives/reports/period-comparison-strip",
    accent: "violet",
    glyph: "↔",
    state: "Stateless · live",
  },
  {
    kicker: "Primitive 13",
    title: "Drilldown inspector",
    body: "Breakdown rows with bars and contributing dimensions.",
    href: "/ui-primitives/reports/drilldown-inspector",
    accent: "red",
    glyph: "▷",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Report share card",
    body: "Public URL chip, expiry, access scopes, embed code.",
    href: "/ui-primitives/reports/report-share-card",
    accent: "green",
    glyph: "↗",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full builder",
    body: "Canvas + filter tree + presets + KPI row + comparison + run history.",
    href: "/ui-primitives/reports/full-builder",
    accent: "red",
    glyph: "⊞◷",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ReportScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function ReportsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Reports / 14 primitives + composition"
        title="Reports, exports, scheduled delivery"
        description="The pivot-builder, schedule-and-deliver, KPI-snapshot stack. Weekly bay utilisation, monthly Manta sales, quarterly LTV, suburb conversion — visual references with realistic Oak Flats data; no real export wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real export wired
      </span>

      <section className={styles.grid} aria-label="Report primitives">
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
