import type { Metadata } from "next"

import { AffiliatePayoutHistory } from "../../components/loyalty/affiliate-payout-history"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_PAYOUTS } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Affiliate payout history | Loyalty | UI Primitives",
  description:
    "Affiliate payout table — date, AUD amount, method (PayID / BSB / store credit), and status chip. Visual reference, no real transactions wired.",
}

export default function AffiliatePayoutHistoryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 09"
        title="Affiliate payout history"
        description="Six recent payouts including PayID and BSB transfers, store credit, scheduled payouts, and a failed BSB transfer awaiting member follow-up."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Affiliate payout history" },
        ]}
      />
      <section className={styles.sceneShell}>
        <AffiliatePayoutHistory
          rows={SAMPLE_PAYOUTS}
          caption="Recent payouts — last 90 days"
          period="Last 90 days"
        />
      </section>
    </main>
  )
}
