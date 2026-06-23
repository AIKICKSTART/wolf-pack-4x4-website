/**
 * Shared mock data for the admin-hub sub-routes + full-control composition.
 *
 * Oak Flats Mufflermen control-room vocabulary — Daniel (Admin), Tim
 * (Manager), Brad/Jase (Techs), Kyla (Apprentice), Mia (Content). KPIs
 * use AU dollars, NSW workshop calendar, Hermes agent chats, Manta
 * supplier shortage, and the INC-2026-05-28 incident already resolved.
 */

import type {
  ActivityRow,
  AdminRole,
  AdminTour,
  AdminUser,
  CommandPaletteEntry,
  CommandPaletteSuggestion,
  DailySummary,
  FeatureSpotlight,
  GlanceMetric,
  KpiTileData,
  PinnedWidget,
  QuickActionItem,
  SystemStatusEntry,
  TeamPulseMember,
  Tenant,
  WeeklyBriefing,
} from "../components/admin-hub"

/* ------------------------------------------------------------------ *
 * KPI tiles — the six headline numbers Daniel checks first
 * ------------------------------------------------------------------ */

export const KPI_REVENUE: KpiTileData = {
  id: "kpi-revenue",
  label: "Revenue · this week",
  value: "$42,180",
  delta: "+12.4%",
  deltaDirection: "up",
  period: "wtd",
  tone: "green",
  trend: [28140, 31220, 27880, 30210, 35400, 38800, 42180],
  caption: "Tracking 18% above 4-week average",
}

export const KPI_BOOKINGS: KpiTileData = {
  id: "kpi-bookings",
  label: "Bookings · this week",
  value: "28",
  delta: "+5",
  deltaDirection: "up",
  period: "wtd",
  tone: "teal",
  trend: [18, 22, 19, 24, 23, 27, 28],
  caption: "Hilux N80 SR5 demand up",
}

export const KPI_LEADS: KpiTileData = {
  id: "kpi-leads",
  label: "New leads",
  value: "64",
  delta: "+11.8%",
  deltaDirection: "up",
  period: "7d",
  tone: "amber",
  trend: [42, 46, 51, 48, 56, 60, 64],
  caption: "TikTok dyno reel driving inbound",
}

export const KPI_NPS: KpiTileData = {
  id: "kpi-nps",
  label: "NPS",
  value: "71",
  delta: "-2",
  deltaDirection: "down",
  period: "30d",
  tone: "green",
  trend: [68, 72, 74, 73, 73, 72, 71],
  caption: "Wait-time grumble on Bay 4",
}

export const KPI_UPTIME: KpiTileData = {
  id: "kpi-uptime",
  label: "Uptime",
  value: "99.94",
  unit: "%",
  delta: "+0.02",
  deltaDirection: "up",
  period: "30d",
  tone: "green",
  trend: [99.81, 99.82, 99.74, 99.9, 99.94, 99.95, 99.94],
  caption: "Post INC-2026-05-28 recovery clean",
}

export const KPI_HERMES_CHATS: KpiTileData = {
  id: "kpi-hermes",
  label: "Hermes chats",
  value: "312",
  delta: "+18%",
  deltaDirection: "up",
  period: "7d",
  tone: "violet",
  trend: [180, 198, 226, 244, 268, 290, 312],
  caption: "Auto-quote acceptance steady at 41%",
}

export const KPI_TILES: ReadonlyArray<KpiTileData> = [
  KPI_REVENUE,
  KPI_BOOKINGS,
  KPI_LEADS,
  KPI_NPS,
  KPI_UPTIME,
  KPI_HERMES_CHATS,
]

/* ------------------------------------------------------------------ *
 * Quick actions — 3x3 grid of pinned shortcuts
 * ------------------------------------------------------------------ */

