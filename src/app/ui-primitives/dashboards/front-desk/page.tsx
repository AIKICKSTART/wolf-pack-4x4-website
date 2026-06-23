import type { Metadata } from "next"

import { FrontDeskDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Front desk dashboard | Persona Dashboards",
  description:
    "Persona composite — front desk. Day calendar with bay swimlanes, customer queue, quick actions, and notification inbox.",
}

export default function FrontDeskDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 02 / Front desk"
        title="Front desk dashboard"
        description="Counter view at Oak Flats — the day at a glance, who's currently in the workshop, who needs a callback, and the four keystrokes that book the next job."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Front desk" },
        ]}
      />
      <FrontDeskDashboard />
    </main>
  )
}
