import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TransferOrderRow } from "../../components/inventory-deep"

import { TRANSFERS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Transfer order row | Inventory deep",
  description:
    "Primitive 03 — inter-bay transfer row with status, ETA and signature footer.",
}

export default function TransferOrderRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Transfer"
        title="Transfer order row"
        description="Inter-bay transfer row — source bin, destination bin, SKU, qty, status chip, ETA and optional signature footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Transfer order row" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>In transit · live ETA</span>
        <div className={styles.stack}>
          <TransferOrderRow {...TRANSFERS[0]} />
        </div>

        <span className={styles.stageCaption}>Signed · receipt closed</span>
        <div className={styles.stack}>
          <TransferOrderRow {...TRANSFERS[1]} />
        </div>

        <span className={styles.stageCaption}>Draft + received batch</span>
        <div className={styles.stack}>
          <TransferOrderRow {...TRANSFERS[2]} />
          <TransferOrderRow {...TRANSFERS[3]} />
        </div>
      </section>
    </main>
  )
}
