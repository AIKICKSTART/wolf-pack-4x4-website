import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "product-tours",
  "title": "Product tours",
  "group": "System",
  "summary": "14 primitives for building, targeting, triggering, previewing, and measuring product tours, announcements, in-app tooltips, NPS prompts, and feature hints — sharing a TourTone/TourStepShape token vocabulary.",
  "entries": [
    {
      "key": "product-tours/tour-builder-canvas",
      "family": "product-tours",
      "name": "TourBuilderCanvas",
      "label": "Tour builder canvas",
      "description": "Grid-positioned tour-step node canvas on a glass surface with SVG arrow connectors and selectable, shape-glyphed step nodes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tour-builder-canvas",
      "tags": [
        "tour",
        "builder",
        "canvas",
        "flow"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/step-config-pane",
      "family": "product-tours",
      "name": "StepConfigPane",
      "label": "Step config pane",
      "description": "Inspector aside for editing a single tour step's target selector, copy, tooltip direction/align, auto-advance delay, and skippable toggle via patch callbacks.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/step-config-pane",
      "tags": [
        "tour",
        "config",
        "inspector",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/tour-step-thumbnail",
      "family": "product-tours",
      "name": "TourStepThumbnail",
      "label": "Tour step thumbnail",
      "description": "Compact selectable button card summarizing one tour step with index, shape glyph, title, excerpt, target selector, and delay label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tour-step-thumbnail",
      "tags": [
        "tour",
        "step",
        "thumbnail",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/audience-targeting-rules",
      "family": "product-tours",
      "name": "AudienceTargetingRules",
      "label": "Audience targeting rules",
      "description": "Rule-list surface for defining who sees a tour with all/any match toggle, removable rule chips, estimated reach, and quick-add rule kinds.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/audience-targeting-rules",
      "tags": [
        "tour",
        "audience",
        "targeting",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/tour-trigger-condition",
      "family": "product-tours",
      "name": "TourTriggerCondition",
      "label": "Tour trigger condition",
      "description": "Trigger-kind picker (page visit, time delay, scroll depth, element seen, custom event, exit intent) that resolves a human condition description with optional progress visual and last-fired footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tour-trigger-condition",
      "tags": [
        "tour",
        "trigger",
        "condition",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/tour-analytics-card",
      "family": "product-tours",
      "name": "TourAnalyticsCard",
      "label": "Tour analytics card",
      "description": "Analytics surface combining a completion-rate radial meter, starts/completions/drop-off metric block, and a per-step funnel with reached/completed bars.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tour-analytics-card",
      "tags": [
        "tour",
        "analytics",
        "funnel",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/inline-tooltip-builder",
      "family": "product-tours",
      "name": "InlineTooltipBuilder",
      "label": "Inline tooltip builder",
      "description": "Composer for an inline tooltip with title/body/CTA fields, arrow-glyph direction picker, align chips, and a close-CTA toggle via patch callbacks.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/inline-tooltip-builder",
      "tags": [
        "tooltip",
        "builder",
        "composer",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/announcement-card",
      "family": "product-tours",
      "name": "AnnouncementCard",
      "label": "Announcement card",
      "description": "Glass-surface what's-new announcement with optional image, kicker chip, body copy, CTA, and dismiss button; supports a compact one-line bar variant.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/announcement-card",
      "tags": [
        "announcement",
        "whats-new",
        "card",
        "in-app"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/nps-prompt-trigger",
      "family": "product-tours",
      "name": "NpsPromptTrigger",
      "label": "NPS prompt trigger",
      "description": "Configurator for a Net Promoter Score prompt: timing rule chips, segment and question inputs, sampling-rate slider with progress bar, and cool-down presets.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/nps-prompt-trigger",
      "tags": [
        "nps",
        "survey",
        "trigger",
        "config"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/tooltip-preview-overlay",
      "family": "product-tours",
      "name": "TooltipPreviewOverlay",
      "label": "Tooltip preview overlay",
      "description": "Preview frame rendering a sample target with a positioned CoachMark tooltip to show direction/align placement of an in-app coach mark.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tooltip-preview-overlay",
      "tags": [
        "tooltip",
        "preview",
        "coach-mark",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/tour-library-grid",
      "family": "product-tours",
      "name": "TourLibraryGrid",
      "label": "Tour library grid",
      "description": "Card grid listing saved tours with status dot, step count, engagement chip, relative last-run time, and a recent-completion sparkline per card.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/tour-library-grid",
      "tags": [
        "tour",
        "library",
        "grid",
        "dashboard"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/step-progress-dots",
      "family": "product-tours",
      "name": "StepProgressDots",
      "label": "Step progress dots",
      "description": "Accessible tour progress indicator rendering dots, bars, or a numeric counter variant with proper progressbar ARIA values.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/step-progress-dots",
      "tags": [
        "progress",
        "stepper",
        "indicator",
        "a11y"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/survey-prompt-card",
      "family": "product-tours",
      "name": "SurveyPromptCard",
      "label": "Survey prompt card",
      "description": "Material-surface in-app survey card with a question, tone-colored single- or multi-select choice buttons, dismiss, and a send action gated on selection.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/survey-prompt-card",
      "tags": [
        "survey",
        "prompt",
        "card",
        "in-app"
      ],
      "status": "captured"
    },
    {
      "key": "product-tours/feature-hint-spotlight",
      "family": "product-tours",
      "name": "FeatureHintSpotlight",
      "label": "Feature hint spotlight",
      "description": "Reveal-animated feature-hint card with an animated halo/glyph, badge chip, title, body, optional CTA, and dismiss button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/product-tours",
      "routeHref": "/ui-primitives/product-tours/feature-hint-spotlight",
      "tags": [
        "feature-hint",
        "spotlight",
        "whats-new",
        "in-app"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
