import type { Metadata } from "next"

import { CommitmentUtilization } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Commitment utilisation | Cloud costs | UI Primitives",
  description:
    "Reserved instance / savings plan utilisation card — radial meter, committed vs used and AUD savings.",
}

export default function CommitmentPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06"
        title="Commitment utilisation"
        description="Card showing utilisation of a reserved instance / savings plan with a radial meter, committed vs utilised AUD, unused (waste) and savings versus on-demand."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Commitment utilisation" },
        ]}
      />
      <div className={styles.consoleStack}>
        <CommitmentUtilization
          id="ri-m5xlarge-syd"
          commitmentType="reserved_instance"
          label="1yr All Upfront — m5.xlarge"
          region="ap-southeast-2"
          termStartISO="2025-11-01"
          termEndISO="2026-10-31"
          committedAud={14400}
          utilizedAud={13380}
          previousUtilizationPct={88}
          savingsAud={4280}
        />
        <CommitmentUtilization
          id="sp-compute-syd"
          commitmentType="savings_plan"
          label="3yr Compute Savings Plan — $1.40/h"
          region="ap-southeast-2"
          termStartISO="2024-06-01"
          termEndISO="2027-05-31"
          committedAud={36720}
          utilizedAud={22020}
          previousUtilizationPct={68}
          savingsAud={8420}
        />
      </div>
    </main>
  )
}
