/**
 * Shared types for the CMS page-builder primitive family.
 *
 * The CMS surface covers the page-builder canvas, block library, slot
 * inspector, page tree, template gallery, responsive previewer, publish
 * flow, revisions, SEO checklist, collections, schema field builder,
 * media picker, and locale switcher. Keeping the vocabulary in one
 * place lets every primitive line up with the Oak Flats Mufflermen
 * content model (parts, suburbs, services, blog, vehicles).
 */

export type BlockCategory =
  | "hero"
  | "feature"
  | "text"
  | "media"
  | "cta"
  | "form"
  | "embed"

export type BlockTone = "red" | "amber" | "teal" | "green" | "violet" | "neutral"

export type SlotFieldKind =
  | "text"
  | "textarea"
  | "number"
  | "color"
  | "image"
  | "select"
  | "toggle"

export type PagePublishState =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived"

export type ViewportPreset = "desktop" | "tablet" | "mobile"

export type RevisionAction = "created" | "edited" | "restored" | "published" | "scheduled"

export type SeoCheckStatus = "pass" | "warn" | "fail" | "skip"

export type CollectionKind = "parts" | "suburbs" | "services" | "blog" | "vehicles" | "team"

export type FieldKind =
  | "text"
  | "rich-text"
  | "number"
  | "boolean"
  | "date"
  | "image"
  | "reference"
  | "json"
  | "geo"
  | "money"

export type LocaleCode = "en-AU" | "en-NZ" | "en-US" | "vi-VN" | "zh-CN"

export interface BlockDefinition {
  id: string
  name: string
  category: BlockCategory
  description: string
  glyph: string
  tone: BlockTone
  /** Indicates this block is locked to brand approval. */
  branded?: boolean
}

export interface SlotField {
  id: string
  label: string
  kind: SlotFieldKind
  value: string | number | boolean
  /** Used for select fields. */
  options?: ReadonlyArray<{ value: string; label: string }>
  /** Optional help text shown beneath the input. */
  hint?: string
  /** Visual marker for required fields. */
  required?: boolean
}

export interface SlotGroup {
  id: string
  label: string
  fields: ReadonlyArray<SlotField>
}

export interface CanvasBlock {
  id: string
  definitionId: string
  name: string
  category: BlockCategory
  tone: BlockTone
  /** Optional one-line subheading shown on the canvas tile. */
  summary?: string
  /** Optional thumbnail glyph mirroring the block library. */
  glyph?: string
  /** Width fraction of the canvas this block occupies (0-1). */
  span?: number
  /** Selection state for the inspector binding. */
  selected?: boolean
  /** When true, render as a placeholder skeleton. */
  loading?: boolean
}

export interface PageNode {
  id: string
  slug: string
  title: string
  state: PagePublishState
  children?: ReadonlyArray<PageNode>
  /** Editor avatar initials shown on the row. */
  ownerInitials?: string
  /** Localised counterpart count. */
  translationCount?: number
}

export interface TemplateDefinition {
  id: string
  title: string
  category: "landing" | "parts" | "suburb" | "service" | "blog"
  blocks: number
  /** Short description rendered on the tile. */
  description: string
  /** Decorative glyph used as the placeholder visual. */
  glyph: string
  tone: BlockTone
}

export interface RevisionEntry {
  id: string
  author: { name: string; initials: string; role: string }
  action: RevisionAction
  /** Display label, e.g. "2 minutes ago". */
  timestamp: string
  /** Summary of the diff in plain language. */
  summary: string
  /** Indicates which revision is currently live. */
  isLive?: boolean
}

export interface SeoCheck {
  id: string
  label: string
  status: SeoCheckStatus
  detail: string
}

export interface CollectionRowItem {
  id: string
  kind: CollectionKind
  name: string
  description: string
  itemCount: number
  lastEditedBy: string
  lastEditedAt: string
  /** Pending drafts that have not been published. */
  draftCount?: number
}

export interface FieldDefinition {
  id: string
  label: string
  kind: FieldKind
  required: boolean
  /** Optional helper text or locale annotation. */
  hint?: string
  /** Indicates whether the field is multilingual. */
  localized?: boolean
}

export interface MediaItem {
  id: string
  name: string
  /** Image dimensions in pixels. */
  width: number
  height: number
  /** Format label, e.g. "JPG", "PNG", "MP4". */
  format: string
  /** Decorative tone aligning thumbnails with workshop palette. */
  tone: BlockTone
  /** Optional kicker shown above the thumbnail. */
  kicker?: string
}

