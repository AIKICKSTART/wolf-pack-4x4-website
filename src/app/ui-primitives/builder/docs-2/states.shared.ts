/**
 * Shared doc constants for the `states` family.
 *
 * Every state screen shares the same centered layout, token palette, a11y
 * contract, responsive behaviour, and CMS profile, so they are declared once
 * here and reused across `states.docs.ts`. Re-exports the doc types for a single
 * import site.
 */

import type { PropSchemaField, TokenDependency } from "../model"
import type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocCmsCompatibility,
  DocResponsiveNotes,
} from "./types"

export type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocCmsCompatibility,
  DocResponsiveNotes,
}

/** A reusable list of props-schema fields. */
export type PropsSchemaLike = readonly PropSchemaField[]

/** Tokens every state screen reads. */
export const STATE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-canvas", category: "color", usage: "page background" },
  { token: "--primitive-panel", category: "color", usage: "centered card surface" },
  { token: "--primitive-line", category: "color", usage: "card hairline" },
  { token: "--primitive-text-strong", category: "color", usage: "headline" },
  { token: "--primitive-body", category: "color", usage: "message text" },
  { token: "--primitive-muted", category: "color", usage: "metadata + captions" },
  { token: "--primitive-h2", category: "typography", usage: "headline size" },
  { token: "--primitive-space-8", category: "space", usage: "vertical rhythm" },
  { token: "--primitive-radius-xl", category: "radius", usage: "card corner" },
  { token: "--primitive-btn-primary-bg", category: "button", usage: "primary action button" },
  { token: "--primitive-focus-ring", category: "color", usage: "visible focus ring on actions" },
]

/** A11y contract shared by static state screens. */
export const STATE_A11Y: DocAccessibilityNotes = {
  role: "region",
  requiresLabel: false,
  keyboard: ["Action buttons/links are focusable", "Enter/Space activate them"],
  visibleFocus: true,
  respectsReducedMotion: true,
  notes: ["Headline renders as the section heading; provide a real <h1>/<h2> via the route when used as a full page."],
}

/** Responsive behaviour shared by state screens. */
export const STATE_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Single centered column; actions stack full-width.",
  tablet: "Centered card with comfortable padding.",
  desktop: "Centered card with a constrained max width; actions sit inline.",
}

/** CMS profile shared by state screens (most are not droppable blocks). */
export const STATE_CMS: DocCmsCompatibility = {
  cmsBlock: false,
  blockKind: "component",
  draggable: false,
  acceptsChildren: false,
  notes: ["Rendered by a route/boundary; the copy is owner-editable but it is not a free-floating CMS block."],
}
