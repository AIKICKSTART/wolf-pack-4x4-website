/**
 * Drag-and-drop CMS builder canvas — public barrel.
 *
 * A blank canvas + block palette + properties inspector with client-only state:
 * drag/drop + reorder, select, edit props, switch style profile (via
 * ThemeProvider) + light/dark + responsive preview, undo/redo, duplicate,
 * hide/show, delete-with-confirm, save-draft to localStorage, preview, JSON
 * export/import, and a GATED publish-request flow that never publishes directly.
 *
 * TOKEN-DRIVEN ONLY: every design value resolves to a central `--primitive-*`
 * token. No raw colour/size/space/radius/motion literals.
 */

export { BuilderCanvas } from "./builder-canvas"
export { CanvasRoot } from "./canvas-root"
export { BlockPalette } from "./block-palette"
export { CanvasSurface } from "./canvas-surface"
export { Inspector } from "./inspector"
export { Toolbar } from "./toolbar"
export { ConfirmDialog } from "./confirm-dialog"
export { PreviewFrame } from "./preview-frame"
export { BlockRender } from "./block-render"
export { DEMO_MANIFESTS } from "./demo-manifests"

export { useBuilder, createStarterPage, type UseBuilderResult } from "./use-builder"
export {
  insertBlock,
  moveBlock,
  updateBlockProp,
  renameBlock,
  toggleHidden,
  duplicateBlock,
  deleteBlock,
  applyStyleProfile,
  setStatus,
} from "./page-ops"
export { saveDraft, loadDraft, clearDraft } from "./storage"

export {
  PREVIEW_WIDTHS,
  PREVIEW_WIDTH_LABELS,
  type PreviewWidth,
  type PreviewScheme,
  type ConfirmRequest,
  type DragPayload,
  type CanvasRow,
} from "./types"
