import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AlertRuleCard,
  AnomalyDetectionStrip,
  CorrelationMatrix,
  DashboardGrid,
  ErrorBudgetBurndown,
  IncidentTimeline,
  LogStreamTable,
  MetricTile,
  QueryBuilder,
  ServiceMapGraph,
  SloCard,
  SpanDetailPane,
  SyntheticTestRow,
  TraceFlameGraph,
} from "../../components/observability"
import type { DashboardTile } from "../../components/observability"

import {
  ALERT_RULES,
  ANOMALY_ANNOTATIONS,
  ANOMALY_POINTS,
  CORRELATION_METRICS,
  CORRELATION_VALUES,
  ERROR_RATE_SPARK,
  INCIDENT_TIMELINE,
  LOG_ROWS,
  OBSERVABILITY_EDGES,
  OBSERVABILITY_NODES,
  PARTS_CATALOGUE_LATENCY_SPARK,
  QUERY_FILTERS,
  QUERY_GROUP_BY_AVAILABLE,
  QUERY_GROUP_BY_INITIAL,
  QUERY_METRICS,
  QUOTES_API_LATENCY_SPARK,
  QUOTES_API_RPS_SPARK,
  QUOTE_PDF_BURNDOWN,
  QUOTE_PDF_LATENCY_SPARK,
  SCHEDULER_LATENCY_SPARK,
  SLO_PDF_AVAILABILITY,
  SLO_QUOTES_LATENCY,
  SLO_SCHEDULER_AVAILABILITY,
  SYNTHETIC_TESTS,
  TRACE_FLAME_SPANS,
  TRACE_LINKED_LOGS,
  TRACE_TOTAL_MS,
} from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Full cockpit | Observability cockpit",
  description:
    "Composition — internal-facing Mufflermen observability cockpit assembled from the 14 primitives.",
}

