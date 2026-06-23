/**
 * Demo data for the Settings & workspace screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) workspace settings fixtures:
 * the owner profile, plan + usage quotas, the bay team roster, connected
 * integrations, notification channels, API tokens, and destructive actions.
 * All copy is production-ready language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is "Torque". The legacy
 * internal codename is never surfaced in any string below.
 */

import type { ProfileStat } from "../../components/account/profile-card"
import type {
  SettingsSidebarItem,
} from "../../components/account/settings-sidebar"
import type {
  TeamMemberRowItem,
} from "../../components/account/team-member-row"
import type { IntegrationStatus } from "../../components/account/integration-tile"
import type {
  NotificationChannelRowItem,
} from "../../components/account/notification-channel-row"
import type { ApiTokenRowItem } from "../../components/account/api-token-row"
import type { PlanTier } from "../../components/account/plan-badge"
import type { ProgressLinearTone } from "../../components/primitives/progress-linear"
import type {
  DangerActionIcon,
  DangerActionTone,
} from "../../components/account/danger-action-card"

import {
  Bell,
  Building2,
  CreditCard,
  KeyRound,
  Plug,
  ShieldAlert,
  User,
  Users,
} from "lucide-react"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const WORKSPACE_SLUG = "oak-flats-muffler-men"

/** Owner identity surfaced on the profile card. */
export const OWNER_PROFILE = {
  name: "Daniel Carmody",
  role: "Owner · Workshop principal",
  email: "daniel@mufflermen.com.au",
  location: "Oak Flats, NSW 2529",
} as const

export const OWNER_STATS: ReadonlyArray<ProfileStat> = [
  { label: "Member since", value: "Mar 2019" },
  { label: "Active bays", value: "4", tone: "teal" },
  { label: "Team seats", value: "8 / 10", tone: "amber" },
  { label: "Jobs this month", value: "182", tone: "green" },
]

/** Plan tier + the workshop's metered usage this cycle. */
export const PLAN_TIER: PlanTier = "workshop"
export const PLAN_CAPTION = "Renews 1 Jun 2026 · $149/mo"

export interface UsageMeter {
  id: string
  label: string
  used: number
  limit: number
  unit?: string
  resetDate?: string
  caption?: string
  tone?: ProgressLinearTone
}

export const USAGE_METERS: ReadonlyArray<UsageMeter> = [
  {
    id: "torque-replies",
    label: "Torque AI replies",
    used: 1840,
    limit: 2500,
    unit: "replies",
    resetDate: "1 Jun",
  },
  {
    id: "team-seats",
    label: "Team seats",
    used: 8,
    limit: 10,
    unit: "seats",
    resetDate: "—",
  },
  {
    id: "social-posts",
    label: "Scheduled social posts",
    used: 92,
    limit: 100,
    unit: "posts",
    resetDate: "1 Jun",
  },
  {
    id: "storage",
    label: "Media & job photos",
    used: 38,
    limit: 50,
    unit: "GB",
    resetDate: "—",
  },
]

/** Bay team roster — owner, bay manager, technicians, office. */
export const TEAM_MEMBERS: ReadonlyArray<TeamMemberRowItem> = [
  {
    id: "tm-dan",
    name: "Daniel Carmody",
    email: "daniel@mufflermen.com.au",
    role: "owner",
    status: "active",
    avatarTone: "red",
    bay: "Front office",
  },
  {
    id: "tm-macca",
    name: "Mark “Macca” Ellison",
    email: "macca@mufflermen.com.au",
    role: "manager",
    status: "active",
    avatarTone: "amber",
    bay: "Bay 1 · Fabrication",
  },
  {
    id: "tm-davo",
    name: "Dave “Davo” Nguyen",
    email: "davo@mufflermen.com.au",
    role: "technician",
    status: "active",
    avatarTone: "teal",
    bay: "Bay 2 · Exhaust",
  },
  {
    id: "tm-sticks",
    name: "Liam “Sticks” Patel",
    email: "sticks@mufflermen.com.au",
    role: "technician",
    status: "active",
    avatarTone: "green",
    bay: "Bay 3 · Servicing",
  },
  {
    id: "tm-jess",
    name: "Jess Hartley",
    email: "jess@mufflermen.com.au",
    role: "admin",
    status: "active",
    avatarTone: "obsidian",
    bay: "Bookings & accounts",
  },
  {
    id: "tm-newhire",
    name: "Tyler Brooks",
    email: "tyler@mufflermen.com.au",
    role: "viewer",
    status: "invited",
    avatarTone: "obsidian",
    bay: "Apprentice · Bay 2",
  },
]

