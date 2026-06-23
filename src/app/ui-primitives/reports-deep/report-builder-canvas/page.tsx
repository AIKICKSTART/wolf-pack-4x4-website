import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReportBuilderCanvas } from "../../components/reports-deep"
import {
  BUILDER_DIMENSIONS,
  BUILDER_FILTERS,
  BUILDER_MEASURES,
} from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Report builder canvas | Reports-deep",
  description:
    "Primitive 01 — drag filter chips, dimensions and measures from the library into zones; pick a chart kind for the resulting view.",
}

export default function ReportBuilderCanvasDeepPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Report builder canvas"
        title="Report builder canvas"
        description="Drag-drop builder with four zones — filters, dimensions, measures and chart kind. Drop fields from the library on the left into any zone, or remove them with the × on each token. Chart picker is a radio group."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Report builder canvas" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ReportBuilderCanvas
          library={{
            filters: BUILDER_FILTERS,
            dimensions: BUILDER_DIMENSIONS,
            measures: BUILDER_MEASURES,
          }}
          initial={{
            filters: ["f-current-week"],
            dimensions: ["d-suburb", "d-service"],
            measures: ["m-revenue", "m-margin"],
          }}
        />
      </section>
    </main>
  )
}
