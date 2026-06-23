/**
 * Showcase fixtures for the inventory primitive pack.
 *
 * These mimic real Oak Flats Mufflermen SKUs so the primitives demo
 * with the same vocabulary used downstream (Manta cat-backs, Pacemaker
 * extractors, 3in mandrel bends, etc).
 */

import type {
  ReceiveExpectedItem,
  ReceiveScannedItem,
  StockTakeLine,
  SupplierLinkCardProps,
  WarehouseAisle,
  WarehouseOption,
  PickListRowProps,
  VarianceReportRowProps,
  BackorderPreorderChipProps,
  SkuDetailCardProps,
} from "../components/inventory"

export const WAREHOUSE_OPTIONS: ReadonlyArray<WarehouseOption> = [
  { id: "oak-flats", name: "Oak Flats (HQ)", state: "NSW", totalSkus: 3420 },
  { id: "albion-park", name: "Albion Park", state: "NSW", totalSkus: 1180 },
  { id: "sydney", name: "Sydney Depot", state: "NSW", totalSkus: 2240 },
]

export const SKU_DETAIL: SkuDetailCardProps = {
  sku: "OF-MFR-001",
  title: "Manta 3in cat-back Hilux N80",
  supplier: "Manta Performance",
  stockOnHand: 6,
  averageCost: 1289,
  reorderPoint: 4,
  leadTimeDays: 10,
  health: "low",
  thumbPlaceholder: "MF1",
}

export const SUPPLIER_CARDS: ReadonlyArray<SupplierLinkCardProps> = [
  {
    supplier: "Manta Performance",
    tagline: "Catbacks · resonators · mufflers",
    lastPoDate: "21 May 2026",
    leadTimeDays: 10,
    onTimePercent: 94,
    outstandingPoCount: 3,
    href: "/ui-primitives/inventory/supplier-link-card",
  },
  {
    supplier: "Pacemaker Headers",
    tagline: "Extractors · headers · gaskets",
    lastPoDate: "14 May 2026",
    leadTimeDays: 18,
    onTimePercent: 81,
    outstandingPoCount: 2,
    href: "/ui-primitives/inventory/supplier-link-card",
  },
  {
    supplier: "XForce Australia",
    tagline: "Catback · turbo-back · resonator",
    lastPoDate: "07 May 2026",
    leadTimeDays: 26,
    onTimePercent: 68,
    outstandingPoCount: 5,
    href: "/ui-primitives/inventory/supplier-link-card",
  },
]

export const AISLES: ReadonlyArray<WarehouseAisle> = [
  {
    aisle: "A",
    zones: [
      { bin: "A1-B1", density: 12, skuCount: 4 },
      { bin: "A1-B2", density: 38, skuCount: 11 },
      { bin: "A2-B1", density: 72, skuCount: 18 },
      { bin: "A2-B2", density: 88, skuCount: 22 },
      { bin: "A3-B1", density: 58, skuCount: 14 },
      { bin: "A3-B2", density: 96, skuCount: 28 },
    ],
  },
  {
    aisle: "B",
    zones: [
      { bin: "B1-B1", density: 0, skuCount: 0 },
      { bin: "B1-B2", density: 22, skuCount: 6 },
      { bin: "B2-B1", density: 64, skuCount: 16 },
      { bin: "B2-B2", density: 80, skuCount: 20 },
      { bin: "B3-B1", density: 32, skuCount: 9 },
      { bin: "B3-B2", density: 18, skuCount: 5 },
    ],
  },
  {
    aisle: "C",
    zones: [
      { bin: "C1-B1", density: 44, skuCount: 12 },
      { bin: "C1-B2", density: 76, skuCount: 19 },
      { bin: "C2-B1", density: 92, skuCount: 24 },
      { bin: "C2-B2", density: 28, skuCount: 8 },
      { bin: "C3-B1", density: 8, skuCount: 2 },
      { bin: "C3-B2", density: 0, skuCount: 0 },
    ],
  },
]

