import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { HandoffCard } from "../../components/hermes-agent"

import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Handoff card | Hermes",
  description:
    "Primitive 07 — Hermes → human handoff card with reason, assignee, SLA countdown and accept action.",
}

export default function HandoffCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Handoff"
        title="Handoff card"
        description="When Hermes can't safely resolve a conversation, it surfaces a handoff card naming the customer, the channel, the reason for escalation, the assigned human handler and the SLA countdown for the accept action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Handoff card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · P1 critical · refund &gt; $200 → manager
        </span>
        <HandoffCard
          id="esc_9183"
          customerName="Karen W."
          channel="phone-voice"
          priority="p1-critical"
          reason="Refund > $200 AUD requested · disputed Manta DPF warranty claim. Hermes paused per policy."
          summary="Customer wants $480 refund on a 14-month-old DPF cat-back fitted by Bay 2 on 18 Mar."
          assigneeName="Bec Singh"
          assigneeRole="Front desk · manager"
          slaRemainingMinutes={4}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · P2 high · after-hours emergency
        </span>
        <HandoffCard
          id="esc_9184"
          customerName="Anonymous"
          channel="sms"
          priority="p2-high"
          reason="After-hours emergency · vehicle stranded on M1 north of Wollongong."
          summary="Driver requesting urgent tow info + nearest open workshop."
          assigneeName="Sam Whittaker"
          assigneeRole="Workshop lead · on-call"
          slaRemainingMinutes={9}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · P3 watch · confidence under 50%
        </span>
        <HandoffCard
          id="esc_9185"
          customerName="Ash Lambert"
          channel="instagram"
          priority="p3-watch"
          reason="Hermes confidence 42% · missing variant data on engineered exhaust."
          assigneeName="Jordan Riley"
          assigneeRole="Bay 2 tech"
          slaRemainingMinutes={28}
        />
      </section>
    </main>
  )
}
