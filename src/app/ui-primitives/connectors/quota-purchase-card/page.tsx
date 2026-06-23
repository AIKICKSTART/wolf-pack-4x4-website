import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuotaPurchaseCard } from "../../components/connectors"

import { QUOTA_REPLICATE } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Quota purchase card | Connectors",
  description:
    "Primitive 13 — upgrade-tier card with current usage and recommended tier.",
}

const QUOTA_LOW = {
  ...QUOTA_REPLICATE,
  currentUsage: 6,
  recommendedTierId: "starter",
}

const QUOTA_HIGH = {
  ...QUOTA_REPLICATE,
  currentUsage: 17,
  recommendedTierId: "studio",
}

const QUOTA_CAP = {
  ...QUOTA_REPLICATE,
  currentUsage: 20,
  recommendedTierId: "scale",
}

export default function QuotaPurchaseCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Card"
        title="Quota purchase card"
        description="Segmented usage meter plus a three-tier upgrade strip — Starter, Studio, Scale — with current and recommended badges keyed by usage ratio. Three live load levels — low (30% used → stay), high (85% → Studio) and at-cap (100% → Scale)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Quota purchase card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · low usage · stay on Starter</span>
        <QuotaPurchaseCard {...QUOTA_LOW} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · high usage · Studio recommended</span>
        <QuotaPurchaseCard {...QUOTA_HIGH} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · at-cap · Scale recommended</span>
        <QuotaPurchaseCard {...QUOTA_CAP} />
      </section>
    </main>
  )
}
