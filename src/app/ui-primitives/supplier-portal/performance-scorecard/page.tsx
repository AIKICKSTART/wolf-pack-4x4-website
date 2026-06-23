import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierPerformanceScorecard } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Performance scorecard | UI Primitives — Supplier Portal",
}

export default function PerformanceScorecardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.11 / Supplier portal"
        title="Supplier performance scorecard"
        description="On-time delivery and order accuracy radial meters with a lead-time variance chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Performance scorecard" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierPerformanceScorecard
          supplierName="Manta Performance"
          onTimeDeliveryPct={92}
          orderAccuracyPct={97}
          leadTimeVarianceDays={1}
        />
      </section>
    </main>
  )
}
