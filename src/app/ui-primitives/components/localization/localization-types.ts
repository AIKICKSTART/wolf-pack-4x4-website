/** Shared types for the localization primitives. */

export type LocaleDirection = "ltr" | "rtl"

export type MeasurementSystem = "metric" | "imperial"

export interface LocaleSummary {
  /** BCP-47 tag, e.g. "en-AU", "ar-SA". */
  tag: string
  /** Native or English display name, e.g. "English (Australia)". */
  label: string
  /** Region or country shorthand for chips, e.g. "AU". */
  region: string
  /** Endonym, e.g. "العربية" — used by the language switcher. */
  endonym?: string
  direction?: LocaleDirection
}

export interface RegionSummary {
  /** Region key, e.g. "au", "eu-west". */
  id: string
  label: string
  timezone: string
  currency: string
  measurement: MeasurementSystem
}

export type TranslationStatus =
  | "translated"
  | "missing"
  | "stale"
  | "fuzzy"
  | "pending-review"
  | "approved"

export type ReviewerState = "unassigned" | "pending" | "approved" | "rejected"

export const RTL_LANGUAGE_TAGS: ReadonlySet<string> = new Set([
  "ar",
  "ar-SA",
  "ar-EG",
  "fa",
  "fa-IR",
  "he",
  "he-IL",
  "ur",
  "ur-PK",
])

export function isRtlTag(tag: string): boolean {
  if (RTL_LANGUAGE_TAGS.has(tag)) return true
  const base = tag.split("-")[0]
  return base ? RTL_LANGUAGE_TAGS.has(base) : false
}

export const STATUS_LABEL: Record<TranslationStatus, string> = {
  translated: "Translated",
  missing: "Missing",
  stale: "Stale",
  fuzzy: "Fuzzy",
  "pending-review": "In review",
  approved: "Approved",
}

export const REVIEWER_STATE_LABEL: Record<ReviewerState, string> = {
  unassigned: "Unassigned",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
}
