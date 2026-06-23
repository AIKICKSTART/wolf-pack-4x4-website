import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  DateRangePresets,
  FilterBuilderTree,
  KpiSnapshotTile,
  PeriodComparisonStrip,
  ReportBuilderCanvas,
  ReportRunHistoryTable,
} from "../../components/reports"
import { Sparkline } from "../../components/charts/sparkline"

import {
  BUILDER_FIELDS,
  FILTER_TREE,
  KPI_SPARKS,
  PRESETS,
  RUN_HISTORY,
} from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Full report builder | Reports",
  description:
    "Composition — canvas, filter tree, presets, KPI row, period comparison and run history wired into a single workspace.",
}

const PREVIEW_HEADERS = ["Suburb", "Jobs", "Revenue", "Hours"] as const
const PREVIEW_ROWS = [
  ["Oak Flats", "182", "$48,210", "94.0"],
  ["Albion Park", "144", "$31,540", "73.2"],
  ["Shellharbour", "101", "$22,180", "52.4"],
] as const

export default function FullBuilderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full report builder"
        title="Full report builder"
        description="The whole reports surface composed — canvas, filter tree, presets, KPI snapshots, period-over-period comparison, and the run history table all rendered together."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Full builder" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Canvas + filters</span>
        <div className={styles.builderShell}>
          <div className={styles.builderMain}>
            <ReportBuilderCanvas
              fields={BUILDER_FIELDS}
              initialZones={{
                rows: ["suburb"],
                columns: ["job-type"],
                values: ["revenue-aud", "labour-hours"],
                filters: ["completed-at"],
              }}
              previewHeaders={[...PREVIEW_HEADERS]}
              previewRows={PREVIEW_ROWS.map((row) => [...row])}
            />
            <DateRangePresets presets={PRESETS} initialPresetId="last-7" />
          </div>
          <div className={styles.builderSide}>
            <FilterBuilderTree rootGroup={FILTER_TREE} />
          </div>
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>KPI snapshots</span>
        <div className={styles.demoColumns}>
          <KpiSnapshotTile
            label="Bay utilisation"
            value="82"
            unit="%"
            deltaLabel="+4.0 pts"
            deltaTone="positive"
            comparisonLabel="vs prior week (78%)"
            spark={<Sparkline points={KPI_SPARKS.utilisation} tone="teal" ariaLabel="Utilisation trend" />}
          />
          <KpiSnapshotTile
            label="Manta revenue"
            value="$18.4k"
            deltaLabel="+12.4%"
            deltaTone="positive"
            comparisonLabel="vs prior month ($16.4k)"
            spark={<Sparkline points={KPI_SPARKS.revenue} tone="amber" ariaLabel="Revenue trend" />}
          />
          <KpiSnapshotTile
            label="Jobs completed"
            value="54"
            deltaLabel="+3 vs avg"
            deltaTone="positive"
            comparisonLabel="vs 13-week avg (51)"
            spark={<Sparkline points={KPI_SPARKS.jobs} tone="green" ariaLabel="Jobs trend" />}
          />
          <KpiSnapshotTile
            label="Customer LTV"
            value="$2,110"
            deltaLabel="−1.4%"
            deltaTone="negative"
            comparisonLabel="vs Q-prior ($2,140)"
            spark={<Sparkline points={KPI_SPARKS.ltv} tone="red" ariaLabel="LTV trend" />}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Period comparison + run history</span>
        <PeriodComparisonStrip
          metricLabel="May revenue"
          currentValue="$426,020"
          currentLabel="May FY26"
          priorValue="$391,180"
          priorLabel="April FY26"
          deltaLabel="+8.9%"
          deltaTone="positive"
          spark={<Sparkline points={KPI_SPARKS.revenue} tone="teal" ariaLabel="Revenue trend" />}
        />
        <ReportRunHistoryTable runs={RUN_HISTORY} caption="Recent weekly utilisation runs" />
      </section>
    </main>
  )
}
