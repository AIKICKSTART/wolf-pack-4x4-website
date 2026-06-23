import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VehicleCardFleet } from "../../components/vehicles/vehicle-card-fleet"

import { FLEET } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Vehicle card · fleet | Vehicles | UI Primitives",
  description:
    "Fleet-view vehicle card showing photo, NSW rego plate, status chip, odometer, fuel type, and assigned driver. Compose primitive: DashboardCard + Avatar + Chip.",
}

export default function VehicleCardFleetScenePage() {
  const [hilux, patrol, ranger, triton] = FLEET
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 01"
        title="Vehicle card · fleet"
        description="Fleet-view vehicle card built on DashboardCard. Status chip changes tone with the vehicle's operational state — in-service, in-workshop, off-road, reserved."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Vehicle card · fleet" },
        ]}
      />
      <section className={styles.sceneShell}>
        <div className={styles.sceneRow}>
          <VehicleCardFleet
            rego={hilux.rego}
            year={hilux.year}
            make={hilux.make}
            model={hilux.model}
            status={hilux.status}
            odometerKm={hilux.odometerKm}
            fuelType={hilux.fuelType}
            driverName={hilux.driverName}
            href="/ui-primitives/vehicles/full-vehicle-detail"
          />
          <VehicleCardFleet
            rego={patrol.rego}
            year={patrol.year}
            make={patrol.make}
            model={patrol.model}
            status={patrol.status}
            odometerKm={patrol.odometerKm}
            fuelType={patrol.fuelType}
            driverName={patrol.driverName}
          />
        </div>
        <div className={styles.sceneRow}>
          <VehicleCardFleet
            rego={ranger.rego}
            year={ranger.year}
            make={ranger.make}
            model={ranger.model}
            status={ranger.status}
            odometerKm={ranger.odometerKm}
            fuelType={ranger.fuelType}
            driverName={ranger.driverName}
          />
          <VehicleCardFleet
            rego={triton.rego}
            year={triton.year}
            make={triton.make}
            model={triton.model}
            status={triton.status}
            odometerKm={triton.odometerKm}
            fuelType={triton.fuelType}
            driverName={triton.driverName}
          />
        </div>
      </section>
    </main>
  )
}
