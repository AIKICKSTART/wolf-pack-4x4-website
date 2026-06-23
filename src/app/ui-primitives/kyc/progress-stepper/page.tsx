import type { Metadata } from "next"

import { KycProgressStepper } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "KYC progress stepper | KYC",
  description:
    "Primitive 10 — horizontal multi-step KYC progress stepper (Identity / Address / Business / Beneficial owners / Tax / Bank) with completion state and locked indicators.",
}

export default function ProgressStepperScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Progress"
        title="KYC progress stepper"
        description="Horizontal stepper for the Mufflermen KYC journey. Six fixed stages — Identity, Address, Business, Beneficial owners, Tax and Bank. Each step shows its completion state (complete tick / current ring / upcoming number / locked padlock) and the rail fills proportionally. Locked steps depend on prior steps finishing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Progress stepper" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — mid-journey: identity + address complete, business current
        </span>
        <KycProgressStepper
          steps={[
            { id: "identity", state: "complete", caption: "Licence verified" },
            { id: "address", state: "complete", caption: "Proof on file" },
            { id: "business", state: "current", caption: "ABN lookup" },
            { id: "owners", state: "upcoming", caption: "3 owners listed" },
            { id: "tax", state: "locked", caption: "Locked" },
            { id: "bank", state: "locked", caption: "Locked" },
          ]}
        />
      </section>
    </main>
  )
}
