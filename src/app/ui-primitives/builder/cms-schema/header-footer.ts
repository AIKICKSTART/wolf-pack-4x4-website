/**
 * Header / footer / global chrome configuration.
 *
 * These are the site-wide template parts (WordPress "template parts"): edited
 * once, rendered around every page. They are token-driven — a header/footer
 * picks a `StyleProfile` (token selections from the builder model) and never
 * carries literal colors/spacing. Navigation is pure data the renderer paints
 * with the active profile's tokens.
 *
 * A header/footer can also embed `GlobalBlockDef`s (e.g. a CTA banner) by id;
 * the renderer resolves those from the global-block store.
 */

import type { StyleProfile } from "../model"

/** One navigation link. May nest one level for dropdown menus. */
export interface NavItem {
  id: string
  label: string
  href: string
  /** Marks the link as the primary CTA in the header (uses button tokens). */
  isCta?: boolean
  /** Open in a new tab. */
  external?: boolean
  /** Lucide icon slug or house icon name. */
  icon?: string
  /** Nested links for a dropdown / mega-menu column. */
  children?: readonly NavItem[]
}

/** Header layout variants. */
export type HeaderLayout = "inline" | "centered" | "split" | "mega"

/** Header configuration — a site-wide template part. */
export interface HeaderConfig {
  id: string
  /** Style profile (token selections) the header renders with. */
  styleProfile: StyleProfile
  layout: HeaderLayout
  /** Logo media asset id. */
  logoId?: string
  /** Accessible name for the logo link. */
  logoAlt?: string
  /** Primary navigation. */
  nav: readonly NavItem[]
  /** Stick the header to the top on scroll. */
  sticky?: boolean
  /** Render a translucent glass background (uses glass tokens). */
  transparentOnHero?: boolean
  /** Optional announcement-bar global block id rendered above the header. */
  announcementBarId?: string
  /** Optional global CTA-banner block id surfaced in the header. */
  ctaBannerId?: string
}

/** A footer column of links under a heading. */
export interface FooterColumn {
  id: string
  heading: string
  links: readonly NavItem[]
}

/** A social profile link rendered in the footer. */
export interface SocialLink {
  id: string
  /** Platform slug, e.g. "facebook", "instagram", "youtube". */
  platform: string
  href: string
  label: string
}

/** Footer layout variants. */
export type FooterLayout = "columns" | "minimal" | "centered" | "split"

/** Footer configuration — a site-wide template part. */
export interface FooterConfig {
  id: string
  styleProfile: StyleProfile
  layout: FooterLayout
  /** Link columns. */
  columns: readonly FooterColumn[]
  /** Social profile links. */
  socialLinks?: readonly SocialLink[]
  /** Copyright / legal line; may use the current year token at render. */
  legalText?: string
  /** Secondary legal links (privacy, terms). */
  legalLinks?: readonly NavItem[]
  /** Optional newsletter-signup global block id. */
  newsletterBlockId?: string
}

/**
 * The complete global chrome bundle: header + footer + any always-on global
 * blocks the site renders around page bodies.
 */
export interface GlobalChromeConfig {
  header: HeaderConfig
  footer: FooterConfig
  /** Ids of global blocks rendered site-wide (cookie notice, etc.). */
  globalBlockIds?: readonly string[]
}
