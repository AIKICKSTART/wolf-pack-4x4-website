import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AlertRuleCard } from "../../components/observability"

import { ALERT_RULES } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Alert rule card | Observability cockpit",
  description:
    "Primitive 04 — alert rule card with threshold, operator, current value, state chip and last-triggered footer.",
}

export default function AlertRuleCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Alerting"
        title="Alert rule card"
        description="An alert rule card — what the rule watches, the threshold and operator, the current observed value, a tone-shifting state chip (OK · Pending · Alerting · No data) and a last-triggered note in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Alert rule card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 4 rules · 3 states</span>
        <div className={styles.demoSplit}>
          {ALERT_RULES.map((rule) => (
            <AlertRuleCard key={rule.ruleName} {...rule} />
          ))}
        </div>
      </section>
    </main>
  )
}
