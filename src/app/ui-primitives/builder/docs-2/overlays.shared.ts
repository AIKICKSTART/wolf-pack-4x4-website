/**
 * Shared doc constants for the `overlays` family.
 *
 * Nearly every overlay shares the same backdrop-scrim + focus-ring token pair,
 * declared once here and reused across the `overlays` entry files. Re-exports the
 * doc-entry type for a single import site.
 */

import type { TokenDependency } from "../model"
import type { ComponentDocEntry } from "./types"

export type { ComponentDocEntry }

/** Module the overlays family is re-exported from. */
export const OVERLAYS_PATH = "@/app/ui-primitives/components/overlays"

/** Backdrop scrim + focus-ring tokens shared by overlay surfaces. */
export const SCRIM_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-overlay", category: "color", usage: "backdrop scrim" },
  { token: "--primitive-focus-ring", category: "color", usage: "visible focus ring" },
]
