import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "maps",
  "title": "Maps",
  "group": "Operations",
  "summary": "12 location-and-mapping primitives — a hand-drawn SVG map canvas plus pins, service-radius rings, route lines, postcode/heatmap overlays, distance chips, and interactive locator/finder/tracker surfaces for the Oak Flats workshop coverage area.",
  "entries": [
    {
      "key": "maps/static-map-canvas",
      "family": "maps",
      "name": "StaticMapCanvas",
      "label": "Static map canvas",
      "description": "Hand-drawn SVG map (landmass, harbour, roads, compass) with a tone variant and a children slot for overlays.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/static-map",
      "tags": [
        "map",
        "svg",
        "canvas",
        "cartography"
      ],
      "status": "captured"
    },
    {
      "key": "maps/map-pin",
      "family": "maps",
      "name": "MapPin",
      "label": "Map pin",
      "description": "Absolutely positioned percentage-coordinate map pin that drops on mount and pulses when active.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/map-pin",
      "tags": [
        "map",
        "pin",
        "marker"
      ],
      "status": "captured"
    },
    {
      "key": "maps/service-radius-overlay",
      "family": "maps",
      "name": "ServiceRadiusOverlay",
      "label": "Service radius overlay",
      "description": "Concentric service-radius rings rendered inside a parent SVG, each with a faint stroke and a top label chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/service-radius",
      "tags": [
        "map",
        "overlay",
        "radius",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "maps/workshop-locator",
      "family": "maps",
      "name": "WorkshopLocator",
      "label": "Workshop locator",
      "description": "Interactive locator pairing a pinned map canvas with a selectable workshop list synced by active state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/workshop-locator",
      "tags": [
        "map",
        "locator",
        "interactive",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "maps/route-preview-line",
      "family": "maps",
      "name": "RoutePreviewLine",
      "label": "Route preview line",
      "description": "SVG quadratic-bezier route between two points with an animated dash and a mid-point distance + ETA chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/route-preview",
      "tags": [
        "map",
        "route",
        "path",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "maps/region-heatmap",
      "family": "maps",
      "name": "RegionHeatmap",
      "label": "Region heatmap",
      "description": "Hex-bin SVG heatmap grid with hover/focus tooltip bubble and a low/mid/high intensity legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/region-heatmap",
      "tags": [
        "map",
        "heatmap",
        "data-viz",
        "hexbin"
      ],
      "status": "captured"
    },
    {
      "key": "maps/suburb-finder-card",
      "family": "maps",
      "name": "SuburbFinderCard",
      "label": "Suburb finder card",
      "description": "Search card filtering suburbs by name or NSW postcode with a locate-me button and a top-5 results list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/suburb-finder",
      "tags": [
        "map",
        "search",
        "suburb",
        "postcode"
      ],
      "status": "captured"
    },
    {
      "key": "maps/distance-duration-chip",
      "family": "maps",
      "name": "DistanceDurationChip",
      "label": "Distance & duration chip",
      "description": "Compact chip showing distance, duration, and a traffic-toned status pip, announced via aria-live.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/distance-chip",
      "tags": [
        "map",
        "chip",
        "distance",
        "traffic"
      ],
      "status": "captured"
    },
    {
      "key": "maps/nearest-cta",
      "family": "maps",
      "name": "NearestCta",
      "label": "Nearest workshop CTA",
      "description": "Find-nearest section highlighting the closest workshop with a drive-time chip and a list of alternatives.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/nearest-cta",
      "tags": [
        "map",
        "cta",
        "nearest",
        "conversion"
      ],
      "status": "captured"
    },
    {
      "key": "maps/postcode-bounds-overlay",
      "family": "maps",
      "name": "PostcodeBoundsOverlay",
      "label": "Postcode bounds overlay",
      "description": "SVG polygon overlays for postcode boundaries, each with a tone class and an anchored postcode/suburb tag.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/postcode-bounds",
      "tags": [
        "map",
        "overlay",
        "postcode",
        "polygon"
      ],
      "status": "captured"
    },
    {
      "key": "maps/country-flag-picker",
      "family": "maps",
      "name": "CountryFlagPicker",
      "label": "Country flag picker",
      "description": "Searchable country listbox with minimalist abstract flag SVGs, priority ordering of top codes, and a selected value.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/country-flag-picker",
      "tags": [
        "picker",
        "country",
        "flag",
        "select"
      ],
      "status": "captured"
    },
    {
      "key": "maps/live-job-tracker-map",
      "family": "maps",
      "name": "LiveJobTrackerMap",
      "label": "Live job tracker map",
      "description": "Live field-ops map with an HQ centre marker and drifting technician pins animated via framer-motion (reduced-motion aware).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/maps",
      "routeHref": "/ui-primitives/maps/live-job-tracker",
      "tags": [
        "map",
        "live",
        "tracking",
        "motion"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
