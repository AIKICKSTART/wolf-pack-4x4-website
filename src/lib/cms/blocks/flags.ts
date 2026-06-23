/**
 * Block-CMS feature flag.
 *
 * Public-page block rendering is gated so the schema + migration can ship
 * (and apply on staging) ahead of exposing block layouts to visitors. Mirrors
 * the existing `NEXT_PUBLIC_PRIMITIVES_ROUTE_ENABLED` convention. Default off.
 */
export function isBlockCmsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_BLOCK_CMS_ENABLED === "1"
}

/** True when a CMS doc has a non-empty block layout to render. */
export function hasBlocks(blocks: ReadonlyArray<unknown> | null | undefined): boolean {
  return Array.isArray(blocks) && blocks.length > 0
}
