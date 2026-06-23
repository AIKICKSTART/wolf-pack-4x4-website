/**
 * Sample data for the /ui-primitives/vehicle-data routes. Real ADR fitments,
 * real NSW rego format, real OBD-II codes, real recall references.
 *
 * Vehicles in the sample set:
 *  - 2021 Toyota Hilux N80 SR5 (KFK-23M) — diesel ute
 *  - 2008 Ford Falcon BF XR6 (DGR-411) — petrol sedan
 *  - 2024 Ford Ranger Raptor (RAP-22Z) — twin-turbo V6
 *  - 2007 Holden VE Commodore SS (VEZ-771) — petrol V8 sedan
 */

import type {
  CompatibilityPartRow,
  CompatibilityVehicleColumn,
} from "../components/vehicle-data/parts-compatibility-matrix"
import type { EngineBayComponent } from "../components/vehicle-data/engine-bay-diagram"
import type { FitmentEvaluation } from "../components/vehicle-data/fitment-validator"
import type { ObdLiveReadingFrame } from "../components/vehicle-data/obd-live-readout"
import type { RecallRecord } from "../components/vehicle-data/recall-lookup-card"
import type { ServiceInterval } from "../components/vehicle-data/service-interval-timeline"
import type { TyreAxleSpec } from "../components/vehicle-data/tyre-spec-panel"
import type { VinDecodeResult } from "../components/vehicle-data/vin-decoder-card"
import type {
  VinHistoryEvent,
} from "../components/vehicle-data/vin-history-card"
import type { VehicleDataRef } from "../components/vehicle-data/vehicle-data-types"

export const HILUX: VehicleDataRef = {
  id: "veh-hilux-2021",
  rego: "KFK-23M",
  vin: "JT12ZBR45N0028894",
  year: 2021,
  make: "Toyota",
  model: "Hilux N80 SR5",
}

export const FALCON: VehicleDataRef = {
  id: "veh-falcon-2008",
  rego: "DGR-411",
  vin: "6FPAAAJGSW8E22117",
  year: 2008,
  make: "Ford",
  model: "Falcon BF XR6",
}

export const RAPTOR: VehicleDataRef = {
  id: "veh-raptor-2024",
  rego: "RAP-22Z",
  vin: "MNCBSFE40RW804412",
  year: 2024,
  make: "Ford",
  model: "Ranger Raptor",
}

export const COMMODORE: VehicleDataRef = {
  id: "veh-commodore-2007",
  rego: "VEZ-771",
  vin: "6H8VFK69J7L617084",
  year: 2007,
  make: "Holden",
  model: "VE Commodore SS",
}

export const SAMPLE_FLEET: ReadonlyArray<VehicleDataRef> = [
  HILUX,
  FALCON,
  RAPTOR,
  COMMODORE,
]

// VIN decode for the Hilux (primary scene vehicle).
export const HILUX_VIN_DECODE: VinDecodeResult = {
  year: 2021,
  make: "Toyota",
  model: "Hilux N80 SR5",
  engine: "2.8L 1GD-FTV turbo-diesel I4",
  transmission: "automatic",
  origin: "Ban Pho, Thailand",
  bodyStyle: "Dual-cab utility",
}

export const RAPTOR_VIN_DECODE: VinDecodeResult = {
  year: 2024,
  make: "Ford",
  model: "Ranger Raptor",
  engine: "3.0L EcoBoost twin-turbo V6 petrol",
  transmission: "automatic",
  origin: "Silverton, South Africa",
  bodyStyle: "Dual-cab high-rider",
}

export const OBD_INITIAL: ObdLiveReadingFrame = {
  rpm: 1_840,
  coolantTempC: 89,
  fuelLevelPercent: 64,
  mafGramsPerSecond: 16.4,
  o2Voltage: 0.74,
}

export const RAPTOR_FITMENT: FitmentEvaluation = {
  vehicleLabel: "2024 Ford Ranger Raptor — RAP-22Z",
  resolvedIdentifier: "MNCBSFE40RW804412",
  status: "match",
  partLabel: "Mufflermen 3-inch cat-back exhaust kit",
  checks: [
    { label: "Engine code (V6 twin-turbo)", passed: true, note: "Matches kit application range 2022-onwards" },
    { label: "Chassis clearance (rear tub)", passed: true, note: "Twin tip exit confirmed for Raptor flared bumper" },
    { label: "O₂ sensor protocol", passed: true, note: "Bank 1+2 sensors retained — no AFR remap required" },
    { label: "ADR 83/00 compliance", passed: true, note: "Tested at 78 dB(A) drive-by, under 90 dB(A) limit" },
  ],
}

