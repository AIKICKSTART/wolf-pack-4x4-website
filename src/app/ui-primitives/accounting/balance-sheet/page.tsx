import type { Metadata } from "next"

import { BalanceSheetView } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import {
  DEMO_BS_ASSETS,
  DEMO_BS_EQUITY,
  DEMO_BS_LIABILITIES,
  DEMO_PERIOD_CURRENT,
} from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Balance sheet | Accounting | UI Primitives",
  description: "Balance sheet view — Assets vs Liabilities + Equity with totals and a live A = L + E match indicator.",
}

export default function BalanceSheetPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05"
        title="Balance sheet view"
        description="Statement of position with Assets on the left and Liabilities + Equity stacked on the right. The match meter reports whether the books balance and flags any variance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Balance sheet" },
        ]}
      />
      <BalanceSheetView
        asOf={DEMO_PERIOD_CURRENT}
        assets={DEMO_BS_ASSETS}
        liabilities={DEMO_BS_LIABILITIES}
        equity={DEMO_BS_EQUITY}
      />
    </main>
  )
}
