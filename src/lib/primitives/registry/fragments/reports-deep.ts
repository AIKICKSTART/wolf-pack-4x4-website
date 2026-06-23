import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "reports-deep",
  "title": "Deep reports & analytics",
  "group": "Data",
  "summary": "14 advanced analytics primitives — drag-drop report builder, scheduled exports, filter rail, pinnable dashboard grid, large KPI card, drill-down stack, pivot table, funnel comparison, cohort heatmap, forecast chart, anomaly callouts, goal tracker, data-source rows and share controls.",
  "entries": [
    {
      "key": "reports-deep/report-builder-canvas",
      "family": "reports-deep",
      "name": "ReportBuilderCanvas",
      "label": "Report builder canvas",
      "description": "Drag-drop report builder with a draggable library palette and filter/dimension/measure drop zones plus a chart-kind radio picker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/report-builder-canvas",
      "tags": [
        "builder",
        "drag-drop",
        "analytics",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/scheduled-export-row",
      "family": "reports-deep",
      "name": "ScheduledExportRow",
      "label": "Scheduled export row",
      "description": "Scheduled-export row showing cron expression, next run, format chip, multi-channel recipients and a pause/resume switch.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/scheduled-export-row",
      "tags": [
        "export",
        "schedule",
        "cron",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/filter-panel",
      "family": "reports-deep",
      "name": "FilterPanel",
      "label": "Filter panel",
      "description": "Left-rail filter panel with date range, select, numeric range, toggleable chip groups, text search and a clear-all count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/filter-panel",
      "tags": [
        "filter",
        "form",
        "controls",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/dashboard-pin-grid",
      "family": "reports-deep",
      "name": "DashboardPinGrid",
      "label": "Dashboard pin grid",
      "description": "Pinnable widget grid where pinning a tile re-flows pinned widgets to the top of the spanned layout.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/dashboard-pin-grid",
      "tags": [
        "dashboard",
        "grid",
        "pin",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/kpi-card-large",
      "family": "reports-deep",
      "name": "KpiCardLarge",
      "label": "KPI card (large)",
      "description": "Large KPI card with delta chip, comparison label, an SVG goal-completion arc gauge and an optional sparkline footer slot.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/kpi-card-large",
      "tags": [
        "kpi",
        "metric",
        "gauge",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/drill-down-panel",
      "family": "reports-deep",
      "name": "DrillDownPanel",
      "label": "Drill-down panel",
      "description": "Drill-down stack with a breadcrumb and contributing-row bars that lets you drill into the next dimension level inline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/drill-down-panel",
      "tags": [
        "drilldown",
        "breadcrumb",
        "analytics",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/pivot-table",
      "family": "reports-deep",
      "name": "PivotTable",
      "label": "Pivot table",
      "description": "Pivot table with grouped row/column axes, a measure radio picker, row/column subtotals and a grand total.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/pivot-table",
      "tags": [
        "pivot",
        "table",
        "subtotals",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/funnel-comparison-card",
      "family": "reports-deep",
      "name": "FunnelComparisonCard",
      "label": "Funnel comparison card",
      "description": "Period-over-period funnel card showing current vs prior bars and per-stage conversion and delta tone.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/funnel-comparison-card",
      "tags": [
        "funnel",
        "comparison",
        "conversion",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/cohort-grid",
      "family": "reports-deep",
      "name": "CohortGrid",
      "label": "Cohort grid",
      "description": "Cohort retention/revenue/engagement heatmap table with a metric toggle and per-cell intensity shading.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/cohort-grid",
      "tags": [
        "cohort",
        "heatmap",
        "retention",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/forecast-chart-card",
      "family": "reports-deep",
      "name": "ForecastChartCard",
      "label": "Forecast chart card",
      "description": "SVG forecast chart plotting actual and forecast smooth lines with a confidence band and split-point marker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/forecast-chart-card",
      "tags": [
        "forecast",
        "chart",
        "svg",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/anomaly-callout-row",
      "family": "reports-deep",
      "name": "AnomalyCalloutRow",
      "label": "Anomaly callout row",
      "description": "Anomaly callout row with a severity badge, observed-vs-expected deviation, reason text, detected timestamp and an investigate CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/anomaly-callout-row",
      "tags": [
        "anomaly",
        "alert",
        "severity",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/goal-tracker-card",
      "family": "reports-deep",
      "name": "GoalTrackerCard",
      "label": "Goal tracker card",
      "description": "Goal tracker card showing current/target/projected values, a status chip, a current+projected progress bar and variance.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/goal-tracker-card",
      "tags": [
        "goal",
        "progress",
        "kpi",
        "tracking"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/data-source-row",
      "family": "reports-deep",
      "name": "DataSourceRow",
      "label": "Data source row",
      "description": "Connected data-source row with a sync-state dot, record count, last/next sync labels and a refresh button with a busy state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/data-source-row",
      "tags": [
        "data-source",
        "sync",
        "connection",
        "stateful"
      ],
      "status": "captured"
    },
    {
      "key": "reports-deep/share-report-card",
      "family": "reports-deep",
      "name": "ShareReportCard",
      "label": "Share report card",
      "description": "Share control card with link/embed/email/Slack channel tabs, a default-permission radio picker and an access list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports-deep",
      "routeHref": "/ui-primitives/reports-deep/share-report-card",
      "tags": [
        "share",
        "permissions",
        "embed",
        "stateful"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
