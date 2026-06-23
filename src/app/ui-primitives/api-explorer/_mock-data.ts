/**
 * Shared fixtures for the Mufflermen API explorer sub-routes.
 *
 * Underscore-prefixed so the Next.js App Router does not interpret it as
 * a route segment. These shapes match the typed props exported from the
 * api-explorer primitive family.
 */

import {
  buildCurl,
  type ChangelogEntry,
  type CodeSamples,
  type EndpointSummary,
  type ErrorCodeEntry,
  type InstallSnippets,
  type RateLimitTileData,
  type ResponsePayload,
  type SchemaNode,
  type TryItHistoryEntry,
  type WebhookEventName,
} from "../components/api-explorer"

export const ENDPOINT_LIST_PARTS: EndpointSummary = {
  id: "ep_get_parts",
  method: "GET",
  path: "/v1/parts",
  summary: "List parts catalogue",
  description:
    "Returns the muffler parts catalogue. Supports cursor pagination, supersession filtering, and stock-on-hand inclusion. Honours the workshop's location filter when a Suburb header is present.",
  tag: "Parts",
  auth: "bearer",
  version: "v1 stable",
}

export const ENDPOINT_CREATE_QUOTE: EndpointSummary = {
  id: "ep_post_quote",
  method: "POST",
  path: "/v1/quotes",
  summary: "Create quote",
  description:
    "Creates a draft quote attached to a vehicle registration and service code. Will inherit the current pricing schedule unless overridden in the body.",
  tag: "Quotes",
  auth: "bearer",
  version: "v1 stable",
}

export const ENDPOINTS: ReadonlyArray<EndpointSummary> = [
  ENDPOINT_LIST_PARTS,
  ENDPOINT_CREATE_QUOTE,
  {
    id: "ep_get_quotes",
    method: "GET",
    path: "/v1/quotes",
    summary: "List quotes",
    description: "List quotes attached to the authenticated workshop.",
    tag: "Quotes",
    auth: "bearer",
    version: "v1 stable",
  },
  {
    id: "ep_post_booking",
    method: "POST",
    path: "/v1/bookings",
    summary: "Confirm booking",
    description: "Confirm a workshop booking from an accepted quote.",
    tag: "Bookings",
    auth: "bearer",
    version: "v1 stable",
  },
  {
    id: "ep_patch_booking",
    method: "PATCH",
    path: "/v1/bookings/{id}/status",
    summary: "Transition booking",
    description: "Update the booking state machine — accepted, in_progress, ready, completed.",
    tag: "Bookings",
    auth: "bearer",
    version: "v1 stable",
  },
  {
    id: "ep_post_payment",
    method: "POST",
    path: "/v1/payments",
    summary: "Capture payment",
    description: "Capture a payment intent for an invoiced booking.",
    tag: "Payments",
    auth: "bearer",
    version: "v1 stable",
  },
  {
    id: "ep_get_suburbs",
    method: "GET",
    path: "/v1/suburbs",
    summary: "List service suburbs",
    description: "Returns the Illawarra suburbs Mufflermen currently services.",
    tag: "Locations",
    auth: "api-key",
    version: "v1 stable",
  },
  {
    id: "ep_get_part_sku",
    method: "GET",
    path: "/v1/parts/{sku}",
    summary: "Get part by SKU",
    description: "Look up a single part by SKU with supersession metadata.",
    tag: "Parts",
    auth: "api-key",
    version: "v1 stable",
  },
  {
    id: "ep_post_quote_legacy",
    method: "POST",
    path: "/v0/quote",
    summary: "Legacy quote endpoint",
    description: "Deprecated 2018 quote endpoint. Use POST /v1/quotes instead.",
    tag: "Quotes",
    auth: "basic",
    version: "v0 legacy",
    deprecated: true,
    replacedBy: "ep_post_quote",
  },
]

export const RESPONSE_SUCCESS: ResponsePayload = {
  status: 200,
  durationMs: 184,
  sizeBytes: 1832,
  body: JSON.stringify(
    {
      data: [
        {
          sku: "MFM-OE-7821",
          title: "OE-spec rear muffler — Falcon XR6",
          stock_on_hand: 12,
          price_aud: 318.5,
          fitment: { make: "Falcon", model: "XR6", year_range: "2002-2008" },
        },
        {
          sku: "MFM-PERF-9120",
          title: "Performance cat-back kit — VE Commodore",
          stock_on_hand: 4,
          price_aud: 1240.0,
          fitment: { make: "Commodore", model: "VE", year_range: "2006-2013" },
        },
      ],
      meta: { cursor_next: "MFM-OE-7820", count: 2 },
    },
    null,
    2,
  ),
  headers: [
    { name: "Content-Type", value: "application/json" },
    { name: "X-Mufflermen-Trace-Id", value: "trc_2026_0529_0823_a812" },
    { name: "X-Ratelimit-Remaining", value: "592" },
    { name: "Cache-Control", value: "no-store" },
  ],
}

