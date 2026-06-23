/**
 * Shared manifest fragments for the marketing section library.
 *
 * Every section's `BlockManifest` reuses these token-dependency bundles,
 * responsive rules, and a11y contracts so the six manifests stay DRY and each
 * file stays small. TOKEN-DRIVEN ONLY — these declare the central
 * `--primitive-*` tokens the sections read; no literals.
 */

import type { ResponsiveRule } from "../../builder/model/rules"
import type { TokenDependency } from "../../builder/model/tokens"

/** Surface + text colour tokens every marketing section reads. */
export const SURFACE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-canvas", category: "color", usage: "section background canvas" },
  { token: "--primitive-panel", category: "color", usage: "card / panel fill" },
  { token: "--primitive-panel-strong", category: "color", usage: "elevated panel fill" },
  { token: "--primitive-line", category: "color", usage: "hairline borders" },
  { token: "--primitive-line-strong", category: "color", usage: "emphasised borders" },
  { token: "--primitive-text-strong", category: "color", usage: "headings" },
  { token: "--primitive-body", category: "color", usage: "body copy" },
  { token: "--primitive-muted", category: "color", usage: "kickers / meta" },
] as const

/** Brand accent colour tokens. */
export const ACCENT_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-red", category: "color", usage: "primary brand accent" },
  { token: "--primitive-amber", category: "color", usage: "secondary brand accent" },
  { token: "--primitive-teal", category: "color", usage: "tertiary accent" },
  { token: "--primitive-green", category: "color", usage: "success / verified accent" },
] as const

/** Primary CTA button DNA — metallic-red → amber hover. */
export const BUTTON_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-btn-radius", category: "button", usage: "CTA corner radius" },
  { token: "--primitive-btn-primary-bg", category: "button", usage: "CTA fill (metallic red)" },
  { token: "--primitive-btn-primary-fg", category: "button", usage: "CTA label colour" },
  { token: "--primitive-btn-primary-hover-bg", category: "button", usage: "CTA hover fill (metallic amber)" },
  { token: "--primitive-btn-primary-hover-fg", category: "button", usage: "CTA hover label colour" },
  { token: "--primitive-btn-primary-shadow", category: "button", usage: "CTA clearcoat shadow" },
  { token: "--primitive-btn-primary-hover-shadow", category: "button", usage: "CTA hover shadow" },
] as const

/** Carbon-fibre + metallic texture tokens for branded surfaces. */
export const TEXTURE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-carbon-weave", category: "texture", usage: "carbon-fibre surface weave" },
  { token: "--primitive-metallic-red", category: "texture", usage: "metallic-red accent plate" },
  { token: "--primitive-metallic-amber", category: "texture", usage: "metallic-amber accent plate" },
] as const

/** Type-scale tokens shared across sections. */
export const TYPE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-font-display", category: "typography", usage: "section headings" },
  { token: "--primitive-font-body", category: "typography", usage: "body copy" },
  { token: "--primitive-font-mono", category: "typography", usage: "kickers / labels" },
  { token: "--primitive-h2", category: "typography", usage: "section heading size" },
  { token: "--primitive-text-lg", category: "typography", usage: "lead body size" },
  { token: "--primitive-tracking-wider", category: "typography", usage: "kicker tracking" },
] as const

/** Radius + space + motion + focus tokens shared across sections. */
export const STRUCTURE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-radius-md", category: "radius", usage: "card radius" },
  { token: "--primitive-radius-lg", category: "radius", usage: "panel radius" },
  { token: "--primitive-radius-pill", category: "radius", usage: "chip / pill radius" },
  { token: "--primitive-space-6", category: "space", usage: "intra-card gap" },
  { token: "--primitive-space-8", category: "space", usage: "section block gap" },
  { token: "--primitive-space-10", category: "space", usage: "section padding" },
  { token: "--primitive-duration-normal", category: "motion", usage: "hover transitions" },
  { token: "--primitive-ease-out", category: "motion", usage: "reveal easing" },
  { token: "--primitive-focus-ring", category: "color", usage: "focus outline" },
  { token: "--primitive-focus-shadow", category: "shadow", usage: "focus halo" },
] as const

/** The full token bundle a content-led marketing section reads. */
export const CONTENT_SECTION_TOKENS: readonly TokenDependency[] = [
  ...SURFACE_TOKENS,
  ...ACCENT_TOKENS,
  ...TYPE_TOKENS,
  ...STRUCTURE_TOKENS,
]

/** The full token bundle a CTA-led section reads (adds button + texture DNA). */
export const CTA_SECTION_TOKENS: readonly TokenDependency[] = [
  ...CONTENT_SECTION_TOKENS,
  ...BUTTON_TOKENS,
  ...TEXTURE_TOKENS,
]

/** Sections stack on small viewports and span the full content column above. */
export const STACK_RESPONSIVE_RULES: readonly ResponsiveRule[] = [
  { breakpoint: "xs", stack: true, span: 12 },
  { breakpoint: "sm", stack: true, span: 12 },
  { breakpoint: "md", stack: false, span: 12 },
  { breakpoint: "lg", stack: false, span: 12 },
  { breakpoint: "xl", stack: false, span: 12 },
  { breakpoint: "2xl", stack: false, span: 12 },
] as const
