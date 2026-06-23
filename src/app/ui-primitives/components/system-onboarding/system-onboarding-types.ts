/**
 * Shared types for the system-onboarding primitive family.
 *
 * Models the post-signup tenant activation flow for a Mufflermen Pro
 * customer — a brand-new workshop ("Illawarra Tyres & Brakes" — Albion
 * Park, NSW) signs up, configures their account, workshop profile,
 * integrations, team, brand kit, and ships their first deploy. Hermes
 * the mentor agent nudges them along the way. Visual reference only —
 * no real backend wired.
 */

import type { StatusTone } from "../status-page/status-types"

/* ------------------------------------------------------------------ *
 * Step state — shared across the family
 * ------------------------------------------------------------------ */

export type OnboardingStepState = "todo" | "active" | "done" | "skipped"

export const STEP_STATE_LABEL: Record<OnboardingStepState, string> = {
  todo: "To do",
  active: "Active",
  done: "Done",
  skipped: "Skipped",
}

export const STEP_STATE_TONE: Record<OnboardingStepState, StatusTone> = {
  todo: "neutral",
  active: "teal",
  done: "green",
  skipped: "amber",
}

/* ------------------------------------------------------------------ *
 * Welcome hero
 * ------------------------------------------------------------------ */

export interface WelcomeHeroOwner {
  /** Owner / primary admin name eg "Sarah Wallace". */
  name: string
  /** Owner job title eg "Workshop Manager". */
  role: string
  /** Initials used for the avatar fallback. */
  initials: string
}

export interface WelcomeHeroStat {
  label: string
  /** Big numeric / short string value eg "5" / "6 days" / "$0 setup". */
  value: string
}

export interface WelcomeHeroCta {
  label: string
  href?: string
  intent: "primary" | "ghost"
}

/* ------------------------------------------------------------------ *
 * Account setup
 * ------------------------------------------------------------------ */

export type AccountRole = "owner" | "manager" | "accounts" | "viewer"

export const ACCOUNT_ROLE_LABEL: Record<AccountRole, string> = {
  owner: "Owner",
  manager: "Workshop manager",
  accounts: "Accounts",
  viewer: "Read-only",
}

export interface AccountSetupValues {
  fullName: string
  email: string
  role: AccountRole
  timezone: string
  /** Whether the user wants product updates from Mufflermen. */
  marketingOptIn: boolean
}

export interface AccountSetupFieldError {
  /** Field id matching keys in AccountSetupValues. */
  field: keyof AccountSetupValues
  message: string
}

/* ------------------------------------------------------------------ *
 * Workshop config
 * ------------------------------------------------------------------ */

export interface WorkshopHours {
  /** 3-letter day code eg "Mon". */
  day: string
  /** Opening time eg "07:30". */
  open: string
  /** Closing time eg "17:30". */
  close: string
  /** Whether the workshop is closed this day. */
  closed: boolean
}

export interface WorkshopService {
  id: string
  label: string
  /** Short glyph used for the chip prefix. */
  glyph: string
}

export interface WorkshopConfigValues {
  tradingName: string
  abn: string
  addressLine: string
  suburb: string
  state: string
  postcode: string
  bayCount: number
  hours: ReadonlyArray<WorkshopHours>
  services: ReadonlyArray<string>
}

/* ------------------------------------------------------------------ *
 * Integration wizard
 * ------------------------------------------------------------------ */

export type IntegrationStepStatus =
  | "not-connected"
  | "connecting"
  | "connected"
  | "needs-attention"

export const INTEGRATION_STATUS_LABEL: Record<IntegrationStepStatus, string> = {
  "not-connected": "Not connected",
  connecting: "Connecting…",
  connected: "Connected",
  "needs-attention": "Action needed",
}

export const INTEGRATION_STATUS_TONE: Record<IntegrationStepStatus, StatusTone> = {
  "not-connected": "neutral",
  connecting: "teal",
  connected: "green",
  "needs-attention": "amber",
}

export type IntegrationVendor =
  | "stripe"
  | "twilio"
  | "shopify"
  | "myob"
  | "xero"
  | "google"

export interface IntegrationStepRow {
  id: string
  vendor: IntegrationVendor
  label: string
  /** Short pitch eg "Take card payments at the front desk." */
  description: string
  status: IntegrationStepStatus
  /** Optional copy under the status chip eg "AU · AUD". */
  region?: string
  /** Required for the connect CTA. */
  connectHref?: string
  /** Whether this integration is required to launch. */
  required: boolean
}

/* ------------------------------------------------------------------ *
 * Team invite
 * ------------------------------------------------------------------ */

export type TeamInviteStatus = "draft" | "queued" | "sent" | "accepted" | "failed"

export const TEAM_INVITE_STATUS_LABEL: Record<TeamInviteStatus, string> = {
  draft: "Draft",
  queued: "Queued",
  sent: "Sent",
  accepted: "Accepted",
  failed: "Failed",
}

export const TEAM_INVITE_STATUS_TONE: Record<TeamInviteStatus, StatusTone> = {
  draft: "neutral",
  queued: "teal",
  sent: "teal",
  accepted: "green",
  failed: "red",
}

export type TeamRole = "owner" | "manager" | "mechanic" | "front-desk" | "apprentice"

export const TEAM_ROLE_LABEL: Record<TeamRole, string> = {
  owner: "Owner",
  manager: "Workshop manager",
  mechanic: "Mechanic",
  "front-desk": "Front desk",
  apprentice: "Apprentice",
}

