import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DrilldownInspector } from "../../components/reports"
import { DRILLDOWN_ROWS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Drilldown inspector | Reports",
  description:
    "Primitive 13 — drill-down inspector pane with breakdown rows, mini bar chart and contributing dimensions.",
}

export default function DrilldownInspectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Drilldown inspector"
        title="Drilldown inspector"
        description="Click into a KPI tile and this inspector pane breaks the total back down across its contributing dimensions, ranked by share with inline mini bars."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Drilldown inspector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <DrilldownInspector
          parentMetric="May FY26 revenue"
          parentValue="$426,020"
          dimensionLabel="By job type"
          rows={DRILLDOWN_ROWS}
          totalDescription="across Oak Flats, Albion Park and Shellharbour bays."
        />
      </section>
    </main>
  )
}
