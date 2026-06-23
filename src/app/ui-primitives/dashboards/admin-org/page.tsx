import type { Metadata } from "next"

import { AdminOrgDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Admin · organisation dashboard | Persona Dashboards",
  description:
    "Persona composite — admin / owner. MRR, customers, NPS, integrations, audit log, and pricing tier posture.",
}

export default function AdminOrgDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 05 / Owner & admin"
        title="Admin · organisation dashboard"
        description="The owner's view of the whole shop — recurring revenue, the customer base, the third-party rails, who did what at admin level, and where Oak Flats sits on the plan ladder."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Admin organisation" },
        ]}
      />
      <AdminOrgDashboard />
    </main>
  )
}
