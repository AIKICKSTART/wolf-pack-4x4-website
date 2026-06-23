import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ErrorBudgetGauge } from "../../components/status-page"

import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Error budget gauge | Status page",
  description:
    "Primitive 11 — half-arc error budget gauge with tone-shifting, burn rate chip and trend sparkline.",
}

const TREND_GOOD = [0.05, 0.08, 0.1, 0.11, 0.12, 0.15, 0.18, 0.2, 0.22, 0.24, 0.25, 0.26]
const TREND_AT_RISK = [0.2, 0.25, 0.33, 0.41, 0.48, 0.56, 0.62, 0.66, 0.7, 0.72, 0.74, 0.78]
const TREND_BLOWN = [0.6, 0.66, 0.72, 0.78, 0.82, 0.86, 0.89, 0.91, 0.93, 0.95, 0.97, 0.99]

export default function ErrorBudgetGaugeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Gauge"
        title="Error budget gauge"
        description="A 180° meter that shows how much of the period's error budget has been consumed, plus the current burn rate (×) and a small 12-point trend sparkline. Tone shifts green → amber → red. role=meter with aria-valuenow scaled 0–100."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Error budget gauge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three states · green / amber / red</span>
        <div className={styles.demoTriple}>
          <ErrorBudgetGauge consumed={0.26} burnRate={0.7} trend={TREND_GOOD} />
          <ErrorBudgetGauge consumed={0.78} burnRate={2.4} trend={TREND_AT_RISK} />
          <ErrorBudgetGauge consumed={0.99} burnRate={5.6} trend={TREND_BLOWN} />
        </div>
      </section>
    </main>
  )
}
