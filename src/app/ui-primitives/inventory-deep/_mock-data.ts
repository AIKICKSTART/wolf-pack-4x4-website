/**
 * Showcase fixtures for the inventory-deep primitive pack.
 *
 * Realistic Oak Flats Mufflermen warehouse data — bins A1–G12,
 * MANTA / PACEMAKER / X-FORCE / GENIE parts, Brad and Jase on the
 * floor, Auto Performance Wholesale + Pacemaker NSW + Manta Direct
 * for suppliers.
 *
 * Fixture values are deliberately stable so the showcase routes stay
 * deterministic in screenshots and visual diffs.
 */

import type {
  AbcAnalysisBand,
  BatchTrackingRowProps,
  BinCell,
  CycleCountRowProps,
  ObsoleteStockCardProps,
  PickwaveCardProps,
  PurchaseOrderLineRowProps,
  ReorderPointCardProps,
  SafetyStockGaugeProps,
  SlowMoverCardProps,
  StockMovementEntry,
  StocktakeSessionCardProps,
  SupplierLeadTimeRowProps,
  TransferOrderRowProps,
} from "../components/inventory-deep"

export const BAYS = ["A", "B", "C", "D", "E", "F", "G"] as const
export const ROWS = 12

/** Stable showcase bin cells. Row × Bay coverage with realistic gaps. */
export const BIN_CELLS: ReadonlyArray<BinCell> = [
  // Bay A — Manta cat-backs
  { id: "A1", coord: { bay: "A", row: 1 }, fillPercent: 86, skuCount: 14, primarySku: "MAN-CB-25-FAL", state: "active" },
  { id: "A2", coord: { bay: "A", row: 2 }, fillPercent: 64, skuCount: 11, primarySku: "MAN-CB-30-HLX", state: "active" },
  { id: "A3", coord: { bay: "A", row: 3 }, fillPercent: 92, skuCount: 16, primarySku: "MAN-CB-30-RNG", state: "active" },
  { id: "A4", coord: { bay: "A", row: 4 }, fillPercent: 22, skuCount: 4, primarySku: "MAN-RES-14", state: "active" },
  { id: "A5", coord: { bay: "A", row: 5 }, fillPercent: 0, skuCount: 0, state: "empty" },
  { id: "A6", coord: { bay: "A", row: 6 }, fillPercent: 38, skuCount: 7, primarySku: "MAN-MUF-12", state: "active" },
  { id: "A7", coord: { bay: "A", row: 7 }, fillPercent: 70, skuCount: 9, primarySku: "MAN-TBE-3", state: "active" },
  { id: "A8", coord: { bay: "A", row: 8 }, fillPercent: 12, skuCount: 2, state: "active" },
  // Bay B — Pacemaker extractors
  { id: "B1", coord: { bay: "B", row: 1 }, fillPercent: 48, skuCount: 8, primarySku: "PCM-EXT-3-RANGER", state: "active" },
  { id: "B2", coord: { bay: "B", row: 2 }, fillPercent: 76, skuCount: 12, primarySku: "PCM-EXT-3-WRX", state: "active" },
  { id: "B3", coord: { bay: "B", row: 3 }, fillPercent: 30, skuCount: 6, primarySku: "PCM-EXT-3-HLX", state: "active" },
  { id: "B4", coord: { bay: "B", row: 4 }, fillPercent: 0, skuCount: 0, state: "reserved" },
  { id: "B5", coord: { bay: "B", row: 5 }, fillPercent: 95, skuCount: 18, primarySku: "PCM-GSK-3", state: "active" },
  { id: "B6", coord: { bay: "B", row: 6 }, fillPercent: 0, skuCount: 0, state: "empty" },
  { id: "B7", coord: { bay: "B", row: 7 }, fillPercent: 42, skuCount: 6, primarySku: "PCM-HDR-3", state: "active" },
  // Bay C — X-Force turbo-back
  { id: "C1", coord: { bay: "C", row: 1 }, fillPercent: 88, skuCount: 14, primarySku: "XF-TB-3-FOC", state: "active" },
  { id: "C2", coord: { bay: "C", row: 2 }, fillPercent: 32, skuCount: 5, primarySku: "XF-CB-3-RNG", state: "active" },
  { id: "C3", coord: { bay: "C", row: 3 }, fillPercent: 64, skuCount: 11, primarySku: "XF-DP-3", state: "active" },
  { id: "C4", coord: { bay: "C", row: 4 }, fillPercent: 18, skuCount: 3, state: "active" },
  { id: "C5", coord: { bay: "C", row: 5 }, fillPercent: 0, skuCount: 0, state: "empty" },
  // Bay D — Mandrel bends + clamps
  { id: "D1", coord: { bay: "D", row: 1 }, fillPercent: 96, skuCount: 22, primarySku: "MB-3-90", state: "active" },
  { id: "D2", coord: { bay: "D", row: 2 }, fillPercent: 78, skuCount: 18, primarySku: "MB-3-45", state: "active" },
  { id: "D3", coord: { bay: "D", row: 3 }, fillPercent: 54, skuCount: 14, primarySku: "CLP-TB-3", state: "active" },
  { id: "D4", coord: { bay: "D", row: 4 }, fillPercent: 26, skuCount: 8, primarySku: "CLP-V-3", state: "active" },
  // Bay E — Genie controllers
  { id: "E1", coord: { bay: "E", row: 1 }, fillPercent: 38, skuCount: 6, primarySku: "GEN-BC-V3", state: "active" },
  { id: "E2", coord: { bay: "E", row: 2 }, fillPercent: 14, skuCount: 3, state: "active" },
  { id: "E3", coord: { bay: "E", row: 3 }, fillPercent: 0, skuCount: 0, state: "blocked" },
  { id: "E4", coord: { bay: "E", row: 4 }, fillPercent: 22, skuCount: 4, primarySku: "GEN-EBC", state: "active" },
  // Bay F — Lambda / EGT
  { id: "F1", coord: { bay: "F", row: 1 }, fillPercent: 56, skuCount: 9, primarySku: "LAM-4W-12", state: "active" },
  { id: "F2", coord: { bay: "F", row: 2 }, fillPercent: 70, skuCount: 11, primarySku: "EGT-K-1M", state: "active" },
  { id: "F3", coord: { bay: "F", row: 3 }, fillPercent: 24, skuCount: 5, primarySku: "EGT-PROBE", state: "active" },
  // Bay G — Bulk + dispatch
  { id: "G1", coord: { bay: "G", row: 1 }, fillPercent: 92, skuCount: 24, primarySku: "BULK-PIPE-3", state: "active" },
  { id: "G2", coord: { bay: "G", row: 2 }, fillPercent: 0, skuCount: 0, state: "reserved" },
  { id: "G3", coord: { bay: "G", row: 3 }, fillPercent: 84, skuCount: 19, primarySku: "BULK-PIPE-2.5", state: "active" },
  { id: "G4", coord: { bay: "G", row: 4 }, fillPercent: 12, skuCount: 2, state: "active" },
  { id: "G5", coord: { bay: "G", row: 5 }, fillPercent: 0, skuCount: 0, state: "empty" },
  { id: "G6", coord: { bay: "G", row: 6 }, fillPercent: 0, skuCount: 0, state: "empty" },
  { id: "G7", coord: { bay: "G", row: 7 }, fillPercent: 0, skuCount: 0, state: "empty" },
  { id: "G8", coord: { bay: "G", row: 8 }, fillPercent: 0, skuCount: 0, state: "blocked" },
]