export const RESPONSE_ERROR: ResponsePayload = {
  status: 422,
  durationMs: 96,
  sizeBytes: 248,
  body: JSON.stringify(
    {
      error: {
        code: "validation_failed",
        message: "service code 'mufler_swap' is not a known service",
        field: "service",
        suggested: "muffler_swap",
      },
    },
    null,
    2,
  ),
  headers: [
    { name: "Content-Type", value: "application/json" },
    { name: "X-Mufflermen-Trace-Id", value: "trc_2026_0529_0824_c019" },
  ],
}

export const QUOTE_SCHEMA: SchemaNode = {
  name: "Quote",
  type: "object",
  description: "A workshop quote created against a vehicle registration.",
  required: true,
  children: [
    {
      name: "id",
      type: "string",
      description: "Server-assigned identifier.",
      required: true,
      example: "qte_2026_0512",
      format: "uuid",
    },
    {
      name: "registration",
      type: "string",
      description: "Australian vehicle registration plate.",
      required: true,
      example: "OAK-194",
    },
    {
      name: "service",
      type: "string",
      description: "Service code being quoted.",
      required: true,
      enumValues: ["muffler_swap", "exhaust_inspection", "cat_replacement", "tune_diagnostic"],
    },
    {
      name: "total_aud",
      type: "number",
      description: "Total quote amount in Australian dollars.",
      required: true,
      example: "642.00",
      format: "decimal",
    },
    {
      name: "vehicle",
      type: "object",
      description: "Vehicle the quote is attached to.",
      required: true,
      children: [
        { name: "make", type: "string", required: true, example: "Falcon" },
        { name: "model", type: "string", required: true, example: "XR6" },
        { name: "year", type: "integer", required: true, example: "2008" },
      ],
    },
    {
      name: "line_items",
      type: "array",
      description: "Itemised parts and labour.",
      required: false,
      children: [
        {
          name: "[item]",
          type: "object",
          children: [
            { name: "sku", type: "string", required: true, example: "MFM-OE-7821" },
            { name: "quantity", type: "integer", required: true, example: "1" },
            { name: "unit_price_aud", type: "number", required: true, example: "318.50" },
          ],
        },
      ],
    },
    {
      name: "created_at",
      type: "string",
      description: "Quote creation timestamp.",
      required: true,
      format: "date-time",
      example: "2026-05-28T08:41:08Z",
    },
  ],
}

export const SAMPLES_LIST_PARTS: CodeSamples = {
  curl: buildCurl("GET", "/v1/parts", "mfm_live_sk_…7af2"),
  javascript: `import { Mufflermen } from "@mufflermen/parts"

const client = new Mufflermen({ apiKey: process.env.MUFFLERMEN_KEY })

const parts = await client.parts.list({ limit: 25 })
console.log(\`\${parts.data.length} parts available\`)`,
  python: `from mufflermen import Mufflermen

client = Mufflermen(api_key=os.environ["MUFFLERMEN_KEY"])

parts = client.parts.list(limit=25)
print(f"{len(parts.data)} parts available")`,
  php: `<?php
require 'vendor/autoload.php';

$client = new \\Mufflermen\\Client(getenv('MUFFLERMEN_KEY'));
$parts = $client->parts()->list(['limit' => 25]);

foreach ($parts->data as $part) {
    echo "{$part->sku} — {$part->title}\\n";
}`,
}

export const SAMPLES_CREATE_QUOTE: CodeSamples = {
  curl: `${buildCurl("POST", "/v1/quotes", "mfm_live_sk_…7af2")} \\
  -H "Content-Type: application/json" \\
  -d '{ "registration": "OAK-194", "service": "muffler_swap" }'`,
  javascript: `const quote = await client.quotes.create({
  registration: "OAK-194",
  service: "muffler_swap",
  vehicle: { make: "Falcon", model: "XR6", year: 2008 },
})`,
  python: `quote = client.quotes.create(
    registration="OAK-194",
    service="muffler_swap",
    vehicle={"make": "Falcon", "model": "XR6", "year": 2008},
)`,
}

export const ERROR_CODES: ReadonlyArray<ErrorCodeEntry> = [
  {
    code: "validation_failed",
    httpStatus: 422,
    title: "Request body failed validation",
    description: "One or more fields in the request body failed schema validation.",
    retryGuidance: "Inspect the error.field hint and re-submit with corrected values.",
    retryable: false,
  },
  {
    code: "rate_limited",
    httpStatus: 429,
    title: "Rate limit exceeded",
    description: "Your workshop exceeded the per-minute request budget for this endpoint.",
    retryGuidance: "Back off for the period in the Retry-After header — SDK retries handle this automatically.",
    retryable: true,
  },
  {
    code: "invalid_token",
    httpStatus: 401,
    title: "Bearer token rejected",
    description: "The Authorization header is missing, malformed, or refers to a revoked token.",
    retryGuidance: "Rotate the workshop API key in the console and update your environment.",
    retryable: false,
  },
  {
    code: "stock_unavailable",
    httpStatus: 409,
    title: "Part out of stock",
    description: "The requested SKU has zero stock on hand at the targeted location.",
    retryGuidance: "Check the supersession metadata for a replacement SKU or another suburb.",
    retryable: false,
  },
  {
    code: "upstream_unavailable",
    httpStatus: 502,
    title: "Workshop pricing engine offline",
    description: "The downstream pricing engine is temporarily unreachable.",
    retryGuidance: "Back off exponentially. Mufflermen SDKs retry up to 3 times by default.",
    retryable: true,
  },
]

