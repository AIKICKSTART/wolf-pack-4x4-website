import type { Metadata } from "next"

import { HoldoutGroupToggle } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Holdout group toggle | Experiments",
  description:
    "Primitive 08 — enable/disable + holdout % slider + audience filter chips.",
}

export default function HoldoutGroupToggleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Holdout"
        title="Holdout group toggle"
        description="Reserve a long-running holdout slice to measure cumulative platform impact across many experiments. Composes RolloutSlider for percent and exposes audience filter chips to narrow the holdout to specific cohorts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Holdout group toggle" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · toggle / slider / audience chips</span>
        <HoldoutGroupToggle
          defaultEnabled
          defaultPercent={10}
          audiences={[
            { id: "new", label: "New customers", enabled: true },
            { id: "loyalty", label: "Loyalty tier 2+", enabled: true },
            { id: "fleet", label: "Fleet accounts", enabled: false },
            { id: "wholesale", label: "Wholesale", enabled: false },
          ]}
        />
      </section>
    </main>
  )
}
