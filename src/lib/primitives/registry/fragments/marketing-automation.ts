import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "marketing-automation",
  "title": "Marketing automation",
  "group": "Marketing",
  "summary": "14 lifecycle-marketing primitives — journey canvas, drip/nudge cadences, lead scoring, audience logic, send-time and creative-variant optimisation, consent, budget pacing and engagement-decay viz — all sharing a typed channel/tone/consent/pacing vocabulary.",
  "entries": [
    {
      "key": "marketing-automation/journey-canvas",
      "family": "marketing-automation",
      "name": "JourneyCanvas",
      "label": "Journey canvas",
      "description": "Grid-positioned automation-journey map that draws SVG bezier edges (default/yes/no/fallback) between configurable JourneyNodeCards with a live-count header and edge legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/journey-canvas",
      "tags": [
        "journey",
        "automation",
        "flow",
        "canvas"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/journey-node-card",
      "family": "marketing-automation",
      "name": "JourneyNodeCard",
      "label": "Journey node card",
      "description": "Single automation-journey node tile (trigger/wait/condition/action/goal/exit) with a kind glyph, title/subtitle, active state and an optional Configure button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/journey-node-card",
      "tags": [
        "journey",
        "node",
        "automation"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/drip-sequence-row",
      "family": "marketing-automation",
      "name": "DripSequenceRow",
      "label": "Drip sequence row",
      "description": "Indexed drip-campaign step row showing channel glyph, delay/predicate chips, message preview, open/click rates and a status pill.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/drip-sequence-row",
      "tags": [
        "drip",
        "sequence",
        "cadence",
        "email"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/lead-score-matrix",
      "family": "marketing-automation",
      "name": "LeadScoreMatrix",
      "label": "Lead score matrix",
      "description": "Firmographic-by-behavioural heatmap grid of lead scores with five-step heat shading, an MQL-to-SQL threshold callout and a score legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/lead-score-matrix",
      "tags": [
        "lead-scoring",
        "heatmap",
        "matrix",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/audience-builder",
      "family": "marketing-automation",
      "name": "AudienceBuilder",
      "label": "Audience builder",
      "description": "Segment builder with AND/OR predicate groups (attribute/behaviour/lifecycle/geo/vehicle/tag/negation), per-group operator toggles and a live estimated-reach readout with delta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/audience-builder",
      "tags": [
        "audience",
        "segmentation",
        "predicates",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/abandoned-quote-nudge",
      "family": "marketing-automation",
      "name": "AbandonedQuoteNudge",
      "label": "Abandoned quote nudge",
      "description": "Abandoned-quote recovery card showing AUD quote value, a multi-step wait/channel cadence with sent/queued/skipped status, and an incentive offer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/abandoned-quote-nudge",
      "tags": [
        "recovery",
        "nudge",
        "quote",
        "cadence"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/win-back-campaign-card",
      "family": "marketing-automation",
      "name": "WinBackCampaignCard",
      "label": "Win-back campaign card",
      "description": "Lapsed-cohort win-back card with cohort size, an 8-week recover-trend sparkline, predicted recovers, projected AUD revenue, baseline reactivation rate and incentive.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/win-back-campaign-card",
      "tags": [
        "win-back",
        "cohort",
        "reactivation",
        "campaign"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/goal-funnel-card",
      "family": "marketing-automation",
      "name": "GoalFunnelCard",
      "label": "Goal funnel card",
      "description": "Conversion-goal funnel with per-step horizontal bars, step counts and drop-off percentages, plus a computed end-to-end conversion rate and AUD value summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/goal-funnel-card",
      "tags": [
        "funnel",
        "conversion",
        "goal",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/personalization-token-row",
      "family": "marketing-automation",
      "name": "PersonalizationTokenRow",
      "label": "Personalization token row",
      "description": "Merge-token reference row showing the token expression, its backing source, an inline merged-value preview and the fallback used when the value is missing.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/personalization-token-row",
      "tags": [
        "personalization",
        "merge-token",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/send-time-optimizer",
      "family": "marketing-automation",
      "name": "SendTimeOptimizer",
      "label": "Send-time optimizer",
      "description": "Per-recipient send-time predictor listing each contact's best slot vs previous slot with a confidence percentage and high/medium/low confidence banding.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/send-time-optimizer",
      "tags": [
        "send-time",
        "optimization",
        "confidence",
        "scheduling"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/creative-variant-card",
      "family": "marketing-automation",
      "name": "CreativeVariantCard",
      "label": "Creative variant card",
      "description": "A/B creative variant card showing subject/body, open/click/conversion rates, traffic-split weight bar and a winner/loser/running/tied signal chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/creative-variant-card",
      "tags": [
        "ab-test",
        "creative",
        "variant",
        "experiment"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/consent-state-tile",
      "family": "marketing-automation",
      "name": "ConsentStateTile",
      "label": "Consent state tile",
      "description": "Marketing-consent compliance tile with contact identity, consent status, opt-in/double-confirm/last-broadcast audit timeline and an unsubscribe link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/consent-state-tile",
      "tags": [
        "consent",
        "compliance",
        "opt-in",
        "audit"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/campaign-budget-panel",
      "family": "marketing-automation",
      "name": "CampaignBudgetPanel",
      "label": "Campaign budget panel",
      "description": "Daily-budget pacing panel with budget/spent/projected AUD totals, a pacing status pill and an SVG cumulative spend curve plotting actual spend against ideal pace.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/campaign-budget-panel",
      "tags": [
        "budget",
        "pacing",
        "spend",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "marketing-automation/engagement-decay-chart",
      "family": "marketing-automation",
      "name": "EngagementDecayChart",
      "label": "Engagement decay chart",
      "description": "Multi-channel engagement half-life chart drawing per-channel decay curves with half-life markers, per-channel summary tiles and a channel legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketing-automation",
      "routeHref": "/ui-primitives/marketing-automation/engagement-decay-chart",
      "tags": [
        "engagement",
        "decay",
        "half-life",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
