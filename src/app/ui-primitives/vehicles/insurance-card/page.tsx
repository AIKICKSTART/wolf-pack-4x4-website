import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InsuranceCard } from "../../components/vehicles/insurance-card"

import { SAMPLE_INSURANCE } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Insurance card | Vehicles | UI Primitives",
  description:
    "Insurance card — insurer, policy number, cover types, renewal date with countdown chip, open + lifetime claim counts, and excess.",
}

// Stable date so the renewal delta is deterministic in the scene.
const NOW = new Date("2026-05-29T08:00:00+10:00")

export default function InsuranceCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 06"
        title="Insurance card"
        description="Insurance card variants — NRMA Business comprehensive on the Hilux N80, and an Allianz CTP-only policy for comparison."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Insurance card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <div className={styles.sceneRow}>
          <InsuranceCard
            insurer={SAMPLE_INSURANCE.insurer}
            policyNumber={SAMPLE_INSURANCE.policyNumber}
            covers={SAMPLE_INSURANCE.covers}
            renewalISO={SAMPLE_INSURANCE.renewalISO}
            openClaims={SAMPLE_INSURANCE.openClaims}
            lifetimeClaims={SAMPLE_INSURANCE.lifetimeClaims}
            excessAud={SAMPLE_INSURANCE.excessAud}
            now={NOW}
          />
          <InsuranceCard
            insurer="Allianz Fleet"
            policyNumber="AZ-72211-FL"
            covers={["ctp", "third-party-property"]}
            renewalISO="2026-06-22"
            openClaims={1}
            lifetimeClaims={4}
            excessAud={650}
            now={NOW}
          />
        </div>
      </section>
    </main>
  )
}
