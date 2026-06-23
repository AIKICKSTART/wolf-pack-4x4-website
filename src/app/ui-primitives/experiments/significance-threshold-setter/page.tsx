import type { Metadata } from "next"

import { SignificanceThresholdSetter } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Significance threshold | Experiments",
  description:
    "Primitive 05 — α radio (0.01 / 0.05 / 0.10), one-sided / two-sided, multiple-comparisons correction picker.",
}

export default function SignificanceThresholdScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Threshold"
        title="Significance threshold setter"
        description="Set the test-of-record's α level, choose one-sided vs two-sided, and pick a multiple-comparisons correction. Bonferroni for conservative gating; FDR (Benjamini-Hochberg) when running many concurrent experiments."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Significance threshold" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · radiogroup pickers</span>
        <SignificanceThresholdSetter
          defaultValue={{ alpha: 0.05, tail: "two-sided", correction: "fdr" }}
        />
      </section>
    </main>
  )
}
