import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "workshop-floor-live",
  "title": "Workshop floor live",
  "group": "Operations",
  "summary": "14 real-time workshop-floor surfaces — bay status cards, a top-down floor plan, live job/dyno/sound readouts, parts-pull and handover banners, queue and waiting-area panels, and a revenue pulse — for an at-a-glance operations dashboard.",
  "entries": [
    {
      "key": "workshop-floor-live/bay-live-status-card",
      "family": "workshop-floor-live",
      "name": "BayLiveStatusCard",
      "label": "Bay live status card",
      "description": "Per-bay live status card showing state, vehicle/customer, assigned technician, striped progress bar, elapsed time and handover ETA; collapses to a clear-bay message when idle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/bay-status",
      "tags": [
        "bay",
        "status",
        "live",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/workshop-floor-plan",
      "family": "workshop-floor-live",
      "name": "WorkshopFloorPlan",
      "label": "Workshop floor plan",
      "description": "Top-down SVG floor plan of four bays, roller door, parts area, dyno cell, office and hoist, with technician avatars positioned over their live locations.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/floor-plan",
      "tags": [
        "floor-plan",
        "svg",
        "bays",
        "technicians"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/live-job-progress-strip",
      "family": "workshop-floor-live",
      "name": "LiveJobProgressStrip",
      "label": "Live job progress strip",
      "description": "Compact job header with overall percent bar and an ordered checkpoint stepper marking done/active/pending/skipped stages with timestamps.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/job-progress",
      "tags": [
        "job",
        "progress",
        "checkpoints",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/technician-location-pin",
      "family": "workshop-floor-live",
      "name": "TechnicianLocationPin",
      "label": "Technician location pin",
      "description": "Technician card with avatar status dot, name and role, a location chip and an optional current-activity verb.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/tech-pin",
      "tags": [
        "technician",
        "location",
        "avatar"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/next-up-queue",
      "family": "workshop-floor-live",
      "name": "NextUpQueue",
      "label": "Next up queue",
      "description": "Numbered waiting-list of upcoming jobs showing vehicle, customer, service and booking time with pre-allocated bay and arrived/en-route chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/next-up",
      "tags": [
        "queue",
        "bookings",
        "waitlist"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/bay-hourly-utilisation",
      "family": "workshop-floor-live",
      "name": "BayHourlyUtilisation",
      "label": "Bay-hour utilisation",
      "description": "Heatmap grid of per-bay hourly utilisation bucketed idle→peak across the workshop day, with column hour headers and a tone legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/bay-hourly",
      "tags": [
        "utilisation",
        "heatmap",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/incoming-customer-banner",
      "family": "workshop-floor-live",
      "name": "IncomingCustomerBanner",
      "label": "Incoming customer banner",
      "description": "Live status banner announcing an arriving customer with vehicle, ETA, booked service and optional pre-assigned bay and phone chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/incoming-customer",
      "tags": [
        "banner",
        "arrival",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/parts-pull-request-row",
      "family": "workshop-floor-live",
      "name": "PartsPullRequestRow",
      "label": "Parts pull request row",
      "description": "Single parts-pull request row with SKU, part name, quantity, sourcing bay, requester/time and a status chip driven by the pull state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/parts-pull",
      "tags": [
        "parts",
        "request",
        "row",
        "inventory"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/live-sound-band-chip",
      "family": "workshop-floor-live",
      "name": "LiveSoundBandChip",
      "label": "Live sound band chip",
      "description": "Live dyno sound readout showing measured dB(A) against the ADR limit and test RPM, classified into an ADR compliance band chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/sound-band",
      "tags": [
        "sound",
        "decibel",
        "adr",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/bay-camera-feed-card",
      "family": "workshop-floor-live",
      "name": "BayCameraFeedCard",
      "label": "Bay camera feed card",
      "description": "Bay CCTV feed card with a scanline/grid viewport, timecode and expand control, quality chip (live/buffered/offline) and last-snapshot meta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/bay-camera",
      "tags": [
        "camera",
        "cctv",
        "feed",
        "live"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/handover-ready-banner",
      "family": "workshop-floor-live",
      "name": "HandoverReadyBanner",
      "label": "Handover ready banner",
      "description": "Job-complete banner signalling a vehicle is ready for handover, with photo-count, sound-clip and front-desk/SMS notification chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/handover-ready",
      "tags": [
        "handover",
        "banner",
        "complete",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/dyno-active-readout",
      "family": "workshop-floor-live",
      "name": "DynoActiveReadout",
      "label": "Dyno active readout",
      "description": "Live dyno-cell readout with an RPM radial meter and stat tiles for peak kW, peak torque and lambda, the latter tone-graded against the target air/fuel band.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/dyno-active",
      "tags": [
        "dyno",
        "readout",
        "gauge",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/customer-waiting-area",
      "family": "workshop-floor-live",
      "name": "CustomerWaitingArea",
      "label": "Customer waiting area",
      "description": "Front-of-house panel listing waiting customers with avatars, wait time and offer chips, plus headline metrics for count, next-wait estimate and coffees poured.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/waiting-area",
      "tags": [
        "waiting",
        "customers",
        "front-of-house"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-floor-live/live-revenue-pulse",
      "family": "workshop-floor-live",
      "name": "LiveRevenuePulse",
      "label": "Live revenue pulse",
      "description": "Live revenue counter wrapping a LiveCounterCard with today's AUD billed, jobs completed, a vs-yesterday delta and an hourly trend sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-floor-live",
      "routeHref": "/ui-primitives/workshop-floor-live/revenue-pulse",
      "tags": [
        "revenue",
        "counter",
        "sparkline",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
