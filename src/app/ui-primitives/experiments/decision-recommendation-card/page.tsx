import type { Metadata } from "next"

import { DecisionRecommendationCard } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Decision recommendation | Experiments",
  description:
    "Primitive 11 — Ship / Continue / Stop-loss / Insufficient-power recommendation with reasoning + impact + confidence.",
}

export default function DecisionRecommendationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Decision"
        title="Decision recommendation card"
        description="Cuts through the dashboard noise with an explicit recommendation chip. Four canonical states: Ship variant, Continue, Stop loss, Insufficient power — each surfaced with reasoning, an expected impact chip, and a calibrated confidence chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Decision recommendation" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four recommendation states</span>
        <div className={styles.demoStack}>
          <DecisionRecommendationCard
            recommendation="ship-variant"
            variantName="Live preview"
            reasoning="P(beat baseline) 98.7%, +20.1% lift, guardrails clean across 28k subjects."
            expectedImpact="+$4.2k/wk AUD ARPV"
            confidence={0.96}
          />
          <DecisionRecommendationCard
            recommendation="continue"
            reasoning="P(beat baseline) 81%, but under target. Run 8 more days for 80% power."
            expectedImpact="+$1.1k/wk AUD ARPV (point estimate)"
            confidence={0.72}
          />
          <DecisionRecommendationCard
            recommendation="stop-loss"
            reasoning="3D viewer arm shows −6.4% on mobile, breaches guardrail; ship-blocked."
            expectedImpact="−$2.0k/wk if shipped"
            confidence={0.91}
          />
          <DecisionRecommendationCard
            recommendation="insufficient-power"
            reasoning="Only 18% power against the registered MDE. Cannot conclude — extend or kill."
            confidence={0.34}
          />
        </div>
      </section>
    </main>
  )
}
