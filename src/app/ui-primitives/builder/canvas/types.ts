/**
 * Canvas-local types: preview viewport, light/dark preview scheme, drag intent,
 * and the publish-gate dialog state. These never persist design literals — the
 * viewport widths below are layout constraints for the preview frame, not design
 * tokens, and are explicitly allowlisted by the tokenization contract
 * (`100%`/`vw` sizing + numeric layout widths are not design hardcodes).
 */

import type { Block } from "../model"

/** Preview viewport presets, mapped to a representative device width. */
export type PreviewWidth = "mobile" | "tablet" | "desktop" | "full"

/** Pixel widths for the preview frame (layout constraint, not a design token). */
export const PREVIEW_WIDTHS: Readonly<Record<PreviewWidth, number | null>> = {
  mobile: 390,
  tablet: 834,
  desktop: 1280,
  full: null,
}

/** Human labels for the preview viewport control. */
export const PREVIEW_WIDTH_LABELS: Readonly<Record<PreviewWidth, string>> = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
  full: "Fluid",
}

/** Light/dark preview scheme, independent of the persisted style profile. */
export type PreviewScheme = "light" | "dark"

/**
 * A pending drag from the palette: the manifest type being dragged. Stored on
 * state so a keyboard "add" path and a pointer drop path share one code path.
 */
export interface PaletteDragPayload {
  source: "palette"
  manifestType: string
}

/** A drag of an existing canvas block, identified by id. */
export interface CanvasDragPayload {
  source: "canvas"
  blockId: string
}

export type DragPayload = PaletteDragPayload | CanvasDragPayload

/** A confirm dialog request the canvas raises (delete / publish). */
export interface ConfirmRequest {
  kind: "delete" | "publish"
  blockId?: string
}

/** A flat, display-ready view of a root block for the canvas + layers list. */
export interface CanvasRow {
  block: Block
  index: number
}
