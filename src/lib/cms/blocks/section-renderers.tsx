/**
 * Section-block renderers — maps each stored section-block type (see
 * `section-blocks.ts`) to a wrapper that adapts the `BlockData<unknown>`
 * envelope onto the underlying section-library component's props.
 *
 * Mirrors the `BLOCK_REGISTRY` contract in `render-registry.tsx`: each
 * wrapper receives `data.payload` (the stored fields with `id`/`blockType`/
 * `blockName` already stripped by `mapBlocks`) and narrows it defensively —
 * stored rows are untyped at this boundary. Ids are derived from array index
 * so server and client markup match (no `Math.random`).
 *
 * This file stays a Server Component (no `"use client"`): every wrapped
 * section is either a client island taking serialisable props or a server
 * composition, and no wrapper passes function props.
 */

import type { ComponentType, ReactNode } from "react"

import type { BlockData, BlockMode } from "@/app/ui-primitives/components/block-editor"
import type {
  FeatureGridItem,
  FeatureSpotlightBullet,
  LogoCloudEntry,
  PricingCtaAction,
  StatCounterEntry,
  TestimonialEntry,
} from "@/app/ui-primitives/components/marketing"
import type {
  ComparisonColumn,
  ComparisonRow,
} from "@/app/ui-primitives/components/data-display/comparison-table"
import type { DonutSegment } from "@/app/ui-primitives/components/charts/donut-chart"
import type { RatingBreakdownTier } from "@/app/ui-primitives/components/reviews"
import { CinematicLoopHero } from "@/app/ui-primitives/components/video-heroes"
import { BeforeAfterGallery, type BeforeAfterItem } from "@/app/ui-primitives/section-library/marketing/sections/before-after-gallery"
import { CtaSection, type CtaSectionAssurance } from "@/app/ui-primitives/section-library/marketing/sections/cta-section"
import { PricingServiceSection } from "@/app/ui-primitives/section-library/marketing/sections/pricing-service-section"
import { PromoCampaignSection } from "@/app/ui-primitives/section-library/marketing/sections/promo-campaign-section"
import { TestimonialsSection, type TestimonialsSectionSummary } from "@/app/ui-primitives/section-library/marketing/sections/testimonials-section"
import type { SectionIconName } from "@/app/ui-primitives/section-library/marketing/icons"
import { ServiceOverviewSection, type ServiceOverviewItem } from "@/app/ui-primitives/section-library/web/service-overview/service-overview-section"
import { WebsiteHeroSection } from "@/app/ui-primitives/section-library/web/website-hero/website-hero-section"
import { WorkshopTrustSection } from "@/app/ui-primitives/section-library/web/workshop-trust/workshop-trust-section"
import { ContactEnquiryForm } from "@/components/mufflermen/contact-enquiry-form"

import { resolveBlockIcon } from "./icon-options"

interface SectionRendererProps {
  data: BlockData<unknown>
  mode?: BlockMode
}

// — Payload narrowing helpers ———————————————————————————————

function record(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return {}
}

function rows(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.map(record)
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined
}

function num(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function pick<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined
}

function clampRating(value: unknown): 1 | 2 | 3 | 4 | 5 | undefined {
  const parsed = num(value)
  if (parsed === undefined) {
    return undefined
  }
  return Math.min(5, Math.max(1, Math.round(parsed))) as 1 | 2 | 3 | 4 | 5
}

/**
 * Resolve a stored `upload` field value to a renderable media reference.
 * Populated docs resolve via their `url` (or `/media/cms/<filename>` — the
 * Media collection's staticDir); bare ids (depth 0) resolve to `null`.
 */
function uploadToMedia(value: unknown): { url: string; alt: string } | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null
  }
  const doc = value as Record<string, unknown>
  const alt = typeof doc.alt === "string" ? doc.alt : ""

  if (typeof doc.url === "string" && doc.url !== "") {
    return { url: doc.url, alt }
  }
  if (typeof doc.filename === "string" && doc.filename !== "") {
    return { url: `/media/cms/${doc.filename}`, alt }
  }
  return null
}

const AVATAR_TONES = ["red", "amber", "teal", "green", "obsidian"] as const
const ACCENT_TONES = ["red", "amber", "teal", "green"] as const
const CARD_SPANS = ["short", "regular", "tall"] as const

