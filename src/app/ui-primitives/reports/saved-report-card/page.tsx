import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SavedReportCard } from "../../components/reports"
import { Sparkline } from "../../components/charts/sparkline"
import { KPI_SPARKS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Saved report card | Reports",
  description:
    "Primitive 02 — saved report tile with owner, last-run, schedule chip, and per-report actions.",
}

export default function SavedReportCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Saved report card"
        title="Saved report card"
        description="A library tile for every saved report — owner, last run, schedule chip, thumbnail mini chart, and the open / edit / duplicate / share actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Saved report card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumns}>
          <SavedReportCard
            title="Weekly bay utilisation"
            owner="Daniel F."
            lastRun="2h ago"
            scheduleLabel="Mon · 06:00"
            thumbnail={
              <Sparkline points={KPI_SPARKS.utilisation} tone="teal" ariaLabel="Utilisation trend" />
            }
          />
          <SavedReportCard
            title="Monthly Manta sales"
            owner="Sienna P."
            lastRun="3 days ago"
            scheduleLabel="1st · 06:00"
            thumbnail={
              <Sparkline points={KPI_SPARKS.revenue} tone="amber" ariaLabel="Manta revenue trend" />
            }
          />
          <SavedReportCard
            title="Quarterly customer LTV"
            owner="Jordan H."
            lastRun="11 days ago"
            scheduleLabel="Q-end · 09:00"
            thumbnail={
              <Sparkline points={KPI_SPARKS.ltv} tone="green" ariaLabel="LTV trend" />
            }
          />
          <SavedReportCard
            title="Suburb-level lead conversion"
            owner="Charlie M."
            lastRun="1 day ago"
            thumbnail={
              <Sparkline points={KPI_SPARKS.jobs} tone="red" ariaLabel="Conversion trend" />
            }
          />
        </div>
      </section>
    </main>
  )
}
