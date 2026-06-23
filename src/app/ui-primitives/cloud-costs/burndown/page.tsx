import type { Metadata } from "next"

import { DailyBudgetBurndown } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_BURNDOWN } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Daily burndown | Cloud costs | UI Primitives",
  description:
    "Daily budget burndown chart with daily target line vs cumulative actual spend, including variance percentage.",
}

export default function BurndownPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13"
        title="Daily budget burndown"
        description="Cumulative budget burndown plotted day-by-day. The target line tracks the straight-line budget pace; the actual line tracks cumulative real spend. Header chip calls out the state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Daily budget burndown" },
        ]}
      />
      <DailyBudgetBurndown
        periodLabel={DEMO_ACCOUNT.periodLabel}
        dateLabels={DEMO_BURNDOWN.dateLabels}
        targetSeries={DEMO_BURNDOWN.target}
        actualSeries={DEMO_BURNDOWN.actual}
        budget={DEMO_BURNDOWN.budget}
      />
    </main>
  )
}
