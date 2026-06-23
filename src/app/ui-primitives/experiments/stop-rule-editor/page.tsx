import type { Metadata } from "next"

import { StopRuleEditor } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Stop rule editor | Experiments",
  description:
    "Primitive 13 — choose stop conditions (Min sample / Significance / Time / Manual / Guardrail) with per-rule thresholds.",
}

export default function StopRuleEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Stop rules"
        title="Stop rule editor"
        description="Encodes the experiment's stop conditions before the test starts. Toggle stop kinds — minimum sample, significance threshold, time elapsed, manual approval, guardrail breach — and set per-rule thresholds inline. Stops fire on the first rule satisfied."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Stop rule editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · toggle stop-kind chips, edit thresholds
        </span>
        <StopRuleEditor
          defaultRules={[
            { kind: "min-sample", threshold: 12000 },
            { kind: "significance", threshold: 0.05 },
            { kind: "guardrail", threshold: 5 },
          ]}
        />
      </section>
    </main>
  )
}
