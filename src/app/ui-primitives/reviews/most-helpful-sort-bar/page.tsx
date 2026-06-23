"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { MostHelpfulSortBar } from "../../components/reviews"
import type { ReviewSortId } from "../../components/reviews"

import styles from "../reviews.module.css"

export default function MostHelpfulSortBarScene() {
  const [sort, setSort] = useState<ReviewSortId>("most-helpful")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Sort"
        title="Most helpful sort bar"
        description="Sort chip bar for the reviews feed. Sits directly above the list and updates the result-count chip on the right edge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Sort bar" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Selected: {sort}</span>
        <MostHelpfulSortBar selected={sort} onSelect={setSort} resultCount={435} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Filtered subset — last 30 days</span>
        <MostHelpfulSortBar
          selected="most-recent"
          onSelect={() => undefined}
          resultCount={64}
          label="Sort recent reviews"
        />
      </section>
    </main>
  )
}
