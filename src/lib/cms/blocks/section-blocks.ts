/**
 * Payload block definitions for the 10 curated section-library "section
 * blocks" — one Block per premium page section. Each block's `slug` is the
 * render-time `blockType` (mirrored in `section-renderers.tsx` and the
 * `section-blocks` registry fragment) and each field set is derived from the
 * section's authoritative `*.manifest.ts` propsSchema/editableFields.
 *
 * Conventions (matching `payload-blocks.ts`):
 *   - kebab-case slug, `interfaceName` like `WebsiteHeroBlockData`
 *   - ReactNode icon slots -> `select` over the curated `ICON_OPTIONS`
 *   - images -> `upload` against the `media` collection + an alt text field
 *   - actions -> `group` of `{ label, href }`
 *
 * Payload's `Block.admin` has no first-class `description`, so each block
 * carries it under `admin.custom.description` and groups under "Sections"
 * in the block-picker drawer.
 */

import type { Block } from "payload"

import { ICON_OPTIONS } from "./icon-options.ts"

const AVATAR_TONE_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Amber", value: "amber" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
  { label: "Obsidian", value: "obsidian" },
]

const ACCENT_TONE_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Amber", value: "amber" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
]

const CARD_SPAN_OPTIONS = [
  { label: "Short", value: "short" },
  { label: "Regular", value: "regular" },
  { label: "Tall", value: "tall" },
]

/** Shared admin meta — description lives in `custom` (no first-class slot). */
function sectionAdmin(description: string): Block["admin"] {
  return { custom: { description }, group: "Sections" }
}

/** Testimonial row fields, shared by workshop-trust and testimonials-showcase. */
const TESTIMONIAL_FIELDS: Block["fields"] = [
  { name: "quote", type: "textarea", required: true },
  { name: "name", type: "text", required: true },
  { name: "role", type: "text", required: true, admin: { description: "Vehicle / suburb, e.g. 'VDJ79 · Kiama'." } },
  { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
  { name: "tone", type: "select", options: AVATAR_TONE_OPTIONS },
  { name: "span", type: "select", options: CARD_SPAN_OPTIONS, admin: { description: "Card height in the masonry wall." } },
]

const websiteHero: Block = {
  slug: "website-hero",
  dbName: "whero",
  interfaceName: "WebsiteHeroBlockData",
  labels: { singular: "Section — Website hero", plural: "Section — Website heroes" },
  admin: sectionAdmin(
    "Top-of-page brand hero — display headline, dual metallic CTA, trust strip, and the carbon-fibre workshop-status panel.",
  ),
  fields: [
    { name: "kicker", type: "text", admin: { description: "Eyebrow line above the headline." } },
    {
      name: "headlineLines",
      type: "array",
      minRows: 1,
      admin: { description: "Display headline — one line per row." },
      fields: [{ name: "line", type: "text", required: true }],
    },
    { name: "subhead", type: "textarea" },
    { name: "primaryLabel", type: "text", required: true },
    { name: "primaryHref", type: "text", required: true },
    { name: "secondaryLabel", type: "text" },
    { name: "secondaryHref", type: "text" },
  ],
}

const videoHero: Block = {
  slug: "video-hero",
  dbName: "vhero",
  interfaceName: "VideoHeroBlockData",
  labels: { singular: "Section — Video hero", plural: "Section — Video heroes" },
  admin: sectionAdmin(
    "Full-bleed cinematic looping video hero with a poster fallback and a metallic CTA. Pauses under reduced motion.",
  ),
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "subhead", type: "textarea", required: true },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      admin: { description: "Muted mp4 loop, 1920x1080. Falls back to the poster when absent." },
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Poster frame — first paint + reduced-motion fallback." },
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    { name: "timestampLabel", type: "text", admin: { description: "Overlay label, e.g. 'Oak Flats workshop · live bay'." } },
  ],
}

