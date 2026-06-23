import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { KpiCardLarge } from "../../components/reports-deep"
import { Sparkline } from "../../components/charts/sparkline"
import { KPI_SPARKS_DEEP } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "KPI card · large | Reports-deep",
  description:
    "Primitive 05 — large KPI card with goal arc gauge, delta chip, prior-period comparison and a footer sparkline.",
}

export default function KpiCardLargePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / KPI card · large"
        title="KPI card · large"
        description="A featured KPI card with goal arc, delta chip, prior comparison and a sparkline footer. The arc fills clockwise from the 7-o'clock baseline. Mufflermen weekly revenue $42,180, dyno bookings, parts margin and conversion rate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "KPI card · large" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumns}>
          <KpiCardLarge
            kicker="Week 22 FY26 · inc GST"
            label="Weekly revenue"
            value="$42,180"
            deltaLabel="+6.4%"
            deltaTone="positive"
            comparisonLabel="vs prior week ($39,640)"
            goalRatio={0.937}
            goalLabel="$45k goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.revenue} tone="teal" ariaLabel="Revenue trend" />}
          />
          <KpiCardLarge
            kicker="Week 22 FY26"
            label="Dyno bookings"
            value="27"
            unit="bookings"
            deltaLabel="+3 vs avg"
            deltaTone="positive"
            comparisonLabel="vs 8-week avg (24)"
            goalRatio={0.8}
            goalLabel="30/wk goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.dyno} tone="amber" ariaLabel="Dyno trend" />}
          />
          <KpiCardLarge
            kicker="Month to date · May"
            label="Parts margin"
            value="$11,840"
            deltaLabel="+2.1 pts"
            deltaTone="positive"
            comparisonLabel="vs prior month ($9,720)"
            goalRatio={0.86}
            goalLabel="$13.8k goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.partsMargin} tone="green" ariaLabel="Parts margin trend" />}
          />
          <KpiCardLarge
            kicker="Rolling 14 days"
            label="Quote conversion"
            value="48.2"
            unit="%"
            deltaLabel="−6.4 pts"
            deltaTone="negative"
            comparisonLabel="vs prior 14 days (54.6%)"
            goalRatio={0.69}
            goalLabel="70% goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.conversion} tone="red" ariaLabel="Conversion trend" />}
          />
        </div>
      </section>
    </main>
  )
}
