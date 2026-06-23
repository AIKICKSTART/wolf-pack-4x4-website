import type { Metadata } from "next"

import { WorkshopManagerDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Workshop manager dashboard | Persona Dashboards",
  description:
    "Persona composite — workshop manager. Bay flow, job kanban, activity stream, utilization, alert routing, and weekly revenue curve.",
}

export default function WorkshopManagerDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 01 / Workshop manager"
        title="Workshop manager dashboard"
        description="Live operational view across all six bays — what's on the rack, who's running late, where the revenue is pacing, and which alerts the supervisor needs to act on before close."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Workshop manager" },
        ]}
      />
      <WorkshopManagerDashboard />
    </main>
  )
}
