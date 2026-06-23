/**
 * Shared type definitions for the Mufflermen fleet-owner vehicle primitives.
 *
 * Distinct from workshop-floor scenes (workshop bays, fitment checks) and CRM
 * (customer relationships) — this set is about *the vehicles themselves* from
 * the fleet operator's point of view: a Stuart-Olin-style fleet manager
 * tracking utilisation, compliance, condition, and lifecycle of a small
 * commercial fleet running out of Oak Flats.
 */

export type VehicleStatus =
  | "in-service"
  | "in-workshop"
  | "off-road"
  | "reserved"
  | "sold"

export type FuelType =
  | "petrol"
  | "diesel"
  | "lpg"
  | "ev"
  | "phev"
  | "hybrid"

export type TyrePosition =
  | "front-left"
  | "front-right"
  | "rear-left"
  | "rear-right"

export type EcuSeverity = "info" | "low" | "moderate" | "critical"

export type InsuranceCoverType =
  | "comprehensive"
  | "third-party-property"
  | "third-party-fire-theft"
  | "ctp"
  | "fleet-master"

export type RoadworthyStatus = "passed" | "failed" | "advisory" | "pending"

export type AxleSide = "front" | "rear"

export interface VehicleRef {
  id: string
  rego: string
  yearMakeModel: string
}

export const VEHICLE_STATUS_LABEL: Readonly<Record<VehicleStatus, string>> = {
  "in-service": "In service",
  "in-workshop": "In workshop",
  "off-road": "Off-road",
  reserved: "Reserved",
  sold: "Sold",
}

export const FUEL_LABEL: Readonly<Record<FuelType, string>> = {
  petrol: "Petrol",
  diesel: "Diesel",
  lpg: "LPG",
  ev: "EV",
  phev: "Plug-in hybrid",
  hybrid: "Hybrid",
}

export const TYRE_LABEL: Readonly<Record<TyrePosition, string>> = {
  "front-left": "Front-left",
  "front-right": "Front-right",
  "rear-left": "Rear-left",
  "rear-right": "Rear-right",
}

export const ECU_SEVERITY_LABEL: Readonly<Record<EcuSeverity, string>> = {
  info: "Information",
  low: "Low",
  moderate: "Moderate",
  critical: "Critical",
}

export const INSURANCE_COVER_LABEL: Readonly<Record<InsuranceCoverType, string>> = {
  comprehensive: "Comprehensive",
  "third-party-property": "Third-party property",
  "third-party-fire-theft": "Third-party fire/theft",
  ctp: "CTP green slip",
  "fleet-master": "Fleet master cover",
}

export const ROADWORTHY_LABEL: Readonly<Record<RoadworthyStatus, string>> = {
  passed: "Passed",
  failed: "Failed",
  advisory: "Advisory",
  pending: "Pending",
}

/**
 * Tone of a vehicle status, used by chips + cards to keep semantic colour
 * consistent across the fleet primitives.
 */
export type VehicleStatusTone = "green" | "amber" | "red" | "teal" | "neutral"

export const VEHICLE_STATUS_TONE: Readonly<Record<VehicleStatus, VehicleStatusTone>> = {
  "in-service": "green",
  "in-workshop": "amber",
  "off-road": "red",
  reserved: "teal",
  sold: "neutral",
}

export const ECU_SEVERITY_TONE: Readonly<Record<EcuSeverity, VehicleStatusTone>> = {
  info: "teal",
  low: "green",
  moderate: "amber",
  critical: "red",
}

/**
 * Format a NSW Australian rego like ABC123 or BTR-882.
 */
export function formatRego(rego: string): string {
  return rego.toUpperCase()
}

/**
 * Format an odometer reading in km using en-AU separators.
 */
export function formatOdometer(km: number): string {
  return `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(km)} km`
}

/**
 * Number of full calendar days between now and the supplied ISO date.
 * Negative when the date is in the past.
 */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const then = new Date(iso)
  if (Number.isNaN(then.getTime())) {
    return 0
  }
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((then.getTime() - now.getTime()) / msPerDay)
}
