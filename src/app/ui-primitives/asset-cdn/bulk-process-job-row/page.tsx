import type { Metadata } from "next"

import { BulkProcessJobRow } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_BULK_JOBS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Bulk-process job row | Asset CDN",
  description: "Primitive 12 — bulk processing job row with progress, stats grid, and pause / resume / cancel.",
}

export default function BulkProcessJobRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Bulk job row"
        title="Bulk-process job row"
        description="One row per bulk pipeline — rendition rebuild, watermark sweep, archive purge, LQIP rebuild, format migration. Each row exposes a kind badge, a progress bar, the done / total / failed / ETA grid, and the right set of action buttons for its status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Bulk job row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · every status</span>
        <div className={styles.demoStack}>
          {DEMO_BULK_JOBS.map((job) => (
            <BulkProcessJobRow key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  )
}
