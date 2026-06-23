import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PurchaseOrderLineRow } from "../../components/inventory-deep"

import { PO_LINES } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Purchase order line row | Inventory deep",
  description:
    "Primitive 13 — PO line row with qty / price / receive button.",
}

export default function PurchaseOrderLineRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / PO line"
        title="Purchase order line row"
        description="PO line — ordered vs received qty, unit price, subtotal, status chip and inline Receive button driven from progress meter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Purchase order line row" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Open · awaiting first delivery</span>
        <div className={styles.stack}>
          <PurchaseOrderLineRow {...PO_LINES[0]} />
        </div>

        <span className={styles.stageCaption}>Partial · mid-receipt</span>
        <div className={styles.stack}>
          <PurchaseOrderLineRow {...PO_LINES[1]} />
        </div>

        <span className={styles.stageCaption}>Received + back-ordered</span>
        <div className={styles.stack}>
          <PurchaseOrderLineRow {...PO_LINES[2]} />
          <PurchaseOrderLineRow {...PO_LINES[3]} />
        </div>
      </section>
    </main>
  )
}
