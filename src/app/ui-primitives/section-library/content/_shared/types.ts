/**
 * Section-library (content group) — shared registry types.
 *
 * Each content section pairs a production-ready React composition (built only
 * from existing primitives) with a `BlockManifest` so the CMS canvas can drag
 * it. This file declares the lightweight registry envelope the barrel + the
 * showcase route consume. Pure types — no runtime tokens or literals here.
 */

import type { ComponentType } from "react"

import type { BlockManifest } from "../../../builder/model"

/** The six content-section categories this group ships. */
export type SectionLibraryCategory =
  | "blog"
  | "faq"
  | "contact"
  | "local-seo"
  | "parts"
  | "video-hero"

/** Human label for each category, for the showcase rail. */
export const SECTION_CATEGORY_LABEL: Readonly<Record<SectionLibraryCategory, string>> = {
  blog: "Blog & editorial",
  faq: "FAQ",
  contact: "Contact & enquiry",
  "local-seo": "Local-SEO suburb",
  parts: "Parts & product",
  "video-hero": "Video hero",
} as const

/**
 * One registered content section: the draggable component plus its design-time
 * manifest and the catalogue metadata the showcase + palette read.
 */
export interface SectionLibraryEntry {
  /** Stable key, mirrors the manifest `type`, e.g. "section/blog-feature". */
  key: string
  category: SectionLibraryCategory
  /** Palette label. */
  label: string
  /** One-line description of what the section renders. */
  description: string
  /** The composition rendered on a page / in the canvas. */
  component: ComponentType
  /** Design-time definition the canvas drags. */
  manifest: BlockManifest
}
