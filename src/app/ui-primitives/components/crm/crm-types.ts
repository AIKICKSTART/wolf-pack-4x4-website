// Shared CRM type definitions for primitives in this folder.
// Keep this file declaration-only — no runtime exports.

export type CustomerSegment =
  | "fleet"
  | "performance"
  | "diy"
  | "trade"
  | "retail"

export type DealStage =
  | "new"
  | "qualified"
  | "quoted"
  | "verbal"
  | "won"

export type TouchPointKind =
  | "call"
  | "email"
  | "sms"
  | "in-person"
  | "dm"
  | "quote-sent"
  | "invoice"
  | "payment"

export type ActivityVerb =
  | "called"
  | "emailed"
  | "met"
  | "noted"
  | "quoted"
  | "booked"

export type LeadScoreFactor =
  | "engagement"
  | "fit"
  | "intent"
  | "recency"

export type ContactChannel = "phone" | "email" | "sms" | "dm"

export type CustomerStatus = "active" | "lapsed" | "prospect" | "vip"

export type DealPeriod = "one-off" | "monthly" | "annual"

export interface CustomerRef {
  id: string
  name: string
  avatarSrc?: string
}

export const STAGE_PROBABILITY: Record<DealStage, number> = {
  new: 10,
  qualified: 25,
  quoted: 50,
  verbal: 80,
  won: 100,
}

export const STAGE_LABEL: Record<DealStage, string> = {
  new: "New",
  qualified: "Qualified",
  quoted: "Quoted",
  verbal: "Verbal yes",
  won: "Closed-won",
}

export const SEGMENT_LABEL: Record<CustomerSegment, string> = {
  fleet: "Fleet",
  performance: "Performance",
  diy: "DIY",
  trade: "Trade",
  retail: "Retail",
}

export const SEGMENT_GLYPH: Record<CustomerSegment, string> = {
  fleet: "⛟",
  performance: "▲",
  diy: "✺",
  trade: "⚒",
  retail: "◐",
}
