import type { Metadata } from "next"

import { CashFlowStatement } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import {
  DEMO_CASHFLOW_FINANCING,
  DEMO_CASHFLOW_INVESTING,
  DEMO_CASHFLOW_OPERATING,
  DEMO_CASHFLOW_TREND,
  DEMO_PERIOD_CURRENT,
} from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Cash flow | Accounting | UI Primitives",
  description: "Cash flow statement primitive — operating, investing and financing sections with a trailing-period bar chart.",
}

export default function CashFlowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06"
        title="Cash flow statement"
        description="Statement of cash flows with operating, investing and financing sections, opening and closing cash, net change for the period and a trailing-period bar chart."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Cash flow" },
        ]}
      />
      <CashFlowStatement
        period={DEMO_PERIOD_CURRENT}
        openingCash={21340.2}
        operating={DEMO_CASHFLOW_OPERATING}
        investing={DEMO_CASHFLOW_INVESTING}
        financing={DEMO_CASHFLOW_FINANCING}
        trendLabels={DEMO_CASHFLOW_TREND.labels}
        trendOperating={DEMO_CASHFLOW_TREND.operating}
        trendInvesting={DEMO_CASHFLOW_TREND.investing}
        trendFinancing={DEMO_CASHFLOW_TREND.financing}
      />
    </main>
  )
}
