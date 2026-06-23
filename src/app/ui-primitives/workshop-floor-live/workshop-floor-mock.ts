/**
 * Realistic mock data used across the workshop-floor-live sub-routes.
 *
 * Reflects a typical mid-week morning at the Oak Flats Mufflermen workshop:
 * - Bay 1 idle, finishing breakfast turnaround
 * - Bay 2 hosting a Hilux N80 Manta cat-back install (lead fitter)
 * - Bay 3 in the dyno cell tuning a Patrol Y62
 * - Bay 4 diagnostic on a noisy VE Commodore exhaust
 */

import type { FloorPlanBay, FloorPlanTechnician } from "../components/workshop-floor-live"

export const BAY_PLAN: ReadonlyArray<FloorPlanBay> = [
  { bay: "bay-1", state: "idle" },
  { bay: "bay-2", state: "in-progress", label: "Hilux N80" },
  { bay: "bay-3", state: "dyno-running", label: "Patrol Y62" },
  { bay: "bay-4", state: "diagnostic", label: "VE SS" },
]

export const TECHS: ReadonlyArray<FloorPlanTechnician> = [
  { id: "tech-jordan", name: "Jordan Pace", location: "bay-2" },
  { id: "tech-sophie", name: "Sophie Tan", location: "bay-3" },
  { id: "tech-trent", name: "Trent Williams", location: "bay-4" },
  { id: "tech-dean", name: "Dean Okafor", location: "parts" },
]

export const TECH_ROLE: Record<string, string> = {
  "tech-jordan": "Apprentice Y3",
  "tech-sophie": "Lead fitter",
  "tech-trent": "Workshop manager",
  "tech-dean": "Parts runner",
}

export const CUSTOMERS = {
  bay2: { customer: "Aleksic", vehicle: "Hilux N80 GUN126R · BTR-882" },
  bay3: { customer: "McKinnon", vehicle: "Patrol Y62 5.6L · QXK-014" },
  bay4: { customer: "Rakuljic", vehicle: "VE Commodore SS · CTU-491" },
} as const
