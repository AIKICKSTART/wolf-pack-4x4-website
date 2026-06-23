/**
 * Component documentation manifest — `overlays` family.
 *
 * Modal, sheet, popover, toast, and lightbox primitives that render above the
 * page: dialogs (basic / confirm / alert), side + bottom + top sheets, a full
 * takeover, image/video lightboxes, a wizard modal, a command palette, a rich
 * popover, a toast tray, a loading overlay, and a confetti modal. Sourced
 * READ-ONLY from `src/app/ui-primitives/components/overlays`.
 *
 * Entries live in `overlays.entries-a.ts` / `overlays.entries-b.ts` (split for
 * the 800-line cap); this file composes them. Every design value is referenced
 * as a central `--primitive-*` token name.
 */

import { OVERLAYS_ENTRIES_A } from "./overlays.entries-a"
import { OVERLAYS_ENTRIES_B } from "./overlays.entries-b"
import { OVERLAYS_PATH } from "./overlays.shared"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

const entries: readonly ComponentDocEntry[] = [
  ...OVERLAYS_ENTRIES_A,
  ...OVERLAYS_ENTRIES_B,
]

const overlaysDocs: ComponentDocFamily = {
  family: "overlays",
  title: "Overlays",
  group: "System",
  summary:
    "Modal, sheet, popover, toast, and lightbox primitives that render above the page: dialogs, side/bottom/top sheets, full takeover, image/video lightboxes, wizard, command palette, rich popover, toast tray, loading overlay, and confetti modal.",
  importPath: OVERLAYS_PATH,
  entries,
}

export default overlaysDocs
