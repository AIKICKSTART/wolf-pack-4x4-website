import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AnomalyDetectionStrip } from "../../components/observability"

import { ANOMALY_ANNOTATIONS, ANOMALY_POINTS } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Anomaly detection strip | Observability cockpit",
  description:
    "Primitive 12 — anomaly strip on a time series with annotated outliers and a per-anomaly list below.",
}

export default function AnomalyDetectionStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Anomalies"
        title="Anomaly detection strip"
        description="A time series with annotated anomalies — dashed vertical guides land on each detected anomaly and a tone-coded halo + dot mark the point. The list below names each anomaly kind (Spike · Dip · Flat-line · Drift) and offers a short rationale."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Anomaly detection strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 36 samples · 3 anomalies</span>
        <AnomalyDetectionStrip
          metricLabel="quotes-api p95 latency"
          service="quotes-api"
          points={ANOMALY_POINTS}
          anomalies={ANOMALY_ANNOTATIONS}
          baselineLabel="Forecast band p5-p95"
          rangeLabel="Last 6 hours · 10m buckets"
        />
      </section>
    </main>
  )
}
