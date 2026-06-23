import type { Metadata } from "next"

import { RegionCostHeatmap } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_REGION_CELLS } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Region heatmap | Cloud costs | UI Primitives",
  description:
    "Stylised map of AWS regions tone-coded by spend with Sydney (ap-southeast-2) and Melbourne (ap-southeast-4) highlighted.",
}

export default function RegionHeatmapPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12"
        title="Region cost heatmap"
        description="Stylised plate of the AWS regions verridian-prod uses. Each region appears as a tone-coded dot — larger and redder for heavier spend — with a list of region totals below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Region cost heatmap" },
        ]}
      />
      <RegionCostHeatmap
        periodLabel={DEMO_ACCOUNT.periodLabel}
        cells={DEMO_REGION_CELLS}
      />
    </main>
  )
}
