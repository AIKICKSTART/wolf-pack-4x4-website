/**
 * Shared types for the content-studio primitive family.
 *
 * Long-form editorial work for Oak Flats Mufflermen — blog posts,
 * suburb spotlights, parts deep-dives, customer stories. Keeps
 * block kinds, category vocab, author roles, and SEO/readability
 * scoring shapes in sync across cards, editors, and inspectors.
 */

export type StudioTone = "red" | "amber" | "teal" | "green" | "violet" | "neutral"

export type BlockKind =
  | "paragraph"
  | "heading"
  | "list"
  | "quote"
  | "embed"
  | "code"
  | "media"
  | "divider"

export type HeadingLevel = 1 | 2 | 3 | 4

export type AuthorRole = "founder" | "editor" | "parts-lead" | "tech-lead" | "ai-bot"

export type AuthorVisibility = "byline" | "co-author" | "ghost"

export type PostCategory =
  | "workshop-tales"
  | "suburb-spotlights"
  | "tech-explainers"
  | "parts-deep-dives"
  | "customer-stories"

export type PublishCadence = "one-off" | "weekly" | "fortnightly" | "monthly" | "quarterly"

export type RepurposeChannel =
  | "twitter-thread"
  | "instagram-reel"
  | "instagram-carousel"
  | "linkedin-post"
  | "tiktok-script"
  | "newsletter-snippet"

export type MediaKind = "image" | "video" | "audio" | "embed"

export type CommentState = "open" | "resolved" | "in-review"

export type ScoreTone = "low" | "mid" | "high" | "excellent"

export interface Author {
  id: string
  name: string
  role: AuthorRole
  /** Visible byline qualifier (e.g. "Founder", "Editorial"). */
  qualifier: string
  /** Optional avatar src. */
  avatar?: string
  /** True when the author is an automated assistant. */
  isBot?: boolean
  visibility?: AuthorVisibility
}

export interface EditorBlock {
  id: string
  kind: BlockKind
  /** Heading level when kind === "heading". */
  level?: HeadingLevel
  /** Plain text content (paragraph / quote / heading). */
  text?: string
  /** Bullet items when kind === "list". */
  items?: ReadonlyArray<string>
  /** Embed URL when kind === "embed". */
  url?: string
  /** Code language when kind === "code". */
  language?: string
  /** Code snippet when kind === "code". */
  code?: string
  /** Media caption when kind === "media". */
  caption?: string
  /** Media src when kind === "media". */
  mediaSrc?: string
  /** Media kind hint. */
  mediaKind?: MediaKind
  /** Optional attribution (e.g. quote author). */
  attribution?: string
  /** True if the block is currently focused (showcase state). */
  focused?: boolean
}

export interface OutlineEntry {
  id: string
  level: HeadingLevel
  label: string
  /** Word count under this section so far. */
  wordCount: number
  /** True when this is the active scroll target. */
  active?: boolean
}

export interface Frontmatter {
  title: string
  slug: string
  excerpt: string
  coverAlt: string
  coverFocalX: number
  coverFocalY: number
  category: PostCategory
  tags: ReadonlyArray<string>
  authorIds: ReadonlyArray<string>
  scheduledFor?: string
  publishedAt?: string
  estimatedReadMinutes: number
}

export interface SeoSignal {
  id: string
  label: string
  value: string
  /** 0–100 — lower is worse, higher is better. */
  score: number
  hint: string
}

export interface SeoMetaPreview {
  url: string
  title: string
  description: string
  ogImageAlt: string
}

export interface ReadabilityScore {
  /** Flesch reading ease (0–100). */
  fleschEase: number
  /** Grade level (e.g. 7.4 = year 7 reader). */
  gradeLevel: number
  /** Average words per sentence. */
  avgSentenceLength: number
  /** Long words (3+ syllables) as a percentage of total. */
  longWordPercent: number
}

export interface TaxonomyNode {
  id: string
  label: string
  count: number
  /** True for primary categories; false for nested tags. */
  isPrimary: boolean
  children?: ReadonlyArray<TaxonomyNode>
  /** True when this node is being targeted for a drop. */
  dropTarget?: boolean
}

export interface CoAuthorSlot {
  author: Author
  /** Display name customisation. */
  bylineOverride?: string
  /** Whether the avatar / name shows in the published byline. */
  visible: boolean
}

export interface RevisionDiffLine {
  id: string
  /** "context" — unchanged, "added" — new, "removed" — old. */
  kind: "context" | "added" | "removed"
  text: string
  /** Optional inline note. */
  note?: string
}

export interface RevisionMeta {
  id: string
  label: string
  author: Author
  timestamp: string
  changeSummary: string
}

export interface BlockSnippet {
  id: string
  kind: "callout" | "lead-magnet" | "diagram" | "quote-block" | "stat-block"
  label: string
  body: string
  usageCount: number
  tone: StudioTone
}

export interface DraftComment {
  id: string
  author: Author
  body: string
  timestamp: string
  state: CommentState
  blockAnchor?: string
  resolutionNote?: string
  replies?: ReadonlyArray<DraftCommentReply>
}

export interface DraftCommentReply {
  id: string
  author: Author
  body: string
  timestamp: string
}

