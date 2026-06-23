import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "experiments",
  "title": "Experiments",
  "group": "Data",
  "summary": "14 A/B-test and experimentation primitives — hypothesis authoring, traffic allocation, sample-size/power planning, significance and stop-rule config, bandit and Bayesian/sequential analysis, decision recommendation and archive.",
  "entries": [
    {
      "key": "experiments/experiment-card",
      "family": "experiments",
      "name": "ExperimentCard",
      "label": "Experiment card",
      "description": "Glass dashboard card summarising an experiment's status, variants, sample size, significance and lift as toned chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/experiment-card",
      "tags": [
        "experiment",
        "summary",
        "chips"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/hypothesis-statement-card",
      "family": "experiments",
      "name": "HypothesisStatementCard",
      "label": "Hypothesis statement card",
      "description": "Mad-libs hypothesis editor with click-to-pick observation/change/outcome/metric/threshold chunks and a chip picker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/hypothesis-statement-card",
      "tags": [
        "hypothesis",
        "editor",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/variant-traffic-allocator",
      "family": "experiments",
      "name": "VariantTrafficAllocator",
      "label": "Variant traffic allocator",
      "description": "Stacked allocation bar with per-variant sliders and a numeric VariantPicker that validates weights sum to 100%.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/variant-traffic-allocator",
      "tags": [
        "traffic",
        "allocation",
        "sliders"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/sample-size-calculator",
      "family": "experiments",
      "name": "SampleSizeCalculator",
      "label": "Sample size calculator",
      "description": "Interactive binomial sample-size estimator computing required N per variant, total N and time-to-detect from baseline, MDE and power inputs.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/sample-size-calculator",
      "tags": [
        "sample-size",
        "calculator",
        "power"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/significance-threshold-setter",
      "family": "experiments",
      "name": "SignificanceThresholdSetter",
      "label": "Significance threshold setter",
      "description": "Radiogroup chip controls for selecting alpha, one/two-sided tail and multiple-comparisons correction.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/significance-threshold-setter",
      "tags": [
        "significance",
        "alpha",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/stat-power-gauge",
      "family": "experiments",
      "name": "StatPowerGauge",
      "label": "Statistical power gauge",
      "description": "Radial meter of current vs target statistical power with chips for current N and remaining sample needed.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/stat-power-gauge",
      "tags": [
        "power",
        "gauge",
        "radial"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/multi-arm-bandit-visualizer",
      "family": "experiments",
      "name": "MultiArmBanditVisualizer",
      "label": "Multi-arm bandit visualizer",
      "description": "Area chart of per-arm traffic share over steps with chips for algorithm, explore/exploit balance and predicted winner.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/multi-arm-bandit-visualizer",
      "tags": [
        "bandit",
        "chart",
        "explore-exploit"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/holdout-group-toggle",
      "family": "experiments",
      "name": "HoldoutGroupToggle",
      "label": "Holdout group toggle",
      "description": "Switch plus rollout slider and audience-filter chips to configure a holdout group's enablement and percent.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/holdout-group-toggle",
      "tags": [
        "holdout",
        "toggle",
        "audience"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/sequential-test-viewer",
      "family": "experiments",
      "name": "SequentialTestViewer",
      "label": "Sequential test viewer",
      "description": "Area chart of corrected (always-valid) vs naive p-values across peeks with an alpha boundary line and crossing chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/sequential-test-viewer",
      "tags": [
        "sequential",
        "p-value",
        "chart"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/bayesian-posterior-chart",
      "family": "experiments",
      "name": "BayesianPosteriorChart",
      "label": "Bayesian posterior chart",
      "description": "SVG posterior-density curves per variant with shaded 95% credible intervals and probability-to-beat-baseline legend chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/bayesian-posterior-chart",
      "tags": [
        "bayesian",
        "posterior",
        "svg-chart"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/decision-recommendation-card",
      "family": "experiments",
      "name": "DecisionRecommendationCard",
      "label": "Decision recommendation card",
      "description": "Material dashboard card stating the ship/iterate/stop recommendation with reasoning, expected impact and confidence chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/decision-recommendation-card",
      "tags": [
        "decision",
        "recommendation",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/experiment-archive",
      "family": "experiments",
      "name": "ExperimentArchive",
      "label": "Experiment archive",
      "description": "Zebra data table of past experiments with run dates, winning variant, final lift, decision chip and retrospective link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/experiment-archive",
      "tags": [
        "archive",
        "table",
        "history"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/stop-rule-editor",
      "family": "experiments",
      "name": "StopRuleEditor",
      "label": "Stop rule editor",
      "description": "Toggleable stop-condition chips (min-sample, significance, time, manual, guardrail) each with a numeric threshold input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/stop-rule-editor",
      "tags": [
        "stop-rule",
        "editor",
        "thresholds"
      ],
      "status": "captured"
    },
    {
      "key": "experiments/cuped-variance-reduction-chip",
      "family": "experiments",
      "name": "CupedVarianceReductionChip",
      "label": "CUPED variance reduction chip",
      "description": "Compact chip group reporting CUPED variance reduction, the covariate used and power-improvement points.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/experiments",
      "routeHref": "/ui-primitives/experiments/cuped-variance-reduction-chip",
      "tags": [
        "cuped",
        "variance",
        "chip"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
