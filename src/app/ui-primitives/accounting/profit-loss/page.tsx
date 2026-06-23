import type { Metadata } from "next"

import { ProfitLossStatement } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import {
  DEMO_NET_TREND,
  DEMO_PERIODS,
  DEMO_PNL_COGS,
  DEMO_PNL_OPEX,
  DEMO_PNL_REVENUE,
} from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Profit & loss | Accounting | UI Primitives",
  description: "Profit and loss statement primitive — revenue, COGS, gross profit, operating expenses and net profit with period selector.",
}

export default function ProfitLossPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04"
        title="Profit & loss statement"
        description="Income statement with Revenue → COGS → Gross profit → Operating expenses → Net profit. Quarter selector switches the reporting period; the sparkline shows trailing net profit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Profit & loss" },
        ]}
      />
      <ProfitLossStatement
        periods={DEMO_PERIODS}
        initialPeriodIndex={DEMO_PERIODS.length - 1}
        revenue={DEMO_PNL_REVENUE}
        cogs={DEMO_PNL_COGS}
        opex={DEMO_PNL_OPEX}
        netProfitTrend={DEMO_NET_TREND}
      />
    </main>
  )
}
