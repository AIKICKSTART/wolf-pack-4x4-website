/**
 * Behavioural rule descriptors attached to a block.
 *
 * These are pure metadata: responsive behaviour, accessibility requirements,
 * SEO hints, and conversion goals. The renderer and the CMS validators read
 * them; the model neither enforces nor renders them.
 */

import type { PrimitiveTokenName } from "./tokens"

/** Named viewport breakpoints, 320 → 1920. */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/** Min-width (px) anchor for each breakpoint. */
export const BREAKPOINTS: Readonly<Record<Breakpoint, number>> = {
  xs: 320,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
  "2xl": 1920,
} as const

export const BREAKPOINT_ORDER: readonly Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"] as const

/** How a block behaves at a given breakpoint. */
export interface ResponsiveRule {
  breakpoint: Breakpoint
  /** Hide the block entirely at this breakpoint. */
  hidden?: boolean
  /** Number of columns the block spans in its parent grid. */
  span?: number
  /** Stack children vertically instead of inline at this breakpoint. */
  stack?: boolean
  /** Per-breakpoint prop overrides, keyed by prop path. */
  propOverrides?: Readonly<Record<string, string | number | boolean>>
}

/** Accessibility contract a block must honour. */
export interface AccessibilityRules {
  /** Semantic landmark/role the block renders as, e.g. "region", "navigation". */
  role?: string
  /** Whether the block requires an accessible name (aria-label / labelledby). */
  requiresLabel: boolean
  /** Whether the block is keyboard-operable (interactive). */
  keyboardOperable: boolean
  /** Whether the block must expose a visible focus state. */
  visibleFocus: boolean
  /** Whether motion within the block respects `prefers-reduced-motion`. */
  respectsReducedMotion: boolean
  /** Minimum heading level the block may render, to keep document outline sane. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  /** Free-form notes for reviewers. */
  notes?: readonly string[]
}

/** SEO hints — optional per block. */
export interface SeoRules {
  /** Whether the block contributes to the page's primary heading outline. */
  contributesHeading?: boolean
  /** Structured-data type emitted, e.g. "Service", "FAQPage". */
  schemaOrgType?: string
  /** Whether images in the block require alt text. */
  requiresAltText?: boolean
  /** Whether the block's text is indexable (vs. decorative). */
  indexable?: boolean
}

/** Conversion intent of a block — optional, drives analytics + CTA emphasis. */
export interface ConversionGoal {
  /** Stable goal id, e.g. "book-service", "request-quote". */
  id: string
  label: string
  /** Primary measured action. */
  action: "click" | "submit" | "view" | "scroll-depth" | "call" | "navigate"
  /** Analytics event name to emit. */
  eventName?: string
  /** Token used to emphasise the conversion surface (button/accent token). */
  emphasisToken?: PrimitiveTokenName
}

export function isBreakpoint(value: unknown): value is Breakpoint {
  return typeof value === "string" && (BREAKPOINT_ORDER as readonly string[]).includes(value)
}

/** A sane default a11y contract for a static, non-interactive content block. */
export const DEFAULT_ACCESSIBILITY_RULES: AccessibilityRules = {
  requiresLabel: false,
  keyboardOperable: false,
  visibleFocus: false,
  respectsReducedMotion: true,
}
