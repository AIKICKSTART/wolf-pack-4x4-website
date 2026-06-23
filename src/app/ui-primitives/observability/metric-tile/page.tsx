import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MetricTile } from "../../components/observability"

import {
  ERROR_RATE_SPARK,
  QUOTES_API_LATENCY_SPARK,
  QUOTES_API_RPS_SPARK,
  QUOTE_PDF_LATENCY_SPARK,
} from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Metric tile | Observability cockpit",
  description:
    "Primitive 01 — single-metric tile with current value, delta and sparkline trend.",
}

export default function MetricTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Metric"
        title="Metric tile"
        description="A single-metric tile suitable for dropping into a dashboard grid — current value, optional delta vs comparison window, a service tag and a tone-coloured sparkline. Tone shifts from green → amber → red as the metric drifts towards budget."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Metric tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 4 services · 4 tones</span>
        <div className={styles.demoTriple}>
          <MetricTile
            label="p95 latency"
            value="142"
            unit="ms"
            tone="green"
            service="quotes-api"
            sparkline={QUOTES_API_LATENCY_SPARK}
            delta={{ label: "-12%", direction: "down", vs: "vs last hour" }}
            caption="rate p95, 5m window"
          />
          <MetricTile
            label="RPS"
            value="198"
            unit="req/s"
            tone="teal"
            service="quotes-api"
            sparkline={QUOTES_API_RPS_SPARK}
            delta={{ label: "+8.2%", direction: "up", vs: "vs last hour" }}
            caption="rate, 1m window"
          />
          <MetricTile
            label="render p95"
            value="484"
            unit="ms"
            tone="amber"
            service="quote-pdf"
            sparkline={QUOTE_PDF_LATENCY_SPARK}
            delta={{ label: "+24%", direction: "up", vs: "vs last hour" }}
            caption="approaching 500ms SLO"
          />
          <MetricTile
            label="error rate"
            value="0.61"
            unit="%"
            tone="red"
            service="customer-sms"
            sparkline={ERROR_RATE_SPARK}
            delta={{ label: "+412%", direction: "up", vs: "vs last hour" }}
            caption="page threshold > 2%"
          />
        </div>
      </section>
    </main>
  )
}
