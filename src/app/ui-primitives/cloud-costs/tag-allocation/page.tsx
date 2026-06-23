import type { Metadata } from "next"

import { TagAllocationPie } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_TAG_ALLOCATION, DEMO_TAG_UNTAGGED } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Tag allocation | Cloud costs | UI Primitives",
  description:
    "Donut allocation of cloud spend by tag dimension (environment, team, project) with untagged-spend chip.",
}

export default function TagAllocationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07"
        title="Tag allocation pie"
        description="Donut chart that allocates spend across tag values for a chosen dimension (environment, team, project). Untagged spend is surfaced as an amber chip in the header."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Tag allocation pie" },
        ]}
      />
      <TagAllocationPie
        periodLabel={DEMO_ACCOUNT.periodLabel}
        tagDimension="env"
        segments={DEMO_TAG_ALLOCATION}
        untaggedAud={DEMO_TAG_UNTAGGED}
      />
    </main>
  )
}
