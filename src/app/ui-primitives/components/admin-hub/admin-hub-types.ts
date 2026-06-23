/**
 * Shared types for the admin-hub primitive family.
 *
 * The control-room surface a workshop manager lands on after login:
 * KPI tiles, quick actions, system status, activity feed, command
 * palette, pinned widgets, role / tenant switchers, weekly briefing,
 * team pulse, daily summary, tour launcher, feature spotlight. Pure
 * type module — no runtime imports.
 */

export type AdminTone = "red" | "amber" | "teal" | "green" | "violet" | "neutral"

/* ------------------------------------------------------------------ *
 * KPI tile
 * ------------------------------------------------------------------ */

export type KpiDelta = "up" | "down" | "flat"

export type KpiPeriod = "today" | "wtd" | "mtd" | "qtd" | "ytd" | "7d" | "30d" | "90d"

export interface KpiTileData {
  id: string
  label: string
  /** Pre-formatted value, e.g. "$42,180" or "99.94". */
  value: string
  /** Optional unit suffix, e.g. "%", "AUD". */
  unit?: string
  /** Pre-formatted delta string, e.g. "+12.4%". */
  delta?: string
  deltaDirection?: KpiDelta
  period: KpiPeriod
  tone: AdminTone
  /** Sparkline values for the trend chart. */
  trend: ReadonlyArray<number>
  /** Optional caption line below the value. */
  caption?: string
}

export const KPI_PERIOD_LABEL: Readonly<Record<KpiPeriod, string>> = {
  today: "Today",
  wtd: "Week to date",
  mtd: "Month to date",
  qtd: "Quarter to date",
  ytd: "Year to date",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
}

/* ------------------------------------------------------------------ *
 * Quick action grid
 * ------------------------------------------------------------------ */

export interface QuickActionItem {
  id: string
  label: string
  description?: string
  shortcut?: ReadonlyArray<string>
  tone: AdminTone
  glyph: string
  pinned: boolean
  /** Optional hint badge, e.g. "NEW" or "BETA". */
  badge?: string
}

/* ------------------------------------------------------------------ *
 * System status banner
 * ------------------------------------------------------------------ */

export type SystemHealth = "operational" | "degraded" | "incident" | "maintenance"

export interface SystemStatusEntry {
  id: string
  label: string
  /** Pre-formatted timestamp, e.g. "moments ago". */
  updatedLabel: string
  state: SystemHealth
  /** Linked status-page path. */
  statusPageHref: string
  /** Short note when degraded or incident. */
  note?: string
  /** Affected service shortlist. */
  affectedServices?: ReadonlyArray<string>
}

export const SYSTEM_HEALTH_LABEL: Readonly<Record<SystemHealth, string>> = {
  operational: "All systems operational",
  degraded: "Degraded performance",
  incident: "Active incident",
  maintenance: "Scheduled maintenance",
}

export const SYSTEM_HEALTH_TONE: Readonly<Record<SystemHealth, AdminTone>> = {
  operational: "green",
  degraded: "amber",
  incident: "red",
  maintenance: "teal",
}

/* ------------------------------------------------------------------ *
 * Activity feed row
 * ------------------------------------------------------------------ */

export type ActivityVerb =
  | "created"
  | "updated"
  | "deleted"
  | "approved"
  | "rejected"
  | "published"
  | "scheduled"
  | "sent"
  | "logged"
  | "completed"
  | "commented"
  | "uploaded"

export type ActivitySurface =
  | "ticket"
  | "quote"
  | "invoice"
  | "booking"
  | "post"
  | "lead"
  | "vehicle"
  | "customer"
  | "team"
  | "system"

export interface ActivityRow {
  id: string
  actor: {
    id: string
    name: string
    initials: string
    role: string
  }
  verb: ActivityVerb
  surface: ActivitySurface
  targetLabel: string
  /** Optional detail line below the action. */
  detail?: string
  /** Pre-formatted timestamp like "2 min ago". */
  timestamp: string
  /** ISO timestamp for sort + screen-reader. */
  isoTimestamp: string
  tone: AdminTone
}

