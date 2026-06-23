/**
 * Shared types for the Mufflermen API explorer primitives.
 *
 * Re-exports core HTTP / auth shapes from the sibling `api-console` family so
 * downstream surfaces only need one import path for both consoles.
 *
 * The explorer is a developer-facing docs + try-it surface — distinct from
 * the operational console (keys, webhook deliveries, quota meters).
 */

import type {
  AuthMethod,
  HttpMethod,
  HttpStatusCode,
} from "../api-console/api-console-types"

export type {
  AuthMethod,
  HttpMethod,
  HttpStatusCode,
} from "../api-console/api-console-types"

/**
 * Languages the code-sample tabs can render.
 *
 * Mirrors the Mufflermen SDK matrix (`curl`, JavaScript, Python, PHP) so the
 * tabs always reflect what we actually publish to docs.
 */
export type SampleLanguage = "curl" | "javascript" | "python" | "php"

export const SAMPLE_LANGUAGE_LABEL: Record<SampleLanguage, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  python: "Python",
  php: "PHP",
}

/**
 * Package managers covered by the SDK install card.
 */
export type PackageManager = "npm" | "pnpm" | "yarn" | "pip" | "composer"

export const PACKAGE_MANAGER_LABEL: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  pip: "pip",
  composer: "composer",
}

/**
 * Webhook event types published by the Mufflermen API.
 */
export type WebhookEventName =
  | "quote.created"
  | "quote.updated"
  | "quote.voided"
  | "booking.confirmed"
  | "booking.cancelled"
  | "booking.completed"
  | "payment.succeeded"
  | "payment.failed"
  | "invoice.paid"
  | "invoice.failed"

/**
 * Auth strategy configured on an explorer-side credential card.
 */
export type AuthStrategy = "api-key" | "bearer" | "oauth"

/**
 * Connection test states for the auth config card.
 */
export type AuthTestState = "idle" | "testing" | "success" | "failure"

/**
 * Single error code reference (HTTP status + code string + retry guidance).
 */
export interface ErrorCodeEntry {
  code: string
  httpStatus: HttpStatusCode | number
  title: string
  description: string
  /** Free-text retry guidance, e.g. "Backoff for 60s and retry." */
  retryGuidance: string
  /** Whether automatic SDK retry is recommended. */
  retryable: boolean
}

/**
 * JSON schema node used by the schema explorer tree.
 *
 * Intentionally narrower than full JSON-Schema — only the fields docs render.
 */
export type SchemaPrimitive =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | "object"
  | "null"

export interface SchemaNode {
  /** Property name on the parent object. Omitted for root nodes. */
  name?: string
  type: SchemaPrimitive | ReadonlyArray<SchemaPrimitive>
  description?: string
  required?: boolean
  /** Example value rendered next to the node (mono-formatted). */
  example?: string
  /** Format hint (e.g. "date-time", "uuid"). */
  format?: string
  /** Allowed enum values. */
  enumValues?: ReadonlyArray<string>
  /** Children for `object` / `array` nodes. */
  children?: ReadonlyArray<SchemaNode>
}

/**
 * Single try-it history entry — a recently-issued request from the console.
 */
export interface TryItHistoryEntry {
  id: string
  method: HttpMethod
  path: string
  status: HttpStatusCode | number
  durationMs: number
  /** ISO-ish display string — keep the formatting fixture-friendly. */
  timestamp: string
  /** Pre-rendered cURL snippet ready to copy. */
  curl: string
}

/**
 * Single changelog entry surfaced on the explorer.
 */
export interface ChangelogEntry {
  version: string
  releasedAt: string
  summary: string
  breakingChange?: boolean
  /** Bullet items shown beneath the summary. */
  items: ReadonlyArray<string>
}

/**
 * Endpoint summary the catalogue + detail card consume.
 */
export interface EndpointSummary {
  id: string
  method: HttpMethod
  path: string
  summary: string
  description: string
  tag: string
  auth: AuthMethod
  version: string
  deprecated?: boolean
  /** Replacement endpoint id when deprecated. */
  replacedBy?: string
}

/**
 * Rate-limit tile sample shape.
 */
export interface RateLimitTileData {
  label: string
  used: number
  limit: number
  /** ISO display string for the reset moment. */
  resetsAt: string
  /** Recent per-minute samples for the sparkline (oldest → newest). */
  recentUsage: ReadonlyArray<number>
}

/**
 * Single response header rendered in the response viewer.
 */
export interface ResponseHeader {
  name: string
  value: string
}

/**
 * Payload for the response viewer primitive.
 */
export interface ResponsePayload {
  status: HttpStatusCode | number
  durationMs: number
  /** Size in bytes — pre-computed by the caller. */
  sizeBytes: number
  body: string
  headers: ReadonlyArray<ResponseHeader>
}

/**
 * Pretty bytes formatter — pure helper used by response viewer & history rows.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B"
  }
  const units = ["B", "kB", "MB", "GB"] as const
  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10
  return `${rounded} ${units[unitIndex]}`
}

/**
 * Pretty duration formatter — milliseconds → `218ms` or `1.2s`.
 */
export function formatDuration(durationMs: number): string {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return "0ms"
  }
  if (durationMs < 1000) {
    return `${Math.round(durationMs)}ms`
  }
  const seconds = durationMs / 1000
  const rounded = seconds >= 10 ? Math.round(seconds) : Math.round(seconds * 10) / 10
  return `${rounded}s`
}

/**
 * Compose a Mufflermen-flavoured cURL snippet from method/path/auth.
 *
 * The endpoint root is hard-coded — surfaces that need a custom host
 * should override the returned string instead of parameterising this helper.
 */
export function buildCurl(method: HttpMethod, path: string, authBearer?: string): string {
  const tokenLine = authBearer
    ? `  -H "Authorization: Bearer ${authBearer}" \\\n`
    : ""
  return (
    `curl -X ${method} \\\n` +
    `  "https://api.muffler.men${path}" \\\n` +
    tokenLine +
    `  -H "Accept: application/json"`
  )
}
