import type { Metadata } from "next"

import { CostTrendAreaChart } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_DAILY_POINTS } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Cost trend | Cloud costs | UI Primitives",
  description:
    "Daily AWS cost area chart with selectable range (7/14/30/90 days) and forecast band overlay.",
}

export default function CostTrendPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10"
        title="Cost trend area chart"
        description="Daily cost line drawn as a smooth area chart with a forecast band overlay. Pill-style range picker switches between 7, 14, 30 and 90 day windows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Cost trend area chart" },
        ]}
      />
      <CostTrendAreaChart
        accountLabel={DEMO_ACCOUNT.label}
        points={DEMO_DAILY_POINTS}
        initialRange="30d"
      />
    </main>
  )
}
