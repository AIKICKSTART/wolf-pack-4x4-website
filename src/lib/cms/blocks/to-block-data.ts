/**
 * Adapter: Payload native-block rows -> the block-editor `BlockData<T>` envelope.
 *
 * Payload stores each block in a `blocks` field as a flat row shaped
 * `{ id, blockType, blockName?, ...fields }`. The block-editor render
 * components consume `BlockData<T>` (`{ id, payload, version, updatedAt }`).
 * This mapper bridges the two without touching the components, so the same
 * primitives power both the showcase and the live CMS.
 */

import type { BlockData } from "@/app/ui-primitives/components/block-editor"

/**
 * A raw block row as Payload returns it inside a `blocks` field. Shaped
 * `{ id, blockType, blockName?, ...fields }`; typed loosely so it accepts the
 * `Record<string, unknown>` arrays the CMS layer hands over. The mapper narrows
 * `blockType`/`id` with `typeof` guards.
 */
export type PayloadBlockRow = Record<string, unknown>

/** A block resolved to its render type + envelope. */
export interface MappedBlock {
  type: string
  data: BlockData<unknown>
}

/** Stable fallback when the parent document has no `updatedAt`. */
const FALLBACK_UPDATED_AT = "1970-01-01T00:00:00.000Z"

/**
 * Map a list of Payload block rows to render-ready envelopes. Ids are derived
 * deterministically (row id, else positional) so server and client markup
 * match — no `Math.random`, no hydration drift. Rows without a `blockType`
 * map to `type: ""` and are skipped by the renderer.
 */
export function mapBlocks(
  rows: readonly PayloadBlockRow[] | null | undefined,
  parentUpdatedAt?: string | null,
): MappedBlock[] {
  if (!Array.isArray(rows)) {
    return []
  }

  const updatedAt = parentUpdatedAt ?? FALLBACK_UPDATED_AT

  return rows.map((row, index) => {
    const source = row ?? {}
    const type = typeof source.blockType === "string" ? source.blockType : ""

    // Shallow-copy the row and drop Payload's row-level meta, leaving the
    // block's own fields as the payload. Operates on a fresh object, never
    // the input.
    const payload: Record<string, unknown> = { ...source }
    delete payload.id
    delete payload.blockType
    delete payload.blockName

    return {
      type,
      data: {
        id: source.id != null ? String(source.id) : `blk-${index}`,
        payload,
        version: 1,
        updatedAt,
      },
    }
  })
}
