import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TelematicsChip } from "../../components/vehicles/telematics-chip"

import { SAMPLE_TELEMATICS } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Telematics chip | Vehicles | UI Primitives",
  description:
    "Telematics chip cluster — live status row showing GPS speed, engine load, fuel level, and coolant temperature with a pulsing live indicator.",
}

export default function TelematicsChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 11"
        title="Telematics chip"
        description="Three telematics snapshots — the Hilux at cruise, the Patrol idle in the workshop, and the Iveco hot under load."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Telematics chip" },
        ]}
      />
      <section className={styles.sceneShell}>
        <TelematicsChip reading={SAMPLE_TELEMATICS} vehicleLabel="Hilux N80 · BTR-882" />
        <TelematicsChip
          reading={{
            speedKmh: 0,
            engineLoadPercent: 0,
            fuelLevelPercent: 18,
            coolantTempC: 32,
            capturedAtISO: "2026-05-29T08:14:42+10:00",
          }}
          vehicleLabel="Patrol Y62 · CYK-114"
        />
        <TelematicsChip
          reading={{
            speedKmh: 112,
            engineLoadPercent: 92,
            fuelLevelPercent: 38,
            coolantTempC: 104,
            capturedAtISO: "2026-05-29T08:15:01+10:00",
          }}
          vehicleLabel="Iveco Daily · QFG-616"
        />
      </section>
    </main>
  )
}
