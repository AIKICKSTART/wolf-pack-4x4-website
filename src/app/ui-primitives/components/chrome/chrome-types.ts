/**
 * Shared types for the chrome primitive family — site/app shell elements
 * (headers, footers, docks, slide-ups, sidebars).
 *
 * Each variant module re-uses these to keep the surface area predictable
 * across the 22 chrome primitives.
 */

export type ChromeFamily =
  | "header"
  | "footer"
  | "dock"
  | "slide-up"
  | "sidebar"

export type BrandSurface =
  | "obsidian"
  | "chrome"
  | "amber"
  | "glass"
  | "pinstripe"
  | "thermal"

export type DockPosition =
  | "bottom-center"
  | "bottom-right"
  | "right-side"
  | "tab-rail"

export type ChromeMotion = "static" | "scroll-shrink" | "magnetic" | "fade"

export interface ChromeNavItem {
  id: string
  label: string
  href: string
  description?: string
  isActive?: boolean
}

export interface ChromeBrandConfig {
  /** Image src — must be a `siteImages.*` value. */
  logoSrc: string
  /** Alt text describing the mark. */
  logoAlt: string
  /** Wordmark text e.g. "MUFFLERMEN". */
  wordmark: string
  /** Optional small caption (e.g. "Oak Flats · Est. 1968"). */
  caption?: string
}

export interface ChromeContactDetail {
  label: string
  value: string
  href?: string
}

export interface ChromeSocialLink {
  id: string
  label: string
  href: string
}
