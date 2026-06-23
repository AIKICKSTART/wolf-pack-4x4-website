/**
 * Shared inventory-deep primitive types.
 *
 * These extend the shallow inventory pack into warehouse-operations
 * territory: stocktake sessions, bin maps, transfers, reorder maths,
 * batch tracing, ABC analysis, slow movers, supplier scorecards, etc.
 *
 * Kept intentionally pure — only discriminated unions and value
 * objects, no rendering concerns.
 */

import type {
  StockHealth,
  InventoryTone,
  WarehouseId,
} from "../inventory/inventory-types"

export type { StockHealth, InventoryTone, WarehouseId }

/** Lifecycle states of a live cycle-count / stocktake session. */
export type StocktakeStatus =
  | "scheduled"
  | "active"
  | "paused"
  | "review"
  | "closed"

/** Bin co-ordinate within a warehouse — bay × row × column. */
export interface BinCoord {
  /** Bay letter, A–G. */
  bay: string
  /** Row number, 1–12. */
  row: number
  /** Column number, 1–4. Optional for legacy bays. */
  column?: number
}

/** Single cell in the bin map grid. */
export interface BinCell {
  /** Stable cell id, e.g. "A1-3". */
  id: string
  /** Bay/row/column co-ordinate. */
  coord: BinCoord
  /** Capacity fill percent, 0-100. */
  fillPercent: number
  /** Number of distinct SKUs in this cell. */
  skuCount: number
  /** Optional headline SKU/part inside the bin. */
  primarySku?: string
  /** Indicates the bin is empty / reserved / blocked. */
  state: "empty" | "active" | "reserved" | "blocked"
}

/** Inter-bay transfer lifecycle. */
export type TransferStatus =
  | "draft"
  | "in-transit"
  | "received"
  | "signed"
  | "cancelled"

/** Batch-tracking lifecycle. */
export type BatchStatus = "in-stock" | "near-expiry" | "expired" | "quarantine"

/** ABC analysis class. */
export type AbcClass = "A" | "B" | "C"

/** Cycle-count row variance verdict. */
export type CycleVariance = "match" | "minor" | "major"

/** Slow-mover disposition. */
export type SlowMoverAction =
  | "discount"
  | "return-to-supplier"
  | "write-off"
  | "transfer"

/** Obsolete-stock disposition. */
export type ObsoleteAction =
  | "scrap"
  | "auction"
  | "donate"
  | "return-supplier"

/** Stock movement direction. */
export type MovementKind =
  | "receipt"
  | "pick"
  | "transfer-in"
  | "transfer-out"
  | "adjustment"
  | "write-off"

/** Purchase order line lifecycle. */
export type PoLineStatus =
  | "open"
  | "partial"
  | "received"
  | "back-ordered"
  | "cancelled"

/** Pickwave lifecycle. */
export type PickwaveStatus =
  | "released"
  | "in-progress"
  | "verifying"
  | "complete"

/** Map a stocktake status to the chip tone vocabulary. */
export const STOCKTAKE_TONE: Record<StocktakeStatus, InventoryTone | "neutral"> = {
  scheduled: "neutral",
  active: "amber",
  paused: "teal",
  review: "green",
  closed: "green",
}

/** Map a transfer status to the chip tone vocabulary. */
export const TRANSFER_TONE: Record<TransferStatus, InventoryTone | "neutral"> = {
  draft: "neutral",
  "in-transit": "amber",
  received: "teal",
  signed: "green",
  cancelled: "red",
}
