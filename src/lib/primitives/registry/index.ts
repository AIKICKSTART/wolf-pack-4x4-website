/**
 * Primitive registry — public aggregator.
 *
 * Composes every family manifest into flat, indexed views consumed by the CMS
 * page-builder palette, the primitives sidebar, and the schema-driven renderer.
 * Fragments are wired in via `fragments/index.ts` (orchestrator-owned).
 */

import { familyManifests } from "./fragments"
import type {
  PrimitiveEntry,
  PrimitiveFamilyManifest,
  PrimitiveGroup,
} from "./types"

export type {
  PrimitiveEntry,
  PrimitiveFamilyManifest,
  PrimitiveGroup,
  PrimitiveKind,
  PrimitiveStatus,
} from "./types"

/** All family manifests, as registered. */
export const families: readonly PrimitiveFamilyManifest[] = familyManifests

/** Every primitive across every family, flattened. */
export const allPrimitives: readonly PrimitiveEntry[] = familyManifests.flatMap(
  (family) => family.entries,
)

/** Primitives usable as CMS content blocks (keyed by `blockType`). */
export const cmsBlockPrimitives: readonly PrimitiveEntry[] = allPrimitives.filter(
  (entry): entry is PrimitiveEntry & { blockType: string } =>
    entry.kind === "block" && typeof entry.blockType === "string",
)

/** Lookup a primitive by its stable key. */
export function getPrimitiveByKey(key: string): PrimitiveEntry | undefined {
  return allPrimitives.find((entry) => entry.key === key)
}

/** All primitives in one family. */
export function getPrimitivesByFamily(family: string): readonly PrimitiveEntry[] {
  return allPrimitives.filter((entry) => entry.family === family)
}

/** Families bucketed by their top-level group, for sidebar/palette grouping. */
export function getFamiliesByGroup(): ReadonlyMap<PrimitiveGroup, PrimitiveFamilyManifest[]> {
  const map = new Map<PrimitiveGroup, PrimitiveFamilyManifest[]>()
  for (const family of familyManifests) {
    const bucket = map.get(family.group) ?? []
    bucket.push(family)
    map.set(family.group, bucket)
  }
  return map
}

/** Total counts — used by the catalogue header + capture progress. */
export function getRegistryStats(): {
  families: number
  primitives: number
  blocks: number
  improved: number
} {
  return {
    families: familyManifests.length,
    primitives: allPrimitives.length,
    blocks: cmsBlockPrimitives.length,
    improved: allPrimitives.filter((entry) => entry.status === "improved").length,
  }
}
