import type { Metadata } from "next"

import { RpmCorrelationChart } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import { RPM_SAMPLES_POST_MOD, RPM_SAMPLES_PRE_MOD } from "../demo-data"
import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "RPM correlation chart | ADR compliance",
  description:
    "Primitive 05 — engine RPM versus sound output stacked area chart with an ADR limit overlay.",
}

export default function RpmCorrelationChartScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / RPM × dB"
        title="RPM correlation chart"
        description="Wraps the AreaChart primitive. X axis is the engine RPM sweep (idle through redline), Y axis is measured dB(A). Two series shown — pre-mod (teal) and post-mod (red) — with the ADR limit chip + peak callout."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "RPM correlation chart" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Pre vs post · single sweep</span>
        <RpmCorrelationChart
          title="VE Commodore SS · 800 → 6,500 RPM"
          samples={RPM_SAMPLES_POST_MOD}
          baselineSamples={RPM_SAMPLES_PRE_MOD}
          limitDb={90}
          caption="Stationary close-proximity protocol · cabin closed."
        />
      </section>
    </main>
  )
}
