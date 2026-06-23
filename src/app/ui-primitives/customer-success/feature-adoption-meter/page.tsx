import type { Metadata } from "next"

import { FeatureAdoptionMeter } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_FEATURES } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Feature adoption meter | Customer success",
  description:
    "Primitive 07 — feature adoption rows with adopted/total ratio, progress bar, and mo/mo delta chips.",
}

export default function FeatureAdoptionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Adoption"
        title="Feature adoption meter"
        description="A scannable rollup of feature uptake across the active customer base. Tone of the progress bar shifts from red (<25%) through amber, teal, and green (≥80%)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Feature adoption meter" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Active customer base · 216 accounts</span>
        <FeatureAdoptionMeter rows={SAMPLE_FEATURES} caption="Feature adoption across active customers" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Fleet-only customer base · 28 accounts</span>
        <FeatureAdoptionMeter
          caption="Adoption inside fleet segment only"
          rows={[
            { id: "ff1", feature: "Online booking", adopted: 26, total: 28, delta: 0 },
            { id: "ff2", feature: "Fleet odometer sync", adopted: 19, total: 28, delta: 6 },
            { id: "ff3", feature: "Auto-quote attachments", adopted: 22, total: 28, delta: 4 },
            { id: "ff4", feature: "Loyalty milestones", adopted: 12, total: 28, delta: -1 },
            { id: "ff5", feature: "Parts portal self-serve", adopted: 8, total: 28, delta: 3 },
          ]}
        />
      </section>
    </main>
  )
}
