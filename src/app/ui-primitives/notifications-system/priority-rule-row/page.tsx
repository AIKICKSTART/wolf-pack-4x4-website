import type { Metadata } from "next"

import { PriorityRuleRow } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_EVENTS, MOCK_PRIORITY_RULES } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Priority rule row | Notifications system",
  description:
    "Primitive 11 — escalation rule row with enable toggle, minute threshold, and action picker.",
}

function eventLabel(id: string): string {
  return MOCK_EVENTS.find((event) => event.id === id)?.label ?? id
}

const paymentRule = MOCK_PRIORITY_RULES[0]
const bookingRule = MOCK_PRIORITY_RULES[3]

export default function PriorityRuleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Priority rule row"
        title="Priority rule row"
        description="An escalation rule — if an event is still unread after N minutes, run an action (page, escalate, email supervisor, SMS on-call). One row at a time so the rule editor stays scannable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Priority rule row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Full active rule list (4 rows)</span>
        <div className={styles.priorityList}>
          {MOCK_PRIORITY_RULES.map((rule) => (
            <PriorityRuleRow
              key={rule.id}
              rule={rule}
              eventLabel={eventLabel(rule.event)}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Single enabled rule</span>
        <PriorityRuleRow rule={paymentRule} eventLabel={eventLabel(paymentRule.event)} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Disabled rule (dimmed)</span>
        <PriorityRuleRow rule={bookingRule} eventLabel={eventLabel(bookingRule.event)} />
      </section>
    </main>
  )
}
