import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DiffStatsBar } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Diff stats bar | UI Primitives — Code diff",
}

export default function DiffStatsBarPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 10"
        title="Diff stats bar"
        description="Horizontal stats bar — insertions / deletions visualised as proportional segments + total files chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Diff stats bar" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Three PR comparisons</span>
          <DiffStatsBar insertions={159} deletions={268} filesChanged={8} />
          <DiffStatsBar insertions={482} deletions={28} filesChanged={14} />
          <DiffStatsBar insertions={12} deletions={4} filesChanged={2} />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The track is a two-column CSS grid sized by the insertion / deletion ratio, so the bar
            adapts smoothly. When deletions dominate (a cleanup PR) the red segment is wider; when
            it&apos;s a green-field add (the feature flag PR) it&apos;s mostly green.
          </p>
        </div>
      </section>
    </main>
  )
}
