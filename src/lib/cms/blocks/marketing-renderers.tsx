"use client"

/**
 * Render adapters: stored marketing-block rows -> the marketing-section
 * primitives. One thin wrapper per `blockType` in `marketing-blocks.ts`,
 * keyed by slug in `MARKETING_RENDERERS` so it slots into the same dispatch
 * shape as `BLOCK_REGISTRY` in `render-registry.tsx`.
 *
 * Each wrapper receives the `BlockData<unknown>` envelope produced by
 * `mapBlocks` (`data.payload` = the stored block fields with id/blockType/
 * blockName stripped) and maps it onto the component props:
 * - array-item ids derive from the index (`item-${index}`) — deterministic,
 *   no `Math.random`, no hydration drift.
 * - stored icon names resolve through `resolveBlockIcon`.
 * - upload fields pass through `uploadToImage`, which only yields an image
 *   for populated media docs (an unpopulated id renders no visual).
 *
 * The file is a Client Component because `NewsletterCta` takes an `onSubmit`
 * function prop — a no-op here — which cannot cross a server/client
 * boundary. The server-side block dispatcher renders these like any other
 * client primitive.
 */

import type { ComponentType } from "react"

import type { BlockData, BlockMode } from "@/app/ui-primitives/components/block-editor"
import {
  FaqAccordion,
  FeatureGrid,
  FeatureSpotlight,
  FooterMegamap,
  LogoCloud,
  NewsletterCta,
  PricingCtaSection,
  ProcessSteps,
  StatCounterRow,
  TestimonialWall,
  TextFirstHero,
} from "@/app/ui-primitives/components/marketing"

import { resolveBlockIcon } from "./icon-options"

/* ------------------------------------------------------------------ *
 * Shared helpers
 * ------------------------------------------------------------------ */

interface MarketingRendererProps {
  data: BlockData<unknown>
  mode?: BlockMode
}

type MarketingRenderer = ComponentType<MarketingRendererProps>

/** Contain the one unavoidable cast from the dynamic envelope payload. */
function payloadAs<T>(data: BlockData<unknown>): T {
  return data.payload as T
}

/** Narrow a stored select value to a literal union, with a fallback. */
function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback
}

/** Narrow a stored optional select value to a literal union, else undefined. */
function pickOptional<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined
}

/**
 * Resolve a Payload upload value. Populated media docs (objects) yield a
 * URL (falling back to the local `/media/cms/<filename>` static path) and
 * alt text; unpopulated ids (string/number) yield null.
 */
function uploadToImage(value: unknown): { url: string; alt: string } | null {
  if (typeof value !== "object" || value === null) {
    return null
  }
  const doc = value as { url?: unknown; alt?: unknown; filename?: unknown }
  const url =
    typeof doc.url === "string" && doc.url.length > 0
      ? doc.url
      : typeof doc.filename === "string" && doc.filename.length > 0
        ? `/media/cms/${doc.filename}`
        : null
  if (!url) {
    return null
  }
  return { url, alt: typeof doc.alt === "string" ? doc.alt : "" }
}

interface StoredAction {
  label?: string | null
  href?: string | null
  tone?: string | null
  variant?: string | null
}

/** An optional `{ label, href }` group counts only when both are present. */
function hasAction(action: StoredAction | null | undefined): action is StoredAction & { label: string; href: string } {
  return Boolean(action?.label && action?.href)
}

const HERO_ACTION_TONES = ["red", "chrome", "ghost"] as const
const HERO_LAYOUTS = ["left-aligned", "centered", "split-credit"] as const
const AVATAR_TONES = ["red", "amber", "teal", "green", "obsidian"] as const
const STAT_TONES = ["red", "amber", "teal", "green"] as const
const CARD_SPANS = ["short", "regular", "tall"] as const
const GRID_COLUMNS = ["2", "3", "4"] as const
const RATINGS = ["1", "2", "3", "4", "5"] as const
const ACTION_VARIANTS = ["primary", "secondary"] as const

/* ------------------------------------------------------------------ *
 * text-first-hero
 * ------------------------------------------------------------------ */

interface StoredTextFirstHero {
  kicker?: string | null
  headline?: string | null
  subhead?: string | null
  primaryAction?: StoredAction | null
  secondaryAction?: StoredAction | null
  trust?: ReadonlyArray<{ label?: string | null; value?: string | null }> | null
  layout?: string | null
  credit?: string | null
}

function TextFirstHeroRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredTextFirstHero>(data)
  const trust = (payload.trust ?? []).map((item) => ({
    label: item.label ?? "",
    value: item.value ?? "",
  }))

  return (
    <TextFirstHero
      kicker={payload.kicker ?? ""}
      headline={payload.headline ?? ""}
      subhead={payload.subhead ?? ""}
      primaryAction={{
        label: payload.primaryAction?.label ?? "",
        href: payload.primaryAction?.href ?? "#",
        tone: pickOptional(payload.primaryAction?.tone, HERO_ACTION_TONES),
      }}
      secondaryAction={
        hasAction(payload.secondaryAction)
          ? {
              label: payload.secondaryAction.label,
              href: payload.secondaryAction.href,
              tone: pickOptional(payload.secondaryAction.tone, HERO_ACTION_TONES),
            }
          : undefined
      }
      trust={trust.length > 0 ? trust : undefined}
      layout={pick(payload.layout, HERO_LAYOUTS, "left-aligned")}
      credit={payload.credit || undefined}
    />
  )
}

/* ------------------------------------------------------------------ *
 * feature-grid
 * ------------------------------------------------------------------ */

interface StoredFeatureGrid {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  columns?: string | null
  features?: ReadonlyArray<{
    icon?: string | null
    title?: string | null
    description?: string | null
    href?: string | null
    linkLabel?: string | null
  }> | null
}

function FeatureGridRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredFeatureGrid>(data)

  return (
    <FeatureGrid
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      columns={Number(pick(payload.columns, GRID_COLUMNS, "3")) as 2 | 3 | 4}
      features={(payload.features ?? []).map((feature, index) => ({
        id: `item-${index}`,
        icon: resolveBlockIcon(feature.icon),
        title: feature.title ?? "",
        description: feature.description ?? "",
        href: feature.href || undefined,
        linkLabel: feature.linkLabel || undefined,
      }))}
    />
  )
}

/* ------------------------------------------------------------------ *
 * feature-spotlight
 * ------------------------------------------------------------------ */

interface StoredFeatureSpotlight {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  image?: unknown
  imageAlt?: string | null
  bullets?: ReadonlyArray<{ icon?: string | null; label?: string | null }> | null
  action?: StoredAction | null
  reversed?: boolean | null
}

function FeatureSpotlightRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredFeatureSpotlight>(data)
  const image = uploadToImage(payload.image)

  return (
    <FeatureSpotlight
      kicker={payload.kicker ?? ""}
      heading={payload.heading ?? ""}
      body={payload.body ?? ""}
      visual={
        image ? <img src={image.url} alt={payload.imageAlt || image.alt} loading="lazy" /> : null
      }
      bullets={(payload.bullets ?? []).map((bullet) => ({
        icon: bullet.icon ? resolveBlockIcon(bullet.icon) : undefined,
        label: bullet.label ?? "",
      }))}
      action={
        hasAction(payload.action)
          ? { label: payload.action.label, href: payload.action.href }
          : undefined
      }
      reversed={Boolean(payload.reversed)}
    />
  )
}

/* ------------------------------------------------------------------ *
 * testimonial-wall
 * ------------------------------------------------------------------ */

interface StoredTestimonialWall {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  entries?: ReadonlyArray<{
    quote?: string | null
    name?: string | null
    role?: string | null
    tone?: string | null
    rating?: string | null
    span?: string | null
  }> | null
}

function TestimonialWallRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredTestimonialWall>(data)

  return (
    <TestimonialWall
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      entries={(payload.entries ?? []).map((entry, index) => {
        const rating = pickOptional(entry.rating, RATINGS)
        return {
          id: `item-${index}`,
          quote: entry.quote ?? "",
          name: entry.name ?? "",
          role: entry.role ?? "",
          tone: pickOptional(entry.tone, AVATAR_TONES),
          rating: rating ? (Number(rating) as 1 | 2 | 3 | 4 | 5) : undefined,
          span: pickOptional(entry.span, CARD_SPANS),
        }
      })}
    />
  )
}

/* ------------------------------------------------------------------ *
 * pricing-cta-section
 * ------------------------------------------------------------------ */

