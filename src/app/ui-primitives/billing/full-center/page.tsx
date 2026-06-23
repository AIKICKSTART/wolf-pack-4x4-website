import type { Metadata } from "next"

import {
  CreditBalanceCard,
  DunningNoticeCard,
  InvoiceViewer,
  PaymentMethodUpdate,
  PlanSwitcher,
  SubscriptionOverviewCard,
  UsageBillingDashboard,
} from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import {
  CUSTOMER,
  DEMO_AMOUNTS,
  DEMO_CREDIT_LEDGER,
  DEMO_FEATURES,
  DEMO_INVOICE_LINES,
  DEMO_PERIOD,
  DEMO_PLANS,
  DEMO_USAGE_FEATURES,
  DEMO_USAGE_TREND,
} from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Full billing center | Billing | UI Primitives",
  description:
    "Bonus composition combining seven billing primitives into a single customer billing center surface.",
}

export default function FullBillingCenterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition"
        title="Full billing center"
        description="Bonus surface that assembles overview, dunning, invoice viewer, credit balance, usage dashboard, plan switcher and payment method update into one realistic customer billing center."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Full center" },
        ]}
      />

      <div className={styles.centerStack}>
        <SubscriptionOverviewCard
          planName="Workshop Pro · Monthly"
          status="past_due"
          interval="monthly"
          amount={DEMO_AMOUNTS.monthlyTotal}
          nextRenewalISO="2026-06-04"
          customerName={CUSTOMER.name}
          seatsUsed={6}
          seatsIncluded={8}
          actions={[
            { label: "Resolve past due", variant: "primary" },
            { label: "Change plan", variant: "ghost" },
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

        <div className={styles.centerRow}>
          <InvoiceViewer
            invoiceNumber="OFM-30418"
            status="overdue"
            issuedISO="2026-05-04"
            dueISO="2026-05-18"
            customerName={CUSTOMER.name}
            customerAddress={CUSTOMER.address}
            lineItems={DEMO_INVOICE_LINES}
            abn="56 102 998 312"
          />
          <CreditBalanceCard
            available={DEMO_AMOUNTS.availableCredit}
            ledger={DEMO_CREDIT_LEDGER}
          />
        </div>

        <UsageBillingDashboard
          period={DEMO_PERIOD}
          features={DEMO_USAGE_FEATURES}
          trendByMetric={DEMO_USAGE_TREND}
        />

        <div className={styles.centerRowSingle}>
          <PlanSwitcher
            plans={DEMO_PLANS}
            currentPlanId="workshop_pro"
            features={DEMO_FEATURES}
          />
        </div>

        <PaymentMethodUpdate
          initialBillingAddress={{
            line1: "12 Mort Estate Lane",
            suburb: "Tarrawanna",
            state: "NSW",
            postcode: "2518",
          }}
        />
      </div>
    </main>
  )
}
