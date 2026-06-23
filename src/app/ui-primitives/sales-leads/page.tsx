import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./sales-leads.module.css"

export const metadata: Metadata = {
  title: "Sales leads | UI Primitives",
  description:
    "Top-of-funnel sales-lead primitives — lead card, source mix donut, BANT qualification, score breakdown, inquiry capture, call log, lead-to-quote funnel, assignment rules, follow-up cadence, ROI table, enrichment chip, lost-reason Pareto, SLA timer, import wizard. Realistic Mufflermen data only.",
}

interface SalesLeadsScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<SalesLeadsScene> = [
  {
    kicker: "Primitive 01",
    title: "Lead card",
    body: "Lead profile — name, vehicle, source chip, score chip, first-touch, assigned-to.",
    href: "/ui-primitives/sales-leads/lead-card",
    accent: "red",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Source mix donut",
    body: "Donut of lead sources — Website / Phone / Walk-in / Referral / Social / Ad.",
    href: "/ui-primitives/sales-leads/source-mix",
    accent: "teal",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Qualification checklist",
    body: "BANT / MEDDIC checklist with per-criterion state cycle and live completion meter.",
    href: "/ui-primitives/sales-leads/qualification-checklist",
    accent: "green",
    glyph: "✓",
    state: "Stateful · cycle",
  },
  {
    kicker: "Primitive 04",
    title: "Lead score breakdown",
    body: "0-100 score — positive and negative signal lists with per-row reasoning chips.",
    href: "/ui-primitives/sales-leads/score-breakdown",
    accent: "amber",
    glyph: "▲",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Inquiry form capture",
    body: "Form preview + per-field conversion rate, 14-day sparkline, required vs. optional split.",
    href: "/ui-primitives/sales-leads/inquiry-capture",
    accent: "teal",
    glyph: "▢",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Phone call log row",
    body: "Caller + duration + outcome chip + direction icon + recording playback.",
    href: "/ui-primitives/sales-leads/call-log",
    accent: "amber",
    glyph: "☎",
    state: "Stateful · play",
  },
  {
    kicker: "Primitive 07",
    title: "Lead-to-quote funnel",
    body: "Five-stage funnel — Lead → MQL → SQL → Quote → Won — with count, value, drop-off.",
    href: "/ui-primitives/sales-leads/funnel",
    accent: "red",
    glyph: "▼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Assignment rules",
    body: "Priority list of auto-assignment rules with reorder controls and per-rule match count.",
    href: "/ui-primitives/sales-leads/assignment-rules",
    accent: "amber",
    glyph: "⚙",
    state: "Stateful · reorder",
  },
  {
    kicker: "Primitive 09",
    title: "Follow-up cadence",
    body: "Six-touch cadence card — type, day offset, status chip, vertical timeline.",
    href: "/ui-primitives/sales-leads/follow-up-cadence",
    accent: "teal",
    glyph: "│●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Source ROI table",
    body: "Spend / leads / cost-per-lead / quote-conversion / closed-won / AUD revenue per source.",
    href: "/ui-primitives/sales-leads/roi-table",
    accent: "amber",
    glyph: "$",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 11",
    title: "Enrichment chip",
    body: "Tiny chip — enriched field count + provider popover (ABN Lookup, Hunter, Clearbit).",
    href: "/ui-primitives/sales-leads/enrichment-chip",
    accent: "green",
    glyph: "✦",
    state: "Stateful · popover",
  },
  {
    kicker: "Primitive 12",
    title: "Lost-reason Pareto",
    body: "Bar + cumulative list — 80/20 view of why leads die before conversion.",
    href: "/ui-primitives/sales-leads/lost-reason-pareto",
    accent: "red",
    glyph: "▮▯",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "SLA response timer",
    body: "Live countdown with tone-shifting — fresh → due-soon → overdue → missed.",
    href: "/ui-primitives/sales-leads/sla-timer",
    accent: "red",
    glyph: "⏱",
    state: "Stateful · tick",
  },
  {
    kicker: "Primitive 14",
    title: "Lead import wizard",
    body: "Upload → map columns → dedup → preview → import. Five guided steps.",
    href: "/ui-primitives/sales-leads/lead-import",
    accent: "violet",
    glyph: "▤",
    state: "Stateful · wizard",
  },
  {
    kicker: "Composition",
    title: "Full sales-leads console",
    body: "Every primitive composed — top-of-funnel command center for inbound leads.",
    href: "/ui-primitives/sales-leads/full-console",
    accent: "red",
    glyph: "◉▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<SalesLeadsScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function SalesLeadsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Sales leads / 14 primitives + composition"
        title="Sales-lead primitives"
        description="Top-of-funnel — lead capture, qualification, scoring, source mix, ROI, assignment, cadence, SLA, and CSV import. Distinct from CRM (later stage). Realistic Mufflermen data only; no real CRM wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real lead store wired
      </span>

      <section className={styles.grid} aria-label="Sales-lead primitives">
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
