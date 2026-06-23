/**
 * Mock fixtures for the builder data model — used by previews/tests and to seed
 * a `BuilderStore`. Every value is token-driven; no literal colors/sizes.
 */

import { createBlock, createPage } from "./factory"
import type { BlockManifest } from "./manifest"
import type { PageConfig } from "./page-config"

/** A leaf hero block manifest, token-driven throughout. */
export const heroSpotlightManifest: BlockManifest = {
  type: "hero/service-spotlight",
  name: "Service Spotlight Hero",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary: "Full-bleed hero with headline, supporting copy, and a primary CTA.",
  componentPath: "@/app/ui-primitives/components/hero",
  importName: "ServiceSpotlightHero",
  propsSchema: {
    fields: [
      { key: "headline", type: "string", required: true, description: "Main headline." },
      { key: "subcopy", type: "richtext", required: false, description: "Supporting copy." },
      { key: "ctaLabel", type: "string", required: true, description: "Primary button label." },
      { key: "ctaHref", type: "url", required: true, description: "Primary button target." },
    ],
  },
  defaultProps: {
    headline: "Exhaust & Muffler Specialists",
    subcopy: "Booked in, sorted, back on the road.",
    ctaLabel: "Book a service",
    ctaHref: "/book",
  },
  editableFields: [
    { path: "headline", label: "Headline", control: "text", valueType: "string" },
    { path: "subcopy", label: "Sub-copy", control: "richtext", valueType: "richtext", optional: true },
    { path: "ctaLabel", label: "Button label", control: "text", valueType: "string" },
    { path: "ctaHref", label: "Button link", control: "url", valueType: "url" },
  ],
  tokenDependencies: [
    { token: "--primitive-canvas", category: "color", usage: "hero background" },
    { token: "--primitive-text-strong", category: "color", usage: "headline color" },
    { token: "--primitive-display", category: "typography", usage: "headline size" },
    { token: "--primitive-btn-primary-bg", category: "button", usage: "CTA background" },
    { token: "--primitive-space-12", category: "space", usage: "section padding" },
    { token: "--primitive-duration-normal", category: "motion", usage: "reveal transition" },
  ],
  iconDependencies: [
    { name: "wrench", importPath: "lucide-react", usage: "service accent mark" },
  ],
  assetDependencies: [
    { id: "hero-bg", type: "image", required: false, description: "Optional 1920x1080 webp backdrop." },
  ],
  allowedChildren: [],
  responsiveRules: [
    { breakpoint: "xs", stack: true, span: 12 },
    { breakpoint: "lg", stack: false, span: 12 },
  ],
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 1,
  },
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "Service",
    indexable: true,
  },
  conversionGoal: {
    id: "book-service",
    label: "Book a service",
    action: "click",
    eventName: "hero_cta_click",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {
      headline: "Exhaust & Muffler Specialists",
      ctaLabel: "Book a service",
      ctaHref: "/book",
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: `import { ServiceSpotlightHero } from "@/app/ui-primitives/components/hero"

<ServiceSpotlightHero
  headline="Exhaust & Muffler Specialists"
  ctaLabel="Book a service"
  ctaHref="/book"
/>`,
    caption: "Minimal usage with required props.",
  },
  setupInstructions: {
    steps: [
      "Import ServiceSpotlightHero from the hero family.",
      "Provide a headline, ctaLabel, and ctaHref.",
      "Optionally supply subcopy and a hero-bg image asset.",
    ],
    notes: ["Honours prefers-reduced-motion automatically."],
  },
  tags: ["hero", "cta", "marketing"],
}

/** A sample page built from the manifest above. */
export const samplePage: PageConfig = createPage({
  meta: { slug: "home", title: "Oak Flats Mufflermen" },
  blocks: [createBlock(heroSpotlightManifest)],
})

export const mockManifests: readonly BlockManifest[] = [heroSpotlightManifest]
