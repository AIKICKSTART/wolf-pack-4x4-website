/**
 * Mock fixtures for the CMS schema — used by previews/tests and to demonstrate
 * the full document shape end to end. Every renderable value is token-driven via
 * the borrowed `StyleProfile`; no literal colors/sizes appear here.
 *
 * The fixtures model one realistic Oak Flats Mufflermen service page travelling
 * through the workflow: a `PageTemplate` → a `CmsPage` in `review` with an
 * approval gate pending → a two-entry `VersionHistory`.
 */

import { createBlock, createPage, DEFAULT_STYLE_PROFILE } from "../model"
import type { Block } from "../model"
import type { BlockManifest } from "../model"
import type { CmsPage } from "./cms-page"
import { CMS_PAGE_SCHEMA_VERSION } from "./cms-page"
import type { ContentBlockDef, ReusableBlockDef } from "./content-block"
import type { HeaderConfig, FooterConfig } from "./header-footer"
import type { PageTemplate, SectionTemplate } from "./page-template"
import type { SeoConfig } from "./seo"
import type { SocialSchemaConfig } from "./social-schema"
import type { PageVersion, VersionHistory } from "./version-history"
import type { WorkflowStatus } from "./workflow"

const NOW = "2026-05-29T00:00:00.000Z"

/** A CTA content-block def aligned to the Payload `cta` block. */
export const ctaBlockDef: ContentBlockDef = {
  blockType: "cta",
  label: "Call to action",
  description: "Heading, body, and a primary button — the conversion surface.",
  category: "Marketing",
  kind: "component",
  scope: "core",
  version: "1.0.0",
  propsSchema: {
    fields: [
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: true },
      { key: "buttonLabel", type: "string", required: true },
      { key: "buttonHref", type: "url", required: true },
      { key: "tone", type: "enum", required: true, options: ["neutral", "teal", "amber", "red", "green", "violet"] },
    ],
  },
  defaultProps: {
    heading: "Book your exhaust service today",
    body: "Same-day inspection, honest quote, back on the road.",
    buttonLabel: "Book now",
    buttonHref: "/book",
    tone: "red",
  },
  editableFields: [
    { path: "heading", label: "Heading", control: "text", valueType: "string" },
    { path: "body", label: "Body", control: "textarea", valueType: "string" },
    { path: "buttonLabel", label: "Button label", control: "text", valueType: "string" },
    { path: "buttonHref", label: "Button link", control: "url", valueType: "url" },
    {
      path: "tone",
      label: "Tone",
      control: "select",
      valueType: "enum",
      options: ["neutral", "teal", "amber", "red", "green", "violet"],
    },
  ],
  tokenDependencies: [
    { token: "--primitive-btn-primary-bg", category: "button", usage: "CTA button background" },
    { token: "--primitive-text-strong", category: "color", usage: "heading color" },
    { token: "--primitive-space-10", category: "space", usage: "block padding" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card radius" },
  ],
  persistsToPayload: true,
  tags: ["conversion", "marketing"],
}

/** A reusable warranty callout referenced across service pages. */
export const warrantyCallout: ReusableBlockDef = {
  id: "reusable_warranty-callout",
  name: "Lifetime warranty callout",
  blockType: "callout",
  props: {
    kind: "tip",
    title: "Lifetime workmanship warranty",
    body: "Every exhaust we fit is backed for as long as you own the vehicle.",
    dismissible: false,
  },
  createdAt: NOW,
  updatedAt: NOW,
}

