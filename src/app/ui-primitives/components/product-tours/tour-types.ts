/* Shared types for Mufflermen Product-Tour, Announcement, and In-App Message primitives. */

export type TourTone = "teal" | "amber" | "green" | "red" | "violet" | "neutral"

export type TourStatus = "draft" | "scheduled" | "live" | "paused" | "archived"

export type TourStepShape =
  | "tooltip"
  | "modal"
  | "spotlight"
  | "hint"
  | "announcement"

export type TooltipDirection = "top" | "right" | "bottom" | "left"

export type TooltipAlign = "start" | "center" | "end"

export type AudienceRuleKind =
  | "url"
  | "segment"
  | "role"
  | "first-time"
  | "returning"
  | "device"
  | "locale"
  | "plan"

export type TriggerKind =
  | "page-visit"
  | "time-delay"
  | "scroll-depth"
  | "element-seen"
  | "custom-event"
  | "exit-intent"

export type NpsTimingRule =
  | "after-quote"
  | "after-service"
  | "weekly-active"
  | "monthly-active"
  | "custom"

export type SurveyChoiceTone = "neutral" | "positive" | "warning" | "negative"

export const TOUR_STATUS_LABEL: Record<TourStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  live: "Live",
  paused: "Paused",
  archived: "Archived",
}

export const TOUR_STATUS_TONE: Record<TourStatus, TourTone> = {
  draft: "neutral",
  scheduled: "teal",
  live: "green",
  paused: "amber",
  archived: "neutral",
}

export const STEP_SHAPE_LABEL: Record<TourStepShape, string> = {
  tooltip: "Tooltip",
  modal: "Modal",
  spotlight: "Spotlight",
  hint: "Hint",
  announcement: "Announce",
}

export const AUDIENCE_RULE_LABEL: Record<AudienceRuleKind, string> = {
  url: "URL match",
  segment: "Segment",
  role: "User role",
  "first-time": "First-time",
  returning: "Returning",
  device: "Device",
  locale: "Locale",
  plan: "Plan tier",
}

export const AUDIENCE_RULE_TONE: Record<AudienceRuleKind, TourTone> = {
  url: "teal",
  segment: "violet",
  role: "amber",
  "first-time": "green",
  returning: "teal",
  device: "neutral",
  locale: "neutral",
  plan: "amber",
}

export const TRIGGER_LABEL: Record<TriggerKind, string> = {
  "page-visit": "Page visit",
  "time-delay": "Time delay",
  "scroll-depth": "Scroll depth",
  "element-seen": "Element seen",
  "custom-event": "Custom event",
  "exit-intent": "Exit intent",
}

export const TRIGGER_TONE: Record<TriggerKind, TourTone> = {
  "page-visit": "teal",
  "time-delay": "amber",
  "scroll-depth": "violet",
  "element-seen": "green",
  "custom-event": "neutral",
  "exit-intent": "red",
}

export const NPS_TIMING_LABEL: Record<NpsTimingRule, string> = {
  "after-quote": "After quote accepted",
  "after-service": "After service complete",
  "weekly-active": "Weekly active session",
  "monthly-active": "Monthly active session",
  custom: "Custom event",
}

/** Tone → CSS custom-property fallback. */
export const TONE_VAR: Record<TourTone, string> = {
  teal: "var(--primitive-teal, #40bcff)",
  amber: "var(--primitive-amber, #ffc14f)",
  green: "var(--primitive-green, #37d67a)",
  red: "var(--primitive-red, #e62028)",
  violet: "var(--primitive-violet, #a878ff)",
  neutral: "color-mix(in oklab, var(--primitive-text-strong) 62%, transparent)",
}

/** Chip tone helper — maps tour tones to the Chip primitive's smaller palette. */
export type ChipTone = "neutral" | "red" | "amber" | "teal" | "green"

export const TOUR_TONE_TO_CHIP: Record<TourTone, ChipTone> = {
  teal: "teal",
  amber: "amber",
  green: "green",
  red: "red",
  violet: "teal",
  neutral: "neutral",
}

export interface TourRef {
  id: string
  name: string
}

/** Format a percentage 0..100 without decimals. */
export function formatPercent(value: number): string {
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`
}

/** Build short relative-time string for last-run timestamps. */
export function formatRelative(iso: string, nowIso?: string): string {
  try {
    const target = new Date(iso).getTime()
    const reference = nowIso ? new Date(nowIso).getTime() : Date.now()
    const diffMin = Math.round((reference - target) / 60_000)
    if (diffMin < 1) return "just now"
    if (diffMin < 60) return `${diffMin}m ago`
    const diffH = Math.round(diffMin / 60)
    if (diffH < 24) return `${diffH}h ago`
    const diffD = Math.round(diffH / 24)
    if (diffD < 14) return `${diffD}d ago`
    const diffW = Math.round(diffD / 7)
    return `${diffW}w ago`
  } catch {
    return iso
  }
}