export const PICK_ROWS: ReadonlyArray<PickListRowProps> = [
  {
    pickNumber: 1,
    sku: "OF-MFR-001",
    title: "Manta 3in cat-back Hilux N80",
    qty: 2,
    bin: { aisle: "A3", bay: "B2", shelf: "S4" },
    status: "picked",
  },
  {
    pickNumber: 2,
    sku: "OF-EXT-088",
    title: "Pacemaker extractors WRX VA",
    qty: 1,
    bin: { aisle: "C2", bay: "B1", shelf: "S2" },
    status: "picking",
  },
  {
    pickNumber: 3,
    sku: "OF-PIPE-022",
    title: "3in mandrel bend 90°",
    qty: 6,
    bin: { aisle: "B2", bay: "B2", shelf: "S1" },
    status: "queued",
  },
  {
    pickNumber: 4,
    sku: "OF-RES-045",
    title: "Manta resonator 14in straight-through",
    qty: 3,
    bin: { aisle: "A2", bay: "B2", shelf: "S3" },
    status: "shortfall",
  },
]

export const RECEIVE_EXPECTED: ReadonlyArray<ReceiveExpectedItem> = [
  { sku: "OF-MFR-001", title: "Manta 3in cat-back Hilux N80", expectedQty: 6 },
  { sku: "OF-RES-045", title: "Manta resonator 14in", expectedQty: 8 },
  { sku: "OF-CLAMP-012", title: "T-bolt clamp 3in pack of 4", expectedQty: 20 },
]

export const RECEIVE_SCANNED: ReadonlyArray<ReceiveScannedItem> = [
  { sku: "OF-MFR-001", countedQty: 6 },
  { sku: "OF-RES-045", countedQty: 7 },
  { sku: "OF-CLAMP-012", countedQty: 22 },
]

export const STOCK_TAKE: ReadonlyArray<StockTakeLine> = [
  { sku: "OF-MFR-001", title: "Manta 3in cat-back Hilux N80", expectedQty: 6 },
  { sku: "OF-EXT-088", title: "Pacemaker extractors WRX VA", expectedQty: 4 },
  { sku: "OF-PIPE-022", title: "3in mandrel bend 90°", expectedQty: 38 },
  { sku: "OF-RES-045", title: "Manta resonator 14in straight-through", expectedQty: 12 },
  { sku: "OF-CLAMP-012", title: "T-bolt clamp 3in pack of 4", expectedQty: 64 },
]

export const STOCK_TAKE_INITIAL: Record<string, number> = {
  "OF-MFR-001": 6,
  "OF-EXT-088": 3,
  "OF-PIPE-022": 38,
  "OF-RES-045": 10,
  "OF-CLAMP-012": 66,
}

export const VARIANCE_ROWS: ReadonlyArray<VarianceReportRowProps> = [
  {
    sku: "OF-EXT-088",
    title: "Pacemaker extractors WRX VA",
    expectedQty: 4,
    actualQty: 3,
    suggestedAction: "verify-pick",
  },
  {
    sku: "OF-RES-045",
    title: "Manta resonator 14in straight-through",
    expectedQty: 12,
    actualQty: 10,
    suggestedAction: "investigate-receipt",
  },
  {
    sku: "OF-CLAMP-012",
    title: "T-bolt clamp 3in pack of 4",
    expectedQty: 64,
    actualQty: 66,
    suggestedAction: "absorb-positive",
  },
  {
    sku: "OF-PIPE-022",
    title: "3in mandrel bend 90°",
    expectedQty: 38,
    actualQty: 31,
    suggestedAction: "raise-write-off",
  },
]

export const BACKORDER_CHIPS: ReadonlyArray<BackorderPreorderChipProps> = [
  { kind: "backorder", eta: "12 Jun", customerImpact: 6 },
  { kind: "preorder", eta: "Wk 24", customerImpact: 3 },
  { kind: "drop-ship", eta: "29 May", customerImpact: 1 },
]

export const TURNOVER_TREND: ReadonlyArray<number> = [
  4.2, 4.6, 5.1, 5.4, 5.9, 6.1, 6.0, 6.3, 6.5, 6.4, 6.6, 6.4,
]
