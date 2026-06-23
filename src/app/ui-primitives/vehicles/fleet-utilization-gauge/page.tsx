import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FleetUtilizationGauge } from "../../components/vehicles/fleet-utilization-gauge"

import { FLEET_BREAKDOWN } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Fleet utilisation gauge | Vehicles | UI Primitives",
  description:
    "Fleet utilisation primitive — radial meter showing active percent, donut breakdown across active / workshop / reserved / off-road, and fleet-size chip.",
}

export default function FleetUtilizationGaugeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 14"
        title="Fleet utilisation gauge"
        description="Mufflermen pool fleet at 76% utilisation across 50 vehicles, plus a stressed second snapshot at 42% active."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Fleet utilisation gauge" },
        ]}
      />
      <section className={styles.sceneShell}>
        <FleetUtilizationGauge breakdown={FLEET_BREAKDOWN} periodLabel="Past 7 days" />
        <FleetUtilizationGauge
          breakdown={{ active: 21, workshop: 18, reserved: 6, offRoad: 5 }}
          periodLabel="Past 24 hours"
        />
      </section>
    </main>
  )
}