export const ACTIVITY_VERB_LABEL: Readonly<Record<ActivityVerb, string>> = {
  created: "created",
  updated: "updated",
  deleted: "deleted",
  approved: "approved",
  rejected: "rejected",
  published: "published",
  scheduled: "scheduled",
  sent: "sent",
  logged: "logged",
  completed: "completed",
  commented: "commented on",
  uploaded: "uploaded",
}

export const ACTIVITY_SURFACE_LABEL: Readonly<Record<ActivitySurface, string>> = {
  ticket: "ticket",
  quote: "quote",
  invoice: "invoice",
  booking: "booking",
  post: "post",
  lead: "lead",
  vehicle: "vehicle",
  customer: "customer",
  team: "team",
  system: "system",
}

/* ------------------------------------------------------------------ *
 * Command palette
 * ------------------------------------------------------------------ */

export interface CommandPaletteEntry {
  id: string
  label: string
  hint?: string
  shortcut?: ReadonlyArray<string>
  group: "navigate" | "create" | "report" | "team" | "settings"
}

export interface CommandPaletteSuggestion {
  id: string
  label: string
  reason: string
  shortcut?: ReadonlyArray<string>
}

export const COMMAND_GROUP_LABEL: Readonly<Record<CommandPaletteEntry["group"], string>> = {
  navigate: "Jump to",
  create: "Create",
  report: "Reports",
  team: "Team",
  settings: "Settings",
}

/* ------------------------------------------------------------------ *
 * Pinned widgets board
 * ------------------------------------------------------------------ */

export type PinnedWidgetKind =
  | "kpi"
  | "activity"
  | "team-pulse"
  | "weekly-briefing"
  | "daily-summary"
  | "spotlight"

export interface PinnedWidget {
  id: string
  kind: PinnedWidgetKind
  title: string
  /** Order index, 0-based. */
  order: number
  /** Optional 1- or 2- column span. */
  span: 1 | 2
  tone: AdminTone
}

/* ------------------------------------------------------------------ *
 * Role + tenant switchers
 * ------------------------------------------------------------------ */

export type RoleId = "admin" | "manager" | "tech" | "apprentice" | "content"

export interface AdminRole {
  id: RoleId
  label: string
  description: string
  permissions: ReadonlyArray<string>
  tone: AdminTone
}

export const ROLE_LABEL: Readonly<Record<RoleId, string>> = {
  admin: "Admin",
  manager: "Manager",
  tech: "Technician",
  apprentice: "Apprentice",
  content: "Content",
}

export interface AdminUser {
  id: string
  name: string
  initials: string
  email: string
  roleId: RoleId
  /** True when the current session is impersonating another user. */
  impersonating?: boolean
  /** Optional impersonator identity. */
  impersonatorName?: string
}

export interface Tenant {
  id: string
  name: string
  domain: string
  /** Short workspace badge text, e.g. "OFM". */
  badge: string
  tone: AdminTone
  /** Primary tenant cannot be left. */
  primary: boolean
}

/* ------------------------------------------------------------------ *
 * Weekly briefing
 * ------------------------------------------------------------------ */

export type BriefingItemKind = "highlight" | "lowlight" | "action"

export interface BriefingItem {
  id: string
  kind: BriefingItemKind
  title: string
  detail?: string
  /** Optional owner initials. */
  ownerInitials?: string
  /** Optional ISO due date for action items. */
  dueLabel?: string
}

export interface WeeklyBriefing {
  weekLabel: string
  preparedBy: string
  preparedAt: string
  items: ReadonlyArray<BriefingItem>
}

export const BRIEFING_KIND_LABEL: Readonly<Record<BriefingItemKind, string>> = {
  highlight: "Highlight",
  lowlight: "Watch-out",
  action: "Action item",
}

