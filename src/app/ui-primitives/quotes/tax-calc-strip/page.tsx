import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TaxCalcStrip } from "../../components/quotes"

import { QUOTE_TOTALS, TAX_LINES } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Tax calc strip | Quotes | UI Primitives",
  description:
    "Tax calculation strip — subtotal, GST 10% AU, total, and tax-inclusive toggle.",
}

export default function TaxCalcStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 04"
        title="Tax calculation strip"
        description="Strip-form totals component used at the foot of every quote. Subtotal + applicable taxes (GST 10% in AU) + grand total. Tax-inclusive toggle changes how the customer sees pricing on the proposal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Tax calc strip" },
        ]}
      />
      <TaxCalcStrip
        subtotal={QUOTE_TOTALS.subtotal}
        taxes={TAX_LINES}
        total={QUOTE_TOTALS.total}
      />
    </main>
  )
}
