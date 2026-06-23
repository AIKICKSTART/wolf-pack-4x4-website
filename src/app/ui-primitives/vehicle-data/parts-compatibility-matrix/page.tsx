import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsCompatibilityMatrix } from "../../components/vehicle-data/parts-compatibility-matrix"

import { COMPATIBILITY_PARTS, COMPATIBILITY_VEHICLES } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Parts compatibility matrix | Vehicle data | UI Primitives",
  description:
    "Grid showing each workshop part against each vehicle in the pool — match, partial, mismatch, or unknown.",
}

export default function PartsCompatibilityMatrixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 04"
        title="Parts compatibility matrix"
        description="Five exhaust / drivetrain parts crossed against four vehicles in the Oak Flats pool — Hilux N80, Falcon BF, Ranger Raptor, VE Commodore SS."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Parts compatibility matrix" },
        ]}
      />
      <section className={styles.sceneShell}>
        <PartsCompatibilityMatrix
          caption="Workshop catalogue × pool vehicles"
          vehicles={COMPATIBILITY_VEHICLES}
          parts={COMPATIBILITY_PARTS}
        />
      </section>
    </main>
  )
}
