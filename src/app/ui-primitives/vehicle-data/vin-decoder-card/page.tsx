import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VinDecoderCard } from "../../components/vehicle-data/vin-decoder-card"

import {
  HILUX,
  HILUX_VIN_DECODE,
  RAPTOR,
  RAPTOR_VIN_DECODE,
} from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "VIN decoder card | Vehicle data | UI Primitives",
  description:
    "Vehicle-data primitive — VIN entry, 17-character keycap strip, and decoded year, make, model, engine, transmission, body, and origin chips.",
}

export default function VinDecoderCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 01"
        title="VIN decoder card"
        description="Enter a 17-character VIN to pull the NEVDIS record. The keycap strip mirrors the live entry, and the decoded chips appear after the operator submits."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "VIN decoder card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <VinDecoderCard
          defaultVin={HILUX.vin}
          result={HILUX_VIN_DECODE}
        />
        <VinDecoderCard
          defaultVin={RAPTOR.vin}
          result={RAPTOR_VIN_DECODE}
          decodedBy="Oak Flats Mufflermen · Ford WERS"
        />
      </section>
    </main>
  )
}
