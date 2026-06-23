import type { Metadata } from "next"

import { BasSummaryCard } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_PERIOD_CURRENT, WORKSHOP } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "BAS summary | Accounting | UI Primitives",
  description: "Australian Business Activity Statement summary card — GST collected vs paid, PAYG withholding and lodgement status.",
}

export default function BasSummaryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07"
        title="BAS summary card"
        description="Quarterly Business Activity Statement card — GST collected (1A), GST paid (1B), PAYG withholding (W2) and total owing to the ATO. Status chip and due-date countdown convey lodgement state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "BAS summary" },
        ]}
      />
      <BasSummaryCard
        abn={WORKSHOP.abn}
        period={DEMO_PERIOD_CURRENT}
        dueDateISO="2026-07-28"
        gstCollected={43342.0}
        gstPaid={34922.0}
        paygWithholding={5640.0}
        paygInstalment={3580.0}
        status="drafted"
      />
    </main>
  )
}
