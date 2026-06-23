/**
 * Shared fixtures for the API console sub-routes.
 *
 * Underscore-prefixed so Next.js does not treat it as a route segment.
 * These shapes match the typed props from the api-console components
 * so the showcase pages stay honest about what real data looks like.
 */

import type {
  ApiKeyRecord,
  CorsPolicy,
  ExplorerResponse,
  InspectorRequest,
  InspectorResponse,
  OAuthAppCardProps,
  RetryQueueItem,
  SigningAlgorithm,
  WebhookLogEntry,
  WebhookSigningSecretRowProps,
  WebhookSubscriberItem,
} from "../components/api-console"
import type {
  ApiKeyScope,
  HttpMethod,
  HttpStatusCode,
} from "../components/api-console"

export const AVAILABLE_SCOPES: ReadonlyArray<ApiKeyScope> = [
  "quotes:read",
  "quotes:write",
  "parts:read",
  "parts:write",
  "bookings:read",
  "bookings:write",
  "invoices:read",
  "invoices:write",
  "admin:all",
]

export interface EndpointFixture {
  method: HttpMethod
  path: string
  description: string
  version: string
  auth: import("../components/api-console").AuthMethod
  deprecated?: boolean
}

export const ENDPOINTS: ReadonlyArray<EndpointFixture> = [
  {
    method: "GET",
    path: "/v1/quotes",
    description: "List quotes for the authenticated workshop, paginated by cursor.",
    version: "v1 stable",
    auth: "bearer",
  },
  {
    method: "POST",
    path: "/v1/quotes",
    description: "Create a new quote attached to a vehicle registration and service code.",
    version: "v1 stable",
    auth: "bearer",
  },
  {
    method: "GET",
    path: "/v1/parts/{sku}",
    description: "Look up a single muffler part by SKU. Returns inventory and supersession metadata.",
    version: "v1 stable",
    auth: "api-key",
  },
  {
    method: "PATCH",
    path: "/v1/bookings/{id}/status",
    description: "Transition a workshop booking — accepted, in_progress, ready_for_pickup, completed.",
    version: "v1 stable",
    auth: "bearer",
  },
  {
    method: "DELETE",
    path: "/v1/quotes/{id}",
    description: "Void an outstanding quote that has not been converted to a booking.",
    version: "v1 stable",
    auth: "bearer",
  },
  {
    method: "GET",
    path: "/v0/legacy/parts",
    description: "Legacy 2018 catalogue endpoint — retained for the old garage tablet image.",
    version: "v0 legacy",
    auth: "basic",
    deprecated: true,
  },
]

export const API_KEYS: ReadonlyArray<ApiKeyRecord> = [
  {
    id: "key_live_workshop_kiosk",
    name: "Workshop kiosk (production)",
    maskedValue: "mfm_pk_live_• • • • • • • 7af2",
    status: "active",
    scopes: ["quotes:read", "quotes:write", "bookings:read", "bookings:write"],
    createdAt: "2026-03-04 09:12",
    lastUsedAt: "2026-05-28 08:41",
    rotatesAt: "2026-09-04",
  },
  {
    id: "key_live_finance",
    name: "Finance — invoice sync",
    maskedValue: "mfm_sk_live_• • • • • • • a91d",
    status: "rotating",
    scopes: ["invoices:read", "invoices:write"],
    createdAt: "2025-11-19 14:02",
    lastUsedAt: "2026-05-27 22:18",
  },
  {
    id: "key_test_warehouse",
    name: "Warehouse scanner (test)",
    maskedValue: "mfm_pk_test_• • • • • • • 4c20",
    status: "active",
    scopes: ["parts:read", "parts:write"],
    createdAt: "2026-04-22 10:35",
    lastUsedAt: null,
  },
  {
    id: "key_revoked_intern",
    name: "Intern playground (deprecated)",
    maskedValue: "mfm_pk_test_• • • • • • • 0001",
    status: "revoked",
    scopes: ["quotes:read"],
    createdAt: "2024-12-01 11:00",
    lastUsedAt: "2025-08-14 16:00",
  },
]

