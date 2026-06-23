/**
 * Shared types for the whiteboard / collaborative canvas primitive group.
 *
 * FigJam / Miro style — distinct from `comments/sticky-note` (collaborative
 * inline review note) and `workflows/workflow-canvas` (node-graph executor).
 * Every component here speaks this vocabulary so the canvas, tool palette,
 * sticky notes, frames, connectors, and presence layer stay in sync.
 */

/** Drawing tool kinds shown on the left tool palette. */
export type DrawingToolKind =
  | "pen"
  | "highlighter"
  | "eraser"
  | "shape"
  | "sticky"
  | "text"
  | "connector"
  | "hand"

/** Connector line shape — straight / orthogonal / curved. */
export type ConnectorShape = "straight" | "orthogonal" | "curved"

/** Connector endpoint cap. */
export type ConnectorCap = "none" | "arrow" | "dot" | "diamond"

/** Shape picker primitive kinds. */
export type ShapeKind =
  | "rectangle"
  | "ellipse"
  | "triangle"
  | "hexagon"
  | "arrow"
  | "star"

/** Sticky note tone — paper colour for whiteboard stickies. */
export type StickyTone = "yellow" | "pink" | "blue" | "green" | "purple" | "orange"

/** Mind map node tone — depth driven. */
export type MindMapTone = "root" | "branch" | "leaf" | "accent"

/** Hand-drawn arrow wobble style. */
export type HandDrawnStyle = "loose" | "scratchy" | "marker"

/** Cursor presence state. */
export type CursorState = "active" | "idle"

/** A 2D point on the canvas in canvas coordinates. */
export interface CanvasPoint {
  x: number
  y: number
}

/** A pen stroke point — supports optional pressure 0..1. */
export interface PenStrokePoint extends CanvasPoint {
  /** Pressure 0..1 — drives stroke-width variation. */
  pressure?: number
}

/** A collaborator on the whiteboard. */
export interface Collaborator {
  /** Stable id. */
  id: string
  /** Display name. */
  name: string
  /** Two-letter initials for the cursor chip. */
  initials: string
  /** Tone — drives cursor + sticky author chip colour. */
  tone: StickyTone
}

/** Format a numeric zoom level as "125%". */
export function zoomLabel(level: number): string {
  return `${Math.round(level * 100)}%`
}

/** Format a canvas position as "x: 1024 · y: -384". */
export function positionLabel(point: CanvasPoint): string {
  const x = Math.round(point.x)
  const y = Math.round(point.y)
  return `x: ${x} · y: ${y}`
}
