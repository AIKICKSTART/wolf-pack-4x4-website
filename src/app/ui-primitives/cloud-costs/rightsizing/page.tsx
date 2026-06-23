import type { Metadata } from "next"

import { RightsizingRecommendation } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Rightsizing | Cloud costs | UI Primitives",
  description:
    "Per-resource rightsizing recommendation card — current SKU vs suggested + CPU/memory utilisation + AUD savings.",
}

export default function RightsizingPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08"
        title="Rightsizing recommendation"
        description="Card recommending a smaller SKU for an under-utilised resource. Compares current vs suggested SKU, shows CPU and memory averages and lists monthly and annualised savings."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Rightsizing recommendation" },
        ]}
      />
      <div className={styles.consoleStack}>
        <RightsizingRecommendation
          id="rs-mufflerpulse-api"
          service="EC2"
          resourceName="muffler-pulse-api-prod"
          region="ap-southeast-2"
          currentSku="m5.2xlarge"
          suggestedSku="m6i.large"
          currentMonthlyAud={1840.4}
          suggestedMonthlyAud={520.2}
          avgCpuPct={12}
          avgMemoryPct={28}
        />
        <RightsizingRecommendation
          id="rs-pg-replica"
          service="RDS"
          resourceName="muffler-pulse-pg-replica"
          region="ap-southeast-4"
          currentSku="db.m5.large"
          suggestedSku="db.t4g.large"
          currentMonthlyAud={980.6}
          suggestedMonthlyAud={420.4}
          avgCpuPct={9}
          avgMemoryPct={42}
        />
      </div>
    </main>
  )
}
