import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "cloud-costs",
  "title": "Cloud costs",
  "group": "Operations",
  "summary": "Fourteen Vantage / Cloudability-style FinOps primitives for AWS cloud spend (AUD, Sydney/Melbourne regions): spend overview, service donut, top resources, anomaly detection, budget alerts, commitment utilisation, tag allocation, rightsizing, idle resources, cost trend, chargeback, region heatmap, budget burndown and saving actions.",
  "entries": [
    {
      "key": "cloud-costs/cloud-cost-overview",
      "family": "cloud-costs",
      "name": "CloudCostOverview",
      "label": "Cloud cost overview",
      "description": "Month-to-date spend, end-of-period forecast and budget-used stat tiles with a progress meter and budget-vs-actual bar chart.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/overview",
      "tags": [
        "finops",
        "budget",
        "forecast",
        "dashboard"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/cost-by-service-donut",
      "family": "cloud-costs",
      "name": "CostByServiceDonut",
      "label": "Cost by service donut",
      "description": "Donut chart splitting spend across AWS services with a tone-coded per-service legend and top-service chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/service-donut",
      "tags": [
        "finops",
        "donut",
        "services",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/top-cost-resources-table",
      "family": "cloud-costs",
      "name": "TopCostResourcesTable",
      "label": "Top cost resources",
      "description": "DataTable of the most expensive resources with service, region, attribute chips and right-aligned spend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/top-resources",
      "tags": [
        "finops",
        "table",
        "resources",
        "spend"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/cost-anomaly-card",
      "family": "cloud-costs",
      "name": "CostAnomalyCard",
      "label": "Cost anomaly card",
      "description": "Spend-spike alert card with baseline-vs-spike metrics, sparkline trend, severity tone and investigate/acknowledge actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/anomaly",
      "tags": [
        "finops",
        "anomaly",
        "alert",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/budget-alert-banner",
      "family": "cloud-costs",
      "name": "BudgetAlertBanner",
      "label": "Budget alert banner",
      "description": "Budget exceeded/approaching/on-track alert banner with delta chip and segmented progress meter between actual and cap.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/budget-alert",
      "tags": [
        "finops",
        "budget",
        "alert",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/commitment-utilization",
      "family": "cloud-costs",
      "name": "CommitmentUtilization",
      "label": "Commitment utilisation",
      "description": "Reserved-instance / savings-plan utilisation card with a radial meter, committed/utilised/unused stats and savings vs on-demand.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/commitment",
      "tags": [
        "finops",
        "commitment",
        "radial-meter",
        "savings"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/tag-allocation-pie",
      "family": "cloud-costs",
      "name": "TagAllocationPie",
      "label": "Tag allocation pie",
      "description": "Donut allocating spend by a tag dimension (env/team/project) with a per-segment legend and untagged-spend chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/tag-allocation",
      "tags": [
        "finops",
        "allocation",
        "tags",
        "donut"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/rightsizing-recommendation",
      "family": "cloud-costs",
      "name": "RightsizingRecommendation",
      "label": "Rightsizing recommendation",
      "description": "Per-resource rightsizing card showing current vs suggested SKU, CPU/memory utilisation bars and monthly/annual AUD savings with apply/dismiss.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/rightsizing",
      "tags": [
        "finops",
        "rightsizing",
        "recommendation",
        "savings"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/unused-resource-row",
      "family": "cloud-costs",
      "name": "UnusedResourceRow",
      "label": "Unused resource row",
      "description": "Idle-resource row with idle-days indicator, monthly/annual cost and a suggested-action CTA (decommission/stop/snapshot) plus snooze.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/unused-resource",
      "tags": [
        "finops",
        "idle",
        "waste",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/cost-trend-area-chart",
      "family": "cloud-costs",
      "name": "CostTrendAreaChart",
      "label": "Cost trend area chart",
      "description": "Client component charting daily spend as an area chart with a 7/14/30/90d range radiogroup and optional forecast-band overlay.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/cost-trend",
      "tags": [
        "finops",
        "trend",
        "area-chart",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/chargeback-report",
      "family": "cloud-costs",
      "name": "ChargebackReport",
      "label": "Chargeback report",
      "description": "Per-team chargeback DataTable with team contact, allocation bar, trend sparkline and invoiced AUD spend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/chargeback",
      "tags": [
        "finops",
        "chargeback",
        "table",
        "allocation"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/region-cost-heatmap",
      "family": "cloud-costs",
      "name": "RegionCostHeatmap",
      "label": "Region cost heatmap",
      "description": "Stylised world-map plate with tone-coded spend dots per AWS region plus a ranked region spend legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/region-heatmap",
      "tags": [
        "finops",
        "region",
        "heatmap",
        "map"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/daily-budget-burndown",
      "family": "cloud-costs",
      "name": "DailyBudgetBurndown",
      "label": "Daily budget burndown",
      "description": "Burndown area chart comparing daily target vs cumulative actual spend with variance %, budget-left metric and state chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/burndown",
      "tags": [
        "finops",
        "burndown",
        "budget",
        "area-chart"
      ],
      "status": "captured"
    },
    {
      "key": "cloud-costs/cost-saving-action-card",
      "family": "cloud-costs",
      "name": "CostSavingActionCard",
      "label": "Cost saving action card",
      "description": "Magnetic-hover saving recommendation card with category/effort/status chips, a savings ribbon, monthly/annual facts and implement/snooze CTAs.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/cloud-costs",
      "routeHref": "/ui-primitives/cloud-costs/saving-action",
      "tags": [
        "finops",
        "savings",
        "recommendation",
        "action"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
