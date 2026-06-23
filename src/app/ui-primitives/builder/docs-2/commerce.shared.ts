/**
 * Shared doc constants for the `commerce` family.
 *
 * Commerce surfaces share an a11y baseline (focusable controls + tabular-nums on
 * figures), declared once here and reused across the `commerce` entry files.
 * Re-exports the doc-entry type for a single import site.
 */

import type { ComponentDocEntry, DocAccessibilityNotes } from "./types"

export type { ComponentDocEntry }

/** Module the commerce family is re-exported from. */
export const COMMERCE_PATH = "@/app/ui-primitives/components/commerce"

/** A11y baseline for static commerce surfaces. */
export const STATIC_A11Y: DocAccessibilityNotes = {
  requiresLabel: false,
  keyboard: ["Interactive controls are focusable", "Enter/Space activate them"],
  visibleFocus: true,
  respectsReducedMotion: true,
  notes: ["Money + quantity figures use tabular-nums."],
}
