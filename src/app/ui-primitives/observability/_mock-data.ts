/* Shared mock data for the observability sub-routes + full cockpit. */

import type {
  AnomalyAnnotation,
  BurndownPoint,
  FlameSpan,
  IncidentTimelineProps,
  LogEntry,
  ObservabilityServiceEdge,
  ObservabilityServiceNode,
  QueryFilter,
  QueryGroupBy,
  QueryMetric,
  SpanLinkedLog,
  TimelineEvent,
} from "../components/observability"

/* ------------------------------------------------------------------ *
 * Metric sparklines
 * ------------------------------------------------------------------ */

function wobble(base: number, samples: number, amplitude: number, seed: number): number[] {
  const out: number[] = []
  for (let i = 0; i < samples; i += 1) {
    const noise = Math.sin((i + seed) / 2.3) * amplitude + Math.sin((i + seed) / 5.1) * amplitude * 0.5
    out.push(base + noise)
  }
  return out
}

export const QUOTES_API_RPS_SPARK = wobble(184, 48, 14, 1)
export const QUOTES_API_LATENCY_SPARK = wobble(142, 48, 24, 3)
export const PARTS_CATALOGUE_LATENCY_SPARK = wobble(188, 48, 18, 7)
export const PARTS_CATALOGUE_RPS_SPARK = wobble(96, 48, 9, 9)
export const SCHEDULER_RPS_SPARK = wobble(42, 48, 6, 11)
export const SCHEDULER_LATENCY_SPARK = wobble(96, 48, 12, 13)
export const QUOTE_PDF_LATENCY_SPARK = wobble(412, 48, 64, 17)
export const QUOTE_PDF_RPS_SPARK = wobble(8, 48, 2, 19)

export const ERROR_RATE_SPARK = [
  0.001, 0.0009, 0.001, 0.0011, 0.0012, 0.0011, 0.001, 0.0011,
  0.0013, 0.0015, 0.0019, 0.0024, 0.0042, 0.0061, 0.0072, 0.0058,
  0.0036, 0.0021, 0.0014, 0.0011, 0.001, 0.001, 0.0011, 0.001,
]

/* ------------------------------------------------------------------ *
 * Query builder
 * ------------------------------------------------------------------ */

export const QUERY_METRICS: ReadonlyArray<QueryMetric> = [
  { id: "http_request_duration_p95", label: "http.request.duration.p95", kind: "Histogram" },
  { id: "http_request_total", label: "http.request.total", kind: "Counter" },
  { id: "http_errors_total", label: "http.errors.total", kind: "Counter" },
  { id: "quotes_generated_total", label: "quotes.generated.total", kind: "Counter" },
  { id: "scheduler_bay_utilisation", label: "scheduler.bay.utilisation", kind: "Gauge" },
  { id: "quote_pdf_render_duration", label: "quote_pdf.render.duration", kind: "Histogram" },
]

export const QUERY_FILTERS: ReadonlyArray<QueryFilter> = [
  { id: "f1", key: "service", value: "quotes-api", tone: "teal" },
  { id: "f2", key: "env", value: "prod", tone: "neutral" },
  { id: "f3", key: "region", value: "au-east-1", tone: "amber" },
]

export const QUERY_GROUP_BY_AVAILABLE: ReadonlyArray<QueryGroupBy> = [
  { id: "g-service", label: "service" },
  { id: "g-region", label: "region" },
  { id: "g-route", label: "route" },
  { id: "g-status", label: "status_code" },
  { id: "g-version", label: "version" },
]

export const QUERY_GROUP_BY_INITIAL: ReadonlyArray<QueryGroupBy> = [
  { id: "g-region", label: "region" },
]

/* ------------------------------------------------------------------ *
 * Alert rules
 * ------------------------------------------------------------------ */

export const ALERT_RULES = [
  {
    ruleName: "quotes-api p95 latency",
    service: "quotes-api",
    metric: "http.request.duration.p95",
    operator: ">" as const,
    thresholdValue: 200,
    thresholdUnit: "ms",
    currentValue: 142,
    state: "ok" as const,
    lastTriggered: "3d ago",
    notes: "Eval window: 5m of 5m",
  },
  {
    ruleName: "quote-pdf render duration",
    service: "quote-pdf",
    metric: "render.duration.p95",
    operator: ">" as const,
    thresholdValue: 500,
    thresholdUnit: "ms",
    currentValue: 484,
    state: "pending" as const,
    lastTriggered: "1h ago",
    notes: "Eval window: 5m of 10m",
  },
  {
    ruleName: "customer-sms error rate",
    service: "customer-sms",
    metric: "delivery.error.rate",
    operator: ">" as const,
    thresholdValue: 0.02,
    thresholdUnit: "",
    currentValue: 0.041,
    state: "alerting" as const,
    lastTriggered: "14m ago",
    notes: "Eval window: 5m of 5m",
  },
  {
    ruleName: "parts-catalogue cache hit",
    service: "parts-catalogue",
    metric: "cache.hit.ratio",
    operator: "<" as const,
    thresholdValue: 0.8,
    thresholdUnit: "",
    currentValue: 0.92,
    state: "ok" as const,
    lastTriggered: "Never",
    notes: "Eval window: 10m of 30m",
  },
]

