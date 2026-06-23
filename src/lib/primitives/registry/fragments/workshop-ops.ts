import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "workshop-ops",
  "title": "Workshop ops",
  "group": "Operations",
  "summary": "14 automotive workshop operations primitives — service tickets, bay scheduling, crew shifts, parts pulls, customer 360, SMS, quoting, inspections, dyno results, payments, roadworthy certs, recalls, loyalty, and vehicle health — sharing a workshop-ops-types data contract with AU formatting and tone tokens.",
  "entries": [
    {
      "key": "workshop-ops/service-ticket-card",
      "family": "workshop-ops",
      "name": "ServiceTicketCard",
      "label": "Service ticket card",
      "description": "Work-order card showing vehicle, masked VIN, priority/status chips, a service line-item checklist with progress, bay/tech/ETA footer, and GST-inclusive total.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/service-ticket-card",
      "tags": [
        "workshop",
        "work-order",
        "ticket"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/bay-scheduler",
      "family": "workshop-ops",
      "name": "BayScheduler",
      "label": "Bay scheduler",
      "description": "Day-view bay schedule grid plotting draggable bookings across decimal hour ticks per workshop bay, with bay-state legend and a mechanic chip footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/bay-scheduler",
      "tags": [
        "workshop",
        "schedule",
        "bay",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/mechanic-shift-timeline",
      "family": "workshop-ops",
      "name": "MechanicShiftTimeline",
      "label": "Mechanic shift timeline",
      "description": "Per-mechanic shift matrix laying shift/break/sick/leave blocks along an hour scale, with crew avatars and a block-kind legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/mechanic-shift-timeline",
      "tags": [
        "workshop",
        "shifts",
        "crew",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/parts-pull-list",
      "family": "workshop-ops",
      "name": "PartsPullList",
      "label": "Parts pull list",
      "description": "Interactive parts-picking checklist with togglable pulled state, part number/supplier/bin, quantity, stock-tone chips, and a running parts subtotal.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/parts-pull-list",
      "tags": [
        "workshop",
        "parts",
        "inventory",
        "checklist"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/customer-360-card",
      "family": "workshop-ops",
      "name": "Customer360Card",
      "label": "Customer 360 card",
      "description": "Customer profile card with loyalty tier, lifetime-value sparkline, visits/contact stats, garage vehicle list, and an inbound/outbound comms timeline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/customer-360-card",
      "tags": [
        "crm",
        "customer",
        "profile",
        "loyalty"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/sms-conversation-thread",
      "family": "workshop-ops",
      "name": "SmsConversationThread",
      "label": "SMS conversation thread",
      "description": "Two-way SMS thread with in/out bubbles, per-message delivery-status chips, quick-reply template buttons, and a character-counted reply composer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/sms-conversation-thread",
      "tags": [
        "sms",
        "messaging",
        "comms",
        "customer"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/quote-builder-row",
      "family": "workshop-ops",
      "name": "QuoteBuilderRow",
      "label": "Quote builder",
      "description": "Quote line-item table computing labour rate and part markup totals into a subtotal, GST, and grand-total breakdown with kind chips per row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/quote-builder-row",
      "tags": [
        "quote",
        "invoice",
        "pricing",
        "gst"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/vehicle-inspection-checklist",
      "family": "workshop-ops",
      "name": "VehicleInspectionChecklist",
      "label": "Vehicle inspection checklist",
      "description": "Pre-service inspection sheet grouping pass/warn/fail/skip items into sections, with an overall verdict, result tally, and per-item glyphs and notes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/vehicle-inspection-checklist",
      "tags": [
        "inspection",
        "checklist",
        "safety",
        "workshop"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/dyno-run-card",
      "family": "workshop-ops",
      "name": "DynoRunCard",
      "label": "Dyno run card",
      "description": "Dyno result card rendering before/after power and torque SVG curves with peak kW/Nm/RPM stats and signed gain deltas.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/dyno-run-card",
      "tags": [
        "dyno",
        "performance",
        "chart",
        "tuning"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/payment-collection-card",
      "family": "workshop-ops",
      "name": "PaymentCollectionCard",
      "label": "Payment collection card",
      "description": "Payment capture card with GST-inclusive amount due, status chip, a provider radiogroup (Stripe/Square/Tyro/cash), and capture/receipt plus refund actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/payment-collection-card",
      "tags": [
        "payments",
        "invoice",
        "checkout",
        "gst"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/roadworthy-cert-card",
      "family": "workshop-ops",
      "name": "RoadworthyCertCard",
      "label": "Roadworthy cert card",
      "description": "NSW pink/blue-slip roadworthy certificate card with status chip, vehicle and inspector facts, fault count, and an eSafety ERV verification footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/roadworthy-cert-card",
      "tags": [
        "roadworthy",
        "certificate",
        "compliance",
        "nsw"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/recall-notice-row",
      "family": "workshop-ops",
      "name": "RecallNoticeRow",
      "label": "Recall notice row",
      "description": "Manufacturer recall row with severity (incl. stop-drive badge) and status chips, affected/reached fleet metrics, a reach-progress bar, and a batch SMS reach-out action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/recall-notice-row",
      "tags": [
        "recall",
        "compliance",
        "fleet",
        "campaign"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/loyalty-stamp-card",
      "family": "workshop-ops",
      "name": "LoyaltyStampCard",
      "label": "Loyalty stamp card",
      "description": "Punch-card style loyalty card rendering a muffler-icon stamp grid with current/total progress, reward-ready badge, and joined/last-visit facts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/loyalty-stamp-card",
      "tags": [
        "loyalty",
        "rewards",
        "customer",
        "retention"
      ],
      "status": "captured"
    },
    {
      "key": "workshop-ops/vehicle-health-tile",
      "family": "workshop-ops",
      "name": "VehicleHealthTile",
      "label": "Vehicle health tile",
      "description": "Vehicle health summary tile with last/next service window, overdue-or-due-soon countdown, and radial condition dials for oil, brakes, and tyres.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workshop-ops",
      "routeHref": "/ui-primitives/workshop-ops/vehicle-health-tile",
      "tags": [
        "vehicle",
        "health",
        "service",
        "maintenance"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
