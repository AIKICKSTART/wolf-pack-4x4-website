/**
 * Shared types for the Mufflermen bay-display primitive family.
 *
 * Drives the large-format signage that runs in the customer waiting area
 * and on the workshop floor: visible from 5m, high-contrast, big numerics,
 * Anton-led kinetic display.
 *
 * Distinct from workshop-floor-live (the ops-monitor view); this family is
 * presentational-first and dark-canonical by design — signage in a dim
 * room with a brand-red accent rail.
 *
 * Pure type module — no runtime imports.
 */

import type { BayId } from "../roster/roster-types"

export type { BayId }

/** Status communicated by the BayStatusHero pulse. */
export type BayDisplayStatus =
  | "in-bay"
  | "diagnostic"
  | "dyno"
  | "ready"
  | "waiting"
  | "clear"

/** Severity of a safety-message rotation card. */
export type SafetyTone = "info" | "caution" | "danger"

/** Local fuel grade we ticker. */
export type FuelGrade = "U91" | "U95" | "U98" | "Diesel" | "E10"

/** Direction of a queue rail entry vs. now. */
export type QueuePosition = "next" | "soon" | "later"

/** Tide phase for Lake Illawarra. */
export type TidePhase = "rising" | "falling" | "slack"

/** Wind direction quadrant. */
export type WindDirection =
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW"

/** A QR call-to-action campaign. */
export type QrCampaign = "book" | "review" | "follow" | "rewards"

export const BAY_STATUS_LABEL: Readonly<Record<BayDisplayStatus, string>> = {
  "in-bay": "In bay",
  diagnostic: "Diagnostic",
  dyno: "On the dyno",
  ready: "Ready for pickup",
  waiting: "Booked in",
  clear: "Clear",
}

export const BAY_STATUS_TONE: Readonly<
  Record<BayDisplayStatus, "neutral" | "teal" | "amber" | "green" | "red">
> = {
  "in-bay": "amber",
  diagnostic: "teal",
  dyno: "red",
  ready: "green",
  waiting: "neutral",
  clear: "neutral",
}

export const SAFETY_TONE_LABEL: Readonly<Record<SafetyTone, string>> = {
  info: "Notice",
  caution: "Caution",
  danger: "Danger",
}

export const QR_CAMPAIGN_LABEL: Readonly<Record<QrCampaign, string>> = {
  book: "Book online",
  review: "Leave a review",
  follow: "Follow us",
  rewards: "Join rewards",
}

/**
 * Format a callout name for the customer-call banner.
 * "Mr Davis" or "Ms Aleksic" — strict title prefix.
 */
export function formatCustomerCall(title: string, surname: string): string {
  const safeTitle = title.trim()
  const safeSurname = surname.trim()
  if (!safeTitle) return safeSurname
  return `${safeTitle} ${safeSurname}`
}

/**
 * Format minutes-waited like "12 min" or "1 h 24 min" for the queue rail.
 * Distance-readable: spaces between digits and units.
 */
export function formatWait(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes))
  if (safe < 60) return `${safe} min`
  const h = Math.floor(safe / 60)
  const m = safe % 60
  return m === 0 ? `${h} h` : `${h} h ${m.toString().padStart(2, "0")} min`
}

/**
 * Format AUD on the menu board — "$" leading, no superfluous zeros.
 * Larger fonts on signage prefer trimmed cents on whole-dollar prices.
 */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100
  if (Number.isInteger(rounded)) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(rounded)
  }
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded)
}

/**
 * Format AU fuel price per litre — "$1.96" not "$1.960".
 */
export function formatFuelPrice(perLitre: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(perLitre)
}

/**
 * Format a clock time string from a Date — HH:MM with no AM/PM, 24h.
 */
export function formatClock24(date: Date): string {
  const hh = date.getHours().toString().padStart(2, "0")
  const mm = date.getMinutes().toString().padStart(2, "0")
  return `${hh}:${mm}`
}

/**
 * Compress a seconds value into MM:SS for tickers.
 */
export function formatMmss(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds))
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}
