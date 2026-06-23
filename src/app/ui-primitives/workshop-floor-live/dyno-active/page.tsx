import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DynoActiveReadout } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Dyno active readout | UI Primitives — Workshop Floor Live",
}

export default function DynoActivePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.12 / Workshop floor live"
        title="Dyno active readout"
        description="Live readout for the dyno cell — vehicle on the rollers, peak kW, peak torque, RPM gauge, and air/fuel lambda assessment against the stoichiometric band."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Dyno active" },
        ]}
      />
      <section className={styles.canvas}>
        <DynoActiveReadout
          vehicle="Patrol Y62 5.6L · QXK-014"
          peakKilowatts={272}
          peakTorqueNm={528}
          currentRpm={4150}
          maxRpm={6500}
          lambda={0.94}
          run="Run 03 / 04"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Lambda value drives a tone: green inside stoichiometric, amber on
            the edges, red outside the safe tune band. Stat tiles reuse the
            global primitive so the visual treatment matches every other live
            metric on the monitor.
          </p>
        </div>
      </section>
    </main>
  )
}
