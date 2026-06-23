/**
 * Demo data for the Parts & inventory screen (Workshop Pro federation).
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) exhaust-parts fixtures —
 * real supplier brands (Pacemaker, Redback, Manta-style performance,
 * Genie/CSC tips), real categories (mufflers, cats, mandrel bends, clamps,
 * tailpipes), AUD pricing, stock levels, reorder points and lead times.
 *
 * All copy is production-ready language for the actual workshop's parts desk.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque".
 * The legacy internal codename is never surfaced in any string below.
 */

import type { StockHealth } from "../../components/inventory/inventory-types"
import type { WarehouseOption } from "../../components/inventory/multi-warehouse-switcher"

const PARTS_MEDIA = "/media/parts"

/** Business identity, reused across the screen chrome. */
export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"
export const STOCKTAKE_LABEL = "Live count · synced 6 min ago"

/** A supplier the workshop buys exhaust stock from. */
export interface PartSupplier {
  id: string
  name: string
  tagline: string
  lastPoDate: string
  leadTimeDays: number
  onTimePercent: number
  outstandingPoCount: number
}

/** A single catalogue line on the parts desk. */
export interface PartRow {
  id: string
  sku: string
  name: string
  category: PartCategory
  supplierId: string
  thumbSrc: string
  /** Units physically in the active store. */
  onHand: number
  /** Shelf / bin capacity ceiling for the meter. */
  capacity: number
  /** Reorder trigger point in units. */
  reorderPoint: number
  /** Sell price inc GST, AUD. */
  price: number
  /** Supplier lead time in days. */
  leadTimeDays: number
  /** Health bucket — drives the tone of the badge + meter. */
  health: StockHealth
  /** Bin location on the parts wall. */
  bin: string
}

export type PartCategory =
  | "Mufflers"
  | "Catalytic converters"
  | "Mandrel bends"
  | "Clamps & flanges"
  | "Tips & tailpipes"

/** Warehouses the parts desk can switch between. */
export const WAREHOUSES: ReadonlyArray<WarehouseOption> = [
  { id: "oak-flats", name: "Oak Flats parts wall (HQ)", totalSkus: 1284, state: "NSW" },
  { id: "albion-park", name: "Albion Park overflow store", totalSkus: 412, state: "NSW" },
  { id: "sydney", name: "Sydney supplier dropship", totalSkus: 9620, state: "NSW" },
]

/** Suppliers, keyed by id for fast lookup in the grid + rail. */
export const SUPPLIERS: ReadonlyArray<PartSupplier> = [
  {
    id: "pacemaker",
    name: "Pacemaker Headers",
    tagline: "Performance headers & cats · NSW dispatch",
    lastPoDate: "26 May 2026",
    leadTimeDays: 6,
    onTimePercent: 96,
    outstandingPoCount: 2,
  },
  {
    id: "redback",
    name: "Redback Performance",
    tagline: "Stainless mufflers & high-flow cats",
    lastPoDate: "24 May 2026",
    leadTimeDays: 9,
    onTimePercent: 92,
    outstandingPoCount: 1,
  },
  {
    id: "mpi",
    name: "Mufflers Pipes & Imports",
    tagline: "Mandrel bends, flanges & consumables",
    lastPoDate: "28 May 2026",
    leadTimeDays: 4,
    onTimePercent: 98,
    outstandingPoCount: 3,
  },
  {
    id: "csc",
    name: "Genie Custom Stacks",
    tagline: "Chrome tips & bullhorn stacks · made to order",
    lastPoDate: "12 May 2026",
    leadTimeDays: 21,
    onTimePercent: 81,
    outstandingPoCount: 1,
  },
]

/** Resolve a supplier name by id (safe — always returns a label). */
export function supplierName(id: string): string {
  return SUPPLIERS.find((supplier) => supplier.id === id)?.name ?? "Unknown supplier"
}

