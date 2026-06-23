/**
 * Shared doc constants for the `navigation` (chrome) family.
 *
 * The chrome family (headers, footers, docks, slide-ups, sidebars) is the app's
 * navigation shell. Its variants share a brand config, token palette, a11y
 * contract, and responsive posture, declared once here and reused across
 * `navigation.docs.ts`. Re-exports the doc types for a single import site.
 */

import type { TokenDependency } from "../model"
import type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocResponsiveNotes,
} from "./types"

export type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocResponsiveNotes,
}

/** Module the whole chrome family is re-exported from. */
export const CHROME_PATH = "@/app/ui-primitives/components/chrome"

/** A copy-ready ChromeBrandConfig literal reused across examples. */
export const BRAND_SNIPPET = `const brand = {
  logoSrc: siteImages.logos.mark,
  logoAlt: "Mufflermen",
  wordmark: "MUFFLERMEN",
  caption: "Oak Flats · Est. 1968",
}`

/** Tokens nav/header surfaces commonly read. */
export const NAV_SURFACE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-panel-strong", category: "color", usage: "bar/surface fill" },
  { token: "--primitive-line", category: "color", usage: "hairline separators" },
  { token: "--primitive-text-strong", category: "color", usage: "wordmark + active links" },
  { token: "--primitive-body", category: "color", usage: "nav link text" },
  { token: "--primitive-muted", category: "color", usage: "captions + inactive" },
  { token: "--primitive-radius-lg", category: "radius", usage: "surface corner" },
  { token: "--primitive-focus-ring", category: "color", usage: "visible focus ring" },
]

/** CTA button tokens for headers carrying a primary action. */
export const NAV_CTA_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-btn-primary-bg", category: "button", usage: "primary CTA fill (metallic red)" },
  { token: "--primitive-btn-primary-fg", category: "button", usage: "primary CTA text" },
  { token: "--primitive-btn-primary-hover-bg", category: "button", usage: "primary CTA hover (metallic amber)" },
  { token: "--primitive-btn-radius", category: "button", usage: "CTA corner" },
]

/** Carbon/metallic texture tokens used by cinematic chrome surfaces. */
export const NAV_TEXTURE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-carbon-weave", category: "texture", usage: "carbon-fibre backing layer" },
  { token: "--primitive-metallic-sheen", category: "texture", usage: "clearcoat sheen on chrome" },
]

/** Glass tokens used by floating/glass chrome surfaces. */
export const NAV_GLASS_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-glass-strong", category: "color", usage: "frosted glass surface" },
  { token: "--primitive-glass-soft", category: "color", usage: "secondary glass layer" },
]

/** A11y contract for navigation landmarks (header/footer/nav). */
export const NAV_LANDMARK_A11Y: DocAccessibilityNotes = {
  role: "navigation",
  requiresLabel: true,
  keyboard: ["Tab moves through links/controls", "Enter follows links", "Escape closes any expanded menu"],
  visibleFocus: true,
  respectsReducedMotion: true,
  notes: ["Wrap nav lists in a <nav aria-label> landmark; the active item carries aria-current."],
}

/** A11y contract for overlay-style chrome (docks, slide-ups). */
export const NAV_OVERLAY_A11Y: DocAccessibilityNotes = {
  requiresLabel: true,
  keyboard: ["Tab cycles actions", "Enter/Space activate", "Escape closes the surface"],
  visibleFocus: true,
  respectsReducedMotion: true,
  notes: ["Motion (scroll-shrink, magnetic, slide) is compositor-only and pauses under reduced-motion."],
}

/** Responsive posture for top-bar headers. */
export const HEADER_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Collapses nav into a menu trigger; CTA stays reachable.",
  tablet: "Condensed inline nav.",
  desktop: "Full nav row with CTA and utility links.",
}

/** Responsive posture for footers. */
export const FOOTER_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Columns stack into a single column.",
  tablet: "Two-column grid.",
  desktop: "Multi-column megamap with brand + legal row.",
}

/** Responsive posture for docks. */
export const DOCK_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Primary surface — thumb-reachable from the screen edge.",
  tablet: "Floating dock.",
  desktop: "Floating dock; consider inline layout in dense apps.",
}

/** Responsive posture for sidebars. */
export const SIDEBAR_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Collapses behind a drawer; full-height when open.",
  tablet: "Narrow rail.",
  desktop: "Persistent sticky rail beside content.",
}

/** Responsive posture for slide-ups. */
export const SLIDE_UP_RESPONSIVE: DocResponsiveNotes = {
  mobile: "Primary use — slides up from the bottom edge.",
  tablet: "Bottom-anchored sheet.",
  desktop: "Bottom-anchored; consider a dialog at wide widths.",
}
