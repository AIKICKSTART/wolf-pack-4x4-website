/**
 * Component documentation types — docs-1 manifest set.
 *
 * A `ComponentDocEntry` is a `BlockManifest` (the builder/CMS backbone) extended
 * with the documentation-surface fields the docs page renders: usage examples,
 * a11y notes, responsive notes, CMS + drag-drop compatibility, and step-by-step
 * AI-agent implementation instructions.
 *
 * These are pure, read-only data descriptors. They DO NOT import or render the
 * family components — they document them. Every design value referenced is a
 * central `--primitive-*` token (see `docs/tokenization-sweep-contract.md`); no
 * literal color/size/space/radius/motion values appear here.
 */

import type { BlockManifest } from "../model"

/** A single worked usage example for the docs surface. */
export interface DocUsageExample {
  /** Short title, e.g. "Dashboard KPI card". */
  title: string
  /** What scenario this demonstrates. */
  scenario: string
  /** Runnable JSX snippet matching the real component API. */
  code: string
}

/**
 * How a primitive behaves inside the visual CMS / page-builder. Pure metadata
 * the builder palette + schema-driven renderer read.
 */
export interface CmsCompatibility {
  /** Whether the owner can drop this primitive onto a CMS page. */
  isCmsBlock: boolean
  /** Whether it can be dragged/reordered on the canvas. */
  draggable: boolean
  /** Whether it accepts child blocks (container) vs. is a leaf. */
  acceptsChildren: boolean
  /**
   * Props that hold structured array/object content the CMS exposes as a
   * repeater (e.g. "features", "entries", "rows"). Empty when the block has no
   * collection content.
   */
  repeaterProps: readonly string[]
  /** Free-form notes on editing this block in the CMS. */
  notes: readonly string[]
}

/** Accessibility documentation for a primitive, beyond the manifest contract. */
export interface DocA11yNotes {
  /** Keyboard interaction model, plain-language. */
  keyboard: readonly string[]
  /** Screen-reader / ARIA behaviour. */
  screenReader: readonly string[]
  /** Reduced-motion behaviour. */
  reducedMotion: string
  /** Contrast / focus-visibility callouts. */
  focus: readonly string[]
}

/** Responsive documentation for a primitive across 320 → 1920. */
export interface DocResponsiveNotes {
  /** Behaviour at the small end (320–767). */
  mobile: string
  /** Behaviour at the mid range (768–1023). */
  tablet: string
  /** Behaviour at the wide end (1024–1920). */
  desktop: string
  /** Whether content overflows horizontally (scroller) on narrow viewports. */
  hasHorizontalScroll: boolean
}

/** Step-by-step instructions an AI agent follows to wire this primitive in. */
export interface DocAgentInstructions {
  /** Ordered, imperative steps. */
  steps: readonly string[]
  /** Common pitfalls to avoid. */
  pitfalls: readonly string[]
  /** Hard requirements (peer providers, required props, client boundary). */
  requirements: readonly string[]
}

/**
 * A documentation entry: the full `BlockManifest` plus the docs-surface fields.
 * `importName`, `componentPath`, `propsSchema`, `tokenDependencies`,
 * `iconDependencies`, `assetDependencies`, `previewConfig`, `codeExample`, and
 * `setupInstructions` all live on the embedded `BlockManifest`.
 */
export interface ComponentDocEntry {
  /** The builder/CMS manifest for the primitive (single source of the schema). */
  manifest: BlockManifest
  /** One-line role of the primitive in the family. */
  role: string
  /** Worked usage examples beyond the manifest's canonical `codeExample`. */
  usageExamples: readonly DocUsageExample[]
  a11y: DocA11yNotes
  responsive: DocResponsiveNotes
  cms: CmsCompatibility
  agent: DocAgentInstructions
}

/** One family's documentation: an ordered array of entries plus metadata. */
export interface ComponentDocFamily {
  /** Family slug, e.g. "surfaces". */
  family: string
  /** Human title. */
  title: string
  /** Palette/registry group bucket. */
  group: string
  /** Short family summary. */
  summary: string
  /** Module the whole family is re-exported from (the barrel). */
  barrelPath: string
  /** One doc entry per exported primitive in the family. */
  entries: readonly ComponentDocEntry[]
}
