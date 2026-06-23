/**
 * BlockManifest — the design-time definition of one builder block.
 *
 * The manifest is the backbone the canvas, the section library, and the CMS all
 * reuse. It is pure data: it declares what a block IS (type, schema, defaults),
 * what it DEPENDS ON (tokens, icons, assets), how it may COMPOSE
 * (allowedChildren), how it BEHAVES (responsive / a11y / seo / conversion), and
 * how it is PRESENTED + DOCUMENTED (preview, code example, setup).
 *
 * A `BlockManifest` is the template; a `Block` (see `factory.ts`) is a concrete,
 * instantiated node on a page built from a manifest.
 */

import type { BlockCategory, BlockKind } from "./block-kind"
import type {
  AccessibilityRules,
  ConversionGoal,
  ResponsiveRule,
  SeoRules,
} from "./rules"
import type { CodeExample, PreviewConfig, SetupInstructions } from "./preview"
import type { EditableField, PropsRecord, PropsSchema } from "./schema"
import type { TokenDependency } from "./tokens"

/** A non-token dependency the block pulls from the icon library. */
export interface IconDependency {
  /** Icon name, e.g. lucide "wrench" or a house icon slug. */
  name: string
  /** Import path the icon is exported from. */
  importPath: string
  /** What the icon marks, e.g. "service category badge". */
  usage?: string
}

/** A media/asset dependency (image, video, font, lottie, etc.). */
export interface AssetDependency {
  /** Stable asset id or filename. */
  id: string
  type: "image" | "video" | "audio" | "font" | "vector" | "lottie" | "document"
  /** Whether the block cannot render without it. */
  required: boolean
  /** Human note, e.g. "hero background, 1920x1080 webp". */
  description?: string
}

/**
 * Containment constraint. A child rule may allow a coarse `kind` and/or an
 * explicit set of block `types`. An empty manifest `allowedChildren` array means
 * the block is a leaf.
 */
export interface AllowedChild {
  /** Coarse kind constraint. */
  kind?: BlockKind
  /** Explicit block types permitted (overrides/narrows `kind`). */
  types?: readonly string[]
  /** Min/max occurrences of matching children. */
  min?: number
  max?: number
}

/** The design-time definition of one block. */
export interface BlockManifest {
  /** Stable block type discriminator, e.g. "hero/service-spotlight". */
  type: string
  /** Human title for the palette. */
  name: string
  category: BlockCategory
  kind: BlockKind
  /** Semver-ish version of the manifest; bumped on schema changes. */
  version: string
  /** Short author-facing summary. */
  summary: string

  /** Module the component is exported from (matches the registry importPath). */
  componentPath: string
  /** Named export within `componentPath`. */
  importName: string

  /** Shape of the component's props. */
  propsSchema: PropsSchema
  /** Props applied when the block is first dropped onto the canvas. */
  defaultProps: PropsRecord
  /** Curated owner-editable subset of props. */
  editableFields: readonly EditableField[]

  /** Central `--primitive-*` tokens the block reads. Token-driven only. */
  tokenDependencies: readonly TokenDependency[]
  /** Icons the block renders. */
  iconDependencies: readonly IconDependency[]
  /** Media/assets the block needs. */
  assetDependencies: readonly AssetDependency[]

  /** Containment rules; empty = leaf block. */
  allowedChildren: readonly AllowedChild[]

  /** Per-breakpoint behaviour. */
  responsiveRules: readonly ResponsiveRule[]
  /** Accessibility contract. */
  accessibilityRules: AccessibilityRules

  /** Optional SEO hints. */
  seoRules?: SeoRules
  /** Optional conversion intent. */
  conversionGoal?: ConversionGoal

  /** How the block previews in the palette/canvas. */
  previewConfig: PreviewConfig
  /** Runnable docs example(s). One or many. */
  codeExample: CodeExample | readonly CodeExample[]
  /** Setup notes for the docs surface. */
  setupInstructions: SetupInstructions

  /** Free-form search/filter tags. */
  tags?: readonly string[]
}

/** Whether a manifest declares itself a leaf (no children allowed). */
export function isLeafManifest(manifest: BlockManifest): boolean {
  return manifest.allowedChildren.length === 0
}

/** Whether a manifest permits a child of the given block type. */
export function manifestAllowsChildType(manifest: BlockManifest, childType: string): boolean {
  if (manifest.allowedChildren.length === 0) {
    return false
  }
  return manifest.allowedChildren.some((rule) => rule.types?.includes(childType) ?? false)
}
