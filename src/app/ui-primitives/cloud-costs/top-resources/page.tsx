import type { Metadata } from "next"

import { TopCostResourcesTable } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_TOP_RESOURCES } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Top cost resources | Cloud costs | UI Primitives",
  description:
    "Most expensive AWS resources for the period — service, region, attribute chips and AUD spend.",
}

export default function TopResourcesPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03"
        title="Top cost resources"
        description="Data table of the most expensive AWS resources for the period. Rows include service chip, region, attribute chips (instance type, OS, AZ) and AUD spend."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Top cost resources" },
        ]}
      />
      <TopCostResourcesTable
        periodLabel={DEMO_ACCOUNT.periodLabel}
        rows={DEMO_TOP_RESOURCES}
      />
    </main>
  )
}
