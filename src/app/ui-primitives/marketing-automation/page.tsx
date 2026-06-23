import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Marketing automation | UI Primitives",
  description:
    "Marketing-automation primitives — journey canvas, lead scoring, drip rows, audience builder, abandoned-quote nudge, win-back, goal funnel, send-time predictor, A/B variant cards, consent state, budget pacing, engagement decay.",
}

interface AutomationScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AutomationScene> = [
  {
    kicker: "Primitive 01",
    title: "Journey canvas",
    body: "Node-and-edge canvas for trigger → branch → action flows with edge labels and a live-count summary.",
    href: "/ui-primitives/marketing-automation/journey-canvas",
    accent: "teal",
    glyph: "◇─◈",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 02",
    title: "Journey node card",
    body: "Single trigger / wait / condition / action / goal / exit node with kind, glyph, configure CTA.",
    href: "/ui-primitives/marketing-automation/journey-node-card",
    accent: "amber",
    glyph: "▭",
    state: "Stateful · active",
  },
  {
    kicker: "Primitive 03",
    title: "Drip sequence row",
    body: "Email / SMS / task / webhook step row with delay chips, open + click rates, status indicator.",
    href: "/ui-primitives/marketing-automation/drip-sequence-row",
    accent: "green",
    glyph: "○─○",
    state: "Stateless · row",
  },
  {
    kicker: "Primitive 04",
    title: "Lead score matrix",
    body: "Firmographic × behavioural score grid with MQL → SQL threshold and heat-colour scale.",
    href: "/ui-primitives/marketing-automation/lead-score-matrix",
    accent: "amber",
    glyph: "▦",
    state: "Stateless · grid",
  },
  {
    kicker: "Primitive 05",
    title: "Audience builder",
    body: "Visual AND/OR rule builder with predicate cards and live estimated-reach delta.",
    href: "/ui-primitives/marketing-automation/audience-builder",
    accent: "green",
    glyph: "∧∨",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 06",
    title: "Abandoned quote nudge",
    body: "Quote-abandonment recovery card showing the SMS → email → call cadence and incentive.",
    href: "/ui-primitives/marketing-automation/abandoned-quote-nudge",
    accent: "red",
    glyph: "!◷",
    state: "Stateless · card",
  },
  {
    kicker: "Primitive 07",
    title: "Win-back campaign card",
    body: "Lapsed-customer campaign with cohort size, projected revenue and incentive footnote.",
    href: "/ui-primitives/marketing-automation/win-back-campaign-card",
    accent: "teal",
    glyph: "↻",
    state: "Stateless · card",
  },
  {
    kicker: "Primitive 08",
    title: "Goal funnel card",
    body: "Single-goal funnel with conversion rate, per-step drop-off and monetary value.",
    href: "/ui-primitives/marketing-automation/goal-funnel-card",
    accent: "green",
    glyph: "▼▼",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 09",
    title: "Personalization token row",
    body: "Merge-tag row with rendered preview, source attribution and fallback indicator.",
    href: "/ui-primitives/marketing-automation/personalization-token-row",
    accent: "amber",
    glyph: "{{}}",
    state: "Stateless · row",
  },
  {
    kicker: "Primitive 10",
    title: "Send-time optimizer",
    body: "Per-recipient best-time predictor with confidence chip and previous-send delta.",
    href: "/ui-primitives/marketing-automation/send-time-optimizer",
    accent: "teal",
    glyph: "◷◷◷",
    state: "Stateless · list",
  },
  {
    kicker: "Primitive 11",
    title: "Creative variant card",
    body: "Subject/body variant card with A/B winner indicator, metrics and traffic-split bar.",
    href: "/ui-primitives/marketing-automation/creative-variant-card",
    accent: "amber",
    glyph: "A·B",
    state: "Stateless · card",
  },
  {
    kicker: "Primitive 12",
    title: "Consent state tile",
    body: "Opt-in status with double-confirm timeline and an unsubscribe-link CTA.",
    href: "/ui-primitives/marketing-automation/consent-state-tile",
    accent: "violet",
    glyph: "✓?",
    state: "Stateless · tile",
  },
  {
    kicker: "Primitive 13",
    title: "Campaign budget panel",
    body: "Daily budget panel with spend-curve SVG and pacing chip (even / ahead / behind).",
    href: "/ui-primitives/marketing-automation/campaign-budget-panel",
    accent: "red",
    glyph: "$◷",
    state: "Stateless · curve",
  },
  {
    kicker: "Primitive 14",
    title: "Engagement decay chart",
    body: "Engagement half-life curve per channel with summary tiles and dashed half-life markers.",
    href: "/ui-primitives/marketing-automation/engagement-decay-chart",
    accent: "teal",
    glyph: "↘↘↘",
    state: "Stateless · chart",
  },
  {
    kicker: "Composition",
    title: "Full live orchestrator",
    body: "All fourteen primitives composed into one live marketing-automation orchestrator surface.",
    href: "/ui-primitives/marketing-automation/full-orchestrator",
    accent: "red",
    glyph: "◇▭○",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<AutomationScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function MarketingAutomationIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Marketing automation / 14 primitives + composition"
        title="Marketing automation primitives"
        description="The Mufflermen automation stack — journey canvas, drip cadence rows, lead-score matrix, audience builder, abandoned-quote nudge, win-back card, goal funnel, personalisation tokens, send-time optimizer, A/B variants, consent state, budget pacing and engagement decay. Visual reference only — no real sends wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing automation" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real sends wired
      </span>

      <section
        className={styles.grid}
        aria-label="Marketing automation primitives"
      >
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
