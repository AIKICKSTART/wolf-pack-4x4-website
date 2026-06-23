import type { Metadata } from "next"

import { ReceiptPrinterRow } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { RECEIPT_QUEUE } from "../_mock-data"
import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Receipt printer row | POS checkout",
  description:
    "Primitive 05 — print queue row with status, kind glyph, operator, age and reprint button. Reprint disabled until printed or failed.",
}

export default function ReceiptPrinterRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Receipt printer row"
        title="Receipt printer row"
        description="Print queue row — queued / printing / printed / failed states with kind glyph, operator, age and a reprint CTA enabled only on resolved states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Receipt printer row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · live print queue · four rows</span>
        <div className={styles.queueList} role="list">
          {RECEIPT_QUEUE.map((entry) => (
            <ReceiptPrinterRow key={entry.id} {...entry} />
          ))}
        </div>
        <span className={styles.stageCaption}>State 02 · isolated printed row</span>
        <div className={styles.queueList} role="list">
          <ReceiptPrinterRow
            id="rcpt-iso-1"
            receiptNumber="OFM-30421"
            kind="sale"
            operator="Mia"
            enqueuedLabel="1m ago"
            status="printed"
          />
        </div>
        <span className={styles.stageCaption}>State 03 · void receipt failed · Daniel</span>
        <div className={styles.queueList} role="list">
          <ReceiptPrinterRow
            id="rcpt-iso-2"
            receiptNumber="OFM-30422"
            kind="void"
            operator="Daniel"
            enqueuedLabel="6m ago"
            status="failed"
          />
        </div>
      </section>
    </main>
  )
}
