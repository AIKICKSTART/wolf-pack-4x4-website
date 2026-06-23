import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BatchTrackingRow } from "../../components/inventory-deep"

import { BATCHES } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Batch tracking row | Inventory deep",
  description:
    "Primitive 05 — batch / lot / expiry row with traceability link and lifecycle chip.",
}

export default function BatchTrackingRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Batch"
        title="Batch tracking row"
        description="Batch / lot record — mfg + expiry dates, quantity, lifecycle bucket (in-stock, near-expiry, expired, quarantine) and a traceability deep-link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Batch tracking row" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>In stock · fresh batch</span>
        <div className={styles.stack}>
          <BatchTrackingRow {...BATCHES[0]} />
        </div>

        <span className={styles.stageCaption}>Near expiry · prioritise</span>
        <div className={styles.stack}>
          <BatchTrackingRow {...BATCHES[1]} />
        </div>

        <span className={styles.stageCaption}>Expired + quarantine queue</span>
        <div className={styles.stack}>
          <BatchTrackingRow {...BATCHES[2]} />
          <BatchTrackingRow {...BATCHES[3]} />
        </div>
      </section>
    </main>
  )
}