export const STOCKTAKE_ACTIVE: StocktakeSessionCardProps = {
  sessionLabel: "Q2 2026 Cycle Count #047",
  status: "active",
  counted: 318,
  total: 540,
  auditor: "Jase Moretti",
  scope: "Bays A1 – G12",
  startedAt: "2026-05-29T07:30:00+10:00",
}

export const STOCKTAKE_SCHEDULED: StocktakeSessionCardProps = {
  sessionLabel: "Q2 2026 Cycle Count #048",
  status: "scheduled",
  counted: 0,
  total: 420,
  auditor: "Brad Sterling",
  scope: "Bays B1 – D4 (Pacemaker + bends)",
}

export const STOCKTAKE_REVIEW: StocktakeSessionCardProps = {
  sessionLabel: "Q1 2026 Cycle Count #046",
  status: "review",
  counted: 612,
  total: 612,
  auditor: "Jase Moretti",
  scope: "Bays A1 – G12",
  startedAt: "2026-04-12T07:30:00+10:00",
}

export const TRANSFERS: ReadonlyArray<TransferOrderRowProps> = [
  {
    transferRef: "TO-2026-0188",
    fromBin: "A3",
    toBin: "C2",
    sku: "MAN-CB-30-RNG",
    title: "Manta cat-back Ranger 3in",
    qty: 4,
    status: "in-transit",
    eta: "Today 14:30",
  },
  {
    transferRef: "TO-2026-0187",
    fromBin: "B2",
    toBin: "G3",
    sku: "PCM-EXT-3-WRX",
    title: "Pacemaker extractors WRX VA",
    qty: 2,
    status: "signed",
    eta: "Today 11:08",
    signedBy: "Brad Sterling",
  },
  {
    transferRef: "TO-2026-0186",
    fromBin: "D1",
    toBin: "A4",
    sku: "MB-3-90",
    title: "Mandrel bend 3in 90°",
    qty: 12,
    status: "received",
    eta: "Today 09:45",
  },
  {
    transferRef: "TO-2026-0189",
    fromBin: "G3",
    toBin: "G1",
    sku: "BULK-PIPE-2.5",
    title: "Mild steel pipe 2.5in 1.2m",
    qty: 20,
    status: "draft",
  },
]

