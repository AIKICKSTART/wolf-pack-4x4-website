import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TyreSpecPanel } from "../../components/vehicle-data/tyre-spec-panel"

import {
  HILUX_TYRES_FRONT,
  HILUX_TYRES_REAR,
  RAPTOR_TYRES_FRONT,
  RAPTOR_TYRES_REAR,
} from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Tyre spec panel | Vehicle data | UI Primitives",
  description:
    "Tyre spec panel — front + rear ADR fitment with size, load index, speed rating, cold pressure, and maximum sidewall pressure.",
}

export default function TyreSpecPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 07"
        title="Tyre spec panel"
        description="Two ADR placards side by side — the 2021 Hilux N80 SR5 on BFGoodrich KO2, and the 2024 Ranger Raptor on BFGoodrich KO3."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Tyre spec panel" },
        ]}
      />
      <section className={styles.sceneShell}>
        <TyreSpecPanel
          front={HILUX_TYRES_FRONT}
          rear={HILUX_TYRES_REAR}
          brand="BFGoodrich KO2"
          placard="Door pillar · DLM-N80-SR5"
        />
        <TyreSpecPanel
          front={RAPTOR_TYRES_FRONT}
          rear={RAPTOR_TYRES_REAR}
          brand="BFGoodrich KO3"
          placard="Door pillar · FR-NXT-RAPT-24"
        />
      </section>
    </main>
  )
}
