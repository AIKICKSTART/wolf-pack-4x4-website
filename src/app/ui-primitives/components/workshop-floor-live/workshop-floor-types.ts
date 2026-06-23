/**
 * Shared types for the Mufflermen workshop-floor LIVE monitor primitives.
 *
 * Real-time view of the Oak Flats floor: bay states, technician locations,
 * dyno readouts, parts-pull requests, customer waiting area, live revenue
 * pulse. Distinct from workshop-scenes (build-time scene compositions),
 * roster (HR / shifts), and inventory (parts catalogue + stock).
 *
 * Pure type module — no runtime imports.
 */

import type { BayId } from "../roster/roster-types"

export type { BayId }

/** Live state of an individual bay on the floor right now. */
export type BayLiveState =
  | "idle"
  | "in-progress"
  | "diagnostic"
  | "dyno-running"
  | "handover"
  | "blocked"

/** Stage of a customer job moving through the workshop. */
export type JobStage =
  | "drop-off"
  | "diagnostic"
  | "build"
  | "test"
  | "handover"

/** Status of a per-stage checkpoint on a live job. */
export type CheckpointState = "done" | "active" | "pending" | "skipped"

/** Live status of a parts-pull request from a bay. */
export type PartsPullStatus = "queued" | "picking" | "delivered" | "back-order"

/** Where the technician currently is. */
export type TechLocation =
  | "bay-1"
  | "bay-2"
  | "bay-3"
  | "bay-4"
  | "parts"
  | "dyno"
  | "office"
  | "off-floor"

/** Live floor-plan element types — used by floor-plan SVG renderer. */
export type FloorElement = "bay" | "door" | "hoist" | "parts-area" | "dyno"

export const BAY_LIVE_STATE_LABEL: Readonly<Record<BayLiveState, string>> = {
  idle: "Idle",
  "in-progress": "In progress",
  diagnostic: "Diagnostic",
  "dyno-running": "Dyno running",
  handover: "Handover",
  blocked: "Blocked",
}

export const BAY_LIVE_STATE_TONE: Readonly<
  Record<BayLiveState, "neutral" | "teal" | "amber" | "green" | "red">
> = {
  idle: "neutral",
  "in-progress": "amber",
  diagnostic: "teal",
  "dyno-running": "red",
  handover: "green",
  blocked: "red",
}

export const JOB_STAGE_LABEL: Readonly<Record<JobStage, string>> = {
  "drop-off": "Drop-off",
  diagnostic: "Diagnostic",
  build: "Build",
  test: "Test",
  handover: "Handover",
}

export const JOB_STAGE_ORDER: ReadonlyArray<JobStage> = [
  "drop-off",
  "diagnostic",
  "build",
  "test",
  "handover",
]

export const PARTS_PULL_STATUS_LABEL: Readonly<Record<PartsPullStatus, string>> = {
  queued: "Queued",
  picking: "Picking",
  delivered: "Delivered",
  "back-order": "Back-order",
}

export const PARTS_PULL_STATUS_TONE: Readonly<
  Record<PartsPullStatus, "neutral" | "amber" | "green" | "red">
> = {
  queued: "neutral",
  picking: "amber",
  delivered: "green",
  "back-order": "red",
}

export const TECH_LOCATION_LABEL: Readonly<Record<TechLocation, string>> = {
  "bay-1": "Bay 1",
  "bay-2": "Bay 2",
  "bay-3": "Bay 3",
  "bay-4": "Bay 4",
  parts: "Parts",
  dyno: "Dyno",
  office: "Office",
  "off-floor": "Off floor",
}

/**
 * Format an elapsed-on-job duration like "1h 24m" or "12m".
 */
export function formatElapsed(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes))
  if (safe < 60) return `${safe}m`
  const h = Math.floor(safe / 60)
  const m = safe % 60
  return m === 0 ? `${h}h` : `${h}h ${m.toString().padStart(2, "0")}m`
}

/**
 * Format AUD currency, en-AU.
 */
export function formatAud(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}
