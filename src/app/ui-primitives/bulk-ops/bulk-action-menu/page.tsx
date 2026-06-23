import type { Metadata } from "next"

import { BulkActionMenu } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { ACTION_OPTIONS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Bulk-action menu | Bulk operations",
  description:
    "Primitive 02 — dropdown menu of bulk actions: tag, move, assign, change status, export, archive, delete. Destructive actions are tone-coded and divided.",
}

export default function BulkActionMenuScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Bulk"
        title="Bulk-action menu"
        description="A dropdown that exposes the canonical bulk-action set. Destructive actions sit beneath a divider and inherit a red tone. Reusable across quotes, parts, customers, and bookings."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Bulk-action menu" },
        ]}
      />
      <section
        className={styles.demoSurface}
        style={{ minHeight: 460, paddingBottom: 80 }}
      >
        <span className={styles.demoLabel}>Live primitive — menu open by default</span>
        <div style={{ paddingTop: 6 }}>
          <BulkActionMenu actions={ACTION_OPTIONS} defaultOpen />
        </div>
      </section>
    </main>
  )
}
