import type { Metadata } from "next"

import { LoyaltyCard } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import { LOYALTY_BEC, LOYALTY_KAREN, LOYALTY_MICK } from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Loyalty card | Customer portal",
  description:
    "Primitive 06 — visual customer-side stamp card with tier chip and reward progress — three states.",
}

export default function LoyaltyCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Loyalty card"
        title="Customer-side stamp card"
        description="Mid-journey (Mick, Gold tier, 4 of 8 stamps), reward unlocked (Karen, Platinum, all stamps earned), and brand-new starter tier (Bec, 2 of 8 stamps)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Loyalty card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <LoyaltyCard loyalty={LOYALTY_MICK} />
          <LoyaltyCard loyalty={LOYALTY_KAREN} />
          <LoyaltyCard loyalty={LOYALTY_BEC} />
        </div>
      </section>
    </main>
  )
}
