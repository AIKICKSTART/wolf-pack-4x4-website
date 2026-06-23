import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MileageTracker } from "../../components/vehicles/mileage-tracker"

import { SAMPLE_MILEAGE } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Mileage tracker | Vehicles | UI Primitives",
  description:
    "Mileage tracker — odometer, distance since last service, segmented service progress bar, monthly km sparkline, projected months to next service.",
}

export default function MileageTrackerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 04"
        title="Mileage tracker"
        description="Mileage tracker for the Hilux N80 — 84,120 km on the clock, 24,120 km since the last service against a 15,000 km interval. Compose ProgressLinear + Sparkline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Mileage tracker" },
        ]}
      />
      <section className={styles.sceneShell}>
        <MileageTracker
          currentOdometerKm={84_120}
          serviceIntervalKm={15_000}
          lastServiceKm={75_220}
          monthlyKm={SAMPLE_MILEAGE}
          projectedMonthlyKm={2_500}
        />
        <MileageTracker
          currentOdometerKm={132_640}
          serviceIntervalKm={10_000}
          lastServiceKm={128_220}
          monthlyKm={SAMPLE_MILEAGE.map((km) => Math.round(km * 1.4))}
          projectedMonthlyKm={3_200}
        />
      </section>
    </main>
  )
}
