import type { Metadata } from "next"

import { HermesOperatorDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Hermes operator dashboard | Persona Dashboards",
  description:
    "Persona composite — Hermes ops operator. Campaign kanban, alert inbox, reach trend, channel health gauges, alert routing.",
}

export default function HermesOperatorDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 07 / Hermes operator"
        title="Hermes operator dashboard"
        description="The ops cockpit — where every campaign currently sits, what just broke, where reach is heading, and how the channel rails are feeling end-to-end."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Hermes operator" },
        ]}
      />
      <HermesOperatorDashboard />
    </main>
  )
}
