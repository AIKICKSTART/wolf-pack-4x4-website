/**
 * Component documentation manifest types for the `docs-2` doc set.
 *
 * A `ComponentDocEntry` is a BlockManifest-shaped documentation record: it reuses
 * the real builder data-model vocabulary (props schema, token/icon/asset
 * dependencies, preview config, code examples, setup instructions) and layers on
 * the doc-surface fields the per-primitive documentation page renders — usage
 * examples, accessibility notes, responsive notes, CMS + drag-drop compatibility,
 * and AI-agent implementation instructions.
 *
 * These manifests are READ-ONLY documentation derived from the live component
 * families. They never re-declare a literal color/size/space/radius/motion value —
 * design values are referenced only as `--primitive-*` token names via the
 * builder model's `TokenDependency` contract.
 */

import type {
  AssetDependency,
  BlockCategory,
  BlockKind,
  CodeExample,
  IconDependency,
  PreviewConfig,
  PropsSchema,
  SetupInstructions,
  TokenDependency,
} from "../model"

/** One worked usage example shown on the docs page. */
export interface DocUsageExample {
  /** Short title, e.g. "Controlled with a parent store". */
  title: string
  /** What the example demonstrates and when to reach for it. */
  description: string
  /** The runnable snippet. */
  example: CodeExample
}

/** Accessibility guidance surfaced beside the component. */
export interface DocAccessibilityNotes {
  /** Semantic role/landmark the component renders as. */
  role?: string
  /** Whether the component needs a caller-provided accessible name. */
  requiresLabel: boolean
  /** Keyboard interactions the component supports. */
  keyboard: readonly string[]
  /** Whether a visible focus state is exposed. */
  visibleFocus: boolean
  /** Whether motion honours `prefers-reduced-motion`. */
  respectsReducedMotion: boolean
  /** Free-form reviewer/author notes. */
  notes?: readonly string[]
}

/** Responsive behaviour notes from 320 → 1920. */
export interface DocResponsiveNotes {
  /** Behaviour at the narrow end (≈320–767px). */
  mobile: string
  /** Behaviour at the mid range (≈768–1023px). */
  tablet: string
  /** Behaviour at the wide end (≈1024–1920px). */
  desktop: string
  /** Optional extra notes (overflow, stacking, container queries). */
  notes?: readonly string[]
}

/** CMS + drag-and-drop compatibility metadata for the page builder. */
export interface DocCmsCompatibility {
  /** Whether the component can be registered as a droppable CMS block. */
  cmsBlock: boolean
  /** Builder block type to register under, when `cmsBlock` is true. */
  blockType?: string
  /** Builder taxonomy level the component sits at. */
  blockKind: BlockKind
  /** Whether the component can be dragged/reordered on the canvas. */
  draggable: boolean
  /** Whether the component can host dropped children. */
  acceptsChildren: boolean
  /** Notes on how the owner edits it in the visual CMS. */
  notes: readonly string[]
}

/** Instructions an AI coding agent follows to implement the component. */
export interface DocAgentInstructions {
  /** When the agent should pick this component over alternatives. */
  whenToUse: string
  /** Ordered implementation steps. */
  steps: readonly string[]
  /** Common mistakes the agent must avoid. */
  pitfalls: readonly string[]
}

/**
 * One BlockManifest-shaped documentation entry for a single exported primitive.
 *
 * Field names mirror `BlockManifest` (`importName`, `componentPath`,
 * `propsSchema`, `tokenDependencies`, `iconDependencies`, `assetDependencies`,
 * `previewConfig`, `codeExample`, `setupInstructions`) so the docs surface and
 * the builder share one vocabulary.
 */
export interface ComponentDocEntry {
  /** Stable doc key, e.g. "ai/chat-thread". */
  key: string
  /** Named export the component is published under. */
  importName: string
  /** Human title for the docs index. */
  name: string
  /** One-line author-facing summary. */
  summary: string
  /** Palette category bucket. */
  category: BlockCategory
  /** Builder taxonomy level. */
  kind: BlockKind

  /** Module the component is exported from (registry-aligned import path). */
  componentPath: string
  /** Showcase route, when one exists. */
  routeHref?: string

  /** Shape of the component's real props. */
  propsSchema: PropsSchema
  /** Central `--primitive-*` tokens the component reads. */
  tokenDependencies: readonly TokenDependency[]
  /** Icons the component renders. */
  iconDependencies: readonly IconDependency[]
  /** Media/assets the component needs. */
  assetDependencies: readonly AssetDependency[]

  /** How the component previews across viewports. */
  previewConfig: PreviewConfig
  /** Accurate, copy-ready primary code example. */
  codeExample: CodeExample
  /** Additional worked usage examples. */
  usageExamples: readonly DocUsageExample[]
  /** Setup steps for the docs surface. */
  setupInstructions: SetupInstructions

  /** Accessibility contract + keyboard map. */
  accessibility: DocAccessibilityNotes
  /** Responsive behaviour, 320 → 1920. */
  responsive: DocResponsiveNotes
  /** CMS + drag-and-drop compatibility. */
  cms: DocCmsCompatibility
  /** AI-agent implementation guidance. */
  agent: DocAgentInstructions

  /** Free-form search/filter tags. */
  tags?: readonly string[]
}

/** A family-level documentation manifest: a titled array of doc entries. */
export interface ComponentDocFamily {
  /** Family slug, e.g. "ai". */
  family: string
  /** Human title. */
  title: string
  /** Palette category bucket the family belongs to. */
  group: BlockCategory
  /** Short family summary. */
  summary: string
  /** Module the whole family is re-exported from (the barrel). */
  importPath: string
  /** One doc entry per exported primitive. */
  entries: readonly ComponentDocEntry[]
}