export const REORDER_CARDS: ReadonlyArray<ReorderPointCardProps> = [
  {
    sku: "MAN-CB-25-FAL",
    title: "Manta 2.5in cat-back Falcon BA-BF",
    supplier: "Manta Direct",
    onHand: 3,
    reorderPoint: 5,
    eoq: 12,
    safetyStock: 2,
    leadTimeDays: 10,
    dailyDemand: 0.6,
  },
  {
    sku: "PCM-EXT-3-RANGER",
    title: "Pacemaker extractors Ranger PX 3in",
    supplier: "Pacemaker NSW",
    onHand: 6,
    reorderPoint: 4,
    eoq: 8,
    safetyStock: 2,
    leadTimeDays: 18,
    dailyDemand: 0.4,
  },
  {
    sku: "XF-TB-3-FOC",
    title: "X-Force turbo-back Focus XR5",
    supplier: "Auto Performance Wholesale",
    onHand: 14,
    reorderPoint: 4,
    eoq: 10,
    safetyStock: 3,
    leadTimeDays: 14,
    dailyDemand: 0.3,
  },
]

export const BATCHES: ReadonlyArray<BatchTrackingRowProps> = [
  {
    batchId: "B-2026-A104",
    sku: "PCM-GSK-3",
    title: "Pacemaker gasket kit 3in",
    qty: 18,
    manufactured: "12 Mar 2026",
    expiry: "12 Mar 2028",
    status: "in-stock",
    traceHref: "/ui-primitives/inventory-deep/batch-tracking-row",
  },
  {
    batchId: "B-2025-D041",
    sku: "GEN-BC-V3",
    title: "Genie boost controller v3",
    qty: 6,
    manufactured: "04 Dec 2025",
    expiry: "04 Jun 2026",
    status: "near-expiry",
    traceHref: "/ui-primitives/inventory-deep/batch-tracking-row",
  },
  {
    batchId: "B-2024-K012",
    sku: "LAM-4W-12",
    title: "4-wire lambda 1.2m loom",
    qty: 4,
    manufactured: "18 Oct 2024",
    expiry: "18 Apr 2026",
    status: "expired",
    traceHref: "/ui-primitives/inventory-deep/batch-tracking-row",
  },
  {
    batchId: "B-2026-Q009",
    sku: "MAN-MUF-12",
    title: "Manta straight-through muffler 12in",
    qty: 22,
    manufactured: "02 May 2026",
    status: "quarantine",
    traceHref: "/ui-primitives/inventory-deep/batch-tracking-row",
  },
]

export const ABC_BANDS: ReadonlyArray<AbcAnalysisBand> = [
  { klass: "A", skuCount: 142, skuShare: 0.18, revenue: 612_400, revenueShare: 0.72 },
  { klass: "B", skuCount: 218, skuShare: 0.28, revenue: 154_800, revenueShare: 0.19 },
  { klass: "C", skuCount: 426, skuShare: 0.54, revenue: 79_640, revenueShare: 0.09 },
]

