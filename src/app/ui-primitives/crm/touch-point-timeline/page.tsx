import type { Metadata } from "next"

import { TouchPointTimeline } from "../../components/crm"
import { PageHeader } from "../../components/page-header"
import { MICK_TOUCH_POINTS } from "../demo-data"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Touch-point timeline | CRM",
  description:
    "Primitive 09 — vertical touch-point timeline showing all customer interactions: call, email, SMS, in-person, DM, quote sent, invoice, payment.",
}

export default function TouchPointTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Touch-point timeline"
        title="Touch-point timeline"
        description="Vertical timeline of every interaction with a customer. Each touch is iconified and tone-coded by kind, and threads can be expanded inline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Touch-point timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mick Davis — last 10 days</span>
        <TouchPointTimeline points={MICK_TOUCH_POINTS} />
      </section>
    </main>
  )
}
