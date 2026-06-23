/* Shared mock data for the system-onboarding sub-routes + full onboarding flow.
 *
 * Real tenant context — Illawarra Tyres & Brakes signing up for Mufflermen
 * Pro from their 5-bay Albion Park workshop. Sarah Wallace (owner /
 * workshop manager) drives the activation. AU-based — AUD on Stripe AU,
 * +61 SMS on Twilio AU, AEST timezone, migrating from MYOB.
 *
 * Visual reference only — no real backend wired.
 */

import type {
  AccountSetupValues,
  BrandLogoState,
  BrandPaletteSwatch,
  BrandTypographyPairing,
  ChecklistProgressItem,
  DeployChecklistItem,
  IntegrationStepRow,
  MentorChatMessage,
  MentorSuggestion,
  MigrationImportCounts,
  OnboardingStepRailItem,
  SkipConsequence,
  SuccessHeroStat,
  SuccessNextStep,
  TeamInviteRow,
  TemplatePickItem,
  WelcomeHeroCta,
  WelcomeHeroOwner,
  WelcomeHeroStat,
  WorkshopConfigValues,
  WorkshopHours,
  WorkshopService,
} from "../components/system-onboarding"

/* ------------------------------------------------------------------ *
 * Welcome hero
 * ------------------------------------------------------------------ */

export const WELCOME_OWNER: WelcomeHeroOwner = {
  name: "Sarah Wallace",
  role: "Owner · Workshop manager",
  initials: "SW",
}

export const WELCOME_STATS: ReadonlyArray<WelcomeHeroStat> = [
  { label: "Bays", value: "5" },
  { label: "Trial", value: "30 days" },
  { label: "Setup cost", value: "$0" },
]

export const WELCOME_CTAS: ReadonlyArray<WelcomeHeroCta> = [
  {
    label: "Begin setup",
    intent: "primary",
    href: "/ui-primitives/system-onboarding/account-setup-form",
  },
  {
    label: "Watch the 90-second tour",
    intent: "ghost",
    href: "/ui-primitives/system-onboarding/mentor-chat-card",
  },
]

/* ------------------------------------------------------------------ *
 * Account setup
 * ------------------------------------------------------------------ */

export const ACCOUNT_VALUES_FRESH: AccountSetupValues = {
  fullName: "Sarah Wallace",
  email: "sarah@illawarra-tb.com.au",
  role: "owner",
  timezone: "Australia/Sydney",
  marketingOptIn: true,
}

export const ACCOUNT_VALUES_BLANK: AccountSetupValues = {
  fullName: "",
  email: "",
  role: "owner",
  timezone: "Australia/Sydney",
  marketingOptIn: false,
}

export const ACCOUNT_TIMEZONES: ReadonlyArray<string> = [
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Adelaide",
  "Australia/Perth",
  "Pacific/Auckland",
]

/* ------------------------------------------------------------------ *
 * Workshop config
 * ------------------------------------------------------------------ */

const WEEK_HOURS: ReadonlyArray<WorkshopHours> = [
  { day: "Mon", open: "07:30", close: "17:30", closed: false },
  { day: "Tue", open: "07:30", close: "17:30", closed: false },
  { day: "Wed", open: "07:30", close: "17:30", closed: false },
  { day: "Thu", open: "07:30", close: "17:30", closed: false },
  { day: "Fri", open: "07:30", close: "17:30", closed: false },
  { day: "Sat", open: "08:00", close: "13:00", closed: false },
  { day: "Sun", open: "00:00", close: "00:00", closed: true },
]

export const WORKSHOP_SERVICE_CATALOGUE: ReadonlyArray<WorkshopService> = [
  { id: "tyres", label: "Tyres", glyph: "◯" },
  { id: "alignment", label: "Wheel alignment", glyph: "⟷" },
  { id: "brakes", label: "Brakes", glyph: "▣" },
  { id: "exhaust", label: "Exhaust + mufflers", glyph: "≡" },
  { id: "logbook", label: "Logbook service", glyph: "☰" },
  { id: "rego", label: "Pink/blue slips", glyph: "✓" },
  { id: "diagnostics", label: "Diagnostics", glyph: "λ" },
  { id: "tuning", label: "Tuning + dyno", glyph: "⌒" },
]

export const WORKSHOP_VALUES_DRAFT: WorkshopConfigValues = {
  tradingName: "Illawarra Tyres & Brakes",
  abn: "82 134 902 411",
  addressLine: "188 Tongarra Road",
  suburb: "Albion Park",
  state: "NSW",
  postcode: "2527",
  bayCount: 5,
  hours: WEEK_HOURS,
  services: ["tyres", "alignment", "brakes", "exhaust", "rego"],
}

