import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { KpiSnapshotTile } from "../../components/reports"
import { Sparkline } from "../../components/charts/sparkline"
import { KPI_SPARKS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "KPI snapshot tile | Reports",
  description:
    "Primitive 09 — KPI snapshot tile with label, value, delta, comparison vs prior period, sparkline and drill-down arrow.",
}

export default function KpiSnapshotTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / KPI snapshot tile"
        title="KPI snapshot tile"
        description="A compact KPI tile with a delta chip, prior-period comparison, mini sparkline and a drill-down affordance. Click anywhere on the tile to inspect contributors."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "KPI snapshot tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumns}>
          <KpiSnapshotTile
            label="Bay utilisation"
            value="82"
            unit="%"
            deltaLabel="+4.0 pts"
            deltaTone="positive"
            comparisonLabel="vs prior week (78%)"
            spark={
              <Sparkline points={KPI_SPARKS.utilisation} tone="teal" ariaLabel="Utilisation trend" />
            }
          />
          <KpiSnapshotTile
            label="Manta revenue"
            value="$18.4k"
            deltaLabel="+12.4%"
            deltaTone="positive"
            comparisonLabel="vs prior month ($16.4k)"
            spark={
              <Sparkline points={KPI_SPARKS.revenue} tone="amber" ariaLabel="Revenue trend" />
            }
          />
          <KpiSnapshotTile
            label="Jobs completed"
            value="54"
            deltaLabel="+3 vs avg"
            deltaTone="positive"
            comparisonLabel="vs 13-week avg (51)"
            spark={
              <Sparkline points={KPI_SPARKS.jobs} tone="green" ariaLabel="Jobs trend" />
            }
          />
          <KpiSnapshotTile
            label="Customer LTV"
            value="$2,110"
            deltaLabel="−1.4%"
            deltaTone="negative"
            comparisonLabel="vs Q-prior ($2,140)"
            spark={
              <Sparkline points={KPI_SPARKS.ltv} tone="red" ariaLabel="LTV trend" />
            }
          />
        </div>
      </section>
    </main>
  )
}
