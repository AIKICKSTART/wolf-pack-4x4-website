import type { Metadata } from "next"

import { DriveByNoiseTestResult } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Drive-by noise test result | ADR compliance",
  description:
    "Primitive 04 — pass / fail drive-by noise test card showing speed, measured dB and ambient dB.",
}

export default function DriveByNoiseTestResultScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Roadside"
        title="Drive-by noise test result"
        description="Composed inside a DashboardCard. Drive-by stamps Pass / Fail / TBD with role='alert' on failures. Metrics row covers test speed, ambient and headroom over ambient — important when defending a defect notice."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Drive-by noise" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Pass · quiet residential street</span>
        <DriveByNoiseTestResult
          title="VE Commodore SS"
          result="pass"
          speedKmh={50}
          measuredDb={86.2}
          ambientDb={52}
          limitDb={90}
          traffic="quiet"
          caption="Primrose St · 0–80 km/h sweep"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Fail · busy motorway</span>
        <DriveByNoiseTestResult
          title="HSV GTSR W1"
          result="fail"
          speedKmh={70}
          measuredDb={94.8}
          ambientDb={64}
          limitDb={92}
          traffic="busy"
          caption="M1 service road · drive-by 7.5 m mic"
        />
      </section>
    </main>
  )
}
