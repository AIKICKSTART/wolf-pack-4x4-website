/**
 * Shared type definitions for the Mufflermen vehicle-data primitives.
 *
 * Distinct from the fleet-owner primitives in `../vehicles` (utilisation,
 * compliance, lifecycle) — this set is about the *technical record* of an
 * individual vehicle: VIN decode, OBD-II live readout, fitment, parts
 * compatibility, recalls, service intervals, tyre spec, engine bay layout,
 * DTC codes, ownership history, NSW rego register, fuel grades, tow
 * capacity, and aftermarket modifications.
 */

import type { ChipTone } from "../primitives/chip"

export type DriveLayout = "fwd" | "rwd" | "awd" | "4x4"

export type TransmissionType =
  | "manual"
  | "automatic"
  | "dct"
  | "cvt"
  | "single-speed"

export type FuelGrade =
  | "91"
  | "95"
  | "98"
  | "e10"
  | "e85"
  | "diesel"
  | "premium-diesel"
  | "lpg"
  | "electricity"

export type DtcSystem =
  | "powertrain"
  | "chassis"
  | "body"
  | "network"

export type DtcSeverity = "info" | "low" | "moderate" | "critical"

export type RecallStatus = "active" | "closed" | "voluntary" | "interim"

export type FitmentStatus = "match" | "partial" | "mismatch" | "unknown"

export type ServiceItemStatus = "due" | "soon" | "scheduled" | "complete"

export type ModLegality = "engineered" | "compliant" | "grey" | "illegal"

export type ModCategory =
  | "exhaust"
  | "intake"
  | "tune"
  | "suspension"
  | "brakes"
  | "drivetrain"
  | "wheels"

export type RegoStatus =
  | "active"
  | "expired"
  | "suspended"
  | "written-off"
  | "encumbered"

export type ObdReadingKind =
  | "rpm"
  | "coolant"
  | "fuel-level"
  | "maf"
  | "o2"
  | "intake-temp"
  | "throttle"
  | "speed"

/**
 * Reusable vehicle reference shared across the vehicle-data primitives.
 * Mirrors the shape used in `../vehicles/vehicles-types` but kept local so
 * the two families can evolve independently.
 */
export interface VehicleDataRef {
  id: string
  rego: string
  vin: string
  year: number
  make: string
  model: string
}

export const DTC_SEVERITY_LABEL: Readonly<Record<DtcSeverity, string>> = {
  info: "Information",
  low: "Low",
  moderate: "Moderate",
  critical: "Critical",
}

export const DTC_SEVERITY_TONE: Readonly<Record<DtcSeverity, ChipTone>> = {
  info: "teal",
  low: "green",
  moderate: "amber",
  critical: "red",
}

export const DTC_SYSTEM_LABEL: Readonly<Record<DtcSystem, string>> = {
  powertrain: "Powertrain",
  chassis: "Chassis",
  body: "Body",
  network: "Network",
}

export const TRANSMISSION_LABEL: Readonly<Record<TransmissionType, string>> = {
  manual: "Manual",
  automatic: "Automatic",
  dct: "Dual-clutch",
  cvt: "CVT",
  "single-speed": "Single-speed",
}

export const DRIVE_LAYOUT_LABEL: Readonly<Record<DriveLayout, string>> = {
  fwd: "Front-wheel drive",
  rwd: "Rear-wheel drive",
  awd: "All-wheel drive",
  "4x4": "Four-wheel drive",
}

export const FUEL_GRADE_LABEL: Readonly<Record<FuelGrade, string>> = {
  "91": "ULP 91",
  "95": "PULP 95",
  "98": "PULP 98",
  e10: "E10 ethanol blend",
  e85: "E85 flex-fuel",
  diesel: "Diesel",
  "premium-diesel": "Premium diesel",
  lpg: "LPG",
  electricity: "Electricity",
}

export const FUEL_GRADE_TONE: Readonly<Record<FuelGrade, ChipTone>> = {
  "91": "neutral",
  "95": "teal",
  "98": "green",
  e10: "amber",
  e85: "amber",
  diesel: "neutral",
  "premium-diesel": "teal",
  lpg: "amber",
  electricity: "green",
}

