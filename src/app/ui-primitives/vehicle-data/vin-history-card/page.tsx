import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VinHistoryCard } from "../../components/vehicle-data/vin-history-card"

import {
  FALCON,
  FALCON_VIN_HISTORY_EVENTS,
  HILUX,
  HILUX_VIN_HISTORY_EVENTS,
} from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "VIN history card | Vehicle data | UI Primitives",
  description:
    "VIN history card — PPSR + REVS-style ownership timeline with owner count, accident count, lifetime km, state transitions, and event log.",
}

export default function VinHistoryCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 10"
        title="VIN history card"
        description="Two history cards — a clean 2021 Hilux N80, and a 2008 Falcon BF XR6 that was a repairable write-off mid-life."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "VIN history card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <VinHistoryCard
          vin={HILUX.vin}
          vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
          ownersCount={2}
          accidentsCount={1}
          totalKm={82_410}
          stateHistory={["NSW"]}
          riskFlag="minor"
          events={HILUX_VIN_HISTORY_EVENTS}
        />
        <VinHistoryCard
          vin={FALCON.vin}
          vehicleLabel={`${FALCON.year} ${FALCON.make} ${FALCON.model}`}
          ownersCount={5}
          accidentsCount={2}
          totalKm={284_120}
          stateHistory={["VIC", "NSW"]}
          riskFlag="write-off"
          events={FALCON_VIN_HISTORY_EVENTS}
        />
      </section>
    </main>
  )
}
