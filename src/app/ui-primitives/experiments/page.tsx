import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./experiments.module.css"

export const metadata: Metadata = {
  title: "A/B testing + experimentation | UI Primitives",
  description:
    "Experimentation cockpit primitives for the Mufflermen workshop — experiment cards, hypothesis editor, traffic allocator, sample-size + power tools, sequential / Bayesian analyses, decision recommendations, holdout + stop-rule editors, CUPED chip, archive table, and a composed full console.",
}

interface ExpScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ExpScene> = [
  {
    kicker: "Primitive 01",
    title: "Experiment card",
    body: "Status / variant / sample / significance / lift chips composed on the shared DashboardCard surface.",
    href: "/ui-primitives/experiments/experiment-card",
    accent: "teal",
    glyph: "A/B",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Hypothesis statement",
    body: "Because-we-believe-will-cause-measured-by sentence with chip-pickable observation, change, outcome, metric, threshold.",
    href: "/ui-primitives/experiments/hypothesis-statement-card",
    accent: "amber",
    glyph: "?→!",
    state: "Stateful · picker",
  },
  {
    kicker: "Primitive 03",
    title: "Variant traffic allocator",
    body: "Stacked allocation bar + per-variant sliders + must-sum-to-100 indicator. Composes VariantPicker.",
    href: "/ui-primitives/experiments/variant-traffic-allocator",
    accent: "teal",
    glyph: "▮▮▮",
    state: "Stateful · sliders",
  },
  {
    kicker: "Primitive 04",
    title: "Sample size calculator",
    body: "Baseline + MDE + power + variants → required N per variant + total N + estimated time-to-detect chip.",
    href: "/ui-primitives/experiments/sample-size-calculator",
    accent: "green",
    glyph: "Σn",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 05",
    title: "Significance threshold",
    body: "α radio (0.01 / 0.05 / 0.10), one-sided / two-sided toggle, correction picker (Bonferroni / FDR / None).",
    href: "/ui-primitives/experiments/significance-threshold-setter",
    accent: "amber",
    glyph: "α",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 06",
    title: "Stat power gauge",
    body: "Current power radial meter + tone-shifting + sample-size needed-to-reach-target chip. Composes RadialMeter.",
    href: "/ui-primitives/experiments/stat-power-gauge",
    accent: "green",
    glyph: "1−β",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Multi-arm bandit",
    body: "Per-arm traffic flow over time + exploration / exploitation balance chip + winning-arm prediction chip.",
    href: "/ui-primitives/experiments/multi-arm-bandit-visualizer",
    accent: "teal",
    glyph: "MAB",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Holdout group toggle",
    body: "Enable / disable + holdout % slider + audience filter chips. Composes RolloutSlider.",
    href: "/ui-primitives/experiments/holdout-group-toggle",
    accent: "amber",
    glyph: "▤▥",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 09",
    title: "Sequential testing",
    body: "Peeking-corrected p-value curve + early-stopping α boundary annotation. Composes AreaChart.",
    href: "/ui-primitives/experiments/sequential-test-viewer",
    accent: "teal",
    glyph: "Σp",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Bayesian posterior",
    body: "Density curve per variant + 95% credible-interval overlays + P(beat baseline) chip per arm.",
    href: "/ui-primitives/experiments/bayesian-posterior-chart",
    accent: "green",
    glyph: "P(θ|D)",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Decision recommendation",
    body: "Recommendation chip (Ship / Continue / Stop loss / Insufficient power) + reasoning + expected impact + confidence.",
    href: "/ui-primitives/experiments/decision-recommendation-card",
    accent: "green",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Experiment archive",
    body: "Sortable archive table — ran-from / ran-to / winner / final lift / decision / retrospective link. Composes DataTable.",
    href: "/ui-primitives/experiments/experiment-archive",
    accent: "neutral",
    glyph: "⌖▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Stop rule editor",
    body: "Stop condition chips (Min sample / Significance / Time / Manual / Guardrail) with per-rule thresholds.",
    href: "/ui-primitives/experiments/stop-rule-editor",
    accent: "red",
    glyph: "■",
    state: "Stateful · rules",
  },
  {
    kicker: "Primitive 14",
    title: "CUPED variance",
    body: "CUPED variance-reduction chip — % reduction + covariate + power-points-gained chip.",
    href: "/ui-primitives/experiments/cuped-variance-reduction-chip",
    accent: "teal",
    glyph: "σ²↓",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full console",
    body: "Composed cockpit wiring experiment list + hypothesis + traffic + sample size + significance + power + bandit + holdout + sequential + Bayesian + decision + stop rules + CUPED + archive.",
    href: "/ui-primitives/experiments/full-console",
    accent: "teal",
    glyph: "▦▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ExpScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function ExperimentsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Experiments / 14 primitives + composition"
        title="A/B testing + experimentation primitives"
        description="Visual primitives for the Mufflermen experimentation cockpit — built against real workshop hypotheses (quote-instant-pricing, parts-3d-viewer-hero, bay-availability-realtime). Conversion + AUD ARPV + booking completion metrics. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Experiment primitives">
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
