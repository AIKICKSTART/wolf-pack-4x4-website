import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "ab-runtime",
  "title": "A/B Runtime",
  "group": "Data",
  "summary": "14 experimentation primitives for running A/B tests: dashboards, variant editing, stat-sig math, traffic allocation, holdouts, lift/segment/funnel viz, early-stopping, SRM detection, decision recommendations, history rows, and feature-flag links.",
  "entries": [
    {
      "key": "ab-runtime/experiment-dashboard-card",
      "family": "ab-runtime",
      "name": "ExperimentDashboardCard",
      "label": "Experiment Dashboard Card",
      "description": "Experiment summary card with status, arms list (winner-flagged), exposure, primary metric, lift, and chip strip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/experiment-dashboard-card",
      "tags": [
        "experiment",
        "dashboard",
        "ab-test"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/variant-editor-pair",
      "family": "ab-runtime",
      "name": "VariantEditorPair",
      "label": "Variant Editor Pair",
      "description": "Side-by-side control vs treatment headline/body editor with live character-diff chips (controlled or uncontrolled).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/variant-editor-pair",
      "tags": [
        "editor",
        "variant",
        "diff"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/stat-sig-calculator",
      "family": "ab-runtime",
      "name": "StatSigCalculator",
      "label": "Stat-Sig Calculator",
      "description": "Interactive two-proportion z-test calculator computing p-value, z-score, lift, and power from per-arm visitors and rates.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/stat-sig-calculator",
      "tags": [
        "statistics",
        "calculator",
        "p-value"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/allocation-slider",
      "family": "ab-runtime",
      "name": "AllocationSlider",
      "label": "Allocation Slider",
      "description": "Per-arm traffic allocation sliders with a stacked color bar and live sum-to-100 validation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/allocation-slider",
      "tags": [
        "allocation",
        "traffic",
        "slider"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/holdout-audience-card",
      "family": "ab-runtime",
      "name": "HoldoutAudienceCard",
      "label": "Holdout Audience Card",
      "description": "Holdout group card showing holdout percentage, exclude rules as field/operator/value chips, and estimated size.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/holdout-audience-card",
      "tags": [
        "holdout",
        "audience",
        "exclude-rules"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/lift-chart",
      "family": "ab-runtime",
      "name": "LiftChart",
      "label": "Lift Chart",
      "description": "SVG line chart of daily lift over control with a smoothed confidence-interval band and zero baseline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/lift-chart",
      "tags": [
        "chart",
        "lift",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/primary-metric-tile",
      "family": "ab-runtime",
      "name": "PrimaryMetricTile",
      "label": "Primary Metric Tile",
      "description": "Headline metric tile with value, delta, significance star rating, and p-value footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/primary-metric-tile",
      "tags": [
        "metric",
        "tile",
        "kpi"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/segment-breakdown-row",
      "family": "ab-runtime",
      "name": "SegmentBreakdownRow",
      "label": "Segment Breakdown Row",
      "description": "Single-segment lift row with a centered diverging bar, segment glyph/label, lift value, and sample size.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/segment-breakdown-row",
      "tags": [
        "segment",
        "breakdown",
        "lift"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/funnel-impact-row",
      "family": "ab-runtime",
      "name": "FunnelImpactRow",
      "label": "Funnel Impact Row",
      "description": "Funnel step row comparing control vs treatment conversion rates with a colored relative-delta badge.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/funnel-impact-row",
      "tags": [
        "funnel",
        "conversion",
        "step"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/early-stopping-card",
      "family": "ab-runtime",
      "name": "EarlyStoppingCard",
      "label": "Early Stopping Card",
      "description": "Card listing futility/superiority stopping rules with off/armed/triggered states, thresholds, and min-sample chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/early-stopping-card",
      "tags": [
        "early-stopping",
        "rules",
        "futility"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/experiment-history-row",
      "family": "ab-runtime",
      "name": "ExperimentHistoryRow",
      "label": "Experiment History Row",
      "description": "Past-experiment row with date range, name, final lift, outcome badge (shipped/iterated/killed/inconclusive), and duration.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/experiment-history-row",
      "tags": [
        "history",
        "outcome",
        "archive"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/srm-warning-banner",
      "family": "ab-runtime",
      "name": "SrmWarningBanner",
      "label": "SRM Warning Banner",
      "description": "Sample-ratio-mismatch alert banner (warning/critical) showing chi-square p-value and per-arm observed vs expected splits.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/srm-warning-banner",
      "tags": [
        "srm",
        "alert",
        "diagnostics"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/decision-recommendation-card",
      "family": "ab-runtime",
      "name": "DecisionRecommendationCard",
      "label": "Decision Recommendation Card",
      "description": "Auto-generated decision card (ship/iterate/kill/keep-running) with rationale list, confidence bar, impact, and owner.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/decision-recommendation-card",
      "tags": [
        "decision",
        "recommendation",
        "rollout"
      ],
      "status": "captured"
    },
    {
      "key": "ab-runtime/feature-flag-link-row",
      "family": "ab-runtime",
      "name": "FeatureFlagLinkRow",
      "label": "Feature Flag Link Row",
      "description": "Clickable Next.js Link row linking an experiment to a feature flag, showing environment pill, status, and rollout bar.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ab-runtime",
      "routeHref": "/ui-primitives/ab-runtime/feature-flag-link-row",
      "tags": [
        "feature-flag",
        "link",
        "rollout"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
