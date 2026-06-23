import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EngineBayDiagram } from "../../components/vehicle-data/engine-bay-diagram"

import { HILUX, HILUX_ENGINE_BAY } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Engine bay diagram | Vehicle data | UI Primitives",
  description:
    "Top-down engine bay diagram for the 1GD-FTV Hilux — interactive callouts for battery, airbox, turbo, intercooler, coolant reservoir, and ECU.",
}

export default function EngineBayDiagramScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 08"
        title="Engine bay diagram"
        description="Click a callout to surface the description. The SVG carries role='img' with a labelled title + description for screen readers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Engine bay diagram" },
        ]}
      />
      <section className={styles.sceneShell}>
        <EngineBayDiagram
          components={HILUX_ENGINE_BAY}
          vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
        />
      </section>
    </main>
  )
}
