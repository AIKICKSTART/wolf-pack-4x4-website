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
 * BlockManifest for the Workshop Trust section — testimonial wall + supplier
 * logo cloud. Both lists are repeater-editable from the CMS.
 */
export const workshopTrustManifest: BlockManifest = {
  type: "section/workshop-trust",
  name: "Workshop trust",
  category: SECTION_CATEGORY,
  kind: SECTION_KIND,
  version: SECTION_MANIFEST_VERSION,
  summary:
    "Social-proof section — a masonry testimonial wall with star ratings + a supplier brand-mark logo cloud.",

  componentPath: SECTION_IMPORT_PATH,
  importName: "WorkshopTrustSection",

  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: false },
      { key: "body", type: "richtext", required: false },
      {
        key: "testimonials",
        type: "array",
        required: false,
        items: {
          key: "testimonial",
          type: "object",
          required: true,
          fields: [
            { key: "id", type: "string", required: true },
            { key: "quote", type: "richtext", required: true },
            { key: "name", type: "string", required: true },
            { key: "role", type: "string", required: true },
            { key: "rating", type: "number", required: false, min: 1, max: 5 },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green", "obsidian"] },
            { key: "span", type: "enum", required: false, options: ["short", "regular", "tall"] },
          ],
        },
      },
      {
        key: "brands",
        type: "array",
        required: false,
        items: {
          key: "brand",
          type: "object",
          required: true,
          fields: [
            { key: "id", type: "string", required: true },
            { key: "name", type: "string", required: true },
          ],
        },
      },
    ],
  },
  defaultProps: {
    kicker: "Why locals trust us",
    heading: "20 years, one reputation",
    body: "Family-run since the early days, the Oak Flats Mufflermen have earned their name one clean weld at a time. We fit only brands we'd run ourselves.",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string", optional: true },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "richtext", optional: true },
    { path: "testimonials[].quote", label: "Quote", control: "textarea", valueType: "richtext" },
    { path: "testimonials[].name", label: "Customer name", control: "text", valueType: "string" },
    { path: "testimonials[].role", label: "Vehicle / suburb", control: "text", valueType: "string" },
    { path: "testimonials[].rating", label: "Star rating", control: "number", valueType: "number", optional: true },
    {
      path: "testimonials[].span",
      label: "Card height",
      control: "select",
      valueType: "enum",
      options: ["short", "regular", "tall"],
      optional: true,
    },
    { path: "brands[].name", label: "Brand name", control: "text", valueType: "string" },
  ],

  tokenDependencies: withSharedTokens([
    { token: "--primitive-teal", category: "color", usage: "testimonial avatar tone" },
    { token: "--primitive-green", category: "color", usage: "testimonial avatar tone" },
    { token: "--primitive-line-muted", category: "color", usage: "logo-cloud divider" },
    { token: "--primitive-space-10", category: "space", usage: "wall ↔ logo-cloud gap" },
  ]),
  iconDependencies: [
    { name: "MantaMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "XforceMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "RedbackMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "MagnaflowMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "PacemakerMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "HushpowerMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
    { name: "BeaudesertMarkIcon", importPath: "@/app/ui-primitives/components/icons", usage: "supplier mark" },
  ],
  assetDependencies: [],

  allowedChildren: [],

  responsiveRules: fullBleedResponsiveRules(),
  accessibilityRules: sectionAccessibility(2, [
    "Testimonials are blockquotes with cited authors.",
    "Star ratings carry an accessible text label (X out of 5 stars).",
    "Brand marks are labelled via the LogoCloud entry name.",
  ]),

  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Review",
    indexable: true,
  },

  previewConfig: {
    sampleProps: {
      heading: "20 years, one reputation",
    },
    aspectRatio: "16/9",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { WorkshopTrustSection } from "@/app/ui-primitives/section-library/web"

export function AboutPage() {
  return <WorkshopTrustSection />
}`,
    caption: "Testimonials + supplier brand marks out of the box.",
  },
  setupInstructions: {
    steps: [
      "Import WorkshopTrustSection from the web section library barrel.",
      "Override testimonials with your own reviews (id, quote, name, role, rating).",
      "Brand marks default to the seven house suppliers; pass `brands` to customise.",
    ],
    notes: ["Each brand `mark` is a ReactNode — pass a supplier mark icon from the icons family."],
  },

  tags: ["trust", "testimonials", "social-proof", "logos", "suppliers"],
}

export default workshopTrustManifest
