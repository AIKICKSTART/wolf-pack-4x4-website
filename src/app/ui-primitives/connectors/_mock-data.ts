/* Mock data for the connectors showcase routes.
 * Intentionally specific to Oak Flats Mufflermen — Google Calendar for the
 * workshop, Stripe payments at the front counter, Twilio SMS to customers,
 * Shopify for parts, Xero for the books, Replicate for AI image gen, etc.
 */

import type {
  EventRelayEntry,
  ScopePermissionEntry,
  ScopePermissionLevel,
} from "../components/connectors"

// === OAuth providers ============================================

export const OAUTH_GOOGLE_CONNECTED = {
  provider: "google" as const,
  providerName: "Google Workspace",
  monogram: "G",
  status: "connected" as const,
  account: "ops@oakflatsmufflers.com.au",
  scopes: ["calendar.events", "drive.file", "gmail.send"] as const,
  expiresIn: "in 28 days",
}

export const OAUTH_META_WARNING = {
  provider: "meta" as const,
  providerName: "Meta Business",
  monogram: "M",
  status: "warning" as const,
  account: "Oak Flats Mufflermen · IG @oakflatsmufflers",
  scopes: ["pages_manage_posts", "instagram_basic", "pages_read_engagement"] as const,
  expiresIn: "in 4 days",
}

export const OAUTH_TIKTOK_DISCONNECTED = {
  provider: "tiktok" as const,
  providerName: "TikTok Business",
  monogram: "TT",
  status: "disconnected" as const,
  scopes: ["video.publish", "user.info.basic"] as const,
  expiresIn: undefined,
}

export const OAUTH_STRIPE_CONNECTED = {
  provider: "stripe" as const,
  providerName: "Stripe",
  monogram: "S",
  status: "connected" as const,
  account: "acct_1NfA9xMufflermenAU",
  scopes: ["charge.read", "payment_intent.write", "balance.read"] as const,
  expiresIn: "rolling key — no expiry",
}

export const OAUTH_XERO_CONNECTED = {
  provider: "xero" as const,
  providerName: "Xero",
  monogram: "X",
  status: "syncing" as const,
  account: "Oak Flats Mufflermen Pty Ltd",
  scopes: ["accounting.transactions", "accounting.contacts", "accounting.reports.read"] as const,
  expiresIn: "in 56 days",
}

export const OAUTH_SHOPIFY_PENDING = {
  provider: "shopify" as const,
  providerName: "Shopify Plus",
  monogram: "SH",
  status: "pending" as const,
  account: "oak-flats-parts.myshopify.com",
  scopes: ["read_orders", "write_inventory", "read_products"] as const,
  expiresIn: "—",
}

// === API key vault =============================================

export const VAULT_STRIPE = {
  provider: "openai" as const, // Stripe lives in OAuth list; use OpenAI provider category
  providerName: "Stripe (secret key)",
  keyName: "STRIPE_SECRET_KEY",
  secret: "env:STRIPE_SECRET_KEY",
  status: "connected" as const,
  rotationCadence: "Rotate every 90 days",
  daysUntilRotation: 42,
  lastRotatedAt: "2026-04-17",
}

export const VAULT_REPLICATE = {
  provider: "replicate" as const,
  providerName: "Replicate",
  keyName: "REPLICATE_API_TOKEN",
  secret: "env:REPLICATE_API_TOKEN",
  status: "warning" as const,
  rotationCadence: "Rotate every 60 days",
  daysUntilRotation: 8,
  lastRotatedAt: "2026-03-22",
}

export const VAULT_OPENAI = {
  provider: "openai" as const,
  providerName: "OpenAI",
  keyName: "OPENAI_API_KEY",
  secret: "env:OPENAI_API_KEY",
  status: "connected" as const,
  rotationCadence: "Rotate every 30 days",
  daysUntilRotation: -3,
  lastRotatedAt: "2026-04-26",
}