export interface TeamInviteRow {
  id: string
  fullName: string
  email: string
  role: TeamRole
  status: TeamInviteStatus
}

/* ------------------------------------------------------------------ *
 * Brand setup
 * ------------------------------------------------------------------ */

export interface BrandPaletteSwatch {
  id: string
  /** Display label eg "Workshop red". */
  label: string
  /** Hex string eg "#e62028". */
  hex: string
  /** Whether this palette entry is the primary accent. */
  accent: boolean
}

export interface BrandTypographyPairing {
  id: string
  /** Display name eg "Industrial + Geometric". */
  label: string
  /** Heading font name eg "Anton". */
  headingFont: string
  /** Body font name eg "Inter". */
  bodyFont: string
  /** Optional descriptor eg "Bold + neutral". */
  mood: string
}

export interface BrandLogoState {
  /** Whether a logo has been uploaded. */
  uploaded: boolean
  /** Optional filename eg "illawarra-tyres-brakes-logo.svg". */
  fileName?: string
  /** Optional kilobyte size eg "42 KB". */
  size?: string
  /** Optional dimensions eg "320 × 320". */
  dimensions?: string
}

/* ------------------------------------------------------------------ *
 * First-deploy
 * ------------------------------------------------------------------ */

export type DeployChecklistState = "todo" | "ready" | "running" | "deployed"

export const DEPLOY_CHECKLIST_TONE: Record<DeployChecklistState, StatusTone> = {
  todo: "neutral",
  ready: "teal",
  running: "amber",
  deployed: "green",
}

export interface DeployChecklistItem {
  id: string
  label: string
  state: DeployChecklistState
}

/* ------------------------------------------------------------------ *
 * Migration import
 * ------------------------------------------------------------------ */

export type MigrationSource = "csv" | "shopify" | "square" | "myob" | "xero"

export const MIGRATION_SOURCE_LABEL: Record<MigrationSource, string> = {
  csv: "CSV upload",
  shopify: "Shopify",
  square: "Square",
  myob: "MYOB",
  xero: "Xero",
}

export type MigrationStatus = "idle" | "uploading" | "mapping" | "running" | "done" | "failed"

export const MIGRATION_STATUS_LABEL: Record<MigrationStatus, string> = {
  idle: "Idle",
  uploading: "Uploading…",
  mapping: "Mapping columns",
  running: "Importing",
  done: "Imported",
  failed: "Failed",
}

export const MIGRATION_STATUS_TONE: Record<MigrationStatus, StatusTone> = {
  idle: "neutral",
  uploading: "teal",
  mapping: "teal",
  running: "amber",
  done: "green",
  failed: "red",
}

export interface MigrationImportCounts {
  /** Number of customer records to import. */
  customers: number
  /** Number of vehicles to import. */
  vehicles: number
  /** Number of historical invoices to import. */
  invoices: number
  /** Number of parts records to import. */
  parts: number
}

/* ------------------------------------------------------------------ *
 * Template picker
 * ------------------------------------------------------------------ */

export type TemplateKind = "workshop" | "parts-retailer" | "fleet-manager"

export const TEMPLATE_KIND_LABEL: Record<TemplateKind, string> = {
  workshop: "Workshop",
  "parts-retailer": "Parts retailer",
  "fleet-manager": "Fleet manager",
}

export interface TemplatePickItem {
  id: string
  kind: TemplateKind
  /** Short title eg "Suburban workshop". */
  title: string
  /** Long pitch copy. */
  description: string
  /** ASCII glyph used as the thumbnail mark. */
  glyph: string
  /** Highlight feature list (max 4 entries). */
  features: ReadonlyArray<string>
  /** Whether this template is recommended for the active tenant. */
  recommended: boolean
}

/* ------------------------------------------------------------------ *
 * Checklist progress
 * ------------------------------------------------------------------ */

export interface ChecklistProgressItem {
  id: string
  label: string
  state: OnboardingStepState
  /** Short duration chip eg "2 min". */
  duration?: string
}

/* ------------------------------------------------------------------ *
 * Mentor chat — Hermes
 * ------------------------------------------------------------------ */

export type MentorRole = "mentor" | "user"

export interface MentorChatMessage {
  id: string
  role: MentorRole
  /** Human-friendly time stamp eg "just now" / "2m ago". */
  timestamp: string
  /** Plain text body — no Markdown. */
  text: string
}

export interface MentorSuggestion {
  id: string
  label: string
  /** Short copy explaining what this nudge actually does. */
  hint: string
}

/* ------------------------------------------------------------------ *
 * Success state
 * ------------------------------------------------------------------ */

export interface SuccessNextStep {
  id: string
  label: string
  description: string
  href?: string
  glyph: string
}

export interface SuccessHeroStat {
  label: string
  value: string
}

/* ------------------------------------------------------------------ *
 * Skip confirmation
 * ------------------------------------------------------------------ */

export interface SkipConsequence {
  id: string
  label: string
  /** Optional plain text explaining the consequence. */
  detail?: string
  /** Whether this consequence is severe enough to highlight. */
  severe?: boolean
}

/* ------------------------------------------------------------------ *
 * Step rail
 * ------------------------------------------------------------------ */

export interface OnboardingStepRailItem {
  id: string
  /** Display label eg "Workshop". */
  label: string
  /** Optional descriptor eg "5 bays". */
  caption?: string
  state: OnboardingStepState
  /** Optional short duration eg "3 min". */
  duration?: string
  href?: string
}
