/**
 * SEO schema — classic SEO + local-SEO + AI-search surfaces.
 *
 * This is the typed superset of the existing Payload `seo` field group
 * (`src/collections/shared.ts`): `metaTitle`, `metaDescription`,
 * `canonicalPath`, `focusKeyword`, `noIndex` map 1:1 (see `payload-mapping.ts`).
 * It then adds the fields a modern muffler-shop site needs that Payload's base
 * group does not yet model:
 *
 *   - Local SEO  — NAP (name/address/phone), service-area, geo-coordinates,
 *     opening hours, Google Business Profile linkage. Drives `LocalBusiness`
 *     structured data (see `social-schema.ts`).
 *   - AI search  — the answer-engine / LLM surface: a concise answer the page
 *     is the canonical source for, FAQ pairs, entity facts, and crawler opt-in,
 *     so the page is citable by AI search engines.
 *
 * No literal design values appear here — SEO is content metadata, not styling.
 */

/** Classic on-page SEO. Superset-compatible with the Payload `seo` group. */
export interface SeoMeta {
  /** ≤ 70 chars (matches Payload maxLength). Falls back to the page title. */
  metaTitle?: string
  /** ≤ 180 chars (matches Payload maxLength). */
  metaDescription?: string
  /** Canonical path/URL when the page is syndicated or duplicated. */
  canonicalPath?: string
  /** Primary keyword the page targets. */
  focusKeyword?: string
  /** Supporting keywords / entities. */
  secondaryKeywords?: readonly string[]
  /** Robots directives. `noIndex` mirrors the Payload checkbox. */
  noIndex?: boolean
  noFollow?: boolean
  /** Search-result priority hint (0–1), maps to a sitemap priority. */
  sitemapPriority?: number
  /** Expected change cadence, maps to a sitemap changefreq. */
  changeFrequency?: SitemapChangeFrequency
}

export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"

/** A geographic coordinate pair (WGS84). */
export interface GeoPoint {
  latitude: number
  longitude: number
}

/** A postal address (schema.org PostalAddress shape). */
export interface PostalAddress {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  /** ISO 3166-1 alpha-2, e.g. "AU". */
  addressCountry: string
}

/** One day's opening hours. `closed` short-circuits the time range. */
export interface OpeningHours {
  dayOfWeek: DayOfWeek
  /** 24h "HH:MM". Ignored when `closed`. */
  opens: string
  closes: string
  closed?: boolean
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

export const DAYS_OF_WEEK: readonly DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

/**
 * Local-SEO surface for a physical business / location page. Feeds the
 * `LocalBusiness` JSON-LD and the Google Business Profile alignment.
 */
export interface LocalSeo {
  /** Legal/display business name (NAP "name"). */
  businessName: string
  address: PostalAddress
  /** E.164 phone, e.g. "+61242000000" (NAP "phone"). */
  telephone: string
  /** Geo-coordinates for map embeds + structured data. */
  geo?: GeoPoint
  /** Suburbs / regions served, e.g. ["Oak Flats", "Shellharbour"]. */
  serviceAreas?: readonly string[]
  /** Per-day opening hours. */
  openingHours?: readonly OpeningHours[]
  /** Google Business Profile URL or place id. */
  googleBusinessProfile?: string
  /** Price band hint, schema.org priceRange e.g. "$$". */
  priceRange?: string
}

/**
 * AI-search / answer-engine surface. Lets a page declare the canonical answer
 * it provides so LLM-backed search can cite it cleanly, plus crawler opt-in.
 */
export interface AiSearch {
  /**
   * A concise, self-contained answer (≤ ~320 chars) the page is the canonical
   * source for. Used as the AI-citable summary.
   */
  canonicalAnswer?: string
  /** The single question this page best answers. */
  primaryQuestion?: string
  /** Structured Q&A pairs feeding `FAQPage` JSON-LD + AI extraction. */
  faqs?: readonly FaqPair[]
  /** Salient entity facts (key/value), e.g. "Established": "1998". */
  entityFacts?: readonly EntityFact[]
  /** Whether AI/LLM crawlers may train on or cite this page. */
  allowAiTraining?: boolean
  allowAiCitation?: boolean
  /** Topical cluster id the page belongs to, for internal linking. */
  topicCluster?: string
}

export interface FaqPair {
  question: string
  /** Plain-text answer (kept plain so it round-trips to FAQ JSON-LD). */
  answer: string
}

export interface EntityFact {
  label: string
  value: string
}

/** The complete SEO bundle attached to a page. */
export interface SeoConfig {
  meta: SeoMeta
  local?: LocalSeo
  ai?: AiSearch
}

/** A conservative default: indexable, weekly cadence, no local/AI overrides. */
export const DEFAULT_SEO_META: SeoMeta = {
  noIndex: false,
  noFollow: false,
  changeFrequency: "weekly",
  sitemapPriority: 0.5,
}
