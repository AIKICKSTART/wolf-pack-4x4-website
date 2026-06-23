import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "inventory",
  "title": "Inventory",
  "group": "Operations",
  "summary": "14 warehouse-management primitives for the Oak Flats Mufflermen stock system — SKU detail, stock-level meter, reorder/backorder chips, location grid, pick + receive + stock-take surfaces, variance reporting, analytics, multi-warehouse switching and low-stock alerting, composed from the shared design system.",
  "entries": [
    {
      "key": "inventory/sku-detail-card",
      "family": "inventory",
      "name": "SkuDetailCard",
      "label": "SKU detail card",
      "description": "Article card showing SKU thumbnail, supplier identity, lead-time and health chips, plus on-hand and average-cost metrics via DashboardCard.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/sku-detail-card",
      "tags": [
        "sku",
        "stock",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/stock-level-meter",
      "family": "inventory",
      "name": "StockLevelMeter",
      "label": "Stock level meter",
      "description": "Tone-shifting ProgressLinear meter with reorder/capacity health bands and live role=meter aria semantics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/stock-level-meter",
      "tags": [
        "stock",
        "meter",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/reorder-threshold-chip",
      "family": "inventory",
      "name": "ReorderThresholdChip",
      "label": "Reorder threshold chip",
      "description": "Reorder-point chip with a hover/focus QuoteBubble tooltip explaining the supplier lead-time-aware restock trigger.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/reorder-threshold-chip",
      "tags": [
        "reorder",
        "chip",
        "tooltip"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/supplier-link-card",
      "family": "inventory",
      "name": "SupplierLinkCard",
      "label": "Supplier link card",
      "description": "Supplier identity card with lead-time and on-time-delivery chips, last-PO DashboardCard, and an optional open-supplier link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/supplier-link-card",
      "tags": [
        "supplier",
        "card",
        "purchasing"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/warehouse-location-grid",
      "family": "inventory",
      "name": "WarehouseLocationGrid",
      "label": "Warehouse location grid",
      "description": "Region-semantic aisle-by-bay grid with density tone-coding, per-bin SKU counts and active-bin highlighting.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/warehouse-location-grid",
      "tags": [
        "warehouse",
        "grid",
        "location"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/bin-location-chip",
      "family": "inventory",
      "name": "BinLocationChip",
      "label": "Bin location chip",
      "description": "Compact aisle-bay-shelf bin chip with an optional click-to-find affordance into the warehouse grid.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/bin-location-chip",
      "tags": [
        "bin",
        "chip",
        "location"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/pick-list-row",
      "family": "inventory",
      "name": "PickListRow",
      "label": "Pick list row",
      "description": "Semantic table row rendering pick number, SKU, quantity, a bin-location chip and a pick-status chip for warehouse pick tables.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/pick-list-row",
      "tags": [
        "pick",
        "table-row",
        "fulfilment"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/receive-shipment-scanner",
      "family": "inventory",
      "name": "ReceiveShipmentScanner",
      "label": "Receive shipment scanner",
      "description": "Dock-receiving surface with a SKU scan input, per-line expected-vs-counted variance chips and a commit-receipt action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/receive-shipment-scanner",
      "tags": [
        "receiving",
        "scanner",
        "variance"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/stock-take-grid",
      "family": "inventory",
      "name": "StockTakeGrid",
      "label": "Stock take grid",
      "description": "DataTable-backed counting grid with editable counted-quantity inputs and live tone-coded variance chips per row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/stock-take-grid",
      "tags": [
        "stock-take",
        "audit",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/variance-report-row",
      "family": "inventory",
      "name": "VarianceReportRow",
      "label": "Variance report row",
      "description": "Aria-live status row showing expected vs actual counts with a tone-coded delta chip and a suggested-action chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/variance-report-row",
      "tags": [
        "variance",
        "audit",
        "report"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/inventory-analytics-tile",
      "family": "inventory",
      "name": "InventoryAnalyticsTile",
      "label": "Inventory analytics tile",
      "description": "KPI tile composing MetricBlock turnover/days-of-stock/carrying-cost figures with a Sparkline turnover-history trend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/inventory-analytics-tile",
      "tags": [
        "analytics",
        "kpi",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/multi-warehouse-switcher",
      "family": "inventory",
      "name": "MultiWarehouseSwitcher",
      "label": "Multi-warehouse switcher",
      "description": "Labelled select that switches between warehouses and shows the active warehouse's total-SKUs chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/multi-warehouse-switcher",
      "tags": [
        "warehouse",
        "switcher",
        "select"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/low-stock-alert-banner",
      "family": "inventory",
      "name": "LowStockAlertBanner",
      "label": "Low stock alert banner",
      "description": "Alert banner composing StickyCtaBar with a below-reorder count, review/raise-PO CTAs and a suppress-for-N-hours toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/low-stock-alert-banner",
      "tags": [
        "alert",
        "low-stock",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "inventory/backorder-preorder-chip",
      "family": "inventory",
      "name": "BackorderPreorderChip",
      "label": "Backorder / pre-order chip",
      "description": "Compact chip group showing the unfulfilled kind (backorder/pre-order/drop-ship), ETA, and customer-impact count.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inventory",
      "routeHref": "/ui-primitives/inventory/backorder-preorder-chip",
      "tags": [
        "backorder",
        "preorder",
        "chip"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
