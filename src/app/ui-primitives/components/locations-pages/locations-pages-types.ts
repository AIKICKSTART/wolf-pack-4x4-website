/**
 * Shared types for the Oak Flats Mufflermen locations-pages design-system primitives.
 *
 * These primitives mirror the live SEO suburb surfaces but expose reusable, strict
 * typed props for any composition (showcase scenes, suburb hubs, service-suburb
 * combination pages).
 */

export type SuburbState =
  | "NSW"
  | "VIC"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "NT"
  | "ACT"

/**
 * Drive-time / distance bands measured from the Oak Flats workshop.
 *
 * The bands roughly translate to:
 *   - core        — Oak Flats catchment (≤ 5 km / ≤ 8 min)
 *   - near        — Illawarra ring (5–15 km / ≤ 20 min)
 *   - regional    — Greater Illawarra (15–35 km / 20–40 min)
 *   - extended    — Northern Illawarra / Shoalhaven (35–80 km / 40–75 min)
 *   - service     — Touring / mobile-fit coverage (80–150 km / 75 min+)
 */
export type WorkshopDistanceBand =
  | "core"
  | "near"
  | "regional"
  | "extended"
  | "service"

/**
 * Fulfilment mode for a local quote CTA.
 *
 * The Oak Flats workshop offers two distinct fulfilment paths and the CTA
 * surface needs to make the difference explicit on the suburb page.
 */
export type LocalQuoteMode = "drop-off" | "mobile-fit"

export type SuburbTrafficTone = "clear" | "moderate" | "busy"

export interface SuburbBadge {
  id: string
  label: string
  href?: string
}
