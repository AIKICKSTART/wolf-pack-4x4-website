import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RunTraceViewer } from "../../components/workflow-engine"

import { REFUND_TRACE_SPANS } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Run trace viewer | Workflow engine",
  description:
    "Primitive 12 — single-run trace viewer with gantt-style span timeline.",
}

export default function RunTraceViewerScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Trace"
        title="Run trace viewer"
        description="The forensic view of a single run. Spans laid out on a gantt timeline, click any to expand and read the per-step message. Refund flow below — manager gate took 18 seconds, Stripe was fast, the Twilio SMS hit carrier flake and the run kept going through retry."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Run trace viewer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Refund &gt; $200 · run trace · all spans collapsed
        </span>
        <RunTraceViewer
          runId="RUN-RF-1138"
          kicker="Refund flow"
          title="Refund > $200 · run trace"
          totalDurationMs={23_750}
          spans={REFUND_TRACE_SPANS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Same run · all spans expanded — every message visible
        </span>
        <RunTraceViewer
          runId="RUN-RF-1138"
          kicker="Refund flow"
          title="Refund > $200 · expanded"
          totalDurationMs={23_750}
          spans={REFUND_TRACE_SPANS}
          defaultExpanded
        />
      </section>
    </main>
  )
}
