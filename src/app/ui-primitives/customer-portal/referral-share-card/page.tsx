import type { Metadata } from "next"

import { ReferralShareCard } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import {
  REFERRAL_FRESH,
  REFERRAL_MICK,
  REFERRAL_VETERAN,
} from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Referral share card | Customer portal",
  description:
    "Primitive 08 — refer-a-mate card with copyable code, share URL, recent activity — three states.",
}

export default function ReferralShareCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Referral share card"
        title="Refer-a-mate card"
        description="Mick's running referral track (6 invited, 3 booked, $300 banked), a brand-new card with no history yet, and Karen's eight-year veteran tally ($1,100 banked, 11 mates booked)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Referral share card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <ReferralShareCard program={REFERRAL_MICK} />
          <ReferralShareCard program={REFERRAL_FRESH} />
          <ReferralShareCard program={REFERRAL_VETERAN} />
        </div>
      </section>
    </main>
  )
}
