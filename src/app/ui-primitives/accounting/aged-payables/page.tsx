import type { Metadata } from "next"

import { AgedPayablesGrid } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_AP_ROWS } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Aged payables | Accounting | UI Primitives",
  description: "Aged creditors grid — supplier rows × ageing buckets with bucket and grand totals.",
}

export default function AgedPayablesPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10"
        title="Aged payables grid"
        description="Outstanding supplier invoices bucketed by ageing — Not due, 1-30, 31-60 and 60+ days. Critical balances (60+ days) flag as alerts so the bookkeeper can prioritise payments."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Aged payables" },
        ]}
      />
      <AgedPayablesGrid asOfLabel="28 May 2026" rows={DEMO_AP_ROWS} />
    </main>
  )
}
