import type { Metadata } from "next"

import { MultiArmBanditVisualizer } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Multi-arm bandit | Experiments",
  description:
    "Primitive 07 — per-arm traffic flow over time + exploration/exploitation balance + predicted winner chip.",
}

export default function MultiArmBanditScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Bandit"
        title="Multi-arm bandit visualizer"
        description="Stacked traffic flow per arm as the bandit reallocates against observed reward. Tracks exploration/exploitation balance and surfaces the current predicted winner. Backed by AreaChart."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Multi-arm bandit" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Thompson sampling reallocation</span>
        <MultiArmBanditVisualizer
          arms={[
            {
              id: "control",
              name: "Save then price",
              traffic: [33, 32, 28, 24, 19, 14, 11, 8],
              tone: "amber",
            },
            {
              id: "live",
              name: "Live preview",
              traffic: [33, 34, 38, 44, 50, 58, 64, 70],
              tone: "teal",
            },
            {
              id: "anim",
              name: "Live + animated",
              traffic: [34, 34, 34, 32, 31, 28, 25, 22],
              tone: "green",
            },
          ]}
          steps={["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"]}
          algorithm="thompson"
          explorationBalance={0.34}
          predictedWinnerId="live"
        />
      </section>
    </main>
  )
}
