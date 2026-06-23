import type { Metadata } from "next"

import { NextActionCard } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Next action | CRM",
  description:
    "Primitive 13 — next-action suggestion card with urgency chip, primary CTA, and snooze popover (1h / 1d / 1w).",
}

export default function NextActionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Next action"
        title="Next action card"
        description="A nudge card recommending the next move for a customer. Surfaces urgency, the rationale, the primary CTA, and a snooze popover for the rest."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Next action" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Four urgency levels</span>
        <div className={styles.demoStack}>
          <NextActionCard
            id="na-1"
            headline="Call Mick about Hilux SR5 fitment"
            rationale="Last contact 12 days ago — Mudgee trip on the 17th won't wait. Quote Q-2207 is unanswered."
            urgency="overdue"
            primaryActionLabel="Call now"
          />
          <NextActionCard
            id="na-2"
            headline="Send Hiace fleet quote to Sarah Pope"
            rationale="Sarah asked for a fleet quote on six Hiace muffler swaps two days ago — turnaround within 24h keeps the deal warm."
            urgency="now"
            primaryActionLabel="Draft quote"
          />
          <NextActionCard
            id="na-3"
            headline="Follow up Trent Williams on Patrol options"
            rationale="Walk-in 10 days ago, sent options pack 8 days ago — no reply yet. Suggest a callback before Friday."
            urgency="soon"
            primaryActionLabel="Schedule callback"
          />
          <NextActionCard
            id="na-4"
            headline="Email Albion Park Couriers — annual service reminder"
            rationale="Fleet annual service due in 6 weeks. Heads-up gives them time to stagger vans through the workshop."
            urgency="low"
            primaryActionLabel="Send reminder"
          />
        </div>
      </section>
    </main>
  )
}
