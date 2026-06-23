import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "reports",
  "title": "Reports",
  "group": "Data",
  "summary": "14 report-building, scheduling, export, and analytics primitives: a drag-and-drop pivot builder, saved/share/subscription cards, delivery scheduling, KPI/comparison/drilldown viz, and run-history tables.",
  "entries": [
    {
      "key": "reports/report-builder-canvas",
      "family": "reports",
      "name": "ReportBuilderCanvas",
      "label": "Report builder canvas",
      "description": "Three-pane drag-and-drop pivot builder with a field library, rows/columns/values/filters drop zones, and a live preview table.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/report-builder-canvas",
      "tags": [
        "builder",
        "drag-drop",
        "pivot"
      ],
      "status": "captured"
    },
    {
      "key": "reports/saved-report-card",
      "family": "reports",
      "name": "SavedReportCard",
      "label": "Saved report card",
      "description": "Card for a saved report showing thumbnail, owner, last-run, optional schedule, and open/edit/duplicate/share actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/saved-report-card",
      "tags": [
        "card",
        "saved",
        "actions"
      ],
      "status": "captured"
    },
    {
      "key": "reports/schedule-report-form",
      "family": "reports",
      "name": "ScheduleReportForm",
      "label": "Schedule report form",
      "description": "Form to schedule a report with frequency segments, optional cron field, a recipient tag input, format chips, and an attach-data toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/schedule-report-form",
      "tags": [
        "form",
        "schedule",
        "recipients"
      ],
      "status": "captured"
    },
    {
      "key": "reports/export-format-picker",
      "family": "reports",
      "name": "ExportFormatPicker",
      "label": "Export format picker",
      "description": "Radiogroup of export formats (PDF/CSV/Excel/JSON/Parquet) with size estimates and a trim-columns toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/export-format-picker",
      "tags": [
        "export",
        "format",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "reports/report-run-history-table",
      "family": "reports",
      "name": "ReportRunHistoryTable",
      "label": "Report run history table",
      "description": "Compact DataTable of report runs showing timestamp, duration, rows, size, status badge, and a download button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/report-run-history-table",
      "tags": [
        "table",
        "history",
        "runs"
      ],
      "status": "captured"
    },
    {
      "key": "reports/pivot-table-preview",
      "family": "reports",
      "name": "PivotTablePreview",
      "label": "Pivot table preview",
      "description": "Grid-rendered pivot table with row/column headers, emphasised value cells, subtotal rows, and an optional totals row.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/pivot-table-preview",
      "tags": [
        "pivot",
        "table",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "reports/filter-builder-tree",
      "family": "reports",
      "name": "FilterBuilderTree",
      "label": "Filter builder tree",
      "description": "Recursive AND/OR filter group tree with add/remove conditions and groups, rendering a live WHERE-clause preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/filter-builder-tree",
      "tags": [
        "filter",
        "tree",
        "query"
      ],
      "status": "captured"
    },
    {
      "key": "reports/date-range-presets",
      "family": "reports",
      "name": "DateRangePresets",
      "label": "Date range presets",
      "description": "Radiogroup row of selectable date-range preset buttons, each with a label and hint.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/date-range-presets",
      "tags": [
        "date-range",
        "presets",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "reports/kpi-snapshot-tile",
      "family": "reports",
      "name": "KpiSnapshotTile",
      "label": "KPI snapshot tile",
      "description": "Clickable KPI tile showing a value with unit, a toned delta badge, comparison label, and an optional sparkline slot.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/kpi-snapshot-tile",
      "tags": [
        "kpi",
        "metric",
        "tile"
      ],
      "status": "captured"
    },
    {
      "key": "reports/report-subscription-row",
      "family": "reports",
      "name": "ReportSubscriptionRow",
      "label": "Report subscription row",
      "description": "Row for a report subscriber showing avatar initials, name/email, frequency, last-sent date, and an unsubscribe action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/report-subscription-row",
      "tags": [
        "subscription",
        "row",
        "recipient"
      ],
      "status": "captured"
    },
    {
      "key": "reports/scheduled-delivery-preview",
      "family": "reports",
      "name": "ScheduledDeliveryPreview",
      "label": "Scheduled delivery preview",
      "description": "Email-style delivery preview card with from/to headers, subject, preheader, thumbnail, channel, and scheduled time.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/scheduled-delivery-preview",
      "tags": [
        "delivery",
        "preview",
        "email"
      ],
      "status": "captured"
    },
    {
      "key": "reports/period-comparison-strip",
      "family": "reports",
      "name": "PeriodComparisonStrip",
      "label": "Period comparison strip",
      "description": "Horizontal strip comparing a current vs prior period value with a toned delta badge and optional sparkline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/period-comparison-strip",
      "tags": [
        "comparison",
        "period",
        "delta"
      ],
      "status": "captured"
    },
    {
      "key": "reports/drilldown-inspector",
      "family": "reports",
      "name": "DrilldownInspector",
      "label": "Drilldown inspector",
      "description": "Panel breaking a parent metric into share-ranked contributor rows with horizontal bar fills and percentages.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/drilldown-inspector",
      "tags": [
        "drilldown",
        "breakdown",
        "contributors"
      ],
      "status": "captured"
    },
    {
      "key": "reports/report-share-card",
      "family": "reports",
      "name": "ReportShareCard",
      "label": "Report share card",
      "description": "Sharing panel with a copyable public URL, expiry, access-scope chips, and an embed-code CodeBlock.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reports",
      "routeHref": "/ui-primitives/reports/report-share-card",
      "tags": [
        "share",
        "embed",
        "access"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
