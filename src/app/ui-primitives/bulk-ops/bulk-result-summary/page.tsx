import type { Metadata } from "next"

import { BulkResultSummary } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { RESULT_COUNTS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Result summary | Bulk operations",
  description:
    "Primitive 07 — bulk run result card with success / skipped / failed counts, impact summary, and export-result CTA.",
}

export default function BulkResultSummaryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Bulk"
        title="Bulk result summary"
        description="Renders after a bulk run completes. Three tone-coded count tiles tell the whole story at a glance, an impact paragraph explains the real-world effect, and operators can export the per-row result for audit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Result summary" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — archive run complete</span>
        <BulkResultSummary
          title="Archive overdue quotes — complete"
          counts={RESULT_COUNTS}
          impactSummary="221 quotes archived. 12 linked work orders were detached and re-linked to their customers. 9 quotes were skipped because they were already archived. 7 quotes failed due to VIN-mismatch errors that need manual resolution."
          completedAtLabel="Completed 2 min ago"
        />
      </section>
    </main>
  )
}
