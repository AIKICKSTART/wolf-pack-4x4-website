/**
 * Shared types for the live-chat operator console primitives.
 *
 * These primitives sit between `inbox` (peer-to-peer messaging) and
 * `support` (asynchronous helpdesk tickets). Live chat is the synchronous
 * operator-driven channel: agents juggle multiple short-lived web-chat
 * sessions with anonymous visitors browsing the Mufflermen storefront.
 */

import type { SupportTone } from "../support/support-types"

/** Operator availability state for the status pill + presence panel. */
export type OperatorStatus =
  | "available"
  | "away"
  | "in-wrap"
  | "busy"
  | "offline"

/** Post-chat wrap-up outcome surfaced as a chip group. */
export type ChatOutcome =
  | "resolved"
  | "booked"
  | "quoted"
  | "escalated"
  | "abandoned"
  | "follow-up"

/** Sentiment buckets for the live sentiment meter. Score is -100..100. */
export type SentimentBucket = "frustrated" | "neutral" | "delighted"

/** Risk buckets for a queued live chat. */
export type QueueRisk = "fresh" | "watching" | "at-risk" | "breached"

/** Operator team labels for transfer targets. */
export type OperatorTeam =
  | "Front desk"
  | "Bay 2 fitting"
  | "Parts counter"
  | "Warranty"
  | "Manager"

/** Discriminated transfer target type. */
export type TransferTarget =
  | { kind: "operator"; operatorId: string }
  | { kind: "team"; team: OperatorTeam }

/** Sentiment score (clamped -100..100). */
export interface SentimentScore {
  value: number
  bucket: SentimentBucket
}

export const OPERATOR_STATUS_LABEL: Record<OperatorStatus, string> = {
  available: "Available",
  away: "Away",
  "in-wrap": "In wrap-up",
  busy: "Busy",
  offline: "Offline",
}

export const OPERATOR_STATUS_TONE: Record<OperatorStatus, SupportTone> = {
  available: "green",
  away: "amber",
  "in-wrap": "violet",
  busy: "red",
  offline: "neutral",
}

export const OPERATOR_STATUS_HINT: Record<OperatorStatus, string> = {
  available: "Accepting new chats",
  away: "Will auto-set busy on next route",
  "in-wrap": "Finishing notes for last chat",
  busy: "At capacity",
  offline: "Signed out of chat",
}

export const CHAT_OUTCOME_LABEL: Record<ChatOutcome, string> = {
  resolved: "Resolved",
  booked: "Booked in",
  quoted: "Quote sent",
  escalated: "Escalated",
  abandoned: "Abandoned",
  "follow-up": "Follow-up",
}

export const CHAT_OUTCOME_TONE: Record<ChatOutcome, SupportTone> = {
  resolved: "green",
  booked: "teal",
  quoted: "violet",
  escalated: "red",
  abandoned: "amber",
  "follow-up": "neutral",
}

export const QUEUE_RISK_LABEL: Record<QueueRisk, string> = {
  fresh: "Just landed",
  watching: "Watching",
  "at-risk": "At risk",
  breached: "Breached",
}

export const QUEUE_RISK_TONE: Record<QueueRisk, SupportTone> = {
  fresh: "teal",
  watching: "amber",
  "at-risk": "red",
  breached: "red",
}

export const SENTIMENT_BUCKET_LABEL: Record<SentimentBucket, string> = {
  frustrated: "Frustrated",
  neutral: "Neutral",
  delighted: "Delighted",
}

export const SENTIMENT_BUCKET_TONE: Record<SentimentBucket, SupportTone> = {
  frustrated: "red",
  neutral: "amber",
  delighted: "green",
}

/** Bucket a numeric sentiment score into a categorical bucket. */
export function bucketForSentiment(value: number): SentimentBucket {
  const clamped = Math.max(-100, Math.min(100, value))
  if (clamped <= -25) return "frustrated"
  if (clamped >= 25) return "delighted"
  return "neutral"
}

/** Bucket queue waiting minutes into a risk bucket. */
export function riskForWaitMinutes(minutes: number): QueueRisk {
  if (minutes <= 0) return "breached"
  if (minutes <= 1) return "fresh"
  if (minutes < 3) return "watching"
  return "at-risk"
}
