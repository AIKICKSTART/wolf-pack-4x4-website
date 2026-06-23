import type { Metadata } from "next"

import { CustomerSegmentDistribution } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_SEGMENT_SLICES } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Customer segment distribution | Customer success",
  description:
    "Primitive 11 — donut chart of customer segment mix: Strategic / Growth / Retention / Win-back.",
}

export default function CustomerSegmentDistributionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Segments"
        title="Customer segment distribution"
        description="Composes the DonutChart primitive with the four customer-success success segments — Strategic (teal), Growth (green), Retention (amber), Win-back (red)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Customer segment distribution" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Book of business · Q2 2026</span>
          <CustomerSegmentDistribution slices={SAMPLE_SEGMENT_SLICES} />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Fleet-only book</span>
          <CustomerSegmentDistribution
            slices={[
              { segment: "strategic", count: 11 },
              { segment: "growth", count: 9 },
              { segment: "retention", count: 6 },
              { segment: "win-back", count: 2 },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
