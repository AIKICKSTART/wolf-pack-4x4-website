import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "marketing-campaigns",
  "title": "Marketing campaigns",
  "group": "Marketing",
  "summary": "14 campaign-orchestration primitives — cards, builders, and dashboards for audience segmentation, A/B testing, channel mix, scheduling, goals, creatives, deliverability, send-time, live results, funnels, templates, UTMs, and drip sequences.",
  "entries": [
    {
      "key": "marketing-campaigns/campaign-card",
      "family": "marketing-campaigns",
      "name": "CampaignCard",
      "label": "Campaign card",
      "description": "Summary card showing a campaign's name, objective, status chip, channels, formatted audience size, and send window.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/campaign-card",
      "tags": [
        "campaign",
        "card",
        "summary"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/audience-segment-builder",
      "family": "marketing-campaigns",
      "name": "AudienceSegmentBuilder",
      "label": "Audience segment builder",
      "description": "Interactive builder of AND/OR rule groups (attribute/behavior/event/negation chips plus tag inputs) with a live audience-size estimate.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/audience-segment",
      "tags": [
        "audience",
        "segmentation",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/ab-variant-editor",
      "family": "marketing-campaigns",
      "name": "ABVariantEditor",
      "label": "A/B variant editor",
      "description": "Tabbed A/B variant editor with per-variant subject/preview, adjustable split weights, and a winner-rule selector (opens/clicks/revenue/manual).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/ab-variant",
      "tags": [
        "a/b-test",
        "variants",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/channel-mix-picker",
      "family": "marketing-campaigns",
      "name": "ChannelMixPicker",
      "label": "Channel mix picker",
      "description": "Channel toggle set with per-channel cost and reach chips, feeding an optional included channel-matrix below the toggles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/channel-mix",
      "tags": [
        "channels",
        "reach",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/schedule-launcher",
      "family": "marketing-campaigns",
      "name": "ScheduleLauncher",
      "label": "Schedule launcher",
      "description": "Send-scheduling control offering now / specific-time / recurring / send-time-optimized modes with datetime and timezone selection.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/schedule-launcher",
      "tags": [
        "schedule",
        "launch",
        "timezone"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/goal-kpi-selector",
      "family": "marketing-campaigns",
      "name": "GoalKpiSelector",
      "label": "Goal KPI selector",
      "description": "Goal picker that selects a primary KPI and lets the user set a numeric target with the goal's unit, seeded from suggested targets.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/goal-kpi",
      "tags": [
        "goal",
        "kpi",
        "target"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/creative-gallery",
      "family": "marketing-campaigns",
      "name": "CreativeGallery",
      "label": "Creative gallery",
      "description": "Filterable gallery of creative assets by channel with multi-select toggling for choosing campaign creatives.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/creative-gallery",
      "tags": [
        "creatives",
        "gallery",
        "assets"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/subject-line-tester",
      "family": "marketing-campaigns",
      "name": "SubjectLineTester",
      "label": "Subject line tester",
      "description": "Subject-line input with a heuristic spam-score chip and AI-suggested alternates to swap in.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/subject-tester",
      "tags": [
        "email",
        "subject",
        "deliverability"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/send-time-optimizer",
      "family": "marketing-campaigns",
      "name": "SendTimeOptimizer",
      "label": "Send time optimizer",
      "description": "Open-rate heatmap calendar with a recommended send window and lift, plus an optional manual hour override.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/send-time",
      "tags": [
        "send-time",
        "heatmap",
        "optimization"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/real-time-results-card",
      "family": "marketing-campaigns",
      "name": "RealTimeResultsCard",
      "label": "Real-time results card",
      "description": "Live results card rendering sent/delivered/opened/clicked/bounced metric tiles with deltas and per-tile sparkline trends.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/real-time-results",
      "tags": [
        "results",
        "metrics",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/conversion-funnel-card",
      "family": "marketing-campaigns",
      "name": "ConversionFunnelCard",
      "label": "Conversion funnel card",
      "description": "Funnel card charting step counts as a bar series and computing the overall conversion rate from first to last step.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/conversion-funnel",
      "tags": [
        "funnel",
        "conversion",
        "chart"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/campaign-template-chooser",
      "family": "marketing-campaigns",
      "name": "CampaignTemplateChooser",
      "label": "Campaign template chooser",
      "description": "Tabbed chooser splitting shared-library and private campaign templates with channel chips and copy/favourite actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/template-chooser",
      "tags": [
        "templates",
        "library",
        "chooser"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/utm-parameter-builder",
      "family": "marketing-campaigns",
      "name": "UtmParameterBuilder",
      "label": "UTM parameter builder",
      "description": "Form for source/medium/campaign/term/content UTM fields that assembles and copies the tagged tracking URL.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/utm-builder",
      "tags": [
        "utm",
        "tracking",
        "url"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-campaigns/drip-sequence-editor",
      "family": "marketing-campaigns",
      "name": "DripSequenceEditor",
      "label": "Drip sequence editor",
      "description": "Workflow-canvas editor laying out a trigger and touchpoint nodes vertically to define a multi-step drip sequence.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-campaigns",
      "routeHref": "/ui-primitives/marketing-campaigns/drip-sequence",
      "tags": [
        "drip",
        "sequence",
        "workflow"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
