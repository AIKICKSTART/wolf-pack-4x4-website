import type { Metadata } from "next"

import { HealthcheckHeatmap } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { HEALTHCHECKS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Healthcheck heatmap | Deploy console",
  description:
    "Primitive 05 — endpoint × hour-of-day heatmap with per-endpoint uptime %.",
}

const TOP_THREE = HEALTHCHECKS.slice(0, 3)
const RISKY = HEALTHCHECKS.slice(3, 6)

export default function HealthcheckHeatmapScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Heatmap"
        title="Healthcheck heatmap"
        description="Endpoint × hour grid for the production stack. Each cell is one hour, ok / warn / fail / no-data. Per-row p95 latency and 24h uptime % are computed live. Cells carry hover titles for keyboard/screen reader users."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Healthcheck heatmap" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · full production grid · 6 endpoints</span>
        <HealthcheckHeatmap endpoints={HEALTHCHECKS} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · risky endpoints only · SMS / payment / quote-PDF</span>
        <HealthcheckHeatmap
          endpoints={RISKY}
          caption="Risky endpoints"
          kicker="Incident triage"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · clean trio · core services nominal</span>
        <HealthcheckHeatmap
          endpoints={TOP_THREE}
          caption="Core services · last 24h"
          kicker="Production · nominal"
        />
      </section>
    </main>
  )
}
