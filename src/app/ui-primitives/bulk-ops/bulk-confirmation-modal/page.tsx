import type { Metadata } from "next"

import { BulkConfirmationModal } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Bulk confirmation modal | Bulk operations",
  description:
    "Primitive 03 — destructive bulk-action confirmation with typed-input phrase, impact summary, and irreversibility chip.",
}

export default function BulkConfirmationModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Bulk"
        title="Bulk confirmation modal"
        description="Gates destructive bulk runs behind a typed phrase, with a structured impact summary so operators see exactly what they're about to change before continuing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Bulk confirmation modal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — archive 237 quotes
        </span>
        <BulkConfirmationModal
          title="Archive 237 quotes?"
          body="The selected quotes will be moved to archive and hidden from active boards. Customers will not receive a notification."
          confirmationPhrase="ARCHIVE-237"
          confirmLabel="Archive quotes"
          impact={[
            { label: "Quotes archived", value: "237" },
            { label: "Customers notified", value: "0" },
            { label: "Linked work orders affected", value: "12" },
            { label: "Revenue removed from forecast", value: "$184,520" },
          ]}
        />
      </section>
    </main>
  )
}
