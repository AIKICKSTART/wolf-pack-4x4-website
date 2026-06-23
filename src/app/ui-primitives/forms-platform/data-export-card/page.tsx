import type { Metadata } from "next"

import { DataExportCard } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { EXPORT_PRESETS, EXPORT_RANGE } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Data export card | Forms platform",
  description:
    "Primitive 11 — submissions export card with CSV / JSON / XLS / PDF preset tiles and a date-range badge.",
}

export default function DataExportCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Data export card"
        title="Data export card"
        description="Export the last 28 days of submissions. CSV is selected — 64 rows estimated across Book-a-Service, Request Quote, Trade Account Apply, Newsletter Signup, and Warranty Claim. The Hermes JSON variant feeds the workshop agent; the PDF variant is intended for the owner&rsquo;s weekly pack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Data export card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — submissions export
        </span>
        <div className={styles.demoInline}>
          <DataExportCard
            title="Export submissions"
            range={EXPORT_RANGE}
            presets={EXPORT_PRESETS}
            selectedPresetId="x-csv"
            totalRows={64}
          />
        </div>
      </section>
    </main>
  )
}
