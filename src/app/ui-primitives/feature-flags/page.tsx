import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./feature-flags.module.css"

export const metadata: Metadata = {
  title: "Feature flags + experimentation | UI Primitives",
  description:
    "Feature flag + experimentation console primitives for the Mufflermen workshop — flag cards, detail pane, rollout slider, variant picker, targeting rules, audiences, environment tabs, flag search, kill switch, experiment results, dependency graph, audit log, canary bar, feature gate preview, and a composed full console.",
}

interface FlagScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<FlagScene> = [
  {
    kicker: "Primitive 01",
    title: "Flag card",
    body: "Flag card with key, on/off toggle, tone-coded env chips (DEV / STG / PRD), variant chips and last-modified meta.",
    href: "/ui-primitives/feature-flags/flag-card",
    accent: "red",
    glyph: "◐",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 02",
    title: "Flag detail pane",
    body: "Full detail pane composing variants, targeting rules, rollout, change timeline, kill switch and linked experiments.",
    href: "/ui-primitives/feature-flags/flag-detail-pane",
    accent: "red",
    glyph: "▦",
    state: "Composition",
  },
  {
    kicker: "Primitive 03",
    title: "Rollout slider",
    body: "0-100% slider with tone-shifting fill, snap points 0/25/50/75/100, full keyboard support and aria-valuenow.",
    href: "/ui-primitives/feature-flags/rollout-slider",
    accent: "amber",
    glyph: "▰▱",
    state: "Stateful · slider",
  },
  {
    kicker: "Primitive 04",
    title: "Variant picker",
    body: "A/B/C variant picker with weight inputs and a sum-must-100% indicator that flips tone when invalid.",
    href: "/ui-primitives/feature-flags/variant-picker",
    accent: "teal",
    glyph: "ABC",
    state: "Stateful · weights",
  },
  {
    kicker: "Primitive 05",
    title: "Targeting rule row",
    body: "Subject (user / workspace / role / geo / device) + operator + tag input value list with remove action.",
    href: "/ui-primitives/feature-flags/targeting-rule-row",
    accent: "amber",
    glyph: "⌖",
    state: "Stateful · tags",
  },
  {
    kicker: "Primitive 06",
    title: "Audience filter card",
    body: "Audience card with name, member count, criteria chips and edit / duplicate / archive actions.",
    href: "/ui-primitives/feature-flags/audience-filter-card",
    accent: "teal",
    glyph: "◯●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Environment tabs",
    body: "Three-tab DEV / STG / PRD switcher with per-environment status dots and flag counts.",
    href: "/ui-primitives/feature-flags/environment-tabs",
    accent: "teal",
    glyph: "DEV·STG·PRD",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 08",
    title: "Flag search",
    body: "Inline flag search with kbd hint, owner chip filter, status chip filter and archived toggle.",
    href: "/ui-primitives/feature-flags/flag-search",
    accent: "neutral",
    glyph: "⌕",
    state: "Stateful · filters",
  },
  {
    kicker: "Primitive 09",
    title: "Kill switch button",
    body: "Big destructive kill switch — red glow, two-step confirm with typed phrase input and aria-live alert.",
    href: "/ui-primitives/feature-flags/kill-switch-button",
    accent: "red",
    glyph: "◉",
    state: "Stateful · confirm",
  },
  {
    kicker: "Primitive 10",
    title: "Experiment results",
    body: "Experiment results card — variant rows with conversion, uplift, p-value chip, winner badge and significance bar.",
    href: "/ui-primitives/feature-flags/experiment-results-card",
    accent: "green",
    glyph: "A/B↑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Dependency graph",
    body: "SVG graph of dependent flags — parent → child edges with arrowheads and a cycle-detected warning chip.",
    href: "/ui-primitives/feature-flags/flag-dependency-graph",
    accent: "amber",
    glyph: "⇆",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Recent flag changes log",
    body: "Audit log of flag changes — who / when / what / from-value → to-value. Powered by the shared DataTable.",
    href: "/ui-primitives/feature-flags/recent-flag-changes-log",
    accent: "neutral",
    glyph: "◷",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Rollout canary bar",
    body: "Canary progression 1% → 5% → 25% → 50% → 100% with reached / current step highlighting and ETA chip.",
    href: "/ui-primitives/feature-flags/rollout-canary-bar",
    accent: "amber",
    glyph: "▮▮▯▯▯",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Feature gate preview",
    body: "Mock preview — attributes in, resolved variant + reason out, plus a small 'you would see…' surface stub.",
    href: "/ui-primitives/feature-flags/feature-gate-preview",
    accent: "teal",
    glyph: "□→A",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full console",
    body: "Composed console wiring EnvironmentTabs + FlagSearch + flag list + FlagDetailPane + RecentChanges + KillSwitch.",
    href: "/ui-primitives/feature-flags/full-console",
    accent: "red",
    glyph: "▦▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<FlagScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function FeatureFlagsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Feature flags / 14 primitives + composition"
        title="Feature flag + experimentation primitives"
        description="Visual primitives for the Mufflermen feature-flag console — built against real workshop releases (quote-instant-pricing, parts-3d-viewer, workshop-bay-availability-realtime, compliance-receipt-qr). Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Feature flag primitives">
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
