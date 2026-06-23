import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "inventory-deep",
  "title": "Inventory deep",
  "group": "Operations",
  "summary": "14 warehouse inventory-management control surfaces — stocktake, bin map, transfers, reorder/safety-stock, batch & cycle-count, ABC, slow/obsolete disposition, supplier lead time, PO receiving, pickwaves, and a stock-movement ledger — built on shared chip/progress primitives.",
  "entries": [
    {
      "key": "inventory-deep/stocktake-session-card",
      "family": "inventory-deep",
      "name": "StocktakeSessionCard",
      "label": "Stocktake session card",
      "description": "Stocktake session card with status chip, radial counted-progress halo, and counted/total/remaining stats plus an elapsed footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/stocktake-session-card",
      "tags": [
        "inventory",
        "stocktake",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/bin-map-grid",
      "family": "inventory-deep",
      "name": "BinMapGrid",
      "label": "Bin map grid",
      "description": "Interactive warehouse bin map rendering bay/row cells colour-coded by fill density and state, with click-to-select and a density legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/bin-map-grid",
      "tags": [
        "inventory",
        "warehouse",
        "grid",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/transfer-order-row",
      "family": "inventory-deep",
      "name": "TransferOrderRow",
      "label": "Transfer order row",
      "description": "Inter-bin transfer order row showing ref/SKU, from→to bin flow, quantity, status chip, ETA, and signer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/transfer-order-row",
      "tags": [
        "inventory",
        "transfer",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/reorder-point-card",
      "family": "inventory-deep",
      "name": "ReorderPointCard",
      "label": "Reorder point card",
      "description": "Reorder-point card with a segmented on-hand meter and a metric grid (reorder point, EOQ, safety stock, lead time, days of cover) plus trigger-now chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/reorder-point-card",
      "tags": [
        "inventory",
        "replenishment",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/batch-tracking-row",
      "family": "inventory-deep",
      "name": "BatchTrackingRow",
      "label": "Batch tracking row",
      "description": "Lot/batch traceability row with manufacture and expiry dates, quantity, lifecycle status chip, and an optional trace-detail link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/batch-tracking-row",
      "tags": [
        "inventory",
        "batch",
        "traceability"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/abc-analysis-tile",
      "family": "inventory-deep",
      "name": "AbcAnalysisTile",
      "label": "ABC analysis tile",
      "description": "ABC inventory-classification tile listing A/B/C bands with revenue-share progress bars and SKU-count/revenue-share metrics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/abc-analysis-tile",
      "tags": [
        "inventory",
        "analysis",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/cycle-count-row",
      "family": "inventory-deep",
      "name": "CycleCountRow",
      "label": "Cycle count row",
      "description": "Cycle-count table row comparing expected vs counted qty, classifying the variance (match/minor/major) with accept and recount actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/cycle-count-row",
      "tags": [
        "inventory",
        "cycle-count",
        "variance",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/slow-mover-card",
      "family": "inventory-deep",
      "name": "SlowMoverCard",
      "label": "Slow mover card",
      "description": "Slow-mover card showing days-since-last-sale meter, tied-up capital, and disposition action buttons (discount, transfer, return, write-off).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/slow-mover-card",
      "tags": [
        "inventory",
        "slow-mover",
        "disposition"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/safety-stock-gauge",
      "family": "inventory-deep",
      "name": "SafetyStockGauge",
      "label": "Safety stock gauge",
      "description": "Safety-stock radial gauge comparing current units to the safety floor, with current/safety/days-of-cover stats and a burn-rate footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/safety-stock-gauge",
      "tags": [
        "inventory",
        "safety-stock",
        "gauge"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/supplier-lead-time-row",
      "family": "inventory-deep",
      "name": "SupplierLeadTimeRow",
      "label": "Supplier lead time row",
      "description": "Supplier lead-time row charting quoted vs actual lead days with a delta chip, on-time-percent chip, and delivery/late counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/supplier-lead-time-row",
      "tags": [
        "inventory",
        "supplier",
        "lead-time"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/obsolete-stock-card",
      "family": "inventory-deep",
      "name": "ObsoleteStockCard",
      "label": "Obsolete stock card",
      "description": "Obsolete-stock disposal card with reason, qty, book value and last sale, plus disposition buttons (scrap, auction, donate, return).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/obsolete-stock-card",
      "tags": [
        "inventory",
        "obsolete",
        "disposal"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/stock-movement-timeline",
      "family": "inventory-deep",
      "name": "StockMovementTimeline",
      "label": "Stock movement timeline",
      "description": "Newest-first ledger timeline of stock movements (receipt, pick, transfer, adjustment, write-off) with signed deltas, running balance, and references.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/stock-movement-timeline",
      "tags": [
        "inventory",
        "ledger",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/purchase-order-line-row",
      "family": "inventory-deep",
      "name": "PurchaseOrderLineRow",
      "label": "Purchase order line row",
      "description": "PO line row with ordered/received quantities, unit price and subtotal, status chip, receive-progress meter, and a receive action button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/purchase-order-line-row",
      "tags": [
        "inventory",
        "purchase-order",
        "receiving",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "inventory-deep/pickwave-card",
      "family": "inventory-deep",
      "name": "PickwaveCard",
      "label": "Pickwave card",
      "description": "Pickwave card with segmented lines-picked progress, picker/tote/lines metadata, status chip, and optional zone and release time.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inventory-deep",
      "routeHref": "/ui-primitives/inventory-deep/pickwave-card",
      "tags": [
        "inventory",
        "pickwave",
        "fulfilment"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
