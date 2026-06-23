import type { Metadata } from "next"

import { BulkTagApply } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { TAG_SUGGESTIONS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Tag apply | Bulk operations",
  description:
    "Primitive 12 — bulk tag apply panel with existing-tag suggestions and replace-vs-add mode toggle.",
}

export default function BulkTagApplyScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Bulk"
        title="Bulk tag apply"
        description="Apply tags to a selection. Suggestions are sourced from existing tags with their usage count so operators stay consistent and avoid creating near-duplicates."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Tag apply" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — tag selection
        </span>
        <BulkTagApply
          scopeLabel="237 quotes selected"
          initialTags={["escalated"]}
          suggestions={TAG_SUGGESTIONS}
        />
      </section>
    </main>
  )
}
