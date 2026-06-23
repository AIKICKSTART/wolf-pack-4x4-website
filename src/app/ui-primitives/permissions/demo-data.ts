import type {
  ActiveSession,
  ApprovalRequest,
  AuditDateRangeOption,
  AuditEvent,
  AuditFilterOption,
  InheritanceNode,
  PermissionActionConfig,
  PermissionMatrixValue,
  PermissionResource,
  PolicyRuleEditorState,
  PolicyRuleOption,
  RequestAccessReviewer,
  RequestAccessRoleOption,
  RolePermissionLine,
  RoleScope,
  WorkspaceEntry,
} from "../components/permissions"

export const DEMO_RESOURCES: ReadonlyArray<PermissionResource> = [
  { id: "jobs", label: "Jobs", hint: "Workshop jobs" },
  { id: "quotes", label: "Quotes", hint: "Customer quotes" },
  { id: "parts", label: "Parts", hint: "Inventory + orders" },
  { id: "invoices", label: "Invoices", hint: "Billing" },
  { id: "settings", label: "Settings", hint: "Workspace config" },
  { id: "users", label: "Users", hint: "Team + roles" },
  { id: "api", label: "API", hint: "Tokens + scopes" },
]

export const DEMO_ACTIONS: ReadonlyArray<PermissionActionConfig> = [
  { id: "view", label: "View" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
  { id: "approve", label: "Approve" },
  { id: "export", label: "Export" },
]

export const DEMO_MATRIX_VALUE: PermissionMatrixValue = {
  jobs: { view: "allow", create: "allow", edit: "allow", delete: "deny", approve: "allow", export: "inherited" },
  quotes: { view: "allow", create: "allow", edit: "allow", delete: "deny", approve: "deny", export: "allow" },
  parts: { view: "allow", create: "allow", edit: "allow", delete: "deny", approve: "inherited", export: "allow" },
  invoices: { view: "allow", create: "inherited", edit: "deny", delete: "deny", approve: "deny", export: "allow" },
  settings: { view: "allow", create: "deny", edit: "deny", delete: "deny", approve: "deny", export: "inherited" },
  users: { view: "allow", create: "deny", edit: "deny", delete: "deny", approve: "deny", export: "deny" },
  api: { view: "allow", create: "deny", edit: "deny", delete: "deny", approve: "deny", export: "inherited" },
}

export const DEMO_INHERITANCE_NODES: ReadonlyArray<InheritanceNode> = [
  {
    id: "n-user",
    label: "Jordan Mitchell",
    source: "direct",
    grantedBy: "Direct grant by Marcus Wells",
    state: "allow",
    note: "Granted for the Oak Flats fleet rollout — expires 30 May.",
  },
  {
    id: "n-role",
    label: "Workshop Manager role",
    source: "inherited",
    grantedBy: "Role 'Workshop Manager'",
    state: "allow",
    note: "Role default — applies workshop-wide.",
  },
  {
    id: "n-group",
    label: "Albion Park bay leads",
    source: "group",
    grantedBy: "Group 'AP bay leads'",
    state: "inherited",
    note: "Group rule passes through — no override.",
  },
  {
    id: "n-workspace",
    label: "Workspace default",
    source: "workspace",
    grantedBy: "Workspace 'Oak Flats Mufflermen'",
    state: "deny",
    note: "Workspace default would deny without the higher-priority grants.",
  },
]

export const DEMO_ROLE_INSPECTOR_PERMISSIONS: ReadonlyArray<RolePermissionLine> = [
  { id: "jobs.view", label: "View jobs", hint: "All bays" },
  { id: "jobs.edit", label: "Edit jobs", hint: "Any status" },
  { id: "jobs.approve", label: "Approve job completion" },
  { id: "quotes.view", label: "View quotes" },
  { id: "quotes.edit", label: "Edit quotes", hint: "Up to $4,000" },
  { id: "quotes.approve", label: "Approve quotes", hint: "Up to $4,000" },
  { id: "parts.view", label: "View parts stock" },
  { id: "parts.create", label: "Receive new stock" },
  { id: "parts.edit", label: "Edit SKU details" },
  { id: "invoices.view", label: "View invoices" },
  { id: "users.view", label: "View team list" },
]

export const DEMO_ROLE_SCOPES: ReadonlyArray<RoleScope> = [
  { id: "wsp-oak", label: "Workshop · Oak Flats", tone: "red" },
  { id: "wsp-ap", label: "Workshop · Albion Park", tone: "amber" },
  { id: "amount-cap", label: "Quote ceiling: $4,000", tone: "teal" },
  { id: "hours", label: "Hours: 06:00 – 18:00 AEST" },
]

export const DEMO_WORKSPACES: ReadonlyArray<WorkspaceEntry> = [
  {
    id: "ws-oak",
    name: "Oak Flats Mufflermen",
    suburb: "Oak Flats NSW",
    memberCount: 22,
    plan: "Workshop",
    roleInWorkspace: "Workshop Manager",
    roleTone: "workshop",
    avatarTone: "red",
  },
  {
    id: "ws-ap",
    name: "Albion Park Exhausts",
    suburb: "Albion Park NSW",
    memberCount: 11,
    plan: "Starter",
    roleInWorkspace: "Front Desk",
    roleTone: "member",
    avatarTone: "amber",
  },
  {
    id: "ws-shellharbour",
    name: "Shellharbour Brake & Muffler",
    suburb: "Shellharbour NSW",
    memberCount: 34,
    plan: "Fleet",
    roleInWorkspace: "Viewer",
    roleTone: "viewer",
    avatarTone: "teal",
  },
  {
    id: "ws-illawarra",
    name: "Illawarra Fleet Co",
    suburb: "Wollongong NSW",
    memberCount: 68,
    plan: "Enterprise",
    roleInWorkspace: "Billing",
    roleTone: "billing",
    avatarTone: "green",
  },
  {
    id: "ws-sandbox",
    name: "Sandbox · staging",
    suburb: "Sydney NSW",
    memberCount: 3,
    plan: "Starter",
    roleInWorkspace: "Owner",
    roleTone: "owner",
    avatarTone: "obsidian",
  },
]

export const DEMO_REQUEST_ROLE_OPTIONS: ReadonlyArray<RequestAccessRoleOption> = [
  {
    id: "workshop-manager",
    label: "Workshop Manager",
    tone: "workshop",
    description: "Approve quotes up to $4,000, edit jobs across bays, receive stock.",
  },
  {
    id: "front-desk",
    label: "Front Desk",
    tone: "member",
    description: "Take bookings, view quotes and invoices, but no edit rights.",
  },
  {
    id: "billing",
    label: "Billing",
    tone: "billing",
    description: "Manage invoices, send statements, export accounting data.",
  },
  {
    id: "parts-receiver",
    label: "Parts Receiver",
    tone: "member",
    description: "Receive stock, reconcile deliveries, no quote or invoice access.",
  },
]

export const DEMO_REQUEST_REVIEWER: RequestAccessReviewer = {
  name: "Marcus Wells",
  role: "Workshop owner · Oak Flats",
  avatarTone: "red",
}

export const DEMO_APPROVAL_REQUESTS: ReadonlyArray<ApprovalRequest> = [
  {
    id: "ar-1",
    requesterName: "Jordan Mitchell",
    requesterRole: "Apprentice · Oak Flats",
    avatarTone: "amber",
    requestedRole: "Workshop Manager",
    requestedRoleTone: "workshop",
    reason:
      "Marcus is offshore tonight and the fleet quote for Coastal Logistics needs sign-off before 18:00. Need temporary edit + approve on Quotes.",
    submittedAt: "2026-05-28T07:38:00+10:00",
    hint: "Expires in 38m if not actioned",
  },
  {
    id: "ar-2",
    requesterName: "Sophie Tan",
    requesterRole: "Front Desk · Albion Park",
    avatarTone: "teal",
    requestedRole: "Billing",
    requestedRoleTone: "billing",
    reason:
      "Need to resend the May statements to Tradie Fleet Co — original sender left the team and access lapsed.",
    submittedAt: "2026-05-28T06:11:00+10:00",
  },
  {
    id: "ar-3",
    requesterName: "Daniel Kovac",
    requesterRole: "Parts driver · Shellharbour",
    avatarTone: "obsidian",
    requestedRole: "Parts Receiver",
    requestedRoleTone: "member",
    reason:
      "Permanent role bump — covering for Lou while she is on parental leave through July.",
    submittedAt: "2026-05-27T16:02:00+10:00",
    hint: "Scope: Oak Flats + Albion Park",
  },
]

export const DEMO_SESSIONS: ReadonlyArray<ActiveSession> = [
  {
    id: "s-1",
    device: "laptop",
    label: "Workshop desk · Oak Flats",
    browser: "Chrome 134 · macOS",
    ip: "203.45.122.18",
    location: "Oak Flats NSW",
    lastActive: "Now",
    current: true,
  },
  {
    id: "s-2",
    device: "phone",
    label: "Jordan's iPhone",
    browser: "Safari · iOS 19",
    ip: "203.45.122.31",
    location: "Oak Flats NSW",
    lastActive: "12 min ago",
  },
  {
    id: "s-3",
    device: "tablet",
    label: "Bay 02 floor tablet",
    browser: "Edge 134 · Windows",
    ip: "10.20.40.7",
    location: "Albion Park NSW",
    lastActive: "1 h ago",
  },
  {
    id: "s-4",
    device: "browser",
    label: "Remote — accountant",
    browser: "Firefox 142 · Windows",
    ip: "118.92.46.214",
    location: "Sydney NSW",
    lastActive: "Yesterday 16:24",
  },
  {
    id: "s-5",
    device: "desktop",
    label: "Front desk PC",
    browser: "Chrome 134 · Windows",
    ip: "10.20.40.21",
    location: "Oak Flats NSW",
    lastActive: "Yesterday 09:08",
  },
]

export const DEMO_AUDIT_EVENT_TYPES: ReadonlyArray<AuditFilterOption> = [
  { id: "auth", label: "Auth", count: 18 },
  { id: "jobs", label: "Jobs", count: 42 },
  { id: "quotes", label: "Quotes", count: 27 },
  { id: "invoices", label: "Invoices", count: 14 },
  { id: "users", label: "Users", count: 9 },
  { id: "api", label: "API", count: 6 },
]

export const DEMO_AUDIT_ACTORS: ReadonlyArray<AuditFilterOption> = [
  { id: "Marcus Wells", label: "Marcus Wells" },
  { id: "Jordan Mitchell", label: "Jordan Mitchell" },
  { id: "Sophie Tan", label: "Sophie Tan" },
  { id: "system", label: "System" },
]

export const DEMO_AUDIT_DATE_RANGES: ReadonlyArray<AuditDateRangeOption> = [
  { id: "24h", label: "Last 24h" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "all", label: "All time" },
]

export const DEMO_AUDIT_EVENTS: ReadonlyArray<AuditEvent> = [
  {
    id: "ev-1",
    timestamp: "2026-05-28T07:42:11+10:00",
    actor: "Marcus Wells",
    actorAvatarTone: "red",
    action: "quotes.approve",
    resource: "Quote",
    target: "Q-2415 · Coastal Logistics",
    tone: "success",
    ip: "203.45.122.18",
    location: "Oak Flats NSW",
    payload: JSON.stringify(
      {
        quoteId: "Q-2415",
        amount: 3840.5,
        currency: "AUD",
        customer: "Coastal Logistics",
        approvedBy: "marcus.wells@oakflatsmuffler.au",
        notes: "Stage 2 cat-back upgrade + dual-tip swap",
      },
      null,
      2,
    ),
  },
  {
    id: "ev-2",
    timestamp: "2026-05-28T07:38:00+10:00",
    actor: "Jordan Mitchell",
    actorAvatarTone: "amber",
    action: "auth.request-access",
    resource: "Role",
    target: "Workshop Manager",
    tone: "warn",
    ip: "203.45.122.31",
    location: "Oak Flats NSW",
    payload: JSON.stringify(
      {
        roleRequested: "workshop-manager",
        scope: "wsp-oak",
        durationHours: 4,
        justification: "Cover for Marcus while offshore tonight",
      },
      null,
      2,
    ),
  },
  {
    id: "ev-3",
    timestamp: "2026-05-28T06:18:24+10:00",
    actor: "system",
    action: "api.token-rotate",
    resource: "API token",
    target: "wsp-oak/prod-1",
    tone: "info",
    ip: "—",
    payload: JSON.stringify(
      {
        tokenId: "tok_4xz9",
        lastUsed: "2026-05-27T22:14:00+10:00",
        rotatedBy: "system",
      },
      null,
      2,
    ),
  },
  {
    id: "ev-4",
    timestamp: "2026-05-28T06:11:00+10:00",
    actor: "Sophie Tan",
    actorAvatarTone: "teal",
    action: "auth.sign-in",
    resource: "Session",
    target: "Albion Park · tablet",
    tone: "success",
    ip: "10.20.40.7",
    location: "Albion Park NSW",
  },
  {
    id: "ev-5",
    timestamp: "2026-05-27T22:08:00+10:00",
    actor: "Marcus Wells",
    actorAvatarTone: "red",
    action: "users.role-change",
    resource: "User",
    target: "Daniel Kovac → Parts Receiver",
    tone: "info",
    ip: "203.45.122.18",
    location: "Oak Flats NSW",
    payload: JSON.stringify(
      {
        userId: "u_daniel",
        from: "parts-driver",
        to: "parts-receiver",
        scope: ["wsp-oak", "wsp-ap"],
      },
      null,
      2,
    ),
  },
  {
    id: "ev-6",
    timestamp: "2026-05-27T16:24:00+10:00",
    actor: "Marcus Wells",
    actorAvatarTone: "red",
    action: "invoices.export",
    resource: "Invoices",
    target: "May 2026 batch",
    tone: "info",
  },
  {
    id: "ev-7",
    timestamp: "2026-05-27T09:08:00+10:00",
    actor: "system",
    action: "auth.lockout",
    resource: "Session",
    target: "Front desk PC",
    tone: "danger",
    ip: "10.20.40.21",
    location: "Oak Flats NSW",
    payload: JSON.stringify(
      {
        attempts: 6,
        reason: "Five failed sign-ins within ten minutes",
        unblockBy: "Marcus Wells",
      },
      null,
      2,
    ),
  },
  {
    id: "ev-8",
    timestamp: "2026-05-27T07:42:00+10:00",
    actor: "Marcus Wells",
    actorAvatarTone: "red",
    action: "jobs.edit",
    resource: "Job",
    target: "J-2103 · HiLux exhaust",
    tone: "info",
  },
  {
    id: "ev-9",
    timestamp: "2026-05-26T17:14:00+10:00",
    actor: "Jordan Mitchell",
    actorAvatarTone: "amber",
    action: "parts.create",
    resource: "SKU",
    target: "AP-MUF-127",
    tone: "success",
  },
  {
    id: "ev-10",
    timestamp: "2026-05-26T11:02:00+10:00",
    actor: "system",
    action: "api.rate-limit",
    resource: "API",
    target: "/v1/quotes",
    tone: "warn",
    payload: JSON.stringify(
      { route: "/v1/quotes", peakRpm: 220, threshold: 180 },
      null,
      2,
    ),
  },
]

export const DEMO_POLICY_TRIGGERS: ReadonlyArray<PolicyRuleOption> = [
  { value: "quote-approve", label: "approve a quote" },
  { value: "invoice-export", label: "export invoices" },
  { value: "user-invite", label: "invite a user" },
  { value: "api-call", label: "call the public API" },
  { value: "parts-receive", label: "receive parts stock" },
]

export const DEMO_POLICY_SUBJECTS: ReadonlyArray<PolicyRuleOption> = [
  { value: "any-quote", label: "any quote" },
  { value: "high-value", label: "a quote above $4,000" },
  { value: "fleet-customer", label: "a fleet customer" },
  { value: "self", label: "themselves" },
  { value: "external-token", label: "an external API token" },
]

export const DEMO_POLICY_CONDITIONS: ReadonlyArray<PolicyRuleOption> = [
  { value: "outside-hours", label: "it is outside 06:00–18:00 AEST" },
  { value: "high-value", label: "the quote is over $4,000" },
  { value: "no-mfa", label: "MFA has not been verified in the last 8h" },
  { value: "unknown-ip", label: "the IP is unfamiliar" },
  { value: "any", label: "no further conditions" },
]

export const DEMO_POLICY_REASONS: ReadonlyArray<PolicyRuleOption> = [
  { value: "owner-only", label: "only the owner can authorise" },
  { value: "fleet-controls", label: "fleet customer controls apply" },
  { value: "after-hours", label: "after-hours operations are blocked" },
  { value: "audit", label: "an audit trail is required" },
  { value: "compliance", label: "compliance default" },
]

export const DEMO_POLICY_DEFAULT: PolicyRuleEditorState = {
  trigger: "quote-approve",
  subject: "high-value",
  condition: "outside-hours",
  outcome: "deny",
  reason: "after-hours",
}

/**
 * Returns a JIT expiry roughly 87 minutes ahead of the current render.
 *
 * Pages call this at render time so the countdown always shows a live
 * window rather than a stale build-time value.
 */
export function nextJitExpiry(): string {
  const target = new Date()
  target.setMinutes(target.getMinutes() + 87, 0, 0)
  return target.toISOString()
}
