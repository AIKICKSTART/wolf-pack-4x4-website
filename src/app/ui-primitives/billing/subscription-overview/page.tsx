import type { Metadata } from "next"

import { SubscriptionOverviewCard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { CUSTOMER, DEMO_AMOUNTS } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Subscription overview | Billing | UI Primitives",
  description:
    "Subscription overview card primitive — plan summary, status chip, next renewal, amount and manage CTAs.",
}

export default function SubscriptionOverviewPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01"
        title="Subscription overview"
        description="Compact card summarising the active subscription. Shows plan name, status chip, billing amount, next renewal, and manage actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Subscription overview" },
        ]}
      />
      <SubscriptionOverviewCard
        planName="Workshop Pro · Monthly"
        status="active"
        interval="monthly"
        amount={DEMO_AMOUNTS.monthlyTotal}
        nextRenewalISO="2026-06-04"
        customerName={CUSTOMER.name}
        seatsUsed={6}
        seatsIncluded={8}
        actions={[
          { label: "Change plan", variant: "primary" },
          { label: "Update payment method", variant: "ghost" },
          { label: "Cancel subscription", variant: "danger" },
        ]}
      />
    </main>
  )
}