/** The searchable catalogue — real Mufflermen exhaust parts. */
export const PARTS: ReadonlyArray<PartRow> = [
  {
    id: "of-mfr-d814",
    sku: "D814MN-3",
    name: "Redback 3\" oval megaflow muffler — 8x5",
    category: "Mufflers",
    supplierId: "redback",
    thumbSrc: `${PARTS_MEDIA}/redback/d814mn-3-redback-muffler-8-x-5-oval-10-long-centre-centre-megaflow-no-spigots-1.webp`,
    onHand: 18,
    capacity: 40,
    reorderPoint: 12,
    price: 169.0,
    leadTimeDays: 9,
    health: "healthy",
    bin: "A3-04",
  },
  {
    id: "of-mfr-ct225",
    sku: "CT22524",
    name: "Redback 409 twin-outlet east-west muffler",
    category: "Mufflers",
    supplierId: "redback",
    thumbSrc: `${PARTS_MEDIA}/redback/ct22524-409-centre-inlet-muffler-2-25-12-x-4-twin-outlet-24-long-409-stainless-steel-east-west-muffler-1.webp`,
    onHand: 6,
    capacity: 24,
    reorderPoint: 8,
    price: 214.0,
    leadTimeDays: 9,
    health: "low",
    bin: "A3-09",
  },
  {
    id: "of-mfr-01026",
    sku: "01026M-409",
    name: "Pacemaker 6\" round megaflow — glass-packed 409SS",
    category: "Mufflers",
    supplierId: "pacemaker",
    thumbSrc: `${PARTS_MEDIA}/pacemaker/01026m-409-6-round-14-long-c-c-4-megaflow-409-ss-glass-packed-welded-style-1.webp`,
    onHand: 27,
    capacity: 30,
    reorderPoint: 10,
    price: 142.5,
    leadTimeDays: 6,
    health: "overstocked",
    bin: "A2-11",
  },
  {
    id: "of-cat-bc100",
    sku: "BC10063",
    name: "Pacemaker 100-cell bullet cat — 63mm Euro II",
    category: "Catalytic converters",
    supplierId: "pacemaker",
    thumbSrc: `${PARTS_MEDIA}/pacemaker/bc10063-100-cell-bullet-cats-polished-bullet-petrol-round-metallic-catalytic-converter-euro-ii-inlet-outlet-diameter-63mm-2-1-2-4-round-with-1.webp`,
    onHand: 3,
    capacity: 20,
    reorderPoint: 6,
    price: 289.0,
    leadTimeDays: 6,
    health: "critical",
    bin: "C1-02",
  },
  {
    id: "of-cat-c0t134",
    sku: "C0T134MTA",
    name: "Redback high-flow cat — 2.5\" 50-cell polished",
    category: "Catalytic converters",
    supplierId: "redback",
    thumbSrc: `${PARTS_MEDIA}/redback/c0t134mta-redback-high-flow-catalytic-converter-petrol-euro-ii-2-1-2-cpsi-50-polished-1.webp`,
    onHand: 9,
    capacity: 18,
    reorderPoint: 6,
    price: 318.0,
    leadTimeDays: 9,
    health: "healthy",
    bin: "C1-07",
  },
  {
    id: "of-cat-b0t132",
    sku: "B0T132",
    name: "Redback 2\" 50-cell stainless high-flow cat",
    category: "Catalytic converters",
    supplierId: "redback",
    thumbSrc: `${PARTS_MEDIA}/redback/b0t132-2-high-flow-catalytic-converter-50-cell-stainless-performance-1.webp`,
    onHand: 4,
    capacity: 16,
    reorderPoint: 6,
    price: 276.0,
    leadTimeDays: 9,
    health: "low",
    bin: "C1-11",
  },
  {
    id: "of-bnd-alb12590",
    sku: "ALB12590",
    name: "Aluminised mandrel bend — 1¼\" 90°",
    category: "Mandrel bends",
    supplierId: "mpi",
    thumbSrc: `${PARTS_MEDIA}/mpi/alb12590-1-1-4in-31-75mm-90deg-aluminised-mandrel-bend-1.webp`,
    onHand: 64,
    capacity: 80,
    reorderPoint: 24,
    price: 18.9,
    leadTimeDays: 4,
    health: "healthy",
    bin: "B4-01",
  },
  {
    id: "of-bnd-alb12545",
    sku: "ALB12545",
    name: "Aluminised mandrel bend — 1¼\" 45°",
    category: "Mandrel bends",
    supplierId: "mpi",
    thumbSrc: `${PARTS_MEDIA}/mpi/alb12545-1-1-4in-31-75mm-45deg-aluminised-mandrel-bend-1.webp`,
    onHand: 11,
    capacity: 80,
    reorderPoint: 24,
    price: 16.5,
    leadTimeDays: 4,
    health: "low",
    bin: "B4-02",
  },
  {
    id: "of-flg-aelf5000",
    sku: "AELF5000",
    name: "5\" lipped flange — aluminised, notched end",
    category: "Clamps & flanges",
    supplierId: "mpi",
    thumbSrc: `${PARTS_MEDIA}/mpi/aelf5000-127mm-5in-lipped-flange-20-aluminised-steel-expanded-and-notched-end-1.webp`,
    onHand: 0,
    capacity: 50,
    reorderPoint: 15,
    price: 9.4,
    leadTimeDays: 4,
    health: "critical",
    bin: "B2-08",
  },
  {
    id: "of-clp-c12p",
    sku: "C12P",
    name: "U-bolt clamp — 2⅝\" 63mm plated",
    category: "Clamps & flanges",
    supplierId: "pacemaker",
    thumbSrc: `${PARTS_MEDIA}/pacemaker/c12p-1-u-bolt-2-5-8-63mm-plated-1.webp`,
    onHand: 142,
    capacity: 200,
    reorderPoint: 50,
    price: 4.2,
    leadTimeDays: 6,
    health: "healthy",
    bin: "B1-03",
  },
  {
    id: "of-tip-2t901",
    sku: "2T901RMB",
    name: "Redback sports tailpipe — Torana 1974–78",
    category: "Tips & tailpipes",
    supplierId: "redback",
    thumbSrc: `${PARTS_MEDIA}/redback/2t901rmb-redback-sports-tailpipe-for-holden-torana-1974-1978-1.webp`,
    onHand: 2,
    capacity: 10,
    reorderPoint: 4,
    price: 96.0,
    leadTimeDays: 9,
    health: "critical",
    bin: "D2-05",
  },
  {
    id: "of-tip-10000",
    sku: "CSC-10000",
    name: "Bullhorn chrome stack — 8\"OD x 60\" curved",
    category: "Tips & tailpipes",
    supplierId: "csc",
    thumbSrc: `${PARTS_MEDIA}/csc/10000-bullhorn-curve-chrome-stacks-8-od-5-od-x-60-length-with-350c-reduced-traditional-setup-remote-1.webp`,
    onHand: 5,
    capacity: 8,
    reorderPoint: 2,
    price: 642.0,
    leadTimeDays: 21,
    health: "healthy",
    bin: "D4-01",
  },
]