export const CYCLE_COUNTS: ReadonlyArray<CycleCountRowProps> = [
  {
    sku: "MAN-CB-30-HLX",
    title: "Manta 3in cat-back Hilux N80",
    bin: "A2",
    expectedQty: 6,
    countedQty: 6,
    countedBy: "Jase",
  },
  {
    sku: "PCM-EXT-3-RANGER",
    title: "Pacemaker extractors Ranger PX",
    bin: "B1",
    expectedQty: 8,
    countedQty: 7,
    countedBy: "Jase",
  },
  {
    sku: "PCM-EXT-3-WRX",
    title: "Pacemaker extractors WRX VA",
    bin: "B2",
    expectedQty: 4,
    countedQty: 2,
    countedBy: "Brad",
  },
  {
    sku: "MB-3-90",
    title: "Mandrel bend 3in 90°",
    bin: "D1",
    expectedQty: 38,
    countedQty: 41,
    countedBy: "Brad",
  },
  {
    sku: "XF-CB-3-RNG",
    title: "X-Force cat-back Ranger PX",
    bin: "C2",
    expectedQty: 5,
    countedQty: 0,
    countedBy: "Jase",
  },
]

export const SLOW_MOVERS: ReadonlyArray<SlowMoverCardProps> = [
  {
    sku: "MAN-CB-FULL-4XP",
    title: "Manta 4× Pickup full-system kit 3in",
    onHand: 7,
    unitCost: 1845,
    daysSinceLastSale: 247,
    staleThresholdDays: 180,
    defaultAction: "discount",
  },
  {
    sku: "XF-CB-3-XR6T",
    title: "X-Force cat-back Falcon XR6T 3in",
    onHand: 3,
    unitCost: 1320,
    daysSinceLastSale: 198,
    staleThresholdDays: 180,
    defaultAction: "transfer",
  },
  {
    sku: "GEN-EBC",
    title: "Genie electronic boost controller (legacy)",
    onHand: 4,
    unitCost: 540,
    daysSinceLastSale: 312,
    staleThresholdDays: 180,
    defaultAction: "write-off",
  },
]

export const SAFETY_GAUGES: ReadonlyArray<SafetyStockGaugeProps> = [
  {
    sku: "MAN-CB-30-HLX",
    title: "Manta 3in cat-back Hilux N80",
    current: 6,
    safetyStock: 3,
    dailyDemand: 0.45,
  },
  {
    sku: "PCM-EXT-3-WRX",
    title: "Pacemaker extractors WRX VA",
    current: 1,
    safetyStock: 3,
    dailyDemand: 0.2,
  },
  {
    sku: "MB-3-90",
    title: "Mandrel bend 3in 90°",
    current: 38,
    safetyStock: 12,
    dailyDemand: 1.4,
  },
]

export const SUPPLIER_LEAD_ROWS: ReadonlyArray<SupplierLeadTimeRowProps> = [
  {
    supplier: "Auto Performance Wholesale",
    tagline: "Catbacks · turbo-backs · mandrel bends",
    quotedLeadDays: 10,
    actualLeadDays: 11,
    onTimePercent: 92,
    deliveries: 42,
    lateCount: 3,
  },
  {
    supplier: "Pacemaker NSW",
    tagline: "Headers · extractors · gaskets",
    quotedLeadDays: 14,
    actualLeadDays: 18,
    onTimePercent: 78,
    deliveries: 28,
    lateCount: 6,
  },
  {
    supplier: "Manta Direct",
    tagline: "Catbacks · mufflers · resonators",
    quotedLeadDays: 8,
    actualLeadDays: 7,
    onTimePercent: 96,
    deliveries: 51,
    lateCount: 2,
  },
  {
    supplier: "X-Force Australia",
    tagline: "Turbo-back · cat-back systems",
    quotedLeadDays: 21,
    actualLeadDays: 28,
    onTimePercent: 64,
    deliveries: 18,
    lateCount: 6,
  },
]