export const QUICK_ACTIONS: ReadonlyArray<QuickActionItem> = [
  {
    id: "qa-new-quote",
    label: "New quote",
    description: "Build a fresh quote",
    shortcut: ["⌘", "Q"],
    tone: "amber",
    glyph: "$",
    pinned: true,
  },
  {
    id: "qa-book-bay",
    label: "Book a bay",
    description: "Reserve a bay + tech",
    shortcut: ["⌘", "B"],
    tone: "teal",
    glyph: "▦",
    pinned: true,
  },
  {
    id: "qa-schedule-post",
    label: "Schedule post",
    description: "Publish to socials",
    shortcut: ["⌘", "S"],
    tone: "violet",
    glyph: "✦",
    pinned: true,
  },
  {
    id: "qa-send-invoice",
    label: "Send invoice",
    description: "Stripe / Tyro / bank",
    shortcut: ["⌘", "I"],
    tone: "green",
    glyph: "₿",
    pinned: true,
  },
  {
    id: "qa-run-dyno",
    label: "Start dyno run",
    description: "Bay 6 telemetry capture",
    shortcut: ["⌘", "D"],
    tone: "red",
    glyph: "∿",
    pinned: true,
  },
  {
    id: "qa-order-parts",
    label: "Order parts",
    description: "Manta / Pacemaker",
    shortcut: ["⌘", "P"],
    tone: "amber",
    glyph: "◆",
    pinned: true,
  },
  {
    id: "qa-new-customer",
    label: "Add customer",
    description: "Walk-in or call-in",
    tone: "neutral",
    glyph: "○",
    pinned: false,
  },
  {
    id: "qa-run-report",
    label: "Run report",
    description: "Daily / weekly / month-end",
    tone: "teal",
    glyph: "▤",
    pinned: false,
    badge: "NEW",
  },
  {
    id: "qa-broadcast",
    label: "SMS broadcast",
    description: "Loyalty recall blast",
    tone: "amber",
    glyph: "”",
    pinned: false,
  },
]

/* ------------------------------------------------------------------ *
 * System status banner — operational / degraded / incident
 * ------------------------------------------------------------------ */

export const STATUS_OPERATIONAL: SystemStatusEntry = {
  id: "status-ok",
  label: "All systems operational",
  state: "operational",
  updatedLabel: "moments ago",
  statusPageHref: "/ui-primitives/status-page",
  note: "Bookings, payments, dyno telemetry and Hermes are healthy.",
  affectedServices: [],
}

export const STATUS_DEGRADED: SystemStatusEntry = {
  id: "status-degraded",
  label: "Hermes degraded — fall back to phone",
  state: "degraded",
  updatedLabel: "4 min ago",
  statusPageHref: "/ui-primitives/status-page",
  note: "Hermes p95 latency 2.8s. Auto-quote flow disabled — front-counter is handling inbound.",
  affectedServices: ["Hermes agent", "Auto-quote", "SMS broadcast"],
}

export const STATUS_INCIDENT: SystemStatusEntry = {
  id: "status-incident",
  label: "Active incident — payment terminals",
  state: "incident",
  updatedLabel: "now",
  statusPageHref: "/ui-primitives/status-page",
  note: "Tyro terminal in Bay 1 unreachable. Brad is on Square fallback. ETA 25 min.",
  affectedServices: ["Tyro Bay 1", "Receipt printer · counter"],
}

/* ------------------------------------------------------------------ *
 * Activity feed
 * ------------------------------------------------------------------ */

