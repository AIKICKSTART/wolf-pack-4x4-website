import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "permissions",
  "title": "Permissions &amp; RBAC",
  "group": "System",
  "summary": "14 role-based access-control primitives — role badge, permission matrix, inheritance tree, ACL row, forbidden state, role inspector, workspace switcher, request-access wizard, approvals row, JIT elevation banner, API scope chip, session table, audit trail, and a chip-based policy rule editor.",
  "entries": [
    {
      "key": "permissions/role-badge",
      "family": "permissions",
      "name": "RoleBadge",
      "label": "Role badge",
      "description": "Pill badge for a role (owner/admin/member/viewer/billing/workshop/guest) with a per-tone iconlet, optional shortcode and description.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/role-badge",
      "tags": [
        "rbac",
        "role",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/permission-matrix",
      "family": "permissions",
      "name": "PermissionMatrix",
      "label": "Permission matrix",
      "description": "Resources-by-actions grid of allow/deny/inherited cells that cycle on click, with bulk per-row and per-column toggle controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/matrix",
      "tags": [
        "rbac",
        "matrix",
        "grid",
        "control"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/permission-inheritance-tree",
      "family": "permissions",
      "name": "PermissionInheritanceTree",
      "label": "Inheritance tree",
      "description": "Vertical resolution path showing how direct, group, role and workspace-default grants combine into one effective permission state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/inheritance",
      "tags": [
        "rbac",
        "inheritance",
        "resolution"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/acl-row",
      "family": "permissions",
      "name": "AclRow",
      "label": "ACL row",
      "description": "Single access-control entry showing principal (avatar or role badge), grant chips, source label, expiry date and a remove button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/acl-row",
      "tags": [
        "rbac",
        "acl",
        "grant",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/forbidden-state",
      "family": "permissions",
      "name": "ForbiddenState",
      "label": "Forbidden state",
      "description": "Illustrated 403 surface listing the attempted action, missing permission, current and required role, with request-access and switch-role action slots.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/forbidden",
      "tags": [
        "rbac",
        "403",
        "empty-state"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/role-inspector",
      "family": "permissions",
      "name": "RoleInspector",
      "label": "Role inspector",
      "description": "Role detail card with member count, permission count and scope chips, plus an expandable full permission set.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/role-inspector",
      "tags": [
        "rbac",
        "role",
        "inspector"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/workspace-switcher",
      "family": "permissions",
      "name": "WorkspaceSwitcher",
      "label": "Workspace switcher",
      "description": "Dropdown trigger plus searchable listbox of workspaces, each showing role-in-workspace badge, member count and plan.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/workspace-switcher",
      "tags": [
        "rbac",
        "workspace",
        "switcher",
        "dropdown"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/request-access-flow",
      "family": "permissions",
      "name": "RequestAccessFlow",
      "label": "Request access flow",
      "description": "Three-step wizard (explain why, choose role, review and submit) with reviewer summary, SLA chip and a success panel; optional modal semantics.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/request-access",
      "tags": [
        "rbac",
        "request",
        "wizard",
        "flow"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/approval-request-row",
      "family": "permissions",
      "name": "ApprovalRequestRow",
      "label": "Approval request row",
      "description": "Pending approval entry showing requester avatar and role, requested-role badge, reason quote and approve/reject/snooze actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/approval-row",
      "tags": [
        "rbac",
        "approval",
        "review",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/jit-access-banner",
      "family": "permissions",
      "name": "JitAccessBanner",
      "label": "JIT access banner",
      "description": "Just-in-time elevation banner with a live per-second countdown to expiry, scope copy and a revoke-now button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/jit-banner",
      "tags": [
        "rbac",
        "jit",
        "elevation",
        "countdown"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/api-scope-chip",
      "family": "permissions",
      "name": "ApiScopeChip",
      "label": "API scope chip",
      "description": "Compact chip for an OAuth-style scope with action inferred from the scope suffix (read/write/admin/delete) and a hover tooltip bubble; renders as a static label or selectable button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/api-scope-chip",
      "tags": [
        "rbac",
        "scope",
        "chip",
        "api"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/session-table",
      "family": "permissions",
      "name": "SessionTable",
      "label": "Session table",
      "description": "DataTable of active sessions showing device icon, IP, location, last-active and a current/live status chip, with per-row revoke.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/session-table",
      "tags": [
        "rbac",
        "session",
        "table",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/audit-trail",
      "family": "permissions",
      "name": "AuditTrail",
      "label": "Audit trail",
      "description": "Filterable, paginated audit-event table (event-type, actor and date-range filters) with expandable rows that reveal the full JSON payload.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/audit-trail",
      "tags": [
        "rbac",
        "audit",
        "log",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "permissions/policy-rule-editor",
      "family": "permissions",
      "name": "PolicyRuleEditor",
      "label": "Policy rule editor",
      "description": "Chip-select rule builder (when [event] on [subject], if [condition], then allow/deny because [reason]) with a live compiled-preview line.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/permissions",
      "routeHref": "/ui-primitives/permissions/policy-editor",
      "tags": [
        "rbac",
        "policy",
        "rule",
        "editor"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
