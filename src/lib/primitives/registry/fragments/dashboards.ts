import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "dashboards",
  "title": "Dashboards",
  "group": "Data",
  "summary": "A dashboard composition kit — a configurable DashboardShell (kicker/title/grid/density landmark) and accent-toned DashboardTile, plus 10 persona-specific dashboard surfaces (workshop manager, front desk, parts receiver, customer portal, admin org, Mufflerpulse editor, Hermes operator, executive overview, technician mobile, marketing performance) composed from charts, data-display, and workshop-scene primitives.",
  "entries": [
    {
      "key": "dashboards/dashboard-shell",
      "family": "dashboards",
      "name": "DashboardShell",
      "label": "Dashboard shell",
      "description": "Section landmark with kicker/title/subtitle header, live-sync toolbar slot, a configurable equal-width grid (columns + compact/comfortable density), and optional footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "tags": [
        "layout",
        "grid",
        "shell",
        "landmark"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/dashboard-tile",
      "family": "dashboards",
      "name": "DashboardTile",
      "label": "Dashboard tile",
      "description": "Grid cell article with label/aside header, configurable column span (1-4) and an accent top-stripe tone (red/amber/teal/green/neutral).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "tags": [
        "tile",
        "card",
        "grid-item"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/workshop-manager-dashboard",
      "family": "dashboards",
      "name": "WorkshopManagerDashboard",
      "label": "Workshop manager dashboard",
      "description": "Manager operational view: stat-counter KPI row, job-board kanban + activity feed, bay-utilization radial meters, alert-routing channel matrix, and 7-day revenue bar chart.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/workshop-manager",
      "tags": [
        "persona",
        "operations",
        "workshop",
        "kpi"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/front-desk-dashboard",
      "family": "dashboards",
      "name": "FrontDeskDashboard",
      "label": "Front desk dashboard",
      "description": "Reception view: keyboard-shortcut quick-action buttons, a bay-swimlane calendar day view, notification inbox, and an avatar/chip customer queue list.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/front-desk",
      "tags": [
        "persona",
        "reception",
        "queue",
        "calendar"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/parts-receiver-dashboard",
      "family": "dashboards",
      "name": "PartsReceiverDashboard",
      "label": "Parts receiver dashboard",
      "description": "Inbound-parts view: incoming-PO data table, supplier signal-strength rows, stock-vs-reorder bar chart, recent-receipts sparkline, and a forecast empty state.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/parts-receiver",
      "tags": [
        "persona",
        "inventory",
        "parts",
        "supply"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/customer-portal-dashboard",
      "family": "dashboards",
      "name": "CustomerPortalDashboard",
      "label": "Customer portal dashboard",
      "description": "Customer-facing view: active-job greeting card, vehicle profile cards, shipping-style job progress, pending quote stack, invoice history table, and helpful-articles feed.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/customer-portal",
      "tags": [
        "persona",
        "customer",
        "portal",
        "invoices"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/admin-org-dashboard",
      "family": "dashboards",
      "name": "AdminOrgDashboard",
      "label": "Admin org dashboard",
      "description": "Owner-level view: MRR/customers/jobs/NPS dashboard-card KPIs, connected-integrations grid, audit-log activity feed, notification-routing matrix, and a plan comparison table.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/admin-org",
      "tags": [
        "persona",
        "admin",
        "org",
        "integrations"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/mufflerpulse-editor-dashboard",
      "family": "dashboards",
      "name": "MufflerpulseEditorDashboard",
      "label": "Mufflerpulse editor dashboard",
      "description": "Social-content editor view: a daily publishing-slot strip, channel-chip composer panel, engagement radial meter, scheduled-queue data table, and a top-performing post spotlight.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/mufflerpulse-editor",
      "tags": [
        "persona",
        "social",
        "content",
        "scheduling"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/hermes-operator-dashboard",
      "family": "dashboards",
      "name": "HermesOperatorDashboard",
      "label": "Hermes operator dashboard",
      "description": "Campaign-ops cockpit: campaign kanban board, alerts notification inbox, reach-trend sparkline, channel-uptime gauge cluster, and operator alert-routing matrix.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/hermes-operator",
      "tags": [
        "persona",
        "campaigns",
        "ops",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/executive-overview-dashboard",
      "family": "dashboards",
      "name": "ExecutiveOverviewDashboard",
      "label": "Executive overview dashboard",
      "description": "Owner executive view: four big top-line stats, a 12-week revenue area chart, a workshop job-volume heatmap calendar, a leading-indicator metric block, and a pricing-tier ribbon.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/executive-overview",
      "tags": [
        "persona",
        "executive",
        "kpi",
        "trends"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/technician-mobile-dashboard",
      "family": "dashboards",
      "name": "TechnicianMobileDashboard",
      "label": "Technician mobile dashboard",
      "description": "Mobile-framed technician focus view inside a mobile shell (status bar, top app bar, bottom nav) showing the active job ticket, a materials checklist, and a handover link.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/technician-mobile",
      "tags": [
        "persona",
        "mobile",
        "technician",
        "job-ticket"
      ],
      "status": "captured"
    },
    {
      "key": "dashboards/marketing-performance-dashboard",
      "family": "dashboards",
      "name": "MarketingPerformanceDashboard",
      "label": "Marketing performance dashboard",
      "description": "Acquisition view: headline stat-counter row, 8-week impressions/clicks area chart, channel-mix donut, active-campaign data table with trend chips, and a platform logo cloud.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/dashboards",
      "routeHref": "/ui-primitives/dashboards/marketing-performance",
      "tags": [
        "persona",
        "marketing",
        "analytics",
        "campaigns"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
