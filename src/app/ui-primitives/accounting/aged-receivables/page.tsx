import type { Metadata } from "next"

import { AgedReceivablesGrid } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_AR_ROWS } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Aged receivables | Accounting | UI Primitives",
  description: "Aged debtors grid — customer rows × ageing buckets with bucket and grand totals.",
}

export default function AgedReceivablesPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09"
        title="Aged receivables grid"
        description="Outstanding customer invoices bucketed by ageing — Current, 1-30, 31-60 and 60+ days. Each row shows the customer and the amount sitting in each bucket; the footer sums each column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Aged receivables" },
        ]}
      />
      <AgedReceivablesGrid asOfLabel="28 May 2026" rows={DEMO_AR_ROWS} />
    </main>
  )
}
