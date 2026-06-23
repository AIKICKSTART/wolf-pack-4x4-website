import type { Metadata } from "next"

import { UnusedResourceRow } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Unused resources | Cloud costs | UI Primitives",
  description:
    "Idle AWS resource rows with idle days, monthly cost, last activity and decommission CTA.",
}

export default function UnusedResourcePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09"
        title="Unused resource row"
        description="Single-row treatment of an idle / unused AWS resource. Shows resource name and ARN, service and region chips, idle days, monthly cost and a suggested action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Unused resource row" },
        ]}
      />
      <div className={styles.unusedStack}>
        <UnusedResourceRow
          id="vol-0fa83a2c14e9d72c1"
          name="legacy-ebs-snapshot-archive"
          service="EC2"
          region="ap-southeast-2"
          idleDays={62}
          monthlyCostAud={184.4}
          lastActivityISO="2026-03-26"
          suggestedAction="decommission"
        />
        <UnusedResourceRow
          id="elb-old-ingress-v1"
          name="old-ingress-elb-v1"
          service="EC2"
          region="ap-southeast-2"
          idleDays={28}
          monthlyCostAud={62.8}
          lastActivityISO="2026-04-30"
          suggestedAction="stop"
        />
        <UnusedResourceRow
          id="i-0d1a44e91d8c70b22"
          name="dev-experiments-runner"
          service="EC2"
          region="ap-southeast-4"
          idleDays={14}
          monthlyCostAud={142.0}
          lastActivityISO="2026-05-14"
          suggestedAction="snapshot"
        />
        <UnusedResourceRow
          id="db-stale-staging"
          name="muffler-pulse-staging-pg"
          service="RDS"
          region="ap-southeast-2"
          idleDays={48}
          monthlyCostAud={420.6}
          lastActivityISO="2026-04-10"
          suggestedAction="decommission"
        />
      </div>
    </main>
  )
}
