import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecallLookupCard } from "../../components/vehicle-data/recall-lookup-card"

import { HILUX, HILUX_RECALLS, RANGER_RECALLS, RAPTOR } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Recall lookup card | Vehicle data | UI Primitives",
  description:
    "Recall lookup card — VIN search returning NHTSA + ACCC PROD recalls with severity, status, affected components, and issue date.",
}

export default function RecallLookupCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 05"
        title="Recall lookup card"
        description="Two scenarios — the 2021 Hilux N80 with an active DPF + fuel-pump campaign, and the 2024 Ranger Raptor with a single closed 10R80 transmission recall."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Recall lookup card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <RecallLookupCard defaultVin={HILUX.vin} results={HILUX_RECALLS} />
        <RecallLookupCard defaultVin={RAPTOR.vin} results={RANGER_RECALLS} />
      </section>
    </main>
  )
}
