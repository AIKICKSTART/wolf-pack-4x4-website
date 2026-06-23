import type { Metadata } from "next"

import { SampleSizeCalculator } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Sample size calculator | Experiments",
  description:
    "Primitive 04 — baseline + MDE + power + variants → required N per variant + total N + estimated time-to-detect.",
}

export default function SampleSizeCalculatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Calculator"
        title="Sample size calculator"
        description="Two-proportion sample size estimate using normal approximation. Tune baseline conversion, minimum detectable effect, target power, and number of variants — output is per-variant N, total N, and an ETA chip given an expected daily volume."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Sample size calculator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · adjust inputs to recompute</span>
        <SampleSizeCalculator
          defaultBaselineRate={18.4}
          defaultMde={6}
          defaultPower={0.8}
          defaultVariants={2}
          expectedDailyVolume={480}
        />
      </section>
    </main>
  )
}
