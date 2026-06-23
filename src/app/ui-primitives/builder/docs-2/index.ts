/**
 * Component documentation manifests — `docs-2` barrel.
 *
 * BlockManifest-shaped documentation for six primitive families: ai, overlays,
 * navigation (the chrome shell), states, account, and commerce. Each manifest is
 * a typed `ComponentDocFamily` (an array of `ComponentDocEntry`) derived
 * READ-ONLY from the live component families.
 *
 * TOKEN-DRIVEN ONLY: every design value is referenced as a central
 * `--primitive-*` token name via the builder model's `TokenDependency`; no
 * literal color/size/space/radius/motion values appear in these manifests.
 */

import accountDocs from "./account.docs"
import aiDocs from "./ai.docs"
import commerceDocs from "./commerce.docs"
import navigationDocs from "./navigation.docs"
import overlaysDocs from "./overlays.docs"
import statesDocs from "./states.docs"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

// — Doc types ——————————————————————————————————————————————
export type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocAgentInstructions,
  DocCmsCompatibility,
  DocResponsiveNotes,
  DocUsageExample,
} from "./types"

// — Per-family manifests ——————————————————————————————————
export { default as aiDocs } from "./ai.docs"
export { default as overlaysDocs } from "./overlays.docs"
export { default as navigationDocs } from "./navigation.docs"
export { default as statesDocs } from "./states.docs"
export { default as accountDocs } from "./account.docs"
export { default as commerceDocs } from "./commerce.docs"

/** Every documented family, in display order. */
export const DOC_FAMILIES: readonly ComponentDocFamily[] = [
  aiDocs,
  overlaysDocs,
  navigationDocs,
  statesDocs,
  accountDocs,
  commerceDocs,
]

/** A flat list of every documented entry across all families. */
export const ALL_DOC_ENTRIES: readonly ComponentDocEntry[] = DOC_FAMILIES.flatMap(
  (family) => family.entries,
)

/** Look up a family manifest by its slug. */
export function findDocFamily(family: string): ComponentDocFamily | undefined {
  return DOC_FAMILIES.find((entry) => entry.family === family)
}

/** Look up a single doc entry by its stable `key` (e.g. "ai/chat-thread"). */
export function findDocEntry(key: string): ComponentDocEntry | undefined {
  return ALL_DOC_ENTRIES.find((entry) => entry.key === key)
}
