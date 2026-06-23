/**
 * Demo block manifests for the builder canvas showcase.
 *
 * These seed the block palette so the canvas has a real, varied set of blocks
 * to drag, drop, reorder, and edit — without a backend. Every manifest is
 * token-driven: blocks only ever declare `--primitive-*` dependencies, never
 * literal colour/size/space/radius/motion values.
 *
 * The shapes come straight from the builder data model (`../model`); this file
 * is pure data and lives entirely in the canvas target dir.
 */

import type {
  BlockManifest,
  EditableField,
  PropsSchema,
} from "../model"
import { heroSpotlightManifest } from "../model/_mock-data"

/** A reusable a11y contract for static content blocks. */
const staticA11y = {
  requiresLabel: false,
  keyboardOperable: false,
  visibleFocus: false,
  respectsReducedMotion: true,
} as const

/** A reusable preview hint. */
const basicPreview = {
  sampleProps: {},
  aspectRatio: "16/9",
  background: "canvas",
  thumbnailBreakpoint: "lg",
  animate: false,
} as const

function leafManifest(
  type: string,
  name: string,
  category: BlockManifest["category"],
  summary: string,
  propsSchema: PropsSchema,
  defaultProps: BlockManifest["defaultProps"],
  editableFields: readonly EditableField[],
  tokenDependencies: BlockManifest["tokenDependencies"],
  tags: readonly string[],
): BlockManifest {
  return {
    type,
    name,
    category,
    kind: "component",
    version: "1.0.0",
    summary,
    componentPath: "@/app/ui-primitives/builder/canvas",
    importName: name.replace(/\s+/g, ""),
    propsSchema,
    defaultProps,
    editableFields,
    tokenDependencies,
    iconDependencies: [],
    assetDependencies: [],
    allowedChildren: [],
    responsiveRules: [
      { breakpoint: "xs", stack: true, span: 12 },
      { breakpoint: "lg", stack: false, span: 12 },
    ],
    accessibilityRules: staticA11y,
    previewConfig: basicPreview,
    codeExample: { language: "tsx", code: `<${name.replace(/\s+/g, "")} />` },
    setupInstructions: { steps: [`Drop ${name} onto the canvas.`] },
    tags,
  }
}

const headingManifest = leafManifest(
  "content/heading",
  "Heading",
  "Content",
  "A section heading with an eyebrow kicker and an alignment control.",
  {
    fields: [
      { key: "kicker", type: "string", required: false, description: "Small label above the heading." },
      { key: "text", type: "string", required: true, description: "Heading text." },
      { key: "align", type: "enum", required: true, options: ["start", "center", "end"], description: "Alignment." },
    ],
  },
  { kicker: "Workshop", text: "Built to last", align: "start" },
  [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "text", label: "Heading", control: "text", valueType: "string" },
    { path: "align", label: "Alignment", control: "select", valueType: "enum", options: ["start", "center", "end"] },
  ],
  [
    { token: "--primitive-text-strong", category: "color", usage: "heading colour" },
    { token: "--primitive-h2", category: "typography", usage: "heading size" },
  ],
  ["content", "text"],
)

const paragraphManifest = leafManifest(
  "content/paragraph",
  "Paragraph",
  "Content",
  "A body-copy block with adjustable measure and emphasis.",
  {
    fields: [
      { key: "text", type: "richtext", required: true, description: "Body copy." },
      { key: "emphasis", type: "boolean", required: false, description: "Render in a stronger tone." },
    ],
  },
  {
    text: "Honest pricing, no surprises. We diagnose, quote, then get you back on the road.",
    emphasis: false,
  },
  [
    { path: "text", label: "Body copy", control: "textarea", valueType: "richtext" },
    { path: "emphasis", label: "Emphasised", control: "toggle", valueType: "boolean", optional: true },
  ],
  [
    { token: "--primitive-body", category: "color", usage: "body colour" },
    { token: "--primitive-text-base", category: "typography", usage: "body size" },
  ],
  ["content", "text"],
)

const ctaManifest = leafManifest(
  "marketing/cta",
  "Call To Action",
  "Marketing",
  "A primary metallic CTA button with a label and a destination.",
  {
    fields: [
      { key: "label", type: "string", required: true, description: "Button label." },
      { key: "href", type: "url", required: true, description: "Destination." },
      { key: "tone", type: "enum", required: true, options: ["primary", "secondary"], description: "Button tone." },
    ],
  },
  { label: "Book a service", href: "/book", tone: "primary" },
  [
    { path: "label", label: "Label", control: "text", valueType: "string" },
    { path: "href", label: "Link", control: "url", valueType: "url" },
    { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["primary", "secondary"] },
  ],
  [
    { token: "--primitive-btn-primary-bg", category: "button", usage: "CTA background" },
    { token: "--primitive-btn-primary-fg", category: "button", usage: "CTA label colour" },
  ],
  ["marketing", "cta"],
)

const statManifest = leafManifest(
  "data/stat",
  "Stat",
  "Data",
  "A single headline figure with a caption — tabular numerals.",
  {
    fields: [
      { key: "value", type: "string", required: true, description: "The figure, e.g. 4.9★." },
      { key: "label", type: "string", required: true, description: "What the figure measures." },
    ],
  },
  { value: "4.9", label: "Average rating" },
  [
    { path: "value", label: "Value", control: "text", valueType: "string" },
    { path: "label", label: "Label", control: "text", valueType: "string" },
  ],
  [
    { token: "--primitive-red", category: "color", usage: "figure accent" },
    { token: "--primitive-display", category: "typography", usage: "figure size" },
  ],
  ["data", "metric"],
)

const dividerManifest = leafManifest(
  "content/divider",
  "Divider",
  "Foundations",
  "A hairline rule for separating sections.",
  {
    fields: [
      { key: "spacing", type: "enum", required: true, options: ["compact", "normal", "roomy"], description: "Vertical rhythm." },
    ],
  },
  { spacing: "normal" },
  [{ path: "spacing", label: "Spacing", control: "select", valueType: "enum", options: ["compact", "normal", "roomy"] }],
  [{ token: "--primitive-line", category: "color", usage: "rule colour" }],
  ["foundations", "layout"],
)

const noticeManifest = leafManifest(
  "content/notice",
  "Notice",
  "Content",
  "A callout banner with an info / warning / success tone.",
  {
    fields: [
      { key: "title", type: "string", required: true, description: "Notice title." },
      { key: "body", type: "richtext", required: false, description: "Supporting copy." },
      { key: "tone", type: "enum", required: true, options: ["info", "warning", "success"], description: "Tone." },
    ],
  },
  { title: "Open this Saturday", body: "Walk-ins welcome 8am–1pm.", tone: "info" },
  [
    { path: "title", label: "Title", control: "text", valueType: "string" },
    { path: "body", label: "Body", control: "textarea", valueType: "richtext", optional: true },
    { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["info", "warning", "success"] },
  ],
  [
    { token: "--primitive-panel", category: "color", usage: "banner surface" },
    { token: "--primitive-teal", category: "color", usage: "info accent" },
  ],
  ["content", "callout"],
)

/**
 * Every demo manifest, in palette order. The hero spotlight is reused from the
 * model's mock data so the canvas shares one source of truth with the model.
 */
export const DEMO_MANIFESTS: readonly BlockManifest[] = [
  heroSpotlightManifest,
  headingManifest,
  paragraphManifest,
  ctaManifest,
  statManifest,
  noticeManifest,
  dividerManifest,
]
