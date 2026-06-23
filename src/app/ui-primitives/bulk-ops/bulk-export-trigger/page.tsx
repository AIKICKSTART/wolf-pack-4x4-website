import type { Metadata } from "next"

import { BulkExportTrigger } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Export trigger | Bulk operations",
  description:
    "Primitive 11 — bulk export trigger card with scope chip, format picker, include-archived toggle, email-when-ready toggle, and Export CTA.",
}

export default function BulkExportTriggerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Bulk"
        title="Bulk export trigger"
        description="Initiates a bulk export with the right defaults. Format buttons act as a radiogroup, and the email-when-ready toggle reflects the asynchronous nature of large exports."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Export trigger" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — export selected parts
        </span>
        <BulkExportTrigger
          scopeLabel="412 parts · Vendor: Manta Performance"
          estimatedRows={412}
        />
      </section>
    </main>
  )
}