/** Inventory KPI tile, shown in the command band. */
export interface PartsKpi {
  id: string
  label: string
  value: string
  unit?: string
  meta: string
  delta: { label: string; direction: "up" | "down" | "flat" }
}

/** Derived headline KPIs for the active store (Oak Flats parts wall). */
export const PARTS_KPIS: ReadonlyArray<PartsKpi> = [
  {
    id: "skus",
    label: "Active SKUs",
    value: "1,284",
    meta: "Across 5 categories",
    delta: { label: "+12 this wk", direction: "up" },
  },
  {
    id: "below-reorder",
    label: "Below reorder",
    value: "4",
    unit: "lines",
    meta: "Raise a PO to cover",
    delta: { label: "+2 since Mon", direction: "down" },
  },
  {
    id: "stock-value",
    label: "Stock on hand",
    value: "$86,420",
    unit: "ex GST",
    meta: "Landed cost, live",
    delta: { label: "Steady", direction: "flat" },
  },
  {
    id: "open-pos",
    label: "Open POs",
    value: "7",
    meta: "3 land this week",
    delta: { label: "On time", direction: "up" },
  },
]

/** Count of catalogue lines currently sitting below their reorder point. */
export const BELOW_REORDER_COUNT = PARTS.filter(
  (part) => part.onHand <= part.reorderPoint,
).length
