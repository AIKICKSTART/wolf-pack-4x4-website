import type { Metadata } from "next"

import { CupedVarianceReductionChip } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "CUPED variance reduction | Experiments",
  description:
    "Primitive 14 — CUPED variance reduction chip: variance reduction %, covariate, and power gain in points.",
}

export default function CupedVarianceReductionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / CUPED"
        title="CUPED variance reduction"
        description="CUPED (Controlled Pre-Experiment Data) subtracts a pre-period covariate to reduce variance in the metric of interest. The chip surfaces how much variance was removed, which covariate was used, and the resulting bump in statistical power expressed in points (1 pt ≈ 1 percentage point of 1−β)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "CUPED" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three covariate fits</span>
        <div className={styles.demoStack}>
          <CupedVarianceReductionChip
            varianceReductionPercent={34.7}
            covariate="prior_30d_quote_revenue"
            powerImprovementPoints={8.4}
          />
          <CupedVarianceReductionChip
            varianceReductionPercent={18.1}
            covariate="prior_30d_part_views"
            powerImprovementPoints={4.6}
          />
          <CupedVarianceReductionChip
            varianceReductionPercent={4.2}
            covariate="prior_login_count"
            powerImprovementPoints={1.0}
          />
        </div>
      </section>
    </main>
  )
}
