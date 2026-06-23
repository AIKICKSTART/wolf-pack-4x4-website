/**
 * Block — a concrete, instantiated node on a page.
 *
 * Where a `BlockManifest` is the template, a `Block` is one placement of it in a
 * page tree: it has a stable id, the manifest `type` it was built from, the
 * resolved props, an ordered list of child blocks, and any per-instance
 * responsive / token overrides. Blocks form the recursive tree a `PageConfig`
 * holds.
 */

import type { BlockCategory, BlockKind } from "./block-kind"
import type { ResponsiveRule } from "./rules"
import type { PropsRecord } from "./schema"
import type { PrimitiveTokenName } from "./tokens"

/** A per-instance token remap: read this token instead of the manifest default. */
export interface TokenOverride {
  /** The token slot the manifest declared. */
  slot: PrimitiveTokenName
  /** The token to substitute (must also be a central token). */
  to: PrimitiveTokenName
}

/** One instantiated block node in a page tree. */
export interface Block {
  /** Stable unique id within the page. */
  id: string
  /** The manifest `type` this block was built from. */
  type: string
  /** Display name (defaults to the manifest name; owner may rename). */
  name: string
  category: BlockCategory
  kind: BlockKind
  /** Manifest version the instance was created against. */
  version: string
  /** Resolved props (manifest defaults merged with owner edits). */
  props: PropsRecord
  /** Ordered child blocks. */
  children: readonly Block[]
  /** Per-instance responsive overrides layered over the manifest rules. */
  responsiveOverrides?: readonly ResponsiveRule[]
  /** Per-instance token remaps. Still token-driven — only swaps which token. */
  tokenOverrides?: readonly TokenOverride[]
  /** Whether the block is hidden on the page without deleting it. */
  hidden?: boolean
  /** Optional owner note pinned to the block. */
  note?: string
}

/** Walk a block tree depth-first, yielding every node. */
export function* walkBlocks(block: Block): Generator<Block> {
  yield block
  for (const child of block.children) {
    yield* walkBlocks(child)
  }
}

/** Find a block by id anywhere in a tree. */
export function findBlock(root: Block, id: string): Block | undefined {
  for (const node of walkBlocks(root)) {
    if (node.id === id) {
      return node
    }
  }
  return undefined
}

/** Total node count in a tree (inclusive of root). */
export function countBlocks(root: Block): number {
  return 1 + root.children.reduce((sum, child) => sum + countBlocks(child), 0)
}
