// Shared sales-leads type definitions for primitives in this folder.
// Top-of-funnel: capture, qualification, scoring — distinct from CRM (later
// stage), customer-success (post-win), reviews. Keep this file
// declaration-only — no runtime exports may be added.

export type LeadSource =
  | "website"
  | "phone"
  | "walk-in"
  | "referral"
  | "social"
  | "ad"

export type LeadSourceTone = "teal" | "amber" | "red" | "green"

export type LeadTemperature = "cold" | "warm" | "hot" | "blazing"

export type FunnelStageKey =
  | "lead"
  | "mql"
  | "sql"
  | "quote"
  | "won"

export type QualificationFramework = "bant" | "meddic"

export type QualificationStatus = "met" | "partial" | "missing" | "unknown"

export type CallOutcome =
  | "connected"
  | "voicemail"
  | "no-answer"
  | "callback"
  | "booked"
  | "not-interested"

export type SignalDirection = "positive" | "negative"

export type CadenceTouchKind = "call" | "email" | "sms" | "dm" | "visit"

export type CadenceStatus = "completed" | "due" | "upcoming" | "skipped"

export type EnrichmentProvider =
  | "clearbit"
  | "hunter"
  | "rev"
  | "manual"
  | "abn-lookup"

export type SlaTone = "fresh" | "due-soon" | "overdue" | "missed"

export type AssignmentDimension = "region" | "source" | "value" | "segment"

export type ImportStepKey = "upload" | "map" | "dedupe" | "preview" | "done"

export interface LeadRef {
  id: string
  name: string
  /** Vehicle or job context — kept short for chips and rows. */
  context?: string
}

export const LEAD_SOURCE_LABEL: Record<LeadSource, string> = {
  website: "Website",
  phone: "Phone",
  "walk-in": "Walk-in",
  referral: "Referral",
  social: "Social",
  ad: "Ad",
}

export const LEAD_SOURCE_TONE: Record<LeadSource, LeadSourceTone> = {
  website: "teal",
  phone: "amber",
  "walk-in": "green",
  referral: "green",
  social: "amber",
  ad: "red",
}

export const LEAD_SOURCE_GLYPH: Record<LeadSource, string> = {
  website: "◐",
  phone: "☎",
  "walk-in": "▭",
  referral: "✦",
  social: "◇",
  ad: "▲",
}

export const FUNNEL_LABEL: Record<FunnelStageKey, string> = {
  lead: "Lead",
  mql: "MQL",
  sql: "SQL",
  quote: "Quote",
  won: "Won",
}

export const QUALIFICATION_BANT: ReadonlyArray<{
  key: string
  label: string
}> = [
  { key: "budget", label: "Budget" },
  { key: "authority", label: "Authority" },
  { key: "need", label: "Need" },
  { key: "timing", label: "Timing" },
]

export const QUALIFICATION_MEDDIC: ReadonlyArray<{
  key: string
  label: string
}> = [
  { key: "metrics", label: "Metrics" },
  { key: "economic-buyer", label: "Economic buyer" },
  { key: "decision-criteria", label: "Decision criteria" },
  { key: "decision-process", label: "Decision process" },
  { key: "identify-pain", label: "Identify pain" },
  { key: "champion", label: "Champion" },
]

export function temperatureForScore(score: number): LeadTemperature {
  if (score < 30) return "cold"
  if (score < 60) return "warm"
  if (score < 85) return "hot"
  return "blazing"
}
