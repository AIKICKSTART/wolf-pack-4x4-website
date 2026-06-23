/**
 * Sample Mufflermen fleet data used across the /ui-primitives/vehicles routes.
 * All vehicles and people are fictional. AUD pricing, NSW Roads compliance.
 */

import type {
  ServiceHistoryEntry,
  ServiceKind,
} from "../components/vehicles/service-history-timeline"
import type { TyreReading } from "../components/vehicles/tyre-condition-diagram"
import type { TelematicsReading } from "../components/vehicles/telematics-chip"
import type { BrakePadAxleReading } from "../components/vehicles/brake-pad-life-meter"
import type { VinDecoderFields } from "../components/vehicles/vin-decoder-strip"
import type {
  FuelType,
  InsuranceCoverType,
  RoadworthyStatus,
  VehicleStatus,
} from "../components/vehicles/vehicles-types"

export interface FleetVehicle {
  id: string
  rego: string
  year: number
  make: string
  model: string
  status: VehicleStatus
  odometerKm: number
  fuelType: FuelType
  driverName: string
}

export const FLEET: ReadonlyArray<FleetVehicle> = [
  {
    id: "veh-hilux-n80",
    rego: "BTR-882",
    year: 2022,
    make: "Toyota",
    model: "Hilux N80 SR5",
    status: "in-service",
    odometerKm: 84_120,
    fuelType: "diesel",
    driverName: "Brodie Tasker",
  },
  {
    id: "veh-patrol-y62",
    rego: "CYK-114",
    year: 2021,
    make: "Nissan",
    model: "Patrol Y62 Ti-L",
    status: "in-workshop",
    odometerKm: 132_640,
    fuelType: "petrol",
    driverName: "Mick Halloran",
  },
  {
    id: "veh-ranger-px3",
    rego: "DEV-204",
    year: 2020,
    make: "Ford",
    model: "Ranger PX3 Wildtrak",
    status: "in-service",
    odometerKm: 96_510,
    fuelType: "diesel",
    driverName: "Sam Kovacic",
  },
  {
    id: "veh-triton-ml",
    rego: "XYZ-789",
    year: 2019,
    make: "Mitsubishi",
    model: "Triton MR GLS",
    status: "reserved",
    odometerKm: 118_240,
    fuelType: "diesel",
    driverName: "Jaz Petraitis",
  },
  {
    id: "veh-iveco-daily",
    rego: "QFG-616",
    year: 2023,
    make: "Iveco",
    model: "Daily 50C18 Tradie Made",
    status: "off-road",
    odometerKm: 54_870,
    fuelType: "diesel",
    driverName: "Lochie Patera",
  },
]

export const PRIMARY_VEHICLE: FleetVehicle = FLEET[0]

export const SAMPLE_VIN = "JT12ZBR45N0028894"

export const SAMPLE_VIN_FIELDS: VinDecoderFields = {
  make: "Toyota",
  model: "Hilux N80",
  engine: "2.8L 1GD-FTV diesel",
  body: "Dual-cab utility",
  origin: "Thailand",
  year: 2022,
}

export const SAMPLE_SERVICE_HISTORY: ReadonlyArray<ServiceHistoryEntry> = [
  {
    id: "svc-1",
    kind: "scheduled" as ServiceKind,
    summary: "60,000 km major service · oil, fuel filter, brake fluid flush",
    performedISO: "2026-03-14T08:30:00+11:00",
    workshop: "Oak Flats Mufflermen · Bay 2",
    costAud: 1480,
    odometerKm: 60_220,
  },
  {
    id: "svc-2",
    kind: "exhaust" as ServiceKind,
    summary: "Cat-back exhaust upgrade — 409 stainless, Oak Flats fab",
    performedISO: "2025-11-04T10:00:00+11:00",
    workshop: "Oak Flats Mufflermen · Bay 1",
    costAud: 2640,
    odometerKm: 52_180,
  },
  {
    id: "svc-3",
    kind: "tyres" as ServiceKind,
    summary: "BFGoodrich KO2 set, balance + alignment",
    performedISO: "2025-08-09T13:15:00+10:00",
    workshop: "Tyre King · Albion Park",
    costAud: 2180,
    odometerKm: 48_540,
  },
  {
    id: "svc-4",
    kind: "warranty" as ServiceKind,
    summary: "DPF cleaning under Toyota powertrain warranty",
    performedISO: "2025-05-22T09:00:00+10:00",
    workshop: "Toyota Wollongong",
    costAud: 0,
    odometerKm: 42_180,
  },
  {
    id: "svc-5",
    kind: "inspection" as ServiceKind,
    summary: "Annual eSafety inspection · NSW",
    performedISO: "2025-02-17T08:00:00+11:00",
    workshop: "Oak Flats Mufflermen · Bay 2",
    costAud: 49,
    odometerKm: 36_540,
  },
]

export const SAMPLE_MILEAGE: ReadonlyArray<number> = [
  1640, 1860, 2010, 2240, 2680, 2520, 1980, 2140, 2360, 2780, 2920, 3140,
]