export interface RepurposeOutput {
  channel: RepurposeChannel
  status: "queued" | "drafted" | "approved" | "scheduled"
  hookLine: string
  estimatedReach: string
  /** Optional snippet preview. */
  snippet?: string
}

export interface CoverSuggestion {
  id: string
  label: string
  prompt: string
  tone: StudioTone
}

export interface CategoryMeta {
  label: string
  tone: StudioTone
  glyph: string
  description: string
}

export const CATEGORY_META: Record<PostCategory, CategoryMeta> = {
  "workshop-tales": {
    label: "Workshop Tales",
    tone: "amber",
    glyph: "⚙",
    description: "First-person bay-floor stories from Daniel and the crew.",
  },
  "suburb-spotlights": {
    label: "Suburb Spotlights",
    tone: "teal",
    glyph: "◐",
    description: "Illawarra suburb profiles — who drives what, where they go.",
  },
  "tech-explainers": {
    label: "Tech Explainers",
    tone: "violet",
    glyph: "▢",
    description: "Plain-English breakdowns of how an exhaust system actually works.",
  },
  "parts-deep-dives": {
    label: "Parts Deep-Dives",
    tone: "red",
    glyph: "◆",
    description: "Brand-by-brand part teardowns — Manta vs Pacemaker vs Redback.",
  },
  "customer-stories": {
    label: "Customer Stories",
    tone: "green",
    glyph: "★",
    description: "Customer rebuilds, restorations, and proud noisy moments.",
  },
}

export const AUTHOR_ROLE_LABEL: Record<AuthorRole, string> = {
  founder: "Founder",
  editor: "Editorial",
  "parts-lead": "Parts lead",
  "tech-lead": "Tech lead",
  "ai-bot": "AI bot",
}

export const AUTHOR_ROLE_TONE: Record<AuthorRole, StudioTone> = {
  founder: "amber",
  editor: "teal",
  "parts-lead": "red",
  "tech-lead": "green",
  "ai-bot": "violet",
}

export const REPURPOSE_CHANNEL_LABEL: Record<RepurposeChannel, string> = {
  "twitter-thread": "X thread",
  "instagram-reel": "Instagram reel",
  "instagram-carousel": "IG carousel",
  "linkedin-post": "LinkedIn post",
  "tiktok-script": "TikTok script",
  "newsletter-snippet": "Newsletter snippet",
}

export const REPURPOSE_CHANNEL_TONE: Record<RepurposeChannel, StudioTone> = {
  "twitter-thread": "teal",
  "instagram-reel": "red",
  "instagram-carousel": "amber",
  "linkedin-post": "violet",
  "tiktok-script": "green",
  "newsletter-snippet": "neutral",
}

export const COMMENT_STATE_LABEL: Record<CommentState, string> = {
  open: "Open",
  resolved: "Resolved",
  "in-review": "In review",
}

export const COMMENT_STATE_TONE: Record<CommentState, StudioTone> = {
  open: "amber",
  resolved: "green",
  "in-review": "teal",
}

export const BLOCK_KIND_LABEL: Record<BlockKind, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  list: "Bullet list",
  quote: "Pull quote",
  embed: "Embed",
  code: "Code",
  media: "Media",
  divider: "Divider",
}

export const BLOCK_KIND_GLYPH: Record<BlockKind, string> = {
  paragraph: "¶",
  heading: "H",
  list: "•",
  quote: "“",
  embed: "↗",
  code: "{ }",
  media: "▢",
  divider: "—",
}

/* ------------------------------------------------------------------ *
 * Score helpers
 * ------------------------------------------------------------------ */

export function fleschTone(value: number): ScoreTone {
  if (value >= 80) return "excellent"
  if (value >= 60) return "high"
  if (value >= 40) return "mid"
  return "low"
}

export function scoreTone(value: number): ScoreTone {
  if (value >= 85) return "excellent"
  if (value >= 70) return "high"
  if (value >= 50) return "mid"
  return "low"
}

export function scoreToneToStudioTone(tone: ScoreTone): StudioTone {
  switch (tone) {
    case "excellent":
      return "green"
    case "high":
      return "teal"
    case "mid":
      return "amber"
    case "low":
      return "red"
  }
}

export function studioToneToChip(tone: StudioTone): "red" | "amber" | "teal" | "green" | "neutral" {
  if (tone === "violet") return "neutral"
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") return tone
  return "neutral"
}

export function formatReadMinutes(minutes: number): string {
  if (minutes < 1) return "< 1 min"
  return `${Math.round(minutes)} min`
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

/* ------------------------------------------------------------------ *
 * Lightweight word counting helpers (no DOM, no any)
 * ------------------------------------------------------------------ */

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (trimmed.length === 0) return 0
  return trimmed.split(/\s+/).length
}

export function countWordsInBlocks(blocks: ReadonlyArray<EditorBlock>): number {
  let total = 0
  for (const block of blocks) {
    if (block.text) {
      total += countWords(block.text)
    }
    if (block.items) {
      for (const item of block.items) {
        total += countWords(item)
      }
    }
    if (block.caption) {
      total += countWords(block.caption)
    }
  }
  return total
}
