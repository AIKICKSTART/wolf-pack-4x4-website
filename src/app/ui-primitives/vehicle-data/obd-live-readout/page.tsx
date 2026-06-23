import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ObdLiveReadout } from "../../components/vehicle-data/obd-live-readout"

import { HILUX, OBD_INITIAL } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "OBD-II live readout | Vehicle data | UI Primitives",
  description:
    "Live OBD-II readout with five radial gauges — engine RPM, coolant temperature, fuel level, mass airflow, and Bank 1 Sensor 1 lambda voltage.",
}

export default function ObdLiveReadoutScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 02"
        title="OBD-II live readout"
        description="Five gauges ticking from a simulated OBD-II PID feed — RPM, coolant, fuel level, MAF, O₂. The live pulse and gauge updates pause automatically under reduced motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "OBD-II live readout" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ObdLiveReadout
          initial={OBD_INITIAL}
          vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model.split(" ")[0]} · ${HILUX.rego}`}
          capturedAtISO="2026-05-29T08:14:12+10:00"
        />
        <ObdLiveReadout
          initial={{
            rpm: 920,
            coolantTempC: 92,
            fuelLevelPercent: 28,
            mafGramsPerSecond: 6.2,
            o2Voltage: 0.42,
          }}
          live={false}
          vehicleLabel="Snapshot · idle warm"
          capturedAtISO="2026-05-29T08:12:38+10:00"
        />
      </section>
    </main>
  )
}
