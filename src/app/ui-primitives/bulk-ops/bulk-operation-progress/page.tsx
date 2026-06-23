import type { Metadata } from "next"

import { BulkOperationProgress } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { PROGRESS_STATE } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Operation progress | Bulk operations",
  description:
    "Primitive 04 — long-running bulk operation progress strip with processed-count, ETA, and pause / resume / cancel controls.",
}

export default function BulkOperationProgressScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Bulk"
        title="Bulk operation progress"
        description="Anchors a long-running bulk run with progress, ETA, and operator controls. Supports a paused state with diagonal hashing so it reads correctly when an operator steps in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Operation progress" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — archiving quotes
        </span>
        <BulkOperationProgress
          operationLabel="Archive overdue quotes"
          state={PROGRESS_STATE}
        />
        <span className={styles.demoLabel}>Paused variant</span>
        <BulkOperationProgress
          operationLabel="Reassign Casey's bookings"
          state={{ processed: 28, total: 64, etaSeconds: 240, paused: true }}
        />
      </section>
    </main>
  )
}
