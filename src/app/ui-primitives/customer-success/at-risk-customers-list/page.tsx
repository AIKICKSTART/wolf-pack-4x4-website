import type { Metadata } from "next"

import { AtRiskCustomersList } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_AT_RISK } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "At-risk customers list | Customer success",
  description:
    "Primitive 10 — sortable at-risk customers data table with avatar, health score, last contact, lifetime value, and intervention CTA.",
}

export default function AtRiskCustomersListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / At-risk list"
        title="At-risk customers list"
        description="Composes the data-display DataTable with customer-success specific cells — avatar, health score chip, last contact, lifetime value, and an intervention CTA per row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "At-risk customers list" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>This week&apos;s watchlist · 6 accounts</span>
        <AtRiskCustomersList
          rows={SAMPLE_AT_RISK}
          caption="This week's at-risk customers"
          kicker="Watchlist · Week of 27 May 2026"
        />
      </section>
    </main>
  )
}
