import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "crm",
  "title": "CRM",
  "group": "Operations",
  "summary": "14 customer-relationship primitives — customer and contact cards, deal-stage card and five-column pipeline kanban, activity log, lead-score and deal-value chips, stage-probability bar, touch-point timeline, circular account-health meter, segment chip, note composer, next-action card, and a quote-to-cash funnel.",
  "entries": [
    {
      "key": "crm/customer-card",
      "family": "crm",
      "name": "CustomerCard",
      "label": "Customer card",
      "description": "Full customer profile card with avatar, status/segment chips, phone/email/lifetime-value/last-contact facts, and optional action buttons or links.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/customer-card",
      "tags": [
        "customer",
        "profile",
        "contact"
      ],
      "status": "captured"
    },
    {
      "key": "crm/contact-card-mini",
      "family": "crm",
      "name": "ContactCardMini",
      "label": "Contact mini card",
      "description": "Compact contact card with avatar, name, role, and a primary-channel link (call/email/text/message).",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/contact-mini",
      "tags": [
        "contact",
        "compact",
        "channel"
      ],
      "status": "captured"
    },
    {
      "key": "crm/deal-stage-card",
      "family": "crm",
      "name": "DealStageCard",
      "label": "Deal stage card",
      "description": "Single-deal card showing color-coded stage, probability, deal/customer name, optional vehicle, value, expected close, and owner initials.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/deal-stage",
      "tags": [
        "deal",
        "stage",
        "pipeline"
      ],
      "status": "captured"
    },
    {
      "key": "crm/pipeline-kanban",
      "family": "crm",
      "name": "PipelineKanban",
      "label": "Pipeline kanban",
      "description": "Five-column deal pipeline (new/qualified/quoted/verbal/won) with per-stage counts and totals, selectable column headers, rendering DealStageCard per deal.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/pipeline-kanban",
      "tags": [
        "pipeline",
        "kanban",
        "deals"
      ],
      "status": "captured"
    },
    {
      "key": "crm/crm-activity-row",
      "family": "crm",
      "name": "CrmActivityRow",
      "label": "Activity row",
      "description": "Activity-log entry with actor avatar, verb chip, optional duration, timestamp, and an inline-expandable transcript.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/activity-row",
      "tags": [
        "activity",
        "log",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "crm/lead-score-chip",
      "family": "crm",
      "name": "LeadScoreChip",
      "label": "Lead score chip",
      "description": "0-100 lead-score chip with cold/warm/hot/blazing tone and an expandable popover breaking down engagement/fit/intent/recency factors.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/lead-score",
      "tags": [
        "lead",
        "score",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "crm/deal-value-chip",
      "family": "crm",
      "name": "DealValueChip",
      "label": "Deal value chip",
      "description": "Formatted currency-value chip with period (one-off/monthly/annual) and an optional likelihood multiplier showing weighted value.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/deal-value",
      "tags": [
        "deal",
        "value",
        "currency"
      ],
      "status": "captured"
    },
    {
      "key": "crm/stage-probability-bar",
      "family": "crm",
      "name": "StageProbabilityBar",
      "label": "Stage probability bar",
      "description": "Horizontal 0-100% probability meter with tick markers and an optional legend at the typical probability of each pipeline stage.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/stage-probability",
      "tags": [
        "probability",
        "stage",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "crm/touch-point-timeline",
      "family": "crm",
      "name": "TouchPointTimeline",
      "label": "Touch-point timeline",
      "description": "Vertical ordered list of customer touch points (call/email/SMS/in-person/DM/quote/invoice/payment) with glyphs, timestamps, and expandable threads.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/touch-point-timeline",
      "tags": [
        "timeline",
        "touch-point",
        "activity"
      ],
      "status": "captured"
    },
    {
      "key": "crm/account-health-meter",
      "family": "crm",
      "name": "AccountHealthMeter",
      "label": "Account health meter",
      "description": "Circular SVG health-score gauge with critical/watch/healthy/elite tone shift and an optional list of contributing factor tiles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/account-health",
      "tags": [
        "health",
        "score",
        "gauge"
      ],
      "status": "captured"
    },
    {
      "key": "crm/segment-chip",
      "family": "crm",
      "name": "SegmentChip",
      "label": "Segment chip",
      "description": "Customer-segment chip with glyph and label, rendering as a toggle button when an onToggle handler is provided, otherwise a static label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/segment-chip",
      "tags": [
        "segment",
        "chip",
        "tag"
      ],
      "status": "captured"
    },
    {
      "key": "crm/note-composer",
      "family": "crm",
      "name": "NoteComposer",
      "label": "Note composer",
      "description": "Customer-note textarea with @mention picker, tag input, pin toggle, and save action emitting body/tags/mentions/pinned with a toast.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/note-composer",
      "tags": [
        "note",
        "composer",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "crm/next-action-card",
      "family": "crm",
      "name": "NextActionCard",
      "label": "Next action card",
      "description": "Suggested-next-action card with urgency badge (low/soon/now/overdue), rationale, a primary action button, and a snooze menu (1h/1d/1w).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/next-action",
      "tags": [
        "next-action",
        "task",
        "urgency"
      ],
      "status": "captured"
    },
    {
      "key": "crm/quote-to-cash-funnel",
      "family": "crm",
      "name": "QuoteToCashFunnel",
      "label": "Quote-to-cash funnel",
      "description": "Tapering funnel across lead/qualified/quoted/approved/invoiced/paid stages with per-stage count, value, conversion percentage, and drop-off.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/crm",
      "routeHref": "/ui-primitives/crm/quote-to-cash",
      "tags": [
        "funnel",
        "conversion",
        "quote-to-cash"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
