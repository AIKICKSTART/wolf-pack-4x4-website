import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "api-explorer",
  "title": "API explorer",
  "group": "System",
  "summary": "14 developer-API reference primitives — endpoint catalog/detail, an interactive Try-It console with response viewer, schema explorer, multi-language code samples, auth config, rate-limit, webhook receiver, error codes, SDK install, changelog, request history, and deprecation banner.",
  "entries": [
    {
      "key": "api-explorer/endpoint-catalog",
      "family": "api-explorer",
      "name": "EndpointCatalog",
      "label": "Endpoint catalog",
      "description": "Searchable, tag-grouped list of API endpoints with HTTP-method chips and selectable rows driving aria-current.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/endpoint-catalog",
      "tags": [
        "api",
        "navigation",
        "search"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/endpoint-detail-card",
      "family": "api-explorer",
      "name": "EndpointDetailCard",
      "label": "Endpoint detail card",
      "description": "Detail panel for one endpoint showing method, path, summary, version, auth chip and optional path-param references with a deprecated state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/endpoint-detail-card",
      "tags": [
        "api",
        "documentation",
        "endpoint"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/try-it-console",
      "family": "api-explorer",
      "name": "TryItConsole",
      "label": "Try-It console",
      "description": "Interactive request builder with method selector, URL, editable params/headers key-value rows and body, emitting a TryItRequest on send.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/try-it-console",
      "tags": [
        "api",
        "console",
        "request"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/response-viewer",
      "family": "api-explorer",
      "name": "ResponseViewer",
      "label": "Response viewer",
      "description": "Tabbed viewer for an API response with raw body, collapsible JSON tree and headers tabs plus status chip and byte/duration metrics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/response-viewer",
      "tags": [
        "api",
        "response",
        "json"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/schema-explorer",
      "family": "api-explorer",
      "name": "SchemaExplorer",
      "label": "Schema explorer",
      "description": "Recursive expand/collapse tree rendering a SchemaNode hierarchy with type annotations for request/response object schemas.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/schema-explorer",
      "tags": [
        "api",
        "schema",
        "tree"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/code-sample-tabs",
      "family": "api-explorer",
      "name": "CodeSampleTabs",
      "label": "Code sample tabs",
      "description": "Tabbed code-sample switcher across curl/javascript/python/php snippets with a compact tab-less mode.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/code-sample-tabs",
      "tags": [
        "api",
        "code",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/auth-config-card",
      "family": "api-explorer",
      "name": "AuthConfigCard",
      "label": "Auth config card",
      "description": "Credential card for api-key/bearer/oauth strategies with masked reveal toggle and a test-connection action with idle/success/failure states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/auth-config-card",
      "tags": [
        "api",
        "auth",
        "credentials"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/rate-limit-tile",
      "family": "api-explorer",
      "name": "RateLimitTile",
      "label": "Rate-limit tile",
      "description": "Usage tile showing used/limit requests with a tone-coded progress bar, reset time and a recent-usage sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/rate-limit-tile",
      "tags": [
        "api",
        "rate-limit",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/webhook-receiver-card",
      "family": "api-explorer",
      "name": "WebhookReceiverCard",
      "label": "Webhook receiver card",
      "description": "Webhook config card with copyable receiver URL, masked signing secret, subscribed event chips, last-delivery time and a replay action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/webhook-receiver-card",
      "tags": [
        "api",
        "webhook",
        "events"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/error-code-row",
      "family": "api-explorer",
      "name": "ErrorCodeRow",
      "label": "Error code row",
      "description": "Reference row for one API error code with HTTP status chip, title, description, retryable flag and retry guidance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/error-code-row",
      "tags": [
        "api",
        "errors",
        "documentation"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/sdk-install-card",
      "family": "api-explorer",
      "name": "SdkInstallCard",
      "label": "SDK install card",
      "description": "SDK install card with a package-manager switcher (npm/pnpm/yarn/pip/composer) and copy-to-clipboard install snippets.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/sdk-install-card",
      "tags": [
        "api",
        "sdk",
        "install"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/changelog-entry-card",
      "family": "api-explorer",
      "name": "ChangelogEntryCard",
      "label": "Changelog entry card",
      "description": "Versioned changelog card listing release date, summary and change items with a breaking-change badge.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/changelog-entry-card",
      "tags": [
        "api",
        "changelog",
        "versioning"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/try-it-history-row",
      "family": "api-explorer",
      "name": "TryItHistoryRow",
      "label": "Try-It history row",
      "description": "Past-request row showing method, path, status chip, duration and timestamp with a copy-curl action and optional replay.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/try-it-history-row",
      "tags": [
        "api",
        "history",
        "request"
      ],
      "status": "captured"
    },
    {
      "key": "api-explorer/endpoint-deprecation-banner",
      "family": "api-explorer",
      "name": "EndpointDeprecationBanner",
      "label": "Endpoint deprecation banner",
      "description": "Status banner announcing a deprecated endpoint, its replacement link and sunset date with migration guidance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/api-explorer",
      "routeHref": "/ui-primitives/api-explorer/endpoint-deprecation-banner",
      "tags": [
        "api",
        "deprecation",
        "notice"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
