import type { Metadata } from "next"

import { LeadToQuoteFunnel } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_FUNNEL } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead-to-quote funnel | Sales leads",
  description:
    "Primitive 07 — five-stage conversion funnel from inbound lead through marketing-qualified and sales-qualified to won deal.",
}

export default function LeadFunnelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Funnel"
        title="Lead-to-quote funnel"
        description="Lead → MQL → SQL → Quote → Won. Per-stage count, total AUD pipeline value, and visible drop-off at every gate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Funnel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Last 30 days</span>
        <LeadToQuoteFunnel stages={MUFFLERMEN_FUNNEL} />
      </section>
    </main>
  )
}
