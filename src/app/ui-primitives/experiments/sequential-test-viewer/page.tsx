import type { Metadata } from "next"

import { SequentialTestViewer } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Sequential testing viewer | Experiments",
  description:
    "Primitive 09 — peeking-corrected p-value curve + early-stopping boundary annotation.",
}

export default function SequentialTestViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Sequential"
        title="Sequential testing viewer"
        description="Always-valid sequential test trajectory across daily peeks. Corrected p-values are plotted against the α boundary so reviewers can see the legitimate early-stopping moment vs naive p (which would inflate Type-I error)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Sequential testing" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 10 peeks · corrected vs naive p</span>
        <SequentialTestViewer
          pValues={[0.51, 0.38, 0.24, 0.16, 0.11, 0.082, 0.061, 0.046, 0.034, 0.028]}
          naivePValues={[0.49, 0.31, 0.16, 0.082, 0.041, 0.022, 0.013, 0.008, 0.005, 0.003]}
          peekLabels={["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"]}
          alphaBoundary={0.05}
          crossedAtIndex={7}
        />
      </section>
    </main>
  )
}
