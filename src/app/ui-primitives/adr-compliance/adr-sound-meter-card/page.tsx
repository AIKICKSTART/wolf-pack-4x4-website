import type { Metadata } from "next"

import { AdrSoundMeterCard } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "ADR sound meter card | ADR compliance",
  description:
    "Primitive 01 — live sound level meter card showing dB(A) reading against an ADR limit with a tone-shifting compliance band chip.",
}

export default function AdrSoundMeterCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Live meter"
        title="ADR sound meter card"
        description="Composes a RadialMeter + a ComplianceBandChip. Auto-classifies the measured dB(A) against the ADR limit into legal / borderline / over bands and updates the radial tone. role='meter' on the dial, role='status' + aria-live on the dB readout."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Sound meter card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three states · legal / borderline / over</span>
        <div className={styles.demoStack}>
          <AdrSoundMeterCard
            heading="Bay 2 · Idle reading"
            measuredDb={74.2}
            limitDb={90}
            ruleLabel="ADR 28/01"
            caption="Stationary · 0.5 m"
          />
          <AdrSoundMeterCard
            heading="Bay 1 · 3,500 RPM"
            measuredDb={88.4}
            limitDb={90}
            ruleLabel="ADR 28/01"
            caption="Stationary · 3/4 rated rev"
          />
          <AdrSoundMeterCard
            heading="Bay 3 · GTSR W1 cold-start"
            measuredDb={94.8}
            limitDb={90}
            ruleLabel="ADR 28/01"
            caption="Cold start, cabin closed"
          />
        </div>
      </section>
    </main>
  )
}
