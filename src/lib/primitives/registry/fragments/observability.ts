import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "observability",
  "title": "Observability",
  "group": "Data",
  "summary": "14 telemetry surfaces for a metrics/logs/traces cockpit — metric tiles, query builder, dashboard grid, alert rules, log stream, flame graph, span detail, service map, error-budget burndown, SLO gauges, correlation matrix, anomaly strip, synthetic tests, and incident timeline.",
  "entries": [
    {
      "key": "observability/metric-tile",
      "family": "observability",
      "name": "MetricTile",
      "label": "Metric tile",
      "description": "Glass KPI tile with value, unit, directional delta, embedded sparkline trend and optional service/caption, tone-driven.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/metric-tile",
      "tags": [
        "metric",
        "kpi",
        "sparkline",
        "dashboard"
      ],
      "status": "captured"
    },
    {
      "key": "observability/query-builder",
      "family": "observability",
      "name": "QueryBuilder",
      "label": "Query builder",
      "description": "Interactive metric query composer with metric select, dismissible filter chips, group-by toggles and a live query preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/query-builder",
      "tags": [
        "query",
        "filter",
        "metrics",
        "control"
      ],
      "status": "captured"
    },
    {
      "key": "observability/dashboard-grid",
      "family": "observability",
      "name": "DashboardGrid",
      "label": "Dashboard grid",
      "description": "12-column neumorphic tile grid with per-tile column/row spans, titled headers and visual-only drag handles for a customizable dashboard.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/dashboard-grid",
      "tags": [
        "grid",
        "dashboard",
        "layout",
        "bento"
      ],
      "status": "captured"
    },
    {
      "key": "observability/alert-rule-card",
      "family": "observability",
      "name": "AlertRuleCard",
      "label": "Alert rule card",
      "description": "Alert rule card showing metric/operator/threshold vs current value with a threshold-proximity progress bar, state chip and last-triggered footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/alert-rule-card",
      "tags": [
        "alert",
        "threshold",
        "rule",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "observability/log-stream-table",
      "family": "observability",
      "name": "LogStreamTable",
      "label": "Log stream table",
      "description": "Filterable log stream as a compact zebra DataTable with severity chips, structured key/value fields and a severity-toggle filter row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/log-stream-table",
      "tags": [
        "logs",
        "table",
        "severity",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "observability/trace-flame-graph",
      "family": "observability",
      "name": "TraceFlameGraph",
      "label": "Trace flame graph",
      "description": "Interactive distributed-trace flame graph with depth-stacked, service-colored, selectable span bars and a millisecond time axis.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/trace-flame-graph",
      "tags": [
        "trace",
        "flamegraph",
        "spans",
        "apm"
      ],
      "status": "captured"
    },
    {
      "key": "observability/span-detail-pane",
      "family": "observability",
      "name": "SpanDetailPane",
      "label": "Span detail pane",
      "description": "Detail pane for a single trace span showing IDs, kind, duration, error state, tag key-values and severity-tagged linked log lines.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/span-detail-pane",
      "tags": [
        "span",
        "trace",
        "detail",
        "logs"
      ],
      "status": "captured"
    },
    {
      "key": "observability/service-map-graph",
      "family": "observability",
      "name": "ServiceMapGraph",
      "label": "Service map graph",
      "description": "SVG service dependency map with tone-coded nodes/edges, throughput labels, health legend and a selectable node detail footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/service-map-graph",
      "tags": [
        "service-map",
        "topology",
        "graph",
        "dependencies"
      ],
      "status": "captured"
    },
    {
      "key": "observability/error-budget-burndown",
      "family": "observability",
      "name": "ErrorBudgetBurndown",
      "label": "Error budget burndown",
      "description": "SLO error-budget burndown chart plotting ideal vs actual remaining budget over a window, with percent summary and trend sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/error-budget-burndown",
      "tags": [
        "slo",
        "error-budget",
        "burndown",
        "chart"
      ],
      "status": "captured"
    },
    {
      "key": "observability/slo-card",
      "family": "observability",
      "name": "SloCard",
      "label": "SLO card",
      "description": "SLO summary card with a radial budget gauge and objective/actual/window/budget metrics, deriving healthy/at-risk/breached health.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/slo-card",
      "tags": [
        "slo",
        "gauge",
        "reliability",
        "health"
      ],
      "status": "captured"
    },
    {
      "key": "observability/correlation-matrix",
      "family": "observability",
      "name": "CorrelationMatrix",
      "label": "Correlation matrix",
      "description": "Heatmap matrix of metric correlation coefficients with color-mixed positive/negative cells, axis labels and a value legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/correlation-matrix",
      "tags": [
        "correlation",
        "heatmap",
        "matrix",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "observability/anomaly-detection-strip",
      "family": "observability",
      "name": "AnomalyDetectionStrip",
      "label": "Anomaly detection strip",
      "description": "Time-series sparkline strip with SVG-overlaid anomaly markers and a tone-chipped list of annotated anomalies below.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/anomaly-detection-strip",
      "tags": [
        "anomaly",
        "timeseries",
        "detection",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "observability/synthetic-test-row",
      "family": "observability",
      "name": "SyntheticTestRow",
      "label": "Synthetic test row",
      "description": "Compact synthetic-monitoring row showing test name/kind, region, outcome chip, latency (tone by threshold) and optional uptime.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/synthetic-test-row",
      "tags": [
        "synthetic",
        "uptime",
        "latency",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "observability/incident-timeline",
      "family": "observability",
      "name": "IncidentTimeline",
      "label": "Incident timeline",
      "description": "Vertical incident timeline with glyph/kind markers per event (detect/ack/mitigate/resolve) and severity + impact chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/observability",
      "routeHref": "/ui-primitives/observability/incident-timeline",
      "tags": [
        "incident",
        "timeline",
        "events",
        "oncall"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
