import type { Metadata } from "next"

import { CustomerPortalDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Customer portal dashboard | Persona Dashboards",
  description:
    "Persona composite — customer portal. Active job progress, garage, open quotes, invoice history, helpful articles.",
}

export default function CustomerPortalDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 04 / Customer portal"
        title="Customer portal dashboard"
        description="What a customer sees when they log in — the active job's progress, every vehicle they've trusted us with, any quotes still open, and a tidy invoice history for the books."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Customer portal" },
        ]}
      />
      <CustomerPortalDashboard />
    </main>
  )
}
