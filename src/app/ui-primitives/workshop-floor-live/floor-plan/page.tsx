import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkshopFloorPlan } from "../../components/workshop-floor-live"
import { BAY_PLAN, TECHS } from "../workshop-floor-mock"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Workshop floor plan | UI Primitives — Workshop Floor Live",
}

export default function FloorPlanPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.02 / Workshop floor live"
        title="Workshop floor plan"
        description="Top-down SVG plan with bays, roller door, hoist, parts area, dyno cell and front office. Technician avatars float over the SVG at their current zone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Floor plan" },
        ]}
      />
      <section className={styles.canvas}>
        <WorkshopFloorPlan bays={BAY_PLAN} technicians={TECHS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Bay rectangles take their stroke colour from the live state. Avatars
            are rendered in the DOM layer above the SVG so they stay sharp at any
            scale and inherit the existing Avatar primitive&apos;s status indicators.
          </p>
        </div>
      </section>
    </main>
  )
}
