/**
 * Shared fixtures for the Mufflermen Product-Tours showcase routes.
 * Realistic in-app onboarding for the workshop platform — quote-instant-pricing,
 * ADR cheatsheet, and bay-availability widget tours.
 */

import type {
  AudienceRule,
  NpsPromptConfig,
  StepConfig,
  SurveyChoice,
  TooltipBuildState,
  TourCanvasStep,
  TourLibraryEntry,
  TourStepFunnel,
  TriggerCondition,
} from "../components/product-tours"

export const SAMPLE_QUOTE_TOUR_STEPS: ReadonlyArray<TourCanvasStep> = [
  {
    id: "qs1",
    title: "Welcome to instant quote",
    targetSelector: "[data-tour='quote-launcher']",
    shape: "modal",
    column: 1,
    row: 1,
    tone: "violet",
  },
  {
    id: "qs2",
    title: "Pick your vehicle",
    targetSelector: "[data-tour='vehicle-picker']",
    shape: "tooltip",
    column: 2,
    row: 1,
    tone: "teal",
  },
  {
    id: "qs3",
    title: "Select exhaust system",
    targetSelector: "[data-tour='exhaust-selector']",
    shape: "spotlight",
    column: 3,
    row: 1,
    tone: "amber",
    selected: true,
  },
  {
    id: "qs4",
    title: "Review fitment notes",
    targetSelector: "[data-tour='fitment-notes']",
    shape: "tooltip",
    column: 3,
    row: 2,
    tone: "teal",
  },
  {
    id: "qs5",
    title: "Lock in price + book bay",
    targetSelector: "[data-tour='book-bay-cta']",
    shape: "hint",
    column: 2,
    row: 2,
    tone: "green",
  },
  {
    id: "qs6",
    title: "Quote sent — what's next",
    targetSelector: "[data-tour='quote-confirm']",
    shape: "announcement",
    column: 1,
    row: 2,
    tone: "green",
  },
]

export const SAMPLE_STEP_CONFIG: StepConfig = {
  id: "qs3",
  index: 3,
  total: 6,
  shape: "spotlight",
  targetSelector: "[data-tour='exhaust-selector']",
  title: "Select your exhaust system",
  body:
    "Tap a row to add to the quote. Cat-back fits a 2.5-inch system; turbo-back unlocks dump-pipe pricing for tuned utes.",
  primaryLabel: "Got it",
  direction: "bottom",
  align: "center",
  skippable: true,
  delayMs: 0,
  tone: "amber",
}

export const SAMPLE_AUDIENCE_RULES: ReadonlyArray<AudienceRule> = [
  { id: "ar1", kind: "url", comparator: "matches", value: "/quote/instant*" },
  { id: "ar2", kind: "first-time", comparator: "is", value: "true" },
  { id: "ar3", kind: "segment", comparator: "in", value: "fleet · retail · enthusiast" },
  { id: "ar4", kind: "device", comparator: "is not", value: "kiosk" },
]

export const SAMPLE_TRIGGER_CONDITION: TriggerCondition = {
  kind: "page-visit",
  urlPattern: "/quote/instant",
}

export const SAMPLE_FUNNEL: ReadonlyArray<TourStepFunnel> = [
  { index: 1, title: "Welcome to instant quote", reached: 2_184, completed: 2_064 },
  { index: 2, title: "Pick your vehicle", reached: 2_064, completed: 1_910 },
  { index: 3, title: "Select exhaust system", reached: 1_910, completed: 1_408 },
  { index: 4, title: "Review fitment notes", reached: 1_408, completed: 1_212 },
  { index: 5, title: "Lock in price + book bay", reached: 1_212, completed: 1_088 },
  { index: 6, title: "Quote sent — what's next", reached: 1_088, completed: 996 },
]

export const SAMPLE_TOOLTIP_STATE: TooltipBuildState = {
  title: "Need a hand picking?",
  body:
    "Most Hilux owners pick the 3-inch turbo-back. Tap any row for fitment notes from Stuart and the crew.",
  direction: "bottom",
  align: "center",
  closeCta: true,
  ctaLabel: "Show me the picks",
}

export const SAMPLE_NPS_CONFIG: NpsPromptConfig = {
  timing: "after-service",
  segment: "Service completed in last 14 days",
  question:
    "On a scale of 0–10, how likely are you to recommend Oak Flats Mufflermen to a mate?",
  samplingRate: 80,
  cooldownDays: 90,
}

export const SAMPLE_SURVEY_CHOICES: ReadonlyArray<SurveyChoice> = [
  { id: "s1", label: "Yes — booked another service", tone: "positive" },
  { id: "s2", label: "Yes — saved the quote for later" },
  { id: "s3", label: "Not yet — still comparing", tone: "warning" },
  { id: "s4", label: "No — too pricey", tone: "negative" },
]

