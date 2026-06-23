import type { Metadata } from "next"

import { JournalEntryForm } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNTS } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Journal entry form | Accounting | UI Primitives",
  description: "Form to create a journal entry — account picker, debit/credit per line and auto-balance check.",
}

export default function JournalFormPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12"
        title="Journal entry form"
        description="Form to compose a new journal entry. Operators add or remove lines, pick an account, and enter a debit or credit per line. The form auto-checks that Dr = Cr before allowing the post action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Journal form" },
        ]}
      />
      <JournalEntryForm
        accounts={DEMO_ACCOUNTS}
        defaultDateISO="2026-05-28"
        initialLines={[
          { id: "seed-1", accountCode: "1100", debit: "660.00", memo: "Invoice 30521 raised" },
          { id: "seed-2", accountCode: "4000", credit: "600.00", memo: "Muffler replacement" },
          { id: "seed-3", accountCode: "2100", credit: "60.00", memo: "GST collected 10%" },
        ]}
      />
    </main>
  )
}
