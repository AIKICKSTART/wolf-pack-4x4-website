/**
 * PageConfig — a full page: an ordered block tree + a style profile + meta.
 *
 * This is what the CMS persists and what the schema-driven renderer reads to
 * paint a page. The style profile is purely a set of token *selections* — never
 * literal values — so every page stays token-driven and re-themes centrally.
 */

import type { Block } from "./block"
import type { PrimitiveTokenName } from "./tokens"

/** Light/dark/system preference for a page. */
export type ThemeMode = "light" | "dark" | "system"

/**
 * A style profile is a named bundle of token selections that re-skins a page
 * without touching block props. It only ever references central tokens.
 */
export interface StyleProfile {
  /** Stable id, e.g. "carbon-metallic", "light-luxury". */
  id: string
  name: string
  mode: ThemeMode
  /** Accent token used for primary emphasis (must be a central color token). */
  accentToken: PrimitiveTokenName
  /** Surface token used for page background. */
  surfaceToken: PrimitiveTokenName
  /** Display + body font tokens. */
  displayFontToken: PrimitiveTokenName
  bodyFontToken: PrimitiveTokenName
  /** Default radius scale token applied to surfaces. */
  radiusToken: PrimitiveTokenName
  /** Default motion duration token. */
  motionToken: PrimitiveTokenName
  /** Optional ad-hoc token remaps applied page-wide. */
  tokenOverrides?: Readonly<Record<string, PrimitiveTokenName>>
}

/** Page-level SEO + publishing metadata. */
export interface PageMeta {
  /** URL slug, e.g. "services/exhaust-repair". */
  slug: string
  title: string
  description?: string
  /** Open Graph image asset id. */
  ogImageId?: string
  /** Canonical URL when the page is syndicated. */
  canonicalUrl?: string
  /** Whether search engines may index the page. */
  noindex?: boolean
  keywords?: readonly string[]
  /** ISO timestamps. */
  createdAt: string
  updatedAt: string
}

/** Draft/review/published lifecycle state. */
export type PageStatus = "draft" | "in-review" | "published" | "archived"

/** A complete page definition. */
export interface PageConfig {
  /** Stable page id. */
  id: string
  /** Schema version of the PageConfig envelope (for migrations). */
  schemaVersion: number
  meta: PageMeta
  status: PageStatus
  /** Style profile applied to the whole page. */
  styleProfile: StyleProfile
  /** Ordered root-level block tree. */
  blocks: readonly Block[]
}

/** The current PageConfig envelope schema version. */
export const PAGE_CONFIG_SCHEMA_VERSION = 1

/** A house default style profile — carbon-fibre + metallic, dark. */
export const DEFAULT_STYLE_PROFILE: StyleProfile = {
  id: "carbon-metallic",
  name: "Carbon Metallic",
  mode: "dark",
  accentToken: "--primitive-red",
  surfaceToken: "--primitive-canvas",
  displayFontToken: "--primitive-font-display",
  bodyFontToken: "--primitive-font-body",
  radiusToken: "--primitive-radius-md",
  motionToken: "--primitive-duration-normal",
}
