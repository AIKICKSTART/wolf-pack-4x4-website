import type { Metadata } from "next"

import { JournalEntryRow } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_JOURNAL_ENTRY } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Journal entry row | Accounting | UI Primitives",
  description: "Double-entry journal row primitive — line debits, line credits, account refs, memo and balance check.",
}

export default function JournalEntryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01"
        title="Journal entry row"
        description="A single posted journal entry displayed as a card. Shows date, entry number, status chip, line debit/credit table and the Dr = Cr balance check."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Journal entry" },
        ]}
      />
      <JournalEntryRow entry={DEMO_JOURNAL_ENTRY} />
    </main>
  )
}
