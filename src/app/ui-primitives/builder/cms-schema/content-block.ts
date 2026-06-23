/**
 * CMS content-block schema — the WordPress-style "block" layer on the
 * Primitive DNA.
 *
 * A `ContentBlockType` is the CMS-facing definition of one block an owner can
 * place on a page. It is intentionally a *thin alignment layer* over two
 * existing systems and never forks them:
 *
 *   1. The builder data model (`../model`) — every block ultimately resolves to
 *      a `BlockManifest` → `Block` instance. We reuse its `BlockCategory`,
 *      `BlockKind`, `PropsSchema`, `EditableField`, and the `--primitive-*`
 *      token contract verbatim.
 *   2. The Payload blocks (`src/lib/cms/blocks/payload-blocks.ts`) — the 14
 *      persisted content blocks. A CMS block whose `blockType` matches a Payload
 *      slug maps 1:1 onto a stored row (see `payload-mapping.ts`).
 *
 * WordPress parallels (for the doc + mental model):
 *   - `ReusableBlockDef`  ≈ WP "reusable block" / synced pattern.
 *   - `GlobalBlockDef`    ≈ WP "template part" (header, footer, CTA banner) —
 *     edited once, referenced everywhere.
 *
 * TOKEN-DRIVEN ONLY: a block declares the central tokens it reads via the
 * builder's `TokenDependency`; it never carries literal color/size/space/
 * radius/motion values.
 */

import type { BlockCategory, BlockKind } from "../model"
import type { EditableField, PropsRecord, PropsSchema } from "../model"
import type { TokenDependency } from "../model"

/**
 * The render-time block-type discriminator. When it equals one of the Payload
 * block slugs it round-trips to a stored Payload block; otherwise the block is
 * a builder-only composition (e.g. a section template).
 */
export type ContentBlockType = string

/**
 * The 14 canonical Payload block slugs (mirror of `contentBlocks` order in
 * `payload-blocks.ts`). Kept as a const tuple so the mapping layer and mock
 * data can reference them without re-importing Payload (no Payload at runtime
 * here — this is schema/types only).
 */
export const PAYLOAD_BLOCK_TYPES = [
  "cta",
  "callout",
  "quote",
  "gallery",
  "video",
  "embed",
  "accordion",
  "checklist",
  "divider",
  "timeline",
  "poll",
  "table",
  "code",
  "codeSandbox",
] as const

/** A block slug that is known to persist as a Payload block. */
export type PayloadBlockType = (typeof PAYLOAD_BLOCK_TYPES)[number]

/** Type guard: does this block type round-trip to a Payload block? */
export function isPayloadBlockType(value: string): value is PayloadBlockType {
  return (PAYLOAD_BLOCK_TYPES as readonly string[]).includes(value)
}

/**
 * How a block participates in the CMS, mirroring WordPress's block taxonomy.
 *
 * - `core`     — a one-off block placed inline on a single page.
 * - `reusable` — a synced pattern: one source of truth, referenced by id from
 *   many pages; editing the source updates every reference.
 * - `global`   — a template part (header, footer, banner) rendered in a global
 *   slot rather than the page body.
 */
export type ContentBlockScope = "core" | "reusable" | "global"

/**
 * The CMS-facing definition of one placeable block. This is the schema the
 * page-builder palette, the property inspector, and the renderer read. It binds
 * a `blockType` to the builder's prop schema + editable-field surface + token
 * contract, and records whether it persists to Payload.
 */
export interface ContentBlockDef {
  /** Render-time discriminator; equals a Payload slug for persisted blocks. */
  blockType: ContentBlockType
  /** Human label shown in the block palette. */
  label: string
  /** One-line author-facing description. */
  description: string
  category: BlockCategory
  kind: BlockKind
  scope: ContentBlockScope
  /** Manifest version this block schema was authored against. */
  version: string
  /** The builder prop schema this block validates against. */
  propsSchema: PropsSchema
  /** Props applied when the block is first inserted. */
  defaultProps: PropsRecord
  /** Curated owner-editable field surface. */
  editableFields: readonly EditableField[]
  /** Central `--primitive-*` tokens the block reads. Token-driven only. */
  tokenDependencies: readonly TokenDependency[]
  /** Whether the block round-trips to a Payload block of the same slug. */
  persistsToPayload: boolean
  /** Free-form search/filter tags. */
  tags?: readonly string[]
}

/**
 * A reusable (synced) block: a single saved instance referenced by id from many
 * pages. Mirrors WordPress reusable blocks / synced patterns.
 */
export interface ReusableBlockDef {
  /** Stable id referenced from pages (e.g. "reusable_warranty-callout"). */
  id: string
  name: string
  /** The block type this reusable instance is built from. */
  blockType: ContentBlockType
  /** The frozen props all references render with. */
  props: PropsRecord
  /** ISO timestamps. */
  createdAt: string
  updatedAt: string
  /** Optional owner note. */
  note?: string
}

/**
 * A global block / template part rendered in a named global slot (header,
 * footer, announcement bar) rather than inline in a page body.
 */
export interface GlobalBlockDef {
  /** Stable id, e.g. "global_primary-footer". */
  id: string
  name: string
  /** The named global slot this part fills. */
  slot: GlobalSlot
  blockType: ContentBlockType
  props: PropsRecord
  createdAt: string
  updatedAt: string
}

/** Named global slots a template part can occupy. */
export type GlobalSlot =
  | "header"
  | "footer"
  | "announcement-bar"
  | "cta-banner"
  | "cookie-notice"
  | "sidebar"

export const GLOBAL_SLOTS: readonly GlobalSlot[] = [
  "header",
  "footer",
  "announcement-bar",
  "cta-banner",
  "cookie-notice",
  "sidebar",
] as const

export function isGlobalSlot(value: unknown): value is GlobalSlot {
  return typeof value === "string" && (GLOBAL_SLOTS as readonly string[]).includes(value)
}