export const SUBSCRIBERS: ReadonlyArray<WebhookSubscriberItem> = [
  {
    id: "sub_quote_synced",
    url: "https://workshop.muffler.men/hooks/quotes",
    events: ["quote.created", "quote.updated", "quote.voided"],
    status: "delivered",
    lastDeliveryAt: "2026-05-28 08:41 (218ms)",
    maskedSecret: "whsec_••••••••••••7af2",
  },
  {
    id: "sub_booking_status",
    url: "https://crm.muffler.men/api/booking-status",
    events: ["booking.cancelled", "booking.completed"],
    status: "retrying",
    lastDeliveryAt: "2026-05-28 07:55 (1.2s)",
    maskedSecret: "whsec_••••••••••••0c8a",
  },
  {
    id: "sub_invoice_paid",
    url: "https://accounting.muffler.men/webhooks/stripe-bridge",
    events: ["invoice.paid", "invoice.failed"],
    status: "delivered",
    lastDeliveryAt: "2026-05-28 06:12 (412ms)",
    maskedSecret: "whsec_••••••••••••a91d",
  },
  {
    id: "sub_failed",
    url: "https://legacy.muffler.men/hooks/old",
    events: ["quote.created"],
    status: "failed",
    lastDeliveryAt: "2026-05-26 22:00 (timeout)",
    maskedSecret: "whsec_••••••••••••dead",
  },
]

export const EVENT_LOG: ReadonlyArray<WebhookLogEntry> = [
  {
    id: "evt_001",
    timestamp: "2026-05-28 08:41:09",
    eventType: "quote.created",
    endpointUrl: "https://workshop.muffler.men/hooks/quotes",
    status: 200,
    durationMs: 218,
    retryCount: 0,
    payloadJson: JSON.stringify(
      {
        id: "qte_2026_0512",
        registration: "OAK-194",
        service: "muffler_swap",
        vehicle: { make: "Falcon", model: "XR6", year: 2008 },
        total_aud: 642.0,
        created_at: "2026-05-28T08:41:08Z",
      },
      null,
      2,
    ),
  },
  {
    id: "evt_002",
    timestamp: "2026-05-28 08:38:02",
    eventType: "booking.cancelled",
    endpointUrl: "https://crm.muffler.men/api/booking-status",
    status: 502,
    durationMs: 1190,
    retryCount: 2,
    payloadJson: JSON.stringify(
      {
        id: "bkg_2026_0489",
        reason: "customer_requested",
        cancelled_by: "kiosk_terminal_2",
        original_slot: "2026-05-30T13:00:00+10:00",
      },
      null,
      2,
    ),
  },
  {
    id: "evt_003",
    timestamp: "2026-05-28 06:12:54",
    eventType: "invoice.paid",
    endpointUrl: "https://accounting.muffler.men/webhooks/stripe-bridge",
    status: 201,
    durationMs: 412,
    retryCount: 0,
    payloadJson: JSON.stringify(
      {
        id: "inv_2026_1188",
        booking_id: "bkg_2026_0481",
        amount_aud: 318.5,
        method: "card_present",
        paid_at: "2026-05-28T06:12:50Z",
      },
      null,
      2,
    ),
  },
  {
    id: "evt_004",
    timestamp: "2026-05-26 22:00:33",
    eventType: "quote.created",
    endpointUrl: "https://legacy.muffler.men/hooks/old",
    status: 504,
    durationMs: 30_000,
    retryCount: 5,
    payloadJson: JSON.stringify(
      {
        id: "qte_2026_0506",
        registration: "OAK-002",
        service: "exhaust_inspection",
        total_aud: 89.0,
      },
      null,
      2,
    ),
  },
]

export const RETRY_QUEUE: ReadonlyArray<RetryQueueItem> = [
  {
    id: "rty_001",
    eventType: "booking.cancelled",
    endpointUrl: "https://crm.muffler.men/api/booking-status",
    attempt: 3,
    maxAttempts: 6,
    nextRetryAt: "2026-05-28 09:01",
    backoffLabel: "exp x4 → 4m",
    lastError: "502 Bad Gateway from upstream",
  },
  {
    id: "rty_002",
    eventType: "quote.created",
    endpointUrl: "https://legacy.muffler.men/hooks/old",
    attempt: 5,
    maxAttempts: 6,
    nextRetryAt: "2026-05-28 09:30",
    backoffLabel: "exp x16 → 16m",
    lastError: "504 Gateway Timeout (30s)",
  },
  {
    id: "rty_003",
    eventType: "invoice.failed",
    endpointUrl: "https://accounting.muffler.men/webhooks/stripe-bridge",
    attempt: 1,
    maxAttempts: 6,
    nextRetryAt: "2026-05-28 08:56",
    backoffLabel: "exp x1 → 60s",
    lastError: "Connection reset by peer",
  },
]

