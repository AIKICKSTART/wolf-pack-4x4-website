import type { Metadata } from "next"

import { StatSigCalculator } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Stat-sig calculator | A/B runtime",
  description:
    "Primitive 03 — sample size, effect size, p-value and power calculator using a two-proportion z-test.",
}

export default function StatSigCalculatorScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Calculator"
        title="Statistical significance calculator"
        description="Two-proportion z-test calculator. Punch in per-arm visitors, control + treatment conversion rates, and α — the panel returns p-value, z-score, absolute and relative lift, and the power for the observed effect."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Stat-sig calculator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign defaults</span>
        <StatSigCalculator
          defaultPerArm={14_215}
          defaultControlRate={18.4}
          defaultTreatmentRate={20.6}
          defaultAlpha={0.05}
        />
      </section>
    </main>
  )
}
