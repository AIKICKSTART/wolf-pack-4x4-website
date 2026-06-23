import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RunTimeline } from "../../components/hermes-agent"
import type { RunTimelineStep } from "../../components/hermes-agent"

import { HERMES_RUN_STEPS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Run timeline | Hermes",
  description:
    "Primitive 02 — single Hermes run timeline: plan, tool calls, reflection, response.",
}

const FAILED_RUN: ReadonlyArray<RunTimelineStep> = [
  {
    id: "f1",
    kind: "plan",
    title: "Plan response",
    detail: "Quote follow-up on Commodore VF SS · 48h chase.",
    status: "done",
    timestamp: "13:01:02",
    durationMs: 121,
  },
  {
    id: "f2",
    kind: "tool",
    title: "quote.estimate",
    toolName: "quote.estimate",
    detail: "Reprice the prior quote — supplier feed call.",
    payload: '{\n  "quoteId": "q_42",\n  "supplier": "manta"\n}',
    status: "failed",
    timestamp: "13:01:02",
    durationMs: 2840,
  },
  {
    id: "f3",
    kind: "reflection",
    title: "Reflect on failure",
    detail: "Supplier feed returned 5xx — backoff and retry once.",
    status: "done",
    timestamp: "13:01:05",
    durationMs: 80,
  },
  {
    id: "f4",
    kind: "handoff",
    title: "Escalate to Bec",
    detail: "Two consecutive supplier-feed failures · route to manager.",
    status: "done",
    timestamp: "13:01:06",
    durationMs: 14,
  },
]

const PENDING_RUN: ReadonlyArray<RunTimelineStep> = [
  {
    id: "p1",
    kind: "plan",
    title: "Plan response",
    detail: "Customer asked about a Saturday booking.",
    status: "running",
    timestamp: "13:42:00",
  },
]

export default function RunTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Timeline"
        title="Run timeline"
        description="Per-run timeline showing the Hermes lifecycle — plan, tool calls, reflection, response, handoff — with tokens, cost and total wall-clock summary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Run timeline" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · in-flight run · Mick Davis cat-back
        </span>
        <RunTimeline
          runId="run_8847"
          customerName="Mick Davis"
          steps={HERMES_RUN_STEPS}
          tokenTotal={1843}
          costCents={42}
          totalDurationMs={3284}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · failed tool · escalated</span>
        <RunTimeline
          runId="run_8848"
          customerName="Leah O'Donnell"
          steps={FAILED_RUN}
          tokenTotal={612}
          costCents={18}
          totalDurationMs={3055}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · just kicked off</span>
        <RunTimeline
          runId="run_8849"
          customerName="Anonymous"
          steps={PENDING_RUN}
        />
      </section>
    </main>
  )
}
