import type { BlockManifest } from "../../../builder/model/manifest"
import type { PropSchemaField } from "../../../builder/model/schema"

import {
  CONTENT_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/before-after-gallery"

const ITEM_SCHEMA: PropSchemaField = {
  key: "item",
  type: "object",
  required: true,
  fields: [
    { key: "id", type: "string", required: true },
    { key: "title", type: "string", required: true },
    { key: "summary", type: "string", required: true },
    { key: "beforeSrc", type: "image", required: true },
    { key: "beforeAlt", type: "string", required: true },
    { key: "afterSrc", type: "image", required: true },
    { key: "afterAlt", type: "string", required: true },
    { key: "result", type: "string", required: false },
  ],
}

/** BlockManifest for the before/after install gallery. */
export const beforeAfterGalleryManifest: BlockManifest = {
  type: "marketing-section/before-after-gallery",
  name: "Before / after gallery",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Grid of job cards that toggle between the stock photo and the finished Mufflermen install, with a result chip.",
  componentPath: COMPONENT_PATH,
  importName: "BeforeAfterGallery",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: false },
      { key: "items", type: "array", required: true, items: ITEM_SCHEMA },
    ],
  },
  defaultProps: {
    kicker: "Proof in the metal",
    heading: "Before & after the bay",
    body: "Every job photographed on the hoist — stock system out, custom Mufflermen install in.",
    items: [
      {
        id: "vdj79",
        title: "VDJ79 — 4in turbo-back",
        summary: "Tired factory system replaced with a 4in mandrel-bent dual.",
        beforeSrc: "/media/brand/page-cover-service-detail.webp",
        beforeAlt: "Factory exhaust on a LandCruiser before the upgrade",
        afterSrc: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/hero.webp",
        afterAlt: "Finished 4in turbo-back install on the hoist",
        result: "+38rwkW",
      },
    ],
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string" },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "string", optional: true },
    {
      path: "items",
      label: "Gallery jobs",
      control: "repeater",
      valueType: "array",
      hint: "Each job needs a before image + after image with alt text.",
    },
    { path: "items[].title", label: "Job title", control: "text", valueType: "string" },
    { path: "items[].summary", label: "Job summary", control: "textarea", valueType: "string" },
    { path: "items[].beforeSrc", label: "Before image", control: "image-picker", valueType: "image" },
    { path: "items[].afterSrc", label: "After image", control: "image-picker", valueType: "image" },
    { path: "items[].result", label: "Result chip", control: "text", valueType: "string", optional: true },
  ],
  tokenDependencies: CONTENT_SECTION_TOKENS,
  iconDependencies: [],
  assetDependencies: [
    {
      id: "before-after-before",
      type: "image",
      required: true,
      description: "Stock / before photo per job, ideally 4:3 webp.",
    },
    {
      id: "before-after-after",
      type: "image",
      required: true,
      description: "Finished install / after photo per job, ideally 4:3 webp.",
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
      "Before/after toggle is a button group with aria-pressed.",
      "Each card figure is labelled by its title via aria-labelledby.",
    ],
  },
  seoRules: {
    contributesHeading: true,
    requiresAltText: true,
    indexable: true,
  },
  previewConfig: {
    sampleProps: {
      kicker: "Proof in the metal",
      heading: "Before & after the bay",
      items: [],
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Show finished installs on a service or gallery page.",
    code: `import { BeforeAfterGallery } from "@/app/ui-primitives/section-library/marketing/sections/before-after-gallery"

export function InstallProof() {
  return (
    <BeforeAfterGallery
      kicker="Proof in the metal"
      heading="Before & after the bay"
      items={[
        {
          id: "vdj79",
          title: "VDJ79 — 4in turbo-back",
          summary: "Factory system out, mandrel-bent dual in.",
          beforeSrc: "/media/brand/page-cover-service-detail.webp",
          beforeAlt: "Factory exhaust before",
          afterSrc: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/hero.webp",
          afterAlt: "Finished install after",
          result: "+38rwkW",
        },
      ]}
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import BeforeAfterGallery (client component — toggles state).",
      "Supply a heading and an items array.",
      "Each item needs beforeSrc/afterSrc plus descriptive alt text.",
      "Add an optional result chip per job (e.g. a power figure).",
    ],
    notes: ["Images are lazy-loaded.", "Alt text is required for accessibility and SEO."],
  },
  tags: ["gallery", "before-after", "proof", "marketing"],
}

export default beforeAfterGalleryManifest
