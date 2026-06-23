import type { Metadata } from "next"

import { TechnicianMobileDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Technician mobile dashboard | Persona Dashboards",
  description:
    "Persona composite — on-tool technician on mobile. Active job ticket, materials checklist, handover link, bottom nav.",
}

export default function TechnicianMobileDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 09 / Technician · mobile"
        title="Technician mobile dashboard"
        description="The view from the bay — a single phone-shaped surface with the current job ticket front-and-centre, the materials still to grab, and the handover checklist one tap away."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Technician · mobile" },
        ]}
      />
      <TechnicianMobileDashboard />
    </main>
  )
}
