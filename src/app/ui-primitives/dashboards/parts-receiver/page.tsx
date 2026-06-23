import type { Metadata } from "next"

import { PartsReceiverDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Parts receiver dashboard | Persona Dashboards",
  description:
    "Persona composite — parts receiver. Inbound POs, stock vs reorder point, supplier signal strength, recent receipts trend.",
}

export default function PartsReceiverDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 03 / Parts receiver"
        title="Parts receiver dashboard"
        description="Yard view for the receiver — POs landing today, where stock sits against the reorder point, which suppliers are responsive, and where there's a quiet patch in the pipeline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Parts receiver" },
        ]}
      />
      <PartsReceiverDashboard />
    </main>
  )
}
