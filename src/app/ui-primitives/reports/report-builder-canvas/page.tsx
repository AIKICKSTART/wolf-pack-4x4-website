import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReportBuilderCanvas } from "../../components/reports"
import { BUILDER_FIELDS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Report builder canvas | Reports",
  description:
    "Primitive 01 — three-pane canvas with field library, drop zones, and live preview for composing weekly bay utilisation reports.",
}

const PREVIEW_HEADERS = ["Suburb", "Jobs", "Revenue", "Hours"] as const
const PREVIEW_ROWS = [
  ["Oak Flats", "182", "$48,210", "94.0"],
  ["Albion Park", "144", "$31,540", "73.2"],
  ["Shellharbour", "101", "$22,180", "52.4"],
] as const

export default function ReportBuilderCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Report builder canvas"
        title="Report builder canvas"
        description="Three pane composer — drag fields from the library into Rows, Columns, Values, and Filters. The right pane reflects the live shape of the resulting report."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Report builder canvas" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ReportBuilderCanvas
          fields={BUILDER_FIELDS}
          initialZones={{
            rows: ["suburb"],
            values: ["revenue-aud", "labour-hours"],
          }}
          previewHeaders={[...PREVIEW_HEADERS]}
          previewRows={PREVIEW_ROWS.map((row) => [...row])}
        />
      </section>
    </main>
  )
}
