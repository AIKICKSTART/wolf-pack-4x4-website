import type { Metadata } from "next"

import { RolloutCanaryBar } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Rollout canary bar | Feature flags",
  description:
    "Primitive 13 — canary rollout strip with steps 1% → 5% → 25% → 50% → 100%.",
}

export default function RolloutCanaryBarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Canary"
        title="Rollout canary bar"
        description="Five-segment canary progression strip. Segments mark the standard ramp ladder (1% → 5% → 25% → 50% → 100%). Already-reached segments render in green, the current step is highlighted amber with aria-current='step', and an optional ETA chip surfaces the next-step countdown."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Canary bar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three flags at different canary steps</span>
        <div className={styles.demoStack}>
          <RolloutCanaryBar
            currentStepPercent={25}
            eta="14 min"
            steps={[
              { percent: 1, reached: true, label: "Internal" },
              { percent: 5, reached: true, label: "Oak Flats" },
              { percent: 25, reached: false, label: "NSW beta" },
              { percent: 50, reached: false, label: "AU" },
              { percent: 100, reached: false, label: "Global" },
            ]}
          />
          <RolloutCanaryBar
            currentStepPercent={50}
            eta="2 hr 12 min"
            steps={[
              { percent: 1, reached: true, label: "Internal" },
              { percent: 5, reached: true, label: "Oak Flats" },
              { percent: 25, reached: true, label: "NSW beta" },
              { percent: 50, reached: false, label: "AU" },
              { percent: 100, reached: false, label: "Global" },
            ]}
          />
          <RolloutCanaryBar
            currentStepPercent={100}
            steps={[
              { percent: 1, reached: true, label: "Internal" },
              { percent: 5, reached: true, label: "Oak Flats" },
              { percent: 25, reached: true, label: "NSW beta" },
              { percent: 50, reached: true, label: "AU" },
              { percent: 100, reached: false, label: "Global" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
