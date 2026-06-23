import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ExportFormatPicker } from "../../components/reports"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Export format picker | Reports",
  description:
    "Primitive 04 — PDF / CSV / Excel / JSON / Parquet picker with file-size estimate and column-trim toggle.",
}

export default function ExportFormatPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Export format picker"
        title="Export format picker"
        description="Card-grid format picker, file-size estimate chip on each tile, optional column-trim toggle for narrower downstream exports."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Export format picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ExportFormatPicker initialFormat="excel" />
      </section>
    </main>
  )
}