export const WORKSHOP_VALUES_BLANK: WorkshopConfigValues = {
  tradingName: "",
  abn: "",
  addressLine: "",
  suburb: "",
  state: "NSW",
  postcode: "",
  bayCount: 1,
  hours: WEEK_HOURS,
  services: [],
}

/* ------------------------------------------------------------------ *
 * Integration wizard rows
 * ------------------------------------------------------------------ */

export const INTEGRATION_ROW_NOT_CONNECTED: IntegrationStepRow = {
  id: "stripe",
  vendor: "stripe",
  label: "Stripe payments",
  description:
    "Take card + Apple Pay at the front desk and queue customer invoices for autopayment.",
  status: "not-connected",
  region: "AU · AUD · Stripe AU",
  connectHref: "#connect-stripe",
  required: true,
}

export const INTEGRATION_ROW_CONNECTING: IntegrationStepRow = {
  id: "twilio",
  vendor: "twilio",
  label: "Twilio SMS",
  description:
    "Service-due reminders and confirmations on a +61 sender ID — quiet hours respected.",
  status: "connecting",
  region: "AU · Twilio AU",
  required: true,
}

export const INTEGRATION_ROW_CONNECTED: IntegrationStepRow = {
  id: "shopify",
  vendor: "shopify",
  label: "Shopify storefront",
  description:
    "Sync parts inventory + online order intake from your Shopify store into the workshop scheduler.",
  status: "connected",
  region: "AU · AUD",
  required: false,
}

export const INTEGRATION_ROW_NEEDS_ATTENTION: IntegrationStepRow = {
  id: "myob",
  vendor: "myob",
  label: "MYOB AccountRight",
  description:
    "Sync invoices, customers and chart of accounts into MYOB for end-of-month roll-up.",
  status: "needs-attention",
  region: "AU · AccountRight Plus",
  required: false,
}

export const INTEGRATION_FULL_LIST: ReadonlyArray<IntegrationStepRow> = [
  INTEGRATION_ROW_NOT_CONNECTED,
  INTEGRATION_ROW_CONNECTING,
  INTEGRATION_ROW_CONNECTED,
  INTEGRATION_ROW_NEEDS_ATTENTION,
]

/* ------------------------------------------------------------------ *
 * Team invite
 * ------------------------------------------------------------------ */

export const TEAM_INVITES_FRESH: ReadonlyArray<TeamInviteRow> = [
  {
    id: "t-001",
    fullName: "Sarah Wallace",
    email: "sarah@illawarra-tb.com.au",
    role: "owner",
    status: "accepted",
  },
  {
    id: "t-002",
    fullName: "Jake Hannan",
    email: "jake@illawarra-tb.com.au",
    role: "mechanic",
    status: "draft",
  },
  {
    id: "t-003",
    fullName: "Dean Pereira",
    email: "dean@illawarra-tb.com.au",
    role: "mechanic",
    status: "draft",
  },
  {
    id: "t-004",
    fullName: "Mia Ngata",
    email: "mia@illawarra-tb.com.au",
    role: "front-desk",
    status: "draft",
  },
]

export const TEAM_INVITES_SENT: ReadonlyArray<TeamInviteRow> = [
  TEAM_INVITES_FRESH[0],
  { ...TEAM_INVITES_FRESH[1], status: "sent" },
  { ...TEAM_INVITES_FRESH[2], status: "accepted" },
  { ...TEAM_INVITES_FRESH[3], status: "sent" },
]

export const TEAM_INVITES_MIXED: ReadonlyArray<TeamInviteRow> = [
  TEAM_INVITES_FRESH[0],
  { ...TEAM_INVITES_FRESH[1], status: "accepted" },
  { ...TEAM_INVITES_FRESH[2], status: "failed" },
  { ...TEAM_INVITES_FRESH[3], status: "queued" },
]

/* ------------------------------------------------------------------ *
 * Brand setup
 * ------------------------------------------------------------------ */

export const BRAND_PALETTE: ReadonlyArray<BrandPaletteSwatch> = [
  { id: "p-red", label: "Workshop red", hex: "#e62028", accent: true },
  { id: "p-amber", label: "Caution amber", hex: "#ffc14f", accent: false },
  { id: "p-charcoal", label: "Tool-room charcoal", hex: "#11131a", accent: false },
  { id: "p-fog", label: "Concrete fog", hex: "#dddee3", accent: false },
  { id: "p-spark", label: "Spark teal", hex: "#40bcff", accent: false },
]