export const OBSOLETE_CARDS: ReadonlyArray<ObsoleteStockCardProps> = [
  {
    sku: "MAN-CB-3-VL-COM",
    title: "Manta cat-back VL Commodore 3in (legacy)",
    reason: "Discontinued by Manta — replaced by MAN-CB-3-VL-V2 in 2024. No current customers requesting.",
    qty: 11,
    bookValue: 9890,
    lastSale: "12 Aug 2024",
    defaultDisposition: "auction",
  },
  {
    sku: "GEN-EBC",
    title: "Genie electronic boost controller (legacy)",
    reason: "Superseded by GEN-BC-V3. Two warranty claims in last 12 months.",
    qty: 4,
    bookValue: 2160,
    lastSale: "03 Mar 2025",
    defaultDisposition: "return-supplier",
  },
]

export const MOVEMENTS: ReadonlyArray<StockMovementEntry> = [
  {
    id: "m-001",
    kind: "receipt",
    delta: 12,
    balanceAfter: 38,
    at: "2026-05-29T08:42:00+10:00",
    reference: "PO-2026-0481",
    actor: "Brad",
  },
  {
    id: "m-002",
    kind: "pick",
    delta: -3,
    balanceAfter: 26,
    at: "2026-05-29T07:55:00+10:00",
    reference: "Wave #012",
    actor: "Jase",
  },
  {
    id: "m-003",
    kind: "transfer-out",
    delta: -4,
    balanceAfter: 29,
    at: "2026-05-28T16:12:00+10:00",
    reference: "TO-2026-0188",
    actor: "Brad",
  },
  {
    id: "m-004",
    kind: "adjustment",
    delta: -1,
    balanceAfter: 33,
    at: "2026-05-28T14:02:00+10:00",
    reference: "Cycle #047",
    actor: "Jase",
  },
  {
    id: "m-005",
    kind: "transfer-in",
    delta: 8,
    balanceAfter: 34,
    at: "2026-05-28T11:25:00+10:00",
    reference: "TO-2026-0185",
    actor: "Brad",
  },
  {
    id: "m-006",
    kind: "write-off",
    delta: -2,
    balanceAfter: 26,
    at: "2026-05-27T15:40:00+10:00",
    reference: "WO-2026-019",
    actor: "Jase",
  },
]

export const PO_LINES: ReadonlyArray<PurchaseOrderLineRowProps> = [
  {
    sku: "MAN-CB-25-FAL",
    title: "Manta 2.5in cat-back Falcon BA-BF",
    qtyOrdered: 12,
    qtyReceived: 0,
    unitPrice: 1085.0,
    status: "open",
  },
  {
    sku: "MAN-CB-30-RNG",
    title: "Manta 3in cat-back Ranger PX",
    qtyOrdered: 8,
    qtyReceived: 5,
    unitPrice: 1289.0,
    status: "partial",
  },
  {
    sku: "PCM-EXT-3-RANGER",
    title: "Pacemaker extractors Ranger PX 3in",
    qtyOrdered: 4,
    qtyReceived: 4,
    unitPrice: 1245.5,
    status: "received",
  },
  {
    sku: "XF-TB-3-FOC",
    title: "X-Force turbo-back Focus XR5",
    qtyOrdered: 6,
    qtyReceived: 2,
    unitPrice: 1640.0,
    status: "back-ordered",
  },
]

export const PICKWAVES: ReadonlyArray<PickwaveCardProps> = [
  {
    sequence: 12,
    label: "Wave 12 · Hilux N80",
    picker: "Brad Sterling",
    tote: "TOTE-014",
    linesPicked: 4,
    totalLines: 9,
    status: "in-progress",
    zone: "Bays A1 – B3",
    releasedAt: "08:42",
  },
  {
    sequence: 13,
    label: "Wave 13 · Falcon XR6T",
    picker: "Jase Moretti",
    tote: "TOTE-021",
    linesPicked: 0,
    totalLines: 6,
    status: "released",
    zone: "Bays C1 – D2",
    releasedAt: "08:55",
  },
  {
    sequence: 11,
    label: "Wave 11 · Ranger PX",
    picker: "Brad Sterling",
    tote: "TOTE-007",
    linesPicked: 7,
    totalLines: 7,
    status: "verifying",
    zone: "Bays A3 – B1",
    releasedAt: "07:58",
  },
  {
    sequence: 10,
    label: "Wave 10 · Subaru WRX",
    picker: "Jase Moretti",
    tote: "TOTE-003",
    linesPicked: 5,
    totalLines: 5,
    status: "complete",
    zone: "Bays B2 – C1",
    releasedAt: "07:32",
  },
]