/* ------------------------------------------------------------------ *
 * Logs
 * ------------------------------------------------------------------ */

export const LOG_ROWS: ReadonlyArray<LogEntry> = [
  {
    id: "log-1",
    timestamp: "19:42:14.203",
    severity: "error",
    service: "customer-sms",
    message: "carrier returned 5xx after 2 retries; queueing for backoff",
    fields: { traceId: "f3a8…d12", carrier: "apac-2", retries: "2" },
  },
  {
    id: "log-2",
    timestamp: "19:42:14.118",
    severity: "warn",
    service: "quotes-api",
    message: "slow downstream call to parts-catalogue p99=812ms",
    fields: { traceId: "f3a8…d12", route: "POST /quotes" },
  },
  {
    id: "log-3",
    timestamp: "19:42:13.982",
    severity: "info",
    service: "quotes-api",
    message: "quote created for vehicle WV1ZZZ7HZ8H012345",
    fields: { quoteId: "Q-198342", customerId: "C-44182" },
  },
  {
    id: "log-4",
    timestamp: "19:42:13.711",
    severity: "info",
    service: "workshop-scheduler",
    message: "bay-3 reservation locked for 2026-05-29 09:30",
    fields: { bookingId: "B-9921", bayId: "bay-3" },
  },
  {
    id: "log-5",
    timestamp: "19:42:12.504",
    severity: "debug",
    service: "quote-pdf",
    message: "pdf render queued for quote Q-198341",
    fields: { renderId: "r-7733" },
  },
  {
    id: "log-6",
    timestamp: "19:42:11.901",
    severity: "error",
    service: "payment-gateway",
    message: "card auth declined: insufficient funds",
    fields: { paymentId: "P-7711", code: "51" },
  },
  {
    id: "log-7",
    timestamp: "19:42:10.882",
    severity: "fatal",
    service: "quote-pdf",
    message: "renderer worker OOM at 1.4 GB resident, restarting",
    fields: { renderId: "r-7728", workerId: "wkr-3" },
  },
  {
    id: "log-8",
    timestamp: "19:42:10.140",
    severity: "info",
    service: "parts-catalogue",
    message: "warmed cache for sku family 'exhaust-clamps' (482 skus)",
    fields: { cache: "warm", duration: "184ms" },
  },
]

/* ------------------------------------------------------------------ *
 * Trace flame graph
 * ------------------------------------------------------------------ */

export const TRACE_FLAME_SPANS: ReadonlyArray<FlameSpan> = [
  { id: "s0", service: "edge", name: "POST /quotes", startMs: 0, durationMs: 482, depth: 0 },
  { id: "s1", service: "quotes-api", name: "createQuote", startMs: 4, durationMs: 472, depth: 1 },
  { id: "s2", service: "quotes-api", name: "validate", startMs: 6, durationMs: 38, depth: 2 },
  { id: "s3", service: "quotes-api", name: "priceLines", startMs: 46, durationMs: 196, depth: 2 },
  { id: "s4", service: "parts-catalogue", name: "GET /sku/batch", startMs: 52, durationMs: 162, depth: 3 },
  { id: "s5", service: "parts-catalogue", name: "redis.mget", startMs: 56, durationMs: 22, depth: 4 },
  { id: "s6", service: "parts-catalogue", name: "postgres.select", startMs: 80, durationMs: 130, depth: 4 },
  { id: "s7", service: "quotes-api", name: "scheduleBay", startMs: 244, durationMs: 110, depth: 2 },
  { id: "s8", service: "workshop-scheduler", name: "reserveBay", startMs: 248, durationMs: 102, depth: 3 },
  { id: "s9", service: "quotes-api", name: "renderPdf", startMs: 356, durationMs: 116, depth: 2 },
  { id: "s10", service: "quote-pdf", name: "render", startMs: 360, durationMs: 110, depth: 3, hasError: true },
]

export const TRACE_TOTAL_MS = 488

export const TRACE_LINKED_LOGS: ReadonlyArray<SpanLinkedLog> = [
  { id: "ll-1", severity: "error", message: "renderer worker exited with code 137 (OOM)" },
  { id: "ll-2", severity: "warn", message: "pdf template heavy: 14 part diagrams attached" },
  { id: "ll-3", severity: "info", message: "retry will be queued for next pass" },
]

