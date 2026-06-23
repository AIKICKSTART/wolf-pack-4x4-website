import type { Metadata } from "next"

import { CloudCostOverview } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_OVERVIEW } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Cloud cost overview | Cloud costs | UI Primitives",
  description:
    "Month-to-date AWS spend, end-of-period forecast and budget-vs-actual chart for verridian-prod in Sydney.",
}

export default function CloudCostOverviewPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01"
        title="Cloud cost overview"
        description="Month-to-date spend, forecast end-of-period spend and a weekly budget-vs-actual bar chart. Headline tiles call out month-over-month delta and the budget consumed percentage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Cloud cost overview" },
        ]}
      />
      <CloudCostOverview
        accountLabel={DEMO_ACCOUNT.label}
        monthLabel={DEMO_ACCOUNT.monthLabel}
        mtdSpend={DEMO_OVERVIEW.mtdSpend}
        forecastSpend={DEMO_OVERVIEW.forecastSpend}
        budget={DEMO_OVERVIEW.budget}
        lastMonthSpend={DEMO_OVERVIEW.lastMonthSpend}
        trendLabels={DEMO_OVERVIEW.trendLabels}
        budgetSeries={DEMO_OVERVIEW.budgetSeries}
        actualSeries={DEMO_OVERVIEW.actualSeries}
      />
    </main>
  )
}