export const ACTIVITY_ROWS: ReadonlyArray<ActivityRow> = [
  {
    id: "act-1",
    actor: {
      id: "user-tim",
      name: "Tim Hollister",
      initials: "TH",
      role: "Manager",
    },
    verb: "approved",
    surface: "quote",
    targetLabel: "QTE-2847 · Hilux N80 SR5",
    detail: "$1,842.50 approved + sent to Mick Davis",
    timestamp: "2 min ago",
    isoTimestamp: "2026-05-29T09:34:00+10:00",
    tone: "green",
  },
  {
    id: "act-2",
    actor: {
      id: "user-brad",
      name: "Brad McKenzie",
      initials: "BM",
      role: "Senior fabricator",
    },
    verb: "completed",
    surface: "ticket",
    targetLabel: "WO-2845 · Manta cat-back",
    timestamp: "6 min ago",
    isoTimestamp: "2026-05-29T09:30:00+10:00",
    tone: "teal",
  },
  {
    id: "act-3",
    actor: {
      id: "user-mia",
      name: "Mia Tasev",
      initials: "MT",
      role: "Content",
    },
    verb: "scheduled",
    surface: "post",
    targetLabel: "Hilux dyno reel · TikTok + Reels",
    detail: "Goes live Thu 31 May · 17:00",
    timestamp: "11 min ago",
    isoTimestamp: "2026-05-29T09:25:00+10:00",
    tone: "violet",
  },
  {
    id: "act-4",
    actor: {
      id: "user-hermes",
      name: "Hermes agent",
      initials: "HX",
      role: "AI · auto-quote",
    },
    verb: "created",
    surface: "lead",
    targetLabel: "LD-1042 · Ranger Raptor twin-3\"",
    detail: "Auto-quote $4,820 — awaiting human review",
    timestamp: "18 min ago",
    isoTimestamp: "2026-05-29T09:18:00+10:00",
    tone: "amber",
  },
  {
    id: "act-5",
    actor: {
      id: "user-kyla",
      name: "Kyla Robins",
      initials: "KR",
      role: "Apprentice y2",
    },
    verb: "uploaded",
    surface: "vehicle",
    targetLabel: "BX1-8RT · pre-service photos",
    timestamp: "24 min ago",
    isoTimestamp: "2026-05-29T09:12:00+10:00",
    tone: "neutral",
  },
  {
    id: "act-6",
    actor: {
      id: "user-daniel",
      name: "Daniel Fleuren",
      initials: "DF",
      role: "Admin",
    },
    verb: "published",
    surface: "system",
    targetLabel: "Postmortem · INC-2026-05-28",
    detail: "Resolved at 22:14 — fix: rotated Tyro merchant cert",
    timestamp: "1 hr ago",
    isoTimestamp: "2026-05-29T08:36:00+10:00",
    tone: "teal",
  },
  {
    id: "act-7",
    actor: {
      id: "user-jase",
      name: "Jase Patel",
      initials: "JP",
      role: "Diagnostic tech",
    },
    verb: "rejected",
    surface: "invoice",
    targetLabel: "INV-2844 · upsell rejected",
    detail: "Customer declined DPF clean add-on",
    timestamp: "2 hr ago",
    isoTimestamp: "2026-05-29T07:32:00+10:00",
    tone: "red",
  },
]

/* ------------------------------------------------------------------ *
 * Command palette
 * ------------------------------------------------------------------ */