export const VAULT_ANTHROPIC = {
  provider: "anthropic" as const,
  providerName: "Anthropic",
  keyName: "ANTHROPIC_API_KEY",
  secret: "sk-ant-MufflermenClassifierLive99",
  status: "connected" as const,
  rotationCadence: "Rotate every 90 days",
  daysUntilRotation: 67,
  lastRotatedAt: "2026-03-22",
}

export const VAULT_PAYLOAD_SECRET = {
  provider: "cloudflare" as const,
  providerName: "Payload (root secret)",
  keyName: "PAYLOAD_SECRET",
  secret: "pl_secret_MufflermenCmsRootBoot9942",
  status: "connected" as const,
  rotationCadence: "Rotate every 180 days",
  daysUntilRotation: 110,
  lastRotatedAt: "2026-01-29",
}

// === Webhook config ============================================

export const WEBHOOK_STRIPE = {
  source: "Stripe payments",
  endpoint: "https://oakflatsmufflers.com.au/api/webhooks/stripe",
  signingSecret: "whsec_StripeMufflermenLiveSigningSecret9942",
  status: "connected" as const,
  events: [
    {
      id: "pi.succeeded",
      label: "Payment succeeded",
      code: "payment_intent.succeeded",
      defaultEnabled: true,
    },
    {
      id: "pi.failed",
      label: "Payment failed",
      code: "payment_intent.payment_failed",
      defaultEnabled: true,
    },
    {
      id: "charge.refunded",
      label: "Charge refunded",
      code: "charge.refunded",
      defaultEnabled: true,
    },
    {
      id: "invoice.paid",
      label: "Invoice paid",
      code: "invoice.paid",
      defaultEnabled: false,
    },
    {
      id: "customer.created",
      label: "Customer created",
      code: "customer.created",
      defaultEnabled: false,
    },
  ] as const,
}

export const WEBHOOK_SHOPIFY = {
  source: "Shopify orders",
  endpoint: "https://oakflatsmufflers.com.au/api/webhooks/shopify",
  signingSecret: "shpss_ShopifyMufflermenOrderHookV2",
  status: "warning" as const,
  events: [
    { id: "orders.create", label: "Order created", code: "orders/create", defaultEnabled: true },
    { id: "orders.paid", label: "Order paid", code: "orders/paid", defaultEnabled: true },
    {
      id: "orders.cancelled",
      label: "Order cancelled",
      code: "orders/cancelled",
      defaultEnabled: true,
    },
    {
      id: "fulfillments.create",
      label: "Fulfillment created",
      code: "fulfillments/create",
      defaultEnabled: false,
    },
  ] as const,
}

export const WEBHOOK_TWILIO = {
  source: "Twilio inbound SMS",
  endpoint: "https://oakflatsmufflers.com.au/api/webhooks/twilio/sms",
  signingSecret: "tw_TwilioMufflermenInboundSmsSig01",
  status: "error" as const,
  events: [
    {
      id: "sms.inbound",
      label: "Inbound SMS",
      code: "messaging.inbound",
      defaultEnabled: true,
    },
    {
      id: "sms.status",
      label: "Status callback",
      code: "messaging.status",
      defaultEnabled: true,
    },
  ] as const,
}

// === Rate limits ==============================================

export const RATE_GOOGLE_CALENDAR_HEALTHY = {
  provider: "Google Calendar API",
  used: 142,
  quota: 600,
  window: "per minute",
  resetInSeconds: 18,
}

export const RATE_OPENAI_NEAR = {
  provider: "OpenAI Tier-4",
  used: 52,
  quota: 60,
  window: "per minute",
  resetInSeconds: 32,
}

export const RATE_REPLICATE_OVER = {
  provider: "Replicate predictions",
  used: 19,
  quota: 20,
  window: "per minute",
  resetInSeconds: 6,
}

// === Retry policies ===========================================

export const RETRY_STRIPE = {
  consumer: "Stripe webhook delivery",
  initialBackoffMs: 250,
  multiplier: 2,
  maxAttempts: 6,
  initialJitter: true,
}