export const BRAND_TYPOGRAPHIES: ReadonlyArray<BrandTypographyPairing> = [
  {
    id: "t-anton-inter",
    label: "Industrial + Geometric",
    headingFont: "var(--ff-anton)",
    bodyFont: "var(--ff-geist)",
    mood: "Bold + neutral · Mufflermen default",
  },
  {
    id: "t-serif-sans",
    label: "Editorial + Sans",
    headingFont: "Georgia, serif",
    bodyFont: "var(--ff-geist)",
    mood: "Considered + trustworthy",
  },
  {
    id: "t-mono-mono",
    label: "Workshop + Workshop",
    headingFont: "var(--ff-primitive-mono)",
    bodyFont: "var(--ff-primitive-mono)",
    mood: "Engineered + literal",
  },
]

export const BRAND_LOGO_EMPTY: BrandLogoState = { uploaded: false }

export const BRAND_LOGO_UPLOADED: BrandLogoState = {
  uploaded: true,
  fileName: "illawarra-tyres-brakes-logo.svg",
  size: "42 KB",
  dimensions: "512 × 512",
}

/* ------------------------------------------------------------------ *
 * First-deploy
 * ------------------------------------------------------------------ */

export const DEPLOY_CHECKLIST_PENDING: ReadonlyArray<DeployChecklistItem> = [
  { id: "d-1", label: "Workshop profile", state: "ready" },
  { id: "d-2", label: "Stripe payments", state: "ready" },
  { id: "d-3", label: "Twilio SMS sender", state: "todo" },
  { id: "d-4", label: "First team invite sent", state: "todo" },
  { id: "d-5", label: "Brand assets", state: "ready" },
]

export const DEPLOY_CHECKLIST_READY: ReadonlyArray<DeployChecklistItem> = [
  { id: "d-1", label: "Workshop profile", state: "ready" },
  { id: "d-2", label: "Stripe payments", state: "ready" },
  { id: "d-3", label: "Twilio SMS sender", state: "ready" },
  { id: "d-4", label: "First team invite sent", state: "ready" },
  { id: "d-5", label: "Brand assets", state: "ready" },
]

export const DEPLOY_CHECKLIST_LIVE: ReadonlyArray<DeployChecklistItem> = [
  { id: "d-1", label: "Workshop profile", state: "deployed" },
  { id: "d-2", label: "Stripe payments", state: "deployed" },
  { id: "d-3", label: "Twilio SMS sender", state: "deployed" },
  { id: "d-4", label: "First team invite sent", state: "deployed" },
  { id: "d-5", label: "Brand assets", state: "deployed" },
]

/* ------------------------------------------------------------------ *
 * Migration import
 * ------------------------------------------------------------------ */

export const MIGRATION_COUNTS: MigrationImportCounts = {
  customers: 1842,
  vehicles: 2104,
  invoices: 5612,
  parts: 318,
}

/* ------------------------------------------------------------------ *
 * Template picker
 * ------------------------------------------------------------------ */

export const TEMPLATES: ReadonlyArray<TemplatePickItem> = [
  {
    id: "tpl-workshop",
    kind: "workshop",
    title: "Suburban workshop",
    description:
      "Best for: a single suburban workshop with 3–10 bays. Books jobs against bay availability and tracks ADR-compliant exhaust work.",
    glyph: "M",
    features: [
      "Bay scheduler with mechanic load",
      "ADR exhaust + emissions paperwork",
      "Quote + invoice in one flow",
      "Service reminders via Twilio AU",
    ],
    recommended: true,
  },
  {
    id: "tpl-parts",
    kind: "parts-retailer",
    title: "Parts retailer",
    description:
      "Best for: a parts catalogue you want to sell online and into trade. Tight Shopify sync and customer-specific pricing.",
    glyph: "▦",
    features: [
      "Trade + retail pricing tiers",
      "Shopify storefront + checkout",
      "Supplier inbound + reorder rules",
      "Fitment search against ADR rego data",
    ],
    recommended: false,
  },
  {
    id: "tpl-fleet",
    kind: "fleet-manager",
    title: "Fleet manager",
    description:
      "Best for: managing a 30+ vehicle fleet — pool cars, utes, trailers. Pre-trip checks, scheduled maintenance, contract pricing.",
    glyph: "▣▣",
    features: [
      "Pre-trip checks against ADR list",
      "Fleet vehicle log",
      "Contracted hourly rate per fleet",
      "Driver licence + rego expiry alerts",
    ],
    recommended: false,
  },
]

/* ------------------------------------------------------------------ *
 * Checklist progress
 * ------------------------------------------------------------------ */

