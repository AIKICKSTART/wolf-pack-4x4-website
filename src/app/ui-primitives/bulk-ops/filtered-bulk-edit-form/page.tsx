import type { Metadata } from "next"

import { FilteredBulkEditForm } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { BULK_EDIT_FIELDS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Filtered bulk edit | Bulk operations",
  description:
    "Primitive 09 — bulk-edit form with field picker, set / append / clear / increment operations, value input, and only-update-empty guard.",
}

export default function FilteredBulkEditFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Bulk"
        title="Filtered bulk edit"
        description="Lets operators apply a structured edit to a filtered selection. Append and increment cover the common safe operations; only-update-empty preserves existing data when desired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Filtered bulk edit" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — 42 quotes filtered
        </span>
        <FilteredBulkEditForm
          scopeLabel="42 quotes · Status: Awaiting parts"
          fieldOptions={BULK_EDIT_FIELDS}
          defaultFieldId="status"
          defaultOperation="set"
          defaultValue="Ready to invoice"
        />
      </section>
    </main>
  )
}