export const RETRY_REPLICATE = {
  consumer: "Replicate prediction poll",
  initialBackoffMs: 1000,
  multiplier: 1.5,
  maxAttempts: 8,
  initialJitter: true,
}

export const RETRY_TWILIO = {
  consumer: "Twilio SMS forward",
  initialBackoffMs: 500,
  multiplier: 2,
  maxAttempts: 5,
  initialJitter: false,
}

// === Integration health ======================================

export const HEALTH_STRIPE = {
  provider: "Stripe payments",
  monogram: "S",
  status: "connected" as const,
  lastSync: "2m ago",
  errorRate: 0.0008,
  errorRateSeries: [0.001, 0.0008, 0.0006, 0.0005, 0.0007, 0.0009, 0.0008, 0.0006, 0.0005, 0.0008],
  throughput: "8.2 req/s",
}

export const HEALTH_TWILIO = {
  provider: "Twilio SMS",
  monogram: "TW",
  status: "warning" as const,
  lastSync: "11m ago",
  errorRate: 0.024,
  errorRateSeries: [0.005, 0.008, 0.012, 0.018, 0.022, 0.028, 0.032, 0.029, 0.026, 0.024],
  throughput: "1.4 req/s",
}

export const HEALTH_SHOPIFY = {
  provider: "Shopify Plus",
  monogram: "SH",
  status: "error" as const,
  lastSync: "1h ago",
  errorRate: 0.21,
  errorRateSeries: [0.04, 0.08, 0.12, 0.18, 0.21, 0.24, 0.22, 0.2, 0.21, 0.21],
  throughput: "0.0 req/s",
}

export const HEALTH_XERO = {
  provider: "Xero ledger",
  monogram: "X",
  status: "syncing" as const,
  lastSync: "Live",
  errorRate: 0,
  errorRateSeries: [0, 0, 0.0001, 0, 0, 0, 0.0001, 0, 0, 0],
  throughput: "0.4 req/s",
}

// === Event relay ============================================

export const EVENT_RELAY_ROWS: ReadonlyArray<EventRelayEntry> = [
  {
    id: "evt_4242",
    receivedAt: "2026-05-29 09:42:18",
    source: "Stripe",
    eventCode: "payment_intent.succeeded",
    statusCode: 200,
    outcome: "delivered",
    attempts: 1,
  },
  {
    id: "evt_4241",
    receivedAt: "2026-05-29 09:41:55",
    source: "Stripe",
    eventCode: "charge.refunded",
    statusCode: 200,
    outcome: "delivered",
    attempts: 1,
  },
  {
    id: "evt_4240",
    receivedAt: "2026-05-29 09:38:02",
    source: "Shopify",
    eventCode: "orders/paid",
    statusCode: 502,
    outcome: "retrying",
    attempts: 3,
  },
  {
    id: "evt_4239",
    receivedAt: "2026-05-29 09:34:11",
    source: "Twilio",
    eventCode: "messaging.inbound",
    statusCode: 200,
    outcome: "delivered",
    attempts: 1,
  },
  {
    id: "evt_4238",
    receivedAt: "2026-05-29 09:30:48",
    source: "Twilio",
    eventCode: "messaging.status",
    statusCode: 408,
    outcome: "failed",
    attempts: 5,
  },
  {
    id: "evt_4237",
    receivedAt: "2026-05-29 09:28:01",
    source: "Stripe",
    eventCode: "invoice.paid",
    statusCode: 200,
    outcome: "delivered",
    attempts: 1,
  },
  {
    id: "evt_4236",
    receivedAt: "2026-05-29 09:24:22",
    source: "Shopify",
    eventCode: "orders/create",
    statusCode: 200,
    outcome: "delivered",
    attempts: 1,
  },
  {
    id: "evt_4235",
    receivedAt: "2026-05-29 09:21:09",
    source: "Stripe",
    eventCode: "customer.created",
    statusCode: 304,
    outcome: "skipped",
    attempts: 1,
  },
]

// === Scope permission grid ==================================

const G = (level: ScopePermissionLevel) => level
const PROVIDERS: ReadonlyArray<string> = ["Google", "Meta", "Stripe", "Xero", "Shopify"]

