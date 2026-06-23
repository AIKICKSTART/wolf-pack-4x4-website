import type { Metadata } from "next"

import { LostReasonPareto } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_LOST_REASONS } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lost reason Pareto | Sales leads",
  description:
    "Primitive 12 — Pareto chart of lost-lead reasons with cumulative 80/20 break.",
}

export default function LostReasonParetoScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Pareto"
        title="Lost-reason Pareto"
        description="Why deals die. Sorted descending by frequency with a cumulative percentage column so the 80/20 cluster falls out naturally."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Lost reason Pareto" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Last 90 days</span>
        <LostReasonPareto data={MUFFLERMEN_LOST_REASONS} />
      </section>
    </main>
  )
}
