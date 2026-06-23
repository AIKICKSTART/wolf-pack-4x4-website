import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./ab-runtime.module.css"

export const metadata: Metadata = {
  title: "A/B runtime + experimentation | UI Primitives",
  description:
    "Live A/B runtime primitives for the Mufflermen workshop — running experiment cards, variant editor pair, stat-sig calculator, allocation slider, holdout + early-stopping rules, lift chart with CI band, primary metric tile, segment + funnel breakdown rows, SRM banner, decision recommendation, history rows, and a linked feature-flag row.",
}

interface AbRuntimeScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AbRuntimeScene> = [
  {
    kicker: "Primitive 01",
    title: "Experiment dashboard card",
    body: "Running experiment card — status, arms (control vs treatment), winner indicator, exposed count, lift chip.",
    href: "/ui-primitives/ab-runtime/experiment-dashboard-card",
    accent: "teal",
    glyph: "A/B",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Variant editor pair",
    body: "Side-by-side control vs treatment editor with live char diff. Headline + body inputs per arm.",
    href: "/ui-primitives/ab-runtime/variant-editor-pair",
    accent: "teal",
    glyph: "C|T",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 03",
    title: "Stat-sig calculator",
    body: "Sample size + power + effect size + p-value calculator using a two-proportion z-test.",
    href: "/ui-primitives/ab-runtime/stat-sig-calculator",
    accent: "green",
    glyph: "Σp",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 04",
    title: "Allocation slider",
    body: "Variant traffic allocation sliders with live percent total + stacked allocation bar.",
    href: "/ui-primitives/ab-runtime/allocation-slider",
    accent: "amber",
    glyph: "▮▮▮",
    state: "Stateful · sliders",
  },
  {
    kicker: "Primitive 05",
    title: "Holdout audience card",
    body: "Holdout group card with percent, estimated size, and exclude rules (field, operator, values).",
    href: "/ui-primitives/ab-runtime/holdout-audience-card",
    accent: "amber",
    glyph: "▤▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Lift chart",
    body: "Daily lift line chart with 95% confidence band, zero baseline, and tonal mid-point ticks.",
    href: "/ui-primitives/ab-runtime/lift-chart",
    accent: "teal",
    glyph: "Δ%",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Primary metric tile",
    body: "Primary metric tile — value, lift delta, p-value, and significance stars (★ / ★★ / ★★★).",
    href: "/ui-primitives/ab-runtime/primary-metric-tile",
    accent: "green",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Segment breakdown row",
    body: "Per-segment lift row — Mobile / Desktop / iOS / Android / AU / NZ with diverging bar.",
    href: "/ui-primitives/ab-runtime/segment-breakdown-row",
    accent: "neutral",
    glyph: "▎▎",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Funnel impact row",
    body: "Funnel step impact row with control vs treatment conversion rates and relative delta.",
    href: "/ui-primitives/ab-runtime/funnel-impact-row",
    accent: "teal",
    glyph: "▷",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Early stopping card",
    body: "Early-stopping rules (futility / superiority / guardrail / max duration) with armed + triggered states.",
    href: "/ui-primitives/ab-runtime/early-stopping-card",
    accent: "amber",
    glyph: "■",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Experiment history row",
    body: "Past experiment row — dates, name, final lift, outcome (shipped / iterated / killed / inconclusive), learning.",
    href: "/ui-primitives/ab-runtime/experiment-history-row",
    accent: "neutral",
    glyph: "⌖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "SRM warning banner",
    body: "Sample ratio mismatch banner with severity, p-value, and per-arm observed vs expected splits.",
    href: "/ui-primitives/ab-runtime/srm-warning-banner",
    accent: "red",
    glyph: "!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Decision recommendation",
    body: "Recommendation card — ship / iterate / kill / keep-running with rationale, confidence bar, expected impact.",
    href: "/ui-primitives/ab-runtime/decision-recommendation-card",
    accent: "green",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Feature flag link row",
    body: "Linked feature flag row showing environment, status (on / off / ramping / killed), and rollout %.",
    href: "/ui-primitives/ab-runtime/feature-flag-link-row",
    accent: "teal",
    glyph: "⚑",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full experiments",
    body: "Composed cockpit — three real Mufflermen experiments (Quote PDF redesign, Suburb landing CTA, Mobile dock vs sidebar) end-to-end.",
    href: "/ui-primitives/ab-runtime/full-experiments",
    accent: "teal",
    glyph: "▦▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<AbRuntimeScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function AbRuntimeIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="A/B runtime / 14 primitives + composition"
        title="A/B runtime + live experimentation primitives"
        description="Visual primitives for the Mufflermen workshop A/B runtime — built against real workshop experiments (Quote PDF redesign, Suburb landing CTA, Mobile dock vs sidebar). Primary metric is quote-accept rate; secondary is revenue per visitor. AU + NZ split. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="A/B runtime primitives">
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
