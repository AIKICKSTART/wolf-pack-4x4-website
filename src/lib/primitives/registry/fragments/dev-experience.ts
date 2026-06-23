import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "dev-experience",
  "title": "Developer experience",
  "group": "System",
  "summary": "14 developer-portal / API-reference primitives — SDK install + code switchers, auth/webhook/rate-limit/OpenAPI reference cards, changelog rows, a version selector, an inline copy chip, an output preview pane, and a collapsible TypeScript type tree. Each has a matching showcase subroute.",
  "entries": [
    {
      "key": "dev-experience/sdk-install-snippet",
      "family": "dev-experience",
      "name": "SdkInstallSnippet",
      "label": "SDK install snippet",
      "description": "Tabbed install-command block (npm/pnpm/yarn/bun) with per-manager clipboard copy and a live status line.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/sdk-install-snippet",
      "tags": [
        "sdk",
        "install",
        "copy",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/quickstart-step-card",
      "family": "dev-experience",
      "name": "QuickstartStepCard",
      "label": "Quickstart step card",
      "description": "Numbered quickstart step with body content, a CodeBlock sample, and a toggleable mark-done state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/quickstart-step-card",
      "tags": [
        "quickstart",
        "step",
        "onboarding"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/lang-switcher-tabs",
      "family": "dev-experience",
      "name": "LangSwitcherTabs",
      "label": "Language switcher tabs",
      "description": "Tablist that switches a CodeBlock between one code sample per language.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/lang-switcher-tabs",
      "tags": [
        "code",
        "language",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/auth-snippet-card",
      "family": "dev-experience",
      "name": "AuthSnippetCard",
      "label": "Auth snippet card",
      "description": "Authentication reference card with method tabs (bearer/etc), per-variant CodeBlock, and an optional Open-in-Postman link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/auth-snippet-card",
      "tags": [
        "auth",
        "snippet",
        "postman"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/rate-limit-error-card",
      "family": "dev-experience",
      "name": "RateLimitErrorCard",
      "label": "Rate-limit error card",
      "description": "HTTP 429 reference card showing tone-coded status chip, Retry-After header, JSON body, and an optional back-off recipe link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/rate-limit-error-card",
      "tags": [
        "rate-limit",
        "429",
        "error"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/pagination-cursor-snippet",
      "family": "dev-experience",
      "name": "PaginationCursorSnippet",
      "label": "Pagination cursor snippet",
      "description": "Three-step cursor-pagination walkthrough (first request, cursor response, next request) rendered as a numbered flow with CodeBlocks.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/pagination-cursor-snippet",
      "tags": [
        "pagination",
        "cursor",
        "api"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/webhook-payload-sample",
      "family": "dev-experience",
      "name": "WebhookPayloadSample",
      "label": "Webhook payload sample",
      "description": "Webhook event reference card showing event type, version/timestamp meta, signature header, and the JSON payload.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/webhook-payload-sample",
      "tags": [
        "webhook",
        "payload",
        "signature"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/openapi-explorer",
      "family": "dev-experience",
      "name": "OpenApiExplorer",
      "label": "OpenAPI explorer",
      "description": "Endpoint explorer with a method/path header, optional Try-it action, and tabs for parameters, request body, responses, and code.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/openapi-explorer",
      "tags": [
        "openapi",
        "endpoint",
        "tabs",
        "try-it"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/sdk-changelog-row",
      "family": "dev-experience",
      "name": "SdkChangelogRow",
      "label": "SDK changelog row",
      "description": "Changelog entry row with a version chip, date, category chips (added/changed/fixed/deprecated/removed), and summary/detail lines.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/sdk-changelog-row",
      "tags": [
        "changelog",
        "version",
        "release"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/tabbed-code-switcher",
      "family": "dev-experience",
      "name": "TabbedCodeSwitcher",
      "label": "Tabbed code switcher",
      "description": "Topic-keyed tablist that switches a CodeBlock between labelled code walkthrough steps.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/tabbed-code-switcher",
      "tags": [
        "code",
        "tabs",
        "walkthrough"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/inline-copy-button",
      "family": "dev-experience",
      "name": "InlineCopyButton",
      "label": "Inline copy button",
      "description": "Inline chip button that copies a value to the clipboard with copied feedback and a polite status region.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/inline-copy-button",
      "tags": [
        "copy",
        "clipboard",
        "inline"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/output-preview-pane",
      "family": "dev-experience",
      "name": "OutputPreviewPane",
      "label": "Output preview pane",
      "description": "Tabbed terminal-style output viewer switching between stdout/stderr/network/json streams with tone-coded tabs and optional badges.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/output-preview-pane",
      "tags": [
        "output",
        "terminal",
        "stream",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/sdk-version-selector",
      "family": "dev-experience",
      "name": "SdkVersionSelector",
      "label": "SDK version selector",
      "description": "Listbox dropdown of SDK versions with channel chips (stable/beta/canary) and breaking-change badges, firing onSelect on pick.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/sdk-version-selector",
      "tags": [
        "sdk",
        "version",
        "select",
        "channel"
      ],
      "status": "captured"
    },
    {
      "key": "dev-experience/typescript-types-preview",
      "family": "dev-experience",
      "name": "TypescriptTypesPreview",
      "label": "TypeScript types preview",
      "description": "Collapsible tree that renders nested TypeScript declarations with disclosure carets and muted inline comments.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/dev-experience",
      "routeHref": "/ui-primitives/dev-experience/typescript-types-preview",
      "tags": [
        "typescript",
        "types",
        "tree"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