interface StoredPricingCtaSection {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  columns?: ReadonlyArray<{
    name?: string | null
    caption?: string | null
    popular?: boolean | null
  }> | null
  rows?: ReadonlyArray<{
    feature?: string | null
    description?: string | null
    values?: ReadonlyArray<{ value?: string | null }> | null
  }> | null
  footnote?: string | null
  actions?: ReadonlyArray<StoredAction> | null
}

function PricingCtaSectionRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredPricingCtaSection>(data)

  return (
    <PricingCtaSection
      kicker={payload.kicker || undefined}
      heading={payload.heading ?? ""}
      body={payload.body || undefined}
      columns={(payload.columns ?? []).map((column, index) => ({
        id: `col-${index}`,
        name: column.name ?? "",
        caption: column.caption || undefined,
        popular: Boolean(column.popular),
      }))}
      rows={(payload.rows ?? []).map((row) => ({
        feature: row.feature ?? "",
        description: row.description || undefined,
        values: (row.values ?? []).map((cell) => cell.value ?? ""),
      }))}
      footnote={payload.footnote || undefined}
      actions={(payload.actions ?? []).map((action) => ({
        label: action.label ?? "",
        href: action.href ?? "#",
        variant: pickOptional(action.variant, ACTION_VARIANTS),
      }))}
    />
  )
}

/* ------------------------------------------------------------------ *
 * faq-accordion
 * ------------------------------------------------------------------ */

interface StoredFaqAccordion {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  items?: ReadonlyArray<{
    question?: string | null
    answer?: string | null
    defaultOpen?: boolean | null
  }> | null
}

function FaqAccordionRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredFaqAccordion>(data)
  const items = payload.items ?? []
  const openIndex = items.findIndex((item) => Boolean(item.defaultOpen))

  return (
    <FaqAccordion
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      items={items.map((item, index) => ({
        id: `item-${index}`,
        question: item.question ?? "",
        answer: item.answer ?? "",
      }))}
      defaultOpenId={openIndex >= 0 ? `item-${openIndex}` : undefined}
    />
  )
}

/* ------------------------------------------------------------------ *
 * logo-cloud
 * ------------------------------------------------------------------ */

interface StoredLogoCloud {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  entries?: ReadonlyArray<{ name?: string | null; icon?: string | null }> | null
}

function LogoCloudRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredLogoCloud>(data)

  return (
    <LogoCloud
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      entries={(payload.entries ?? []).map((entry, index) => ({
        id: `item-${index}`,
        name: entry.name ?? "",
        mark: resolveBlockIcon(entry.icon),
      }))}
    />
  )
}

/* ------------------------------------------------------------------ *
 * stat-counter-row
 * ------------------------------------------------------------------ */

interface StoredStatCounterRow {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  entries?: ReadonlyArray<{
    label?: string | null
    value?: number | null
    decimals?: number | null
    prefix?: string | null
    suffix?: string | null
    body?: string | null
    tone?: string | null
  }> | null
}

function StatCounterRowRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredStatCounterRow>(data)

  return (
    <StatCounterRow
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      entries={(payload.entries ?? []).map((entry, index) => ({
        id: `item-${index}`,
        label: entry.label ?? "",
        value: typeof entry.value === "number" ? entry.value : 0,
        decimals: entry.decimals ?? undefined,
        prefix: entry.prefix || undefined,
        suffix: entry.suffix || undefined,
        body: entry.body || undefined,
        tone: pickOptional(entry.tone, STAT_TONES),
      }))}
    />
  )
}

/* ------------------------------------------------------------------ *
 * newsletter-cta
 * ------------------------------------------------------------------ */

interface StoredNewsletterCta {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  privacyNote?: string | null
}

function NewsletterCtaRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredNewsletterCta>(data)

  return (
    <NewsletterCta
      kicker={payload.kicker || undefined}
      heading={payload.heading ?? ""}
      body={payload.body || undefined}
      ctaLabel={payload.ctaLabel || undefined}
      privacyNote={payload.privacyNote || undefined}
      onSubmit={() => {}}
    />
  )
}

/* ------------------------------------------------------------------ *
 * footer-megamap
 * ------------------------------------------------------------------ */

