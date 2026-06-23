import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TyreConditionDiagram } from "../../components/vehicles/tyre-condition-diagram"

import { SAMPLE_TYRES } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Tyre condition diagram | Vehicles | UI Primitives",
  description:
    "Top-down vehicle view with four tyre indicators tone-coded by tread depth — tap a corner to highlight its tread + pressure detail.",
}

export default function TyreConditionDiagramScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 09"
        title="Tyre condition diagram"
        description="Hilux N80 corner-by-corner tyre status — rear-right is below the NSW minimum tread depth and is pressure-low, both flagged red."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Tyre condition diagram" },
        ]}
      />
      <section className={styles.sceneShell}>
        <TyreConditionDiagram tyres={SAMPLE_TYRES} />
      </section>
    </main>
  )
}
