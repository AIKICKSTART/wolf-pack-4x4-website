/**
 * Shared types for the API + webhooks console primitives.
 *
 * These are exported from `index.ts` so sub-routes and downstream consumers
 * can type their fixtures and props without re-declaring HTTP shapes.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"

/**
 * Most common HTTP status codes used across the Mufflermen REST + webhook API.
 *
 * Not exhaustive — the union covers the codes used in our SDKs and surfaces
 * (2xx, 3xx, common 4xx, common 5xx). Use `number` if a code falls outside it.
 */
export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 301
  | 302
  | 304
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 410
  | 422
  | 429
  | 500
  | 502
  | 503
  | 504

export type HttpStatusClass = "2xx" | "3xx" | "4xx" | "5xx"

export type AuthMethod = "bearer" | "basic" | "api-key" | "mtls" | "oidc"

export type WebhookEventStatus =
  | "delivered"
  | "pending"
  | "retrying"
  | "failed"
  | "abandoned"

export type ApiKeyScope =
  | "quotes:read"
  | "quotes:write"
  | "parts:read"
  | "parts:write"
  | "bookings:read"
  | "bookings:write"
  | "invoices:read"
  | "invoices:write"
  | "admin:all"

export type ApiKeyStatus = "active" | "rotating" | "revoked"

/**
 * Classifies an HTTP status code by its leading digit.
 * 200 → "2xx", 404 → "4xx", etc.
 */
export function classifyStatus(code: number): HttpStatusClass {
  if (code >= 200 && code < 300) return "2xx"
  if (code >= 300 && code < 400) return "3xx"
  if (code >= 400 && code < 500) return "4xx"
  return "5xx"
}

/**
 * Standard reason phrases for the status codes we surface in the console.
 * Used by `HttpStatusChip` so callers don't need to hand-roll labels.
 */
export const REASON_PHRASE: Record<HttpStatusCode, string> = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
}

/**
 * Pretty labels for the supported auth methods.
 */
export const AUTH_METHOD_LABEL: Record<AuthMethod, string> = {
  bearer: "Bearer",
  basic: "Basic",
  "api-key": "API Key",
  mtls: "mTLS",
  oidc: "OIDC",
}
