import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BrakePadLifeMeter } from "../../components/vehicles/brake-pad-life-meter"

import { SAMPLE_BRAKE_AXLES } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Brake-pad life meter | Vehicles | UI Primitives",
  description:
    "Brake-pad life meters per axle — radial meter for pad remaining + km-to-service chip. Tone shifts as pads approach service threshold.",
}

export default function BrakePadLifeMeterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 10"
        title="Brake-pad life"
        description="Front + rear axle pad life. Front pads at 42% and ~6,800 km until service; rear pads have life left. A second example shows critical wear."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Brake-pad life" },
        ]}
      />
      <section className={styles.sceneShell}>
        <BrakePadLifeMeter readings={SAMPLE_BRAKE_AXLES} />
        <BrakePadLifeMeter
          readings={[
            { axle: "front", remainingPercent: 12, kmUntilService: 380 },
            { axle: "rear", remainingPercent: 28, kmUntilService: 2_120 },
          ]}
        />
      </section>
    </main>
  )
}
