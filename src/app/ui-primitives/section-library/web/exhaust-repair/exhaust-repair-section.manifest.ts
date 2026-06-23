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
 * BlockManifest for the Exhaust Repair section — a spotlight + numbered repair
 * workflow. The `steps` repeater lets the owner re-word the workflow.
 */
export const exhaustRepairManifest: BlockManifest = {
  type: "section/exhaust-repair",
  name: "Exhaust repair",
  category: SECTION_CATEGORY,
  kind: SECTION_KIND,
  version: SECTION_MANIFEST_VERSION,
  summary:
    "Repair storytelling spotlight (copy + metallic visual + bullets + CTA) paired with a four-step repair workflow.",

  componentPath: SECTION_IMPORT_PATH,
  importName: "ExhaustRepairSection",

  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: false },
      { key: "body", type: "richtext", required: false },
      { key: "primaryLabel", type: "string", required: false },
      { key: "primaryHref", type: "url", required: false },
      {
        key: "steps",
        type: "array",
        required: false,
        items: {
          key: "step",
          type: "object",
          required: true,
          fields: [
            { key: "id", type: "string", required: true },
            { key: "title", type: "string", required: true },
            { key: "body", type: "richtext", required: true },
          ],
        },
      },
    ],
  },
  defaultProps: {
    kicker: "Exhaust repair",
    heading: "Blowing, droning, or hanging low?",
    body: "If your exhaust has gone loud, rattly, or scrapes the driveway, bring it in. We diagnose the real cause, give you a straight price, and fix it properly — most repairs are in and out the same day.",
    primaryLabel: "Book a repair",
    primaryHref: "/book/repair",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string", optional: true },
    { path: "body", label: "Body copy", control: "textarea", valueType: "richtext", optional: true },
    { path: "primaryLabel", label: "CTA label", control: "text", valueType: "string", optional: true },
    { path: "primaryHref", label: "CTA link", control: "url", valueType: "url", optional: true },
    { path: "steps[].title", label: "Step title", control: "text", valueType: "string" },
    { path: "steps[].body", label: "Step description", control: "textarea", valueType: "richtext" },
  ],

  tokenDependencies: withSharedTokens([
    { token: "--primitive-metallic-black", category: "texture", usage: "repair visual body" },
    { token: "--primitive-metallic-sheen", category: "texture", usage: "repair visual clearcoat" },
    { token: "--primitive-teal", category: "color", usage: "step icon tone" },
    { token: "--primitive-green", category: "color", usage: "step icon tone" },
    { token: "--primitive-space-10", category: "space", usage: "spotlight ↔ steps gap" },
  ]),
  iconDependencies: [
    { name: "MufflerIcon", importPath: "@/app/ui-primitives/components/icons", usage: "spotlight visual" },
    { name: "ClipboardCheckIcon", importPath: "@/app/ui-primitives/components/icons", usage: "inspect step" },
    { name: "HoistArmIcon", importPath: "@/app/ui-primitives/components/icons", usage: "quote step" },
    { name: "WeldBeadIcon", importPath: "@/app/ui-primitives/components/icons", usage: "weld step" },
    { name: "ShieldTickIcon", importPath: "@/app/ui-primitives/components/icons", usage: "warranty step" },
  ],
  assetDependencies: [],

  allowedChildren: [],

  responsiveRules: fullBleedResponsiveRules(),
  accessibilityRules: sectionAccessibility(2, [
    "Spotlight + steps each render an h2; keep them under one page h1.",
    "Steps are an ordered list — order is meaningful and announced.",
  ]),

  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Service",
    indexable: true,
  },
  conversionGoal: {
    id: "book-repair",
    label: "Book a repair",
    action: "navigate",
    eventName: "repair_book_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },

  previewConfig: {
    sampleProps: {
      heading: "Blowing, droning, or hanging low?",
      primaryLabel: "Book a repair",
    },
    aspectRatio: "4/3",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { ExhaustRepairSection } from "@/app/ui-primitives/section-library/web"

export function RepairPage() {
  return <ExhaustRepairSection primaryHref="/book/repair" />
}`,
    caption: "Spotlight + 4-step workflow in one drop.",
  },
  setupInstructions: {
    steps: [
      "Import ExhaustRepairSection from the web section library barrel.",
      "Point the CTA at your booking flow via primaryHref.",
      "Override the steps array to re-word the workflow if needed.",
    ],
    notes: ["The spotlight visual is built from the MufflerIcon — no external asset required."],
  },

  tags: ["repair", "spotlight", "process", "workflow", "service"],
}

export default exhaustRepairManifest
