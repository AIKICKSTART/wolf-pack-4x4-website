/**
 * Shared inventory primitive types.
 *
 * Kept intentionally small — no business rules, only the discriminator
 * unions the rest of the inventory pack composes from.
 */

/** Health bucket the rest of the pack tone-codes from. */
export type StockHealth = "critical" | "low" | "healthy" | "overstocked"

/** Oak Flats Mufflermen warehouse identifiers. */
export type WarehouseId = "oak-flats" | "albion-park" | "sydney"

/** Pick list row lifecycle states. */
export type PickStatus = "queued" | "picking" | "picked" | "shortfall"

/** Reason a SKU is not currently fulfillable from stock. */
export type BackorderKind = "backorder" | "preorder" | "drop-ship"

/** Tone vocabulary shared with primitives/chip + progress-linear. */
export type InventoryTone = "red" | "amber" | "teal" | "green"
