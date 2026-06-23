import type { Metadata } from "next"

import { SavedBulkActions } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { SAVED_ACTIONS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Saved bulk actions | Bulk operations",
  description:
    "Primitive 14 — list of saved bulk actions with name, description, last-used time, average rows, and reuse CTA.",
}

export default function SavedBulkActionsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Bulk"
        title="Saved bulk actions"
        description="Lets teams reuse hand-built bulk runs as one-tap actions. Each row reveals what the action does, when it was last used, and the typical impact so operators can recognise it quickly."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Saved bulk actions" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — saved actions</span>
        <SavedBulkActions actions={SAVED_ACTIONS} />
      </section>
    </main>
  )
}
