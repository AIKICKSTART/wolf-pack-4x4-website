/**
 * CmsPage — the top-level CMS document.
 *
 * This is the editorial envelope around a builder `PageConfig`. Where the
 * builder model's `PageConfig` is the *renderable* tree (blocks + style profile
 * + bare meta), a `CmsPage` is the *managed* document: the same renderable core
 * plus the SEO/social/structured-data bundles, the page-type/template lineage,
 * the workflow status, and the version history. It is the unit the CMS lists,
 * permissions, schedules, and publishes — and the unit `payload-mapping.ts`
 * projects onto a Payload `MarketingPages` row.
 */

import type { PageConfig } from "../model"
import type { GlobalChromeConfig } from "./header-footer"
import type { PageType } from "./page-template"
import type { SeoConfig } from "./seo"
import type { SocialSchemaConfig } from "./social-schema"
import type { VersionHistory } from "./version-history"
import type { WorkflowStatus } from "./workflow"

/** The current CMS document schema version, for migrations. */
export const CMS_PAGE_SCHEMA_VERSION = 1

/** The managed CMS document. */
export interface CmsPage {
  /** Stable page id (shared with the underlying `PageConfig.id`). */
  id: string
  /** Schema version of the CmsPage envelope. */
  schemaVersion: number
  /** Payload-aligned page intent (homepage/service/location/parts/standard). */
  pageType: PageType
  /** Canonical route, e.g. "/services/custom-exhaust-systems". */
  path: string
  /** The page template this document was created from, if any. */
  templateId?: string
  /** The renderable core: block tree + style profile + bare meta. */
  config: PageConfig
  /** SEO + local-SEO + AI-search bundle. */
  seo: SeoConfig
  /** Social-preview + schema-markup bundle. */
  social: SocialSchemaConfig
  /** Global chrome override, if the page departs from the site default. */
  chromeOverride?: GlobalChromeConfig
  /** Editorial workflow state + approval audit + schedule. */
  workflow: WorkflowStatus
  /** Immutable version log. */
  history: VersionHistory
  /** ISO timestamps. */
  createdAt: string
  updatedAt: string
}