export const COMMAND_ENTRIES: ReadonlyArray<CommandPaletteEntry> = [
  {
    id: "cmd-jump-bookings",
    label: "Jump to bay scheduler",
    hint: "Workshop ops · bay-scheduler",
    shortcut: ["G", "B"],
    group: "navigate",
  },
  {
    id: "cmd-jump-customers",
    label: "Jump to customer 360",
    hint: "CRM · customer-360",
    shortcut: ["G", "C"],
    group: "navigate",
  },
  {
    id: "cmd-jump-inventory",
    label: "Jump to inventory",
    hint: "Parts catalogue + low-stock",
    shortcut: ["G", "I"],
    group: "navigate",
  },
  {
    id: "cmd-jump-status",
    label: "Jump to status page",
    hint: "Live service health",
    shortcut: ["G", "S"],
    group: "navigate",
  },
  {
    id: "cmd-create-quote",
    label: "Create new quote",
    hint: "Builds an empty quote",
    shortcut: ["⌘", "Q"],
    group: "create",
  },
  {
    id: "cmd-create-booking",
    label: "Book a bay",
    hint: "Reserve bay + technician",
    shortcut: ["⌘", "B"],
    group: "create",
  },
  {
    id: "cmd-create-post",
    label: "Schedule a post",
    hint: "Socials calendar",
    shortcut: ["⌘", "S"],
    group: "create",
  },
  {
    id: "cmd-report-revenue",
    label: "Open revenue report",
    hint: "Week / month / quarter",
    shortcut: ["⌘", "R"],
    group: "report",
  },
  {
    id: "cmd-report-nps",
    label: "Open NPS report",
    hint: "Last 30 days breakdown",
    group: "report",
  },
  {
    id: "cmd-team-roster",
    label: "Open team roster",
    hint: "Shifts + leave",
    group: "team",
  },
  {
    id: "cmd-team-invite",
    label: "Invite team member",
    hint: "Email invite + role select",
    group: "team",
  },
  {
    id: "cmd-settings-workspace",
    label: "Workspace settings",
    hint: "Branding, billing, integrations",
    shortcut: ["⌘", ","],
    group: "settings",
  },
  {
    id: "cmd-settings-billing",
    label: "Billing + plan",
    hint: "Subscription & invoices",
    group: "settings",
  },
]

export const COMMAND_RECENTS: ReadonlyArray<CommandPaletteEntry> = [
  COMMAND_ENTRIES[0],
  COMMAND_ENTRIES[4],
  COMMAND_ENTRIES[7],
]

export const COMMAND_SUGGESTIONS: ReadonlyArray<CommandPaletteSuggestion> = [
  {
    id: "sg-1",
    label: "Re-order Manta XForce 3\" cat-back x4",
    reason: "Stock at 1 unit. Hermes saw 3 inbound leads requesting it.",
    shortcut: ["⌘", "↩"],
  },
  {
    id: "sg-2",
    label: "SMS Bay-4 waiting customers",
    reason: "NPS dipped 2 points · 5 customers held past ETA today.",
  },
]

/* ------------------------------------------------------------------ *
 * Pinned widgets
 * ------------------------------------------------------------------ */

export const PINNED_WIDGETS: ReadonlyArray<PinnedWidget> = [
  { id: "pw-rev", kind: "kpi", title: "Revenue · WTD", order: 0, span: 1, tone: "green" },
  { id: "pw-acts", kind: "activity", title: "Recent activity", order: 1, span: 2, tone: "teal" },
  { id: "pw-pulse", kind: "team-pulse", title: "Team pulse", order: 2, span: 1, tone: "amber" },
  { id: "pw-summary", kind: "daily-summary", title: "Yesterday's recap", order: 3, span: 1, tone: "violet" },
]

/* ------------------------------------------------------------------ *
 * Roles + user + tenants
 * ------------------------------------------------------------------ */

export const ADMIN_ROLES: ReadonlyArray<AdminRole> = [
  {
    id: "admin",
    label: "Admin",
    description: "Full workspace control · billing, integrations, postmortems.",
    permissions: ["billing", "integrations", "postmortems", "all-data"],
    tone: "red",
  },
  {
    id: "manager",
    label: "Manager",
    description: "Run the floor — bookings, quotes, payments, team roster.",
    permissions: ["bookings", "quotes", "payments", "roster"],
    tone: "amber",
  },
  {
    id: "tech",
    label: "Technician",
    description: "Service tickets, parts pulls, inspections, dyno runs.",
    permissions: ["tickets", "parts", "inspections", "dyno"],
    tone: "teal",
  },
  {
    id: "apprentice",
    label: "Apprentice",
    description: "Assist on tickets, log work, upload vehicle photos.",
    permissions: ["tickets-view", "photos", "log"],
    tone: "green",
  },
  {
    id: "content",
    label: "Content",
    description: "Schedule socials, manage media library, draft customer comms.",
    permissions: ["socials", "media", "comms-draft"],
    tone: "violet",
  },
]