export const CHECKLIST_PARTIAL: ReadonlyArray<ChecklistProgressItem> = [
  { id: "c-account", label: "Account", state: "done", duration: "2 min" },
  { id: "c-workshop", label: "Workshop", state: "done", duration: "3 min" },
  { id: "c-integrations", label: "Integrations", state: "active", duration: "4 min" },
  { id: "c-team", label: "Team", state: "todo", duration: "2 min" },
  { id: "c-brand", label: "Brand", state: "todo", duration: "3 min" },
  { id: "c-deploy", label: "Go live", state: "todo", duration: "1 min" },
]

export const CHECKLIST_COMPLETE: ReadonlyArray<ChecklistProgressItem> = [
  { id: "c-account", label: "Account", state: "done", duration: "2 min" },
  { id: "c-workshop", label: "Workshop", state: "done", duration: "3 min" },
  { id: "c-integrations", label: "Integrations", state: "done", duration: "4 min" },
  { id: "c-team", label: "Team", state: "done", duration: "2 min" },
  { id: "c-brand", label: "Brand", state: "done", duration: "3 min" },
  { id: "c-deploy", label: "Go live", state: "done", duration: "1 min" },
]

export const CHECKLIST_EMPTY: ReadonlyArray<ChecklistProgressItem> = [
  { id: "c-account", label: "Account", state: "active", duration: "2 min" },
  { id: "c-workshop", label: "Workshop", state: "todo", duration: "3 min" },
  { id: "c-integrations", label: "Integrations", state: "todo", duration: "4 min" },
  { id: "c-team", label: "Team", state: "todo", duration: "2 min" },
  { id: "c-brand", label: "Brand", state: "todo", duration: "3 min" },
  { id: "c-deploy", label: "Go live", state: "todo", duration: "1 min" },
]

/* ------------------------------------------------------------------ *
 * Mentor chat — Hermes
 * ------------------------------------------------------------------ */

export const MENTOR_TRANSCRIPT_WELCOME: ReadonlyArray<MentorChatMessage> = [
  {
    id: "m-1",
    role: "mentor",
    timestamp: "just now",
    text:
      "G'day Sarah — I'm Hermes, your onboarding mentor. I'll nudge you through the 6 steps. Want to start by confirming your workshop address?",
  },
]

export const MENTOR_TRANSCRIPT_MID: ReadonlyArray<MentorChatMessage> = [
  ...MENTOR_TRANSCRIPT_WELCOME,
  {
    id: "m-2",
    role: "user",
    timestamp: "2m ago",
    text: "Yeah let's start with the workshop. We're at 188 Tongarra Road Albion Park.",
  },
  {
    id: "m-3",
    role: "mentor",
    timestamp: "1m ago",
    text:
      "Locked it in — ADR Region NSW-Illawarra. Next up: Stripe AU so you can take payments. Shall I queue the connect step?",
  },
]

export const MENTOR_TRANSCRIPT_LONG: ReadonlyArray<MentorChatMessage> = [
  ...MENTOR_TRANSCRIPT_MID,
  {
    id: "m-4",
    role: "user",
    timestamp: "30s ago",
    text: "Yes, and after that send invites to Jake, Dean and Mia.",
  },
  {
    id: "m-5",
    role: "mentor",
    timestamp: "just now",
    text:
      "On it. I've drafted the three invites — mechanic role for Jake + Dean, front-desk for Mia. You can review them on the team step.",
  },
]

export const MENTOR_SUGGESTIONS: ReadonlyArray<MentorSuggestion> = [
  {
    id: "s-stripe",
    label: "Connect Stripe AU",
    hint: "Take card payments at the front desk",
  },
  {
    id: "s-team",
    label: "Invite the crew",
    hint: "3 invites ready to send",
  },
  {
    id: "s-brand",
    label: "Upload your logo",
    hint: "SVG or PNG · 512 × 512",
  },
  {
    id: "s-deploy",
    label: "Launch the workshop",
    hint: "All checklists are ready",
  },
]

/* ------------------------------------------------------------------ *
 * Success state
 * ------------------------------------------------------------------ */

export const SUCCESS_STATS: ReadonlyArray<SuccessHeroStat> = [
  { label: "Setup time", value: "14 min" },
  { label: "Steps completed", value: "6 / 6" },
  { label: "Crew invited", value: "3" },
]

