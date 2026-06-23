import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "connectors",
  "title": "Connectors",
  "group": "Operations",
  "summary": "15 integration-console primitives for OAuth connections, API-key vaulting, webhooks, rate limits, retry/backoff, sync schedules, scope grids, connection tests, quota upgrades, and audit trails — all sharing a connector status/tone/category vocabulary.",
  "entries": [
    {
      "key": "connectors/oauth-connect-card",
      "family": "connectors",
      "name": "OAuthConnectCard",
      "label": "OAuth connect card",
      "description": "Provider OAuth connection card showing monogram logo, status chip, granted scopes, token expiry and a connect/disconnect action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/oauth-connect-card",
      "tags": [
        "oauth",
        "auth",
        "integration",
        "connection"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/api-key-vault-row",
      "family": "connectors",
      "name": "ApiKeyVaultRow",
      "label": "API key vault row",
      "description": "Masked API-key row with reveal/copy/rotate controls, rotation cadence and a color-toned next-rotation countdown.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/api-key-vault-row",
      "tags": [
        "secret",
        "api-key",
        "rotation",
        "vault"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/webhook-config-card",
      "family": "connectors",
      "name": "WebhookConfigCard",
      "label": "Webhook config card",
      "description": "Webhook source card with endpoint URL, maskable signing secret and a checkbox fieldset of subscribed event filters.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/webhook-config-card",
      "tags": [
        "webhook",
        "events",
        "config",
        "integration"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/rate-limit-gauge",
      "family": "connectors",
      "name": "RateLimitGauge",
      "label": "Rate limit gauge",
      "description": "Radial usage dial with used/remaining/window stats and a live reset countdown, tone-coded by consumption ratio.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/rate-limit-gauge",
      "tags": [
        "rate-limit",
        "quota",
        "gauge",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/retry-policy-card",
      "family": "connectors",
      "name": "RetryPolicyCard",
      "label": "Retry policy card",
      "description": "Exponential-backoff retry policy editor with a jitter toggle and a per-attempt backoff timeline visualization.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/retry-policy-card",
      "tags": [
        "retry",
        "backoff",
        "resilience",
        "policy"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/integration-health-tile",
      "family": "connectors",
      "name": "IntegrationHealthTile",
      "label": "Integration health tile",
      "description": "Compact integration health tile with status chip, last-sync/error-rate/throughput stats and an error-rate sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/integration-health-tile",
      "tags": [
        "health",
        "monitoring",
        "sparkline",
        "integration"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/event-relay-table",
      "family": "connectors",
      "name": "EventRelayTable",
      "label": "Event relay table",
      "description": "Sortable table of inbound webhook events with timestamp, source, HTTP code, outcome chip, attempts and per-row replay action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/event-relay-table",
      "tags": [
        "webhook",
        "events",
        "table",
        "replay"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/scope-permission-grid",
      "family": "connectors",
      "name": "ScopePermissionGrid",
      "label": "Scope permission grid",
      "description": "Provider-by-scope permission matrix table with granted/requested/denied/none cell states and a legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/scope-permission-grid",
      "tags": [
        "oauth",
        "scopes",
        "permissions",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/provider-directory-card",
      "family": "connectors",
      "name": "ProviderDirectoryCard",
      "label": "Provider directory card",
      "description": "Marketplace-style connector directory card with accent monogram, category, install count, verified badge and installed/available state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/provider-directory-card",
      "tags": [
        "directory",
        "marketplace",
        "provider",
        "catalog"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/data-mapping-row",
      "family": "connectors",
      "name": "DataMappingRow",
      "label": "Data mapping row",
      "description": "Source-to-target field mapping row with a tone-coded transform chip bridge and required/validation indicators.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/data-mapping-row",
      "tags": [
        "mapping",
        "transform",
        "schema",
        "field"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/sync-schedule-card",
      "family": "connectors",
      "name": "SyncScheduleCard",
      "label": "Sync schedule card",
      "description": "Sync-job schedule card showing cron expression, timezone, cadence, last/next run and a recent-outcomes dot strip with paused state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/sync-schedule-card",
      "tags": [
        "sync",
        "schedule",
        "cron",
        "job"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/connection-test-result",
      "family": "connectors",
      "name": "ConnectionTestResult",
      "label": "Connection test result",
      "description": "Endpoint connection-test result card with status badge, HTTP code, tone-coded latency, region and a JSON sample-payload code block.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/connection-test-result",
      "tags": [
        "test",
        "diagnostics",
        "latency",
        "endpoint"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/quota-purchase-card",
      "family": "connectors",
      "name": "QuotaPurchaseCard",
      "label": "Quota purchase card",
      "description": "Quota upgrade card with segmented usage progress and price-ascending pricing tiers marked current and recommended.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/quota-purchase-card",
      "tags": [
        "quota",
        "billing",
        "tiers",
        "upgrade"
      ],
      "status": "captured"
    },
    {
      "key": "connectors/audit-trail-row",
      "family": "connectors",
      "name": "AuditTrailRow",
      "label": "Audit trail row",
      "description": "Timeline-spine audit log row with tone-coded action chip, connector, actor avatar, optional IP, timestamp and note.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/connectors",
      "routeHref": "/ui-primitives/connectors/audit-trail-row",
      "tags": [
        "audit",
        "log",
        "timeline",
        "security"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