const serviceOverview: Block = {
  slug: "service-overview",
  dbName: "sover",
  interfaceName: "ServiceOverviewBlockData",
  labels: { singular: "Section — Service overview", plural: "Section — Service overviews" },
  admin: sectionAdmin(
    "Grid of core workshop services with icons, descriptions, and per-card deep links. 2-6 cards, 2/3/4 columns.",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "columns",
      type: "select",
      defaultValue: "3",
      options: [
        { label: "2 columns", value: "2" },
        { label: "3 columns", value: "3" },
        { label: "4 columns", value: "4" },
      ],
      required: true,
    },
    {
      name: "services",
      type: "array",
      minRows: 2,
      admin: { description: "Leave empty to fall back to the core Wolfpack 4x4 services." },
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "href", type: "text" },
        { name: "linkLabel", type: "text" },
      ],
    },
  ],
}

const workshopTrust: Block = {
  slug: "workshop-trust",
  dbName: "wtrust",
  interfaceName: "WorkshopTrustBlockData",
  labels: { singular: "Section — Workshop trust", plural: "Section — Workshop trust sections" },
  admin: sectionAdmin(
    "Social proof — masonry testimonial wall with star ratings plus a supplier brand-mark logo cloud.",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "testimonials",
      type: "array",
      minRows: 1,
      admin: { description: "Leave empty to fall back to the five house reviews." },
      fields: TESTIMONIAL_FIELDS,
    },
    {
      name: "brands",
      type: "array",
      admin: { description: "Supplier names. Leave empty to show the seven house brand marks." },
      fields: [{ name: "name", type: "text", required: true }],
    },
  ],
}

const beforeAfterGallery: Block = {
  slug: "before-after-gallery",
  dbName: "beforeafter",
  interfaceName: "BeforeAfterGalleryBlockData",
  labels: { singular: "Section — Before/after gallery", plural: "Section — Before/after galleries" },
  admin: sectionAdmin(
    "Grid of job cards that toggle between the stock photo and the finished install, with an optional result chip.",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true, admin: { description: "Vehicle / job title, e.g. 'VDJ79 — 4in turbo-back'." } },
        { name: "summary", type: "textarea", required: true },
        { name: "beforeImage", type: "upload", relationTo: "media", required: true },
        { name: "beforeAlt", type: "text" },
        { name: "afterImage", type: "upload", relationTo: "media", required: true },
        { name: "afterAlt", type: "text" },
        { name: "result", type: "text", admin: { description: "Result chip, e.g. '+38rwkW'." } },
      ],
    },
  ],
}

const sectionCta: Block = {
  slug: "section-cta",
  dbName: "scta",
  interfaceName: "SectionCtaBlockData",
  labels: { singular: "Section — CTA banner", plural: "Section — CTA banners" },
  admin: sectionAdmin(
    "High-emphasis booking CTA with a metallic-red primary action, carbon outline secondary, and a trust assurance row.",
  ),
  fields: [
    { name: "kicker", type: "text", required: true },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    {
      name: "primaryAction",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "secondaryAction",
      type: "group",
      admin: { description: "Optional carbon-outline action. Leave both fields empty to hide." },
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "assurances",
      type: "array",
      admin: { description: "2-4 short trust lines beneath the actions." },
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS, required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "tone",
      type: "select",
      defaultValue: "carbon",
      options: [
        { label: "Carbon", value: "carbon" },
        { label: "Metallic", value: "metallic" },
      ],
      required: true,
    },
  ],
}

