/**
 * Serialize / deserialize a `PageConfig` to and from JSON.
 *
 * Serialisation is a stable JSON string. Deserialisation validates untrusted
 * input structurally (no `any`: input is `unknown`, narrowed step by step) and
 * returns a typed result rather than throwing on malformed data, so callers can
 * surface a clean error.
 */

import type { Block } from "./block"
import { isBlockCategory, isBlockKind } from "./block-kind"
import {
  PAGE_CONFIG_SCHEMA_VERSION,
  type PageConfig,
  type PageMeta,
  type PageStatus,
  type StyleProfile,
} from "./page-config"

const PAGE_STATUSES: readonly PageStatus[] = ["draft", "in-review", "published", "archived"]

/** Result of a deserialise attempt. */
export type DeserializeResult =
  | { ok: true; page: PageConfig }
  | { ok: false; error: string }

/** Serialise a page to a stable JSON string. */
export function serializePageConfig(page: PageConfig, pretty = false): string {
  return JSON.stringify(page, null, pretty ? 2 : undefined)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function parseBlock(value: unknown, path: string): Block {
  if (!isRecord(value)) {
    throw new Error(`${path}: block must be an object`)
  }
  const { id, type, name, category, kind, version, props, children } = value
  if (typeof id !== "string") throw new Error(`${path}.id: expected string`)
  if (typeof type !== "string") throw new Error(`${path}.type: expected string`)
  if (typeof name !== "string") throw new Error(`${path}.name: expected string`)
  if (!isBlockCategory(category)) throw new Error(`${path}.category: invalid`)
  if (!isBlockKind(kind)) throw new Error(`${path}.kind: invalid`)
  if (typeof version !== "string") throw new Error(`${path}.version: expected string`)
  if (!isRecord(props)) throw new Error(`${path}.props: expected object`)
  if (!Array.isArray(children)) throw new Error(`${path}.children: expected array`)

  const parsedChildren = children.map((child, i) => parseBlock(child, `${path}.children[${i}]`))

  const block: Block = {
    id,
    type,
    name,
    category,
    kind,
    version,
    props: props as Block["props"],
    children: parsedChildren,
  }
  if (typeof value.hidden === "boolean") {
    return { ...block, hidden: value.hidden }
  }
  if (typeof value.note === "string") {
    return { ...block, note: value.note }
  }
  return block
}

function parseStyleProfile(value: unknown): StyleProfile {
  if (!isRecord(value)) throw new Error("styleProfile: expected object")
  const required = [
    "id",
    "name",
    "mode",
    "accentToken",
    "surfaceToken",
    "displayFontToken",
    "bodyFontToken",
    "radiusToken",
    "motionToken",
  ] as const
  for (const key of required) {
    if (typeof value[key] !== "string") {
      throw new Error(`styleProfile.${key}: expected string`)
    }
  }
  return value as unknown as StyleProfile
}

function parseMeta(value: unknown): PageMeta {
  if (!isRecord(value)) throw new Error("meta: expected object")
  if (typeof value.slug !== "string") throw new Error("meta.slug: expected string")
  if (typeof value.title !== "string") throw new Error("meta.title: expected string")
  if (typeof value.createdAt !== "string") throw new Error("meta.createdAt: expected string")
  if (typeof value.updatedAt !== "string") throw new Error("meta.updatedAt: expected string")
  if (value.keywords !== undefined && !isStringArray(value.keywords)) {
    throw new Error("meta.keywords: expected string[]")
  }
  return value as unknown as PageMeta
}

/** Parse + validate a JSON string into a `PageConfig`. Never throws. */
export function deserializePageConfig(json: string): DeserializeResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch (error: unknown) {
    return { ok: false, error: error instanceof Error ? error.message : "invalid JSON" }
  }

  try {
    if (!isRecord(parsed)) {
      throw new Error("root: expected object")
    }
    if (typeof parsed.id !== "string") throw new Error("id: expected string")
    if (typeof parsed.schemaVersion !== "number") throw new Error("schemaVersion: expected number")
    if (parsed.schemaVersion > PAGE_CONFIG_SCHEMA_VERSION) {
      throw new Error(
        `schemaVersion ${parsed.schemaVersion} is newer than supported ${PAGE_CONFIG_SCHEMA_VERSION}`,
      )
    }
    if (typeof parsed.status !== "string" || !PAGE_STATUSES.includes(parsed.status as PageStatus)) {
      throw new Error("status: invalid")
    }
    if (!Array.isArray(parsed.blocks)) throw new Error("blocks: expected array")

    const page: PageConfig = {
      id: parsed.id,
      schemaVersion: parsed.schemaVersion,
      meta: parseMeta(parsed.meta),
      status: parsed.status as PageStatus,
      styleProfile: parseStyleProfile(parsed.styleProfile),
      blocks: parsed.blocks.map((block, i) => parseBlock(block, `blocks[${i}]`)),
    }
    return { ok: true, page }
  } catch (error: unknown) {
    return { ok: false, error: error instanceof Error ? error.message : "malformed PageConfig" }
  }
}
