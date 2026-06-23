import type { Metadata } from "next"

import { NotificationRuleBuilder } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_RULE_CHANNEL_SLOT,
  DEMO_RULE_CONDITION_SLOT,
  DEMO_RULE_DELAY_SLOT,
  DEMO_RULE_EVENT_SLOT,
} from "../demo-data"
import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Rule builder | Notifications",
  description:
    "Primitive 09 — compose notification rules with event, channel, delay, and condition slot chips.",
}

export default function RuleBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Rule builder"
        title="Notification rule builder"
        description="A chip-slot composer for routing rules — When [event], send to [channel] after [delay], unless [condition]. A live preview line below renders the rule in natural language."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Rule builder" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <NotificationRuleBuilder
          eventSlot={DEMO_RULE_EVENT_SLOT}
          channelSlot={DEMO_RULE_CHANNEL_SLOT}
          delaySlot={DEMO_RULE_DELAY_SLOT}
          conditionSlot={DEMO_RULE_CONDITION_SLOT}
        />
      </section>
    </main>
  )
}
