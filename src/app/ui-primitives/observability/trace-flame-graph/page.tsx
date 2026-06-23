import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TraceFlameGraph } from "../../components/observability"

import { TRACE_FLAME_SPANS, TRACE_TOTAL_MS } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Trace flame graph | Observability cockpit",
  description:
    "Primitive 06 — distributed-trace flame graph with stacked bars per span, depth-based rows and click-to-select.",
}

export default function TraceFlameGraphScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Traces"
        title="Trace flame graph"
        description="A distributed-trace flame graph — each row is a depth in the call stack, each bar is a span sized in proportion to its duration. Bars colour by originating service, error spans go red and clicking a span highlights it with a white outline. Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Trace flame graph" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 11 spans · 5 depths</span>
        <TraceFlameGraph
          spans={TRACE_FLAME_SPANS}
          totalMs={TRACE_TOTAL_MS}
          caption="Trace 7a3c…b1e2 · POST /quotes · 482ms"
          initialSelectedId="s10"
        />
      </section>
    </main>
  )
}