const SCOPE_ROWS = [
  { id: "read.profile", label: "Read profile", scope: "user.profile.read" },
  { id: "read.contacts", label: "Read contacts", scope: "contacts.read" },
  { id: "write.posts", label: "Publish posts", scope: "posts.write" },
  { id: "write.payments", label: "Charge payments", scope: "payments.write" },
  { id: "read.ledger", label: "Read ledger", scope: "ledger.read" },
  { id: "write.inventory", label: "Update inventory", scope: "inventory.write" },
] as const

const ENTRIES_RAW: Array<{
  provider: string
  scopeId: string
  level: ScopePermissionLevel
}> = [
  { provider: "Google", scopeId: "read.profile", level: G("granted") },
  { provider: "Google", scopeId: "read.contacts", level: G("granted") },
  { provider: "Google", scopeId: "write.posts", level: G("none") },
  { provider: "Google", scopeId: "write.payments", level: G("none") },
  { provider: "Google", scopeId: "read.ledger", level: G("none") },
  { provider: "Google", scopeId: "write.inventory", level: G("none") },
  { provider: "Meta", scopeId: "read.profile", level: G("granted") },
  { provider: "Meta", scopeId: "read.contacts", level: G("requested") },
  { provider: "Meta", scopeId: "write.posts", level: G("granted") },
  { provider: "Meta", scopeId: "write.payments", level: G("none") },
  { provider: "Meta", scopeId: "read.ledger", level: G("none") },
  { provider: "Meta", scopeId: "write.inventory", level: G("none") },
  { provider: "Stripe", scopeId: "read.profile", level: G("granted") },
  { provider: "Stripe", scopeId: "read.contacts", level: G("granted") },
  { provider: "Stripe", scopeId: "write.posts", level: G("none") },
  { provider: "Stripe", scopeId: "write.payments", level: G("granted") },
  { provider: "Stripe", scopeId: "read.ledger", level: G("granted") },
  { provider: "Stripe", scopeId: "write.inventory", level: G("denied") },
  { provider: "Xero", scopeId: "read.profile", level: G("granted") },
  { provider: "Xero", scopeId: "read.contacts", level: G("granted") },
  { provider: "Xero", scopeId: "write.posts", level: G("none") },
  { provider: "Xero", scopeId: "write.payments", level: G("requested") },
  { provider: "Xero", scopeId: "read.ledger", level: G("granted") },
  { provider: "Xero", scopeId: "write.inventory", level: G("none") },
  { provider: "Shopify", scopeId: "read.profile", level: G("granted") },
  { provider: "Shopify", scopeId: "read.contacts", level: G("granted") },
  { provider: "Shopify", scopeId: "write.posts", level: G("none") },
  { provider: "Shopify", scopeId: "write.payments", level: G("denied") },
  { provider: "Shopify", scopeId: "read.ledger", level: G("none") },
  { provider: "Shopify", scopeId: "write.inventory", level: G("granted") },
]

const SCOPE_ENTRIES: ReadonlyArray<ScopePermissionEntry & { id: string }> = ENTRIES_RAW.map(
  (entry) => {
    const row = SCOPE_ROWS.find((r) => r.id === entry.scopeId)
    if (!row) {
      throw new Error(`Unknown scope id: ${entry.scopeId}`)
    }
    return {
      id: entry.scopeId,
      provider: entry.provider,
      label: row.label,
      scope: row.scope,
      level: entry.level,
    }
  },
)

export const SCOPE_GRID_DATA = {
  providers: PROVIDERS,
  scopeRows: SCOPE_ROWS,
  entries: SCOPE_ENTRIES,
}

// === Provider directory ====================================

