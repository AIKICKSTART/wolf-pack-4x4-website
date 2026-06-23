/** Shared types for the marketing campaign builder primitives. */

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "running"
  | "paused"
  | "completed"

export type ChannelKind =
  | "email"
  | "sms"
  | "push"
  | "inapp"
  | "banner"
  | "social"

export type GoalKind = "opens" | "clicks" | "conversions" | "revenue" | "bookings"

export type ScheduleKind = "now" | "specific" | "recurring" | "optimized"

export type SegmentOperator = "and" | "or"

export type SegmentRuleKind = "attribute" | "behavior" | "event" | "negation"

export type SpamScore = "clean" | "low" | "medium" | "high"

export type CampaignAccent = "red" | "amber" | "teal" | "green" | "neutral"

export interface CampaignChannelMeta {
  /** Channel identifier. */
  kind: ChannelKind
  /** Display label, e.g. "Email". */
  label: string
}

export interface ScheduleWindow {
  /** Human label, e.g. "Tue 6:30pm AEST". */
  label: string
  /** ISO timezone, e.g. "Australia/Sydney". */
  timezone: string
}

export interface CampaignTouchpoint {
  id: string
  name: string
  channel: ChannelKind
  delayLabel: string
  branchCondition?: string
}

export interface CreativeAsset {
  id: string
  title: string
  channel: ChannelKind
  thumbGlyph: string
  durationLabel?: string
}

export interface CampaignTemplateMeta {
  id: string
  title: string
  description: string
  channels: ReadonlyArray<ChannelKind>
  /** Treat as a personal/private clone vs the shared library. */
  isPrivate: boolean
  thumbGlyph: string
}

export const CHANNEL_LABEL: Record<ChannelKind, string> = {
  email: "Email",
  sms: "SMS",
  push: "Push",
  inapp: "In-app",
  banner: "Web banner",
  social: "Social",
}

export const STATUS_LABEL: Record<CampaignStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  running: "Running",
  paused: "Paused",
  completed: "Completed",
}

export const STATUS_TONE: Record<CampaignStatus, CampaignAccent> = {
  draft: "neutral",
  scheduled: "teal",
  running: "green",
  paused: "amber",
  completed: "neutral",
}

export const GOAL_LABEL: Record<GoalKind, string> = {
  opens: "Opens",
  clicks: "Clicks",
  conversions: "Conversions",
  revenue: "Revenue",
  bookings: "Bookings",
}
