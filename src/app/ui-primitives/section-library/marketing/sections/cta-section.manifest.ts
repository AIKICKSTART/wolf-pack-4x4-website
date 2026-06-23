import type { BlockManifest } from "../../../builder/model/manifest"

import {
  CTA_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/cta-section"

/**
 * BlockManifest for the conversion CTA banner. Drag-droppable on the canvas;
 * the editable fields expose the copy + the two actions to a non-technical owner.
 */
export const ctaSectionManifest: BlockManifest = {
  type: "marketing-section/cta",
  name: "CTA banner",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "High-emphasis booking CTA with metallic-red→amber primary action, carbon outline secondary, and a trust assurance row.",
  componentPath: COMPONENT_PATH,
  importName: "CtaSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: true, description: "Eyebrow label above the heading." },
      { key: "heading", type: "richtext", required: true, description: "Display heading." },
      { key: "body", type: "string", required: true, description: "Supporting paragraph." },
      {
        key: "primaryAction",
        type: "object",
        required: true,
        fields: [
          { key: "label", type: "string", required: true },
          { key: "href", type: "url", required: true },
          { key: "variant", type: "enum", required: false, options: ["primary", "ghost"] },
        ],
      },
      {
        key: "secondaryAction",
        type: "object",
        required: false,
        fields: [
          { key: "label", type: "string", required: true },
          { key: "href", type: "url", required: true },
          { key: "variant", type: "enum", required: false, options: ["primary", "ghost"] },
        ],
      },
      {
        key: "assurances",
        type: "array",
        required: false,
        items: {
          key: "assurance",
          type: "object",
          required: true,
          fields: [
            { key: "icon", type: "icon", required: true },
            { key: "label", type: "string", required: true },
          ],
        },
      },
      { key: "tone", type: "enum", required: false, options: ["carbon", "metallic"] },
    ],
  },
  defaultProps: {
    kicker: "Book your fit-up",
    heading: "Custom exhaust, fitted while you wait",
    body:
      "Bring the ute or the weekend build to Oak Flats. Mandrel-bent, fully welded, dyno-tuned for sound and flow. Most cat-back jobs done same day.",
    primaryAction: { label: "Book a bay", href: "/book", variant: "primary" },
    secondaryAction: { label: "Call the workshop", href: "tel:+61242000000", variant: "ghost" },
    assurances: [
      { icon: "shield", label: "Lifetime weld warranty" },
      { icon: "badge", label: "Manta accredited" },
      { icon: "calendar", label: "Same-day fit-ups" },
    ],
    tone: "carbon",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string" },
    { path: "heading", label: "Heading", control: "richtext", valueType: "richtext" },
    { path: "body", label: "Body copy", control: "textarea", valueType: "string" },
    { path: "primaryAction.label", label: "Primary button label", control: "text", valueType: "string" },
    { path: "primaryAction.href", label: "Primary button link", control: "url", valueType: "url" },
    { path: "secondaryAction.label", label: "Secondary button label", control: "text", valueType: "string", optional: true },
    { path: "secondaryAction.href", label: "Secondary button link", control: "url", valueType: "url", optional: true },
    {
      path: "tone",
      label: "Surface tone",
      control: "select",
      valueType: "enum",
      options: ["carbon", "metallic"],
      hint: "Carbon-fibre weave or amber-tinted metallic.",
    },
    { path: "assurances", label: "Trust assurances", control: "repeater", valueType: "array", optional: true },
  ],
  tokenDependencies: CTA_SECTION_TOKENS,
  iconDependencies: [
    {
      name: "arrow-right",
      importPath: "lucide-react",
      usage: "action affordance arrow",
    },
    {
      name: "shield-check",
      importPath: "lucide-react",
      usage: "trust assurance marks",
    },
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
    notes: ["Heading is referenced by aria-labelledby.", "Actions are real links with visible focus."],
  },
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "AutoRepair",
    indexable: true,
  },
  conversionGoal: {
    id: "book-service",
    label: "Book a workshop bay",
    action: "click",
    eventName: "cta_book_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {
      kicker: "Book your fit-up",
      heading: "Custom exhaust, fitted while you wait",
      body: "Mandrel-bent, fully welded, dyno-tuned. Most cat-back jobs done same day.",
      primaryAction: { label: "Book a bay", href: "/book", variant: "primary" },
    },
    aspectRatio: "16/7",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Drop the CTA banner at the foot of a service page.",
    code: `import { CtaSection } from "@/app/ui-primitives/section-library/marketing/sections/cta-section"

export function ServiceFooterCta() {
  return (
    <CtaSection
      kicker="Book your fit-up"
      heading="Custom exhaust, fitted while you wait"
      body="Mandrel-bent, fully welded, dyno-tuned for sound and flow."
      primaryAction={{ label: "Book a bay", href: "/book" }}
      secondaryAction={{ label: "Call the workshop", href: "tel:+61242000000", variant: "ghost" }}
      assurances={[
        { icon: "shield", label: "Lifetime weld warranty" },
        { icon: "calendar", label: "Same-day fit-ups" },
      ]}
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import CtaSection from the section-library marketing sections.",
      "Pass kicker, heading, and body copy.",
      "Provide a primaryAction; add an optional ghost secondaryAction.",
      "List 2–4 assurances using the shared section icon names.",
    ],
    notes: ["Primary action uses the central metallic-red→amber button DNA.", "tel: and mailto: hrefs are supported."],
  },
  tags: ["cta", "conversion", "booking", "marketing"],
}

export default ctaSectionManifest