export const PROVIDER_DIRECTORY = [
  {
    provider: "Stripe",
    monogram: "S",
    description: "Subscriptions, payouts and reconciliation for the front-counter terminal.",
    category: "payments" as const,
    installs: 1240,
    verifiedLabel: "Verified by Mufflermen",
    installed: true,
    accent: "violet" as const,
  },
  {
    provider: "Shopify Plus",
    monogram: "SH",
    description: "Parts catalogue, inventory and after-sale order sync.",
    category: "commerce" as const,
    installs: 980,
    verifiedLabel: "Verified",
    installed: true,
    accent: "green" as const,
  },
  {
    provider: "Xero",
    monogram: "X",
    description: "AU ledger, BAS and supplier reconciliation.",
    category: "accounting" as const,
    installs: 612,
    verifiedLabel: "Verified",
    installed: true,
    accent: "teal" as const,
  },
  {
    provider: "Twilio",
    monogram: "TW",
    description: "Booking confirmations and pickup-ready SMS to customers.",
    category: "communications" as const,
    installs: 410,
    installed: false,
    accent: "red" as const,
  },
  {
    provider: "Replicate",
    monogram: "R",
    description: "Image and video gen for marketing pulse and product hero shots.",
    category: "ai" as const,
    installs: 220,
    installed: true,
    accent: "violet" as const,
  },
  {
    provider: "Cloudflare R2",
    monogram: "R2",
    description: "Object store for parts photography and customer record uploads.",
    category: "infrastructure" as const,
    installs: 188,
    installed: false,
    accent: "amber" as const,
  },
] as const

// === Data mapping =========================================

export const MAPPING_SHOPIFY_TO_PAYLOAD = [
  {
    sourceField: "shopify.customer.email",
    sourceType: "string",
    targetField: "payload.users.email",
    targetType: "email",
    transform: "lowercase" as const,
    required: true,
    validation: "Email format",
  },
  {
    sourceField: "shopify.customer.phone",
    sourceType: "string",
    targetField: "payload.users.mobile",
    targetType: "phone",
    transform: "phone-e164" as const,
    required: false,
    validation: "AU E.164",
  },
  {
    sourceField: "shopify.order.total_price",
    sourceType: "money",
    targetField: "payload.orders.total_cents",
    targetType: "integer",
    transform: "currency-aud" as const,
    required: true,
  },
  {
    sourceField: "shopify.order.created_at",
    sourceType: "datetime",
    targetField: "payload.orders.placed_at",
    targetType: "datetime",
    transform: "iso-date" as const,
    required: true,
  },
  {
    sourceField: "shopify.order.tags",
    sourceType: "string",
    targetField: "payload.orders.labels",
    targetType: "string[]",
    transform: "split-comma" as const,
    required: false,
  },
] as const

// === Sync schedules =======================================

export const SCHEDULE_SUPPLIER = {
  jobName: "Hourly supplier inventory sync",
  cadence: "hourly" as const,
  cronExpression: "0 * * * *",
  timezone: "Australia/Sydney",
  lastRun: "2026-05-29 09:00 AEST",
  nextRun: "2026-05-29 10:00 AEST",
  recentOutcomes: [
    "success",
    "success",
    "success",
    "fail",
    "success",
    "success",
    "success",
    "success",
    "skipped",
    "success",
    "success",
    "success",
  ] as const,
  paused: false,
}

export const SCHEDULE_XERO = {
  jobName: "Daily Xero reconciliation",
  cadence: "daily" as const,
  cronExpression: "15 4 * * *",
  timezone: "Australia/Sydney",
  lastRun: "2026-05-29 04:15 AEST",
  nextRun: "2026-05-30 04:15 AEST",
  recentOutcomes: [
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
  ] as const,
  paused: false,
}

export const SCHEDULE_LINKEDIN_PAUSED = {
  jobName: "Weekly LinkedIn pulse",
  cadence: "weekly" as const,
  cronExpression: "0 9 * * 1",
  timezone: "Australia/Sydney",
  lastRun: "2026-05-19 09:00 AEST",
  nextRun: "—",
  recentOutcomes: ["success", "skipped", "skipped", "success", "skipped", "success"] as const,
  paused: true,
}

// === Connection test results =============================