export const SAMPLE_TOUR_LIBRARY: ReadonlyArray<TourLibraryEntry> = [
  {
    id: "t1",
    name: "Instant quote walk-through",
    description:
      "Six-step quote-instant-pricing tour for fleet operators and walk-ins — vehicle, exhaust, fitment, bay booking.",
    status: "live",
    lastRunIso: "2026-05-29T08:14:00+10:00",
    engagementRate: 78,
    tone: "green",
    steps: 6,
    recentTrend: [62, 65, 67, 70, 73, 75, 78, 78, 77, 78],
  },
  {
    id: "t2",
    name: "ADR cheatsheet — turbo-back legality",
    description:
      "Walks the customer through ADR 80/04 noise and emissions limits before they hit the booking screen.",
    status: "live",
    lastRunIso: "2026-05-28T16:22:00+10:00",
    engagementRate: 64,
    tone: "teal",
    steps: 4,
    recentTrend: [55, 58, 60, 62, 64, 64, 63, 64, 65, 64],
  },
  {
    id: "t3",
    name: "Bay availability widget tour",
    description:
      "Three coach-marks pointing to the new bay-availability widget on the workshop dashboard.",
    status: "scheduled",
    lastRunIso: "2026-05-27T10:02:00+10:00",
    engagementRate: 0,
    tone: "amber",
    steps: 3,
    recentTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "t4",
    name: "Fleet operator onboarding",
    description:
      "Twelve-step deep-dive for new fleet customers — schedule sync, invoice handling, rotation playbook.",
    status: "draft",
    lastRunIso: "2026-05-20T09:42:00+10:00",
    engagementRate: 41,
    tone: "neutral",
    steps: 12,
    recentTrend: [40, 38, 42, 41, 43, 41, 39, 42, 41, 41],
  },
  {
    id: "t5",
    name: "Loyalty milestones unlock",
    description:
      "Announces the new tiered loyalty unlocks — 4 services for a free pre-inspection, 12 for a free dyno-tune.",
    status: "paused",
    lastRunIso: "2026-05-12T11:08:00+10:00",
    engagementRate: 22,
    tone: "amber",
    steps: 2,
    recentTrend: [28, 26, 24, 22, 22, 21, 22, 22, 21, 22],
  },
  {
    id: "t6",
    name: "Workshop staff handover walk-through",
    description:
      "Internal-only tour explaining the new bay-handover board to Sunday-shift apprentices.",
    status: "archived",
    lastRunIso: "2026-04-18T07:34:00+10:00",
    engagementRate: 88,
    tone: "neutral",
    steps: 5,
    recentTrend: [82, 84, 86, 87, 88, 88, 88, 88, 88, 88],
  },
]

export const SAMPLE_THUMB_STEPS: ReadonlyArray<{
  id: string
  index: number
  title: string
  excerpt: string
  shape: TourCanvasStep["shape"]
  targetSelector?: string
  delayLabel?: string
  tone: TourCanvasStep["tone"]
}> = [
  {
    id: "thumb1",
    index: 1,
    title: "Welcome to instant quote",
    excerpt: "Intro modal pitching the fast lane to a real, signed-off quote in under 60 seconds.",
    shape: "modal",
    targetSelector: "[data-tour='quote-launcher']",
    delayLabel: "Manual",
    tone: "violet",
  },
  {
    id: "thumb2",
    index: 2,
    title: "Pick your vehicle",
    excerpt: "Tooltip on the rego/VIN field with a tip about saved vehicles for repeat customers.",
    shape: "tooltip",
    targetSelector: "[data-tour='vehicle-picker']",
    delayLabel: "Auto 1.5s",
    tone: "teal",
  },
  {
    id: "thumb3",
    index: 3,
    title: "Select exhaust system",
    excerpt: "Spotlight covering the exhaust grid with notes on cat-back vs turbo-back pricing.",
    shape: "spotlight",
    targetSelector: "[data-tour='exhaust-selector']",
    delayLabel: "Manual",
    tone: "amber",
  },
  {
    id: "thumb4",
    index: 4,
    title: "Review fitment notes",
    excerpt: "Tooltip pinned to the fitment panel highlighting ADR notes and warranty fine print.",
    shape: "tooltip",
    targetSelector: "[data-tour='fitment-notes']",
    delayLabel: "Auto 3s",
    tone: "teal",
  },
]

export const SAMPLE_ANNOUNCEMENT = {
  kicker: "What's new · 28 May",
  title: "Instant quote now supports fleet bulk pricing",
  body:
    "Fleet customers with 3+ vehicles on file get a tiered pricing card right in the quote screen — no more emails back and forth with Stuart.",
  ctaLabel: "See the new pricing card",
}
