/**
 * Factory helpers for instantiating blocks and pages from manifests.
 *
 * `createBlock` turns a `BlockManifest` (template) into a concrete `Block`
 * (instance) with a fresh id and the manifest's default props, applying any
 * caller overrides immutably. `createPage` assembles a `PageConfig` envelope.
 */

import type { Block, TokenOverride } from "./block"
import { createId } from "./id"
import type { BlockManifest } from "./manifest"
import {
  DEFAULT_STYLE_PROFILE,
  PAGE_CONFIG_SCHEMA_VERSION,
  type PageConfig,
  type PageMeta,
  type StyleProfile,
} from "./page-config"
import type { ResponsiveRule } from "./rules"
import type { PropsRecord } from "./schema"

/** Options for instantiating a block from its manifest. */
export interface CreateBlockOptions {
  /** Props merged over the manifest `defaultProps`. */
  props?: PropsRecord
  /** Child instances to attach. */
  children?: readonly Block[]
  /** Display name override (defaults to manifest name). */
  name?: string
  /** Per-instance responsive overrides. */
  responsiveOverrides?: readonly ResponsiveRule[]
  /** Per-instance token remaps. */
  tokenOverrides?: readonly TokenOverride[]
  /** Explicit id (defaults to a generated one). */
  id?: string
}

/** Instantiate a concrete block from its manifest. Pure — returns a new object. */
export function createBlock(manifest: BlockManifest, options: CreateBlockOptions = {}): Block {
  const block: Block = {
    id: options.id ?? createId("block"),
    type: manifest.type,
    name: options.name ?? manifest.name,
    category: manifest.category,
    kind: manifest.kind,
    version: manifest.version,
    props: { ...manifest.defaultProps, ...(options.props ?? {}) },
    children: options.children ?? [],
  }
  if (options.responsiveOverrides) {
    return { ...block, responsiveOverrides: options.responsiveOverrides }
  }
  if (options.tokenOverrides) {
    return { ...block, tokenOverrides: options.tokenOverrides }
  }
  return block
}

/** Options for assembling a page. */
export interface CreatePageOptions {
  blocks?: readonly Block[]
  styleProfile?: StyleProfile
  meta: Partial<PageMeta> & Pick<PageMeta, "slug" | "title">
  id?: string
}

/** Assemble a `PageConfig` envelope. Pure. */
export function createPage(options: CreatePageOptions): PageConfig {
  const now = new Date().toISOString()
  const meta: PageMeta = {
    ...options.meta,
    createdAt: options.meta.createdAt ?? now,
    updatedAt: options.meta.updatedAt ?? now,
  }
  return {
    id: options.id ?? createId("page"),
    schemaVersion: PAGE_CONFIG_SCHEMA_VERSION,
    meta,
    status: "draft",
    styleProfile: options.styleProfile ?? DEFAULT_STYLE_PROFILE,
    blocks: options.blocks ?? [],
  }
}
