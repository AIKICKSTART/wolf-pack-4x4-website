import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConditionBranchCard } from "../../components/workflow-engine"

import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Condition branch card | Workflow engine",
  description:
    "Primitive 10 — if/else condition card with expression editor and hit-rate split.",
}

export default function ConditionBranchCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Branching"
        title="Condition branch card"
        description="The if/else gate. Type the expression in the small editor, see which downstream the YES and NO branches resolve to. The hit-rate chip shows where last week's traffic ended up — useful for spotting branches that never fire."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Condition branch card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Refund &gt; $200 · manager-grade branching
        </span>
        <ConditionBranchCard
          kicker="Refund flow · v2"
          title="Refund > $200?"
          defaultExpression="refund.amount > 200"
          yesLabel="Manager approval"
          yesService="Eddie Vrahnos · workshop manager"
          noLabel="Auto-approve · Stripe refund"
          noService="Stripe · refunds.create"
          hitRateYes={0.37}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Roadworthy expiry · escalate when no booking
        </span>
        <ConditionBranchCard
          kicker="RWC expiry · T-7d"
          title="Booking already scheduled?"
          defaultExpression="vehicle.bookings.any(b => b.type === 'rwc' && b.startsAt < expiry)"
          yesLabel="Send confirmation SMS"
          yesService="Twilio · sms.send · template:tpl-rwc-confirmed"
          noLabel="Escalate to Hermes"
          noService="Hermes · queue.bookingNeeded"
          hitRateYes={0.62}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Customer responded · day-3 nudge gate
        </span>
        <ConditionBranchCard
          kicker="Quote follow-up · v3.2"
          title="Customer responded to quote?"
          defaultExpression="quote.lastReplyAt > quote.sentAt"
          yesLabel="Mark already engaged"
          yesService="CRM · note.append"
          noLabel="Send follow-up SMS"
          noService="Twilio · sms.send"
          hitRateYes={0.41}
        />
      </section>
    </main>
  )
}
