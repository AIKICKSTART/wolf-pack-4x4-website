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
 * BlockManifest for the Performance Exhaust section — reversed spotlight plus an
 * animated dyno-style stat row. The `stats` repeater drives the count-up tiles.
 */
export const performanceExhaustManifest: BlockManifest = {
  type: "section/performance-exhaust",
  name: "Performance exhaust",
  category: SECTION_CATEGORY,
  kind: SECTION_KIND,
  version: SECTION_MANIFEST_VERSION,
  summary:
    "Performance storytelling spotlight (visual-right) with gauges + a four-tile animated dyno stat row (power, torque, EGT, builds).",

  componentPath: SECTION_IMPORT_PATH,
  importName: "PerformanceExhaustSection",

  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: false },
      { key: "body", type: "richtext", required: false },
      { key: "primaryLabel", type: "string", required: false },
      { key: "primaryHref", type: "url", required: false },
      {
        key: "stats",
        type: "array",
        required: false,
        items: {
          key: "stat",
          type: "object",
          required: true,
          fields: [
            { key: "id", type: "string", required: true },
            { key: "label", type: "string", required: true },
            { key: "value", type: "number", required: true, min: 0 },
            { key: "suffix", type: "string", required: false },
            { key: "prefix", type: "string", required: false },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green"] },
          ],
        },
      },
    ],
  },
  defaultProps: {
    kicker: "Performance exhaust",
    heading: "More flow. More grunt. The right note.",
    body: "A full mandrel-bent performance system frees up your engine end to end — every bend keeps the gas moving so you feel the gains and hear the difference. We back it with real dyno numbers, not guesswork.",
    primaryLabel: "Build my system",
    primaryHref: "/book/performance",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string", optional: true },
    { path: "body", label: "Body copy", control: "textarea", valueType: "richtext", optional: true },
    { path: "primaryLabel", label: "CTA label", control: "text", valueType: "string", optional: true },
    { path: "primaryHref", label: "CTA link", control: "url", valueType: "url", optional: true },
    { path: "stats[].label", label: "Stat label", control: "text", valueType: "string" },
    { path: "stats[].value", label: "Stat value", control: "number", valueType: "number" },
    { path: "stats[].suffix", label: "Stat suffix", control: "text", valueType: "string", optional: true },
    {
      path: "stats[].tone",
      label: "Stat tone",
      control: "select",
      valueType: "enum",
      options: ["red", "amber", "teal", "green"],
      optional: true,
    },
  ],

  tokenDependencies: withSharedTokens([
    { token: "--primitive-metallic-black", category: "texture", usage: "performance visual body" },
    { token: "--primitive-metallic-sheen", category: "texture", usage: "performance visual clearcoat" },
    { token: "--primitive-teal", category: "color", usage: "stat tone + dyno icon" },
    { token: "--primitive-green", category: "color", usage: "stat tone" },
    { token: "--primitive-space-10", category: "space", usage: "spotlight ↔ stats gap" },
  ]),
  iconDependencies: [
    { name: "BoostGaugeIcon", importPath: "@/app/ui-primitives/components/icons", usage: "spotlight gauge" },
    { name: "TurboIcon", importPath: "@/app/ui-primitives/components/icons", usage: "spotlight turbo" },
    { name: "DynoCurveIcon", importPath: "@/app/ui-primitives/components/icons", usage: "spotlight dyno curve" },
    { name: "CatBackSystemIcon", importPath: "@/app/ui-primitives/components/icons", usage: "performance reference icon" },
  ],
  assetDependencies: [],

  allowedChildren: [],

  responsiveRules: fullBleedResponsiveRules(),
  accessibilityRules: sectionAccessibility(2, [
    "Stat tiles use aria-live=polite via the StatCounterRow primitive.",
    "Count-up animation is suppressed under prefers-reduced-motion.",
  ]),

  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Product",
    indexable: true,
  },
  conversionGoal: {
    id: "build-performance",
    label: "Build my system",
    action: "navigate",
    eventName: "performance_build_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },

  previewConfig: {
    sampleProps: {
      heading: "More flow. More grunt. The right note.",
      primaryLabel: "Build my system",
    },
    aspectRatio: "4/3",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { PerformanceExhaustSection } from "@/app/ui-primitives/section-library/web"

export function PerformancePage() {
  return <PerformanceExhaustSection primaryHref="/book/performance" />
}`,
    caption: "Reversed spotlight + animated dyno stats.",
  },
  setupInstructions: {
    steps: [
      "Import PerformanceExhaustSection from the web section library barrel.",
      "Override the stats array with your own dyno figures.",
      "Point the CTA at your performance enquiry flow.",
    ],
    notes: ["Stat tiles count up when scrolled into view; values are plain numbers with optional suffix/prefix."],
  },

  tags: ["performance", "dyno", "stats", "spotlight", "power"],
}

export default performanceExhaustManifest
