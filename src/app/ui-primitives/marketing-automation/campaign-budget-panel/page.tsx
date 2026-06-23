import type { Metadata } from "next"

import { CampaignBudgetPanel } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { DEMO_BUDGET_ACTUAL, DEMO_BUDGET_IDEAL } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Campaign budget panel | Marketing automation",
  description:
    "Primitive 13 — daily budget panel with spend curve SVG and pacing chip (even / ahead / behind).",
}

const SLOW_ACTUAL = DEMO_BUDGET_ACTUAL.map((v) => v * 0.62)
const FAST_ACTUAL = DEMO_BUDGET_ACTUAL.map((v) => v * 1.32)

export default function CampaignBudgetPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Campaign budget panel"
        title="Campaign budget panel"
        description="Pacing-aware budget panel. The spend curve overlays actual vs ideal so the pacing chip is always anchored to evidence, not just a number."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Campaign budget panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Pacing ahead (overspend warning)</h2>
        <CampaignBudgetPanel
          campaignName="Winter exhaust deals"
          dailyBudget={2400}
          spentToday={1820}
          projectedSpend={2860}
          pacing="ahead"
          actualPoints={FAST_ACTUAL}
          idealPoints={DEMO_BUDGET_IDEAL}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · On pace</h2>
        <CampaignBudgetPanel
          campaignName="Bay 2 availability blast"
          dailyBudget={2400}
          spentToday={1240}
          projectedSpend={2380}
          pacing="even"
          actualPoints={DEMO_BUDGET_ACTUAL}
          idealPoints={DEMO_BUDGET_IDEAL}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Pacing behind</h2>
        <CampaignBudgetPanel
          campaignName="Manta launch announcement"
          dailyBudget={2400}
          spentToday={620}
          projectedSpend={1480}
          pacing="behind"
          actualPoints={SLOW_ACTUAL}
          idealPoints={DEMO_BUDGET_IDEAL}
        />
      </section>
    </main>
  )
}
