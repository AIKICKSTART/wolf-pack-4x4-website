import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "sales-leads",
  "title": "Sales leads",
  "group": "Operations",
  "summary": "Lead-management surfaces for the muffler shop: lead cards, scoring, qualification, source/ROI analytics, call logging, follow-up cadence, assignment rules, SLA timing, enrichment, and CSV import — composed into a full lead console.",
  "entries": [
    {
      "key": "sales-leads/lead-card",
      "family": "sales-leads",
      "name": "LeadCard",
      "label": "Lead card",
      "description": "Lead summary card with avatar, vehicle, source chip, score chip with breakdown popover, first-touch time and assignee.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/lead-card",
      "tags": [
        "lead",
        "card",
        "crm"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-source-mix-donut",
      "family": "sales-leads",
      "name": "LeadSourceMixDonut",
      "label": "Lead source mix",
      "description": "Donut chart breaking down lead volume by source over the last 30 days with a total count center label.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/source-mix",
      "tags": [
        "donut",
        "source",
        "analytics"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/qualification-checklist",
      "family": "sales-leads",
      "name": "QualificationChecklist",
      "label": "Qualification checklist",
      "description": "BANT/MEDDIC qualification checklist with cycleable met/partial/missing/unknown criterion statuses and notes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/qualification-checklist",
      "tags": [
        "qualification",
        "bant",
        "meddic"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-score-breakdown",
      "family": "sales-leads",
      "name": "LeadScoreBreakdown",
      "label": "Lead score breakdown",
      "description": "Lead score panel with temperature chip, progress bar and a list of weighted positive/negative scoring signals with reasoning.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/score-breakdown",
      "tags": [
        "score",
        "signals",
        "temperature"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/inquiry-form-capture",
      "family": "sales-leads",
      "name": "InquiryFormCapture",
      "label": "Inquiry form capture",
      "description": "Inquiry form analytics card showing overall submission rate plus per-field conversion rates with sparklines.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/inquiry-capture",
      "tags": [
        "form",
        "conversion",
        "capture"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/phone-call-log-row",
      "family": "sales-leads",
      "name": "PhoneCallLogRow",
      "label": "Phone call log row",
      "description": "Call log row with direction glyph, caller details, duration, outcome chip and an expandable recording player.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/call-log",
      "tags": [
        "call",
        "log",
        "telephony"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-to-quote-funnel",
      "family": "sales-leads",
      "name": "LeadToQuoteFunnel",
      "label": "Lead-to-quote funnel",
      "description": "Conversion funnel across lead/MQL/SQL/quote/won stages with per-stage counts, drop-off, conversion percent and pipeline value.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/funnel",
      "tags": [
        "funnel",
        "conversion",
        "pipeline"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-assignment-rules",
      "family": "sales-leads",
      "name": "LeadAssignmentRules",
      "label": "Lead assignment rules",
      "description": "Reorderable list of lead routing rules with condition chips (region/source/value/segment), assignee and 30-day match counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/assignment-rules",
      "tags": [
        "routing",
        "rules",
        "assignment"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/follow-up-cadence-card",
      "family": "sales-leads",
      "name": "FollowUpCadenceCard",
      "label": "Follow-up cadence",
      "description": "Follow-up cadence timeline of multi-channel touchpoints (call/email/sms/dm/visit) with day offsets and per-step status.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/follow-up-cadence",
      "tags": [
        "cadence",
        "follow-up",
        "sequence"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-source-roi-table",
      "family": "sales-leads",
      "name": "LeadSourceRoiTable",
      "label": "Lead source ROI table",
      "description": "Data table of lead-source ROI with spend, leads, cost-per-lead, quote conversion, closed-won and attributed revenue.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/roi-table",
      "tags": [
        "roi",
        "table",
        "attribution"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/enrichment-status-chip",
      "family": "sales-leads",
      "name": "EnrichmentStatusChip",
      "label": "Enrichment status chip",
      "description": "Chip showing enriched-field completion ratio with a popover listing the contributing enrichment providers.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/enrichment-chip",
      "tags": [
        "enrichment",
        "chip",
        "data"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lost-reason-pareto",
      "family": "sales-leads",
      "name": "LostReasonPareto",
      "label": "Lost reason Pareto",
      "description": "Pareto chart of lost-deal reasons sorted descending with cumulative percentage and an 80% threshold callout.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/lost-reason-pareto",
      "tags": [
        "pareto",
        "lost",
        "analytics"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/sla-response-timer",
      "family": "sales-leads",
      "name": "SlaResponseTimer",
      "label": "SLA response timer",
      "description": "Live countdown radial tracking remaining time against a lead response SLA with fresh/due-soon/overdue/missed tones.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/sla-timer",
      "tags": [
        "sla",
        "timer",
        "response"
      ],
      "status": "captured"
    },
    {
      "key": "sales-leads/lead-import-wizard",
      "family": "sales-leads",
      "name": "LeadImportWizard",
      "label": "Lead import wizard",
      "description": "Multi-step CSV lead import flow: upload, column mapping with confidence, dedupe and preview table before import.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/sales-leads",
      "routeHref": "/ui-primitives/sales-leads/lead-import",
      "tags": [
        "import",
        "wizard",
        "csv"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
