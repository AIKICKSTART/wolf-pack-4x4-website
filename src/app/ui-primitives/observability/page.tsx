import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./observability.module.css"

export const metadata: Metadata = {
  title: "Observability cockpit | UI Primitives",
  description:
    "Datadog/Honeycomb-style observability primitives for the Mufflermen platform — metric tiles, query builder, dashboard grid, alert rules, log streams, distributed-trace flame graphs, span detail, service maps, error budget burndown, SLOs, correlation heatmaps, anomaly strips, synthetic tests and an incident timeline.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Metric tile",
    body: "Single-metric tile with current value, unit, delta chip, sparkline trend and a small service caption.",
    href: "/ui-primitives/observability/metric-tile",
    accent: "teal",
    glyph: "142ms",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Query builder",
    body: "Visual metric query builder — metric picker, filter chips and toggleable group-by chips with a live query preview.",
    href: "/ui-primitives/observability/query-builder",
    accent: "violet",
    glyph: "Σ",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 03",
    title: "Dashboard grid",
    body: "12-column dashboard grid with neuomorphic tiles, drag-handle hint, sub-titles and arbitrary tile content.",
    href: "/ui-primitives/observability/dashboard-grid",
    accent: "neutral",
    glyph: "▦▦▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Alert rule card",
    body: "Alert rule card — threshold + operator + current value + tone-shifting state chip + last-triggered footer.",
    href: "/ui-primitives/observability/alert-rule-card",
    accent: "red",
    glyph: "!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Log stream table",
    body: "Streaming log table with severity chips, severity filter row and structured key/value fields per row.",
    href: "/ui-primitives/observability/log-stream-table",
    accent: "amber",
    glyph: "▤▤",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 06",
    title: "Trace flame graph",
    body: "Distributed-trace flame graph with stacked bars per span, depth-based rows and click-to-select highlighting.",
    href: "/ui-primitives/observability/trace-flame-graph",
    accent: "violet",
    glyph: "▰▰▰",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 07",
    title: "Span detail pane",
    body: "Span detail — trace + span IDs, operation, kind, duration, error chip, tag list and linked log lines.",
    href: "/ui-primitives/observability/span-detail-pane",
    accent: "teal",
    glyph: "{·}",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Service map graph",
    body: "Observability-style service dependency map with throughput-labelled edges and click-to-inspect nodes.",
    href: "/ui-primitives/observability/service-map-graph",
    accent: "violet",
    glyph: "○─◐",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 09",
    title: "Error budget burndown",
    body: "Burndown chart — ideal vs actual remaining budget with tone shift, end marker and a compact trend sparkline.",
    href: "/ui-primitives/observability/error-budget-burndown",
    accent: "amber",
    glyph: "↘",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "SLO card",
    body: "Compact SLO card — objective vs actual, window selector, budget remaining radial gauge and health chip.",
    href: "/ui-primitives/observability/slo-card",
    accent: "green",
    glyph: "99.5",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Correlation matrix",
    body: "Pearson-style heatmap of correlations between metrics with tone-coded cells and a -1 / 0 / +1 legend.",
    href: "/ui-primitives/observability/correlation-matrix",
    accent: "teal",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Anomaly detection strip",
    body: "Time series with annotated outliers, tone-coded markers per anomaly kind and a list of detected events.",
    href: "/ui-primitives/observability/anomaly-detection-strip",
    accent: "amber",
    glyph: "↯",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Synthetic test row",
    body: "Per-test row — name, kind, region, last outcome chip, latency chip and 30-day uptime micro-stat.",
    href: "/ui-primitives/observability/synthetic-test-row",
    accent: "green",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Incident timeline",
    body: "Operational incident timeline with detect / page / ack / mitigate / comm / resolve events and impact chips.",
    href: "/ui-primitives/observability/incident-timeline",
    accent: "red",
    glyph: "│●",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full cockpit",
    body: "Internal-facing composition — metric tiles, query bar, service map, dashboard grid, log stream, traces, SLOs and a live incident timeline.",
    href: "/ui-primitives/observability/full-cockpit",
    accent: "violet",
    glyph: "▣▣▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function ObservabilityIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Observability / 14 primitives + composition"
        title="Observability cockpit primitives"
        description="An internal Datadog / Honeycomb-style cockpit covering metrics, logs, traces, SLOs, synthetic tests and incident response. Wired against the Mufflermen platform services — quotes-api, parts-catalogue, workshop-scheduler, quote-pdf — running across AU-East-1, AU-West-1 and APAC. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Observability primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
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