/* ------------------------------------------------------------------ *
 * Service map
 * ------------------------------------------------------------------ */

export const OBSERVABILITY_NODES: ReadonlyArray<ObservabilityServiceNode> = [
  { id: "edge", label: "edge", kind: "external", x: 14, y: 18, rps: 412, errorRate: 0.0012, p95Ms: 28, tone: "green" },
  { id: "quotes-api", label: "quotes-api", kind: "internal", x: 38, y: 32, rps: 198, errorRate: 0.0021, p95Ms: 142, tone: "green" },
  { id: "parts-catalogue", label: "parts-catalogue", kind: "internal", x: 64, y: 22, rps: 96, errorRate: 0.0009, p95Ms: 88, tone: "green" },
  { id: "workshop-scheduler", label: "workshop-scheduler", kind: "internal", x: 64, y: 50, rps: 42, errorRate: 0.0018, p95Ms: 96, tone: "green" },
  { id: "quote-pdf", label: "quote-pdf", kind: "internal", x: 88, y: 32, rps: 8, errorRate: 0.044, p95Ms: 482, tone: "red" },
  { id: "redis", label: "redis", kind: "datastore", x: 50, y: 72, rps: 612, errorRate: 0.0, p95Ms: 4, tone: "green" },
  { id: "postgres", label: "postgres", kind: "datastore", x: 78, y: 72, rps: 184, errorRate: 0.0001, p95Ms: 22, tone: "green" },
  { id: "sms-queue", label: "sms-queue", kind: "queue", x: 30, y: 72, rps: 24, errorRate: 0.018, p95Ms: 14, tone: "amber" },
]

export const OBSERVABILITY_EDGES: ReadonlyArray<ObservabilityServiceEdge> = [
  { from: "edge", to: "quotes-api", tone: "green", rps: 198 },
  { from: "quotes-api", to: "parts-catalogue", tone: "green", rps: 96 },
  { from: "quotes-api", to: "workshop-scheduler", tone: "green", rps: 42 },
  { from: "quotes-api", to: "quote-pdf", tone: "red", rps: 8 },
  { from: "parts-catalogue", to: "redis", tone: "green", rps: 612 },
  { from: "parts-catalogue", to: "postgres", tone: "green", rps: 184 },
  { from: "workshop-scheduler", to: "postgres", tone: "green", rps: 38 },
  { from: "quotes-api", to: "sms-queue", tone: "amber", rps: 24 },
]

/* ------------------------------------------------------------------ *
 * Error budget burndown
 * ------------------------------------------------------------------ */

export const QUOTE_PDF_BURNDOWN: ReadonlyArray<BurndownPoint> = Array.from({ length: 30 }, (_, idx) => {
  const ideal = 1 - (idx / 29)
  const drift = idx < 18 ? idx * 0.012 : 18 * 0.012 + (idx - 18) * 0.042
  const actual = Math.max(0, Math.min(1, ideal - drift))
  return {
    label: idx % 4 === 0 ? `D${idx + 1}` : "",
    ideal,
    actual,
  }
})

/* ------------------------------------------------------------------ *
 * SLO cards
 * ------------------------------------------------------------------ */

export const SLO_QUOTES_LATENCY = {
  title: "p95 < 200ms",
  service: "quotes-api",
  description: "POST /quotes p95 latency must be under 200ms.",
  objective: 99.5,
  actual: 99.612,
  window: "30d" as const,
  budgetRemaining: 0.72,
}

export const SLO_PDF_AVAILABILITY = {
  title: "Availability ≥ 99.5%",
  service: "quote-pdf",
  description: "Successful render rate over 30 days.",
  objective: 99.5,
  actual: 99.18,
  window: "30d" as const,
  budgetRemaining: 0.14,
}

export const SLO_SCHEDULER_AVAILABILITY = {
  title: "Availability ≥ 99.9%",
  service: "workshop-scheduler",
  description: "Bay reservation API success ratio.",
  objective: 99.9,
  actual: 99.96,
  window: "30d" as const,
  budgetRemaining: 0.86,
}

/* ------------------------------------------------------------------ *
 * Correlation matrix
 * ------------------------------------------------------------------ */

export const CORRELATION_METRICS: ReadonlyArray<string> = [
  "quotes.rps",
  "quotes.latency.p95",
  "parts.latency.p95",
  "scheduler.bay.util",
  "pdf.error.rate",
  "carrier.5xx",
]