export const RATE_LIMIT_FREE: RateLimitTileData = {
  label: "Free tier",
  used: 412,
  limit: 600,
  resetsAt: "08:43 AEST",
  recentUsage: [320, 388, 240, 410, 502, 440, 460, 412, 380, 412],
}

export const RATE_LIMIT_PLUS: RateLimitTileData = {
  label: "Plus tier",
  used: 2240,
  limit: 6000,
  resetsAt: "08:43 AEST",
  recentUsage: [1800, 2120, 1980, 2210, 2380, 2660, 2420, 2240, 2120, 2240],
}

export const RATE_LIMIT_BURST: RateLimitTileData = {
  label: "Burst — bookings",
  used: 588,
  limit: 600,
  resetsAt: "08:42 AEST",
  recentUsage: [320, 410, 480, 560, 588, 600, 588, 588, 588, 588],
}

export const HISTORY_ROWS: ReadonlyArray<TryItHistoryEntry> = [
  {
    id: "his_001",
    method: "GET",
    path: "/v1/parts?limit=25",
    status: 200,
    durationMs: 184,
    timestamp: "08:41:09",
    curl: buildCurl("GET", "/v1/parts?limit=25", "mfm_live_sk_…7af2"),
  },
  {
    id: "his_002",
    method: "POST",
    path: "/v1/quotes",
    status: 201,
    durationMs: 218,
    timestamp: "08:42:12",
    curl: `${buildCurl("POST", "/v1/quotes", "mfm_live_sk_…7af2")} \\
  -d '{"registration":"OAK-194","service":"muffler_swap"}'`,
  },
  {
    id: "his_003",
    method: "PATCH",
    path: "/v1/bookings/bkg_2026_0489/status",
    status: 200,
    durationMs: 144,
    timestamp: "08:43:55",
    curl: buildCurl("PATCH", "/v1/bookings/bkg_2026_0489/status", "mfm_live_sk_…7af2"),
  },
  {
    id: "his_004",
    method: "POST",
    path: "/v0/quote",
    status: 422,
    durationMs: 96,
    timestamp: "08:44:01",
    curl: buildCurl("POST", "/v0/quote", "mfm_live_sk_…7af2"),
  },
  {
    id: "his_005",
    method: "GET",
    path: "/v1/suburbs",
    status: 304,
    durationMs: 22,
    timestamp: "08:44:30",
    curl: buildCurl("GET", "/v1/suburbs", "mfm_live_sk_…7af2"),
  },
]

export const CHANGELOG_ENTRIES: ReadonlyArray<ChangelogEntry> = [
  {
    version: "v1.4",
    releasedAt: "2026-05-22",
    summary: "Bookings state machine adds ready_for_pickup transition.",
    items: [
      "PATCH /v1/bookings/{id}/status now accepts 'ready_for_pickup'.",
      "Webhook booking.confirmed now includes pickup window estimate.",
      "Plus-tier rate limit raised from 5,000 to 6,000 req/min.",
    ],
  },
  {
    version: "v1.3",
    releasedAt: "2026-04-15",
    summary: "Payment intents now require workshop_id at the top level.",
    breakingChange: true,
    items: [
      "POST /v1/payments — workshop_id moved from metadata to the root.",
      "Stripe-bridge payloads renamed `amount` → `amount_aud`.",
      "Deprecated POST /v0/quote — sunset 2026-12-31.",
    ],
  },
  {
    version: "v1.2",
    releasedAt: "2026-03-04",
    summary: "Parts supersession metadata + per-suburb stock filtering.",
    items: [
      "GET /v1/parts/{sku} returns supersession SKUs.",
      "Suburb header `X-Mufflermen-Suburb` honoured on /v1/parts.",
    ],
  },
]

export const SDK_PARTS_SNIPPETS: InstallSnippets = {
  npm: "npm install @mufflermen/parts",
  pnpm: "pnpm add @mufflermen/parts",
  yarn: "yarn add @mufflermen/parts",
  pip: "pip install mufflermen-parts",
  composer: "composer require mufflermen/parts-sdk",
}

export const SDK_QUOTES_SNIPPETS: InstallSnippets = {
  npm: "npm install @mufflermen/quotes",
  pnpm: "pnpm add @mufflermen/quotes",
  yarn: "yarn add @mufflermen/quotes",
}

export const WEBHOOK_EVENTS_PRIMARY: ReadonlyArray<WebhookEventName> = [
  "quote.created",
  "booking.confirmed",
  "payment.succeeded",
]
