/** Shared types for the photo-editor primitives — Photoshop-lite for the
 * Mufflermen workshop photo intake (dyno run, Manta exhaust closeup, Bay 2). */

export type ToolId =
  | "select"
  | "crop"
  | "brush"
  | "eraser"
  | "text"
  | "shape"
  | "heal"
  | "clone"

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "color-dodge"

export type LayerKind = "image" | "adjustment" | "text" | "shape" | "mask" | "group"

export type CropRatioId = "freeform" | "1:1" | "4:5" | "16:9" | "9:16"

export type FilterPresetId =
  | "workshop"
  | "vintage"
  | "bw"
  | "high-contrast"
  | "sepia"

export type ExportFormat = "jpg" | "png" | "webp"

export type HistoryActionKind =
  | "open"
  | "crop"
  | "brush"
  | "levels"
  | "curves"
  | "filter"
  | "text"
  | "mask"
  | "transform"
  | "clone"
  | "export"

export type CursorMode = "default" | "crosshair" | "move" | "zoom" | "eyedrop"

/** Pixel size of the working canvas. */
export interface CanvasSize {
  widthPx: number
  heightPx: number
}

/** A single layer rendered inside the layers panel. */
export interface PhotoLayer {
  id: string
  name: string
  kind: LayerKind
  visible: boolean
  locked: boolean
  /** 0–1 opacity slider value. */
  opacity: number
  /** Blend-mode label used to drive the small chip. */
  blend: BlendMode
  /** Optional mask thumbnail preview. When omitted the mask column stays blank. */
  maskLabel?: string
  /** Indentation for nested groups — 0 = root. */
  depth?: number
}

/** Crop ratio entry surfaced in the crop-overlay picker. */
export interface CropRatio {
  id: CropRatioId
  label: string
  /** Ratio expressed as width / height. `null` for freeform. */
  ratio: number | null
}

/** A single histogram bucket — 256 buckets cover full 8-bit luma. */
export type HistogramBuckets = ReadonlyArray<number>

/** Curve anchor — t and v are both 0–1 (input → output). */
export interface CurveAnchor {
  t: number
  v: number
}

/** Filter preset thumbnail rendered in the grid. */
export interface FilterPreset {
  id: FilterPresetId
  label: string
  description: string
  /** CSS filter expression used to drive the thumbnail preview. */
  filterCss: string
}

/** Single history step rendered in the history panel. */
export interface HistoryStep {
  index: number
  action: HistoryActionKind
  label: string
  /** ISO-8601 or HH:mm:ss display string. */
  timestamp: string
}

/** Saved swatch shown inside the swatch library. */
export interface SwatchEntry {
  id: string
  hex: string
  name: string
}

/** Mask thumbnail row entry — one per layer. */
export interface MaskThumbnail {
  layerId: string
  layerName: string
  /** 0–1 density used to drive the small thumb gradient. */
  density: number
  /** Label like "Sky", "Hilux body", "Tailpipe". */
  region: string
  inverted?: boolean
}

/** Tool-palette entry. */
export interface PaletteTool {
  id: ToolId
  label: string
  glyph: string
  shortcut: string
  description: string
}

/** Brush state used by brush-settings. */
export interface BrushState {
  /** Diameter in px (1 – 480). */
  sizePx: number
  /** 0 – 1 hardness. */
  hardness: number
  /** 0 – 1 flow. */
  flow: number
  /** Hex colour for the brush tip. */
  hex: string
}

/** Levels black/mid/white anchor positions (all 0 – 1). */
export interface LevelsState {
  black: number
  mid: number
  white: number
}

/** A single text overlay being edited. */
export interface TextOverlayState {
  text: string
  fontFamily: string
  sizePx: number
  weight: number
  hex: string
  letterSpacing: number
}

/** Marquee selection rectangle in canvas pixels. */
export interface SelectionRect {
  xPx: number
  yPx: number
  widthPx: number
  heightPx: number
}

/** Export option state — driven by export-options-card. */
export interface ExportState {
  format: ExportFormat
  /** Quality 0 – 1; ignored for png. */
  quality: number
  /** Long-edge in pixels. */
  longEdgePx: number
}

/** Before/after slider source. */
export interface BeforeAfterSource {
  beforeLabel: string
  afterLabel: string
  /** 0 – 1 divider position. */
  splitT: number
}

/** Helper — clamp a value into [0,1]. Exported for reuse in the demo pages. */
export function clamp01(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 1) return 1
  return value
}

/** Helper — format a 0–1 number as a percentage string with no decimal. */
export function formatPct(value: number): string {
  return `${Math.round(clamp01(value) * 100)}%`
}

export const CROP_RATIOS: ReadonlyArray<CropRatio> = [
  { id: "freeform", label: "Freeform", ratio: null },
  { id: "1:1", label: "1:1 · Square", ratio: 1 },
  { id: "4:5", label: "4:5 · Portrait", ratio: 4 / 5 },
  { id: "16:9", label: "16:9 · Wide", ratio: 16 / 9 },
  { id: "9:16", label: "9:16 · Story", ratio: 9 / 16 },
]

export const PALETTE_TOOLS: ReadonlyArray<PaletteTool> = [
  { id: "select", label: "Select", glyph: "▭", shortcut: "V", description: "Marquee / Move" },
  { id: "crop", label: "Crop", glyph: "⌖", shortcut: "C", description: "Crop + ratio" },
  { id: "brush", label: "Brush", glyph: "✎", shortcut: "B", description: "Paint with brush" },
  { id: "eraser", label: "Eraser", glyph: "▱", shortcut: "E", description: "Erase pixels" },
  { id: "text", label: "Text", glyph: "T", shortcut: "T", description: "Type tool" },
  { id: "shape", label: "Shape", glyph: "▰", shortcut: "U", description: "Shape draw" },
  { id: "heal", label: "Heal", glyph: "✦", shortcut: "J", description: "Spot heal" },
  { id: "clone", label: "Clone", glyph: "◎", shortcut: "S", description: "Clone stamp" },
]

export const FILTER_PRESETS: ReadonlyArray<FilterPreset> = [
  {
    id: "workshop",
    label: "Workshop",
    description: "Cool steel + warm amber accents.",
    filterCss: "saturate(1.18) contrast(1.08) hue-rotate(-6deg) brightness(1.02)",
  },
  {
    id: "vintage",
    label: "Vintage",
    description: "Faded blacks · gentle sepia.",
    filterCss: "sepia(0.18) contrast(0.92) brightness(1.06) saturate(0.84)",
  },
  {
    id: "bw",
    label: "B&W",
    description: "Pure mono · raised mids.",
    filterCss: "grayscale(1) contrast(1.18) brightness(1.04)",
  },
  {
    id: "high-contrast",
    label: "High contrast",
    description: "Crushed shadows · punchy highlights.",
    filterCss: "contrast(1.46) saturate(1.12)",
  },
  {
    id: "sepia",
    label: "Sepia",
    description: "Workshop brown · soft halation.",
    filterCss: "sepia(0.82) contrast(1.05) brightness(1.03)",
  },
]

/** Map of palette tool id → cursor mode used by the canvas indicator. */
export const TOOL_CURSOR: Record<ToolId, CursorMode> = {
  select: "default",
  crop: "crosshair",
  brush: "crosshair",
  eraser: "crosshair",
  text: "default",
  shape: "crosshair",
  heal: "crosshair",
  clone: "crosshair",
}
