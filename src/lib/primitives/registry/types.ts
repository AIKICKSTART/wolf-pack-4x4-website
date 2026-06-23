/**
 * Primitive registry — the single machine-readable catalogue of the whole
 * Mufflermen UI-primitives system (125 families, 1,700+ components).
 *
 * The CMS page-builder palette, the primitives sidebar, and the future
 * schema-driven renderer all derive from this one source. Each family
 * contributes a fragment (`fragments/<family>.ts`) that conforms to
 * `PrimitiveFamilyManifest`; the aggregator in `index.ts` composes them.
 *
 * See `docs/cms-swarm-context.md` for the authoring contract.
 */

/** How a primitive is consumed. */
export type PrimitiveKind =
  | "block" // usable as a CMS content block (has a `blockType`)
  | "primitive" // a standalone reusable component
  | "widget" // a dashboard/control-surface widget
  | "section" // a page section / composition
  | "scene" // a full composed showcase scene
  | "icon" // an icon primitive

/** Capture/improvement state, tracked as the swarm sweeps the system. */
export type PrimitiveStatus = "captured" | "improved" | "deprecated"

/** Top-level grouping buckets used by the sidebar + palette. */
export type PrimitiveGroup =
  | "Foundations"
  | "Chrome"
  | "Content"
  | "Marketing"
  | "Commerce"
  | "Operations"
  | "Data"
  | "AI"
  | "Media"
  | "Auth"
  | "System"

/** One registered primitive. */
export interface PrimitiveEntry {
  /** Globally-unique stable key, e.g. "block-editor/callout". */
  key: string
  /** Owning component family slug, e.g. "block-editor". */
  family: string
  /** Exported component name, e.g. "CalloutBlock". */
  name: string
  /** Human-facing label. */
  label: string
  /** One-line description of what it renders. */
  description: string
  kind: PrimitiveKind
  /** Module specifier the component is exported from. */
  importPath: string
  /** Showcase route, when one exists. */
  routeHref?: string
  /** CMS block discriminator — present only when `kind === "block"`. */
  blockType?: string
  /** Free-form search/filter tags. */
  tags?: readonly string[]
  status: PrimitiveStatus
}

/** One family's contribution to the registry. */
export interface PrimitiveFamilyManifest {
  /** Family slug, e.g. "block-editor". Matches the fragment file name. */
  family: string
  /** Human title, e.g. "Block editor". */
  title: string
  group: PrimitiveGroup
  /** Short description of the family's purpose. */
  summary: string
  entries: readonly PrimitiveEntry[]
}
