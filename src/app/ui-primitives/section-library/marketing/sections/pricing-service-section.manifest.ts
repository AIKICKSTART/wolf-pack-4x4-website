import type { BlockManifest } from "../../../builder/model/manifest"

import {
  CTA_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/pricing-service-section"

/** BlockManifest for the pricing / service section. */
export const pricingServiceSectionManifest: BlockManifest = {
  type: "marketing-section/pricing-service",
  name: "Pricing & service",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Service-tier comparison table with a final CTA (PricingCtaSection) above an always-included FeatureGrid of guarantees.",
  componentPath: COMPONENT_PATH,
  importName: "PricingServiceSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: false },
      { key: "columns", type: "array", required: true },
      { key: "rows", type: "array", required: true },
      { key: "footnote", type: "string", required: false },
      { key: "actions", type: "array", required: true },
      { key: "includedHeading", type: "string", required: false },
      { key: "included", type: "array", required: true },
    ],
  },
  defaultProps: {
    kicker: "Workshop pricing",
    heading: "Pick your exhaust package",
    body: "Transparent fixed pricing on the systems we fit every week. Custom builds quoted on the hoist.",
    columns: [
      { id: "axle", name: "Axle-back", caption: "From $690 fitted" },
      { id: "cat", name: "Cat-back", caption: "From $1,290 fitted", popular: true },
      { id: "turbo", name: "Turbo-back", caption: "From $2,490 fitted" },
    ],
    rows: [
      { feature: "Mandrel-bent piping", values: ["check", "check", "check"] },
      { feature: "Full TIG welds", values: ["check", "check", "check"] },
      { feature: "Stainless muffler", values: ["dot", "check", "check"] },
      { feature: "High-flow cat", values: ["cross", "dot", "check"] },
      { feature: "Dyno tune included", values: ["cross", "cross", "check"] },
      { feature: "Lifetime weld warranty", values: ["check", "check", "check"] },
    ],
    footnote: "Prices fitted, inc GST. Custom and dual systems quoted on inspection.",
    actions: [
      { label: "Book a fit-up", href: "/book", variant: "primary" },
      { label: "Request a quote", href: "/quote", variant: "secondary" },
    ],
    includedHeading: "Every job includes",
    included: [
      { id: "f1", icon: "shield", title: "Lifetime weld warranty", description: "Every weld backed for as long as you own the vehicle." },
      { id: "f2", icon: "gauge", title: "Flow-matched sizing", description: "Pipe diameter matched to your engine, not a one-size kit." },
      { id: "f3", icon: "volume", title: "Sound to spec", description: "We tune the note — daily-quiet or track-loud, your call." },
    ],
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string" },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "string", optional: true },
    { path: "columns", label: "Service tiers", control: "repeater", valueType: "array", hint: "Each tier is a comparison column." },
    { path: "rows", label: "Comparison rows", control: "repeater", valueType: "array", hint: "Use check / cross / dot or free text per cell." },
    { path: "footnote", label: "Footnote", control: "textarea", valueType: "string", optional: true },
    { path: "actions", label: "Pricing CTAs", control: "repeater", valueType: "array" },
    { path: "includedHeading", label: "Included heading", control: "text", valueType: "string", optional: true },
    { path: "included", label: "Always-included features", control: "repeater", valueType: "array" },
  ],
  tokenDependencies: CTA_SECTION_TOKENS,
  iconDependencies: [
    { name: "shield-check", importPath: "lucide-react", usage: "guarantee feature icons" },
    { name: "gauge", importPath: "lucide-react", usage: "feature icons" },
  ],
  assetDependencies: [],
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
      "Comparison table uses a real <table> with a caption (PricingCtaSection).",
      "Check/cross/partial cells carry text alternatives.",
    ],
  },
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Service",
    indexable: true,
  },
  conversionGoal: {
    id: "request-quote",
    label: "Book a fit-up or request a quote",
    action: "click",
    eventName: "pricing_cta_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {
      kicker: "Workshop pricing",
      heading: "Pick your exhaust package",
      columns: [],
      rows: [],
      actions: [],
      included: [],
    },
    aspectRatio: "16/10",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Show fixed-price packages with always-included guarantees.",
    code: `import { PricingServiceSection } from "@/app/ui-primitives/section-library/marketing/sections/pricing-service-section"

export function ServicePricing() {
  return (
    <PricingServiceSection
      kicker="Workshop pricing"
      heading="Pick your exhaust package"
      columns={[
        { id: "cat", name: "Cat-back", caption: "From $1,290 fitted", popular: true },
      ]}
      rows={[
        { feature: "Mandrel-bent piping", values: ["check"] },
      ]}
      actions={[{ label: "Book a fit-up", href: "/book", variant: "primary" }]}
      included={[
        { id: "f1", icon: <Shield aria-hidden />, title: "Lifetime weld warranty", description: "Backed for life." },
      ]}
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import PricingServiceSection.",
      "Define service tiers as comparison columns and line-items as rows.",
      "Provide pricing CTA actions (primary uses the metallic button DNA).",
      "List always-included features with icon nodes for the FeatureGrid.",
    ],
    notes: [
      "Composes PricingCtaSection (which wraps ComparisonTable) and FeatureGrid.",
      "Row cells accept 'check' | 'cross' | 'dot' or free text.",
    ],
  },
  tags: ["pricing", "service", "comparison", "conversion", "marketing"],
}

export default pricingServiceSectionManifest
