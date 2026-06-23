import type { Metadata } from "next"

import { BulkReassignCard } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { ASSIGNEES, FROM_ASSIGNEE } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Bulk reassign | Bulk operations",
  description:
    "Primitive 13 — bulk reassign card with from-assignee chip, to-assignee picker, transfer-comments and notify toggles.",
}

export default function BulkReassignCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Bulk"
        title="Bulk reassign"
        description="Transfer ownership of a selection from one assignee to another. Includes the comments / notification choices that determine how cleanly the change lands for both parties."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Reassign" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — reassign 8 bookings
        </span>
        <BulkReassignCard
          scopeLabel="8 bookings"
          fromAssignee={FROM_ASSIGNEE}
          candidates={ASSIGNEES}
          defaultToAssigneeId="u-mtran"
          defaultMode="replace"
        />
      </section>
    </main>
  )
}
