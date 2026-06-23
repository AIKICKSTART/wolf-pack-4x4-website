import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VerifiedPurchaseChip } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Verified purchase chip | Reviews",
  description:
    "Primitive 05 — small ‘verified purchase’ chip with optional hover tooltip showing the job date.",
}

export default function VerifiedPurchaseChipScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Verified"
        title="Verified purchase chip"
        description="Tiny ‘verified purchase’ chip that confirms the reviewer paid the invoice. Optional hover tooltip surfaces the matched job code and date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Verified chip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Default — no tooltip</span>
        <VerifiedPurchaseChip />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Tooltip with job reference (hover or focus)</span>
        <VerifiedPurchaseChip transactionDate="Job OAK-2841 · 21 May 2026" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Custom label</span>
        <VerifiedPurchaseChip
          label="Confirmed install"
          transactionDate="Job OAK-2900 · 28 May 2026"
        />
      </section>
    </main>
  )
}
