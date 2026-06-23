import type { Metadata } from "next"

import { BudgetAlertBanner } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_OVERVIEW } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Budget alert | Cloud costs | UI Primitives",
  description:
    "Budget alert banner with delta chip and segmented usage bar — approaching or exceeded states.",
}

export default function BudgetAlertPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05"
        title="Budget alert banner"
        description="Banner that fires when a budget threshold is crossed. Includes icon, title, subtitle copy, delta chip and a segmented progress meter showing actual vs cap."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Budget alert banner" },
        ]}
      />
      <div className={styles.consoleStack}>
        <BudgetAlertBanner
          budgetName="Production AWS spend"
          periodLabel={DEMO_ACCOUNT.periodLabel}
          budget={DEMO_OVERVIEW.budget}
          actual={DEMO_OVERVIEW.mtdSpend}
          forecast={DEMO_OVERVIEW.forecastSpend}
          thresholdPct={80}
          state="approaching"
        />
        <BudgetAlertBanner
          budgetName="Data platform — May"
          periodLabel={DEMO_ACCOUNT.periodLabel}
          budget={12000}
          actual={13420.4}
          forecast={14820.0}
          thresholdPct={100}
          state="exceeded"
        />
        <BudgetAlertBanner
          budgetName="Staging — May"
          periodLabel={DEMO_ACCOUNT.periodLabel}
          budget={6000}
          actual={3120.4}
          forecast={5640.0}
          thresholdPct={80}
          state="ok"
        />
      </div>
    </main>
  )
}
