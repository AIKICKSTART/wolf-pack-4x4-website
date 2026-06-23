import type { BlockManifest } from "../../../builder/model/manifest"

import {
  CTA_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/promo-campaign-section"

/** BlockManifest for the promo campaign section. */
export const promoCampaignSectionManifest: BlockManifest = {
  type: "marketing-section/promo-campaign",
  name: "Promo campaign",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Time-boxed offer banner with a metallic CTA, a count-up StatCounterRow, and a product FeatureSpotlight.",
  componentPath: COMPONENT_PATH,
  importName: "PromoCampaignSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: true },
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: true },
      { key: "offerLabel", type: "string", required: true },
      { key: "ctaLabel", type: "string", required: true },
      { key: "ctaHref", type: "url", required: true },
      { key: "stats", type: "array", required: true },
      { key: "spotlightVisual", type: "json", required: true },
      { key: "spotlightHeading", type: "string", required: true },
      { key: "spotlightBody", type: "string", required: true },
      { key: "spotlightBullets", type: "array", required: false },
    ],
  },
  defaultProps: {
    kicker: "Winter dyno season",
    heading: "Cat-back + tune, save $200",
    body: "Book a full cat-back system with a dyno tune before 30 June and we'll knock $200 off the install. Limited bays.",
    offerLabel: "Save $200 · ends 30 Jun",
    ctaLabel: "Claim the offer",
    ctaHref: "/promo/winter-dyno",
    stats: [
      { id: "s1", label: "Jobs booked this month", value: 142, suffix: "+", tone: "red" },
      { id: "s2", label: "Avg power gain", value: 31, prefix: "+", suffix: "rwkW", tone: "amber" },
      { id: "s3", label: "Same-day fit-ups", value: 86, suffix: "%", tone: "teal" },
      { id: "s4", label: "5-star reviews", value: 1042, tone: "green" },
    ],
    spotlightHeading: "Mandrel-bent, dyno-proven",
    spotlightBody:
      "Every promo system is mandrel-bent, fully TIG-welded, and signed off on the in-house dyno so you leave with a printout, not a promise.",
    spotlightBullets: [
      { label: "409 stainless, lifetime weld warranty" },
      { label: "Dyno before/after printout included" },
      { label: "Bi-modal valve integration retained" },
    ],
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string" },
    { path: "heading", label: "Offer heading", control: "text", valueType: "string" },
    { path: "body", label: "Offer body", control: "textarea", valueType: "string" },
    { path: "offerLabel", label: "Offer pill", control: "text", valueType: "string", hint: "e.g. Save $200 · ends 30 Jun" },
    { path: "ctaLabel", label: "CTA label", control: "text", valueType: "string" },
    { path: "ctaHref", label: "CTA link", control: "url", valueType: "url" },
    { path: "stats", label: "Campaign stats", control: "repeater", valueType: "array" },
    { path: "spotlightHeading", label: "Spotlight heading", control: "text", valueType: "string" },
    { path: "spotlightBody", label: "Spotlight body", control: "textarea", valueType: "string" },
    { path: "spotlightBullets", label: "Spotlight bullets", control: "repeater", valueType: "array", optional: true },
  ],
  tokenDependencies: CTA_SECTION_TOKENS,
  iconDependencies: [
    { name: "arrow-right", importPath: "lucide-react", usage: "CTA affordance arrow" },
  ],
  assetDependencies: [
    {
      id: "promo-spotlight-visual",
      type: "image",
      required: false,
      description: "Product / install visual for the spotlight slot (passed as a node).",
    },
  ],
  allowedChildren: [],
  responsiveRules: STACK_RESPONSIVE_RULES,
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: [
      "CTA is a real link with visible focus and a metallic button treatment.",
      "Stat count-up honours prefers-reduced-motion via StatCounterRow.",
    ],
  },
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Offer",
    indexable: true,
  },
  conversionGoal: {
    id: "claim-promo",
    label: "Claim the promo offer",
    action: "click",
    eventName: "promo_claim_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {
      kicker: "Winter dyno season",
      heading: "Cat-back + tune, save $200",
      offerLabel: "Save $200 · ends 30 Jun",
      ctaLabel: "Claim the offer",
      ctaHref: "/promo/winter-dyno",
      stats: [],
      spotlightHeading: "Mandrel-bent, dyno-proven",
      spotlightBody: "Every promo system is signed off on the dyno.",
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Run a seasonal promo with proof and a spotlight.",
    code: `import { PromoCampaignSection } from "@/app/ui-primitives/section-library/marketing/sections/promo-campaign-section"

export function WinterPromo() {
  return (
    <PromoCampaignSection
      kicker="Winter dyno season"
      heading="Cat-back + tune, save $200"
      body="Book before 30 June for $200 off the install."
      offerLabel="Save $200 · ends 30 Jun"
      ctaLabel="Claim the offer"
      ctaHref="/promo/winter-dyno"
      stats={[{ id: "s1", label: "Jobs booked", value: 142, suffix: "+", tone: "red" }]}
      spotlightVisual={<img src="/media/brand/products/demo/exhaust-product-demo-hero.webp" alt="Promo system" />}
      spotlightHeading="Mandrel-bent, dyno-proven"
      spotlightBody="Signed off on the in-house dyno."
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import PromoCampaignSection.",
      "Set the offer copy (kicker, heading, body, offerLabel) and CTA.",
      "Pass a stats array for the count-up row.",
      "Provide a spotlightVisual node plus spotlight heading/body/bullets.",
    ],
    notes: [
      "Composes StatCounterRow and FeatureSpotlight from the marketing family.",
      "The offer pill uses the shared Chip primitive.",
    ],
  },
  tags: ["promo", "campaign", "offer", "conversion", "marketing"],
}

export default promoCampaignSectionManifest
