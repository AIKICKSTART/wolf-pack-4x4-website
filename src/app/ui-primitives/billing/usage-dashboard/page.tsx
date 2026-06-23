import type { Metadata } from "next"

import { UsageBillingDashboard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_PERIOD, DEMO_USAGE_FEATURES, DEMO_USAGE_TREND } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Usage dashboard | Billing | UI Primitives",
  description:
    "Usage-based billing dashboard primitive — per-metric usage meter, 30-day sparkline trend, projected overage charge.",
}

export default function UsageDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11"
        title="Usage dashboard"
        description="Metered features across the current billing period. Each tile carries an aria-meter with the percentage used, a 30-day sparkline, the unit rate, and the projected overage charge to date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Usage dashboard" },
        ]}
      />
      <UsageBillingDashboard
        period={DEMO_PERIOD}
        features={DEMO_USAGE_FEATURES}
        trendByMetric={DEMO_USAGE_TREND}
      />
    </main>
  )
}
