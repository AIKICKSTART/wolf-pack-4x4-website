import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VolumeDiscountTierCard } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Volume discount tier | UI Primitives — Supplier Portal",
}

export default function VolumeTierPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.14 / Supplier portal"
        title="Volume discount tier card"
        description="Threshold, discount and progress meter — what Oak Flats earns by buying more from Manta."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Volume tier" },
        ]}
      />
      <section className={styles.canvas}>
        <VolumeDiscountTierCard
          tierName="Loyal trade"
          thresholdAud={120000}
          discountPct={7}
          currentSpendAud={82400}
          nextTierLabel="Next: Fleet partner · 9% at $160k"
        />
      </section>
    </main>
  )
}
