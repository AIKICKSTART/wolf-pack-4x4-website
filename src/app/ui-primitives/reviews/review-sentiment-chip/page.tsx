import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewSentimentChip } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Sentiment chip | Reviews",
  description:
    "Primitive 04 — sentiment-tone chip used inside review headers and aggregate cards.",
}

export default function ReviewSentimentChipScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Sentiment"
        title="Review sentiment chip"
        description="Compact tone-shifted chip that turns a derived sentiment into a glanceable signal — used in card headers, moderation rows, and the summary card."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Sentiment chip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Default sentiment labels</span>
        <div className={styles.demoCluster}>
          <ReviewSentimentChip sentiment="positive" />
          <ReviewSentimentChip sentiment="mixed" />
          <ReviewSentimentChip sentiment="negative" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop-specific labels</span>
        <div className={styles.demoCluster}>
          <ReviewSentimentChip sentiment="positive" label="Manta install — happy" />
          <ReviewSentimentChip sentiment="mixed" label="Quote walked up" />
          <ReviewSentimentChip sentiment="negative" label="Bay conflict" />
        </div>
      </section>
    </main>
  )
}
