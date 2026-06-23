import type { Metadata } from "next"

import { CostByServiceDonut } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_SERVICE_SPEND } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Cost by service | Cloud costs | UI Primitives",
  description:
    "Donut chart split of AWS spend across services — EC2, RDS, S3, Lambda, CloudFront — with legend.",
}

export default function ServiceDonutPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02"
        title="Cost by service donut"
        description="Donut chart that splits spend across the core AWS services. Center label shows total, legend rows show percentage and absolute AUD."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Cost by service donut" },
        ]}
      />
      <CostByServiceDonut
        periodLabel={DEMO_ACCOUNT.periodLabel}
        rows={DEMO_SERVICE_SPEND}
      />
    </main>
  )
}
