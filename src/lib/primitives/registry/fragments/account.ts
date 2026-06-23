import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "account",
  "title": "Account",
  "group": "System",
  "summary": "11 account-settings primitives — navigation, profile, plan/usage, team, integrations, notifications, sessions, API tokens, danger actions, and audit log — backed by shared avatar/chip/progress primitives across personal, workspace, and platform settings surfaces.",
  "entries": [
    {
      "key": "account/settings-sidebar",
      "family": "account",
      "name": "SettingsSidebar",
      "label": "Settings sidebar",
      "description": "Grouped (personal/workspace/platform/danger) navigation rail for account settings with active-state and aria-current links.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "tags": [
        "navigation",
        "settings",
        "sidebar"
      ],
      "status": "captured"
    },
    {
      "key": "account/profile-card",
      "family": "account",
      "name": "ProfileCard",
      "label": "Profile card",
      "description": "Account-holder identity card with avatar, role chip, email/location meta, edit control, and optional stat grid.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/profile",
      "tags": [
        "profile",
        "identity",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "account/plan-badge",
      "family": "account",
      "name": "PlanBadge",
      "label": "Plan badge",
      "description": "Tiered subscription badge (starter/workshop/fleet/enterprise) with tier-specific tone, crown/sparkles glyph, and optional caption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/billing",
      "tags": [
        "billing",
        "plan",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "account/usage-meter-card",
      "family": "account",
      "name": "UsageMeterCard",
      "label": "Usage meter card",
      "description": "Quota/usage card with formatted used/limit figures, threshold-aware progress bar tone, and remaining/reset footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/billing",
      "tags": [
        "usage",
        "quota",
        "billing"
      ],
      "status": "captured"
    },
    {
      "key": "account/team-member-row",
      "family": "account",
      "name": "TeamMemberRow",
      "label": "Team member row",
      "description": "Team roster row with avatar, status chip, optional bay, inline role select, and remove action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/team",
      "tags": [
        "team",
        "members",
        "role"
      ],
      "status": "captured"
    },
    {
      "key": "account/integration-tile",
      "family": "account",
      "name": "IntegrationTile",
      "label": "Integration tile",
      "description": "Connected-service tile with glyph, status chip/icon, last-sync, scope list, and status-driven action (Connect/Manage/Reconnect).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/integrations",
      "tags": [
        "integration",
        "connection",
        "tile"
      ],
      "status": "captured"
    },
    {
      "key": "account/notification-channel-row",
      "family": "account",
      "name": "NotificationChannelRow",
      "label": "Notification channel row",
      "description": "Per-channel (email/sms/push/in-app) notification row with destination, category chips, helper text, and an enable switch.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/notifications",
      "tags": [
        "notifications",
        "channels",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "account/session-row",
      "family": "account",
      "name": "SessionRow",
      "label": "Session row",
      "description": "Active-session row showing device icon, browser, IP/location/last-active meta, and a revoke action (disabled for current device).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/sessions",
      "tags": [
        "sessions",
        "security",
        "devices"
      ],
      "status": "captured"
    },
    {
      "key": "account/api-token-row",
      "family": "account",
      "name": "ApiTokenRow",
      "label": "API token row",
      "description": "API token row with masked value, copy-to-clipboard, scope chips, last-used/expiry meta, and revoke action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/api-tokens",
      "tags": [
        "api",
        "tokens",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "account/danger-action-card",
      "family": "account",
      "name": "DangerActionCard",
      "label": "Danger action card",
      "description": "Destructive-action card requiring a typed confirmation phrase before enabling the action, with consequences list and tone variants.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/danger-zone",
      "tags": [
        "danger",
        "confirmation",
        "destructive"
      ],
      "status": "captured"
    },
    {
      "key": "account/audit-log-row",
      "family": "account",
      "name": "AuditLogRow",
      "label": "Audit log row",
      "description": "Audit-trail row with tone dot, actor avatar/identity, action + object label, and IP/timestamp meta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/account",
      "routeHref": "/ui-primitives/account/audit-log",
      "tags": [
        "audit",
        "activity",
        "log"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
