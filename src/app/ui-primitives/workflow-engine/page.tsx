import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Workflow engine | UI Primitives",
  description:
    "Workflow engine primitives for the Mufflermen workshop — builder canvas, step + trigger cards, run history, manual approval, retry policy, fan-out, error handler, variable pass-through, condition branch, delay, run-trace viewer, audit trail, template library and a composed orchestrator.",
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
    title: "Workflow builder canvas",
    body:
      "Node/edge canvas with pan + zoom + grid + minimap. Quote follow-up nudge wired step-by-step.",
    href: "/ui-primitives/workflow-engine/workflow-builder-canvas",
    accent: "teal",
    glyph: "▢→▢",
    state: "Stateful · pan/zoom",
  },
  {
    kicker: "Primitive 02",
    title: "Step node card",
    body:
      "Inspector-grade step card. Action / decision / wait / parallel / loop with status, metrics, ports.",
    href: "/ui-primitives/workflow-engine/step-node-card",
    accent: "teal",
    glyph: "◎",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Trigger config card",
    body:
      "Webhook / cron / event bus / manual trigger card with config string, sample payload, armed state.",
    href: "/ui-primitives/workflow-engine/trigger-config-card",
    accent: "green",
    glyph: "⚡▶",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Run history row",
    body:
      "Single workflow run row — trigger, started, step-progress, status pill, duration, trace link.",
    href: "/ui-primitives/workflow-engine/run-history-row",
    accent: "neutral",
    glyph: "│▸",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Manual approval card",
    body:
      "Refund > $200 gate. Approver chip, reason, comment field, approve / reject decision state.",
    href: "/ui-primitives/workflow-engine/manual-approval-card",
    accent: "amber",
    glyph: "✓✗",
    state: "Stateful · decision",
  },
  {
    kicker: "Primitive 06",
    title: "Retry policy block",
    body:
      "Max attempts + base delay + backoff strategy + jitter. Projected delay bars per attempt.",
    href: "/ui-primitives/workflow-engine/retry-policy-block",
    accent: "violet",
    glyph: "↻λ",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Fan-out card",
    body:
      "Parallel lanes with first / wait-all / race join. Per-lane runtime bars and concurrency cap.",
    href: "/ui-primitives/workflow-engine/fan-out-card",
    accent: "teal",
    glyph: "Y‖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Error handler card",
    body:
      "Error attachment + match pattern + chain of catch / compensate / alert / retry actions.",
    href: "/ui-primitives/workflow-engine/error-handler-card",
    accent: "red",
    glyph: "△!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Variable pass-through row",
    body:
      "Single row mapping source → target with type + sample. Trigger / step / constant / secret kinds.",
    href: "/ui-primitives/workflow-engine/variable-pass-row",
    accent: "neutral",
    glyph: "x→y",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Condition branch card",
    body:
      "If / else gate with expression editor. YES / NO branch tiles + hit-rate split chip.",
    href: "/ui-primitives/workflow-engine/condition-branch-card",
    accent: "violet",
    glyph: "◇",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 11",
    title: "Delay step card",
    body:
      "Duration display, resume-at label, IANA tz chip, skip weekends + holidays toggles.",
    href: "/ui-primitives/workflow-engine/delay-step-card",
    accent: "amber",
    glyph: "⏱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Run trace viewer",
    body:
      "Gantt-style span timeline with expandable per-step messages. Refund flow trace.",
    href: "/ui-primitives/workflow-engine/run-trace-viewer",
    accent: "teal",
    glyph: "┄┄┄",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 13",
    title: "Audit trail rail",
    body:
      "Chronological feed — created / edited / published / disabled / approved / reverted entries.",
    href: "/ui-primitives/workflow-engine/audit-trail-rail",
    accent: "violet",
    glyph: "│●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Template library grid",
    body:
      "Workshop-flavoured templates — quote follow-up, RWC expiry, refund flow, welcome, recall.",
    href: "/ui-primitives/workflow-engine/template-library-grid",
    accent: "green",
    glyph: "▦▦",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full workflow orchestrator",
    body:
      "Composed orchestrator — trigger + canvas + history + approval + retry + fan-out + error + audit.",
    href: "/ui-primitives/workflow-engine/full-orchestrator",
    accent: "teal",
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

export default function WorkflowEngineIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Workflow engine / 14 primitives + composition"
        title="Workflow engine"
        description="The workflow engine primitive family — deterministic business automations that run the workshop day-to-day. Quote follow-up day-3 nudge, roadworthy expiry SMS at T-7d, refund > $200 manager approvals, new customer welcome fan-outs and recall hit reach-outs. Visual reference only — presentational, no live runtime."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real workflows invoked
      </span>

      <section className={styles.grid} aria-label="Workflow engine primitives">
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
