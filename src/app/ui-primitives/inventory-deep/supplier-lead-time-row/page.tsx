import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierLeadTimeRow } from "../../components/inventory-deep"

import { SUPPLIER_LEAD_ROWS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Supplier lead time row | Inventory deep",
  description:
    "Primitive 10 — supplier delivery performance row with quoted vs actual lead time and on-time chip.",
}

export default function SupplierLeadTimeRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Supplier"
        title="Supplier lead time row"
        description="Supplier scorecard row — quoted vs actual median lead time, on-time percent and delivery counts. Drop into any supplier performance table."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Supplier lead time row" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>On track · ≤ quoted</span>
        <div className={styles.stack}>
          <SupplierLeadTimeRow {...SUPPLIER_LEAD_ROWS[2]} />
          <SupplierLeadTimeRow {...SUPPLIER_LEAD_ROWS[0]} />
        </div>

        <span className={styles.stageCaption}>Mild slip · investigate</span>
        <div className={styles.stack}>
          <SupplierLeadTimeRow {...SUPPLIER_LEAD_ROWS[1]} />
        </div>

        <span className={styles.stageCaption}>Major slip · escalate</span>
        <div className={styles.stack}>
          <SupplierLeadTimeRow {...SUPPLIER_LEAD_ROWS[3]} />
        </div>
      </section>
    </main>
  )
}
