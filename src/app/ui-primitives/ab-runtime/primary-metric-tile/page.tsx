import type { Metadata } from "next"

import { PrimaryMetricTile } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Primary metric tile | A/B runtime",
  description:
    "Primitive 07 — primary metric tile with value, lift delta, p-value and three-star significance.",
}

export default function PrimaryMetricTileScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Tile"
        title="Primary metric tile"
        description="Headline metric tile for the experiment result panel. Combines the metric value, the relative lift over control, p-value, and a three-star significance ladder (★ ≤ 0.05, ★★ ≤ 0.01, ★★★ ≤ 0.001)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Primary metric tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three metric tiles</span>
        <div className={styles.demoTriple}>
          <PrimaryMetricTile
            label="Quote-accept rate"
            value="20.6"
            unit="%"
            deltaPct={11.6}
            pValue={0.0091}
            tag="Primary"
            helpText="n = 14,215 / arm"
          />
          <PrimaryMetricTile
            label="Revenue per visitor"
            value="$184.20"
            deltaPct={4.8}
            pValue={0.041}
            tag="Secondary"
            helpText="AUD, 14d"
          />
          <PrimaryMetricTile
            label="Quote PDF download"
            value="42.1"
            unit="%"
            deltaPct={-2.1}
            pValue={0.34}
            tag="Guardrail"
            helpText="No significant move"
          />
        </div>
      </section>
    </main>
  )
}
