/**
 * Payload block definitions for the 11 marketing-section primitives — one
 * Block per `blockType` registered in
 * `src/lib/primitives/registry/fragments/marketing.ts`. Each block's `slug`
 * is the render-time `blockType` (mirrored in `marketing-renderers.tsx`) and
 * each field set mirrors the matching component props in
 * `src/app/ui-primitives/components/marketing`, so a stored row maps through
 * `mapBlocks` into `BlockData<T>` with only the thin adapters in
 * `marketing-renderers.tsx`.
 *
 * Conventions:
 * - ReactNode `icon`/`mark` props are stored as an `icon` select backed by
 *   `ICON_OPTIONS` and resolved at render time via `resolveBlockIcon`.
 * - ReactNode `visual` props are stored as a `media` upload plus a sibling
 *   `imageAlt` text field.
 * - Action/CTA props are stored as `{ label, href }` groups (plus a tone or
 *   variant select where the component supports one). Optional actions keep
 *   their subfields optional; the renderer drops the action unless both
 *   label and href are present.
 * - Payload's `Block` admin config has no `description` key, so each block's
 *   human-readable description lives in `admin.custom.description`.
 * - Labels are prefixed "Marketing — " so the block picker groups visually.
 */

import type { Block } from "payload"

import { ICON_OPTIONS } from "./icon-options.ts"

const HERO_ACTION_TONE_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Chrome", value: "chrome" },
  { label: "Ghost", value: "ghost" },
]

const AVATAR_TONE_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Amber", value: "amber" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
  { label: "Obsidian", value: "obsidian" },
]

const STAT_TONE_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Amber", value: "amber" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
]

const textFirstHero: Block = {
  slug: "text-first-hero",
  dbName: "tfh",
  interfaceName: "TextFirstHeroBlockData",
  labels: { singular: "Marketing — Text-first hero", plural: "Marketing — Text-first heroes" },
  admin: {
    custom: {
      description:
        "Editorial text-first hero with kicker, display headline, subhead, primary/secondary CTAs, optional trust strip, and layout variants.",
    },
  },
  fields: [
    { name: "kicker", type: "text", required: true },
    { name: "headline", type: "text", required: true },
    { name: "subhead", type: "textarea", required: true },
    {
      name: "primaryAction",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "tone", type: "select", defaultValue: "red", options: HERO_ACTION_TONE_OPTIONS },
      ],
    },
    {
      name: "secondaryAction",
      type: "group",
      admin: { description: "Optional second CTA — leave label and href empty to omit." },
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
        { name: "tone", type: "select", options: HERO_ACTION_TONE_OPTIONS },
      ],
    },
    {
      name: "trust",
      type: "array",
      admin: { description: "Optional trust strip of value/label stats under the CTAs." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "left-aligned",
      options: [
        { label: "Left aligned", value: "left-aligned" },
        { label: "Centered", value: "centered" },
        { label: "Split credit", value: "split-credit" },
      ],
      required: true,
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Right-aligned credit text used in the split-credit layout." },
    },
  ],
}

const featureGrid: Block = {
  slug: "feature-grid",
  dbName: "fgrid",
  interfaceName: "FeatureGridBlockData",
  labels: { singular: "Marketing — Feature grid", plural: "Marketing — Feature grids" },
  admin: {
    custom: {
      description:
        "Reveal-animated feature grid in 2/3/4 columns; each item has an icon, title, body, and optional link, under an optional header.",
    },
  },
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
      name: "features",
      type: "array",
      minRows: 1,
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "href", type: "text" },
        { name: "linkLabel", type: "text", admin: { description: 'Defaults to "Learn more".' } },
      ],
    },
  ],
}

const featureSpotlight: Block = {
  slug: "feature-spotlight",
  dbName: "fspot",
  interfaceName: "FeatureSpotlightBlockData",
  labels: { singular: "Marketing — Feature spotlight", plural: "Marketing — Feature spotlights" },
  admin: {
    custom: {
      description:
        "Single feature row pairing a visual with copy (kicker, heading, body, bullets, action) in a reversible layout.",
    },
  },
  fields: [
    { name: "kicker", type: "text", required: true },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imageAlt", type: "text" },
    {
      name: "bullets",
      type: "array",
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "action",
      type: "group",
      admin: { description: "Optional CTA — leave label and href empty to omit." },
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "reversed",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "When checked, the visual sits on the right and copy on the left." },
    },
  ],
}

const testimonialWall: Block = {
  slug: "testimonial-wall",
  dbName: "twall",
  interfaceName: "TestimonialWallBlockData",
  labels: { singular: "Marketing — Testimonial wall", plural: "Marketing — Testimonial walls" },
  admin: {
    custom: {
      description:
        "Masonry-style testimonial grid with varied card heights, star ratings, quote, and avatar attribution.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "entries",
      type: "array",
      minRows: 1,
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "tone", type: "select", options: AVATAR_TONE_OPTIONS },
        {
          name: "rating",
          type: "select",
          options: [
            { label: "1 star", value: "1" },
            { label: "2 stars", value: "2" },
            { label: "3 stars", value: "3" },
            { label: "4 stars", value: "4" },
            { label: "5 stars", value: "5" },
          ],
        },
        {
          name: "span",
          type: "select",
          options: [
            { label: "Short", value: "short" },
            { label: "Regular", value: "regular" },
            { label: "Tall", value: "tall" },
          ],
          admin: { description: "Optional emphasis — varies card height visually." },
        },
      ],
    },
  ],
}

