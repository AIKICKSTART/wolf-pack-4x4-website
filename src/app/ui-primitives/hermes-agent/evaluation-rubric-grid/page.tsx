import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EvaluationRubricGrid } from "../../components/hermes-agent"
import type { RubricSample } from "../../components/hermes-agent"

import { HERMES_RUBRIC_SAMPLES } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Evaluation rubric grid | Hermes",
  description:
    "Primitive 08 — quality scoring grid for sampled Hermes runs across accuracy, tone, safety and resolution.",
}

const STRUGGLING_RUBRIC: ReadonlyArray<RubricSample> = [
  {
    runId: "run_9001",
    topic: "Refund > $200 — pre-fix",
    scores: { accuracy: 52, tone: 64, safety: 40, resolution: 32 },
    reviewer: "Bec S.",
  },
  {
    runId: "run_9002",
    topic: "Fitment ambiguous — pre-fix",
    scores: { accuracy: 44, tone: 68, safety: 60, resolution: 28 },
    reviewer: "Sam W.",
  },
  {
    runId: "run_9003",
    topic: "Saturday hours confusion",
    scores: { accuracy: 66, tone: 72, safety: 80, resolution: 58 },
    reviewer: "Jordan R.",
  },
]

const EMPTY_RUBRIC: ReadonlyArray<RubricSample> = []

export default function EvaluationRubricGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Rubric"
        title="Evaluation rubric grid"
        description="Hermes runs sampled by the QA team and scored across four axes — accuracy, tone, safety and resolution. Each cell shows the score and a tone-aware fill bar; the overall average renders as a chip grade."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Evaluation rubric grid" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · this week · 5 sampled runs
        </span>
        <EvaluationRubricGrid
          title="Weekly QA sample"
          samplePeriod="27 May → 02 Jun 2026"
          samples={HERMES_RUBRIC_SAMPLES}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · pre-fix benchmark · action required
        </span>
        <EvaluationRubricGrid
          title="Refund guard v1.0 regression"
          samplePeriod="20 May → 26 May 2026"
          samples={STRUGGLING_RUBRIC}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · empty · no samples this window
        </span>
        <EvaluationRubricGrid
          title="Bank holiday window"
          samplePeriod="03 Jun → 04 Jun 2026"
          samples={EMPTY_RUBRIC}
        />
      </section>
    </main>
  )
}