export const RECALL_STATUS_LABEL: Readonly<Record<RecallStatus, string>> = {
  active: "Active",
  closed: "Closed",
  voluntary: "Voluntary",
  interim: "Interim",
}

export const RECALL_STATUS_TONE: Readonly<Record<RecallStatus, ChipTone>> = {
  active: "red",
  closed: "green",
  voluntary: "amber",
  interim: "teal",
}

export const FITMENT_STATUS_LABEL: Readonly<Record<FitmentStatus, string>> = {
  match: "Confirmed fit",
  partial: "Partial fit",
  mismatch: "Does not fit",
  unknown: "Unverified",
}

export const FITMENT_STATUS_TONE: Readonly<Record<FitmentStatus, ChipTone>> = {
  match: "green",
  partial: "amber",
  mismatch: "red",
  unknown: "neutral",
}

export const SERVICE_STATUS_LABEL: Readonly<Record<ServiceItemStatus, string>> = {
  due: "Due now",
  soon: "Due soon",
  scheduled: "Scheduled",
  complete: "Complete",
}

export const SERVICE_STATUS_TONE: Readonly<Record<ServiceItemStatus, ChipTone>> = {
  due: "red",
  soon: "amber",
  scheduled: "teal",
  complete: "green",
}

export const MOD_LEGALITY_LABEL: Readonly<Record<ModLegality, string>> = {
  engineered: "Engineered certificate",
  compliant: "ADR compliant",
  grey: "Grey area",
  illegal: "Not road-legal",
}

export const MOD_LEGALITY_TONE: Readonly<Record<ModLegality, ChipTone>> = {
  engineered: "teal",
  compliant: "green",
  grey: "amber",
  illegal: "red",
}

export const MOD_CATEGORY_LABEL: Readonly<Record<ModCategory, string>> = {
  exhaust: "Exhaust",
  intake: "Intake",
  tune: "ECU tune",
  suspension: "Suspension",
  brakes: "Brakes",
  drivetrain: "Drivetrain",
  wheels: "Wheels",
}

export const REGO_STATUS_LABEL: Readonly<Record<RegoStatus, string>> = {
  active: "Active",
  expired: "Expired",
  suspended: "Suspended",
  "written-off": "Written-off",
  encumbered: "Under finance",
}

export const REGO_STATUS_TONE: Readonly<Record<RegoStatus, ChipTone>> = {
  active: "green",
  expired: "red",
  suspended: "red",
  "written-off": "red",
  encumbered: "amber",
}

const KM_FORMATTER = new Intl.NumberFormat("en-AU", {
  maximumFractionDigits: 0,
})

const AUD_FORMATTER = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
})

const DATE_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
})

/**
 * Format kilometres with en-AU separators.
 */
export function formatKm(km: number): string {
  return `${KM_FORMATTER.format(Math.max(0, Math.round(km)))} km`
}

/**
 * Format AUD pricing without cents.
 */
export function formatAud(amount: number): string {
  return AUD_FORMATTER.format(amount)
}

/**
 * Format an ISO date string as "12 Aug 2026".
 */
export function formatIsoDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return DATE_FORMATTER.format(date)
}

/**
 * Short calendar date (no year): "12 Aug".
 */
export function formatShortIsoDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return SHORT_DATE_FORMATTER.format(date)
}

/**
 * Pad and uppercase a VIN to 17 characters, replacing missing
 * positions with the visible dot glyph used across the strip + history
 * cards.
 */
export function padVin(vin: string, length = 17): string {
  return vin.replace(/\s+/g, "").toUpperCase().slice(0, length).padEnd(length, "·")
}

/**
 * Days between now and an ISO date. Negative when the date has passed.
 */
export function daysBetween(iso: string, now: Date = new Date()): number {
  const then = new Date(iso)
  if (Number.isNaN(then.getTime())) {
    return 0
  }
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((then.getTime() - now.getTime()) / msPerDay)
}