export const INSPECTOR_REQUEST: InspectorRequest = {
  method: "POST",
  url: "https://api.muffler.men/v1/quotes",
  headers: [
    { name: "Authorization", value: "Bearer mufflermen_live_sk_…7af2" },
    { name: "Content-Type", value: "application/json" },
    { name: "X-Mufflermen-Trace-Id", value: "trc_2026_0528_0841_a812" },
    { name: "Accept", value: "application/json" },
  ],
  body: JSON.stringify(
    {
      registration: "OAK-194",
      service: "muffler_swap",
      vehicle: { make: "Falcon", model: "XR6", year: 2008 },
      notes: "Customer reports rattle on cold start. Workshop bay 3 confirmed.",
    },
    null,
    2,
  ),
}

export const INSPECTOR_RESPONSE: InspectorResponse = {
  status: 201 satisfies HttpStatusCode,
  durationMs: 218,
  headers: [
    { name: "Content-Type", value: "application/json" },
    { name: "X-Mufflermen-Quote-Id", value: "qte_2026_0512" },
    { name: "Cache-Control", value: "no-store" },
  ],
  body: JSON.stringify(
    {
      id: "qte_2026_0512",
      status: "draft",
      total_aud: 642.0,
      created_at: "2026-05-28T08:41:08Z",
      url: "https://workshop.muffler.men/quotes/qte_2026_0512",
    },
    null,
    2,
  ),
}

export const EXPLORER_RESPONSE: ExplorerResponse = {
  status: 200 satisfies HttpStatusCode,
  durationMs: 184,
  body: JSON.stringify(
    {
      data: [
        { id: "qte_2026_0512", registration: "OAK-194", total_aud: 642.0, status: "draft" },
        { id: "qte_2026_0511", registration: "OAK-088", total_aud: 318.5, status: "accepted" },
        { id: "qte_2026_0510", registration: "OAK-002", total_aud: 89.0, status: "voided" },
      ],
      meta: { cursor_next: "qte_2026_0509", count: 3 },
    },
    null,
    2,
  ),
}

export const CORS_POLICY: CorsPolicy = {
  allowedOrigins: ["https://workshop.muffler.men", "https://*.muffler.men"],
  allowedMethods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type", "X-Mufflermen-Trace-Id"],
  allowCredentials: true,
  maxAge: 600,
}

export const OAUTH_APPS: ReadonlyArray<OAuthAppCardProps> = [
  {
    clientName: "Workshop kiosk OS",
    clientIdMasked: "oauth_client_• • • • • • 9c4a",
    description: "Authenticates the wall-mounted Garage tablet at Oak Flats Bay 1.",
    redirectUris: [
      "https://kiosk.muffler.men/auth/callback",
      "muffler-kiosk://oauth/callback",
    ],
    scopes: ["quotes:read", "bookings:read", "bookings:write"],
    status: "live",
  },
  {
    clientName: "Mobile mechanic app",
    clientIdMasked: "oauth_client_• • • • • • 04d1",
    description: "Field technician iOS / Android app for on-site quotes.",
    redirectUris: ["muffler-mechanic://oauth/callback"],
    scopes: ["quotes:write", "parts:read"],
    status: "draft",
  },
]

export const SIGNING_SECRETS: ReadonlyArray<WebhookSigningSecretRowProps> = [
  {
    label: "Workshop invoice signer",
    maskedSecret: "whsec_••••••••••••7af2",
    algorithm: "HMAC-SHA256" satisfies SigningAlgorithm,
    lastRotatedAt: "2026-03-04 09:12",
    scopeDescription: "Signs invoice.paid and invoice.failed deliveries.",
  },
  {
    label: "Booking status signer",
    maskedSecret: "whsec_••••••••••••0c8a",
    algorithm: "HMAC-SHA512" satisfies SigningAlgorithm,
    lastRotatedAt: "2026-04-22 10:35",
    scopeDescription: "Signs booking.* webhook payloads to CRM.",
  },
  {
    label: "Compliance audit signer",
    maskedSecret: "whsec_••••••••••••a91d",
    algorithm: "RSA-SHA256" satisfies SigningAlgorithm,
    lastRotatedAt: "2026-01-12 18:00",
    scopeDescription: "Asymmetric signer required by the audit pipeline.",
  },
]
