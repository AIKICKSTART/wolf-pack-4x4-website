/**
 * Component documentation manifest — `account` family.
 *
 * Settings + account-management primitives: a settings sidebar, profile card,
 * plan badge, usage meter, team-member / session / api-token / audit rows, an
 * integration tile, a notification-channel row, and a danger-action card.
 * Sourced READ-ONLY from `src/app/ui-primitives/components/account`.
 *
 * Every design value is referenced as a central `--primitive-*` token name.
 */

import type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
} from "./types"

const COMPONENT_PATH = "@/app/ui-primitives/components/account"

/** A11y baseline for static account cards/rows. */
const STATIC_ROW_A11Y: DocAccessibilityNotes = {
  requiresLabel: false,
  keyboard: ["Interactive controls (buttons/links/toggles) are focusable", "Enter/Space activate them"],
  visibleFocus: true,
  respectsReducedMotion: true,
}

const settingsSidebar: ComponentDocEntry = {
  key: "account/settings-sidebar",
  importName: "SettingsSidebar",
  name: "Settings sidebar",
  summary: "Vertical settings navigation with an active item and labelled groups.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/profile",
  propsSchema: {
    fields: [
      { key: "activeId", type: "string", required: true },
      { key: "items", type: "array", required: false, description: "SettingsSidebarItem list; sensible default set provided." },
      { key: "ariaLabel", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "sidebar surface" },
    { token: "--primitive-field-hover", category: "color", usage: "item hover" },
    { token: "--primitive-red", category: "color", usage: "active item accent" },
    { token: "--primitive-muted", category: "color", usage: "group labels" },
    { token: "--primitive-radius-md", category: "radius", usage: "item corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { activeId: "profile" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "md" },
  codeExample: {
    language: "tsx",
    caption: "A settings nav with an active item.",
    code: `import { SettingsSidebar } from "@/app/ui-primitives/components/account"

export function Nav() {
  return (
    <SettingsSidebar
      activeId="profile"
      items={[
        { id: "profile", label: "Profile", href: "/account/profile" },
        { id: "security", label: "Security", href: "/account/security" },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SettingsSidebar.", "Pass activeId.", "Provide items or use the default set."] },
  accessibility: { ...STATIC_ROW_A11Y, role: "navigation", notes: ["Provide ariaLabel for the nav landmark."] },
  responsive: {
    mobile: "Collapse into a select or drawer.",
    tablet: "Narrow rail.",
    desktop: "Persistent rail beside the settings content.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["App-shell navigation."],
  },
  agent: {
    whenToUse: "Use as the left nav of a settings area.",
    steps: ["Define items with stable ids.", "Bind activeId to the route."],
    pitfalls: ["activeId must match an item id."],
  },
  tags: ["settings", "navigation", "sidebar"],
}

const profileCard: ComponentDocEntry = {
  key: "account/profile-card",
  importName: "ProfileCard",
  name: "Profile card",
  summary: "User identity card with avatar, role chip, contact, stats, and an edit affordance.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/profile",
  propsSchema: {
    fields: [
      { key: "name", type: "string", required: true },
      { key: "role", type: "string", required: true },
      { key: "email", type: "string", required: true },
      { key: "location", type: "string", required: false },
      { key: "avatarSrc", type: "image", required: false },
      { key: "avatarTone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "AvatarTone." },
      { key: "roleChipTone", type: "enum", required: false, description: "ChipTone." },
      { key: "stats", type: "array", required: false, description: "ProfileStat list." },
      { key: "editHref", type: "url", required: false },
      { key: "editLabel", type: "string", required: false },
      { key: "actions", type: "json", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-line", category: "color", usage: "card border + stat dividers" },
    { token: "--primitive-text-strong", category: "color", usage: "name" },
    { token: "--primitive-muted", category: "color", usage: "role + location" },
    { token: "--primitive-radius-xl", category: "radius", usage: "card corner" },
    { token: "--primitive-card-shadow", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "pencil", importPath: "lucide-react", usage: "edit affordance" }],
  assetDependencies: [{ id: "avatar", type: "image", required: false, description: "Optional avatar image." }],
  previewConfig: { sampleProps: { name: "Dan Fleuren", role: "Owner", email: "dan@mufflermen.au" }, background: "panel", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A profile card with stats.",
    code: `import { ProfileCard } from "@/app/ui-primitives/components/account"

export function Profile() {
  return (
    <ProfileCard
      name="Dan Fleuren"
      role="Workshop owner"
      email="dan@mufflermen.au"
      location="Oak Flats, NSW"
      stats={[{ label: "Jobs", value: "1,204" }]}
      onEdit={() => openEditor()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ProfileCard.", "Pass name/role/email.", "Provide stats and an edit handler/href."] },
  accessibility: { ...STATIC_ROW_A11Y, notes: ["Numeric stats use tabular-nums."] },
  responsive: {
    mobile: "Avatar stacks above details; stats wrap.",
    tablet: "Avatar beside details.",
    desktop: "Avatar beside details with a stat row.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Bound to the signed-in user."],
  },
  agent: {
    whenToUse: "Use to display the current user's identity and key stats.",
    steps: ["Map user fields to props.", "Provide an edit path."],
    pitfalls: ["Either onEdit or editHref — not both unless intended."],
  },
  tags: ["profile", "identity", "card"],
}

const planBadge: ComponentDocEntry = {
  key: "account/plan-badge",
  importName: "PlanBadge",
  name: "Plan badge",
  summary: "Subscription-tier badge with size variants and an optional caption.",
  category: "Commerce",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/billing",
  propsSchema: {
    fields: [
      { key: "tier", type: "enum", required: true, description: "PlanTier." },
      { key: "size", type: "enum", required: false, options: ["sm", "md", "lg"], description: "PlanBadgeSize." },
      { key: "caption", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "badge fill" },
    { token: "--primitive-amber", category: "color", usage: "premium tier accent" },
    { token: "--primitive-teal", category: "color", usage: "standard tier accent" },
    { token: "--primitive-radius-pill", category: "radius", usage: "badge shape" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { tier: "pro", size: "md" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A plan badge.",
    code: `import { PlanBadge } from "@/app/ui-primitives/components/account"

export function Tier() {
  return <PlanBadge tier="pro" caption="Renews 1 Jul" />
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import PlanBadge.", "Pass the tier.", "Add a caption for renewal info."] },
  accessibility: { ...STATIC_ROW_A11Y, keyboard: [], visibleFocus: false },
  responsive: { mobile: "Compact pill.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Derived from billing state."],
  },
  agent: {
    whenToUse: "Use to label the user's subscription tier.",
    steps: ["Map the billing tier to the prop."],
    pitfalls: ["Keep tier in sync with billing."],
  },
  tags: ["plan", "badge", "billing"],
}

const usageMeterCard: ComponentDocEntry = {
  key: "account/usage-meter-card",
  importName: "UsageMeterCard",
  name: "Usage meter card",
  summary: "Quota card with a linear meter, unit, reset date, and tone.",
  category: "Data",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/billing",
  propsSchema: {
    fields: [
      { key: "label", type: "string", required: true },
      { key: "used", type: "number", required: true, min: 0 },
      { key: "limit", type: "number", required: true, min: 1 },
      { key: "unit", type: "string", required: false },
      { key: "resetDate", type: "string", required: false },
      { key: "caption", type: "string", required: false },
      { key: "tone", type: "enum", required: false, description: "ProgressLinearTone." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-line", category: "color", usage: "card border" },
    { token: "--primitive-teal", category: "color", usage: "healthy meter fill" },
    { token: "--primitive-amber", category: "color", usage: "near-limit fill" },
    { token: "--primitive-red", category: "color", usage: "over-limit fill" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card + meter corner" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { label: "Storage", used: 7.2, limit: 10, unit: "GB" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A storage quota card.",
    code: `import { UsageMeterCard } from "@/app/ui-primitives/components/account"

export function Quota() {
  return (
    <UsageMeterCard
      label="Storage"
      used={7.2}
      limit={10}
      unit="GB"
      resetDate="1 Jul"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import UsageMeterCard.", "Pass used + limit.", "Add unit + resetDate for context."] },
  accessibility: { ...STATIC_ROW_A11Y, keyboard: [], visibleFocus: false, notes: ["Figures use tabular-nums; the meter exposes its value via aria."] },
  responsive: { mobile: "Full-width card.", tablet: "Unchanged.", desktop: "Sits in a stats grid." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Bound to live usage data."],
  },
  agent: {
    whenToUse: "Use to show consumption against a quota.",
    steps: ["Pass used + limit.", "Set tone for thresholds if needed."],
    pitfalls: ["limit must be > 0."],
  },
  tags: ["usage", "meter", "quota"],
}

const teamMemberRow: ComponentDocEntry = {
  key: "account/team-member-row",
  importName: "TeamMemberRow",
  name: "Team member row",
  summary: "Member row with role select, status, and a remove action.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/team",
  propsSchema: {
    fields: [
      { key: "member", type: "object", required: true, description: "TeamMemberRowItem ({ id, name, email, role, status, ... })." },
      { key: "disabled", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-green", category: "color", usage: "active status" },
    { token: "--primitive-amber", category: "color", usage: "invited status" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [{ name: "trash-2", importPath: "lucide-react", usage: "remove action" }],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A team member row.",
    code: `import { TeamMemberRow } from "@/app/ui-primitives/components/account"

export function Member() {
  return (
    <TeamMemberRow
      member={{ id: "u1", name: "Sam", email: "sam@shop.au", role: "admin", status: "active" }}
      onRoleChange={(id, role) => updateRole(id, role)}
      onRemove={(id) => remove(id)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import TeamMemberRow.", "Pass a member item.", "Handle onRoleChange / onRemove."] },
  accessibility: { ...STATIC_ROW_A11Y },
  responsive: { mobile: "Role/actions wrap below the name.", tablet: "Inline row.", desktop: "Inline row." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per team member in a list."],
  },
  agent: {
    whenToUse: "Use in a team-management table, one row per member.",
    steps: ["Render per member.", "Wire role/remove handlers."],
    pitfalls: ["Disable controls for the current user when appropriate."],
  },
  tags: ["team", "member", "row"],
}

const integrationTile: ComponentDocEntry = {
  key: "account/integration-tile",
  importName: "IntegrationTile",
  name: "Integration tile",
  summary: "Connected-service tile with status, scopes, last-sync, and an action.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/integrations",
  propsSchema: {
    fields: [
      { key: "name", type: "string", required: true },
      { key: "description", type: "string", required: true },
      { key: "status", type: "enum", required: true, description: "IntegrationStatus." },
      { key: "glyph", type: "icon", required: true, description: "Service glyph node." },
      { key: "category", type: "string", required: false },
      { key: "lastSync", type: "string", required: false },
      { key: "scopes", type: "array", required: false, items: { key: "scope", type: "string", required: true } },
      { key: "actionHref", type: "url", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "tile surface" },
    { token: "--primitive-line", category: "color", usage: "tile border" },
    { token: "--primitive-green", category: "color", usage: "connected status" },
    { token: "--primitive-muted", category: "color", usage: "scopes + last sync" },
    { token: "--primitive-radius-lg", category: "radius", usage: "tile corner" },
    { token: "--primitive-card-hover-shadow", category: "shadow", usage: "hover elevation" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { name: "Stripe", description: "Payments", status: "connected" }, background: "panel", aspectRatio: "1/1" },
  codeExample: {
    language: "tsx",
    caption: "A connected integration tile.",
    code: `import { Plug } from "lucide-react"
import { IntegrationTile } from "@/app/ui-primitives/components/account"

export function Integration() {
  return (
    <IntegrationTile
      name="Stripe"
      description="Accept card payments"
      status="connected"
      glyph={<Plug aria-hidden="true" />}
      lastSync="2 min ago"
      onAction={() => manage()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import IntegrationTile.", "Provide name/description/status/glyph.", "Wire onAction or actionHref."] },
  accessibility: { ...STATIC_ROW_A11Y, notes: ["glyph must be aria-hidden; the name conveys identity."] },
  responsive: { mobile: "Single-column tiles.", tablet: "Two-up grid.", desktop: "Multi-column bento grid." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Rendered per integration in a catalogue grid."],
  },
  agent: {
    whenToUse: "Use to present a connectable/connected service.",
    steps: ["Pass a glyph node.", "Reflect live status.", "Wire the manage/connect action."],
    pitfalls: ["Always aria-hide the glyph."],
  },
  tags: ["integration", "tile", "connect"],
}

const notificationChannelRow: ComponentDocEntry = {
  key: "account/notification-channel-row",
  importName: "NotificationChannelRow",
  name: "Notification channel row",
  summary: "Per-category notification toggles across channels.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/notifications",
  propsSchema: {
    fields: [
      { key: "item", type: "object", required: true, description: "NotificationChannelRowItem ({ category, channels, ... })." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-teal", category: "color", usage: "enabled toggle" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "toggle focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A notification preferences row.",
    code: `import { NotificationChannelRow } from "@/app/ui-primitives/components/account"

export function Prefs() {
  return (
    <NotificationChannelRow
      item={{
        category: "Bookings",
        channels: { email: true, sms: false, push: true },
      }}
      onToggle={(channel, enabled) => save(channel, enabled)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import NotificationChannelRow.", "Pass a category item.", "Handle onToggle."] },
  accessibility: { ...STATIC_ROW_A11Y, notes: ["Each toggle has an accessible label tied to the channel."] },
  responsive: { mobile: "Toggles wrap under the category.", tablet: "Inline toggles.", desktop: "Inline toggles." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per notification category."],
  },
  agent: {
    whenToUse: "Use in notification settings, one row per category.",
    steps: ["Render per category.", "Persist onToggle changes."],
    pitfalls: ["Keep channel keys consistent with your backend."],
  },
  tags: ["notifications", "settings", "toggle"],
}

const sessionRow: ComponentDocEntry = {
  key: "account/session-row",
  importName: "SessionRow",
  name: "Session row",
  summary: "Active-session row with device, location, last-active, and revoke.",
  category: "Auth",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/sessions",
  propsSchema: {
    fields: [
      { key: "session", type: "object", required: true, description: "SessionRowItem ({ id, device, location, lastActive, current, ... })." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-green", category: "color", usage: "current-session accent" },
    { token: "--primitive-muted", category: "color", usage: "metadata" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "monitor", importPath: "lucide-react", usage: "desktop device glyph" },
    { name: "smartphone", importPath: "lucide-react", usage: "mobile device glyph" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "An active session row.",
    code: `import { SessionRow } from "@/app/ui-primitives/components/account"

export function Session() {
  return (
    <SessionRow
      session={{ id: "s1", device: "desktop", location: "Sydney", lastActive: "now", current: true }}
      onRevoke={(id) => revoke(id)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SessionRow.", "Pass a session item.", "Handle onRevoke (disable for the current session)."] },
  accessibility: { ...STATIC_ROW_A11Y },
  responsive: { mobile: "Metadata wraps; revoke stays reachable.", tablet: "Inline row.", desktop: "Inline row." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per active session."],
  },
  agent: {
    whenToUse: "Use in a security area, one row per active session.",
    steps: ["Render per session.", "Wire revoke.", "Flag the current session."],
    pitfalls: ["Do not allow revoking the current session without a warning."],
  },
  tags: ["auth", "session", "security"],
}

const apiTokenRow: ComponentDocEntry = {
  key: "account/api-token-row",
  importName: "ApiTokenRow",
  name: "API token row",
  summary: "API key row with copy and revoke actions.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/api-tokens",
  propsSchema: {
    fields: [
      { key: "token", type: "object", required: true, description: "ApiTokenRowItem ({ id, label, masked, createdAt, ... })." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-font-mono", category: "typography", usage: "masked key" },
    { token: "--primitive-red", category: "color", usage: "revoke action" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "copy", importPath: "lucide-react", usage: "copy key" },
    { name: "trash-2", importPath: "lucide-react", usage: "revoke key" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "An API token row.",
    code: `import { ApiTokenRow } from "@/app/ui-primitives/components/account"

export function Token() {
  return (
    <ApiTokenRow
      token={{ id: "t1", label: "CI token", masked: "sk_…a91", createdAt: "1 Jun" }}
      onCopy={(id) => copy(id)}
      onRevoke={(id) => revoke(id)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ApiTokenRow.", "Pass a masked token item.", "Handle onCopy / onRevoke."] },
  accessibility: { ...STATIC_ROW_A11Y, notes: ["Masked key renders in the mono token; never show the full secret."] },
  responsive: { mobile: "Actions wrap below the key.", tablet: "Inline row.", desktop: "Inline row." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per API token."],
  },
  agent: {
    whenToUse: "Use to list issued API tokens.",
    steps: ["Pass only the masked value.", "Wire copy/revoke."],
    pitfalls: ["Never render the unmasked secret after creation."],
  },
  tags: ["api", "token", "security"],
}

const dangerActionCard: ComponentDocEntry = {
  key: "account/danger-action-card",
  importName: "DangerActionCard",
  name: "Danger action card",
  summary: "Destructive-action card requiring a typed confirmation phrase.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/danger-zone",
  propsSchema: {
    fields: [
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: true },
      { key: "confirmationPhrase", type: "string", required: true },
      { key: "actionLabel", type: "string", required: true },
      { key: "tone", type: "enum", required: false, description: "DangerActionTone." },
      { key: "icon", type: "enum", required: false, description: "DangerActionIcon." },
      { key: "consequences", type: "array", required: false, items: { key: "consequence", type: "string", required: true } },
      { key: "helperText", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-red", category: "color", usage: "destructive accent + border" },
    { token: "--primitive-line", category: "color", usage: "field border" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [{ name: "alert-triangle", importPath: "lucide-react", usage: "danger glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { title: "Delete workshop", description: "Permanently removes all data.", confirmationPhrase: "DELETE", actionLabel: "Delete" }, background: "panel", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A type-to-confirm destructive card.",
    code: `import { DangerActionCard } from "@/app/ui-primitives/components/account"

export function DangerZone() {
  return (
    <DangerActionCard
      title="Delete workshop"
      description="This permanently removes all jobs, quotes, and customers."
      confirmationPhrase="DELETE"
      actionLabel="Delete workshop"
      consequences={["All data is erased", "This cannot be undone"]}
      onConfirm={() => destroy()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import DangerActionCard.", "Set a confirmationPhrase the user must type.", "Handle onConfirm."], notes: ["The action stays disabled until the phrase matches exactly."] },
  accessibility: { ...STATIC_ROW_A11Y, notes: ["The confirm button is disabled until the typed phrase matches."] },
  responsive: { mobile: "Field + button stack.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Settings danger zone — not droppable content."],
  },
  agent: {
    whenToUse: "Use to gate irreversible actions behind a typed confirmation.",
    steps: ["Choose a clear confirmation phrase.", "List consequences.", "Handle onConfirm."],
    pitfalls: ["Never auto-fill the confirmation phrase."],
  },
  tags: ["danger", "destructive", "confirm"],
}

const auditLogRow: ComponentDocEntry = {
  key: "account/audit-log-row",
  importName: "AuditLogRow",
  name: "Audit log row",
  summary: "Audit event row with actor, action, tone, and timestamp.",
  category: "Operations",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/account/audit-log",
  propsSchema: {
    fields: [
      { key: "entry", type: "object", required: true, description: "AuditLogRowItem ({ actor, action, tone, at, ... })." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-green", category: "color", usage: "success event tone" },
    { token: "--primitive-amber", category: "color", usage: "warning event tone" },
    { token: "--primitive-red", category: "color", usage: "critical event tone" },
    { token: "--primitive-font-mono", category: "typography", usage: "timestamp / ids" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "An audit log entry.",
    code: `import { AuditLogRow } from "@/app/ui-primitives/components/account"

export function Audit() {
  return (
    <AuditLogRow
      entry={{ actor: "Sam", action: "Revoked API token", tone: "warning", at: "2:14 PM" }}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import AuditLogRow.", "Pass an audit entry.", "Render many rows in a log list."] },
  accessibility: { ...STATIC_ROW_A11Y, keyboard: [], visibleFocus: false, notes: ["Timestamps use tabular-nums for alignment."] },
  responsive: { mobile: "Action wraps under the actor.", tablet: "Inline row.", desktop: "Inline row." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per audit event."],
  },
  agent: {
    whenToUse: "Use to render a security/audit trail, one row per event.",
    steps: ["Map events to entries.", "Set tone by severity."],
    pitfalls: ["Keep timestamps in a consistent format."],
  },
  tags: ["audit", "log", "security"],
}

const entries: readonly ComponentDocEntry[] = [
  settingsSidebar,
  profileCard,
  planBadge,
  usageMeterCard,
  teamMemberRow,
  integrationTile,
  notificationChannelRow,
  sessionRow,
  apiTokenRow,
  dangerActionCard,
  auditLogRow,
]

const accountDocs: ComponentDocFamily = {
  family: "account",
  title: "Account & settings",
  group: "System",
  summary:
    "Settings + account-management primitives: settings sidebar, profile card, plan badge, usage meter, team/session/api-token/audit rows, integration tile, notification-channel row, and a type-to-confirm danger card.",
  importPath: COMPONENT_PATH,
  entries,
}

export default accountDocs
