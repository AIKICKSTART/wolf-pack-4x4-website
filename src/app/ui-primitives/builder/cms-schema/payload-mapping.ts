/**
 * Payload alignment bridge.
 *
 * This module is the contract that proves the CMS schema *aligns with* — and
 * never forks — the existing Payload setup:
 *
 *   - `src/collections/MarketingPages.ts` (the page collection)
 *   - `src/collections/shared.ts` (`seoFields`: the `seo` + `social` groups)
 *   - `src/lib/cms/blocks/payload-blocks.ts` (the 14 content blocks)
 *
 * It declares the field-for-field correspondence as typed metadata + pure
 * projection helpers. It performs NO live Payload edits and imports nothing from
 * Payload at runtime — it is types + lookup tables only, so it can live in the
 * builder app surface without dragging the Payload config into the bundle.
 *
 * The shapes below mirror the Payload field names exactly (e.g. `metaTitle`,
 * `canonicalPath`, `_status`) so a reviewer can diff them against the collection.
 */

import type { PageStatus } from "../model"
import type { PayloadBlockType } from "./content-block"
import { PAYLOAD_BLOCK_TYPES } from "./content-block"
import type { CmsPage } from "./cms-page"
import type { SeoConfig } from "./seo"
import type { SocialPreview } from "./social-schema"
import type { WorkflowState } from "./workflow"
import { toPageStatus } from "./workflow"

/**
 * Payload's draft/published version status discriminator (`_status`). The
 * collection enables `versions.drafts`, which gives every row a
 * `draft | published` status independent of our finer workflow state.
 */
export type PayloadStatus = "draft" | "published"

/**
 * The shape of the Payload `seo` group on `MarketingPages` (from
 * `shared.ts`). Field names match the collection 1:1.
 */
export interface PayloadSeoGroup {
  metaTitle?: string
  metaDescription?: string
  canonicalPath?: string
  focusKeyword?: string
  noIndex?: boolean
}

/**
 * The shape of the Payload `social` group on `MarketingPages` (from
 * `shared.ts`). `image` is a media relation id.
 */
export interface PayloadSocialGroup {
  title?: string
  description?: string
  /** Media collection id (Payload `upload` relation). */
  image?: string
}

/**
 * Mapping rows from a CMS `SeoConfig.meta` field → the Payload `seo` group
 * field. Documents the 1:1 correspondence the reviewer can verify.
 */
export const SEO_FIELD_MAP: ReadonlyArray<{
  cmsPath: string
  payloadField: keyof PayloadSeoGroup
}> = [
  { cmsPath: "meta.metaTitle", payloadField: "metaTitle" },
  { cmsPath: "meta.metaDescription", payloadField: "metaDescription" },
  { cmsPath: "meta.canonicalPath", payloadField: "canonicalPath" },
  { cmsPath: "meta.focusKeyword", payloadField: "focusKeyword" },
  { cmsPath: "meta.noIndex", payloadField: "noIndex" },
] as const

/**
 * Project a CMS `SeoConfig` onto the Payload `seo` group. Only the fields the
 * Payload group models are emitted; local-SEO + AI-search live in the CMS
 * layer (and feed structured data), so they have no Payload counterpart yet.
 */
export function toPayloadSeoGroup(seo: SeoConfig): PayloadSeoGroup {
  const { meta } = seo
  return {
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    canonicalPath: meta.canonicalPath,
    focusKeyword: meta.focusKeyword,
    noIndex: meta.noIndex,
  }
}

/** Project a CMS `SocialPreview` onto the Payload `social` group. */
export function toPayloadSocialGroup(preview: SocialPreview): PayloadSocialGroup {
  return {
    title: preview.title,
    description: preview.description,
    image: preview.imageId,
  }
}

/**
 * Map our fine-grained `WorkflowState` onto Payload's `_status`. Anything not
 * live in production is a Payload `draft`; only `published` is `published`.
 * (The richer state is recovered from our `WorkflowStatus`, not from `_status`.)
 */
export function toPayloadStatus(state: WorkflowState): PayloadStatus {
  return state === "published" ? "published" : "draft"
}

/**
 * Cross-check: every CMS-side `PayloadBlockType` exists in the canonical Payload
 * block list. Used by tests/reviewers to assert the block schemas never drift
 * apart. Pure, returns the set of CMS block types missing from Payload.
 */
export function blockTypesMissingFromPayload(
  cmsBlockTypes: readonly string[],
): readonly string[] {
  const payloadSet = new Set<string>(PAYLOAD_BLOCK_TYPES)
  return cmsBlockTypes.filter((t) => !payloadSet.has(t))
}

/** Whether a CMS block type is one of the persisted Payload blocks. */
export function persistsToPayload(blockType: string): blockType is PayloadBlockType {
  return (PAYLOAD_BLOCK_TYPES as readonly string[]).includes(blockType)
}

/**
 * A flattened, Payload-aligned view of a `CmsPage` suitable for a reviewer to
 * compare against the `MarketingPages` field list. This is a projection, not a
 * write — it mirrors the collection's top-level fields by name.
 */
export interface PayloadMarketingPageView {
  title: string
  /** Payload `slug` field. */
  slug: string
  /** Payload `path` field (unique canonical route). */
  path: string
  /** Payload `pageType` select value. */
  pageType: CmsPage["pageType"]
  /** Payload `_status` (drafts enabled). */
  _status: PayloadStatus
  /** Internal four-state status (for cross-reference, not a Payload field). */
  pageStatus: PageStatus
  seo: PayloadSeoGroup
  social: PayloadSocialGroup
  /** The block types present, in order (mirror of the Payload `blocks` field). */
  blockTypes: readonly string[]
}

/**
 * Project a `CmsPage` onto the Payload `MarketingPages` field surface. Pure; no
 * Payload calls. Top-level block types are read from the page's root block tree.
 */
export function toPayloadMarketingPageView(page: CmsPage): PayloadMarketingPageView {
  const blockTypes = page.config.blocks.map((block) => block.type)
  return {
    title: page.config.meta.title,
    slug: page.config.meta.slug,
    path: page.path,
    pageType: page.pageType,
    _status: toPayloadStatus(page.workflow.state),
    pageStatus: toPageStatus(page.workflow.state),
    seo: toPayloadSeoGroup(page.seo),
    social: toPayloadSocialGroup(page.social.preview),
    blockTypes,
  }
}