interface StoredFooterMegamap {
  brand?: string | null
  description?: string | null
  columns?: ReadonlyArray<{
    heading?: string | null
    links?: ReadonlyArray<{ label?: string | null; href?: string | null }> | null
  }> | null
  contact?: ReadonlyArray<{
    label?: string | null
    value?: string | null
    href?: string | null
  }> | null
  socials?: ReadonlyArray<{
    label?: string | null
    href?: string | null
    icon?: string | null
  }> | null
  legal?: string | null
  legalLinks?: ReadonlyArray<{ label?: string | null; href?: string | null }> | null
  regions?: ReadonlyArray<{ code?: string | null; label?: string | null }> | null
  selectedRegion?: string | null
}

function FooterMegamapRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredFooterMegamap>(data)
  const socials = (payload.socials ?? []).map((social, index) => ({
    id: `item-${index}`,
    label: social.label ?? "",
    href: social.href ?? "#",
    icon: resolveBlockIcon(social.icon),
  }))
  const legalLinks = (payload.legalLinks ?? []).map((link) => ({
    label: link.label ?? "",
    href: link.href ?? "#",
  }))
  const regions = (payload.regions ?? []).map((region) => ({
    code: region.code ?? "",
    label: region.label ?? "",
  }))

  return (
    <FooterMegamap
      brand={payload.brand ?? ""}
      description={payload.description ?? ""}
      columns={(payload.columns ?? []).map((column, index) => ({
        id: `col-${index}`,
        heading: column.heading ?? "",
        links: (column.links ?? []).map((link) => ({
          label: link.label ?? "",
          href: link.href ?? "#",
        })),
      }))}
      contact={(payload.contact ?? []).map((detail) => ({
        label: detail.label ?? "",
        value: detail.value ?? "",
        href: detail.href || undefined,
      }))}
      socials={socials.length > 0 ? socials : undefined}
      legal={payload.legal ?? ""}
      legalLinks={legalLinks.length > 0 ? legalLinks : undefined}
      regions={regions.length > 0 ? regions : undefined}
      selectedRegion={payload.selectedRegion || undefined}
    />
  )
}

/* ------------------------------------------------------------------ *
 * process-steps
 * ------------------------------------------------------------------ */

interface StoredProcessSteps {
  kicker?: string | null
  heading?: string | null
  body?: string | null
  steps?: ReadonlyArray<{
    icon?: string | null
    title?: string | null
    body?: string | null
  }> | null
}

function ProcessStepsRenderer({ data }: MarketingRendererProps) {
  const payload = payloadAs<StoredProcessSteps>(data)

  return (
    <ProcessSteps
      kicker={payload.kicker || undefined}
      heading={payload.heading || undefined}
      body={payload.body || undefined}
      steps={(payload.steps ?? []).map((step, index) => ({
        id: `item-${index}`,
        icon: resolveBlockIcon(step.icon),
        title: step.title ?? "",
        body: step.body ?? "",
      }))}
    />
  )
}

/* ------------------------------------------------------------------ *
 * Registry
 * ------------------------------------------------------------------ */

/**
 * Marketing blockType -> renderer map. Keys are the block slugs defined in
 * `marketing-blocks.ts`, mirroring the primitive registry.
 */
export const MARKETING_RENDERERS: Readonly<
  Record<string, ComponentType<{ data: BlockData<unknown>; mode?: BlockMode }>>
> = {
  "text-first-hero": TextFirstHeroRenderer satisfies MarketingRenderer,
  "feature-grid": FeatureGridRenderer satisfies MarketingRenderer,
  "feature-spotlight": FeatureSpotlightRenderer satisfies MarketingRenderer,
  "testimonial-wall": TestimonialWallRenderer satisfies MarketingRenderer,
  "pricing-cta-section": PricingCtaSectionRenderer satisfies MarketingRenderer,
  "faq-accordion": FaqAccordionRenderer satisfies MarketingRenderer,
  "logo-cloud": LogoCloudRenderer satisfies MarketingRenderer,
  "stat-counter-row": StatCounterRowRenderer satisfies MarketingRenderer,
  "newsletter-cta": NewsletterCtaRenderer satisfies MarketingRenderer,
  "footer-megamap": FooterMegamapRenderer satisfies MarketingRenderer,
  "process-steps": ProcessStepsRenderer satisfies MarketingRenderer,
}
