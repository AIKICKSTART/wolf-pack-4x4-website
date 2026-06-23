import type { Metadata } from "next"

import { ChartOfAccountsTree } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_COA_GROUPS } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Chart of accounts | Accounting | UI Primitives",
  description: "Hierarchical chart of accounts across Assets, Liabilities, Equity, Income and Expenses with balances per node.",
}

export default function ChartOfAccountsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03"
        title="Chart of accounts tree"
        description="Workshop chart of accounts grouped by classification. Each parent node can be collapsed; balances roll up at the group level with normal-balance side indicated by chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Chart of accounts" },
        ]}
      />
      <ChartOfAccountsTree groups={DEMO_COA_GROUPS} />
    </main>
  )
}