/** A minimal hero manifest so the section template can instantiate a block. */
const heroManifest: BlockManifest = {
  type: "hero/service",
  name: "Service hero",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary: "Service-page hero.",
  componentPath: "@/app/ui-primitives/components/hero",
  importName: "ServiceHero",
  propsSchema: { fields: [{ key: "headline", type: "string", required: true }] },
  defaultProps: { headline: "Custom exhaust systems" },
  editableFields: [{ path: "headline", label: "Headline", control: "text", valueType: "string" }],
  tokenDependencies: [
    { token: "--primitive-canvas", category: "color", usage: "hero background" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: [{ breakpoint: "xs", stack: true, span: 12 }],
  accessibilityRules: {
    requiresLabel: true,
    keyboardOperable: false,
    visibleFocus: false,
    respectsReducedMotion: true,
    role: "region",
    headingLevel: 1,
  },
  previewConfig: {
    sampleProps: { headline: "Custom exhaust systems" },
    aspectRatio: "16/9",
    background: "canvas",
  },
  codeExample: { language: "tsx", code: '<ServiceHero headline="…" />' },
  setupInstructions: { steps: ["Drop the hero into the page hero slot."] },
}

const heroBlock: Block = createBlock(heroManifest, {
  id: "block_service-hero",
  props: { headline: "Custom Exhaust Systems" },
})

/** A saved hero section pattern. */
export const serviceHeroSection: SectionTemplate = {
  id: "section_service-hero",
  name: "Service hero",
  description: "Full-bleed service hero with a single headline.",
  category: "Marketing",
  blocks: [heroBlock],
  composedOf: ["cta"],
  tags: ["hero", "service"],
  createdAt: NOW,
  updatedAt: NOW,
}

/** A service page template, Payload-aligned to `pageType: "service"`. */
export const servicePageTemplate: PageTemplate = {
  id: "template_service-page",
  name: "Service page",
  description: "Hero → body → warranty callout → CTA, tuned for a single service.",
  pageType: "service",
  slots: [
    { id: "hero", label: "Hero", defaultSectionId: "section_service-hero", required: true },
    { id: "body", label: "Body", required: true, repeatable: true, allowedCategories: ["Content"] },
    { id: "cta", label: "Closing CTA", required: false, allowedCategories: ["Marketing"] },
  ],
  styleProfile: DEFAULT_STYLE_PROFILE,
  createdAt: NOW,
  updatedAt: NOW,
}

/** A full SEO bundle with local-SEO + AI-search populated. */
export const serviceSeo: SeoConfig = {
  meta: {
    metaTitle: "Custom Exhaust Systems | Oak Flats Mufflermen",
    metaDescription:
      "Mandrel-bent custom exhaust systems, tuned for sound and flow. Same-day quotes in Oak Flats.",
    focusKeyword: "custom exhaust systems oak flats",
    secondaryKeywords: ["mandrel bent exhaust", "performance muffler"],
    noIndex: false,
    changeFrequency: "monthly",
    sitemapPriority: 0.8,
  },
  local: {
    businessName: "Oak Flats Mufflermen",
    address: {
      streetAddress: "1 Industrial Rd",
      addressLocality: "Oak Flats",
      addressRegion: "NSW",
      postalCode: "2529",
      addressCountry: "AU",
    },
    telephone: "+61242000000",
    geo: { latitude: -34.566, longitude: 150.831 },
    serviceAreas: ["Oak Flats", "Shellharbour", "Albion Park"],
    openingHours: [
      { dayOfWeek: "Monday", opens: "08:00", closes: "17:00" },
      { dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
      { dayOfWeek: "Sunday", opens: "00:00", closes: "00:00", closed: true },
    ],
    priceRange: "$$",
  },
  ai: {
    canonicalAnswer:
      "Oak Flats Mufflermen builds mandrel-bent custom exhaust systems with same-day quotes, backed by a lifetime workmanship warranty.",
    primaryQuestion: "Where can I get a custom exhaust system built in Oak Flats?",
    faqs: [
      {
        question: "How long does a custom exhaust take?",
        answer: "Most single-vehicle systems are completed same day.",
      },
    ],
    entityFacts: [{ label: "Established", value: "1998" }],
    allowAiCitation: true,
    allowAiTraining: false,
    topicCluster: "exhaust-services",
  },
}

/** Social-preview + a LocalBusiness + FAQ structured-data graph. */
export const serviceSocial: SocialSchemaConfig = {
  preview: {
    title: "Custom Exhaust Systems",
    description: "Mandrel-bent systems tuned for sound and flow.",
    imageId: "media_service-og",
    imageAlt: "A freshly fabricated stainless exhaust system",
    ogType: "business.business",
    twitterCard: "summary_large_image",
    locale: "en_AU",
  },
  schemaMarkup: [
    {
      kind: "LocalBusiness",
      businessType: "AutoRepair",
      name: "Oak Flats Mufflermen",
      address: {
        streetAddress: "1 Industrial Rd",
        addressLocality: "Oak Flats",
        addressRegion: "NSW",
        postalCode: "2529",
        addressCountry: "AU",
      },
      telephone: "+61242000000",
      priceRange: "$$",
      rating: { ratingValue: 4.9, reviewCount: 212 },
    },
    {
      kind: "FAQPage",
      faqs: [
        {
          question: "How long does a custom exhaust take?",
          answer: "Most single-vehicle systems are completed same day.",
        },
      ],
    },
  ],
}

/** A header template part. */
export const siteHeader: HeaderConfig = {
  id: "header_primary",
  styleProfile: DEFAULT_STYLE_PROFILE,
  layout: "split",
  logoId: "media_logo",
  logoAlt: "Oak Flats Mufflermen",
  nav: [
    { id: "nav_services", label: "Services", href: "/services" },
    { id: "nav_book", label: "Book now", href: "/book", isCta: true },
  ],
  sticky: true,
}

/** A footer template part. */
export const siteFooter: FooterConfig = {
  id: "footer_primary",
  styleProfile: DEFAULT_STYLE_PROFILE,
  layout: "columns",
  columns: [
    {
      id: "col_services",
      heading: "Services",
      links: [{ id: "f_exhaust", label: "Custom exhausts", href: "/services/custom-exhaust-systems" }],
    },
  ],
  socialLinks: [
    { id: "soc_fb", platform: "facebook", href: "https://facebook.com/oakflatsmufflers", label: "Facebook" },
  ],
  legalText: "© Oak Flats Mufflermen",
}

const renderablePage = createPage({
  id: "page_custom-exhaust-systems",
  meta: {
    slug: "services/custom-exhaust-systems",
    title: "Custom Exhaust Systems",
    description: "Mandrel-bent custom exhaust systems.",
    createdAt: NOW,
    updatedAt: NOW,
  },
  styleProfile: DEFAULT_STYLE_PROFILE,
  blocks: [heroBlock, createBlock(heroManifest, { id: "block_cta", name: "Closing CTA" })],
})

/** Two-entry version history: a published v1 and an in-review v2. */
const versionOne: PageVersion = {
  id: "ver_1",
  pageId: renderablePage.id,
  versionNumber: 1,
  snapshot: { ...renderablePage, status: "published" },
  workflowState: "published",
  trigger: "publish",
  label: "Initial launch",
  authorId: "user_author",
  createdAt: "2026-04-01T00:00:00.000Z",
  isPublished: true,
}

const versionTwo: PageVersion = {
  id: "ver_2",
  pageId: renderablePage.id,
  versionNumber: 2,
  snapshot: renderablePage,
  workflowState: "review",
  trigger: "submit",
  label: "Spring promo refresh",
  changeSummary: "Updated hero headline and added a closing CTA.",
  authorId: "user_author",
  createdAt: NOW,
  isPublished: false,
}

export const serviceVersionHistory: VersionHistory = {
  pageId: renderablePage.id,
  versions: [versionOne, versionTwo],
  publishedVersionId: "ver_1",
  latestVersionId: "ver_2",
}

/** Workflow status: v2 awaiting the human-approval gate. */
export const serviceWorkflow: WorkflowStatus = {
  state: "review",
  currentVersionId: "ver_2",
  approvals: [],
  lastActor: "user_author",
  updatedAt: NOW,
}

/** The complete managed CMS document for the service page. */
export const serviceCmsPage: CmsPage = {
  id: renderablePage.id,
  schemaVersion: CMS_PAGE_SCHEMA_VERSION,
  pageType: "service",
  path: "/services/custom-exhaust-systems",
  templateId: servicePageTemplate.id,
  config: renderablePage,
  seo: serviceSeo,
  social: serviceSocial,
  workflow: serviceWorkflow,
  history: serviceVersionHistory,
  createdAt: "2026-04-01T00:00:00.000Z",
  updatedAt: NOW,
}
