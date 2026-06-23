import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "vehicle-data",
  "title": "Vehicle data",
  "group": "Operations",
  "summary": "14 Australian-workshop vehicle-data primitives — VIN decode/history, OBD-II live gauges, fitment + parts compatibility, recall and NSW rego lookups, service intervals, tyre/tow specs, engine-bay diagram, and DTC/fuel/aftermarket-mod table rows.",
  "entries": [
    {
      "key": "vehicle-data/vin-decoder-card",
      "family": "vehicle-data",
      "name": "VinDecoderCard",
      "label": "VIN decoder",
      "description": "Form card that takes a 17-character VIN and renders a decoded NEVDIS record (year, make, model, engine, transmission, body, origin) with a per-character keycap strip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/vin-decoder-card",
      "tags": [
        "vin",
        "decode",
        "nevdis",
        "lookup"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/obd-live-readout",
      "family": "vehicle-data",
      "name": "ObdLiveReadout",
      "label": "OBD-II live readout",
      "description": "Live OBD-II dashboard streaming five radial gauges (rpm, coolant, fuel, MAF, O2) with jittered simulation, tone thresholds, and reduced-motion freeze.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/obd-live-readout",
      "tags": [
        "obd",
        "telemetry",
        "gauge",
        "live"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/fitment-validator",
      "family": "vehicle-data",
      "name": "FitmentValidator",
      "label": "Fitment validator",
      "description": "Rego/VIN entry widget that resolves a build spec and shows an overall fitment status with per-criterion pass/fail checks for a part on the bench.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/fitment-validator",
      "tags": [
        "fitment",
        "validate",
        "parts",
        "lookup"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/parts-compatibility-matrix",
      "family": "vehicle-data",
      "name": "PartsCompatibilityMatrix",
      "label": "Parts compatibility matrix",
      "description": "Part-by-vehicle compatibility table with match/partial/mismatch/unknown status icons per cell plus a status legend.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/parts-compatibility-matrix",
      "tags": [
        "compatibility",
        "matrix",
        "parts",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/recall-lookup-card",
      "family": "vehicle-data",
      "name": "RecallLookupCard",
      "label": "Recall lookup",
      "description": "VIN-searchable card listing NHTSA/ACCC recall campaigns with severity, status, issue date, and affected components, plus an active-campaign count chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/recall-lookup-card",
      "tags": [
        "recall",
        "nhtsa",
        "lookup",
        "campaign"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/service-interval-timeline",
      "family": "vehicle-data",
      "name": "ServiceIntervalTimeline",
      "label": "Service interval timeline",
      "description": "Odometer-driven service timeline deriving due/soon/scheduled/complete status per item with progress bars and interval/last-done/next-due/remaining stats.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/service-interval-timeline",
      "tags": [
        "service",
        "interval",
        "timeline",
        "maintenance"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/tyre-spec-panel",
      "family": "vehicle-data",
      "name": "TyreSpecPanel",
      "label": "Tyre spec panel",
      "description": "ADR-placard tyre panel showing front and rear axle specs (size, load index, speed rating, cold/max pressure) with an optional brand chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/tyre-spec-panel",
      "tags": [
        "tyre",
        "spec",
        "adr",
        "fitment"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/engine-bay-diagram",
      "family": "vehicle-data",
      "name": "EngineBayDiagram",
      "label": "Engine bay diagram",
      "description": "Interactive top-down SVG engine-bay schematic with selectable component callouts that reveal a description in a live detail footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/engine-bay-diagram",
      "tags": [
        "engine",
        "diagram",
        "svg",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/diagnostic-code-row",
      "family": "vehicle-data",
      "name": "DiagnosticCodeRow",
      "label": "Diagnostic code row",
      "description": "Table row for an OBD-II DTC showing code, description, system, detect time, freeze-frame, severity chip, and an optional fix-playbook link; criticals get role=alert.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/diagnostic-code-row",
      "tags": [
        "dtc",
        "diagnostic",
        "table-row",
        "obd"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/vin-history-card",
      "family": "vehicle-data",
      "name": "VinHistoryCard",
      "label": "VIN history card",
      "description": "PPSR/REVS history card with a VIN keycap strip, owner/accident/lifetime-km/state stats, a risk-flag chip, and a flagged event timeline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/vin-history-card",
      "tags": [
        "vin",
        "history",
        "ppsr",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/nsw-rego-lookup",
      "family": "vehicle-data",
      "name": "NswRegoLookup",
      "label": "NSW rego lookup",
      "description": "Transport-for-NSW rego card rendering a NSW plate, status glyph/chip, expiry countdown, encumbrance and WOVR flags, and CTP insurer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/nsw-rego-lookup",
      "tags": [
        "rego",
        "nsw",
        "registration",
        "lookup"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/fuel-grade-row",
      "family": "vehicle-data",
      "name": "FuelGradeRow",
      "label": "Fuel grade row",
      "description": "Table row for a fuel grade with a compatibility verdict badge (recommended/compatible/warning/not-compatible), RON/cetane rating, AUD pump price, and note.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/fuel-grade-row",
      "tags": [
        "fuel",
        "grade",
        "compatibility",
        "table-row"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/tow-capacity-tile",
      "family": "vehicle-data",
      "name": "TowCapacityTile",
      "label": "Tow capacity tile",
      "description": "ADR tow-capacity tile listing braked/unbraked/ball-weight/GCM maxima and an optional current-load progress bar with within/near/over-limit tone.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/tow-capacity-tile",
      "tags": [
        "tow",
        "capacity",
        "adr",
        "trailer"
      ],
      "status": "captured"
    },
    {
      "key": "vehicle-data/aftermarket-mod-row",
      "family": "vehicle-data",
      "name": "AftermarketModRow",
      "label": "Aftermarket mod row",
      "description": "Table row for an aftermarket modification showing category/part reference, claimed gain, installed AUD cost, NSW legality chip with certificate ref, and an install-brief link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicle-data",
      "routeHref": "/ui-primitives/vehicle-data/aftermarket-mod-row",
      "tags": [
        "aftermarket",
        "mod",
        "legality",
        "table-row"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