const pricingService: Block = {
  slug: "pricing-service",
  dbName: "pserve",
  interfaceName: "PricingServiceBlockData",
  labels: { singular: "Section — Pricing & service", plural: "Section — Pricing & service sections" },
  admin: sectionAdmin(
    "Service-tier comparison table with pricing CTAs above an always-included feature grid of guarantees.",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "tiers",
      type: "array",
      minRows: 1,
      admin: { description: "Service tiers — the comparison table columns." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "caption", type: "text", admin: { description: "e.g. 'From $1,290 fitted'." } },
        { name: "popular", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 1,
      admin: { description: "Comparison line-items." },
      fields: [
        { name: "feature", type: "text", required: true },
        {
          name: "values",
          type: "array",
          admin: { description: "One cell per tier, in order: check, cross, dot, or free text." },
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
    { name: "footnote", type: "text" },
    {
      name: "actions",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "variant",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
          required: true,
        },
      ],
    },
    { name: "includedHeading", type: "text" },
    {
      name: "included",
      type: "array",
      minRows: 1,
      admin: { description: "Always-included guarantees shown beneath the table." },
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
}

const testimonialsShowcase: Block = {
  slug: "testimonials-showcase",
  dbName: "tstshow",
  interfaceName: "TestimonialsShowcaseBlockData",
  labels: { singular: "Section — Testimonials showcase", plural: "Section — Testimonials showcases" },
  admin: sectionAdmin(
    "Aggregate review summary (rating, breakdown, sentiment donut, trend) beside a masonry wall of customer quotes.",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "summary",
      type: "group",
      fields: [
        { name: "overallRating", type: "number", min: 0, max: 5, required: true },
        { name: "totalReviews", type: "number", min: 0, required: true },
        { name: "recommendPercentage", type: "number", min: 0, max: 100, required: true },
        { name: "meta", type: "text", admin: { description: "e.g. 'Across all jobs · last 90 days'." } },
        {
          name: "tiers",
          type: "array",
          minRows: 1,
          admin: { description: "Star-rating breakdown bars (one row per star tier)." },
          fields: [
            { name: "stars", type: "number", min: 1, max: 5, required: true },
            { name: "count", type: "number", min: 0, required: true },
          ],
        },
        {
          name: "sentimentSegments",
          type: "array",
          dbName: "sentiment",
          admin: { description: "Sentiment donut segments." },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "number", required: true },
            { name: "tone", type: "select", defaultValue: "teal", options: ACCENT_TONE_OPTIONS, required: true },
          ],
        },
        {
          name: "trend",
          type: "array",
          admin: { description: "Rating trend sparkline values, oldest first." },
          fields: [{ name: "value", type: "number", required: true }],
        },
      ],
    },
    {
      name: "testimonials",
      type: "array",
      minRows: 1,
      fields: TESTIMONIAL_FIELDS,
    },
  ],
}

const promoCampaign: Block = {
  slug: "promo-campaign",
  dbName: "promo",
  interfaceName: "PromoCampaignBlockData",
  labels: { singular: "Section — Promo campaign", plural: "Section — Promo campaigns" },
  admin: sectionAdmin(
    "Time-boxed offer banner with a metallic CTA, a count-up stat row, and a product spotlight.",
  ),
  fields: [
    { name: "kicker", type: "text", required: true },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "offerLabel", type: "text", required: true, admin: { description: "Offer pill, e.g. 'Save $200 · ends 30 Jun'." } },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "stats",
      type: "array",
      minRows: 1,
      admin: { description: "Headline metrics for the count-up row." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "number", required: true },
        { name: "prefix", type: "text" },
        { name: "suffix", type: "text" },
        { name: "decimals", type: "number", min: 0, max: 3 },
        { name: "tone", type: "select", options: ACCENT_TONE_OPTIONS },
      ],
    },
    { name: "spotlightImage", type: "upload", relationTo: "media" },
    { name: "spotlightImageAlt", type: "text" },
    { name: "spotlightHeading", type: "text", required: true },
    { name: "spotlightBody", type: "textarea", required: true },
    {
      name: "spotlightBullets",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
}

const contactEnquiry: Block = {
  slug: "contact-enquiry",
  dbName: "cenq",
  interfaceName: "ContactEnquiryBlockData",
  labels: { singular: "Section — Contact & enquiry", plural: "Section — Contact & enquiry sections" },
  admin: sectionAdmin(
    "Contact section heading + workshop details above the enquiry form (posts to /api/enquiries).",
  ),
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "showContactDetails",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show the workshop phone / address / hours / email list above the form." },
    },
  ],
}

/**
 * The canonical section-block list for the CMS `blocks` field. Order controls
 * the admin block-picker order. Slugs are the render-time block types.
 */
export const sectionBlocks: Block[] = [
  websiteHero,
  videoHero,
  serviceOverview,
  workshopTrust,
  beforeAfterGallery,
  sectionCta,
  pricingService,
  testimonialsShowcase,
  promoCampaign,
  contactEnquiry,
]
