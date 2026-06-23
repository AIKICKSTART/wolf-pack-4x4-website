import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RunHistoryRow } from "../../components/workflow-engine"

import { QUOTE_RUN_HISTORY } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Run history row | Workflow engine",
  description:
    "Primitive 04 — single run history row with status, duration, step progress and trace link.",
}

export default function RunHistoryRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / History"
        title="Run history row"
        description="A single workflow run rendered as a tile. Started timestamp, trigger chip, step-progress mini-track, status pill and duration — the row in the history table. Stack a few and you have the scrollback that tells the workshop what fired today."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Run history row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live history · last six runs of the quote follow-up
        </span>
        <div className={styles.demoStack}>
          {QUOTE_RUN_HISTORY.map((run) => (
            <RunHistoryRow
              key={run.runId}
              runId={run.runId}
              startedAt={run.startedAt}
              triggerKind={run.triggerKind}
              triggerLabel={run.triggerLabel}
              status={run.status}
              durationMs={run.durationMs}
              stepsCompleted={run.stepsCompleted}
              stepsTotal={run.stepsTotal}
              finalStepLabel={run.finalStepLabel}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
