import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VehicleProfileCard } from "../../components/workshop-scenes/vehicle-profile-card"
import type { VehicleProfileCardProps } from "../../components/workshop-scenes/vehicle-profile-card"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Vehicle profile | UI Primitives — Workshop Scenes",
}

const vehicles: ReadonlyArray<VehicleProfileCardProps> = [
  {
    year: 2024,
    make: "Toyota",
    model: "Hilux N80 dual cab",
    rego: "ECC-714",
    engine: "2.8L turbodiesel · 6-speed auto",
    body: "Dual cab utility · SR5",
    historyCount: 4,
    fileHref: "/ui-primitives/workshop-scenes/vehicle-profile#ecc-714",
  },
  {
    year: 2023,
    make: "Nissan",
    model: "Patrol Y62 Ti-L",
    rego: "BRR-902",
    engine: "5.6L V8 petrol",
    body: "Full-size SUV · 7 seat",
    historyCount: 7,
    fileHref: "/ui-primitives/workshop-scenes/vehicle-profile#brr-902",
  },
  {
    year: 2019,
    make: "Holden",
    model: "VE Commodore SS",
    rego: "ROAR-1",
    engine: "6.0L LS2 V8",
    body: "Sedan · manual",
    historyCount: 12,
    fileHref: "/ui-primitives/workshop-scenes/vehicle-profile#roar-1",
  },
  {
    year: 2022,
    make: "Ford",
    model: "Ranger PX3 Wildtrak",
    rego: "BUG-440",
    engine: "3.2L 5-cyl turbodiesel",
    body: "Dual cab utility · 6sp auto",
    historyCount: 3,
    fileHref: "/ui-primitives/workshop-scenes/vehicle-profile#bug-440",
  },
]

export default function VehicleProfileScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.03 / Workshop scenes"
        title="Vehicle profile card"
        description="Quick-glance vehicle file with photo, rego plate, drivetrain summary, and the on-file workshop history count. Anchored by a single jump-into-file link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Vehicle profile" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {vehicles.map((vehicle) => (
            <VehicleProfileCard key={vehicle.rego} {...vehicle} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The rego plate is rendered using the Australian rectangular plate
            convention — silver gradient + bold black numerals — so it reads at
            a glance from across the workshop. History count chips encourage
            techs to open the file when prior fitments may inform the current
            job.
          </p>
        </div>
      </section>
    </main>
  )
}
