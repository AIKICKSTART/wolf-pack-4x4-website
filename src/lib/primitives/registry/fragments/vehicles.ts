import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "vehicles",
  "title": "Vehicles",
  "group": "Operations",
  "summary": "14 fleet/vehicle operations primitives — cards, telemetry, compliance and maintenance surfaces (VIN, service, mileage, rego, insurance, roadworthy, fuel, tyres, brakes, telematics, ECU codes, recalls, utilisation) built on shared chart, chip and dashboard-card primitives.",
  "entries": [
    {
      "key": "vehicles/vehicle-card-fleet",
      "family": "vehicles",
      "name": "VehicleCardFleet",
      "label": "Fleet vehicle card",
      "description": "Fleet vehicle card with hero photo/rego plate, status chip, odometer dashboard metric and assigned-driver avatar row.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/vehicle-card-fleet",
      "tags": [
        "fleet",
        "vehicle",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/vin-decoder-strip",
      "family": "vehicles",
      "name": "VinDecoderStrip",
      "label": "VIN decoder strip",
      "description": "17-character VIN displayed as per-char Kbd cells with a copy button and a decoded make/model/engine/body/origin/year chip grid.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/vin-decoder-strip",
      "tags": [
        "vin",
        "decode",
        "identity"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/service-history-timeline",
      "family": "vehicles",
      "name": "ServiceHistoryTimeline",
      "label": "Service history timeline",
      "description": "Service-history entries rendered as an ActivityFeed with per-kind glyph/tone, formatted date, workshop/odometer meta and a cost chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/service-history-timeline",
      "tags": [
        "service",
        "timeline",
        "history"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/mileage-tracker",
      "family": "vehicles",
      "name": "MileageTracker",
      "label": "Mileage tracker",
      "description": "Odometer-vs-service-interval tracker with a segmented progress bar, monthly-km sparkline and projected months-until-service chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/mileage-tracker",
      "tags": [
        "mileage",
        "service",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/registration-expiry-chip",
      "family": "vehicles",
      "name": "RegistrationExpiryChip",
      "label": "Registration expiry chip",
      "description": "Single chip showing state registration expiry with tone (green/amber/red) and label derived from days remaining.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/registration-expiry-chip",
      "tags": [
        "registration",
        "expiry",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/insurance-card",
      "family": "vehicles",
      "name": "InsuranceCard",
      "label": "Insurance card",
      "description": "Insurer/policy dashboard card with renewal-date delta plus cover-type, open-claims and lifetime-claims chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/insurance-card",
      "tags": [
        "insurance",
        "policy",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/roadworthy-certificate-card",
      "family": "vehicles",
      "name": "RoadworthyCertificateCard",
      "label": "Roadworthy certificate card",
      "description": "Safety/roadworthy certificate card with cert number, issued/expires dates, status chip and optional advisory list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/roadworthy-certificate-card",
      "tags": [
        "roadworthy",
        "certificate",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/fuel-log-row",
      "family": "vehicles",
      "name": "FuelLogRow",
      "label": "Fuel log row",
      "description": "Table row for a single fuel fill: date, litres, AUD cost with price/L, computed km/L efficiency chip and station/grade chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/fuel-log-row",
      "tags": [
        "fuel",
        "log",
        "table-row"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/tyre-condition-diagram",
      "family": "vehicles",
      "name": "TyreConditionDiagram",
      "label": "Tyre condition diagram",
      "description": "Interactive top-down vehicle shell with clickable per-position tyres plus a tread-depth bar chart and pressure chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/tyre-condition-diagram",
      "tags": [
        "tyres",
        "tread",
        "diagram"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/brake-pad-life-meter",
      "family": "vehicles",
      "name": "BrakePadLifeMeter",
      "label": "Brake pad life meter",
      "description": "Per-axle brake pad life shown as radial meters with a km-until-service chip toned by remaining material.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/brake-pad-life-meter",
      "tags": [
        "brakes",
        "radial-meter",
        "maintenance"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/telematics-chip",
      "family": "vehicles",
      "name": "TelematicsChip",
      "label": "Telematics chip",
      "description": "Live telematics snapshot (status region) with a pulsing dot and speed/engine-load/fuel/coolant chips, reduced-motion aware.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/telematics-chip",
      "tags": [
        "telematics",
        "live",
        "obd"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/ecu-diagnostic-code-row",
      "family": "vehicles",
      "name": "EcuDiagnosticCodeRow",
      "label": "ECU diagnostic code row",
      "description": "Table row for an OBD-II fault code with severity chip, detected/occurrence meta, critical alert state and optional suggested-fix link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/ecu-diagnostic-code-row",
      "tags": [
        "ecu",
        "obd",
        "diagnostics"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/recall-notification-banner",
      "family": "vehicles",
      "name": "RecallNotificationBanner",
      "label": "Recall notification banner",
      "description": "Manufacturer recall alert banner with severity styling, affected-systems chips, action-required copy and primary/secondary action links.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/recall-notification-banner",
      "tags": [
        "recall",
        "alert",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "vehicles/fleet-utilization-gauge",
      "family": "vehicles",
      "name": "FleetUtilizationGauge",
      "label": "Fleet utilisation gauge",
      "description": "Fleet utilisation meter combining a radial active-percent gauge with a status-breakdown donut (active/workshop/reserved/off-road).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/vehicles",
      "routeHref": "/ui-primitives/vehicles/fleet-utilization-gauge",
      "tags": [
        "fleet",
        "utilisation",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
