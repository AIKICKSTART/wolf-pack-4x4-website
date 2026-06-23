import type { Metadata } from "next"

import { GeneralLedgerTable } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_LEDGER_LINES } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "General ledger | Accounting | UI Primitives",
  description: "Per-account general ledger table — date, reference, description, debit, credit and running balance.",
}

export default function GeneralLedgerPage() {
  const opening = 18420.5
  const closing = DEMO_LEDGER_LINES[DEMO_LEDGER_LINES.length - 1].runningBalance

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02"
        title="General ledger table"
        description="A single account's general ledger movements over a chosen period. Includes opening and closing balances, period delta and per-row running balance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "General ledger" },
        ]}
      />
      <GeneralLedgerTable
        accountCode="1000"
        accountName="Cash at bank — Bendigo"
        periodLabel="April 2026"
        openingBalance={opening}
        closingBalance={closing}
        lines={DEMO_LEDGER_LINES}
      />
    </main>
  )
}
