/**
 * Block taxonomy for the builder.
 *
 * A `BlockKind` describes the level at which a block sits in the composition
 * tree, from a bare design token up to a whole page. This drives nesting rules
 * (which kinds may contain which), the palette grouping, and how the renderer
 * resolves a block to a component.
 */

/** The level a block sits at in the builder tree. */
export type BlockKind = "token" | "primitive" | "component" | "section" | "page"

/** Ordered, low → high — index doubles as containment depth. */
export const BLOCK_KIND_ORDER: readonly BlockKind[] = [
  "token",
  "primitive",
  "component",
  "section",
  "page",
] as const

/**
 * Default containment rule: a kind may nest any kind strictly below it in the
 * order. A block's own `allowedChildren` (kinds or specific block types) can
 * narrow or override this; `canContainKind` is the coarse fallback.
 */
export function canContainKind(parent: BlockKind, child: BlockKind): boolean {
  return BLOCK_KIND_ORDER.indexOf(parent) > BLOCK_KIND_ORDER.indexOf(child)
}

/** Type guard for untrusted (deserialised) input. */
export function isBlockKind(value: unknown): value is BlockKind {
  return typeof value === "string" && (BLOCK_KIND_ORDER as readonly string[]).includes(value)
}

/**
 * The top-level grouping a block belongs to in the palette/sidebar. Mirrors the
 * registry's `PrimitiveGroup` so the builder palette and the primitive registry
 * share one bucket vocabulary.
 */
export type BlockCategory =
  | "Foundations"
  | "Chrome"
  | "Content"
  | "Marketing"
  | "Commerce"
  | "Operations"
  | "Data"
  | "AI"
  | "Media"
  | "Auth"
  | "System"

export const BLOCK_CATEGORIES: readonly BlockCategory[] = [
  "Foundations",
  "Chrome",
  "Content",
  "Marketing",
  "Commerce",
  "Operations",
  "Data",
  "AI",
  "Media",
  "Auth",
  "System",
] as const

export function isBlockCategory(value: unknown): value is BlockCategory {
  return typeof value === "string" && (BLOCK_CATEGORIES as readonly string[]).includes(value)
}