export const HILUX_FITMENT_FAIL: FitmentEvaluation = {
  vehicleLabel: "2008 Ford Falcon BF XR6 — DGR-411",
  resolvedIdentifier: "6FPAAAJGSW8E22117",
  status: "mismatch",
  partLabel: "Mufflermen 3-inch cat-back exhaust kit",
  checks: [
    { label: "Engine code (4.0L Barra I6)", passed: false, note: "Kit application is 6-cyl twin-turbo — flange diameter differs" },
    { label: "Chassis clearance (rear axle)", passed: false, note: "BF sedan tunnel too narrow for 3-inch pipe" },
    { label: "O₂ sensor protocol", passed: true, note: "Sensor placement compatible with kit dummy bung" },
    { label: "ADR 83/00 compliance", passed: false, note: "Drive-by db rating not verified for BF chassis" },
  ],
}

export const COMPATIBILITY_VEHICLES: ReadonlyArray<CompatibilityVehicleColumn> = [
  { id: HILUX.id, label: "Hilux", sub: "KFK-23M" },
  { id: FALCON.id, label: "Falcon", sub: "DGR-411" },
  { id: RAPTOR.id, label: "Raptor", sub: "RAP-22Z" },
  { id: COMMODORE.id, label: "Commodore", sub: "VEZ-771" },
]

export const COMPATIBILITY_PARTS: ReadonlyArray<CompatibilityPartRow> = [
  {
    id: "part-catback",
    label: "3-inch cat-back exhaust",
    partNumber: "MUF-CB-300",
    byVehicle: {
      [HILUX.id]: "match",
      [FALCON.id]: "mismatch",
      [RAPTOR.id]: "match",
      [COMMODORE.id]: "partial",
    },
  },
  {
    id: "part-extractors",
    label: "Tri-Y stainless extractors",
    partNumber: "MUF-EX-TRI",
    byVehicle: {
      [HILUX.id]: "mismatch",
      [FALCON.id]: "match",
      [RAPTOR.id]: "mismatch",
      [COMMODORE.id]: "match",
    },
  },
  {
    id: "part-dpf-delete",
    label: "DPF replacement core",
    partNumber: "MUF-DPF-T28",
    byVehicle: {
      [HILUX.id]: "match",
      [FALCON.id]: "unknown",
      [RAPTOR.id]: "partial",
      [COMMODORE.id]: "mismatch",
    },
  },
  {
    id: "part-resonator",
    label: "Helmholtz resonator",
    partNumber: "MUF-RES-HZ",
    byVehicle: {
      [HILUX.id]: "partial",
      [FALCON.id]: "match",
      [RAPTOR.id]: "match",
      [COMMODORE.id]: "match",
    },
  },
  {
    id: "part-x-pipe",
    label: "X-pipe crossover",
    partNumber: "MUF-XP-200",
    byVehicle: {
      [HILUX.id]: "mismatch",
      [FALCON.id]: "match",
      [RAPTOR.id]: "partial",
      [COMMODORE.id]: "match",
    },
  },
]

export const HILUX_RECALLS: ReadonlyArray<RecallRecord> = [
  {
    id: "recall-hilux-dpf",
    reference: "ACCC PR-MA/2019/19102",
    manufacturer: "Toyota Motor Corp Australia",
    headline: "Hilux 2.8L DPF differential pressure sensor — reduced engine power risk",
    severity: "moderate",
    status: "active",
    issuedISO: "2019-11-04",
    affectedComponents: ["DPF differential pressure sensor", "ECU calibration"],
  },
  {
    id: "recall-hilux-fuelpump",
    reference: "NHTSA 23V-441",
    manufacturer: "Toyota Motor Corp",
    headline: "1GD-FTV fuel pump impeller fatigue — engine stall risk",
    severity: "critical",
    status: "active",
    issuedISO: "2023-04-12",
    affectedComponents: ["Fuel pump assembly", "Low-pressure feed line"],
  },
]

export const RANGER_RECALLS: ReadonlyArray<RecallRecord> = [
  {
    id: "recall-ranger-trans",
    reference: "ACCC PR-MA/2020/18444",
    manufacturer: "Ford Motor Company of Australia",
    headline: "PX3 Ranger 10R80 transmission shift solenoid — gear slip risk",
    severity: "moderate",
    status: "closed",
    issuedISO: "2020-08-22",
    affectedComponents: ["Shift solenoid pack", "TCM software"],
  },
]

export const HILUX_SERVICE_INTERVALS: ReadonlyArray<ServiceInterval> = [
  {
    id: "svc-oil",
    label: "Engine oil + filter",
    intervalKm: 10_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 80_000,
    spec: "Toyota Genuine 0W-30 6.2 L · oil filter 90915-YZZD3",
  },
  {
    id: "svc-air-filter",
    label: "Air filter",
    intervalKm: 40_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 60_000,
    spec: "Ryco A1855 OEM equivalent",
  },
  {
    id: "svc-brake-fluid",
    label: "Brake fluid flush",
    intervalKm: 40_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 45_000,
    spec: "Castrol React DOT 4 LV 1 L",
    status: "due",
  },
  {
    id: "svc-coolant",
    label: "Long-life coolant",
    intervalKm: 60_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 60_000,
    spec: "Toyota SLLC pink premixed 7.2 L",
  },
  {
    id: "svc-trans",
    label: "Auto transmission fluid",
    intervalKm: 80_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 0,
    spec: "Toyota WS ATF 7.5 L · first major service",
    status: "soon",
  },
  {
    id: "svc-dpf",
    label: "DPF clean + regen",
    intervalKm: 100_000,
    currentOdometerKm: 84_120,
    lastDoneKm: 0,
    spec: "Ash removal + active regen cycle",
  },
]

