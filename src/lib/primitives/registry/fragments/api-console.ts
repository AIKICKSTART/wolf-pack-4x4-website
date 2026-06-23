import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "api-console",
  "title": "API console",
  "group": "System",
  "summary": "14 developer-platform primitives for an API/webhook console — endpoint cards, key + OAuth + signing-secret management, webhook delivery log/retry queue, request/response inspector + explorer playground, CORS editor, and rate-limit/quota meters with HTTP-status and auth-method chips.",
  "entries": [
    {
      "key": "api-console/endpoint-card",
      "family": "api-console",
      "name": "EndpointCard",
      "label": "Endpoint card",
      "description": "API endpoint card showing color-coded HTTP method, path, version, required auth method, and an optional 'Try it' action with deprecated state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/endpoint-card",
      "tags": [
        "api",
        "endpoint",
        "http",
        "docs"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/api-key-manager",
      "family": "api-console",
      "name": "ApiKeyManager",
      "label": "API key manager",
      "description": "Workshop API key dashboard with a create-key form (label + scope picker) and a list of keys showing masked value, status, scopes, and rotate/revoke/copy actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/api-key-manager",
      "tags": [
        "api",
        "keys",
        "auth",
        "management"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/webhook-subscriber-row",
      "family": "api-console",
      "name": "WebhookSubscriberRow",
      "label": "Webhook subscriber row",
      "description": "Row representing a webhook subscription with destination URL, subscribed events, delivery status, a reveal/hide signing secret, and edit/revoke actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/webhook-subscriber-row",
      "tags": [
        "webhook",
        "subscription",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/webhook-event-log",
      "family": "api-console",
      "name": "WebhookEventLog",
      "label": "Webhook event log",
      "description": "Tabular webhook delivery log with timestamp, event type, endpoint, HTTP status chip, duration, and retry count; rows expand to a pretty-printed JSON payload.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/webhook-event-log",
      "tags": [
        "webhook",
        "log",
        "events",
        "data"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/webhook-retry-queue",
      "family": "api-console",
      "name": "WebhookRetryQueue",
      "label": "Webhook retry queue",
      "description": "List of pending webhook retries with attempt progress bar, backoff label, next-retry time, last error, and manual retry/abandon actions (with an empty state).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/webhook-retry-queue",
      "tags": [
        "webhook",
        "retry",
        "queue",
        "backoff"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/request-response-inspector",
      "family": "api-console",
      "name": "RequestResponseInspector",
      "label": "Request/response inspector",
      "description": "Side-by-side request and response panes showing method/URL or status chip, header tables, and code-block bodies for inspecting a single HTTP exchange.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/request-response-inspector",
      "tags": [
        "http",
        "inspector",
        "request",
        "response"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/rate-limit-gauge",
      "family": "api-console",
      "name": "RateLimitGauge",
      "label": "Rate limit gauge",
      "description": "Live rate-limit meter showing current vs allowed requests-per-minute with a tone-graded fill, burst capacity, a warn threshold line, and a throttle-imminent alert.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/rate-limit-gauge",
      "tags": [
        "rate-limit",
        "gauge",
        "metrics",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/quota-meter",
      "family": "api-console",
      "name": "QuotaMeter",
      "label": "Quota meter",
      "description": "Monthly billing-quota meter showing used vs included calls with a tone-graded fill, overage segment, percentage, and overage rate for the billing period.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/quota-meter",
      "tags": [
        "quota",
        "billing",
        "meter",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/api-explorer-playground",
      "family": "api-console",
      "name": "ApiExplorerPlayground",
      "label": "API explorer playground",
      "description": "Interactive request builder with method selector, URL bar, tabbed params/headers/body editors, and a response pane with status chip, duration, and JSON code block.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/api-explorer-playground",
      "tags": [
        "api",
        "playground",
        "explorer",
        "request-builder"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/http-status-chip",
      "family": "api-console",
      "name": "HttpStatusChip",
      "label": "HTTP status chip",
      "description": "Compact chip rendering an HTTP status code with class-toned dot and the IANA reason phrase, with a numeric-only compact mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/http-status-chip",
      "tags": [
        "http",
        "status",
        "chip",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/auth-method-chip",
      "family": "api-console",
      "name": "AuthMethodChip",
      "label": "Auth method chip",
      "description": "Auth-method chip (bearer/basic/api-key/mtls/oidc) with a method icon and a popover showing a signature preview; supports an inert non-interactive mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/auth-method-chip",
      "tags": [
        "auth",
        "chip",
        "badge",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/cors-policy-editor",
      "family": "api-console",
      "name": "CorsPolicyEditor",
      "label": "CORS policy editor",
      "description": "Editor for a CORS policy with tag inputs for allowed origins/headers, method toggle chips, a credentials switch, and a preflight cache max-age field.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/cors-policy-editor",
      "tags": [
        "cors",
        "policy",
        "editor",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/oauth-app-card",
      "family": "api-console",
      "name": "OauthAppCard",
      "label": "OAuth app card",
      "description": "OAuth client card showing client name/status, masked client ID with copy, redirect URIs, granted scopes, and an optional manage action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/oauth-app-card",
      "tags": [
        "oauth",
        "client",
        "auth",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "api-console/webhook-signing-secret-row",
      "family": "api-console",
      "name": "WebhookSigningSecretRow",
      "label": "Webhook signing secret row",
      "description": "Row for a webhook signing secret showing label/scope, masked secret with copy, signing algorithm chip, last-rotated date, and a rotate action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-console",
      "routeHref": "/ui-primitives/api-console/webhook-signing-secret-row",
      "tags": [
        "webhook",
        "signing",
        "secret",
        "security"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
