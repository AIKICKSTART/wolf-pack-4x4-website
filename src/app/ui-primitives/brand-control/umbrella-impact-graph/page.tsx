import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_UMBRELLA_NODES,
  UmbrellaImpactGraph,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Umbrella impact graph | Brand control",
}

const AMBER_NODES = [
  { id: "buttons", label: "Hot-state CTAs", consumers: 18, tone: "red" as const },
  { id: "alerts", label: "Inline alerts", consumers: 22, tone: "amber" as const },
  { id: "telemetry", label: "Telemetry highlights", consumers: 8, tone: "teal" as const },
  { id: "scanlines", label: "HUD scanlines", consumers: 4, tone: "neutral" as const },
]

const FONT_NODES = [
  { id: "headings", label: "All H1 / H2 / H3", consumers: 184, tone: "red" as const },
  { id: "kickers", label: "Section kickers", consumers: 36, tone: "amber" as const },
]

export default function UmbrellaImpactGraphRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 11"
          title="Umbrella impact graph"
          description="The umbrella made visible — a token at the root with every primitive family that consumes it branching out below."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Umbrella impact graph" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            The signal-red cascade (widest reach), an amber-only impact rail (hot states), and the display-font cascade (typography).
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Signal red cascade">
          <span className={styles.stateLabel}>State 01 · --primitive-red</span>
          <UmbrellaImpactGraph
            rootLabel="Signal Red"
            rootCssVar="--primitive-red"
            nodes={MOCK_UMBRELLA_NODES}
          />
        </section>

        <section className={styles.stateWrap} aria-label="Workshop amber cascade">
          <span className={styles.stateLabel}>State 02 · --primitive-amber</span>
          <UmbrellaImpactGraph
            rootLabel="Workshop Amber"
            rootCssVar="--primitive-amber"
            nodes={AMBER_NODES}
          />
        </section>

        <section className={styles.stateWrap} aria-label="Display font cascade">
          <span className={styles.stateLabel}>State 03 · --primitive-font-display</span>
          <UmbrellaImpactGraph
            rootLabel="Display font"
            rootCssVar="--primitive-font-display"
            nodes={FONT_NODES}
          />
        </section>
      </div>
    </main>
  )
}
