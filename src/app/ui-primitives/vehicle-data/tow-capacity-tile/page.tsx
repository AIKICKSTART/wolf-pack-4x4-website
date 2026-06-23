import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TowCapacityTile } from "../../components/vehicle-data/tow-capacity-tile"

import { HILUX, RAPTOR } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Tow capacity tile | Vehicle data | UI Primitives",
  description:
    "Tow capacity tile — ADR-published braked and unbraked tow limits, towball download, gross combination mass, and a live load progress bar.",
}

export default function TowCapacityTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 13"
        title="Tow capacity tile"
        description="Two ADR scenarios — the Hilux N80 at 3,500 kg braked towing a 2,800 kg caravan, and the Raptor at 2,500 kg braked towing a 1,300 kg trailer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Tow capacity tile" },
        ]}
      />
      <section className={styles.sceneShell}>
        <TowCapacityTile
          vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
          brakedKg={3500}
          unbrakedKg={750}
          ballWeightKg={350}
          gcmKg={5850}
          currentLoadKg={2800}
        />
        <TowCapacityTile
          vehicleLabel={`${RAPTOR.year} ${RAPTOR.make} ${RAPTOR.model}`}
          brakedKg={2500}
          unbrakedKg={750}
          ballWeightKg={250}
          gcmKg={6090}
          currentLoadKg={1300}
        />
      </section>
    </main>
  )
}