export const TEST_STRIPE_OK = {
  endpoint: "POST https://api.stripe.com/v1/charges",
  status: "ok" as const,
  statusCode: 200,
  latencyMs: 142,
  testedAt: "2026-05-29 09:42:18 AEST",
  region: "AU-East-1 · Sydney",
  samplePayload: `{
  "id": "ch_3OakflatsLive001",
  "object": "charge",
  "amount": 49500,
  "currency": "aud",
  "captured": true,
  "status": "succeeded"
}`,
}

export const TEST_TWILIO_WARN = {
  endpoint: "POST https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json",
  status: "warn" as const,
  statusCode: 200,
  latencyMs: 612,
  testedAt: "2026-05-29 09:42:30 AEST",
  region: "AU-East-1 · Sydney",
  samplePayload: `{
  "sid": "SM_MufflermenTestPing",
  "status": "queued",
  "from": "+61255550199",
  "to": "+61455500144"
}`,
}

export const TEST_SHOPIFY_FAIL = {
  endpoint: "GET https://oak-flats-parts.myshopify.com/admin/api/2026-01/orders.json",
  status: "fail" as const,
  statusCode: 502,
  latencyMs: 4823,
  testedAt: "2026-05-29 09:42:42 AEST",
  region: "AU-East-1 · Sydney",
  samplePayload: `{
  "errors": "Bad Gateway",
  "request_id": "req_MufflermenShopifyFail"
}`,
}

// === Quota purchase ====================================

export const QUOTA_REPLICATE = {
  service: "Replicate predictions",
  currentTierId: "starter",
  recommendedTierId: "studio",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      quota: "20 preds / min",
      perks: ["Shared GPU pool", "20 predictions per minute", "Community support"],
    },
    {
      id: "studio",
      name: "Studio",
      price: "$49",
      quota: "60 preds / min",
      perks: ["Dedicated GPU lane", "60 predictions per minute", "Email + Slack support"],
    },
    {
      id: "scale",
      name: "Scale",
      price: "$199",
      quota: "240 preds / min",
      perks: ["Reserved A100 capacity", "240 predictions per minute", "24/7 oncall"],
    },
  ],
  currentUsage: 17,
  currentCap: 20,
  unit: "preds/min",
}

// === Audit trail ====================================

export const AUDIT_ENTRIES = [
  {
    action: "rotate" as const,
    connector: "Stripe",
    actor: "Daniel F.",
    actorInitials: "DF",
    ip: "203.0.113.18",
    occurredAt: "2026-05-29 09:42 AEST",
    note: "Rotated STRIPE_SECRET_KEY ahead of new payouts cadence.",
  },
  {
    action: "connect" as const,
    connector: "Xero",
    actor: "Daniel F.",
    actorInitials: "DF",
    ip: "203.0.113.18",
    occurredAt: "2026-05-29 09:21 AEST",
    note: "Granted accounting.transactions + accounting.contacts scopes.",
  },
  {
    action: "webhook-replay" as const,
    connector: "Shopify",
    actor: "Hermes Bot",
    actorInitials: "HB",
    ip: "10.0.4.42",
    occurredAt: "2026-05-29 09:14 AEST",
    note: "Replayed 7 stuck orders/paid events from 09:02 AEST batch.",
  },
  {
    action: "scope-change" as const,
    connector: "Meta",
    actor: "Daniel F.",
    actorInitials: "DF",
    occurredAt: "2026-05-28 16:08 AEST",
    note: "Requested pages_read_engagement scope addition for analytics widget.",
  },
  {
    action: "key-reveal" as const,
    connector: "Replicate",
    actor: "Sam K.",
    actorInitials: "SK",
    ip: "203.0.113.22",
    occurredAt: "2026-05-28 11:54 AEST",
    note: "Revealed REPLICATE_API_TOKEN during CI debug session.",
  },
  {
    action: "disconnect" as const,
    connector: "TikTok Business",
    actor: "Daniel F.",
    actorInitials: "DF",
    ip: "203.0.113.18",
    occurredAt: "2026-05-27 08:41 AEST",
    note: "Disconnected ahead of brand account migration.",
  },
]
