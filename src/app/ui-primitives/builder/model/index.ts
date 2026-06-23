/**
 * Builder data model — public barrel.
 *
 * The backbone the canvas, section library, and CMS reuse. Pure data + types:
 * block manifests (templates), block instances, page configs (ordered block
 * tree + style profile + meta), an in-memory store, and serialize helpers.
 *
 * TOKEN-DRIVEN ONLY: blocks reference central `--primitive-*` tokens; they never
 * carry literal color/size/space/radius/motion values.
 */

// — Tokens —————————————————————————————————————————————————
export {
  ALL_PRIMITIVE_TOKENS,
  PRIMITIVE_TOKENS,
  isPrimitiveToken,
  tokenVar,
} from "./tokens"
export type { PrimitiveTokenName, TokenCategory, TokenDependency } from "./tokens"

// — Block taxonomy ————————————————————————————————————————
export {
  BLOCK_CATEGORIES,
  BLOCK_KIND_ORDER,
  canContainKind,
  isBlockCategory,
  isBlockKind,
} from "./block-kind"
export type { BlockCategory, BlockKind } from "./block-kind"

// — Props schema + editable fields ————————————————————————
export { validateProps } from "./schema"
export type {
  EditableField,
  EditorControl,
  PropSchemaField,
  PropsRecord,
  PropsSchema,
  PropsValidationResult,
  PropValue,
  PropValueType,
} from "./schema"

// — Behavioural rules —————————————————————————————————————
export {
  BREAKPOINT_ORDER,
  BREAKPOINTS,
  DEFAULT_ACCESSIBILITY_RULES,
  isBreakpoint,
} from "./rules"
export type {
  AccessibilityRules,
  Breakpoint,
  ConversionGoal,
  ResponsiveRule,
  SeoRules,
} from "./rules"

// — Preview + docs ————————————————————————————————————————
export type {
  CodeExample,
  PreviewConfig,
  SetupInstructions,
} from "./preview"

// — Manifest ——————————————————————————————————————————————
export { isLeafManifest, manifestAllowsChildType } from "./manifest"
export type {
  AllowedChild,
  AssetDependency,
  BlockManifest,
  IconDependency,
} from "./manifest"

// — Block instance ————————————————————————————————————————
export { countBlocks, findBlock, walkBlocks } from "./block"
export type { Block, TokenOverride } from "./block"

// — Page config ———————————————————————————————————————————
export {
  DEFAULT_STYLE_PROFILE,
  PAGE_CONFIG_SCHEMA_VERSION,
} from "./page-config"
export type {
  PageConfig,
  PageMeta,
  PageStatus,
  StyleProfile,
  ThemeMode,
} from "./page-config"

// — Factory ————————————————————————————————————————————————
export { createBlock, createPage } from "./factory"
export type { CreateBlockOptions, CreatePageOptions } from "./factory"

// — Id —————————————————————————————————————————————————————
export { createId } from "./id"

// — Serialize ——————————————————————————————————————————————
export { deserializePageConfig, serializePageConfig } from "./serialize"
export type { DeserializeResult } from "./serialize"

// — Store ——————————————————————————————————————————————————
export { BuilderStore, createBuilderStore } from "./store"
export type { BuilderStoreSnapshot } from "./store"