export const SAMPLE_TYRES: ReadonlyArray<TyreReading> = [
  {
    position: "front-left",
    treadMm: 4.4,
    pressureKpa: 240,
    spec: "BFG KO2 265/70R17",
  },
  {
    position: "front-right",
    treadMm: 4.2,
    pressureKpa: 235,
    spec: "BFG KO2 265/70R17",
  },
  {
    position: "rear-left",
    treadMm: 3.1,
    pressureKpa: 260,
    spec: "BFG KO2 265/70R17",
  },
  {
    position: "rear-right",
    treadMm: 1.8,
    pressureKpa: 190,
    spec: "BFG KO2 265/70R17",
  },
]

export const SAMPLE_TELEMATICS: TelematicsReading = {
  speedKmh: 96,
  engineLoadPercent: 58,
  fuelLevelPercent: 42,
  coolantTempC: 88,
  capturedAtISO: "2026-05-29T08:14:12+10:00",
}

export const SAMPLE_BRAKE_AXLES: ReadonlyArray<BrakePadAxleReading> = [
  { axle: "front", remainingPercent: 42, kmUntilService: 6800 },
  { axle: "rear", remainingPercent: 68, kmUntilService: 14_200 },
]

export const SAMPLE_INSURANCE = {
  insurer: "NRMA Business",
  policyNumber: "BU-44129802",
  covers: ["comprehensive", "fleet-master"] as ReadonlyArray<InsuranceCoverType>,
  renewalISO: "2026-08-04",
  openClaims: 0,
  lifetimeClaims: 2,
  excessAud: 1100,
}

export const SAMPLE_ROADWORTHY = {
  certNumber: "NSW-eSAFETY-44218",
  issuedISO: "2026-02-17",
  expiresISO: "2027-02-17",
  workshop: "Oak Flats Mufflermen · Bay 2",
  inspector: "Brodie Tasker",
  status: "passed" as RoadworthyStatus,
  advisories: [
    "Rear-right tyre at 1.8 mm — replace before next inspection",
    "Wiper blades streaking on driver side",
  ],
}

export interface FuelLogEntry {
  id: string
  filledISO: string
  litres: number
  costAud: number
  distanceSinceLastKm: number
  station: string
  grade: string
}

export const SAMPLE_FUEL_LOG: ReadonlyArray<FuelLogEntry> = [
  {
    id: "fuel-1",
    filledISO: "2026-05-28T17:42:00+10:00",
    litres: 78.4,
    costAud: 162.3,
    distanceSinceLastKm: 720,
    station: "Ampol Oak Flats",
    grade: "Diesel",
  },
  {
    id: "fuel-2",
    filledISO: "2026-05-21T08:14:00+10:00",
    litres: 72.1,
    costAud: 152.6,
    distanceSinceLastKm: 685,
    station: "BP Shellharbour",
    grade: "Diesel",
  },
  {
    id: "fuel-3",
    filledISO: "2026-05-14T18:01:00+10:00",
    litres: 80.5,
    costAud: 168.9,
    distanceSinceLastKm: 712,
    station: "7-Eleven Albion Park",
    grade: "Diesel",
  },
  {
    id: "fuel-4",
    filledISO: "2026-05-07T07:54:00+10:00",
    litres: 74.2,
    costAud: 156.1,
    distanceSinceLastKm: 698,
    station: "Caltex Dapto",
    grade: "Diesel",
  },
]

export interface EcuCodeEntry {
  id: string
  code: string
  description: string
  severity: "info" | "low" | "moderate" | "critical"
  detectedISO: string
  occurrenceCount: number
  fixHref?: string
  fixLabel?: string
}

export const SAMPLE_ECU_CODES: ReadonlyArray<EcuCodeEntry> = [
  {
    id: "ecu-1",
    code: "P0420",
    description: "Catalyst system efficiency below threshold (Bank 1)",
    severity: "moderate",
    detectedISO: "2026-05-26T11:20:00+10:00",
    occurrenceCount: 14,
    fixHref: "#fix-p0420",
    fixLabel: "Cat replacement",
  },
  {
    id: "ecu-2",
    code: "P246C",
    description: "Diesel particulate filter regeneration interrupted",
    severity: "critical",
    detectedISO: "2026-05-29T07:48:00+10:00",
    occurrenceCount: 3,
    fixHref: "#fix-p246c",
    fixLabel: "Book DPF service",
  },
  {
    id: "ecu-3",
    code: "U0140",
    description: "Lost communication with body control module",
    severity: "low",
    detectedISO: "2026-05-12T14:02:00+10:00",
    occurrenceCount: 1,
  },
  {
    id: "ecu-4",
    code: "B1234",
    description: "Passenger airbag impedance out of range",
    severity: "info",
    detectedISO: "2026-04-28T09:33:00+10:00",
    occurrenceCount: 1,
    fixHref: "#fix-b1234",
    fixLabel: "Diagnostic notes",
  },
]

export const SAMPLE_RECALL = {
  recallId: "NHTSA 23V-441",
  manufacturer: "Toyota",
  headline: "Hilux N80 fuel pump impeller fatigue — engine stall risk at speed",
  affectedSystems: ["Fuel pump assembly", "ECU calibration"],
  actionRequired:
    "Book the affected vehicle into Toyota Wollongong for fuel-pump replacement. Repair time is approximately 2.5 hours and is fully covered by the recall.",
  severity: "mandatory" as const,
  issuedISO: "2026-04-12",
}

export const FLEET_BREAKDOWN = {
  active: 38,
  workshop: 6,
  reserved: 4,
  offRoad: 2,
}
