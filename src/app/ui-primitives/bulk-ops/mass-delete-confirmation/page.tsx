import type { Metadata } from "next"

import { MassDeleteConfirmation } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Mass delete | Bulk operations",
  description:
    "Primitive 10 — final delete confirmation with warning illustration, typed-input phrase, recovery-window chip, and red destructive CTA.",
}

export default function MassDeleteConfirmationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Bulk"
        title="Mass delete confirmation"
        description="The heavier sibling of the bulk confirmation modal. Used only for true mass-delete operations where the recovery window matters as much as the typed phrase."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Mass delete" },
        ]}
      />
      <section
        className={styles.demoSurface}
        style={{ display: "grid", placeItems: "center" }}
      >
        <span className={styles.demoLabel}>
          Live primitive — delete 1,284 stale customers
        </span>
        <MassDeleteConfirmation
          title="Delete 1,284 stale customers?"
          body="These customers have had no activity in 36 months. They will be moved to soft-delete and purged after the recovery window."
          recordCount={1284}
          resourceLabel="customers"
          confirmationPhrase="DELETE-1284"
          recoveryWindowLabel="30 days"
        />
      </section>
    </main>
  )
}
