/**
 * Social-preview + schema-markup (JSON-LD) schema.
 *
 * Two adjacent concerns a page carries alongside SEO:
 *
 *   1. Social preview — how the page renders as a link card on Open Graph
 *      surfaces (Facebook, LinkedIn, iMessage) and Twitter/X cards. This is the
 *      typed superset of the existing Payload `social` group
 *      (`title`/`description`/`image`) in `src/collections/shared.ts`.
 *   2. Schema markup — the structured-data (schema.org / JSON-LD) graph the
 *      page emits. Modelled as a discriminated union of the entity types a
 *      muffler-shop CMS actually needs, plus a `custom` escape hatch.
 *
 * These are content/metadata descriptors — no design values appear here.
 */

import type { FaqPair, GeoPoint, OpeningHours, PostalAddress } from "./seo"

/** Open Graph object type. */
export type OgType = "website" | "article" | "product" | "profile" | "business.business"

/** Twitter/X card type. */
export type TwitterCardType = "summary" | "summary_large_image" | "app" | "player"

/**
 * Social-preview surface. `title`/`description`/`imageId` are the superset of
 * the Payload `social` group; the rest sharpen the OG + Twitter cards.
 */
export interface SocialPreview {
  /** Card title; falls back to SEO metaTitle then page title. */
  title?: string
  /** Card description; falls back to SEO metaDescription. */
  description?: string
  /** Media asset id for the share image (maps to Payload `social.image`). */
  imageId?: string
  /** Accessible alt text for the share image. */
  imageAlt?: string
  ogType?: OgType
  twitterCard?: TwitterCardType
  /** @site handle, e.g. "@oakflatsmufflers". */
  twitterSite?: string
  /** Locale, e.g. "en_AU". */
  locale?: string
}

/**
 * Discriminated union of structured-data entities. `kind` is the schema.org
 * @type. Each member carries only the fields its type needs; the renderer emits
 * a JSON-LD `<script type="application/ld+json">` per entry.
 */
export type SchemaMarkup =
  | LocalBusinessSchema
  | ServiceSchema
  | ProductSchema
  | FaqPageSchema
  | BreadcrumbSchema
  | ArticleSchema
  | OrganizationSchema
  | CustomSchema

export interface LocalBusinessSchema {
  kind: "LocalBusiness"
  /** schema.org subtype, e.g. "AutoRepair". */
  businessType?: string
  name: string
  address: PostalAddress
  telephone: string
  geo?: GeoPoint
  openingHours?: readonly OpeningHours[]
  priceRange?: string
  /** Aggregate rating, if surfaced. */
  rating?: AggregateRating
}

export interface ServiceSchema {
  kind: "Service"
  name: string
  description: string
  /** e.g. "Exhaust repair". */
  serviceType?: string
  /** Suburbs/regions served. */
  areaServed?: readonly string[]
  /** Provider business name. */
  provider?: string
}

export interface ProductSchema {
  kind: "Product"
  name: string
  description: string
  sku?: string
  brand?: string
  offerPrice?: number
  priceCurrency?: string
  availability?: "InStock" | "OutOfStock" | "PreOrder" | "BackOrder"
  rating?: AggregateRating
}

export interface FaqPageSchema {
  kind: "FAQPage"
  /** Reuses the SEO FAQ-pair shape so AI-search + JSON-LD share one source. */
  faqs: readonly FaqPair[]
}

export interface BreadcrumbSchema {
  kind: "BreadcrumbList"
  items: readonly BreadcrumbItem[]
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface ArticleSchema {
  kind: "Article"
  headline: string
  description?: string
  authorName?: string
  /** ISO timestamps. */
  datePublished?: string
  dateModified?: string
  imageId?: string
}

export interface OrganizationSchema {
  kind: "Organization"
  name: string
  url?: string
  logoId?: string
  /** Social profile URLs (schema.org sameAs). */
  sameAs?: readonly string[]
}

/**
 * Escape hatch for entity types not modelled above. `json` is opaque
 * structured data validated only as a serialisable record; the renderer emits
 * it verbatim under the given @type.
 */
export interface CustomSchema {
  kind: "Custom"
  schemaOrgType: string
  json: Readonly<Record<string, unknown>>
}

/** schema.org AggregateRating. */
export interface AggregateRating {
  ratingValue: number
  reviewCount: number
  /** Defaults to 5 when omitted. */
  bestRating?: number
}

/** The complete social + structured-data bundle attached to a page. */
export interface SocialSchemaConfig {
  preview: SocialPreview
  /** Zero or more JSON-LD entities the page emits. */
  schemaMarkup: readonly SchemaMarkup[]
}

/** A neutral default: website card, large-image Twitter, no structured data. */
export const DEFAULT_SOCIAL_PREVIEW: SocialPreview = {
  ogType: "website",
  twitterCard: "summary_large_image",
  locale: "en_AU",
}
