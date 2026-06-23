import type { Metadata } from "next"

import { ChargebackReport } from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT, DEMO_CHARGEBACK_ROWS } from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Chargeback | Cloud costs | UI Primitives",
  description:
    "Per-team chargeback report — contact, allocation bar, trend sparkline and invoiced AUD per team.",
}

export default function ChargebackPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11"
        title="Chargeback report"
        description="Data table allocating cloud spend back to consuming teams. Each row shows the team name and contact, allocation percentage as a bar, a trend sparkline and the AUD chargeback for the period."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Chargeback report" },
        ]}
      />
      <ChargebackReport
        periodLabel={DEMO_ACCOUNT.periodLabel}
        rows={DEMO_CHARGEBACK_ROWS}
      />
    </main>
  )
}
