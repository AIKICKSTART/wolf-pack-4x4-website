import type { Metadata } from "next"

import { TierProgressMeter } from "../../components/loyalty/tier-progress-meter"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Tier progress meter | Loyalty | UI Primitives",
  description:
    "Current → next tier segmented progress bar with remaining-points chip and next-perk preview. Bronze → Silver → Gold → Platinum → Brodie.",
}

export default function TierProgressMeterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 03"
        title="Tier progress meter"
        description="Tier progression for four sample members — Bronze pushing into Silver, Silver into Gold, Gold into Platinum, Platinum into Brodie."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Tier progress meter" },
        ]}
      />
      <section className={styles.sceneStack}>
        <TierProgressMeter
          currentTier="bronze"
          points={2100}
          nextBenefitPreview="Free dyno session quarterly"
        />
        <TierProgressMeter
          currentTier="silver"
          points={4820}
          nextBenefitPreview="Pre-inspection waiver"
        />
        <TierProgressMeter
          currentTier="gold"
          points={9820}
          nextBenefitPreview="10% off exhaust systems"
        />
        <TierProgressMeter
          currentTier="platinum"
          points={18420}
          nextBenefitPreview="Bay 2 mates lounge access"
        />
      </section>
    </main>
  )
}
