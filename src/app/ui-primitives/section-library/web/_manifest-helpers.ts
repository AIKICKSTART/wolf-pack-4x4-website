/**
 * Section-library shared manifest helpers.
 *
 * These keep the five web-section `BlockManifest`s DRY and strictly typed
 * without re-declaring the same a11y / responsive / token boilerplate in every
 * file. Pure data + small typed builders — no runtime behaviour.
 *
 * TOKEN-DRIVEN ONLY: every section reads central `--primitive-*` tokens; the
 * `tokenDependencies` arrays below document exactly which ones, so the canvas
 * and the theme picker know what re-themes a section.
 */

import {
  BREAKPOINT_ORDER,
  type AccessibilityRules,
  type Breakpoint,
  type ResponsiveRule,
  type TokenDependency,
} from "../../builder/model"

/** Section components live in this family's barrel. */
export const SECTION_IMPORT_PATH = "@/app/ui-primitives/section-library/web" as const

/** Every web section is a page-level `section` block in the Marketing bucket. */
export const SECTION_KIND = "section" as const
export const SECTION_CATEGORY = "Marketing" as const

/** Manifest version shared across the group; bump on a schema change. */
export const SECTION_MANIFEST_VERSION = "1.0.0" as const

/**
 * Token dependencies every section shares (carbon surface + metallic CTA DNA +
 * core type/space/radius/motion). Individual sections append their own extras.
 */
export const SHARED_TOKEN_DEPENDENCIES: readonly TokenDependency[] = [
  { token: "--primitive-canvas", category: "color", usage: "section canvas backdrop" },
  { token: "--primitive-panel", category: "color", usage: "card / surface fill" },
  { token: "--primitive-line", category: "color", usage: "hairline borders" },
  { token: "--primitive-text-strong", category: "color", usage: "headings" },
  { token: "--primitive-body", category: "color", usage: "body copy" },
  { token: "--primitive-muted", category: "color", usage: "kickers / meta labels" },
  { token: "--primitive-red", category: "color", usage: "brand accent" },
  { token: "--primitive-amber", category: "color", usage: "secondary accent" },
  { token: "--primitive-carbon-weave", category: "texture", usage: "carbon-fibre underlay" },
  { token: "--primitive-btn-primary-bg", category: "button", usage: "primary CTA (metallic red)" },
  { token: "--primitive-btn-primary-hover-bg", category: "button", usage: "primary CTA hover (metallic amber)" },
  { token: "--primitive-font-display", category: "typography", usage: "display headings" },
  { token: "--primitive-font-body", category: "typography", usage: "body text" },
  { token: "--primitive-font-mono", category: "typography", usage: "kickers / labels" },
  { token: "--primitive-radius-lg", category: "radius", usage: "surface corners" },
  { token: "--primitive-space-8", category: "space", usage: "section rhythm" },
  { token: "--primitive-duration-normal", category: "motion", usage: "reveal / hover timing" },
  { token: "--primitive-focus-ring", category: "color", usage: "visible focus outline" },
] as const

/** Compose the shared token deps with section-specific extras, de-duped. */
export function withSharedTokens(
  extra: readonly TokenDependency[],
): readonly TokenDependency[] {
  const seen = new Set<string>()
  const merged: TokenDependency[] = []
  for (const dep of [...SHARED_TOKEN_DEPENDENCIES, ...extra]) {
    if (seen.has(dep.token)) {
      continue
    }
    seen.add(dep.token)
    merged.push(dep)
  }
  return merged
}

/** A11y contract for a static, labelled content section with a heading. */
export function sectionAccessibility(
  headingLevel: AccessibilityRules["headingLevel"],
  notes: readonly string[],
): AccessibilityRules {
  return {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel,
    notes,
  }
}

/**
 * Responsive rules across the full 320 → 1920 ladder. Sections stack on the
 * three smallest breakpoints and lay out inline from `lg` up.
 */
export function fullBleedResponsiveRules(): readonly ResponsiveRule[] {
  return BREAKPOINT_ORDER.map((breakpoint: Breakpoint): ResponsiveRule => ({
    breakpoint,
    span: 12,
    stack: breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md",
  }))
}