const pricingCtaSection: Block = {
  slug: "pricing-cta-section",
  dbName: "pcta",
  interfaceName: "PricingCtaSectionBlockData",
  labels: { singular: "Marketing — Pricing CTA section", plural: "Marketing — Pricing CTA sections" },
  admin: {
    custom: {
      description:
        "Pricing section wrapping a comparison table with a header, optional body/footnote, and a final CTA action row.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "columns",
      type: "array",
      minRows: 1,
      admin: { description: "Pricing tiers — one column per plan." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "caption", type: "text" },
        { name: "popular", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 1,
      admin: { description: "Feature rows compared across the pricing columns." },
      fields: [
        { name: "feature", type: "text", required: true },
        { name: "description", type: "text" },
        {
          name: "values",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
              admin: {
                description: '"check", "cross", "dot", or literal text — one per pricing column, in order.',
              },
            },
          ],
        },
      ],
    },
    { name: "footnote", type: "textarea" },
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
        },
      ],
    },
  ],
}

const faqAccordion: Block = {
  slug: "faq-accordion",
  dbName: "faqacc",
  interfaceName: "FaqAccordionBlockData",
  labels: { singular: "Marketing — FAQ accordion", plural: "Marketing — FAQ accordions" },
  admin: {
    custom: {
      description:
        "Accordion of question/answer items with chevron indicators and an optional default-open item.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
        {
          name: "defaultOpen",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Expand this item initially (the first checked item wins)." },
        },
      ],
    },
  ],
}

const logoCloud: Block = {
  slug: "logo-cloud",
  dbName: "lcloud",
  interfaceName: "LogoCloudBlockData",
  labels: { singular: "Marketing — Logo cloud", plural: "Marketing — Logo clouds" },
  admin: {
    custom: {
      description:
        "Muted wall of partner brand marks with accessible labels and a staggered fade-in reveal under an optional header.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "entries",
      type: "array",
      minRows: 1,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "icon", type: "select", options: ICON_OPTIONS },
      ],
    },
  ],
}

const statCounterRow: Block = {
  slug: "stat-counter-row",
  dbName: "stats",
  interfaceName: "StatCounterRowBlockData",
  labels: { singular: "Marketing — Stat counter row", plural: "Marketing — Stat counter rows" },
  admin: {
    custom: {
      description:
        "Row of big stat counters with in-view count-up animation, per-entry tone, prefix/suffix/decimals, label, and supporting copy.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "entries",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "number", defaultValue: 0, required: true },
        { name: "decimals", type: "number" },
        { name: "prefix", type: "text", admin: { description: "E.g. `$`." } },
        { name: "suffix", type: "text", admin: { description: "E.g. `km`, `%`." } },
        { name: "body", type: "textarea" },
        { name: "tone", type: "select", defaultValue: "amber", options: STAT_TONE_OPTIONS },
      ],
    },
  ],
}

const newsletterCta: Block = {
  slug: "newsletter-cta",
  dbName: "newscta",
  interfaceName: "NewsletterCtaBlockData",
  labels: { singular: "Marketing — Newsletter CTA", plural: "Marketing — Newsletter CTAs" },
  admin: {
    custom: {
      description:
        "Conversion newsletter sign-up with heading/body, email field, submit states, and a privacy line.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "ctaLabel", type: "text", admin: { description: 'Submit button label — defaults to "Subscribe".' } },
    { name: "privacyNote", type: "text", admin: { description: "Privacy fineprint shown beneath the field." } },
  ],
}

const footerMegamap: Block = {
  slug: "footer-megamap",
  dbName: "fmega",
  interfaceName: "FooterMegamapBlockData",
  labels: { singular: "Marketing — Footer megamap", plural: "Marketing — Footer megamaps" },
  admin: {
    custom: {
      description:
        "WARNING: duplicates the site shell footer — intended for standalone landing pages only. Full footer with brand block, optional region selector, multi-column sitemap nav, contact details, social links, and a legal bar.",
    },
  },
  fields: [
    {
      name: "brand",
      type: "text",
      required: true,
      admin: { description: "Brand wordmark text shown in the footer brand block." },
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "columns",
      type: "array",
      minRows: 1,
      admin: { description: "Sitemap columns." },
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "links",
          type: "array",
          minRows: 1,
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "contact",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "icon", type: "select", options: ICON_OPTIONS },
      ],
    },
    { name: "legal", type: "text", required: true },
    {
      name: "legalLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "regions",
      type: "array",
      admin: { description: "Optional region selector options." },
      fields: [
        { name: "code", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "selectedRegion",
      type: "text",
      admin: { description: "Code of the initially selected region." },
    },
  ],
}

const processSteps: Block = {
  slug: "process-steps",
  dbName: "psteps",
  interfaceName: "ProcessStepsBlockData",
  labels: { singular: "Marketing — Process steps", plural: "Marketing — Process steps" },
  admin: {
    custom: {
      description:
        "Ordered process-steps list (3-5) connected by a line; each step has a numbered badge, icon, title, and body.",
    },
  },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "steps",
      type: "array",
      minRows: 3,
      maxRows: 5,
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
}

/**
 * The marketing block list for the CMS `blocks` field. Order controls the
 * admin block-picker order. Slugs are the render-time block types.
 */
export const marketingBlocks: Block[] = [
  textFirstHero,
  featureGrid,
  featureSpotlight,
  testimonialWall,
  pricingCtaSection,
  faqAccordion,
  logoCloud,
  statCounterRow,
  newsletterCta,
  footerMegamap,
  processSteps,
]
