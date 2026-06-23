import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "customer-success",
  "title": "Customer success",
  "group": "Operations",
  "summary": "14 customer-success dashboard widgets — health scores, churn/expansion cards, retention and NPS charts, lifecycle and renewal surfaces, QBR and executive briefings — composing CRM, chart, and primitive building blocks for an AUD-denominated CS console.",
  "entries": [
    {
      "key": "customer-success/customer-health-score",
      "family": "customer-success",
      "name": "CustomerHealthScore",
      "label": "Customer health score",
      "description": "Health-score region with an AccountHealthMeter and per-factor chips bucketed by score, plus an optional quarter-over-quarter trend caption.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/customer-health-score",
      "tags": [
        "health",
        "score",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/cohort-retention-grid",
      "family": "customer-success",
      "name": "CohortRetentionGrid",
      "label": "Cohort retention grid",
      "description": "Heatmap table of monthly cohort retention percentages, color-bucketed per cell with an M3 average headline chip and a less/more retention legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/cohort-retention-grid",
      "tags": [
        "retention",
        "cohort",
        "heatmap"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/nps-trend-chart",
      "family": "customer-success",
      "name": "NpsTrendChart",
      "label": "NPS trend chart",
      "description": "Trailing NPS area chart of promoter/passive/detractor series with a computed latest-NPS headline and total-count chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/nps-trend-chart",
      "tags": [
        "nps",
        "chart",
        "trend"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/churn-risk-card",
      "family": "customer-success",
      "name": "ChurnRiskCard",
      "label": "Churn risk card",
      "description": "Churn-probability card with a bucketed progress bar, top risk-factor chips, and a suggested-intervention block with a CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/churn-risk-card",
      "tags": [
        "churn",
        "risk",
        "intervention"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/expansion-opportunity-card",
      "family": "customer-success",
      "name": "ExpansionOpportunityCard",
      "label": "Expansion opportunity card",
      "description": "Next-best-action expansion card showing a glyph, recommended action, expected AUD uplift, confidence chip, optional rationale, and a CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/expansion-opportunity-card",
      "tags": [
        "expansion",
        "upsell",
        "forecast"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/customer-journey-timeline",
      "family": "customer-success",
      "name": "CustomerJourneyTimeline",
      "label": "Customer journey timeline",
      "description": "Ordered lifecycle timeline marking past/current/future stages with glyphs, entered-on dates, and per-stage notes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/customer-journey-timeline",
      "tags": [
        "lifecycle",
        "timeline",
        "journey"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/feature-adoption-meter",
      "family": "customer-success",
      "name": "FeatureAdoptionMeter",
      "label": "Feature adoption meter",
      "description": "List of features with adopted/total ratios, percentage, month-over-month delta chips, and a tone-bucketed progress bar per row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/feature-adoption-meter",
      "tags": [
        "adoption",
        "feature",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/success-plan-checklist",
      "family": "customer-success",
      "name": "SuccessPlanChecklist",
      "label": "Success plan checklist",
      "description": "Client-side milestone checklist with expand/collapse detail, per-milestone state chips and glyphs, due dates, and a done/total progress count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/success-plan-checklist",
      "tags": [
        "success-plan",
        "checklist",
        "milestones"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/qbr-meeting-card",
      "family": "customer-success",
      "name": "QbrMeetingCard",
      "label": "QBR meeting card",
      "description": "Quarterly business review card with a formatted schedule stamp, numbered agenda with owners, and last-QBR outcome chips (win/risk/ask).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/qbr-meeting-card",
      "tags": [
        "qbr",
        "meeting",
        "agenda"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/at-risk-customers-list",
      "family": "customer-success",
      "name": "AtRiskCustomersList",
      "label": "At-risk customers list",
      "description": "DataTable of at-risk customers with avatar, health score and bucket chip, AUD lifetime value, last contact, and a per-row intervene action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/at-risk-customers-list",
      "tags": [
        "watchlist",
        "table",
        "at-risk"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/customer-segment-distribution",
      "family": "customer-success",
      "name": "CustomerSegmentDistribution",
      "label": "Customer segment distribution",
      "description": "Donut chart of the book of business split across strategic/growth/retention/win-back segments with a center total of customers.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/customer-segment-distribution",
      "tags": [
        "segments",
        "donut",
        "distribution"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/support-ticket-volume-card",
      "family": "customer-success",
      "name": "SupportTicketVolumeCard",
      "label": "Support ticket volume card",
      "description": "Support card pairing an open-tickets chip with volume and sentiment sparklines plus a sentiment-direction chip over a trailing window.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/support-ticket-volume-card",
      "tags": [
        "support",
        "tickets",
        "sentiment"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/renewal-pipeline-stage",
      "family": "customer-success",
      "name": "RenewalPipelineStage",
      "label": "Renewal pipeline stage",
      "description": "Renewal-opportunity card with stage chip, close-target date, ACV/weighted/likelihood tiles, a likelihood progress bar, and an optional next step.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/renewal-pipeline-stage",
      "tags": [
        "renewal",
        "pipeline",
        "acv"
      ],
      "status": "captured"
    },
    {
      "key": "customer-success/executive-briefing-card",
      "family": "customer-success",
      "name": "ExecutiveBriefingCard",
      "label": "Executive briefing card",
      "description": "Weekly briefing article splitting items into top wins, risks, and asks sections, each capped at three numbered items with optional metrics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-success",
      "routeHref": "/ui-primitives/customer-success/executive-briefing-card",
      "tags": [
        "briefing",
        "executive",
        "summary"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
