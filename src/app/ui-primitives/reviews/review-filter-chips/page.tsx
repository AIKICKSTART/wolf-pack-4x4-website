"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { ReviewFilterChips } from "../../components/reviews"
import type { ReviewFilterId } from "../../components/reviews"

import styles from "../reviews.module.css"

const COUNTS: Partial<Record<ReviewFilterId, number>> = {
  all: 435,
  "5-star": 312,
  "4-star": 84,
  "3-star": 22,
  critical: 17,
  "with-photos": 128,
  "verified-only": 408,
  "last-30-days": 64,
}

export default function ReviewFilterChipsScene() {
  const [filter, setFilter] = useState<ReviewFilterId>("all")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Filters"
        title="Review filter chips"
        description="Toggle chip bar for the review feed — All / star tiers / Critical / With photos / Verified only / Last 30 days. Counts update next to each chip to set expectations before the click."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Filter chips" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live filter — selected: {filter}</span>
        <ReviewFilterChips selected={filter} onSelect={setFilter} counts={COUNTS} />
      </section>
    </main>
  )
}
