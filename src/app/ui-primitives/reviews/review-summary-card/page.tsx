import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewSummaryCard } from "../../components/reviews"

import {
  DEMO_BREAKDOWN,
  DEMO_SENTIMENT_SEGMENTS,
  DEMO_TREND,
} from "../demo-data"
import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Summary card | Reviews",
  description:
    "Primitive 09 — aggregate summary card with overall ★, breakdown, sentiment donut, trend, and would-recommend %.",
}

export default function ReviewSummaryCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Summary"
        title="Review summary card"
        description="Top-of-feed composition card — overall star average, total review count, per-tier breakdown, sentiment donut, 30-day trend sparkline, and the would-recommend percentage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Summary card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Oak Flats Mufflermen — last 90 days</span>
        <ReviewSummaryCard
          overallRating={4.78}
          totalReviews={435}
          tiers={DEMO_BREAKDOWN}
          sentimentSegments={DEMO_SENTIMENT_SEGMENTS}
          trend={DEMO_TREND}
          recommendPercentage={94}
          meta="435 verified jobs · last 90 days"
        />
      </section>
    </main>
  )
}
