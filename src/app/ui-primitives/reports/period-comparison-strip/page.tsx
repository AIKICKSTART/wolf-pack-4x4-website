import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PeriodComparisonStrip } from "../../components/reports"
import { Sparkline } from "../../components/charts/sparkline"
import { KPI_SPARKS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Period comparison strip | Reports",
  description:
    "Primitive 12 — strip comparing current value to prior period with delta chip, direction, and trend mini sparkline.",
}

export default function PeriodComparisonStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Period comparison strip"
        title="Period comparison strip"
        description="A side-by-side comparison strip — current period on the left, prior period on the right, delta chip in the middle, trend sparkline pinned to the end."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Period comparison strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <PeriodComparisonStrip
            metricLabel="Bay utilisation"
            currentValue="82%"
            currentLabel="This week"
            priorValue="78%"
            priorLabel="Prior week"
            deltaLabel="+4.0 pts"
            deltaTone="positive"
            spark={
              <Sparkline points={KPI_SPARKS.utilisation} tone="teal" ariaLabel="Utilisation trend" />
            }
          />
          <PeriodComparisonStrip
            metricLabel="Manta units sold"
            currentValue="54"
            currentLabel="May FY26"
            priorValue="48"
            priorLabel="April FY26"
            deltaLabel="+12.5%"
            deltaTone="positive"
            spark={
              <Sparkline points={KPI_SPARKS.jobs} tone="green" ariaLabel="Units trend" />
            }
          />
          <PeriodComparisonStrip
            metricLabel="Customer LTV"
            currentValue="$2,110"
            currentLabel="Q4 FY26"
            priorValue="$2,140"
            priorLabel="Q3 FY26"
            deltaLabel="−1.4%"
            deltaTone="negative"
            spark={<Sparkline points={KPI_SPARKS.ltv} tone="red" ariaLabel="LTV trend" />}
          />
        </div>
      </section>
    </main>
  )
}
