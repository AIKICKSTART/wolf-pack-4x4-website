/**
 * Shared manifest builders for the content section group.
 *
 * Keeps each section's `BlockManifest` small and consistent: common token
 * bundles (button DNA, surface, type), the default responsive ladder
 * (320 → 1920), and a sane a11y contract for a static content section.
 * Token-driven only — these document which central `--primitive-*` tokens a
 * section reads; they never carry literal values.
 */

import type {
  AccessibilityRules,
  ResponsiveRule,
  TokenDependency,
} from "../../../builder/model"

/** Button-DNA tokens every section's CTA reads (red → amber metallic). */
export const BUTTON_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-btn-primary-bg", category: "button", usage: "primary CTA fill (metallic red)" },
  { token: "--primitive-btn-primary-fg", category: "button", usage: "primary CTA label" },
  { token: "--primitive-btn-primary-hover-bg", category: "button", usage: "primary CTA hover fill (metallic amber)" },
  { token: "--primitive-btn-primary-hover-fg", category: "button", usage: "primary CTA hover label" },
  { token: "--primitive-btn-primary-shadow", category: "button", usage: "primary CTA clearcoat + drop shadow" },
  { token: "--primitive-btn-primary-hover-shadow", category: "button", usage: "primary CTA hover shadow" },
  { token: "--primitive-btn-secondary-bg", category: "button", usage: "secondary CTA carbon body" },
  { token: "--primitive-btn-secondary-fg", category: "button", usage: "secondary CTA label" },
  { token: "--primitive-btn-secondary-border", category: "button", usage: "secondary CTA hairline" },
  { token: "--primitive-btn-radius", category: "button", usage: "CTA corner radius" },
]

/** Surface tokens every section panel reads. */
export const SURFACE_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-panel", category: "color", usage: "section panel background" },
  { token: "--primitive-glass-soft", category: "color", usage: "soft glass top sheen" },
  { token: "--primitive-line", category: "color", usage: "section hairline border" },
  { token: "--primitive-surface-shadow", category: "shadow", usage: "section depth shadow" },
  { token: "--primitive-carbon-weave", category: "texture", usage: "carbon-fibre atmosphere layer" },
  { token: "--primitive-radius-xl", category: "radius", usage: "section corner radius" },
]

/** Type tokens every section header reads. */
export const TYPE_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-font-display", category: "typography", usage: "section heading face" },
  { token: "--primitive-font-body", category: "typography", usage: "section body face" },
  { token: "--primitive-font-mono", category: "typography", usage: "kicker / meta face" },
  { token: "--primitive-h2", category: "typography", usage: "section title size" },
  { token: "--primitive-text-lg", category: "typography", usage: "section lede size" },
  { token: "--primitive-text-strong", category: "color", usage: "heading text" },
  { token: "--primitive-body", category: "color", usage: "body text" },
  { token: "--primitive-muted", category: "color", usage: "meta text" },
  { token: "--primitive-red", category: "color", usage: "kicker accent" },
  { token: "--primitive-amber", category: "color", usage: "secondary accent" },
]

/** Focus tokens for the keyboard-visible focus contract. */
export const FOCUS_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-focus-ring", category: "color", usage: "visible focus ring" },
  { token: "--primitive-focus-shadow", category: "color", usage: "focus halo" },
]

/** Spacing rhythm tokens the section shell reads. */
export const SPACE_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-space-4", category: "space", usage: "grid gap" },
  { token: "--primitive-space-6", category: "space", usage: "section inline padding" },
  { token: "--primitive-space-7", category: "space", usage: "section block gap" },
  { token: "--primitive-space-9", category: "space", usage: "section block padding" },
]

/** Motion tokens for transitions. */
export const MOTION_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-duration-fast", category: "motion", usage: "CTA lift" },
  { token: "--primitive-duration-normal", category: "motion", usage: "CTA paint transition" },
  { token: "--primitive-ease-out", category: "motion", usage: "section easing" },
]

/**
 * Compose the common token bundles a content section depends on, in addition
 * to any section-specific tokens.
 */
export function withCommonTokens(
  extra: readonly TokenDependency[] = [],
): readonly TokenDependency[] {
  return [
    ...SURFACE_TOKEN_DEPENDENCIES,
    ...TYPE_TOKEN_DEPENDENCIES,
    ...BUTTON_TOKEN_DEPENDENCIES,
    ...FOCUS_TOKEN_DEPENDENCIES,
    ...SPACE_TOKEN_DEPENDENCIES,
    ...MOTION_TOKEN_DEPENDENCIES,
    ...extra,
  ]
}

/** Default responsive ladder, 320 → 1920, full-width single column. */
export const DEFAULT_RESPONSIVE_RULES: readonly ResponsiveRule[] = [
  { breakpoint: "xs", span: 12, stack: true },
  { breakpoint: "sm", span: 12, stack: true },
  { breakpoint: "md", span: 12, stack: false },
  { breakpoint: "lg", span: 12, stack: false },
  { breakpoint: "xl", span: 12, stack: false },
  { breakpoint: "2xl", span: 12, stack: false },
]

/**
 * Build the a11y contract for a content section. Static content sections are
 * keyboard-operable only where they embed interactive primitives
 * (accordions, forms), so callers tune `keyboardOperable`.
 */
export function sectionAccessibility(
  overrides: Partial<AccessibilityRules> = {},
): AccessibilityRules {
  return {
    role: "region",
    requiresLabel: true,
    keyboardOperable: false,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    ...overrides,
  }
}
