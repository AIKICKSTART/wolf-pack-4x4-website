import type { Metadata } from "next"

import { LeadScoreBreakdown } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_LEAD_SCORE_SIGNALS } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead score breakdown | Sales leads",
  description:
    "Primitive 04 — full 0-100 lead score breakdown with positive and negative signals, points, and reasoning chips.",
}

export default function LeadScoreBreakdownScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Score breakdown"
        title="Lead score breakdown"
        description="Per-signal contribution to the lead score. Positive signals stack on the left, negative drags on the right. Reasoning chips spell out why the model thinks what it thinks."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Score breakdown" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mick Davis — hot lead</span>
        <LeadScoreBreakdown
          total={73}
          signals={MUFFLERMEN_LEAD_SCORE_SIGNALS}
        />
      </section>
    </main>
  )
}
