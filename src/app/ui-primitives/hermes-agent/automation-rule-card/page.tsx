import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AutomationRuleCard } from "../../components/hermes-agent"

import {
  HERMES_RULE_AFTER_HOURS,
  HERMES_RULE_QUOTE_FOLLOWUP,
  HERMES_RULE_REFUND_GUARD,
} from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Automation rule card | Hermes",
  description:
    "Primitive 04 — automation rule card with trigger / condition / action flow, toggle and recent run history chips.",
}

export default function AutomationRuleCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Rule"
        title="Automation rule card"
        description="Trigger / condition / action flow card with an on-off switch and the recent run history rendered as status chips. Used for Hermes-driven automations like quote chase, after-hours triage and refund-guard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Automation rule card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · sales · quote follow-up</span>
        <AutomationRuleCard {...HERMES_RULE_QUOTE_FOLLOWUP} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · service · after-hours triage</span>
        <AutomationRuleCard {...HERMES_RULE_AFTER_HOURS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · compliance · refund &gt; $200 guard
        </span>
        <AutomationRuleCard {...HERMES_RULE_REFUND_GUARD} />
      </section>
    </main>
  )
}
