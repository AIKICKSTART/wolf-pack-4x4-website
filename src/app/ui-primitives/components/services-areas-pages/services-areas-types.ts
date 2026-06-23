/**
 * Shared types for the Oak Flats Mufflermen services + area-hub design-system
 * primitives. These mirror the live SEO surfaces (services index, service detail,
 * regional area hubs) but expose reusable, strict-typed props for any composition.
 */

/**
 * Realistic Mufflermen workshop service categories.
 *
 * Each value maps to a specific accent + iconmark in the design system, so the
 * downstream primitives can stay tone-coded without inventing new categories
 * per-call site.
 */
export type ServiceCategory =
  | "custom-exhaust"
  | "muffler-repair"
  | "extractors-headers"
  | "performance-chips"
  | "cold-air-induction"
  | "tig-fabrication"
  | "audit-inspection"

/**
 * Workshop lead-time bands for a given service. Drives the lead-time chip
 * surface (1-day / same-week / 2-week) across tiles, detail heroes, and
 * pricing bands.
 */
export type ServiceLeadTime =
  | "same-day"
  | "next-day"
  | "this-week"
  | "two-weeks"

/**
 * Regional service hubs around Oak Flats. The downstream primitives expose
 * these as the primary partition for area-hub heroes, coverage maps, and
 * suburb list cards.
 */
export type AreaRegion =
  | "illawarra"
  | "eurobodalla"
  | "shoalhaven"
  | "south-coast-nsw"

/**
 * Coverage density tone used by the coverage-map mini and suburb-list card.
 *
 * Bands are roughly:
 *   - high      — every suburb in the area has a workshop within 20 min
 *   - medium    — most suburbs covered, occasional mobile-fit run
 *   - light     — periphery / touring coverage only
 */
export type CoverageDensity = "high" | "medium" | "light"

/** Tone code shared across chips, accents, and tile borders. */
export type ServiceAccent = "red" | "amber" | "teal" | "green"

/**
 * Detail record for a single Mufflermen service used by index tiles and
 * detail heroes. Lead-time and average-price chips are surfaced together.
 */
export interface ServiceDescriptor {
  id: string
  category: ServiceCategory
  name: string
  shortDescription: string
  leadTime: ServiceLeadTime
  averagePriceAud: number
  accent: ServiceAccent
}

/**
 * Suburb entry used by the area-coverage card, the suburb list card, and the
 * services grid. `servicesCount` is the count of services available in that
 * suburb so the suburb list card can render a compact service density.
 */
export interface AreaSuburb {
  id: string
  name: string
  postcode: string
  driveTimeMinutes: number
  servicesCount: number
}

/**
 * Stat tile descriptor used by the area-stats trio.
 */
export interface AreaStat {
  id: string
  label: string
  value: string
  helper: string
}

/**
 * A single FAQ entry for the service FAQ block.
 */
export interface ServiceFaq {
  id: string
  question: string
  answer: string
}

/**
 * A single process step for the service process steps row.
 */
export interface ServiceProcessStep {
  id: string
  number: number
  title: string
  body: string
  iconKey: "drop-off" | "fitment" | "build" | "test" | "handover"
}

/**
 * A single customer testimonial for the service testimonials primitive.
 */
export interface ServiceTestimonial {
  id: string
  customerName: string
  vehicle: string
  rating: 1 | 2 | 3 | 4 | 5
  quote: string
}

/**
 * Breadcrumb crumb shape used by the services breadcrumb. Distinct from the
 * locations crumb shape: services crumbs never carry a postcode badge.
 */
export interface ServicesCrumb {
  label: string
  href?: string
}

/**
 * Pretty label for a service category — used by chips, iconmarks, and the
 * pricing band. Kept centralised so all primitives label consistently.
 */
export const SERVICE_CATEGORY_LABEL: Record<ServiceCategory, string> = {
  "custom-exhaust": "Custom exhaust",
  "muffler-repair": "Muffler repair",
  "extractors-headers": "Extractors",
  "performance-chips": "Performance chips",
  "cold-air-induction": "Cold air induction",
  "tig-fabrication": "TIG fabrication",
  "audit-inspection": "Audit & inspection",
}

/**
 * Pretty label for a lead-time band.
 */
export const SERVICE_LEAD_TIME_LABEL: Record<ServiceLeadTime, string> = {
  "same-day": "Same day",
  "next-day": "Next day",
  "this-week": "This week",
  "two-weeks": "2-week build",
}

/**
 * Pretty label for an area region.
 */
export const AREA_REGION_LABEL: Record<AreaRegion, string> = {
  illawarra: "Illawarra",
  eurobodalla: "Eurobodalla",
  shoalhaven: "Shoalhaven",
  "south-coast-nsw": "South Coast NSW",
}

/**
 * Pretty label for a coverage density tone.
 */
export const COVERAGE_DENSITY_LABEL: Record<CoverageDensity, string> = {
  high: "High coverage",
  medium: "Medium coverage",
  light: "Light coverage",
}

/**
 * Format an AUD price for chips and pricing bands. Drops trailing decimals
 * on round numbers so a "from $189" chip does not surface "$189.00".
 */
export function formatAudFromPrice(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) {
    return "From $—"
  }

  const rounded = Math.round(amount)
  return `From $${rounded.toLocaleString("en-AU")}`
}