export const CORRELATION_VALUES: ReadonlyArray<ReadonlyArray<number>> = [
  [1.0, 0.42, 0.36, 0.58, 0.18, 0.08],
  [0.42, 1.0, 0.82, 0.24, 0.36, 0.16],
  [0.36, 0.82, 1.0, 0.12, 0.31, 0.04],
  [0.58, 0.24, 0.12, 1.0, -0.18, 0.02],
  [0.18, 0.36, 0.31, -0.18, 1.0, 0.62],
  [0.08, 0.16, 0.04, 0.02, 0.62, 1.0],
]

/* ------------------------------------------------------------------ *
 * Anomaly detection strip
 * ------------------------------------------------------------------ */

export const ANOMALY_POINTS: ReadonlyArray<number> = [
  142, 138, 144, 146, 142, 140, 138, 142, 144, 148, 150, 152,
  162, 184, 232, 198, 156, 144, 142, 140, 142, 144, 148, 152,
  158, 162, 168, 184, 286, 412, 388, 224, 168, 152, 148, 142,
]

export const ANOMALY_ANNOTATIONS: ReadonlyArray<AnomalyAnnotation> = [
  { index: 13, kind: "spike", caption: "Brief spike on parts-catalogue p99 cascade" },
  { index: 29, kind: "spike", caption: "PDF queue backlog caused upstream latency" },
  { index: 31, kind: "drift", caption: "Drift outside forecast band — investigating" },
]

/* ------------------------------------------------------------------ *
 * Synthetic tests
 * ------------------------------------------------------------------ */

export const SYNTHETIC_TESTS = [
  {
    name: "GET /api/quotes/health",
    kind: "API",
    region: "au-east-1",
    lastOutcome: "pass" as const,
    latencyMs: 124,
    lastRun: "2m ago",
    uptime: 99.98,
  },
  {
    name: "POST /api/quotes",
    kind: "API",
    region: "au-east-1",
    lastOutcome: "pass" as const,
    latencyMs: 484,
    lastRun: "2m ago",
    uptime: 99.86,
  },
  {
    name: "Browser: book service flow",
    kind: "Browser",
    region: "au-west-1",
    lastOutcome: "degraded" as const,
    latencyMs: 1842,
    lastRun: "5m ago",
    uptime: 98.92,
  },
  {
    name: "POST /api/quote-pdf/render",
    kind: "API",
    region: "us-east-1",
    lastOutcome: "fail" as const,
    latencyMs: 3122,
    lastRun: "4m ago",
    uptime: 96.18,
  },
  {
    name: "GET /api/parts/search",
    kind: "API",
    region: "eu-central-1",
    lastOutcome: "pass" as const,
    latencyMs: 312,
    lastRun: "3m ago",
    uptime: 99.92,
  },
  {
    name: "ICMP edge probe",
    kind: "ICMP",
    region: "apac-1",
    lastOutcome: "timeout" as const,
    latencyMs: 0,
    lastRun: "6m ago",
    uptime: 96.42,
  },
]

/* ------------------------------------------------------------------ *
 * Incident timeline
 * ------------------------------------------------------------------ */

const INCIDENT_EVENTS: ReadonlyArray<TimelineEvent> = [
  {
    id: "e1",
    time: "19:42 AEST",
    kind: "detect",
    title: "PDF render error rate breaches SLO (4.4%)",
    severity: "error",
    impact: "minor",
    actor: "alertmanager",
    body: "Threshold > 2% for 5m of 5m. Anomaly detection flagged a drift event 6 minutes prior.",
  },
  {
    id: "e2",
    time: "19:43 AEST",
    kind: "page",
    title: "On-call paged for quote-pdf service",
    actor: "PagerDuty",
    severity: "error",
  },
  {
    id: "e3",
    time: "19:46 AEST",
    kind: "ack",
    title: "Sasha B acknowledged the page",
    actor: "Sasha B",
    severity: "info",
  },
  {
    id: "e4",
    time: "19:51 AEST",
    kind: "comm",
    title: "Internal status update posted to #incidents",
    actor: "Sasha B",
    impact: "minor",
  },
  {
    id: "e5",
    time: "19:58 AEST",
    kind: "mitigate",
    title: "Renderer pool resized 3 → 6; OOM threshold lifted",
    actor: "ops automation",
    severity: "warn",
    impact: "minor",
  },
  {
    id: "e6",
    time: "20:08 AEST",
    kind: "resolve",
    title: "Error rate back under 0.5%, SLO restored",
    actor: "alertmanager",
    severity: "info",
    impact: "none",
  },
]

export const INCIDENT_TIMELINE: Pick<IncidentTimelineProps, "incidentTitle" | "events"> = {
  incidentTitle: "INC-2026-05-28-quote-pdf-oom",
  events: INCIDENT_EVENTS,
}
