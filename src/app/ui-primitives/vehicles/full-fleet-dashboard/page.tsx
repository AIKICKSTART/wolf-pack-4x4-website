import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  FleetUtilizationGauge,
  RecallNotificationBanner,
  ServiceHistoryTimeline,
  VehicleCardFleet,
} from "../../components/vehicles"

import {
  FLEET,
  FLEET_BREAKDOWN,
  SAMPLE_RECALL,
  SAMPLE_SERVICE_HISTORY,
} from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Full fleet dashboard | Vehicles | UI Primitives",
  description:
    "Bonus composition — fleet-wide dashboard combining the utilisation gauge, fleet grid of vehicle cards, recent service activity, and active recall banner.",
}

export default function FullFleetDashboardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus"
        title="Full fleet dashboard"
        description="Operational overview for the Mufflermen pool — utilisation gauge, every vehicle in the working fleet, recent service activity, and active recalls."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Full fleet dashboard" },
        ]}
      />

      <div className={styles.fleetLayout}>
        <FleetUtilizationGauge breakdown={FLEET_BREAKDOWN} periodLabel="Past 7 days" />

        <RecallNotificationBanner
          recallId={SAMPLE_RECALL.recallId}
          manufacturer={SAMPLE_RECALL.manufacturer}
          headline={SAMPLE_RECALL.headline}
          affectedSystems={SAMPLE_RECALL.affectedSystems}
          actionRequired={SAMPLE_RECALL.actionRequired}
          severity={SAMPLE_RECALL.severity}
          issuedISO={SAMPLE_RECALL.issuedISO}
          primaryAction={{ label: "Book recall", href: "#book" }}
          secondaryAction={{ label: "Affected vehicles", href: "#affected" }}
        />

        <section aria-label="Fleet vehicles">
          <h3 className={styles.sceneHeading}>Fleet · all vehicles</h3>
          <div className={styles.fleetGrid}>
            {FLEET.map((veh) => (
              <VehicleCardFleet
                key={veh.id}
                rego={veh.rego}
                year={veh.year}
                make={veh.make}
                model={veh.model}
                status={veh.status}
                odometerKm={veh.odometerKm}
                fuelType={veh.fuelType}
                driverName={veh.driverName}
                href="/ui-primitives/vehicles/full-vehicle-detail"
              />
            ))}
          </div>
        </section>

        <section aria-label="Recent service activity">
          <h3 className={styles.sceneHeading}>Recent service activity</h3>
          <ServiceHistoryTimeline entries={SAMPLE_SERVICE_HISTORY} />
        </section>
      </div>
    </main>
  )
}
