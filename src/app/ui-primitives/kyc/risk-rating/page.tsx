import type { Metadata } from "next"

import { RiskRatingMeter } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Risk rating meter | KYC",
  description:
    "Primitive 11 — risk rating meter (Low / Medium / High / Manual review) with tone-shifting fill and contributing factor chips.",
}

export default function RiskRatingScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Risk"
        title="Risk rating meter"
        description="Composite risk-rating meter for the entity under review. Four tones — Low (green), Medium (amber), High (red) and Manual review (teal). The meter fills proportionally to the score 0-100 with quarter markers, and contributing factor chips below show what pushed the rating up or down."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Risk rating" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — four levels stacked
        </span>
        <div className={styles.demoStack}>
          <RiskRatingMeter
            kicker="Composite risk"
            title="Oak Flats Mufflermen Pty Ltd"
            level="low"
            score={18}
            body="Low-risk profile. Australian Pty Ltd, AUSTRAC-clear directors, single trading address."
            factors={[
              { id: "f1", label: "AU residency", tone: "positive" },
              { id: "f2", label: "AUSTRAC clear", tone: "positive" },
              { id: "f3", label: "Established 2018", tone: "positive" },
            ]}
          />
          <RiskRatingMeter
            kicker="Composite risk"
            title="Mercer Holdings Trust"
            level="medium"
            score={48}
            body="Medium-risk profile. Trust structure plus one beneficial owner under review."
            factors={[
              { id: "f1", label: "Trust structure", tone: "neutral" },
              { id: "f2", label: "1 owner under review", tone: "negative" },
              { id: "f3", label: "AU residency", tone: "positive" },
            ]}
          />
          <RiskRatingMeter
            kicker="Composite risk"
            title="Crossborder Imports Ltd"
            level="high"
            score={78}
            body="High-risk profile. Offshore controlling entity and one PEP overlap on the directors register."
            factors={[
              { id: "f1", label: "Offshore parent", tone: "negative" },
              { id: "f2", label: "PEP overlap", tone: "negative" },
              { id: "f3", label: "ATO compliance OK", tone: "positive" },
            ]}
          />
          <RiskRatingMeter
            kicker="Composite risk"
            title="Konstantin V. (UBO)"
            level="manual-review"
            score={100}
            body="Escalated to manual review — strong sanctions list match. Onboarding paused pending compliance sign-off."
            factors={[
              { id: "f1", label: "UN list hit", tone: "negative" },
              { id: "f2", label: "Strong DOB match", tone: "negative" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
