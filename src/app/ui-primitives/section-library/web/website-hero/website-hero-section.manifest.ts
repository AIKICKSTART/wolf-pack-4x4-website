import type { BlockManifest } from "../../../builder/model"
import {
  SECTION_CATEGORY,
  SECTION_IMPORT_PATH,
  SECTION_KIND,
  SECTION_MANIFEST_VERSION,
  fullBleedResponsiveRules,
  sectionAccessibility,
  withSharedTokens,
} from "../_manifest-helpers"

/**
 * BlockManifest for the Website Hero section. Lets the CMS canvas drag the hero,
 * edit its copy + CTAs, and document its token dependencies.
 */
export const websiteHeroManifest: BlockManifest = {
  type: "section/website-hero",
  name: "Website hero",
  category: SECTION_CATEGORY,
  kind: SECTION_KIND,
  version: SECTION_MANIFEST_VERSION,
  summary:
    "Top-of-page brand hero — display headline, dual metallic CTA, trust strip, and a carbon-fibre workshop-status panel.",

  componentPath: SECTION_IMPORT_PATH,
  importName: "WebsiteHeroSection",

  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false, description: "Eyebrow line above the headline." },
      {
        key: "headlineLines",
        type: "array",
        required: false,
        items: { key: "line", type: "string", required: true },
        description: "Display headline split into lines.",
      },
      { key: "subhead", type: "richtext", required: false, description: "Supporting paragraph." },
      { key: "primaryLabel", type: "string", required: false },
      { key: "primaryHref", type: "url", required: false },
      { key: "secondaryLabel", type: "string", required: false },
      { key: "secondaryHref", type: "url", required: false },
    ],
  },
  defaultProps: {
    kicker: "Oak Flats · Illawarra exhaust specialists",
    headlineLines: ["Exhaust done", "the right way"],
    subhead:
      "Custom mandrel-bent exhaust, performance systems, and honest repairs — fabricated in-house and fitted while you wait.",
    primaryLabel: "Book a fit-up",
    primaryHref: "/book",
    secondaryLabel: "See our work",
    secondaryHref: "/gallery",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "headlineLines[]", label: "Headline lines", control: "repeater", valueType: "array", hint: "One line per row." },
    { path: "subhead", label: "Subhead", control: "textarea", valueType: "richtext", optional: true },
    { path: "primaryLabel", label: "Primary CTA label", control: "text", valueType: "string" },
    { path: "primaryHref", label: "Primary CTA link", control: "url", valueType: "url" },
    { path: "secondaryLabel", label: "Secondary CTA label", control: "text", valueType: "string", optional: true },
    { path: "secondaryHref", label: "Secondary CTA link", control: "url", valueType: "url", optional: true },
  ],

  tokenDependencies: withSharedTokens([
    { token: "--primitive-metallic-sheen", category: "texture", usage: "visual panel clearcoat" },
    { token: "--primitive-display", category: "typography", usage: "hero headline scale" },
    { token: "--primitive-radius-xl", category: "radius", usage: "hero container corners" },
    { token: "--primitive-surface-shadow", category: "shadow", usage: "hero container depth" },
  ]),
  iconDependencies: [
    { name: "WorkshopBayIcon", importPath: "@/app/ui-primitives/components/icons", usage: "bay-open status badge" },
    { name: "MufflerIcon", importPath: "@/app/ui-primitives/components/icons", usage: "muffler feature bullet" },
    { name: "ShieldTickIcon", importPath: "@/app/ui-primitives/components/icons", usage: "warranty feature bullet" },
    { name: "CheckeredFlagIcon", importPath: "@/app/ui-primitives/components/icons", usage: "same-day feature bullet" },
  ],
  assetDependencies: [],

  allowedChildren: [],

  responsiveRules: fullBleedResponsiveRules(),
  accessibilityRules: sectionAccessibility(1, [
    "Single h1 — must be the page's primary heading.",
    "Trust strip and feature list are reachable by keyboard via their CTA links.",
  ]),

  seoRules: {
    contributesHeading: true,
    schemaOrgType: "AutoRepair",
    indexable: true,
  },
  conversionGoal: {
    id: "book-service",
    label: "Book a fit-up",
    action: "navigate",
    eventName: "hero_book_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },

  previewConfig: {
    sampleProps: {
      kicker: "Oak Flats · Illawarra exhaust specialists",
      headlineLines: ["Exhaust done", "the right way"],
      primaryLabel: "Book a fit-up",
      primaryHref: "/book",
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { WebsiteHeroSection } from "@/app/ui-primitives/section-library/web"

export function HomePage() {
  return (
    <WebsiteHeroSection
      kicker="Oak Flats · Illawarra exhaust specialists"
      headlineLines={["Exhaust done", "the right way"]}
      primaryLabel="Book a fit-up"
      primaryHref="/book"
    />
  )
}`,
    caption: "Drop the hero at the top of a public page.",
  },
  setupInstructions: {
    steps: [
      "Import WebsiteHeroSection from the web section library barrel.",
      "Render it as the first child of your page <main>.",
      "Override copy and CTA hrefs via props; leave them for the default Mufflermen content.",
    ],
    notes: ["Renders a single <h1>; do not place another h1 on the page."],
  },

  tags: ["hero", "landing", "brand", "cta", "above-the-fold"],
}

export default websiteHeroManifest
