import type { Metadata } from "next"

import { MarketingPerformanceDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Marketing performance dashboard | Persona Dashboards",
  description:
    "Persona composite — marketing performance. Headline stats, 8-week trend, channel donut, campaigns table, platform integrations.",
}

export default function MarketingPerformanceDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 10 / Marketing performance"
        title="Marketing performance dashboard"
        description="Acquisition at a glance — where the workshop is showing up online, what it's costing, where clicks come from, and which campaigns are pulling their weight this month."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Marketing performance" },
        ]}
      />
      <MarketingPerformanceDashboard />
    </main>
  )
}
