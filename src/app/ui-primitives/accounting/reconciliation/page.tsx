import type { Metadata } from "next"

import { AccountReconciliationRow } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Bank reconciliation | Accounting | UI Primitives",
  description: "Bank reconciliation row primitive — statement amount vs ledger amount, variance and match action.",
}

export default function ReconciliationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08"
        title="Account reconciliation row"
        description="Single reconciliation row pairing a bank statement line with the matching ledger entry. The variance is highlighted when non-zero and a match / unmatch action is exposed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Reconciliation" },
        ]}
      />
      <div className={styles.reconciliationStack}>
        <AccountReconciliationRow
          dateISO="2026-04-18"
          description="EFT — Roberts A. — INV-30418"
          counterparty="Roberts A."
          reference="FT-9981203"
          bankAmount={506.0}
          ledgerAmount={506.0}
          status="auto_matched"
        />
        <AccountReconciliationRow
          dateISO="2026-04-22"
          description="WAGES — Fortnightly run"
          counterparty="Mufflermen PTY"
          reference="WAG-04-22"
          bankAmount={-4180.0}
          ledgerAmount={-4180.0}
          status="matched"
        />
        <AccountReconciliationRow
          dateISO="2026-04-25"
          description="Cash sale — exhaust upgrade"
          counterparty="Counter sale"
          reference="EFTPOS-440"
          bankAmount={1240.0}
          ledgerAmount={1124.0}
          status="needs_review"
        />
        <AccountReconciliationRow
          dateISO="2026-04-28"
          description="ORIGIN ENERGY — Workshop bill"
          counterparty="Origin Energy"
          reference="BILL-3041"
          bankAmount={-412.0}
          ledgerAmount={0}
          status="unmatched"
        />
      </div>
    </main>
  )
}
