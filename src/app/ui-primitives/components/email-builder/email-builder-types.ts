/** Shared types for the visual email template builder primitives. */

export type EmailBlockKind =
  | "heading"
  | "image"
  | "button"
  | "divider"
  | "columns-2"
  | "columns-3"
  | "social-row"
  | "spacer"
  | "footer"
  | "html"
  | "personalization"

export type PreviewDevice = "mobile" | "desktop"

export type PreviewMode = "light" | "dark"

export type SpamSeverity = "low" | "medium" | "high"

export type ThemePreset =
  | "workshop-dark"
  | "heritage-cream"
  | "cinematic"
  | "newsletter-classic"
  | "receipt-style"
  | "minimal"

export type HtmlOutputTab = "html" | "inlined-css" | "plain-text"

export type AlignmentValue = "left" | "center" | "right"

export interface EmailBlock {
  id: string
  kind: EmailBlockKind
  /** Short label shown in the canvas row. */
  label: string
  /** Snippet of body content rendered as a preview line. */
  preview?: string
}

export interface BlockPaletteItem {
  kind: EmailBlockKind
  name: string
  hint: string
}

export interface BlockPaletteSection {
  id: string
  title: string
  items: ReadonlyArray<BlockPaletteItem>
}

export interface PersonalizationToken {
  /** Token literal e.g. `{{first_name}}`. */
  token: string
  /** Human label e.g. "Customer first name". */
  label: string
  /** Sample value used by the inline preview e.g. "Daniel". */
  sample: string
  /** Optional group label e.g. "Customer" / "Vehicle" / "Quote". */
  group?: string
}

export interface SpamWarning {
  id: string
  message: string
  severity: SpamSeverity
}

export interface ThemePresetSpec {
  id: ThemePreset
  name: string
  description: string
  /** Paper / canvas background swatch. */
  paper: string
  /** Ink / body text swatch. */
  ink: string
  /** Accent button / link swatch. */
  accent: string
}

export interface SavedTemplate {
  id: string
  name: string
  /** ISO timestamp string for "last edited". */
  editedAt: string
  /** Number of sends so far. */
  sentCount: number
  /** Short glyph string used inside the thumb tile. */
  thumb: string
}

export interface ClickHeatSpot {
  id: string
  /** Human-readable link label e.g. "Book your service". */
  label: string
  /** Click-through rate 0-100. */
  ctr: number
  /** Approximate position inside the preview canvas. */
  position: {
    /** Top offset, 0-100 percent. */
    top: number
    /** Left offset, 0-100 percent. */
    left: number
  }
}

export interface TestEmailRecipient {
  email: string
  /** Display label e.g. "Marketing inbox". */
  label?: string
}