function testimonialEntries(value: unknown): TestimonialEntry[] {
  return rows(value).map((row, index) => ({
    id: `testimonial-${index}`,
    quote: str(row.quote) ?? "",
    name: str(row.name) ?? "",
    role: str(row.role) ?? "",
    rating: clampRating(row.rating),
    tone: pick(row.tone, AVATAR_TONES),
    span: pick(row.span, CARD_SPANS),
  }))
}

/** Map a stored `ICON_OPTIONS` value onto the CTA section's icon-name slots. */
const SECTION_ICON_FOR_VALUE: Readonly<Record<string, SectionIconName>> = {
  "arrow-right": "arrow",
  "badge-check": "badge",
  calendar: "calendar",
  flame: "flame",
  gauge: "gauge",
  "map-pin": "pin",
  phone: "phone",
  quote: "quote",
  "shield-check": "shield",
  sparkles: "sparkles",
  star: "star",
  tag: "tag",
  "volume-2": "volume",
  wrench: "wrench",
}

function sectionIconName(value: string | undefined): SectionIconName {
  return (value && SECTION_ICON_FOR_VALUE[value]) || "shield"
}

// — Wrappers ————————————————————————————————————————————————

function WebsiteHeroSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const headlineLines = rows(payload.headlineLines)
    .map((row) => str(row.line))
    .filter((line): line is string => line !== undefined)

  return (
    <WebsiteHeroSection
      kicker={str(payload.kicker)}
      headlineLines={headlineLines.length > 0 ? headlineLines : undefined}
      subhead={str(payload.subhead)}
      primaryLabel={str(payload.primaryLabel)}
      primaryHref={str(payload.primaryHref)}
      secondaryLabel={str(payload.secondaryLabel)}
      secondaryHref={str(payload.secondaryHref)}
    />
  )
}

function VideoHeroSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const cta = record(payload.cta)
  const video = uploadToMedia(payload.video)
  const poster = uploadToMedia(payload.posterImage)

  return (
    <CinematicLoopHero
      headline={str(payload.headline) ?? ""}
      subhead={str(payload.subhead) ?? ""}
      cta={{ label: str(cta.label) ?? "Book a fit", href: str(cta.href) ?? "/book" }}
      videoSrc={video?.url}
      posterSrc={poster?.url}
      timestampLabel={str(payload.timestampLabel)}
    />
  )
}

function ServiceOverviewSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const columnsValue = str(payload.columns)
  const columns = columnsValue === "2" ? 2 : columnsValue === "4" ? 4 : 3

  const services: ServiceOverviewItem[] = rows(payload.services).map((row, index) => ({
    id: `service-${index}`,
    icon: resolveBlockIcon(str(row.icon)),
    title: str(row.title) ?? "",
    description: str(row.description) ?? "",
    href: str(row.href),
    linkLabel: str(row.linkLabel),
  }))

  return (
    <ServiceOverviewSection
      kicker={str(payload.kicker)}
      heading={str(payload.heading)}
      body={str(payload.body)}
      columns={columns}
      services={services.length > 0 ? services : undefined}
    />
  )
}

function WorkshopTrustSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const testimonials = testimonialEntries(payload.testimonials)
  const brands: LogoCloudEntry[] = rows(payload.brands)
    .map((row, index) => {
      const name = str(row.name) ?? ""
      return { id: `brand-${index}`, name, mark: <span>{name}</span> }
    })
    .filter((brand) => brand.name !== "")

  return (
    <WorkshopTrustSection
      kicker={str(payload.kicker)}
      heading={str(payload.heading)}
      body={str(payload.body)}
      testimonials={testimonials.length > 0 ? testimonials : undefined}
      brands={brands.length > 0 ? brands : undefined}
    />
  )
}

function BeforeAfterGalleryBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const items: BeforeAfterItem[] = rows(payload.items).flatMap((row, index) => {
    const before = uploadToMedia(row.beforeImage)
    const after = uploadToMedia(row.afterImage)
    if (!before || !after) {
      return []
    }
    return [
      {
        id: `job-${index}`,
        title: str(row.title) ?? "",
        summary: str(row.summary) ?? "",
        beforeSrc: before.url,
        beforeAlt: str(row.beforeAlt) ?? before.alt,
        afterSrc: after.url,
        afterAlt: str(row.afterAlt) ?? after.alt,
        result: str(row.result),
      },
    ]
  })

  return (
    <BeforeAfterGallery
      kicker={str(payload.kicker)}
      heading={str(payload.heading) ?? ""}
      body={str(payload.body)}
      items={items}
    />
  )
}

function SectionCtaBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const primary = record(payload.primaryAction)
  const secondary = record(payload.secondaryAction)
  const secondaryLabel = str(secondary.label)
  const secondaryHref = str(secondary.href)

  const assurances: CtaSectionAssurance[] = rows(payload.assurances).flatMap((row) => {
    const label = str(row.label)
    if (!label) {
      return []
    }
    return [{ icon: sectionIconName(str(row.icon)), label }]
  })

  return (
    <CtaSection
      kicker={str(payload.kicker) ?? ""}
      heading={str(payload.heading) ?? ""}
      body={str(payload.body) ?? ""}
      primaryAction={{
        label: str(primary.label) ?? "Book a fit-up",
        href: str(primary.href) ?? "/book",
      }}
      secondaryAction={
        secondaryLabel && secondaryHref
          ? { label: secondaryLabel, href: secondaryHref, variant: "ghost" }
          : undefined
      }
      assurances={assurances.length > 0 ? assurances : undefined}
      tone={pick(payload.tone, ["carbon", "metallic"] as const) ?? "carbon"}
    />
  )
}

function PricingServiceSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)

  const columns: ComparisonColumn[] = rows(payload.tiers).map((row, index) => ({
    id: `tier-${index}`,
    name: str(row.name) ?? "",
    caption: str(row.caption),
    popular: row.popular === true,
  }))

  const tableRows: ComparisonRow[] = rows(payload.rows).map((row) => ({
    feature: str(row.feature) ?? "",
    values: rows(row.values).map((cell) => str(cell.value) ?? ""),
  }))

  const actions: PricingCtaAction[] = rows(payload.actions).flatMap((row) => {
    const label = str(row.label)
    const href = str(row.href)
    if (!label || !href) {
      return []
    }
    return [{ label, href, variant: pick(row.variant, ["primary", "secondary"] as const) }]
  })

  const included: FeatureGridItem[] = rows(payload.included).map((row, index) => ({
    id: `included-${index}`,
    icon: resolveBlockIcon(str(row.icon)),
    title: str(row.title) ?? "",
    description: str(row.description) ?? "",
  }))

  return (
    <PricingServiceSection
      kicker={str(payload.kicker)}
      heading={str(payload.heading) ?? ""}
      body={str(payload.body)}
      columns={columns}
      rows={tableRows}
      footnote={str(payload.footnote)}
      actions={actions}
      includedHeading={str(payload.includedHeading)}
      included={included}
    />
  )
}

function TestimonialsShowcaseBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const summaryData = record(payload.summary)

  const tiers: RatingBreakdownTier[] = rows(summaryData.tiers).flatMap((row) => {
    const stars = clampRating(row.stars)
    const count = num(row.count)
    if (stars === undefined || count === undefined) {
      return []
    }
    return [{ stars, count }]
  })

  const sentimentSegments: DonutSegment[] = rows(summaryData.sentimentSegments).flatMap((row) => {
    const label = str(row.label)
    const value = num(row.value)
    if (!label || value === undefined) {
      return []
    }
    return [{ label, value, tone: pick(row.tone, ACCENT_TONES) ?? "teal" }]
  })

  const summary: TestimonialsSectionSummary = {
    overallRating: num(summaryData.overallRating) ?? 0,
    totalReviews: num(summaryData.totalReviews) ?? 0,
    tiers,
    sentimentSegments,
    trend: rows(summaryData.trend).map((row) => num(row.value) ?? 0),
    recommendPercentage: num(summaryData.recommendPercentage) ?? 0,
    meta: str(summaryData.meta),
  }

  return (
    <TestimonialsSection
      kicker={str(payload.kicker)}
      heading={str(payload.heading) ?? ""}
      body={str(payload.body)}
      summary={summary}
      testimonials={testimonialEntries(payload.testimonials)}
    />
  )
}

function PromoCampaignSectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const cta = record(payload.cta)

  const stats: StatCounterEntry[] = rows(payload.stats).map((row, index) => ({
    id: `stat-${index}`,
    label: str(row.label) ?? "",
    value: num(row.value) ?? 0,
    decimals: num(row.decimals),
    prefix: str(row.prefix),
    suffix: str(row.suffix),
    tone: pick(row.tone, ACCENT_TONES),
  }))

  const bullets: FeatureSpotlightBullet[] = rows(payload.spotlightBullets).flatMap((row) => {
    const label = str(row.label)
    return label ? [{ label }] : []
  })

  const spotlight = uploadToMedia(payload.spotlightImage)
  const spotlightVisual: ReactNode = spotlight ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={spotlight.url}
      alt={str(payload.spotlightImageAlt) ?? spotlight.alt}
      loading="lazy"
      decoding="async"
    />
  ) : null

  return (
    <PromoCampaignSection
      kicker={str(payload.kicker) ?? ""}
      heading={str(payload.heading) ?? ""}
      body={str(payload.body) ?? ""}
      offerLabel={str(payload.offerLabel) ?? ""}
      ctaLabel={str(cta.label) ?? "Claim the offer"}
      ctaHref={str(cta.href) ?? "/book"}
      stats={stats}
      spotlightVisual={spotlightVisual}
      spotlightHeading={str(payload.spotlightHeading) ?? ""}
      spotlightBody={str(payload.spotlightBody) ?? ""}
      spotlightBullets={bullets.length > 0 ? bullets : undefined}
    />
  )
}

/** Workshop contact points shown above the enquiry form (mirrors the section). */
const CONTACT_POINTS: ReadonlyArray<{ id: string; label: string; value: string; href?: string }> = [
  { id: "phone", label: "Phone", value: "(02) 4256 9256", href: "tel:+61242569256" },
  { id: "address", label: "Workshop", value: "Unit 2/8 Shaban St, Albion Park Rail NSW 2527" },
  { id: "hours", label: "Hours", value: "Mon-Fri from 8:00 · call to confirm bay time" },
  { id: "email", label: "Email", value: "Info@wolfpack4x4.au", href: "mailto:Info@wolfpack4x4.au" },
]

function ContactEnquirySectionBlock({ data }: SectionRendererProps) {
  const payload = record(data.payload)
  const kicker = str(payload.kicker)
  const heading = str(payload.heading) ?? "Talk to the Wolfpack bay"
  const body = str(payload.body)
  const showContactDetails = payload.showContactDetails !== false

  return (
    <section aria-label={heading}>
      <header>
        {kicker ? <span className="seo-kicker">{kicker}</span> : null}
        <h2>{heading}</h2>
        {body ? <p>{body}</p> : null}
      </header>

      {showContactDetails ? (
        <ul aria-label="Workshop contact details">
          {CONTACT_POINTS.map((point) => (
            <li key={point.id}>
              <strong>{point.label}</strong>{" "}
              {point.href ? <a href={point.href}>{point.value}</a> : <span>{point.value}</span>}
            </li>
          ))}
        </ul>
      ) : null}

      <ContactEnquiryForm />
    </section>
  )
}

/**
 * The canonical section-block-type -> renderer map. Keys are the slugs in
 * `section-blocks.ts`; merge into `BLOCK_REGISTRY` to make them renderable.
 */
export const SECTION_RENDERERS: Readonly<
  Record<string, ComponentType<{ data: BlockData<unknown>; mode?: BlockMode }>>
> = {
  "website-hero": WebsiteHeroSectionBlock,
  "video-hero": VideoHeroSectionBlock,
  "service-overview": ServiceOverviewSectionBlock,
  "workshop-trust": WorkshopTrustSectionBlock,
  "before-after-gallery": BeforeAfterGalleryBlock,
  "section-cta": SectionCtaBlock,
  "pricing-service": PricingServiceSectionBlock,
  "testimonials-showcase": TestimonialsShowcaseBlock,
  "promo-campaign": PromoCampaignSectionBlock,
  "contact-enquiry": ContactEnquirySectionBlock,
}
