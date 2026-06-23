import type { Metadata } from "next"

import { BulkSelectHeader } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { SELECTION_SUMMARY } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Bulk-select header | Bulk operations",
  description:
    "Primitive 01 — selection mode header with count chip, select-all / clear actions, active filter pill, and exit-selection control.",
}

export default function BulkSelectHeaderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Bulk"
        title="Bulk-select header"
        description="Anchors the top of a data table when selection mode is active. Surfaces selected-count, supports select-all and clear, and shows the active filter pill so operators always know the scope they're acting on."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Bulk-select header" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — 237 of 1,284 quotes selected</span>
        <BulkSelectHeader summary={SELECTION_SUMMARY} itemLabel="quote" />
      </section>
    </main>
  )
}
