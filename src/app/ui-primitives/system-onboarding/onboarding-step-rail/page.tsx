import type { Metadata } from "next"

import { OnboardingStepRail } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  STEP_RAIL_DONE,
  STEP_RAIL_FRESH,
  STEP_RAIL_MID,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Onboarding step rail | System onboarding",
  description:
    "Primitive 14 — vertical onboarding step rail. Three states: fresh (account active), mid-flight (workshop + account done, integrations active), and done (team skipped, everything else complete).",
}

export default function OnboardingStepRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Step rail"
        title="Onboarding step rail"
        description="A vertical rail rendering the state of every onboarding step. Used as the sticky side-rail in the full onboarding flow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Step rail" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Fresh — account is the active step</span>
        <OnboardingStepRail
          kicker="Onboarding · Steps"
          title="Setup roadmap"
          steps={STEP_RAIL_FRESH}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Mid-flight — integrations is the active step</span>
        <OnboardingStepRail
          kicker="Onboarding · Steps"
          title="Setup roadmap"
          steps={STEP_RAIL_MID}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Done — team was skipped, everything else complete</span>
        <OnboardingStepRail
          kicker="Onboarding · Complete"
          title="Setup roadmap"
          steps={STEP_RAIL_DONE}
        />
      </section>
    </main>
  )
}
