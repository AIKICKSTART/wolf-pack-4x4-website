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
 * BlockManifest for the Service Overview section. The repeater editable field
 * lets the owner add/remove/reorder service cards from the CMS.
 */
export const serviceOverviewManifest: BlockManifest = {
  type: "section/service-overview",
  name: "Service overview",
  category: SECTION_CATEGORY,
  kind: SECTION_KIND,
  version: SECTION_MANIFEST_VERSION,
  summary:
    "Grid of core workshop services with domain icons, descriptions, and per-card deep links. 2–6 cards, 2/3/4 columns.",

  componentPath: SECTION_IMPORT_PATH,
  importName: "ServiceOverviewSection",

  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: false },
      { key: "body", type: "richtext", required: false },
      { key: "columns", type: "enum", required: false, options: ["2", "3", "4"] },
      {
        key: "services",
        type: "array",
        required: false,
        items: {
          key: "service",
          type: "object",
          required: true,
          fields: [
            { key: "id", type: "string", required: true },
            { key: "title", type: "string", required: true },
            { key: "description", type: "richtext", required: true },
            { key: "href", type: "url", required: false },
            { key: "linkLabel", type: "string", required: false },
          ],
        },
      },
    ],
  },
  defaultProps: {
    kicker: "What we do",
    heading: "Every job, under one roof",
    body: "From a quiet daily-driver muffler swap to a full mandrel-bent performance system, the Mufflermen crew fabricates, welds and fits it all on-site at Oak Flats.",
    columns: "3",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string", optional: true },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "richtext", optional: true },
    { path: "columns", label: "Columns", control: "select", valueType: "enum", options: ["2", "3", "4"] },
    { path: "services[].title", label: "Service title", control: "text", valueType: "string" },
    { path: "services[].description", label: "Service description", control: "textarea", valueType: "richtext" },
    { path: "services[].href", label: "Service link", control: "url", valueType: "url", optional: true },
    { path: "services[].linkLabel", label: "Link label", control: "text", valueType: "string", optional: true },
  ],

  tokenDependencies: withSharedTokens([
    { token: "--primitive-teal", category: "color", usage: "service icon tone" },
    { token: "--primitive-green", category: "color", usage: "service icon tone" },
    { token: "--primitive-card-bg", category: "color", usage: "feature card surface" },
    { token: "--primitive-h2", category: "typography", usage: "section heading scale" },
    { token: "--primitive-space-6", category: "space", usage: "card grid gap" },
  ]),
  iconDependencies: [
    { name: "MufflerIcon", importPath: "@/app/ui-primitives/components/icons", usage: "custom exhaust card" },
    { name: "CatBackSystemIcon", importPath: "@/app/ui-primitives/components/icons", usage: "cat-back card" },
    { name: "ExtractorHeadersIcon", importPath: "@/app/ui-primitives/components/icons", usage: "extractors card" },
    { name: "WeldBeadIcon", importPath: "@/app/ui-primitives/components/icons", usage: "repairs card" },
    { name: "ShieldTickIcon", importPath: "@/app/ui-primitives/components/icons", usage: "compliance card" },
    { name: "HoistArmIcon", importPath: "@/app/ui-primitives/components/icons", usage: "fleet card" },
  ],
  assetDependencies: [],

  allowedChildren: [],

  responsiveRules: fullBleedResponsiveRules(),
  accessibilityRules: sectionAccessibility(2, [
    "Cards are a semantic list; each link is keyboard-reachable.",
    "Icons are decorative (aria-hidden) — titles carry the label.",
  ]),

  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Service",
    indexable: true,
  },

  previewConfig: {
    sampleProps: {
      heading: "Every job, under one roof",
      columns: "3",
    },
    aspectRatio: "16/9",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { ServiceOverviewSection } from "@/app/ui-primitives/section-library/web"

export function Services() {
  return <ServiceOverviewSection columns={3} />
}`,
    caption: "Defaults to the six core Mufflermen services.",
  },
  setupInstructions: {
    steps: [
      "Import ServiceOverviewSection from the web section library barrel.",
      "Optionally pass a `services` array to override the defaults.",
      "Choose 2, 3, or 4 columns to suit the page width.",
    ],
    notes: ["Each service card icon is supplied as a ReactNode; pass a domain icon from the icons family."],
  },

  tags: ["services", "feature-grid", "overview", "links"],
}

export default serviceOverviewManifest
