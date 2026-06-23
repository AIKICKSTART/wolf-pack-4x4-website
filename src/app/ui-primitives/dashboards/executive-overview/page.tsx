import type { Metadata } from "next"

import { ExecutiveOverviewDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Executive overview dashboard | Persona Dashboards",
  description:
    "Persona composite — executive overview. Four big-number stats, 12-week trend, workshop heatmap, leading indicators, plan ribbon.",
}

export default function ExecutiveOverviewDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 08 / Executive overview"
        title="Executive overview dashboard"
        description="Fewer widgets, bigger numbers. The four KPIs the owner steers by, the trend behind them, where the workshop has been busy, and the leading indicators worth watching."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Executive overview" },
        ]}
      />
      <ExecutiveOverviewDashboard />
    </main>
  )
}
