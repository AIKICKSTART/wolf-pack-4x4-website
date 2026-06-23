export type {
  ActivityVerb,
  ContactChannel,
  CustomerRef,
  CustomerSegment,
  CustomerStatus,
  DealPeriod,
  DealStage,
  LeadScoreFactor,
  TouchPointKind,
} from "./crm-types"

export {
  SEGMENT_GLYPH,
  SEGMENT_LABEL,
  STAGE_LABEL,
  STAGE_PROBABILITY,
} from "./crm-types"

export { CustomerCard } from "./customer-card"
export type { CustomerCardAction } from "./customer-card"

export { ContactCardMini } from "./contact-card-mini"

export { DealStageCard } from "./deal-stage-card"

export { PipelineKanban } from "./pipeline-kanban"
export type { PipelineDeal } from "./pipeline-kanban"

export { CrmActivityRow } from "./crm-activity-row"

export { LeadScoreChip } from "./lead-score-chip"
export type { LeadScoreBreakdown } from "./lead-score-chip"

export { DealValueChip } from "./deal-value-chip"

export { StageProbabilityBar } from "./stage-probability-bar"

export { TouchPointTimeline } from "./touch-point-timeline"
export type { TouchPoint } from "./touch-point-timeline"

export { AccountHealthMeter } from "./account-health-meter"
export type { AccountHealthFactor } from "./account-health-meter"

export { SegmentChip } from "./segment-chip"

export { NoteComposer } from "./note-composer"
export type { NoteComposerValue, NoteMention } from "./note-composer"

export { NextActionCard } from "./next-action-card"
export type { NextActionUrgency, SnoozeChoice } from "./next-action-card"

export { QuoteToCashFunnel } from "./quote-to-cash-funnel"
export type { FunnelStage, FunnelStageKey } from "./quote-to-cash-funnel"
