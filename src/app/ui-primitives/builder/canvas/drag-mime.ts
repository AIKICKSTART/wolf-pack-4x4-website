/**
 * Custom MIME types for the canvas's native HTML5 drag-and-drop.
 *
 * Using distinct types lets the canvas tell a palette drag (insert a new block)
 * apart from a canvas drag (reorder an existing block) on `dragover`/`drop`
 * without reading `dataTransfer` payloads, which browsers hide during dragover.
 */

/** Set when dragging a manifest from the palette; value is the manifest type. */
export const PALETTE_DRAG_MIME = "application/x-mufflermen-palette"

/** Set when dragging an existing canvas block; value is the block id. */
export const CANVAS_DRAG_MIME = "application/x-mufflermen-block"
