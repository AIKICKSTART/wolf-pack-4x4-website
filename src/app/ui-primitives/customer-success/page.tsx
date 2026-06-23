import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./customer-success.module.css"

export const metadata: Metadata = {
  title: "Customer success | UI Primitives",
  description:
    "Customer-success and health-scoring primitives — composite health score, cohort retention grid, NPS trend, churn risk, expansion opportunity, lifecycle timeline, feature adoption, success plan, QBR card, at-risk list, segment donut, support volume, renewal pipeline, and executive briefing.",
}

interface CustomerSuccessScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<CustomerSuccessScene> = [
  {
    kicker: "Primitive 01",
    title: "Customer health score",
    body: "Composite 0-100 score with tone shift and Engagement / Adoption / Sentiment / Support / Value breakdown chips.",
    href: "/ui-primitives/customer-success/customer-health-score",
    accent: "green",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Cohort retention grid",
    body: "Tone-coded grid — rows = cohort months, cols = months since signup, cells = retention percentage.",
    href: "/ui-primitives/customer-success/cohort-retention-grid",
    accent: "teal",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "NPS trend chart",
    body: "Stacked area chart of promoters / passives / detractors over time with latest NPS callout.",
    href: "/ui-primitives/customer-success/nps-trend-chart",
    accent: "green",
    glyph: "▲",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Churn risk card",
    body: "Per-customer churn probability with top risk factor chips and intervention suggestion CTA.",
    href: "/ui-primitives/customer-success/churn-risk-card",
    accent: "red",
    glyph: "▼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Expansion opportunity",
    body: "Next-best-action with expected uplift in AUD and confidence chip — upgrade, expansion, bundle, warranty.",
    href: "/ui-primitives/customer-success/expansion-opportunity-card",
    accent: "green",
    glyph: "+$",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Customer journey timeline",
    body: "Lifecycle: Acquisition → Onboarding → Adoption → Expansion → Renewal with current stage marker.",
    href: "/ui-primitives/customer-success/customer-journey-timeline",
    accent: "teal",
    glyph: "──◉──",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Feature adoption meter",
    body: "List of features with adopted / total ratios, per-row progress bars, and mo/mo delta chips.",
    href: "/ui-primitives/customer-success/feature-adoption-meter",
    accent: "teal",
    glyph: "▰▰▱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Success plan checklist",
    body: "Per-customer success plan with milestones, due dates, and todo / in-progress / done / blocked states.",
    href: "/ui-primitives/customer-success/success-plan-checklist",
    accent: "amber",
    glyph: "✓",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 09",
    title: "QBR meeting card",
    body: "Quarterly Business Review card with scheduled date, agenda items, and last-QBR outcomes.",
    href: "/ui-primitives/customer-success/qbr-meeting-card",
    accent: "teal",
    glyph: "Q",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "At-risk customers list",
    body: "Sortable data table — avatar, name, health score, last contact, lifetime value, intervention CTA.",
    href: "/ui-primitives/customer-success/at-risk-customers-list",
    accent: "red",
    glyph: "▤",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 11",
    title: "Customer segment distribution",
    body: "Donut chart — Strategic / Growth / Retention / Win-back share of book of business.",
    href: "/ui-primitives/customer-success/customer-segment-distribution",
    accent: "teal",
    glyph: "◍",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Support ticket volume",
    body: "Per-customer support ticket volume with sentiment trend sparkline and direction indicator.",
    href: "/ui-primitives/customer-success/support-ticket-volume-card",
    accent: "amber",
    glyph: "∿",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Renewal pipeline stage",
    body: "Stage chip + expected close + ACV + weighted value + likelihood and next-step copy.",
    href: "/ui-primitives/customer-success/renewal-pipeline-stage",
    accent: "amber",
    glyph: "▰",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Executive briefing",
    body: "Weekly executive briefing — top 3 wins / top 3 risks / asks for the week.",
    href: "/ui-primitives/customer-success/executive-briefing-card",
    accent: "violet",
    glyph: "✦",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full CS console",
    body: "Composes every primitive — exec briefing, health, churn, expansion, cohort grid, NPS, at-risk list, journey, QBR, segment, renewal.",
    href: "/ui-primitives/customer-success/full-console",
    accent: "violet",
    glyph: "◐▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<CustomerSuccessScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function CustomerSuccessIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Customer success / 14 primitives + composition"
        title="Customer success primitives"
        description="The retention-and-expansion stack — composite health scoring, cohort retention, NPS, churn risk, expansion opportunity, lifecycle timeline, feature adoption, success plan, QBR cards, at-risk lists, segment donut, support volume, renewal pipeline, and executive briefing. Realistic Mufflermen workshop data only; no real CS platform wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real CS platform wired
      </span>

      <section className={styles.grid} aria-label="Customer success primitives">
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
