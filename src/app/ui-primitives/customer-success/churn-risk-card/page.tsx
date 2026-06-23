import type { Metadata } from "next"

import { ChurnRiskCard } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_CHURN_FACTORS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Churn risk card | Customer success",
  description:
    "Primitive 04 — per-customer churn risk card with probability, factor chips, and intervention suggestion.",
}

export default function ChurnRiskScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Churn risk"
        title="Churn risk card"
        description="Surfaces churn probability in a single number, the top risk factors as tone-coded chips, and a clear intervention suggestion + CTA for the success lead to act on."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Churn risk card" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Bayside Tow Co. · critical</span>
          <ChurnRiskCard
            customerName="Bayside Tow Co."
            probability={78}
            window="next 60 days"
            factors={SAMPLE_CHURN_FACTORS}
            intervention="Stuart to call the fleet manager today and offer a Bay 2 walkthrough this Friday. Pull a fresh QBR pack with rotation analysis."
            ctaLabel="Open intervention"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Trent Williams · high</span>
          <ChurnRiskCard
            customerName="Trent Williams"
            probability={52}
            window="next 90 days"
            factors={[
              { label: "Lapsed since April" },
              { label: "Loyalty benefits unredeemed" },
              { label: "Marketing opt-out flag" },
            ]}
            intervention="Send a personalised note from Stuart inviting Trent back for a free dyno-tune. Waive his next pre-inspection charge."
            ctaLabel="Send invitation"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Kawanda Yuen · medium</span>
          <ChurnRiskCard
            customerName="Kawanda Yuen"
            probability={32}
            window="next 90 days"
            factors={[
              { label: "Two-month gap between visits" },
              { label: "Review left at 3 stars" },
            ]}
            intervention="Have Jordan call to acknowledge the 3-star review and offer a complimentary roadworthy check on next visit."
            ctaLabel="Book follow-up"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · low</span>
          <ChurnRiskCard
            customerName="Mick Davis"
            probability={8}
            window="next 90 days"
            factors={[
              { label: "Single closed P2 ticket" },
            ]}
            intervention="No action required this week. Confirm Tue 4 Jun fitment lands on time."
            ctaLabel="Mark reviewed"
          />
        </section>
      </div>
    </main>
  )
}