export const BRIEFING_KIND_TONE: Readonly<Record<BriefingItemKind, AdminTone>> = {
  highlight: "green",
  lowlight: "amber",
  action: "teal",
}

/* ------------------------------------------------------------------ *
 * Team pulse strip
 * ------------------------------------------------------------------ */

export type TeamPresence = "online" | "away" | "busy" | "offline" | "sick"

export interface TeamPulseMember {
  id: string
  name: string
  initials: string
  roleLabel: string
  presence: TeamPresence
  /** Pre-formatted last-seen or status, e.g. "Bay 3" or "back at 12:30". */
  statusLabel: string
  tone: AdminTone
}

export const PRESENCE_LABEL: Readonly<Record<TeamPresence, string>> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  sick: "Sick",
}

export const PRESENCE_TONE: Readonly<Record<TeamPresence, AdminTone>> = {
  online: "green",
  away: "amber",
  busy: "violet",
  offline: "neutral",
  sick: "red",
}

/* ------------------------------------------------------------------ *
 * Quick-glance metric strip
 * ------------------------------------------------------------------ */

export interface GlanceMetric {
  id: string
  label: string
  value: string
  unit?: string
  delta?: string
  direction?: KpiDelta
  tone: AdminTone
}

/* ------------------------------------------------------------------ *
 * System tour launcher
 * ------------------------------------------------------------------ */

export interface TourStep {
  id: string
  label: string
  done: boolean
}

export interface AdminTour {
  id: string
  title: string
  description: string
  /** 0–100 progress percent. */
  progress: number
  totalSteps: number
  completedSteps: number
  steps: ReadonlyArray<TourStep>
  /** Estimated time-to-complete. */
  etaLabel: string
}

/* ------------------------------------------------------------------ *
 * Feature spotlight
 * ------------------------------------------------------------------ */

export interface FeatureSpotlight {
  id: string
  badge: string
  title: string
  description: string
  /** Bullet points highlighting what's new. */
  bullets: ReadonlyArray<string>
  ctaLabel: string
  dismissLabel: string
  releasedAt: string
}

/* ------------------------------------------------------------------ *
 * Daily summary
 * ------------------------------------------------------------------ */

export interface DailySummaryItem {
  id: string
  label: string
  value: string
  unit?: string
  /** Optional sub-detail. */
  detail?: string
  tone: AdminTone
}

export interface DailySummary {
  dateLabel: string
  preparedAtLabel: string
  highlights: ReadonlyArray<DailySummaryItem>
  warnings: ReadonlyArray<DailySummaryItem>
  /** Optional outlook line. */
  outlook?: string
}

/* ------------------------------------------------------------------ *
 * Tone helpers
 * ------------------------------------------------------------------ */

export function adminToneToChip(tone: AdminTone): "red" | "amber" | "teal" | "green" | "neutral" {
  if (tone === "violet") return "neutral"
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") return tone
  return "neutral"
}

export function adminToneToRadial(tone: AdminTone): "red" | "amber" | "teal" | "green" | "neutral" {
  return adminToneToChip(tone)
}

export function adminToneToSpark(tone: AdminTone): "red" | "amber" | "teal" | "green" {
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") return tone
  return "teal"
}

export function adminToneToVar(tone: AdminTone): string {
  switch (tone) {
    case "red":
      return "var(--primitive-red)"
    case "amber":
      return "var(--primitive-amber)"
    case "teal":
      return "var(--primitive-teal)"
    case "green":
      return "var(--primitive-green)"
    case "violet":
      return "color-mix(in oklab, var(--primitive-teal) 58%, var(--primitive-red))"
    case "neutral":
    default:
      return "var(--primitive-body)"
  }
}

export function adminToneToAvatar(tone: AdminTone): "red" | "amber" | "teal" | "green" | "obsidian" {
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") return tone
  return "obsidian"
}

export function presenceToAvatarStatus(presence: TeamPresence): "online" | "away" | "busy" | "offline" {
  if (presence === "sick") return "offline"
  return presence
}
