import type { Metadata } from "next"

import { DunningNoticeCard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_AMOUNTS } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Dunning notice | Billing | UI Primitives",
  description:
    "Dunning notice card primitive — past-due banner, stage chip, retry schedule, grace period chip, payment CTAs.",
}

export default function DunningNoticePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10"
        title="Dunning notice"
        description="Past-due notice with stage chip (first notice, retry scheduled, final notice, service suspended), days past due, next retry date, grace-end date, and CTAs for pay now and update payment method. Uses role='alert'."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Dunning notice" },
        ]}
      />
      <DunningNoticeCard
        stage="final_notice"
        amountDue={DEMO_AMOUNTS.pastDue}
        invoiceNumber="OFM-30418"
        daysPastDue={12}
        retryNextISO="2026-05-30"
        graceEndsISO="2026-06-04"
      />
    </main>
  )
}
