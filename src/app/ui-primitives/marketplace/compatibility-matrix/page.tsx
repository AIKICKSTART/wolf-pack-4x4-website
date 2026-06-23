import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CompatibilityMatrix } from "../../components/marketplace/compatibility-matrix"
import { COMPATIBILITY_ROWS } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Compatibility matrix | Marketplace | UI Primitives",
  description:
    "Compatibility matrix across mufflermen.com.au, Mufflerpulse, Hermes, API, and CLI surfaces.",
}

export default function CompatibilityMatrixShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.10 / Compatibility"
        title="Compatibility matrix"
        description="A workshop owner can scan five Mufflermen surfaces in one glance to know exactly where Stripe payments will work — and where they won't."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Compatibility matrix" },
        ]}
      />

      <section className={styles.section} aria-labelledby="compatibility-matrix-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Surfaces</span>
          <h2 id="compatibility-matrix-demo" className={styles.sectionTitle}>
            Stripe payments — surface compatibility
          </h2>
        </header>
        <CompatibilityMatrix rows={COMPATIBILITY_ROWS} />
      </section>
    </main>
  )
}