export const ADMIN_USER_DANIEL: AdminUser = {
  id: "user-daniel",
  name: "Daniel Fleuren",
  initials: "DF",
  email: "daniel@mufflermen.com.au",
  roleId: "admin",
}

export const ADMIN_USER_IMPERSONATING_TIM: AdminUser = {
  id: "user-tim",
  name: "Tim Hollister",
  initials: "TH",
  email: "tim@mufflermen.com.au",
  roleId: "manager",
  impersonating: true,
  impersonatorName: "Daniel",
}

export const ADMIN_USER_MIA: AdminUser = {
  id: "user-mia",
  name: "Mia Tasev",
  initials: "MT",
  email: "mia@mufflermen.com.au",
  roleId: "content",
}

export const TENANTS: ReadonlyArray<Tenant> = [
  {
    id: "tenant-ofm",
    name: "Oak Flats Mufflermen",
    domain: "mufflermen.com.au",
    badge: "OFM",
    tone: "red",
    primary: true,
  },
  {
    id: "tenant-i4wd",
    name: "Illawarra 4WD Co",
    domain: "illawarra4wd.com.au",
    badge: "I4",
    tone: "amber",
    primary: false,
  },
  {
    id: "tenant-pacemaker",
    name: "Pacemaker Distributor",
    domain: "pacemaker-supplier.au",
    badge: "PM",
    tone: "teal",
    primary: false,
  },
]

/* ------------------------------------------------------------------ *
 * Weekly briefing
 * ------------------------------------------------------------------ */

