import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "status-page",
  "title": "Status page",
  "group": "Operations",
  "summary": "14 status-page and SRE observability primitives — service rows, region grids, incident/postmortem cards, maintenance banners, uptime/latency/SLO/error-budget visualizations, synthetic-check timelines, a subscribe form, an interactive alerts inbox, and a zoomable service-dependency map — all sharing a tone-driven status palette.",
  "entries": [
    {
      "key": "status-page/service-status-row",
      "family": "status-page",
      "name": "ServiceStatusRow",
      "label": "Service status row",
      "description": "Per-service row with a status chip and a 90-day uptime day-grid plus a pre-computed uptime percentage.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/service-status-row",
      "tags": [
        "status",
        "uptime",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/region-status-grid",
      "family": "status-page",
      "name": "RegionStatusGrid",
      "label": "Region status grid",
      "description": "Grid of region cells showing per-region status, median latency, and an optional secondary metric with tone-coded latency.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/region-status-grid",
      "tags": [
        "status",
        "region",
        "latency"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/incident-card",
      "family": "status-page",
      "name": "IncidentCard",
      "label": "Incident card",
      "description": "Incident summary card with severity chip, a four-stage investigating→resolved timeline, affected scope, latest update, and optional subscribe link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/incident-card",
      "tags": [
        "incident",
        "timeline",
        "severity"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/maintenance-window-banner",
      "family": "status-page",
      "name": "MaintenanceWindowBanner",
      "label": "Maintenance window banner",
      "description": "Maintenance notice banner with phase chip, impact summary, start/end times, and optional affected services; switches to alert role when in progress.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/maintenance-window-banner",
      "tags": [
        "maintenance",
        "banner",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/uptime-sparkline-row",
      "family": "status-page",
      "name": "UptimeSparklineRow",
      "label": "Uptime sparkline row",
      "description": "Compact service row rendering a 24-point SVG uptime sparkline alongside p99 latency and error-rate metrics.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/uptime-sparkline-row",
      "tags": [
        "uptime",
        "sparkline",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/service-map-graph",
      "family": "status-page",
      "name": "ServiceMapGraph",
      "label": "Service map graph",
      "description": "Zoomable SVG service-dependency graph with tone-coded nodes and arrowed edges plus zoom in/out/reset controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/service-map-graph",
      "tags": [
        "dependency",
        "graph",
        "topology"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/subscribe-updates-input",
      "family": "status-page",
      "name": "SubscribeUpdatesInput",
      "label": "Subscribe updates input",
      "description": "Status-update subscription form with email/SMS channel toggle, endpoint field, frequency select, and a privacy note.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/subscribe-updates-input",
      "tags": [
        "subscribe",
        "form",
        "notifications"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/status-history-table",
      "family": "status-page",
      "name": "StatusHistoryTable",
      "label": "Status history table",
      "description": "Sortable table of past resolved incidents (date, service, title, severity, duration, status) built on the shared DataTable primitive.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/status-history-table",
      "tags": [
        "history",
        "table",
        "incidents"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/postmortem-card",
      "family": "status-page",
      "name": "PostmortemCard",
      "label": "Postmortem card",
      "description": "Postmortem document card with a numbered 5-whys list, owned action items, and a lessons-learned section.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/postmortem-card",
      "tags": [
        "postmortem",
        "rca",
        "incident"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/slo-dashboard-tile",
      "family": "status-page",
      "name": "SloDashboardTile",
      "label": "SLO dashboard tile",
      "description": "SLO tile comparing objective vs actual over a 30d/90d window with a meeting/at-risk status and a remaining error-budget meter.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/slo-dashboard-tile",
      "tags": [
        "slo",
        "dashboard",
        "objective"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/error-budget-gauge",
      "family": "status-page",
      "name": "ErrorBudgetGauge",
      "label": "Error budget gauge",
      "description": "Semicircular SVG gauge showing consumed error budget, burn-rate chip, remaining percentage, and a mini consumption trend line.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/error-budget-gauge",
      "tags": [
        "error-budget",
        "gauge",
        "burn-rate"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/synthetic-check-timeline",
      "family": "status-page",
      "name": "SyntheticCheckTimeline",
      "label": "Synthetic check timeline",
      "description": "24-hour synthetic-check timeline with one tone-coded pass/fail/timeout dot per hour across multiple region tracks, plus an hour axis and legend.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/synthetic-check-timeline",
      "tags": [
        "synthetic",
        "monitoring",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/latency-percentile-strip",
      "family": "status-page",
      "name": "LatencyPercentileStrip",
      "label": "Latency percentile strip",
      "description": "Bar strip of latency percentiles (p50–p99.9) with tone derived from an optional p95 budget threshold.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/latency-percentile-strip",
      "tags": [
        "latency",
        "percentile",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "status-page/active-alerts-inbox",
      "family": "status-page",
      "name": "ActiveAlertsInbox",
      "label": "Active alerts inbox",
      "description": "Interactive list of firing alerts with severity, service, age, assignee avatar, and a button that cycles each alert through firing/acknowledged/resolved states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/status-page",
      "routeHref": "/ui-primitives/status-page/active-alerts-inbox",
      "tags": [
        "alerts",
        "inbox",
        "acknowledge"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
