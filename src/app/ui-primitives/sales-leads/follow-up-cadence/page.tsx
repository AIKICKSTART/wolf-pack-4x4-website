import type { Metadata } from "next"

import { FollowUpCadenceCard } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_CADENCE_TOUCHPOINTS } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Follow-up cadence card | Sales leads",
  description:
    "Primitive 09 — multi-touch follow-up cadence with day offsets, touch kinds, and status chips.",
}

export default function FollowUpCadenceScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Cadence"
        title="Follow-up cadence"
        description="The six-touch cadence we run on every hot inbound lead. Status chips show what's completed, what's due now, and what's still upcoming."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Follow-up cadence" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hot inbound — Mick Davis</span>
        <FollowUpCadenceCard
          cadenceName="Manta cat-back hot lead"
          audience="Inbound — quote ready, fitment not booked"
          touchpoints={MUFFLERMEN_CADENCE_TOUCHPOINTS}
        />
      </section>
    </main>
  )
}
