import type { Metadata } from "next"

import { DecisionRecommendationCard } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Decision recommendation card | A/B runtime",
  description:
    "Primitive 13 — ship / iterate / kill / keep-running recommendation with rationale and confidence bar.",
}

export default function DecisionRecommendationCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Decision"
        title="Decision recommendation"
        description="Auto-recommended next action — ship the treatment, iterate, kill, or keep running. Includes rationale bullets, a confidence bar, the expected business impact, and an owner."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Decision recommendation" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four decision states</span>
        <div className={styles.demoSplit}>
          <DecisionRecommendationCard
            recommendation="ship-treatment"
            treatmentName="Brand header v2"
            subtitle="Quote PDF redesign · 14d"
            rationale={[
              "Primary metric: +11.6% lift, p = 0.009, ★★",
              "Posterior P(treatment beats control) = 0.97 — superiority armed",
              "No guardrail breaches above threshold this week",
              "Sufficient power across AU mobile + desktop segments",
            ]}
            confidence={0.92}
            expectedImpact="+$4.2k / wk RPV"
            owner="@daniel"
          />
          <DecisionRecommendationCard
            recommendation="iterate"
            subtitle="Suburb landing CTA · 10d"
            rationale={[
              "Lift +6.2% on Wollongong + Shellharbour — significant",
              "Flat on Bega + Eden suburbs — copy reads as out of place",
              "Iterate to use state-level fallback when suburb < 1k visitors / mo",
            ]}
            confidence={0.62}
            expectedImpact="+$1.1k / wk RPV"
            owner="@growth-team"
          />
          <DecisionRecommendationCard
            recommendation="kill"
            subtitle="Parts AR overlay · 22d"
            rationale={[
              "Treatment dropped Android add-to-quote by 4.8 pp (p = 0.001)",
              "Guardrail on Android quote completion tripped at day 18",
              "No segments with positive lift large enough to salvage",
            ]}
            confidence={0.88}
            expectedImpact="Loss avoided · -$3.4k / wk RPV"
            owner="@parts-pod"
          />
          <DecisionRecommendationCard
            recommendation="keep-running"
            subtitle="Mobile dock vs sidebar v2"
            rationale={[
              "Observed effect +2.1% but only 8 days in",
              "Power for true +2% effect at α=0.05: 0.41 — needs more data",
              "Project +14 days to reach 80% power at observed conversion",
            ]}
            confidence={0.41}
            expectedImpact="Pending"
            owner="@mobile-pod"
          />
        </div>
      </section>
    </main>
  )
}
