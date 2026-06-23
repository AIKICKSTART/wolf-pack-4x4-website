"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { StarRatingSelector } from "../../components/reviews"
import type { StarRating } from "../../components/reviews"

import styles from "../reviews.module.css"

export default function StarRatingSelectorScene() {
  const [singleHalf, setSingleHalf] = useState<StarRating>(4.5)
  const [wholeOnly, setWholeOnly] = useState<StarRating>(5)
  const [empty, setEmpty] = useState<StarRating>(0)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Selector"
        title="Star rating selector"
        description="Interactive 1–5 star selector. Supports hover preview, half-star clicks, full keyboard navigation, and a clear-rating chip when a value is set."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Star selector" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Half-star support</span>
        <StarRatingSelector value={singleHalf} onChange={setSingleHalf} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Whole stars only</span>
        <StarRatingSelector
          value={wholeOnly}
          onChange={setWholeOnly}
          allowHalfStars={false}
          label="Quality rating"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty state — picking your first rating</span>
        <StarRatingSelector value={empty} onChange={setEmpty} label="How was Bay 2?" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Disabled — read-only display</span>
        <StarRatingSelector value={3.5} onChange={() => undefined} disabled label="Submitted rating" />
      </section>
    </main>
  )
}
