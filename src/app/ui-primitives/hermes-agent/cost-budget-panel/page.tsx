import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CostBudgetPanel } from "../../components/hermes-agent"

import { HERMES_COST_HOURLY } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Cost budget panel | Hermes",
  description:
    "Primitive 10 — Hermes cost budget panel with burn rate, hourly bar chart and projected end-of-day spend.",
}

const OVERBUDGET_HOURLY = HERMES_COST_HOURLY.map((v) => Math.round(v * 1.6))

const QUIET_HOURLY = HERMES_COST_HOURLY.map((v) => Math.max(1, Math.round(v * 0.18)))

export default function CostBudgetPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Budget"
        title="Cost budget panel"
        description="Token + cost telemetry — radial burn meter, segmented bar against cap, projected end-of-window spend and the hourly burn distribution. Tuned for Hermes' realistic day: $4.80 cap, $0.42 per conversation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Cost budget panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · today · within budget</span>
        <CostBudgetPanel
          windowLabel="Today"
          spentCents={284}
          budgetCents={480}
          projectedCents={412}
          tokensUsed={184_212}
          costPerConversationCents={42}
          hourlyCents={HERMES_COST_HOURLY}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · today · projected overrun
        </span>
        <CostBudgetPanel
          windowLabel="Today"
          spentCents={426}
          budgetCents={480}
          projectedCents={612}
          tokensUsed={282_104}
          costPerConversationCents={58}
          hourlyCents={OVERBUDGET_HOURLY}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · quiet Sunday · negligible spend
        </span>
        <CostBudgetPanel
          windowLabel="Today"
          spentCents={42}
          budgetCents={480}
          projectedCents={68}
          tokensUsed={28_148}
          costPerConversationCents={28}
          hourlyCents={QUIET_HOURLY}
        />
      </section>
    </main>
  )
}
