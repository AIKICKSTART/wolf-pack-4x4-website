import type { Metadata } from "next"

import { TaxPeriodBanner } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_PERIOD_CURRENT } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Tax period banner | Accounting | UI Primitives",
  description: "Current tax period banner with due-date countdown, status chip and file-now CTA.",
}

export default function TaxPeriodPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11"
        title="Tax period banner"
        description="Compact banner pinned to the top of the accounting dashboard. Surfaces the current BAS period, lodgement status, due-date countdown and a primary file-now CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Tax period" },
        ]}
      />
      <TaxPeriodBanner
        period={DEMO_PERIOD_CURRENT}
        dueDateISO="2026-07-28"
        amountOwing={13640.0}
        status="drafted"
        showFileNow
      />
    </main>
  )
}
