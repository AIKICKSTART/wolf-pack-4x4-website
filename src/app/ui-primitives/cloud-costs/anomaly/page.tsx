import type { Metadata } from "next"

import { CostAnomalyCard } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Cost anomaly | Cloud costs | UI Primitives",
  description:
    "Detected AWS cost anomaly card — service, region, baseline vs spike, sparkline trend and recommended action.",
}

export default function AnomalyPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04"
        title="Cost anomaly card"
        description="Card describing a detected spend spike. Shows service, region, detection timestamp, baseline vs spike daily AUD, sparkline trend and a recommended action statement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Cost anomaly card" },
        ]}
      />
      <CostAnomalyCard
        id="ano-rds-prod-001"
        service="RDS"
        region="ap-southeast-2"
        detectedAtISO="2026-05-28T03:42:00+10:00"
        baselineDailyAud={108.4}
        spikeDailyAud={263.2}
        trend={[104, 110, 108, 112, 109, 106, 111, 263]}
        severity="critical"
        recommendation="muffler-pulse-pg-prod runaway query load detected on storage IOPS. Check pg_stat_statements and consider promoting the read replica or adding indexes on hot tables."
      />
    </main>
  )
}
