import type { Metadata } from "next"

import { VehicleHealthTile } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import {
  HEALTH_FALCON_GT,
  HEALTH_HILUX,
  HEALTH_RAPTOR,
} from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Vehicle health tile | Workshop ops",
  description:
    "Primitive 14 — vehicle health tile with last service, due countdown, and oil / brake / tyre dial trio — three states.",
}

export default function VehicleHealthTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Vehicle health tile"
        title="Vehicle health tile"
        description="At-a-glance per-vehicle health — last service date and km, days until next service, and three radial dials covering oil life, brake pad life, and tyre tread. Three states — Mick's Hilux on time, Karen's Falcon GT XB cherry-fresh post-service, and Bec's Raptor service overdue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Vehicle health tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <VehicleHealthTile health={HEALTH_HILUX} />
          <VehicleHealthTile health={HEALTH_FALCON_GT} />
          <VehicleHealthTile health={HEALTH_RAPTOR} />
        </div>
      </section>
    </main>
  )
}
