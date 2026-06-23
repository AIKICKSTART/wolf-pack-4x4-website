import type { Metadata } from "next"

import { CostSavingActionCard } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Saving action | Cloud costs | UI Primitives",
  description:
    "Saving action card describing a discrete cost saving — monthly savings AUD, effort chip and implement CTA.",
}

export default function SavingActionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14"
        title="Cost saving action card"
        description="Card representing one discrete recommended action. Header chips call out category, effort and status; the savings ribbon shows monthly savings; an implement CTA is offered."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Cost saving action card" },
        ]}
      />
      <div className={styles.savingsRow}>
        <CostSavingActionCard
          id="save-s3-int-tier"
          title="Switch oakflats-content-prod to Intelligent-Tiering"
          description="Move 62 TB of long-tail static content from S3 Standard to S3 Intelligent-Tiering. Access patterns over the last 90 days show only 6% of objects are hot."
          category="Storage"
          monthlySavingAud={420}
          effort="low"
          status="new"
        />
        <CostSavingActionCard
          id="save-pg-replica-shrink"
          title="Right-size muffler-pulse-pg-replica"
          description="Read replica CPU stays under 12% during AU business hours. Drop one size to db.t4g.large or remove the second replica entirely."
          category="Database"
          monthlySavingAud={560}
          effort="medium"
          status="in_review"
        />
        <CostSavingActionCard
          id="save-ec2-graviton"
          title="Move kvcache-worker-pool from c5.4xlarge to c7g.4xlarge"
          description="Graviton workers benchmark 22% faster on KV-cache prefill at 26% lower hourly rate. Workload is already statically linked aarch64."
          category="Compute"
          monthlySavingAud={840}
          effort="high"
          status="new"
        />
        <CostSavingActionCard
          id="save-cf-cache"
          title="Tighten CloudFront cache headers for /assets"
          description="Cache hit ratio of 41% under-performs the 80% target. Move /assets/* to Cache-Control: public, max-age=31536000, immutable and rev URLs at build."
          category="CDN"
          monthlySavingAud={260}
          effort="low"
          status="implemented"
        />
      </div>
    </main>
  )
}