/** A connected-service tile fixture for the workshop's tool stack. */
export interface IntegrationItem {
  id: string
  name: string
  description: string
  category: string
  status: IntegrationStatus
  glyph: string
  lastSync?: string
  scopes: ReadonlyArray<string>
}

export const INTEGRATIONS: ReadonlyArray<IntegrationItem> = [
  {
    id: "gbp",
    name: "Google Business Profile",
    description:
      "Sync Oak Flats reviews, hours and posts so Torque can reply and keep the listing fresh.",
    category: "Reputation",
    status: "connected",
    glyph: "G",
    lastSync: "4 min ago",
    scopes: ["Reviews · read/reply", "Posts · publish", "Insights · read"],
  },
  {
    id: "mufflerpulse",
    name: "Mufflerpulse social",
    description:
      "Queue build reels and exhaust before/afters to Instagram and Facebook on the workshop's schedule.",
    category: "Marketing",
    status: "connected",
    glyph: "M",
    lastSync: "12 min ago",
    scopes: ["Instagram · publish", "Facebook · publish"],
  },
  {
    id: "xero",
    name: "Xero",
    description:
      "Push approved quotes and settled invoices straight into the workshop's books.",
    category: "Accounting",
    status: "connected",
    glyph: "X",
    lastSync: "1 hr ago",
    scopes: ["Invoices · write", "Contacts · read"],
  },
  {
    id: "twilio",
    name: "Twilio SMS",
    description:
      "Send booking confirmations and 'car's ready' texts from the Oak Flats number.",
    category: "Messaging",
    status: "setup",
    glyph: "T",
    scopes: ["SMS · send", "Numbers · read"],
  },
  {
    id: "supplier",
    name: "Supplier parts portal",
    description:
      "Live stock and pricing for mandrel bends, mufflers and DPF-back kits from the trade supplier.",
    category: "Inventory",
    status: "error",
    glyph: "S",
    scopes: ["Catalogue · read", "Orders · write"],
  },
  {
    id: "fleet",
    name: "Fleet booking webhook",
    description:
      "Inbound bookings from local fleet operators land directly on the workshop board.",
    category: "Bookings",
    status: "disabled",
    glyph: "F",
    scopes: ["Bookings · write"],
  },
]

/** Per-channel notification preferences for the workspace. */
export const NOTIFICATION_CHANNELS: ReadonlyArray<NotificationChannelRowItem> = [
  {
    channel: "email",
    destination: "daniel@mufflermen.com.au",
    enabled: true,
    categories: ["quote", "booking", "job"],
  },
  {
    channel: "sms",
    destination: "+61 4xx 218 776",
    enabled: true,
    categories: ["booking", "alert"],
  },
  {
    channel: "push",
    destination: "Workshop iPad · Bay 1",
    enabled: false,
    categories: ["job", "alert"],
  },
  {
    channel: "in-app",
    destination: "Torque workspace inbox",
    enabled: true,
    categories: ["quote", "marketing", "alert"],
  },
]

