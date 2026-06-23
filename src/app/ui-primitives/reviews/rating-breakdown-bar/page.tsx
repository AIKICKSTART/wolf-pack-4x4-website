import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RatingBreakdownBar } from "../../components/reviews"

import { DEMO_BREAKDOWN } from "../demo-data"
import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Rating breakdown | Reviews",
  description:
    "Primitive 02 — vertical 5★→1★ breakdown with per-tier percentage bar and count chip.",
}

const NEW_SHOP: ReadonlyArray<{ stars: 1 | 2 | 3 | 4 | 5; count: number }> = [
  { stars: 5, count: 4 },
  { stars: 4, count: 1 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
]

const QUOTE_FRUSTRATION: ReadonlyArray<{ stars: 1 | 2 | 3 | 4 | 5; count: number }> = [
  { stars: 5, count: 86 },
  { stars: 4, count: 42 },
  { stars: 3, count: 28 },
  { stars: 2, count: 19 },
  { stars: 1, count: 12 },
]

export default function RatingBreakdownScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Breakdown"
        title="Rating breakdown bar"
        description="Per-tier 5★→1★ horizontal bar with percentage + count chip. Used inside summary cards and on the review feed header."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Rating breakdown" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Oak Flats Mufflermen — last 90 days (435 reviews)</span>
        <RatingBreakdownBar tiers={DEMO_BREAKDOWN} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>New workshop with thin sample (5 reviews)</span>
        <RatingBreakdownBar
          tiers={NEW_SHOP}
          title="First-month breakdown"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote-frustration window (187 reviews)</span>
        <RatingBreakdownBar
          tiers={QUOTE_FRUSTRATION}
          title="Quote-walkup quarter"
        />
      </section>
    </main>
  )
}
