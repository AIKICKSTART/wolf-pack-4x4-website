/**
 * Shared types for the customer reviews + ratings primitive family.
 * Lives in its own module so child components can import without
 * pulling in any React surface.
 */

import type { ChipTone } from "../primitives/chip"

/** Star rating 1-5 with half-star increments. */
export type StarRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

/** Sentiment tier derived from review text + score. */
export type ReviewSentiment = "positive" | "mixed" | "negative"

/** Moderation lifecycle for a submitted review. */
export type ReviewStatus = "pending" | "approved" | "rejected" | "needs-edit"

/** Allowed reasons for flagging a review. */
export type FlagReason = "spam" | "off-topic" | "hate" | "personal-info"

export const REVIEW_SENTIMENT_LABEL: Record<ReviewSentiment, string> = {
  positive: "Positive",
  mixed: "Mixed",
  negative: "Negative",
}

export const REVIEW_SENTIMENT_TONE: Record<ReviewSentiment, ChipTone> = {
  positive: "green",
  mixed: "amber",
  negative: "red",
}

export const REVIEW_STATUS_LABEL: Record<ReviewStatus, string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  "needs-edit": "Needs edit",
}

export const REVIEW_STATUS_TONE: Record<ReviewStatus, ChipTone> = {
  pending: "amber",
  approved: "green",
  rejected: "red",
  "needs-edit": "teal",
}

export const FLAG_REASON_LABEL: Record<FlagReason, string> = {
  spam: "Spam",
  "off-topic": "Off-topic",
  hate: "Hateful or harassing",
  "personal-info": "Reveals personal info",
}

/** Clamp a number to a valid half-step rating. */
export function clampRating(value: number): StarRating {
  const stepped = Math.round(value * 2) / 2
  if (stepped <= 0) return 0
  if (stepped >= 5) return 5
  return stepped as StarRating
}
