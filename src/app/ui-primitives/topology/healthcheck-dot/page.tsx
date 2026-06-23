import type { Metadata } from "next"

import { HealthcheckStatusDot } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Healthcheck status dot | Topology",
  description:
    "Primitive 14 - accessible healthcheck dot with live status label and tooltip detail.",
}

export default function HealthcheckDotScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Healthcheck dot"
        title="Healthcheck status dot"
        description="Tiny health indicator for dense topology surfaces, with aria-live status and optional tooltip detail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Healthcheck dot" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Service health states</span>
        <div className={styles.demoInline}>
          <HealthcheckStatusDot
            state="healthy"
            label="quotes-api /healthz"
            detail="Last check passed in 42ms."
            size="lg"
          />
          <HealthcheckStatusDot
            state="degraded"
            label="parts-search /readyz"
            detail="P99 search latency above warning threshold."
            size="lg"
          />
          <HealthcheckStatusDot
            state="failed"
            label="image-worker queue"
            detail="No successful heartbeat for 4 minutes."
            size="lg"
          />
          <HealthcheckStatusDot state="unknown" label="staging webhook" size="lg" />
        </div>
      </section>
    </main>
  )
}