export const WEEKLY_BRIEFING: WeeklyBriefing = {
  weekLabel: "Week of Mon 25 May 2026",
  preparedBy: "Hermes agent",
  preparedAt: "Mon 25 May · 06:30",
  items: [
    {
      id: "br-h-1",
      kind: "highlight",
      title: "Revenue tracking 18% above 4-week avg",
      detail: "Cat-back installs leading — 6 of 28 bookings.",
      ownerInitials: "DF",
    },
    {
      id: "br-h-2",
      kind: "highlight",
      title: "Hermes auto-quote acceptance held at 41%",
      detail: "Best week so far for AI-led inbound conversion.",
      ownerInitials: "DF",
    },
    {
      id: "br-l-1",
      kind: "lowlight",
      title: "Manta cat-back shortage",
      detail: "Down to 1 unit. Pacemaker ETA 4 days.",
      ownerInitials: "TH",
    },
    {
      id: "br-l-2",
      kind: "lowlight",
      title: "Dyno bookings backlog · 14 days out",
      detail: "Consider Sat 14:00 slot or sub-let to Wollongong Dyno.",
      ownerInitials: "TH",
    },
    {
      id: "br-a-1",
      kind: "action",
      title: "Publish INC-2026-05-28 postmortem",
      detail: "Tyro merchant cert rotation — closed off, doc owner Daniel.",
      ownerInitials: "DF",
      dueLabel: "Wed 27 May",
    },
    {
      id: "br-a-2",
      kind: "action",
      title: "Re-order 4× Manta XForce 3\" cat-back",
      detail: "Pacemaker order book closes Tue 16:00.",
      ownerInitials: "TH",
      dueLabel: "Tue 26 May",
    },
    {
      id: "br-a-3",
      kind: "action",
      title: "Brief Mia on dyno reel cut",
      detail: "Hero clip for Ranger Raptor scheduled Thu 31 May.",
      ownerInitials: "MT",
      dueLabel: "Wed 27 May",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * Team pulse
 * ------------------------------------------------------------------ */

export const TEAM_PULSE: ReadonlyArray<TeamPulseMember> = [
  {
    id: "tp-daniel",
    name: "Daniel Fleuren",
    initials: "DF",
    roleLabel: "Admin",
    presence: "online",
    statusLabel: "Front counter",
    tone: "red",
  },
  {
    id: "tp-tim",
    name: "Tim Hollister",
    initials: "TH",
    roleLabel: "Manager",
    presence: "busy",
    statusLabel: "On call · supplier",
    tone: "amber",
  },
  {
    id: "tp-brad",
    name: "Brad McKenzie",
    initials: "BM",
    roleLabel: "Senior fab",
    presence: "online",
    statusLabel: "Bay 3 · WO-2847",
    tone: "teal",
  },
  {
    id: "tp-jase",
    name: "Jase Patel",
    initials: "JP",
    roleLabel: "Diagnostic",
    presence: "online",
    statusLabel: "Bay 1 · diag",
    tone: "teal",
  },
  {
    id: "tp-kyla",
    name: "Kyla Robins",
    initials: "KR",
    roleLabel: "Apprentice",
    presence: "online",
    statusLabel: "Photo intake",
    tone: "green",
  },
  {
    id: "tp-mia",
    name: "Mia Tasev",
    initials: "MT",
    roleLabel: "Content",
    presence: "online",
    statusLabel: "Editing reel",
    tone: "violet",
  },
  {
    id: "tp-rhys",
    name: "Rhys Cooper",
    initials: "RC",
    roleLabel: "Tech · trainee",
    presence: "away",
    statusLabel: "Back at 12:30",
    tone: "amber",
  },
  {
    id: "tp-nick",
    name: "Nick Bekic",
    initials: "NB",
    roleLabel: "Tech",
    presence: "away",
    statusLabel: "Lunch",
    tone: "amber",
  },
  {
    id: "tp-shane",
    name: "Shane Tasev",
    initials: "ST",
    roleLabel: "Welder",
    presence: "sick",
    statusLabel: "Cert in",
    tone: "red",
  },
]

/* ------------------------------------------------------------------ *
 * Quick-glance metrics — single-line strip
 * ------------------------------------------------------------------ */

export const GLANCE_METRICS: ReadonlyArray<GlanceMetric> = [
  {
    id: "gm-rev",
    label: "Revenue",
    value: "$42,180",
    delta: "+12.4%",
    direction: "up",
    tone: "green",
  },
  {
    id: "gm-book",
    label: "Bookings",
    value: "28",
    delta: "+5",
    direction: "up",
    tone: "teal",
  },
  {
    id: "gm-leads",
    label: "Leads",
    value: "64",
    delta: "+11.8%",
    direction: "up",
    tone: "amber",
  },
  {
    id: "gm-nps",
    label: "NPS",
    value: "71",
    delta: "-2",
    direction: "down",
    tone: "amber",
  },
  {
    id: "gm-uptime",
    label: "Uptime",
    value: "99.94",
    unit: "%",
    direction: "flat",
    tone: "green",
  },
  {
    id: "gm-chats",
    label: "Hermes chats",
    value: "312",
    delta: "+18%",
    direction: "up",
    tone: "violet",
  },
]

/* ------------------------------------------------------------------ *
 * Tour
 * ------------------------------------------------------------------ */

export const ADMIN_TOUR: AdminTour = {
  id: "tour-onboarding",
  title: "Get the cockpit set up",
  description: "Pin your KPIs, set roles, connect Hermes, and publish your first weekly briefing.",
  progress: 60,
  totalSteps: 5,
  completedSteps: 3,
  etaLabel: "~4 min left",
  steps: [
    { id: "s-1", label: "Pick your KPI tiles", done: true },
    { id: "s-2", label: "Invite the workshop crew", done: true },
    { id: "s-3", label: "Connect Tyro + Stripe", done: true },
    { id: "s-4", label: "Enable Hermes auto-quote", done: false },
    { id: "s-5", label: "Schedule the Monday briefing", done: false },
  ],
}

export const ADMIN_TOUR_FRESH: AdminTour = {
  id: "tour-fresh",
  title: "Welcome to the cockpit",
  description: "Set up the workshop cockpit in 5 short steps.",
  progress: 0,
  totalSteps: 5,
  completedSteps: 0,
  etaLabel: "~10 min total",
  steps: [
    { id: "s-1", label: "Pick your KPI tiles", done: false },
    { id: "s-2", label: "Invite the workshop crew", done: false },
    { id: "s-3", label: "Connect Tyro + Stripe", done: false },
    { id: "s-4", label: "Enable Hermes auto-quote", done: false },
    { id: "s-5", label: "Schedule the Monday briefing", done: false },
  ],
}

export const ADMIN_TOUR_DONE: AdminTour = {
  id: "tour-done",
  title: "Cockpit fully wired",
  description: "Replay the walkthrough any time to refresh the crew.",
  progress: 100,
  totalSteps: 5,
  completedSteps: 5,
  etaLabel: "All done",
  steps: [
    { id: "s-1", label: "Pick your KPI tiles", done: true },
    { id: "s-2", label: "Invite the workshop crew", done: true },
    { id: "s-3", label: "Connect Tyro + Stripe", done: true },
    { id: "s-4", label: "Enable Hermes auto-quote", done: true },
    { id: "s-5", label: "Schedule the Monday briefing", done: true },
  ],
}

/* ------------------------------------------------------------------ *
 * Feature spotlight
 * ------------------------------------------------------------------ */

export const FEATURE_SPOTLIGHT: FeatureSpotlight = {
  id: "spot-hermes-quotes",
  badge: "New in v2.6",
  title: "Hermes auto-quote · v2.6",
  description:
    "Hermes can now draft a quote from a customer SMS — parts, labour, GST, the works. Review and one-tap send.",
  bullets: [
    "Auto-pulls supplier prices from Manta + Pacemaker live feeds",
    "Highlights confidence + flags missing data",
    "Hand-off to human review with a single keystroke",
  ],
  ctaLabel: "Try the auto-quote demo",
  dismissLabel: "Dismiss",
  releasedAt: "Mon 25 May 2026",
}

export const FEATURE_SPOTLIGHT_BRIEFINGS: FeatureSpotlight = {
  id: "spot-briefings",
  badge: "Beta",
  title: "Monday briefings · beta",
  description:
    "Highlights, watch-outs and action items — drafted by Hermes overnight, ready to read with your first coffee.",
  bullets: [
    "Auto-generated from last week's tickets, NPS and inventory",
    "Editable inline — share to the whole crew",
    "Carries action items into the team roster",
  ],
  ctaLabel: "Read this week's briefing",
  dismissLabel: "Maybe later",
  releasedAt: "Fri 22 May 2026",
}

/* ------------------------------------------------------------------ *
 * Daily summary
 * ------------------------------------------------------------------ */

export const DAILY_SUMMARY: DailySummary = {
  dateLabel: "Thursday 28 May",
  preparedAtLabel: "Fri 06:12 · auto",
  highlights: [
    {
      id: "h-1",
      label: "Day revenue",
      value: "$8,920",
      detail: "+22% vs prior Thursday",
      tone: "green",
    },
    {
      id: "h-2",
      label: "Tickets closed",
      value: "9",
      detail: "WO-2840 → WO-2848",
      tone: "teal",
    },
    {
      id: "h-3",
      label: "Auto-quotes accepted",
      value: "5",
      detail: "Out of 12 Hermes-generated quotes",
      tone: "violet",
    },
  ],
  warnings: [
    {
      id: "w-1",
      label: "INC-2026-05-28",
      value: "1",
      unit: "open → resolved 22:14",
      detail: "Tyro Bay 1 unreachable for 38 min",
      tone: "amber",
    },
    {
      id: "w-2",
      label: "Bay 4 over-runs",
      value: "3",
      detail: "Avg 47 min late",
      tone: "red",
    },
  ],
  outlook:
    "Bay 6 fully booked from 09:00. Two pink-slip walk-ins expected. Manta delivery confirmed 14:30 — Brad to receive.",
}
