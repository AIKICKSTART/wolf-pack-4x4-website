import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FitmentCompatibilityChecker } from "../../components/workshop-scenes/fitment-compatibility-checker"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Fitment checker | UI Primitives — Workshop Scenes",
}

export default function FitmentCheckerScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.05 / Workshop scenes"
        title="Fitment compatibility checker"
        description="Cascading make → model → year picker against the currently selected part. Cross-references factory specs, ADR notes and our own prior fitment evidence."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Fitment checker" },
        ]}
      />
      <section className={styles.canvas}>
        <FitmentCompatibilityChecker
          makes={["Toyota", "Nissan", "Ford", "Holden", "Mazda", "Mitsubishi"]}
          models={["Hilux N80", "LandCruiser 79", "HiAce H300"]}
          years={[2026, 2025, 2024, 2023, 2022, 2021]}
          selectedMake="Toyota"
          selectedModel="Hilux N80"
          selectedYear={2024}
          part={{
            sku: "MAN-MK24-405",
            title: "Manta 3in stainless cat-back",
            summary: "DPF-back · twin tip · ADR 80/13 compliant",
            specs: [
              { label: "Pipe diameter", value: "76mm (3in) mandrel" },
              { label: "Tip", value: "Twin 102mm rolled" },
              { label: "Material", value: "T304 stainless" },
              { label: "ADR", value: "80/13 compliant" },
              { label: "Sensor bungs", value: "M18 x 1.5 lambda" },
              { label: "Weight", value: "18.6 kg" },
            ],
          }}
          result="adapter"
          resultTitle="Requires adapter flange"
          resultDetail="Manta MK24-405 fits the 2024 Hilux N80 with our in-house AC-401 adapter flange. Add SKU OFM-AC401 to the quote and budget 25 minutes of bay time for the welded join at the DPF outlet."
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Result panel switches tone by outcome: green for compatible, amber
            for requires-adapter, red for not-compatible. The amber case is the
            most common in practice and the workshop deliberately surfaces it
            as a callout, not a warning — it is paid work.
          </p>
        </div>
      </section>
    </main>
  )
}