export interface LocaleEntry {
  code: LocaleCode
  label: string
  /** Translation completeness percentage 0-100. */
  completion: number
  /** Number of pending translations. */
  pending: number
  /** When the locale was last reviewed. */
  reviewedAt: string
}

export const BLOCK_CATEGORY_LABEL: Record<BlockCategory, string> = {
  hero: "Hero",
  feature: "Feature",
  text: "Text",
  media: "Media",
  cta: "Call to action",
  form: "Form",
  embed: "Embed",
}

export const BLOCK_CATEGORY_GLYPH: Record<BlockCategory, string> = {
  hero: "▤",
  feature: "◳",
  text: "≡",
  media: "▣",
  cta: "▶",
  form: "✎",
  embed: "</>",
}

export const BLOCK_CATEGORY_TONE: Record<BlockCategory, BlockTone> = {
  hero: "red",
  feature: "amber",
  text: "neutral",
  media: "teal",
  cta: "green",
  form: "violet",
  embed: "neutral",
}

export const PAGE_STATE_LABEL: Record<PagePublishState, string> = {
  draft: "Draft",
  review: "In review",
  scheduled: "Scheduled",
  published: "Published",
  archived: "Archived",
}

export const PAGE_STATE_TONE: Record<PagePublishState, BlockTone> = {
  draft: "neutral",
  review: "amber",
  scheduled: "teal",
  published: "green",
  archived: "red",
}

export const VIEWPORT_LABEL: Record<ViewportPreset, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
}

export const VIEWPORT_WIDTH: Record<ViewportPreset, number> = {
  desktop: 1440,
  tablet: 834,
  mobile: 390,
}

export const VIEWPORT_HEIGHT: Record<ViewportPreset, number> = {
  desktop: 900,
  tablet: 1112,
  mobile: 844,
}

export const SEO_STATUS_TONE: Record<SeoCheckStatus, BlockTone> = {
  pass: "green",
  warn: "amber",
  fail: "red",
  skip: "neutral",
}

export const SEO_STATUS_LABEL: Record<SeoCheckStatus, string> = {
  pass: "Pass",
  warn: "Warn",
  fail: "Fail",
  skip: "Skipped",
}

export const COLLECTION_KIND_LABEL: Record<CollectionKind, string> = {
  parts: "Parts catalogue",
  suburbs: "Suburb landings",
  services: "Service pages",
  blog: "Blog posts",
  vehicles: "Vehicle library",
  team: "Team profiles",
}

export const COLLECTION_KIND_GLYPH: Record<CollectionKind, string> = {
  parts: "⚙",
  suburbs: "◉",
  services: "✚",
  blog: "✎",
  vehicles: "▲",
  team: "♟",
}

export const COLLECTION_KIND_TONE: Record<CollectionKind, BlockTone> = {
  parts: "red",
  suburbs: "amber",
  services: "teal",
  blog: "violet",
  vehicles: "green",
  team: "neutral",
}

export const FIELD_KIND_LABEL: Record<FieldKind, string> = {
  text: "Text",
  "rich-text": "Rich text",
  number: "Number",
  boolean: "Toggle",
  date: "Date",
  image: "Image",
  reference: "Reference",
  json: "JSON",
  geo: "Geo coordinate",
  money: "Money",
}

export const FIELD_KIND_GLYPH: Record<FieldKind, string> = {
  text: "Aa",
  "rich-text": "¶",
  number: "#",
  boolean: "◐",
  date: "▦",
  image: "▣",
  reference: "↗",
  json: "{}",
  geo: "⌖",
  money: "$",
}

export const REVISION_ACTION_LABEL: Record<RevisionAction, string> = {
  created: "Created",
  edited: "Edited",
  restored: "Restored",
  published: "Published",
  scheduled: "Scheduled",
}

export const REVISION_ACTION_TONE: Record<RevisionAction, BlockTone> = {
  created: "teal",
  edited: "amber",
  restored: "violet",
  published: "green",
  scheduled: "teal",
}

export const TONE_HEX: Record<BlockTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "color-mix(in oklab, var(--primitive-teal) 58%, var(--primitive-red))",
  neutral: "var(--primitive-body)",
}

export function formatRevisionTitle(entry: RevisionEntry): string {
  return `${entry.author.name} ${REVISION_ACTION_LABEL[entry.action].toLowerCase()} this page`
}

export function blockToneToChip(tone: BlockTone): "red" | "amber" | "teal" | "green" | "neutral" {
  if (tone === "violet") {
    return "teal"
  }
  return tone
}