export const HILUX_TYRES_FRONT: TyreAxleSpec = {
  size: "265/70R17",
  loadIndex: 115,
  speedRating: "S",
  pressureKpa: 240,
  maxPressureKpa: 310,
}

export const HILUX_TYRES_REAR: TyreAxleSpec = {
  size: "265/70R17",
  loadIndex: 115,
  speedRating: "S",
  pressureKpa: 290,
  maxPressureKpa: 310,
}

export const RAPTOR_TYRES_FRONT: TyreAxleSpec = {
  size: "285/70R17",
  loadIndex: 121,
  speedRating: "Q",
  pressureKpa: 230,
  maxPressureKpa: 320,
}

export const RAPTOR_TYRES_REAR: TyreAxleSpec = {
  size: "285/70R17",
  loadIndex: 121,
  speedRating: "Q",
  pressureKpa: 230,
  maxPressureKpa: 320,
}

export const HILUX_ENGINE_BAY: ReadonlyArray<EngineBayComponent> = [
  {
    id: "battery",
    label: "Battery",
    description: "Century N70ZZ AGM · 12 V 760 CCA mounted forward-left.",
    point: { x: 14, y: 22 },
    tone: "amber",
  },
  {
    id: "airbox",
    label: "Airbox",
    description: "Snorkel-fed sealed airbox feeding the turbo intake — Ryco A1855 element.",
    point: { x: 50, y: 18 },
    tone: "green",
  },
  {
    id: "turbo",
    label: "Variable-nozzle turbo",
    description: "Toyota CT16V on the 1GD-FTV — electronic vane actuator, 26 psi peak.",
    point: { x: 70, y: 44 },
    tone: "red",
  },
  {
    id: "intercooler",
    label: "Top-mount intercooler",
    description: "Air-to-air intercooler sits above the engine, feeding charge to the intake manifold.",
    point: { x: 50, y: 56 },
    tone: "teal",
  },
  {
    id: "coolant",
    label: "Coolant overflow",
    description: "SLLC pink premix · check between MIN/MAX cold.",
    point: { x: 82, y: 28 },
    tone: "teal",
  },
  {
    id: "ecu",
    label: "ECU (89661)",
    description: "Toyota engine ECU mounted high-right of the firewall — DPF regen logic lives here.",
    point: { x: 78, y: 78 },
    tone: "amber",
  },
]

export const HILUX_VIN_HISTORY_EVENTS: ReadonlyArray<VinHistoryEvent> = [
  {
    id: "evt-1",
    isoDate: "2021-04-22",
    headline: "First registered (NSW)",
    location: "Toyota Wollongong",
    odometerKm: 9,
  },
  {
    id: "evt-2",
    isoDate: "2022-10-14",
    headline: "Minor rear bar repair — claimable",
    location: "Wollongong NSW",
    flag: "minor",
    odometerKm: 38_640,
  },
  {
    id: "evt-3",
    isoDate: "2023-06-09",
    headline: "Ownership transfer (private)",
    location: "Albion Park NSW",
    odometerKm: 56_120,
  },
  {
    id: "evt-4",
    isoDate: "2025-08-09",
    headline: "Major service · 60k milestone",
    location: "Oak Flats Mufflermen · Bay 2",
    odometerKm: 60_220,
  },
  {
    id: "evt-5",
    isoDate: "2026-04-30",
    headline: "Recall remediation booked",
    location: "Toyota Wollongong",
    flag: "minor",
    odometerKm: 82_410,
  },
]

export const FALCON_VIN_HISTORY_EVENTS: ReadonlyArray<VinHistoryEvent> = [
  {
    id: "f-evt-1",
    isoDate: "2008-02-11",
    headline: "First registered (VIC)",
    location: "Ford Geelong",
    odometerKm: 6,
  },
  {
    id: "f-evt-2",
    isoDate: "2013-10-04",
    headline: "Interstate transfer (VIC → NSW)",
    location: "Sydney NSW",
    odometerKm: 88_440,
  },
  {
    id: "f-evt-3",
    isoDate: "2016-07-28",
    headline: "Insurance write-off — repaired",
    location: "Penrith NSW",
    flag: "write-off",
    odometerKm: 142_180,
  },
  {
    id: "f-evt-4",
    isoDate: "2022-11-19",
    headline: "Engineer certificate · twin-pipe exhaust",
    location: "Oak Flats Mufflermen · Bay 1",
    odometerKm: 218_640,
  },
]
