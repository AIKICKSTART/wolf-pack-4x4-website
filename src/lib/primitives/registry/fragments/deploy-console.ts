import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "deploy-console",
  "title": "Deploy console",
  "group": "System",
  "summary": "14 deployment/ops control-surface primitives — env editor, secret vault, deploy gates, rollback, healthcheck heatmap, branch previews, CDN cache, DNS, TLS certs, incident banner, release notes, deploy timeline, runtime drift, and blue/green traffic shift — sharing a tonal shell, chip, and progress vocabulary.",
  "entries": [
    {
      "key": "deploy-console/env-editor",
      "family": "deploy-console",
      "name": "EnvEditor",
      "label": "Env editor",
      "description": "Scope-filterable grid of environment variables with kind/dirty-state chips, secret masking, and per-row reveal toggles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/env-editor",
      "tags": [
        "env",
        "config",
        "secrets",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/secret-vault-row",
      "family": "deploy-console",
      "name": "SecretVaultRow",
      "label": "Secret vault row",
      "description": "Single vault secret card with masked value, reveal/copy/rotate actions, rotation-status tone, and a segmented rotation-window countdown.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/secret-vault-row",
      "tags": [
        "secrets",
        "rotation",
        "vault",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/deploy-gate-card",
      "family": "deploy-console",
      "name": "DeployGateCard",
      "label": "Deploy gate card",
      "description": "Pre-deploy gate summarising pass/fail/running/pending checks with a radial pass-ratio and a conditional promote-to-production CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/deploy-gate-card",
      "tags": [
        "ci",
        "gate",
        "checks",
        "deploy"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/rollback-panel",
      "family": "deploy-console",
      "name": "RollbackPanel",
      "label": "Rollback panel",
      "description": "Radio-group revision list with diff stats and a live diff-preview pane for selecting and rolling production back to a prior deploy.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/rollback-panel",
      "tags": [
        "rollback",
        "revisions",
        "diff",
        "deploy"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/healthcheck-heatmap",
      "family": "deploy-console",
      "name": "HealthcheckHeatmap",
      "label": "Healthcheck heatmap",
      "description": "Endpoint-by-hour health grid with ok/warn/fail/no-data cells, per-row p95 latency, and computed uptime percentages.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/healthcheck-heatmap",
      "tags": [
        "health",
        "uptime",
        "heatmap",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/branch-preview-deck",
      "family": "deploy-console",
      "name": "BranchPreviewDeck",
      "label": "Branch preview deck",
      "description": "Card grid of active per-branch preview deployments with kind-toned thumbnails, PR number, commits-ahead, and open/share actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/branch-preview-deck",
      "tags": [
        "preview",
        "branches",
        "deploy",
        "gallery"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/cdn-cache-tile",
      "family": "deploy-console",
      "name": "CdnCacheTile",
      "label": "CDN cache tile",
      "description": "Per-pattern CDN cache tile showing hit ratio, TTL, and req/min stats with a hit-ratio progress bar and a purge control.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/cdn-cache-tile",
      "tags": [
        "cdn",
        "cache",
        "stats",
        "purge"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/dns-record-row",
      "family": "deploy-console",
      "name": "DnsRecordRow",
      "label": "DNS record row",
      "description": "DNS record row with type badge, host/value, TTL, and a propagation progress bar toned by propagation state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/dns-record-row",
      "tags": [
        "dns",
        "records",
        "propagation",
        "networking"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/ssl-cert-card",
      "family": "deploy-console",
      "name": "SslCertCard",
      "label": "SSL certificate card",
      "description": "TLS certificate card with health tone, days-until-expiry countdown bar, SAN list, issuer/chain info, and an auto-renew toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/ssl-cert-card",
      "tags": [
        "tls",
        "certificate",
        "expiry",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/incident-banner",
      "family": "deploy-console",
      "name": "IncidentBanner",
      "label": "Incident banner",
      "description": "Severity-toned active-incident alert banner with a pulse indicator, status line, ETA, and an open-report CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/incident-banner",
      "tags": [
        "incident",
        "alert",
        "severity",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/release-notes-card",
      "family": "deploy-console",
      "name": "ReleaseNotesCard",
      "label": "Release notes card",
      "description": "Versioned release-notes card with breaking/security counts, a breaking-change callout, and a tone-coded change list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/release-notes-card",
      "tags": [
        "release",
        "changelog",
        "version",
        "notes"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/deploy-timeline",
      "family": "deploy-console",
      "name": "DeployTimeline",
      "label": "Deploy timeline",
      "description": "Vertical rail timeline of recent deploys with outcome/target/canary chips and per-entry author, sha, start, and duration metadata.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/deploy-timeline",
      "tags": [
        "deploy",
        "timeline",
        "history",
        "audit"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/runtime-version-tile",
      "family": "deploy-console",
      "name": "RuntimeVersionTile",
      "label": "Runtime version tile",
      "description": "Runtime tile comparing current/pinned/latest versions with a drift-status chip, kind glyph, and optional support-window footer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/runtime-version-tile",
      "tags": [
        "runtime",
        "version",
        "drift",
        "dependencies"
      ],
      "status": "captured"
    },
    {
      "key": "deploy-console/traffic-shift-card",
      "family": "deploy-console",
      "name": "TrafficShiftCard",
      "label": "Traffic shift card",
      "description": "Blue/green traffic-split control with a proportional split bar, a percentage slider, snap presets, and a session-stickiness toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/deploy-console",
      "routeHref": "/ui-primitives/deploy-console/traffic-shift-card",
      "tags": [
        "traffic",
        "blue-green",
        "canary",
        "deploy"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
