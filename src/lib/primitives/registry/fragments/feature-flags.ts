import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "feature-flags",
  "title": "Feature flags + experimentation",
  "group": "System",
  "summary": "14 feature-flag + experimentation console primitives — flag cards, a composed detail pane, rollout slider, variant weights, targeting rules, audiences, environment tabs, search/filter, kill switch, experiment results, dependency graph, audit log, canary bar and a feature-gate preview.",
  "entries": [
    {
      "key": "feature-flags/flag-card",
      "family": "feature-flags",
      "name": "FlagCard",
      "label": "Flag card",
      "description": "Stateful flag card with name/key, an on/off toggle switch, tone-coded environment chips, optional variant weight chips and last-modified/owner meta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/flag-card",
      "tags": [
        "feature-flag",
        "toggle",
        "environment"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/flag-detail-pane",
      "family": "feature-flags",
      "name": "FlagDetailPane",
      "label": "Flag detail pane",
      "description": "Slot-based detail composition with env-status badges plus variants/rollout/rules/kill-switch regions, a recent-changes timeline and optional linked experiments.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/flag-detail-pane",
      "tags": [
        "feature-flag",
        "composition",
        "detail"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/rollout-slider",
      "family": "feature-flags",
      "name": "RolloutSlider",
      "label": "Rollout slider",
      "description": "Controlled/uncontrolled 0-100% rollout slider with tone-shifting fill, 0/25/50/75/100 snap points, pointer drag and full keyboard support with aria-valuenow.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/rollout-slider",
      "tags": [
        "rollout",
        "slider",
        "keyboard"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/variant-picker",
      "family": "feature-flags",
      "name": "VariantPicker",
      "label": "Variant picker",
      "description": "Stateful A/B/C variant picker with per-variant numeric weight inputs and a sum-must-equal-100% total indicator that flips tone when invalid.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/variant-picker",
      "tags": [
        "experiment",
        "variants",
        "weights"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/targeting-rule-row",
      "family": "feature-flags",
      "name": "TargetingRuleRow",
      "label": "Targeting rule row",
      "description": "Editable targeting rule row pairing a subject select (user/workspace/role/geo/device), an operator select and a tag-input value list with add/remove.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/targeting-rule-row",
      "tags": [
        "targeting",
        "rule",
        "tags"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/audience-filter-card",
      "family": "feature-flags",
      "name": "AudienceFilterCard",
      "label": "Audience filter card",
      "description": "Audience card showing name, formatted member count, tone-coded criteria chips and edit/duplicate/archive actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/audience-filter-card",
      "tags": [
        "audience",
        "segment",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/environment-tabs",
      "family": "feature-flags",
      "name": "EnvironmentTabs",
      "label": "Environment tabs",
      "description": "Controlled/uncontrolled DEV/STG/PRD tablist with per-environment status dots, flag counts and arrow-key roving tab navigation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/environment-tabs",
      "tags": [
        "environment",
        "tabs",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/flag-search",
      "family": "feature-flags",
      "name": "FlagSearch",
      "label": "Flag search",
      "description": "Inline flag search surface with a query input and kbd hint, multi-select owner chips, status chip filter and an include-archived checkbox.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/flag-search",
      "tags": [
        "search",
        "filter",
        "flags"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/kill-switch-button",
      "family": "feature-flags",
      "name": "KillSwitchButton",
      "label": "Kill switch button",
      "description": "Destructive kill-switch control with a two-step arm-then-confirm flow requiring a typed confirmation phrase, with an aria-live alert region.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/kill-switch-button",
      "tags": [
        "kill-switch",
        "destructive",
        "confirm"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/experiment-results-card",
      "family": "feature-flags",
      "name": "ExperimentResultsCard",
      "label": "Experiment results",
      "description": "Experiment results card listing variant rows with conversion rate, signed uplift, a significance bar meter, a p-value chip and control/winner badges.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/experiment-results-card",
      "tags": [
        "experiment",
        "results",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/flag-dependency-graph",
      "family": "feature-flags",
      "name": "FlagDependencyGraph",
      "label": "Dependency graph",
      "description": "Layered SVG graph of flag dependencies with curved parent-to-child edges, arrowheads, tone/killed node styling and a cycle-detected warning chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/flag-dependency-graph",
      "tags": [
        "dependency",
        "graph",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/recent-flag-changes-log",
      "family": "feature-flags",
      "name": "RecentFlagChangesLog",
      "label": "Recent flag changes log",
      "description": "Audit log of flag changes (flag, env, from-value to-value, who and when) rendered through the shared DataTable in comfortable zebra density.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/recent-flag-changes-log",
      "tags": [
        "audit",
        "log",
        "data-table"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/rollout-canary-bar",
      "family": "feature-flags",
      "name": "RolloutCanaryBar",
      "label": "Rollout canary bar",
      "description": "Canary progression bar over ordered percent steps (default 1/5/25/50/100) with reached and current-step highlighting and an optional ETA chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/rollout-canary-bar",
      "tags": [
        "canary",
        "rollout",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "feature-flags/feature-gate-preview",
      "family": "feature-flags",
      "name": "FeatureGatePreview",
      "label": "Feature gate preview",
      "description": "Mock gate evaluation card showing input attributes, the resolved variant chip with reason and an optional 'you would see' mock surface preview.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/feature-flags",
      "routeHref": "/ui-primitives/feature-flags/feature-gate-preview",
      "tags": [
        "gate",
        "preview",
        "evaluation"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
