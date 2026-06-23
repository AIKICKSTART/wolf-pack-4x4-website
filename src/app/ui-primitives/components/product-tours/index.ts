"use client"

/* Mufflermen Product-Tours / Announcements / In-App Messages primitives. */

export type {
  TourTone,
  TourStatus,
  TourStepShape,
  TooltipDirection,
  TooltipAlign,
  AudienceRuleKind,
  TriggerKind,
  NpsTimingRule,
  SurveyChoiceTone,
  ChipTone,
  TourRef,
} from "./tour-types"

export {
  TOUR_STATUS_LABEL,
  TOUR_STATUS_TONE,
  STEP_SHAPE_LABEL,
  AUDIENCE_RULE_LABEL,
  AUDIENCE_RULE_TONE,
  TRIGGER_LABEL,
  TRIGGER_TONE,
  NPS_TIMING_LABEL,
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  formatPercent,
  formatRelative,
} from "./tour-types"

export { TourBuilderCanvas } from "./tour-builder-canvas"
export type { TourCanvasStep } from "./tour-builder-canvas"

export { StepConfigPane } from "./step-config-pane"
export type { StepConfig } from "./step-config-pane"

export { TourStepThumbnail } from "./tour-step-thumbnail"

export { AudienceTargetingRules } from "./audience-targeting-rules"
export type { AudienceRule } from "./audience-targeting-rules"

export { TourTriggerCondition } from "./tour-trigger-condition"
export type { TriggerCondition } from "./tour-trigger-condition"

export { TourAnalyticsCard } from "./tour-analytics-card"
export type { TourStepFunnel } from "./tour-analytics-card"

export { InlineTooltipBuilder } from "./inline-tooltip-builder"
export type { TooltipBuildState } from "./inline-tooltip-builder"

export { AnnouncementCard } from "./announcement-card"

export { NpsPromptTrigger } from "./nps-prompt-trigger"
export type { NpsPromptConfig } from "./nps-prompt-trigger"

export { TooltipPreviewOverlay } from "./tooltip-preview-overlay"

export { TourLibraryGrid } from "./tour-library-grid"
export type { TourLibraryEntry } from "./tour-library-grid"

export { StepProgressDots } from "./step-progress-dots"

export { SurveyPromptCard } from "./survey-prompt-card"
export type { SurveyChoice } from "./survey-prompt-card"

export { FeatureHintSpotlight } from "./feature-hint-spotlight"
