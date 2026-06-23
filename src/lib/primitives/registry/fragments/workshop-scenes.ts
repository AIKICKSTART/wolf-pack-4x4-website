import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "workshop-scenes",
  "title": "Workshop scenes",
  "group": "Operations",
  "summary": "12 domain-specific composed surfaces for an automotive exhaust/muffler workshop — parts catalogue, job tickets, vehicle files, quote building/approval, fitment checks, supplier health, weld-bay allocation and scheduling, customer handover, the live job board, and mobile-tech tracking — built on shared chart, calendar, data-display, and primitive components.",
  "entries": [
    {
      "key": "workshop-scenes/parts-catalog-card",
      "family": "workshop-scenes",
      "name": "PartsCatalogCard",
      "label": "Parts catalog card",
      "description": "Catalogue card showing a part's SKU, thumbnail, supplier/fitment/stock chips, AUD RRP, and an add-to-quote action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/parts-catalog",
      "tags": [
        "parts",
        "catalog",
        "stock",
        "automotive"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/job-ticket",
      "family": "workshop-scenes",
      "name": "JobTicket",
      "label": "Job ticket",
      "description": "Workshop job ticket with customer/vehicle identity, status and bay chips, service list, a time-budget progress bar, and photo-evidence strip plus action buttons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/job-ticket",
      "tags": [
        "job",
        "ticket",
        "workshop",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/vehicle-profile-card",
      "family": "workshop-scenes",
      "name": "VehicleProfileCard",
      "label": "Vehicle profile card",
      "description": "Vehicle profile card with photo, year/make/model title, rego, engine/body spec grid, visit-history badge, and a link to the full vehicle file.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/vehicle-profile",
      "tags": [
        "vehicle",
        "profile",
        "rego",
        "automotive"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/quote-builder-workspace",
      "family": "workshop-scenes",
      "name": "QuoteBuilderWorkspace",
      "label": "Quote builder workspace",
      "description": "Three-column quote builder — draggable parts library, the quote draft with live AUD subtotal/labour/GST/grand-total math, and a customer/vehicle/notes context pane.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/quote-builder",
      "tags": [
        "quote",
        "builder",
        "pricing",
        "workspace"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/fitment-compatibility-checker",
      "family": "workshop-scenes",
      "name": "FitmentCompatibilityChecker",
      "label": "Fitment compatibility checker",
      "description": "Vehicle make/model/year selectors paired with a part-spec panel and a live status result (compatible / adapter / not-compatible) with explanatory copy.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/fitment-checker",
      "tags": [
        "fitment",
        "compatibility",
        "parts",
        "checker"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/supplier-dashboard",
      "family": "workshop-scenes",
      "name": "SupplierDashboard",
      "label": "Supplier dashboard",
      "description": "Supplier overview with PO/spend stat tiles, contact pane, media-readiness sparkline and health donut chart, and a top-moving-SKUs data table.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/supplier-dashboard",
      "tags": [
        "supplier",
        "dashboard",
        "data-viz",
        "procurement"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/weld-bay-allocation",
      "family": "workshop-scenes",
      "name": "WeldBayAllocation",
      "label": "Weld bay allocation",
      "description": "Bay-allocation scene showing rostered bay crew cards, an availability grid, and a drag-to-assign pool of unassigned jobs with estimate/priority chips.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/weld-bay-allocation",
      "tags": [
        "bay",
        "allocation",
        "scheduling",
        "drag-drop"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/handover-checklist",
      "family": "workshop-scenes",
      "name": "HandoverChecklist",
      "label": "Handover checklist",
      "description": "Stepped customer-handover surface — photo evidence, a playable exhaust sound demo, an invoice with GST totals and payment state, and send/print actions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/handover-checklist",
      "tags": [
        "handover",
        "checklist",
        "invoice",
        "customer"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/quote-card-stack",
      "family": "workshop-scenes",
      "name": "QuoteCardStack",
      "label": "Quote card stack",
      "description": "Stacked deck of pending quotes showing customer, vehicle, service chips and total, with approve/amend/decline actions enabled only on the top card.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/quote-card-stack",
      "tags": [
        "quote",
        "deck",
        "approval",
        "swipe"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/job-board",
      "family": "workshop-scenes",
      "name": "JobBoard",
      "label": "Job board",
      "description": "Workshop job board wrapping a Kanban board of stage columns with a titled header and a priority colour legend.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/job-board",
      "tags": [
        "job",
        "board",
        "kanban",
        "workflow"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/workshop-week-schedule",
      "family": "workshop-scenes",
      "name": "WorkshopWeekSchedule",
      "label": "Workshop week schedule",
      "description": "Time-grid bay schedule placing job events as positioned blocks across per-bay lanes over an hour-labelled day range.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/week-schedule",
      "tags": [
        "schedule",
        "calendar",
        "bays",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-scenes/mobile-tech-card",
      "family": "workshop-scenes",
      "name": "MobileTechCard",
      "label": "Mobile tech card",
      "description": "Mobile-technician status card with avatar, on-job/travelling/off-shift status pill, current job, ETA and distance, and call/message actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workshop-scenes",
      "routeHref": "/ui-primitives/workshop-scenes/mobile-tech",
      "tags": [
        "technician",
        "mobile",
        "status",
        "dispatch"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
