import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "admin-hub",
  "title": "Admin hub",
  "group": "System",
  "summary": "14 admin-console widgets — KPI tiles, quick actions, command palette, role/tenant switchers, briefings, team pulse, tours and spotlights — for the operator dashboard surface.",
  "entries": [
    {
      "key": "admin-hub/kpi-tile",
      "family": "admin-hub",
      "name": "KpiTile",
      "label": "KPI tile",
      "description": "Single KPI metric card with value, period chip, directional delta and an area sparkline trend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/kpi-tile",
      "tags": [
        "dashboard",
        "metric",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/quick-action-grid",
      "family": "admin-hub",
      "name": "QuickActionGrid",
      "label": "Quick action grid",
      "description": "Grid of pinned shortcut action buttons with glyph, badge and keyboard shortcut hints, 2 or 3 columns.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/quick-action-grid",
      "tags": [
        "dashboard",
        "shortcuts",
        "actions"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/system-status-banner",
      "family": "admin-hub",
      "name": "SystemStatusBanner",
      "label": "System status banner",
      "description": "Health banner showing operational/maintenance/incident state with affected services and a status-page link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/system-status-banner",
      "tags": [
        "status",
        "health",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/activity-feed-row",
      "family": "admin-hub",
      "name": "ActivityFeedRow",
      "label": "Activity feed row",
      "description": "Single audit/activity row with actor avatar, verb, target surface, detail and timestamp.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/activity-feed-row",
      "tags": [
        "activity",
        "audit",
        "feed"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/command-palette",
      "family": "admin-hub",
      "name": "CommandPalette",
      "label": "Command palette",
      "description": "Cmd/Ctrl+K command palette with search filtering, grouped commands, AI suggestions, recents and keyboard navigation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/command-palette",
      "tags": [
        "command",
        "search",
        "keyboard"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/pinned-board",
      "family": "admin-hub",
      "name": "PinnedBoard",
      "label": "Pinned board",
      "description": "Reorderable board of pinned dashboard widgets with drag handle, up/down keyboard reordering and a render-prop body.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/pinned-board",
      "tags": [
        "dashboard",
        "reorder",
        "widgets"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/role-switcher",
      "family": "admin-hub",
      "name": "RoleSwitcher",
      "label": "Role switcher",
      "description": "Role dropdown showing current user with impersonation notice and a listbox of roles, permissions and descriptions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/role-switcher",
      "tags": [
        "role",
        "permissions",
        "switcher"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/tenant-switcher",
      "family": "admin-hub",
      "name": "TenantSwitcher",
      "label": "Tenant switcher",
      "description": "Workspace/tenant switcher with active badge trigger and a popover list of tenants with primary tag and add action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/tenant-switcher",
      "tags": [
        "tenant",
        "workspace",
        "switcher"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/weekly-briefing-card",
      "family": "admin-hub",
      "name": "WeeklyBriefingCard",
      "label": "Weekly briefing card",
      "description": "Monday briefing card grouping items into highlights, lowlights and action items with owner avatars and a tally.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/weekly-briefing-card",
      "tags": [
        "briefing",
        "summary",
        "weekly"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/team-pulse-strip",
      "family": "admin-hub",
      "name": "TeamPulseStrip",
      "label": "Team pulse strip",
      "description": "Team presence strip with a per-state tally summary and member chips showing avatar, role and presence status.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/team-pulse-strip",
      "tags": [
        "team",
        "presence",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/quick-glance-row",
      "family": "admin-hub",
      "name": "QuickGlanceRow",
      "label": "Quick glance row",
      "description": "Compact horizontal strip of at-a-glance metrics, each with label, value, unit and directional delta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/quick-glance-row",
      "tags": [
        "metrics",
        "glance",
        "strip"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/system-tour-launcher",
      "family": "admin-hub",
      "name": "SystemTourLauncher",
      "label": "System tour launcher",
      "description": "Onboarding tour card with progress bar, ETA, a checklist of steps and start/resume/replay plus skip CTAs.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/system-tour-launcher",
      "tags": [
        "onboarding",
        "tour",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/feature-spotlight-card",
      "family": "admin-hub",
      "name": "FeatureSpotlightCard",
      "label": "Feature spotlight card",
      "description": "Dismissible new-feature announcement card with aurora backdrop, badge, bullet highlights and a primary CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/feature-spotlight-card",
      "tags": [
        "announcement",
        "feature",
        "spotlight"
      ],
      "status": "captured"
    },
    {
      "key": "admin-hub/daily-summary-card",
      "family": "admin-hub",
      "name": "DailySummaryCard",
      "label": "Daily summary card",
      "description": "Yesterday-recap card with two columns of highlights and watch-outs plus a today's-outlook footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/admin-hub",
      "routeHref": "/ui-primitives/admin-hub/daily-summary-card",
      "tags": [
        "summary",
        "daily",
        "recap"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
