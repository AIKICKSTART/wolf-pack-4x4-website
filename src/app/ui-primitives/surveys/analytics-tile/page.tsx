import type { Metadata } from "next"

import { ResponseAnalyticsTile } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { BAY_DISTRIBUTION, DISTRIBUTION_BUCKETS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Response analytics tile | Surveys",
  description: "Primitive 05 — per-question response distribution tile.",
}

export default function ResponseAnalyticsTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Response analytics tile"
        title="Response analytics tile"
        description="Per-question analytics tile — prompt, total response count, and a tone-coded distribution bar chart. Each bucket renders its absolute count and percentage of total."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Analytics tile" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — NPS and bay cleanliness</span>
        <div className={styles.previewRow}>
          <ResponseAnalyticsTile
            question="How likely are you to recommend Oak Flats Mufflermen?"
            meta="Q01 / NPS"
            responseCount={156}
            buckets={DISTRIBUTION_BUCKETS}
          />
          <ResponseAnalyticsTile
            question="Was Bay 2 tidy when you collected the car?"
            meta="Q02 / Single choice"
            responseCount={156}
            buckets={BAY_DISTRIBUTION}
          />
        </div>
      </section>
    </main>
  )
}
