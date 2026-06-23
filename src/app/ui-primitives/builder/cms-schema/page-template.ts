/**
 * Page templates + section templates.
 *
 * A `SectionTemplate` is a saved, reusable arrangement of blocks (a builder
 * `Block` subtree) — WordPress "block pattern". A `PageTemplate` is a starting
 * layout for a whole page: an ordered list of section slots + default SEO/social
 * + a style profile — WordPress "page template" / theme template.
 *
 * `PageType` is aligned exactly with the Payload `MarketingPages.pageType`
 * select (homepage/service/location/parts/standard) so a template's intent maps
 * straight onto a Payload page (see `payload-mapping.ts`).
 *
 * Everything is token-driven via the borrowed `StyleProfile`; no literal design
 * values appear here.
 */

import type { Block, BlockCategory, StyleProfile } from "../model"
import type { ContentBlockType } from "./content-block"
import type { SeoConfig } from "./seo"
import type { SocialSchemaConfig } from "./social-schema"

/**
 * Page intent — mirrors `MarketingPages.pageType` values verbatim so a CMS
 * template round-trips to a Payload page type.
 */
export type PageType = "homepage" | "service" | "location" | "parts" | "standard"

export const PAGE_TYPES: readonly PageType[] = [
  "homepage",
  "service",
  "location",
  "parts",
  "standard",
] as const

export function isPageType(value: unknown): value is PageType {
  return typeof value === "string" && (PAGE_TYPES as readonly string[]).includes(value)
}

/**
 * A saved, reusable block subtree (a "pattern"). Dropping it onto a page inserts
 * a deep copy of `blocks` with fresh ids.
 */
export interface SectionTemplate {
  /** Stable id, e.g. "section_service-hero". */
  id: string
  name: string
  description: string
  category: BlockCategory
  /** The block subtree this section inserts (builder `Block` instances). */
  blocks: readonly Block[]
  /** Block types this section is composed of, for palette filtering. */
  composedOf: readonly ContentBlockType[]
  /** Preview thumbnail asset id. */
  thumbnailId?: string
  tags?: readonly string[]
  createdAt: string
  updatedAt: string
}

/**
 * One slot in a page template: a labelled position that suggests a section
 * template and constrains what may fill it.
 */
export interface PageTemplateSlot {
  /** Stable slot id within the template, e.g. "hero", "services-grid". */
  id: string
  label: string
  /** Section template id pre-filled into the slot, if any. */
  defaultSectionId?: string
  /** Block categories permitted in this slot (empty = any). */
  allowedCategories?: readonly BlockCategory[]
  /** Whether the slot must contain at least one block to publish. */
  required: boolean
  /** Whether the owner may add multiple sections into this slot. */
  repeatable?: boolean
}

/**
 * A starting layout for a whole page. Provides ordered slots, a default style
 * profile, and default SEO/social so a new page of this type starts coherent.
 */
export interface PageTemplate {
  /** Stable id, e.g. "template_service-page". */
  id: string
  name: string
  description: string
  /** The Payload-aligned page intent this template produces. */
  pageType: PageType
  /** Ordered section slots. */
  slots: readonly PageTemplateSlot[]
  /** Style profile (token selections) applied to pages built from it. */
  styleProfile: StyleProfile
  /** Default SEO bundle (owner overrides per page). */
  defaultSeo?: SeoConfig
  /** Default social/structured-data bundle. */
  defaultSocial?: SocialSchemaConfig
  /** Preview thumbnail asset id. */
  thumbnailId?: string
  createdAt: string
  updatedAt: string
}