const TOP_TILES: ReadonlyArray<DashboardTile> = [
  {
    id: "ct-quotes-rps",
    title: "Quotes API",
    subtitle: "RPS · 1m",
    span: 3,
    content: (
      <MetricTile
        label="RPS"
        value="198"
        unit="req/s"
        tone="teal"
        service="quotes-api"
        sparkline={QUOTES_API_RPS_SPARK}
        delta={{ label: "+8.2%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "ct-quotes-latency",
    title: "Quotes API",
    subtitle: "p95 latency · 5m",
    span: 3,
    content: (
      <MetricTile
        label="p95 latency"
        value="142"
        unit="ms"
        tone="green"
        service="quotes-api"
        sparkline={QUOTES_API_LATENCY_SPARK}
        delta={{ label: "-12%", direction: "down", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "ct-parts-latency",
    title: "Parts catalogue",
    subtitle: "p95 latency · 5m",
    span: 3,
    content: (
      <MetricTile
        label="p95 latency"
        value="188"
        unit="ms"
        tone="teal"
        service="parts-catalogue"
        sparkline={PARTS_CATALOGUE_LATENCY_SPARK}
        delta={{ label: "+4%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "ct-pdf-latency",
    title: "Quote PDF",
    subtitle: "render p95 · 5m",
    span: 3,
    content: (
      <MetricTile
        label="render p95"
        value="484"
        unit="ms"
        tone="amber"
        service="quote-pdf"
        sparkline={QUOTE_PDF_LATENCY_SPARK}
        delta={{ label: "+24%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "ct-scheduler-latency",
    title: "Workshop scheduler",
    subtitle: "p95 latency · 5m",
    span: 6,
    content: (
      <MetricTile
        label="p95 latency"
        value="96"
        unit="ms"
        tone="green"
        service="workshop-scheduler"
        sparkline={SCHEDULER_LATENCY_SPARK}
        delta={{ label: "0%", direction: "flat", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "ct-sms-error",
    title: "Customer SMS",
    subtitle: "delivery error rate · 5m",
    span: 6,
    content: (
      <MetricTile
        label="error rate"
        value="0.61"
        unit="%"
        tone="red"
        service="customer-sms"
        sparkline={ERROR_RATE_SPARK}
        delta={{ label: "+412%", direction: "up", vs: "vs 1h" }}
        caption="alert threshold > 2%"
      />
    ),
  },
]

export default function FullCockpitScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Internal cockpit"
        title="Mufflermen observability cockpit"
        description="A composed internal-facing cockpit wired from the 14 observability primitives — metric tiles up top in a dashboard grid, query bar, service map, log stream + active alert rules in the middle and a deep-dive section with the live trace, SLO cards, error budget burndown, correlation heatmap, anomaly strip, synthetic tests and the running incident timeline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Full cockpit" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · internal observability cockpit</span>
        <div className={styles.cockpitShell}>
          <DashboardGrid
            tiles={TOP_TILES}
            caption="Platform overview · last 5m"
            showDragHandles={false}
          />

          <QueryBuilder
            metrics={QUERY_METRICS}
            initialMetricId="http_request_duration_p95"
            initialFilters={QUERY_FILTERS}
            initialGroupBy={QUERY_GROUP_BY_INITIAL}
            availableGroupBy={QUERY_GROUP_BY_AVAILABLE}
          />

          <div className={styles.cockpitSplit}>
            <div className={styles.demoCol}>
              <ServiceMapGraph
                caption="Production topology · prod · au-east-1"
                nodes={OBSERVABILITY_NODES}
                edges={OBSERVABILITY_EDGES}
              />
              <LogStreamTable
                rows={LOG_ROWS}
                caption="Live log stream · all services"
              />
              <AnomalyDetectionStrip
                metricLabel="quotes-api p95 latency"
                service="quotes-api"
                points={ANOMALY_POINTS}
                anomalies={ANOMALY_ANNOTATIONS}
                rangeLabel="Last 6 hours · 10m buckets"
              />
            </div>

            <aside className={styles.cockpitAside}>
              <section className={styles.demoSurface} aria-label="Active alert rules">
                <span className={styles.demoLabel}>Active alert rules</span>
                <div className={styles.demoStack}>
                  {ALERT_RULES.map((rule) => (
                    <AlertRuleCard key={rule.ruleName} {...rule} />
                  ))}
                </div>
              </section>
              <section className={styles.demoSurface} aria-label="SLO cards">
                <span className={styles.demoLabel}>SLOs · 30-day window</span>
                <div className={styles.demoStack}>
                  <SloCard {...SLO_QUOTES_LATENCY} />
                  <SloCard {...SLO_PDF_AVAILABILITY} />
                  <SloCard {...SLO_SCHEDULER_AVAILABILITY} />
                </div>
              </section>
            </aside>
          </div>

          <div className={styles.cockpitSplit}>
            <div className={styles.demoCol}>
              <TraceFlameGraph
                spans={TRACE_FLAME_SPANS}
                totalMs={TRACE_TOTAL_MS}
                caption="Trace 7a3c…b1e2 · POST /quotes · 482ms"
                initialSelectedId="s10"
              />
              <CorrelationMatrix
                metrics={CORRELATION_METRICS}
                values={CORRELATION_VALUES}
                caption="Metric correlation · last 24h"
              />
            </div>

            <aside className={styles.cockpitAside}>
              <SpanDetailPane
                traceId="7a3c4d2e9f81b1e2"
                spanId="b6e08f2c"
                operation="quote-pdf.render"
                service="quote-pdf"
                kind="internal"
                durationMs={110}
                errorMessage="renderer worker OOM at 1.4 GB resident, restarting"
                tags={{
                  "quote.id": "Q-198342",
                  "render.pages": "14",
                  "render.attempts": "1",
                  "worker.pool": "renderers-prod",
                }}
                linkedLogs={TRACE_LINKED_LOGS}
              />
              <ErrorBudgetBurndown
                service="quote-pdf"
                sloLabel="Render availability ≥ 99.5%"
                points={QUOTE_PDF_BURNDOWN}
                totalBudgetMinutes={216}
                window="30 days"
              />
            </aside>
          </div>

          <section className={styles.demoSurface} aria-label="Synthetic tests">
            <span className={styles.demoLabel}>Synthetic tests · last run · 6 regions</span>
            <div className={styles.demoStack}>
              {SYNTHETIC_TESTS.map((test) => (
                <SyntheticTestRow key={`${test.name}-${test.region}`} {...test} />
              ))}
            </div>
          </section>

          <IncidentTimeline {...INCIDENT_TIMELINE} />
        </div>
      </section>
    </main>
  )
}
