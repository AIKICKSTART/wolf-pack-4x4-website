import type { Metadata } from "next"

import { LeadSourceMixDonut } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_LEAD_SOURCE_MIX } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Source mix donut | Sales leads",
  description:
    "Primitive 02 — donut chart of inbound lead sources over a rolling 30-day window.",
}

export default function LeadSourceMixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Source mix donut"
        title="Source mix donut"
        description="Where last month's inquiries came from. Phone still beats every paid channel; referrals over-index for fleet."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Source mix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <LeadSourceMixDonut data={MUFFLERMEN_LEAD_SOURCE_MIX} />
      </section>
    </main>
  )
}