/** Programmatic-access tokens issued for the workspace. */
export const API_TOKENS: ReadonlyArray<ApiTokenRowItem> = [
  {
    id: "tok-site",
    name: "Website booking widget",
    maskedValue: "tq_live_••••••••••••8f3a",
    scopes: ["bookings:write", "customer:read"],
    lastUsed: "2 min ago",
    createdBy: "Daniel Carmody",
    expiresAt: "No expiry",
  },
  {
    id: "tok-zapier",
    name: "Zapier — lead capture",
    maskedValue: "tq_live_••••••••••••a91c",
    scopes: ["leads:write", "read"],
    lastUsed: "1 hr ago",
    createdBy: "Jess Hartley",
    expiresAt: "1 Sep 2026",
  },
  {
    id: "tok-reports",
    name: "Monthly owner report export",
    maskedValue: "tq_live_••••••••••••2d70",
    scopes: ["reports:read", "admin"],
    lastUsed: "29 May 2026",
    createdBy: "Daniel Carmody",
    expiresAt: "1 Jan 2027",
  },
]

/** Destructive workspace actions, gated behind a typed confirmation phrase. */
export interface DangerAction {
  id: string
  title: string
  description: string
  confirmationPhrase: string
  actionLabel: string
  tone: DangerActionTone
  icon: DangerActionIcon
  consequences: ReadonlyArray<string>
  helperText?: string
}

export const DANGER_ACTIONS: ReadonlyArray<DangerAction> = [
  {
    id: "export",
    title: "Export workspace data",
    description:
      "Download every customer, quote, invoice and job photo for Oak Flats Muffler Men as a portable archive.",
    confirmationPhrase: "EXPORT",
    actionLabel: "Generate export",
    tone: "warning",
    icon: "download",
    consequences: [
      "Includes customer contact details and vehicle history.",
      "Archive link expires after 24 hours.",
    ],
    helperText: "We'll email the download link to the owner address.",
  },
  {
    id: "transfer",
    title: "Transfer workspace ownership",
    description:
      "Hand the Oak Flats Muffler Men workspace to another team member. You'll drop to admin access.",
    confirmationPhrase: "TRANSFER",
    actionLabel: "Transfer ownership",
    tone: "warning",
    icon: "users",
    consequences: [
      "Billing and plan control move to the new owner.",
      "You keep admin access unless removed.",
    ],
  },
  {
    id: "delete",
    title: "Delete this workspace",
    description:
      "Permanently remove Oak Flats Muffler Men, all bays, team seats, quotes and job records. This cannot be undone.",
    confirmationPhrase: "DELETE OAK FLATS",
    actionLabel: "Delete workspace",
    tone: "critical",
    icon: "trash",
    consequences: [
      "All customer and job data is erased after 30 days.",
      "Active integrations and API tokens are revoked immediately.",
      "Team members lose access right away.",
    ],
    helperText: "Cancel your plan first if you only want to stop billing.",
  },
]

/** Settings nav rail — grouped personal / workspace / platform / danger. */
export const SETTINGS_NAV: ReadonlyArray<SettingsSidebarItem> = [
  {
    id: "profile",
    href: "#profile",
    label: "Profile & plan",
    description: "Identity, plan, usage",
    icon: User,
    group: "personal",
  },
  {
    id: "notifications",
    href: "#notifications",
    label: "Notifications",
    description: "Channels & cadence",
    icon: Bell,
    group: "personal",
  },
  {
    id: "workspace",
    href: "#workspace",
    label: "Workspace",
    description: "Name, region, slug",
    icon: Building2,
    group: "workspace",
  },
  {
    id: "team",
    href: "#team",
    label: "Team & roles",
    description: "Members & invites",
    icon: Users,
    group: "workspace",
  },
  {
    id: "integrations",
    href: "#integrations",
    label: "Integrations",
    description: "Connected services",
    icon: Plug,
    group: "workspace",
  },
  {
    id: "billing",
    href: "#profile",
    label: "Billing & usage",
    description: "Plan, quotas, invoices",
    icon: CreditCard,
    group: "workspace",
  },
  {
    id: "api-tokens",
    href: "#api-tokens",
    label: "API tokens",
    description: "Programmatic access",
    icon: KeyRound,
    group: "platform",
  },
  {
    id: "danger-zone",
    href: "#danger-zone",
    label: "Danger zone",
    description: "Destructive actions",
    icon: ShieldAlert,
    group: "danger",
  },
]