export const SUCCESS_NEXT_STEPS: ReadonlyArray<SuccessNextStep> = [
  {
    id: "ns-book",
    label: "Book your first job",
    description: "Capture rego, vehicle, ADR notes and a scheduled bay.",
    href: "/ui-primitives/workshop-ops",
    glyph: "🛠",
  },
  {
    id: "ns-parts",
    label: "Import parts catalogue",
    description: "Pull SKUs from MYOB or upload a CSV of your stock.",
    href: "/ui-primitives/inventory",
    glyph: "▦",
  },
  {
    id: "ns-call",
    label: "Forward your phone line",
    description: "Route the workshop number to Hermes when nobody's at the desk.",
    href: "/ui-primitives/hermes",
    glyph: "☎",
  },
]

/* ------------------------------------------------------------------ *
 * Skip confirmation
 * ------------------------------------------------------------------ */

export const SKIP_CONSEQUENCES_WORKSHOP: ReadonlyArray<SkipConsequence> = [
  {
    id: "sc-1",
    label: "Quotes will use placeholder ABN + address.",
    detail: "Your customers will see a Mufflermen-default ABN until you finish this step.",
    severe: false,
  },
  {
    id: "sc-2",
    label: "Bay scheduling will be disabled.",
    detail: "Without bay count we can't book jobs against capacity.",
    severe: true,
  },
  {
    id: "sc-3",
    label: "ADR compliance paperwork won't auto-fill.",
    severe: false,
  },
]

export const SKIP_CONSEQUENCES_TEAM: ReadonlyArray<SkipConsequence> = [
  {
    id: "sc-1",
    label: "Only you will have access for now.",
    detail: "Everyone else will need an invite before they can log in.",
    severe: false,
  },
  {
    id: "sc-2",
    label: "Job assignment is restricted to you.",
    severe: false,
  },
]

export const SKIP_CONSEQUENCES_BRAND: ReadonlyArray<SkipConsequence> = [
  {
    id: "sc-1",
    label: "Customer-facing surfaces will use Mufflermen Red.",
    detail: "You can swap this out anytime — but quotes go out branded as the default Mufflermen workshop.",
    severe: false,
  },
  {
    id: "sc-2",
    label: "Your logo will not appear on quotes or invoices.",
    severe: false,
  },
]

/* ------------------------------------------------------------------ *
 * Step rail
 * ------------------------------------------------------------------ */

export const STEP_RAIL_FRESH: ReadonlyArray<OnboardingStepRailItem> = [
  {
    id: "r-account",
    label: "Account",
    caption: "Owner profile + timezone",
    state: "active",
    duration: "2 min",
    href: "/ui-primitives/system-onboarding/account-setup-form",
  },
  {
    id: "r-workshop",
    label: "Workshop",
    caption: "ABN, hours, bays",
    state: "todo",
    duration: "3 min",
    href: "/ui-primitives/system-onboarding/workshop-config-card",
  },
  {
    id: "r-integrations",
    label: "Integrations",
    caption: "Stripe AU + Twilio AU",
    state: "todo",
    duration: "4 min",
    href: "/ui-primitives/system-onboarding/integration-wizard-row",
  },
  {
    id: "r-team",
    label: "Team",
    caption: "Mechanics + front desk",
    state: "todo",
    duration: "2 min",
    href: "/ui-primitives/system-onboarding/team-invite-panel",
  },
  {
    id: "r-brand",
    label: "Brand",
    caption: "Logo, palette, type",
    state: "todo",
    duration: "3 min",
    href: "/ui-primitives/system-onboarding/brand-setup-card",
  },
  {
    id: "r-deploy",
    label: "Go live",
    caption: "Launch + handoff",
    state: "todo",
    duration: "1 min",
    href: "/ui-primitives/system-onboarding/first-deploy-tile",
  },
]

export const STEP_RAIL_MID: ReadonlyArray<OnboardingStepRailItem> = [
  { ...STEP_RAIL_FRESH[0], state: "done" },
  { ...STEP_RAIL_FRESH[1], state: "done" },
  { ...STEP_RAIL_FRESH[2], state: "active" },
  { ...STEP_RAIL_FRESH[3], state: "todo" },
  { ...STEP_RAIL_FRESH[4], state: "todo" },
  { ...STEP_RAIL_FRESH[5], state: "todo" },
]

export const STEP_RAIL_DONE: ReadonlyArray<OnboardingStepRailItem> = [
  { ...STEP_RAIL_FRESH[0], state: "done" },
  { ...STEP_RAIL_FRESH[1], state: "done" },
  { ...STEP_RAIL_FRESH[2], state: "done" },
  { ...STEP_RAIL_FRESH[3], state: "skipped" },
  { ...STEP_RAIL_FRESH[4], state: "done" },
  { ...STEP_RAIL_FRESH[5], state: "done" },
]
