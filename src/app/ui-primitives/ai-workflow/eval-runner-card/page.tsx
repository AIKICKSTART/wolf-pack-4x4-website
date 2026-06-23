import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EvalRunnerCard } from "../../components/ai-workflow"

import { QUOTE_EVAL_AXES, QUOTE_EVAL_SAMPLES } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Eval runner | AI workflow",
  description:
    "Primitive 07 — eval suite runner with rubric × sample-input scoreboard.",
}

export default function EvalRunnerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Eval"
        title="Eval runner card"
        description="Run an eval suite against a workflow. Rubric axes carry weights, samples map to per-axis scores, and the weighted overall drives the headline gauge. Mufflermen rubric: accuracy · tone · safety · cost."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Eval runner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote estimator suite · 6 samples
        </span>
        <EvalRunnerCard
          title="Quote estimator · v3.2"
          axes={QUOTE_EVAL_AXES}
          samples={QUOTE_EVAL_SAMPLES}
          lastRunLabel="Today 09:14"
          passThreshold={80}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · SMS triage suite · 3 samples · safety-weighted
        </span>
        <EvalRunnerCard
          title="SMS triage · v1.0"
          axes={[
            { id: "accuracy", label: "Intent accuracy", weight: 0.35 },
            { id: "tone", label: "Aussie register", weight: 0.15 },
            { id: "safety", label: "Safety", weight: 0.4 },
            { id: "cost", label: "Cost", weight: 0.1 },
          ]}
          samples={[
            {
              id: "se1",
              label: "Quote intent · N80 fitment",
              scores: { accuracy: 92, tone: 88, safety: 100, cost: 95 },
            },
            {
              id: "se2",
              label: "Booking intent · Saturday late",
              scores: { accuracy: 86, tone: 90, safety: 100, cost: 94 },
            },
            {
              id: "se3",
              label: "Ambiguous · ECU tuning ask",
              scores: { accuracy: 58, tone: 72, safety: 100, cost: 88 },
            },
          ]}
          lastRunLabel="07:48"
          passThreshold={75}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · early build · single failing sample
        </span>
        <EvalRunnerCard
          title="Blog draft · v0.3 baseline"
          axes={QUOTE_EVAL_AXES}
          samples={[
            {
              id: "be1",
              label: "DPF cleaning vs replacement",
              scores: { accuracy: 48, tone: 56, safety: 92, cost: 84 },
            },
          ]}
          passThreshold={70}
        />
      </section>
    </main>
  )
}
