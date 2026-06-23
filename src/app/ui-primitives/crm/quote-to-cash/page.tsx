import type { Metadata } from "next"

import { QuoteToCashFunnel } from "../../components/crm"
import { PageHeader } from "../../components/page-header"
import { QUOTE_TO_CASH_STAGES } from "../demo-data"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Quote-to-cash funnel | CRM",
  description:
    "Primitive 14 — quote-to-cash funnel visual: Lead → Qualified → Quoted → Approved → Invoiced → Paid, with counts, AUD totals, and stage-by-stage drop-off.",
}

export default function QuoteToCashScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Quote-to-cash"
        title="Quote-to-cash funnel"
        description="Visualises the workshop's revenue funnel from first lead all the way to paid invoice. Each bar shows the deal count and total AUD value at that stage, with conversion against the lead count and stage-by-stage drop-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Quote-to-cash" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen — last 90 days</span>
        <QuoteToCashFunnel stages={QUOTE_TO_CASH_STAGES} />
      </section>
    </main>
  )
}
