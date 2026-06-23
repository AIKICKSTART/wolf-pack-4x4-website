import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VinDecoderStrip } from "../../components/vehicles/vin-decoder-strip"

import { SAMPLE_VIN, SAMPLE_VIN_FIELDS } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "VIN decoder strip | Vehicles | UI Primitives",
  description:
    "VIN decoder strip — 17 keycaps showing the raw VIN with parsed make, model, engine, body, origin, and year chips, plus a copy CTA.",
}

export default function VinDecoderStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 02"
        title="VIN decoder strip"
        description="VIN broken into per-character Kbd keycaps with field chips for the decoded attributes. Copy button writes the raw VIN to the clipboard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "VIN decoder strip" },
        ]}
      />
      <section className={styles.sceneShell}>
        <VinDecoderStrip vin={SAMPLE_VIN} fields={SAMPLE_VIN_FIELDS} />
        <VinDecoderStrip
          vin="VF1RFD00H67429001"
          fields={{
            make: "Renault",
            model: "Master Pro",
            engine: "2.3L dCi diesel",
            body: "Cargo van",
            origin: "France",
            year: 2024,
          }}
        />
      </section>
    </main>
  )
}
