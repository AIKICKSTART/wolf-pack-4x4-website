/**
 * Pure, immutable operations over a {@link PageConfig}'s root block list.
 *
 * The canvas builder edits only the top-level (root) block order in this
 * showcase — every block from the palette is a section/component leaf — so these
 * helpers operate on `page.blocks`. Each returns a NEW PageConfig (never
 * mutates), bumping `meta.updatedAt`, so the undo/redo history can snapshot
 * cleanly and React state stays referentially honest.
 */

import {
  createBlock,
  type Block,
  type BlockManifest,
  type PageConfig,
  type PropValue,
  type StyleProfile,
} from "../model"

/** Returns a NEW PageConfig with the given root blocks + a fresh updatedAt. */
function withBlocks(page: PageConfig, blocks: readonly Block[]): PageConfig {
  return {
    ...page,
    blocks,
    meta: { ...page.meta, updatedAt: new Date().toISOString() },
  }
}

/** Insert a freshly-instantiated block at `index` (clamped). */
export function insertBlock(
  page: PageConfig,
  manifest: BlockManifest,
  index: number,
): { page: PageConfig; blockId: string } {
  const block = createBlock(manifest)
  const at = Math.max(0, Math.min(index, page.blocks.length))
  const next = [...page.blocks.slice(0, at), block, ...page.blocks.slice(at)]
  return { page: withBlocks(page, next), blockId: block.id }
}

/** Move the block with `id` to a new index (clamped). No-op if absent. */
export function moveBlock(page: PageConfig, id: string, toIndex: number): PageConfig {
  const from = page.blocks.findIndex((b) => b.id === id)
  if (from === -1) return page
  const without = page.blocks.filter((b) => b.id !== id)
  const moved = page.blocks[from]
  const at = Math.max(0, Math.min(toIndex, without.length))
  const next = [...without.slice(0, at), moved, ...without.slice(at)]
  return withBlocks(page, next)
}

/** Replace one prop on a block, immutably. No-op if the block is absent. */
export function updateBlockProp(
  page: PageConfig,
  id: string,
  key: string,
  value: PropValue,
): PageConfig {
  let touched = false
  const next = page.blocks.map((b) => {
    if (b.id !== id) return b
    touched = true
    return { ...b, props: { ...b.props, [key]: value } }
  })
  return touched ? withBlocks(page, next) : page
}

/** Rename a block's display name. */
export function renameBlock(page: PageConfig, id: string, name: string): PageConfig {
  let touched = false
  const next = page.blocks.map((b) => {
    if (b.id !== id) return b
    touched = true
    return { ...b, name }
  })
  return touched ? withBlocks(page, next) : page
}

/** Toggle a block's hidden flag. */
export function toggleHidden(page: PageConfig, id: string): PageConfig {
  let touched = false
  const next = page.blocks.map((b) => {
    if (b.id !== id) return b
    touched = true
    return { ...b, hidden: !b.hidden }
  })
  return touched ? withBlocks(page, next) : page
}

/** Duplicate a block (fresh id + " copy" name) directly after the original. */
export function duplicateBlock(
  page: PageConfig,
  id: string,
): { page: PageConfig; blockId: string } | null {
  const index = page.blocks.findIndex((b) => b.id === id)
  if (index === -1) return null
  const original = page.blocks[index]
  const copy: Block = {
    ...original,
    id: `block_${Math.random().toString(36).slice(2, 10)}`,
    name: `${original.name} copy`,
    props: { ...original.props },
    children: [...original.children],
  }
  const next = [...page.blocks.slice(0, index + 1), copy, ...page.blocks.slice(index + 1)]
  return { page: withBlocks(page, next), blockId: copy.id }
}

/** Remove a block by id. */
export function deleteBlock(page: PageConfig, id: string): PageConfig {
  const next = page.blocks.filter((b) => b.id !== id)
  return next.length === page.blocks.length ? page : withBlocks(page, next)
}

/** Apply a new style profile to the page. */
export function applyStyleProfile(page: PageConfig, styleProfile: StyleProfile): PageConfig {
  return { ...page, styleProfile, meta: { ...page.meta, updatedAt: new Date().toISOString() } }
}

/** Set the page lifecycle status (used by the gated publish-request flow). */
export function setStatus(page: PageConfig, status: PageConfig["status"]): PageConfig {
  return { ...page, status, meta: { ...page.meta, updatedAt: new Date().toISOString() } }
}
