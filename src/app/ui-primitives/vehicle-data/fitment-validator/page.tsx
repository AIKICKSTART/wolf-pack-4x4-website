import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FitmentValidator } from "../../components/vehicle-data/fitment-validator"

import { HILUX_FITMENT_FAIL, RAPTOR_FITMENT } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Fitment validator | Vehicle data | UI Primitives",
  description:
    "Fitment validator — enter the customer's rego or VIN to verify a part against the build spec. Renders bolt-pattern, engine code, sensor protocol, and ADR compliance checks.",
}

export default function FitmentValidatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 03"
        title="Fitment validator"
        description="Two scenarios — a confirmed Raptor cat-back kit, and the same kit failing four out of four checks against a BF Falcon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Fitment validator" },
        ]}
      />
      <section className={styles.sceneShell}>
        <FitmentValidator
          defaultIdentifier="RAP-22Z"
          initialResult={RAPTOR_FITMENT}
        />
        <FitmentValidator
          defaultIdentifier="DGR-411"
          initialResult={HILUX_FITMENT_FAIL}
        />
      </section>
    </main>
  )
}
