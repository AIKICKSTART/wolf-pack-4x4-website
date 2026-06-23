/** Shared types for the marketing-automation primitive family. */

export type AutomationChannel =
  | "email"
  | "sms"
  | "push"
  | "voice"
  | "task"
  | "webhook"

export type JourneyNodeKind =
  | "trigger"
  | "wait"
  | "condition"
  | "action"
  | "goal"
  | "exit"

export type JourneyEdgeKind = "default" | "yes" | "no" | "fallback"

export type AutomationTone = "neutral" | "red" | "amber" | "teal" | "green"

export type AudiencePredicateKind =
  | "attribute"
  | "behaviour"
  | "lifecycle"
  | "geo"
  | "vehicle"
  | "tag"
  | "negation"

export type AudienceLogicGroupOperator = "and" | "or"

export type ConsentStatus =
  | "double-opt-in"
  | "single-opt-in"
  | "pending"
  | "unsubscribed"
  | "bounced"
  | "complained"

export type CampaignBudgetPacing = "even" | "ahead" | "behind"

export type DripStepStatus = "draft" | "live" | "paused" | "completed"

export type WinnerSignal = "winner" | "loser" | "running" | "tied"

export interface JourneyNodeSpec {
  id: string
  kind: JourneyNodeKind
  title: string
  /** Subtitle / configuration hint. */
  subtitle?: string
  /** Grid column (1-based). */
  col: number
  /** Grid row (1-based). */
  row: number
  /** Pinned/active card. */
  active?: boolean
}

export interface JourneyEdgeSpec {
  from: string
  to: string
  kind?: JourneyEdgeKind
  label?: string
}

export const CHANNEL_LABEL: Record<AutomationChannel, string> = {
  email: "Email",
  sms: "SMS",
  push: "Push",
  voice: "Voice",
  task: "Task",
  webhook: "Webhook",
}

export const CHANNEL_TONE: Record<AutomationChannel, AutomationTone> = {
  email: "teal",
  sms: "green",
  push: "amber",
  voice: "red",
  task: "neutral",
  webhook: "amber",
}

export const NODE_LABEL: Record<JourneyNodeKind, string> = {
  trigger: "Trigger",
  wait: "Wait",
  condition: "Condition",
  action: "Action",
  goal: "Goal",
  exit: "Exit",
}

export const NODE_TONE: Record<JourneyNodeKind, AutomationTone> = {
  trigger: "amber",
  wait: "neutral",
  condition: "teal",
  action: "green",
  goal: "amber",
  exit: "red",
}

export const CONSENT_LABEL: Record<ConsentStatus, string> = {
  "double-opt-in": "Double opt-in",
  "single-opt-in": "Single opt-in",
  pending: "Pending confirm",
  unsubscribed: "Unsubscribed",
  bounced: "Hard bounce",
  complained: "Complaint",
}

export const CONSENT_TONE: Record<ConsentStatus, AutomationTone> = {
  "double-opt-in": "green",
  "single-opt-in": "teal",
  pending: "amber",
  unsubscribed: "neutral",
  bounced: "red",
  complained: "red",
}

export const PACING_LABEL: Record<CampaignBudgetPacing, string> = {
  even: "On pace",
  ahead: "Pacing ahead",
  behind: "Pacing behind",
}

export const PACING_TONE: Record<CampaignBudgetPacing, AutomationTone> = {
  even: "green",
  ahead: "amber",
  behind: "red",
}

export const STEP_STATUS_LABEL: Record<DripStepStatus, string> = {
  draft: "Draft",
  live: "Live",
  paused: "Paused",
  completed: "Done",
}

export const STEP_STATUS_TONE: Record<DripStepStatus, AutomationTone> = {
  draft: "neutral",
  live: "green",
  paused: "amber",
  completed: "teal",
}
