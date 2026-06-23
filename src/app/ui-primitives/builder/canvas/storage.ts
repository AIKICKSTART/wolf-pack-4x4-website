/**
 * localStorage draft persistence for the builder canvas (client-only).
 *
 * Drafts are serialised PageConfig JSON via the model's own serialize helpers,
 * so a round-trip through disk is validated on read. All access is guarded for
 * SSR (no `window`) and wrapped so a quota / privacy-mode failure degrades
 * gracefully rather than throwing into render.
 */

import {
  deserializePageConfig,
  serializePageConfig,
  type PageConfig,
} from "../model"

const DRAFT_KEY = "mufflermen.builder.canvas.draft"

/** Persist a page as the working draft. Returns whether it was written. */
export function saveDraft(page: PageConfig): boolean {
  if (typeof window === "undefined") return false
  try {
    window.localStorage.setItem(DRAFT_KEY, serializePageConfig(page, true))
    return true
  } catch {
    return false
  }
}

/** Load the working draft, if any and valid. */
export function loadDraft(): PageConfig | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const result = deserializePageConfig(raw)
    return result.ok ? result.page : null
  } catch {
    return null
  }
}

/** Remove the working draft. */
export function clearDraft(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(DRAFT_KEY)
  } catch {
    // ignore — nothing actionable for the owner here
  }
}
