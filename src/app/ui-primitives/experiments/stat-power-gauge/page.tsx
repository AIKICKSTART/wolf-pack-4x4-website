import type { Metadata } from "next"

import { StatPowerGauge } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Statistical power gauge | Experiments",
  description:
    "Primitive 06 — radial meter of current statistical power + tone-shifting + N-to-reach-target chip.",
}

export default function StatPowerGaugeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Power"
        title="Statistical power gauge"
        description="Radial meter readout of current 1−β power. Tone shifts from red → amber → teal → green as the current sample size approaches the required N for the target power (commonly 80%)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Stat power gauge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three power states</span>
        <div className={styles.demoStack}>
          <StatPowerGauge
            power={0.92}
            targetPower={0.8}
            currentSampleSize={28430}
            requiredSampleSize={26000}
            caption="Quote — instant pricing"
          />
          <StatPowerGauge
            power={0.62}
            targetPower={0.8}
            currentSampleSize={5200}
            requiredSampleSize={12000}
            caption="Parts 3D viewer"
          />
          <StatPowerGauge
            power={0.18}
            targetPower={0.8}
            currentSampleSize={900}
            requiredSampleSize={15600}
            caption="Bay availability realtime"
          />
        </div>
      </section>
    </main>
  )
}
