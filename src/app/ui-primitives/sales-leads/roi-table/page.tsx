import type { Metadata } from "next"

import { LeadSourceRoiTable } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_ROI_ROWS } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead source ROI | Sales leads",
  description:
    "Primitive 10 — ROI per lead source — AUD spend, lead count, cost-per-lead, quote conversion, closed-won, revenue.",
}

export default function LeadSourceRoiScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / ROI table"
        title="Lead source ROI"
        description="Where every advertising dollar lands. Sortable columns — referrals are still the cheapest acquisition channel; paid ads cost over $100 per lead."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "ROI table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>30-day attributed ROI</span>
        <LeadSourceRoiTable rows={MUFFLERMEN_ROI_ROWS} />
      </section>
    </main>
  )
}
