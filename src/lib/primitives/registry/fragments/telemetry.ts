import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "telemetry",
  "title": "Telemetry",
  "group": "Data",
  "summary": "Workshop telemetry primitives for high-contrast gauge clusters, OBD-style status tiles, and diagnostic signal bars shown on the live telemetry route.",
  "entries": [
    {
      "key": "telemetry/conic-gauge",
      "family": "telemetry",
      "name": "ConicGauge",
      "label": "Conic gauge",
      "description": "Client-side conic dial with 270-degree sweep, redline marker, tone variants, tick marks, needle, and readable numeric readout.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components",
      "routeHref": "/ui-primitives/telemetry",
      "tags": [
        "gauge",
        "telemetry",
        "readout",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "telemetry/telemetry-tile",
      "family": "telemetry",
      "name": "TelemetryTile",
      "label": "Telemetry tile",
      "description": "OBD-style diagnostic tile with icon, label, primary value, optional delta copy, tone variable, and light/dark-safe sparkline texture.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components",
      "routeHref": "/ui-primitives/telemetry",
      "tags": [
        "tile",
        "diagnostic",
        "kpi",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "telemetry/signal-bars",
      "family": "telemetry",
      "name": "SignalBars",
      "label": "Signal bars",
      "description": "Compact diagnostic bar stack that renders a labelled count of active versus inactive channel bars with clear low-density contrast.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components",
      "routeHref": "/ui-primitives/telemetry",
      "tags": [
        "signal",
        "bars",
        "diagnostic",
        "status"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
