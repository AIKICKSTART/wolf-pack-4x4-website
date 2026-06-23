/**
 * Block-editor primitive family — shared types for the 14 editorial
 * blocks (gallery, code, table, embed, quote, poll, sandbox, timeline,
 * divider, video, callout, checklist, accordion, CTA).
 *
 * Every block uses the same triplet: `data: BlockData<T>` carries the
 * payload, `mode: BlockMode` selects render / edit / preview / error,
 * and the optional `onChange` callback emits a new typed payload while
 * keeping the host (CMS / content-studio) in control of persistence.
 */

/* ------------------------------------------------------------------ *
 * Shared primitives
 * ------------------------------------------------------------------ */

/** Render mode for every block primitive. */
export type BlockMode = "render" | "preview" | "edit" | "error"

/** Editorial accent tones reused across blocks. */
export type BlockTone = "neutral" | "teal" | "amber" | "red" | "green" | "violet"

/** Block error payload (shown in the error-state route). */
export interface BlockError {
  code: string
  message: string
  hint?: string
}

/**
 * Generic envelope every block exposes. The `T` is the per-block
 * payload (gallery list, table grid, poll choices, etc). Hosts diff
 * on `version` to invalidate caches and on `updatedAt` to surface
 * "edited 3 minutes ago" hints.
 */
export interface BlockData<T> {
  id: string
  payload: T
  version: number
  updatedAt: string
}

/** Common props for every primitive. */
export interface BlockPrimitiveProps<T> {
  data: BlockData<T>
  mode?: BlockMode
  error?: BlockError
  onChange?: (next: BlockData<T>) => void
  className?: string
}

/* ------------------------------------------------------------------ *
 * Gallery
 * ------------------------------------------------------------------ */

export type GalleryLayout = "grid" | "carousel" | "masonry"

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption?: string
  /** Rough aspect ratio used for masonry packing without a real image. */
  ratio?: number
}

export interface GalleryPayload {
  layout: GalleryLayout
  caption: string
  items: ReadonlyArray<GalleryItem>
}

/* ------------------------------------------------------------------ *
 * Code block
 * ------------------------------------------------------------------ */

export type CodeLanguage = "bash" | "javascript" | "typescript" | "json" | "yaml" | "css" | "html"
export type CodeTheme = "graphite" | "amber" | "teal" | "violet"

export interface CodePayload {
  language: CodeLanguage
  theme: CodeTheme
  source: string
  showLineNumbers: boolean
  filename?: string
}

/* ------------------------------------------------------------------ *
 * Table
 * ------------------------------------------------------------------ */

export type TableAlign = "left" | "right" | "center"
export type TableFormat = "text" | "currency" | "number" | "percent"

export interface TableColumn {
  id: string
  label: string
  align: TableAlign
  format: TableFormat
  /** Width hint in pixels — column resize emits this on drop. */
  width: number
  sortable: boolean
}

export interface TableRow {
  id: string
  cells: Readonly<Record<string, string>>
}

export interface TableSortState {
  columnId: string
  direction: "asc" | "desc"
}

export interface TablePayload {
  caption: string
  columns: ReadonlyArray<TableColumn>
  rows: ReadonlyArray<TableRow>
  sort?: TableSortState
}

/* ------------------------------------------------------------------ *
 * Embed
 * ------------------------------------------------------------------ */

export type EmbedProvider = "youtube" | "vimeo" | "codepen" | "twitter"
export type EmbedAspect = "16:9" | "4:3" | "1:1" | "9:16"

export interface EmbedPayload {
  provider: EmbedProvider
  url: string
  title: string
  aspect: EmbedAspect
  authorHandle?: string
}

/* ------------------------------------------------------------------ *
 * Quote
 * ------------------------------------------------------------------ */

export type QuoteVariant = "plain" | "image"

export interface QuotePayload {
  variant: QuoteVariant
  text: string
  author: string
  citation?: string
  /** Optional headshot URL — used by the image variant. */
  imageUrl?: string
  imageAlt?: string
}

/* ------------------------------------------------------------------ *
 * Poll
 * ------------------------------------------------------------------ */

export interface PollChoice {
  id: string
  label: string
  votes: number
}

export interface PollPayload {
  question: string
  totalVotes: number
  choices: ReadonlyArray<PollChoice>
  closesAt?: string
  multiSelect: boolean
}

/* ------------------------------------------------------------------ *
 * Code sandbox
 * ------------------------------------------------------------------ */

export interface CodeSandboxPayload {
  html: string
  css: string
  javascript: string
  /** Which pane is highlighted in edit mode. */
  activePane: "html" | "css" | "javascript"
  previewLabel: string
}

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

export type TimelineGranularity = "year" | "month" | "event"

export interface TimelineEvent {
  id: string
  date: string
  label: string
  description: string
  granularity: TimelineGranularity
  tone: BlockTone
}

export interface TimelinePayload {
  title: string
  events: ReadonlyArray<TimelineEvent>
}

/* ------------------------------------------------------------------ *
 * Divider
 * ------------------------------------------------------------------ */

export type DividerVariant = "line" | "dot" | "icon" | "wave" | "zigzag"

export interface DividerPayload {
  variant: DividerVariant
  /** Optional label rendered inside the centre gap. */
  label?: string
}

/* ------------------------------------------------------------------ *
 * Video
 * ------------------------------------------------------------------ */

export interface VideoChapter {
  id: string
  label: string
  /** Seconds offset from start. */
  start: number
}

export interface VideoPayload {
  src: string
  posterUrl: string
  title: string
  durationSeconds: number
  chapters: ReadonlyArray<VideoChapter>
  captionsEnabled: boolean
}

/* ------------------------------------------------------------------ *
 * Callout
 * ------------------------------------------------------------------ */

export type CalloutKind = "info" | "warning" | "tip" | "danger"

export interface CalloutPayload {
  kind: CalloutKind
  title: string
  body: string
  dismissible: boolean
}

/* ------------------------------------------------------------------ *
 * Checklist
 * ------------------------------------------------------------------ */

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface ChecklistPayload {
  title: string
  items: ReadonlyArray<ChecklistItem>
}

/* ------------------------------------------------------------------ *
 * Accordion
 * ------------------------------------------------------------------ */

export interface AccordionEntry {
  id: string
  question: string
  answer: string
  open: boolean
}

export interface AccordionPayload {
  title: string
  entries: ReadonlyArray<AccordionEntry>
}

/* ------------------------------------------------------------------ *
 * Call-to-action
 * ------------------------------------------------------------------ */

export interface CtaPayload {
  heading: string
  body: string
  buttonLabel: string
  buttonHref: string
  backgroundImageUrl?: string
  tone: BlockTone
}

/* ------------------------------------------------------------------ *
 * Mode helpers
 * ------------------------------------------------------------------ */

/** True when the block should expose editing controls. */
export function isEditMode(mode: BlockMode | undefined): boolean {
  return mode === "edit"
}

/** Map an internal tone to a Chip tone for badges. */
export const TONE_LABEL: Record<BlockTone, string> = {
  neutral: "Neutral",
  teal: "Teal",
  amber: "Amber",
  red: "Red",
  green: "Green",
  violet: "Violet",
}
