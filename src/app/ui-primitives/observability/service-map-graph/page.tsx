import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceMapGraph } from "../../components/observability"

import { OBSERVABILITY_EDGES, OBSERVABILITY_NODES } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Service map graph | Observability cockpit",
  description:
    "Primitive 08 — observability-style service dependency map with throughput-labelled edges and click-to-inspect nodes.",
}

export default function ObservabilityServiceMapScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Topology"
        title="Service map graph"
        description="A service dependency map laid out for observability — nodes are sized boxes labelled with the service name plus kind (svc · ext · db · queue) and the p95 latency, edges carry the per-edge throughput in rps. Clicking a node reveals RPS, p95 and error rate. Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Service map graph" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 8 services · 8 edges</span>
        <ServiceMapGraph
          caption="Mufflermen production topology · prod · au-east-1"
          nodes={OBSERVABILITY_NODES}
          edges={OBSERVABILITY_EDGES}
        />
      </section>
    </main>
  )
}
