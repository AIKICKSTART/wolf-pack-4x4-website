import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./status-page.module.css"

export const metadata: Metadata = {
  title: "Status page + observability | UI Primitives",
  description:
    "Status-page, observability and SLO primitives for the Mufflermen workshop — service rows, region grids, incidents, maintenance banners, SLOs, error budget, synthetic checks, latency percentiles, alerts, postmortems and a composed public status page.",
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
    title: "Service status row",
    body: "Service name, status chip (Operational / Degraded / Outage / Maintenance) plus the canonical 90-day uptime square grid with percentage.",
    href: "/ui-primitives/status-page/service-status-row",
    accent: "green",
    glyph: "▮▮▮▮▮",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Region status grid",
    body: "AU-East, AU-West, US-East, US-West, EU-Central, APAC cells with status dot, latency chip and region label.",
    href: "/ui-primitives/status-page/region-status-grid",
    accent: "teal",
    glyph: "◳◳◳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Incident card",
    body: "Title, severity chip, four-stage timeline (Investigating → Identified → Monitoring → Resolved), scope chips and subscribe CTA.",
    href: "/ui-primitives/status-page/incident-card",
    accent: "red",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Maintenance window banner",
    body: "Top banner — scheduled / in-progress / completed maintenance with start, end, impact summary and affected services.",
    href: "/ui-primitives/status-page/maintenance-window-banner",
    accent: "teal",
    glyph: "⚒",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Uptime sparkline row",
    body: "Compact row — service name plus 24h sparkline plus p99 latency plus current error rate.",
    href: "/ui-primitives/status-page/uptime-sparkline-row",
    accent: "green",
    glyph: "▁▂▃▅▇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Service map graph",
    body: "SVG dependency graph — nodes plus tone-coded edges with arrowheads and zoom in/out/reset controls.",
    href: "/ui-primitives/status-page/service-map-graph",
    accent: "violet",
    glyph: "○─○",
    state: "Stateful · zoom",
  },
  {
    kicker: "Primitive 07",
    title: "Subscribe updates",
    body: "Inline subscribe form — email / SMS channel toggle, endpoint input, frequency picker and privacy note.",
    href: "/ui-primitives/status-page/subscribe-updates-input",
    accent: "amber",
    glyph: "@",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 08",
    title: "Status history table",
    body: "Historical incident table built on DataTable — date, service, title, severity chip, duration and stage.",
    href: "/ui-primitives/status-page/status-history-table",
    accent: "neutral",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Postmortem card",
    body: "Title, date, author, 5-Whys, action items with owners and a lessons-learned panel.",
    href: "/ui-primitives/status-page/postmortem-card",
    accent: "violet",
    glyph: "5W",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "SLO dashboard tile",
    body: "Objective, actual, status chip and remaining error-budget meter scoped to a 30-day or 90-day window.",
    href: "/ui-primitives/status-page/slo-dashboard-tile",
    accent: "teal",
    glyph: "99.95",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Error budget gauge",
    body: "Half-arc gauge showing % consumed / remaining with tone shifting (green / amber / red), burn rate chip and trend sparkline.",
    href: "/ui-primitives/status-page/error-budget-gauge",
    accent: "amber",
    glyph: "◜◝",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Synthetic check timeline",
    body: "Per-region synthetic check — pass / fail / timeout dots laid out on a 24h axis with a small legend.",
    href: "/ui-primitives/status-page/synthetic-check-timeline",
    accent: "green",
    glyph: "● ● ●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Latency percentile strip",
    body: "Side-by-side bars for p50 / p75 / p90 / p95 / p99 / p99.9 with current ms values and a p95 budget chip.",
    href: "/ui-primitives/status-page/latency-percentile-strip",
    accent: "teal",
    glyph: "▂▃▄▅▆▇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Active alerts inbox",
    body: "Inbox of firing alerts — title, service, severity, age, assignee avatar and an ack / resolve cycle button.",
    href: "/ui-primitives/status-page/active-alerts-inbox",
    accent: "red",
    glyph: "!",
    state: "Stateful · ack",
  },
  {
    kicker: "Composition",
    title: "Full status page",
    body: "Public-facing composition — maintenance banner, service rows, region grid, active incident, uptime list, subscribe footer, history table.",
    href: "/ui-primitives/status-page/full-status-page",
    accent: "red",
    glyph: "▣▣",
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

export default function StatusPageIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Status page / 14 primitives + composition"
        title="Status page + observability primitives"
        description="Visual primitives for the Mufflermen public status page and the internal observability surfaces behind it. Real workshop signals — Quote engine, Parts catalogue, Workshop scheduler, Customer SMS, Payment gateway across AU-East-1 (Sydney) and AU-West-1 (Perth). Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Status page primitives">
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
