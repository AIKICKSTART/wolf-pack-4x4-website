/**
 * Shared fixtures for the Mufflermen Customer-Success showcase routes.
 * Realistic workshop customers — fleet operators on Wollongong–Shellharbour run,
 * performance shop regulars, and a long-tail of retail enthusiasts.
 */

import type { CohortRow } from "../components/customer-success/cohort-retention-grid"
import type { NpsTrendPoint } from "../components/customer-success/nps-trend-chart"
import type { ChurnRiskFactor } from "../components/customer-success/churn-risk-card"
import type { JourneyStageEntry } from "../components/customer-success/customer-journey-timeline"
import type { FeatureAdoptionRow } from "../components/customer-success/feature-adoption-meter"
import type { SuccessMilestone } from "../components/customer-success/success-plan-checklist"
import type {
  QbrAgendaItem,
  QbrOutcome,
} from "../components/customer-success/qbr-meeting-card"
import type { AtRiskCustomerRow } from "../components/customer-success/at-risk-customers-list"
import type { CustomerSegmentSlice } from "../components/customer-success/customer-segment-distribution"
import type { BriefingItem } from "../components/customer-success/executive-briefing-card"
import type { HealthFactor } from "../components/customer-success/customer-health-score"

export const SAMPLE_HEALTH_FACTORS: ReadonlyArray<HealthFactor> = [
  { key: "engagement", score: 88 },
  { key: "adoption", score: 92 },
  { key: "sentiment", score: 81 },
  { key: "support", score: 74 },
  { key: "value", score: 95 },
]

export const SAMPLE_LOW_HEALTH_FACTORS: ReadonlyArray<HealthFactor> = [
  { key: "engagement", score: 28 },
  { key: "adoption", score: 34 },
  { key: "sentiment", score: 22 },
  { key: "support", score: 18 },
  { key: "value", score: 41 },
]

export const SAMPLE_COHORTS: ReadonlyArray<CohortRow> = [
  { cohort: "Aug 2025", cohortSize: 38, retention: [100, 87, 79, 72, 66, 62, 58, 55, 52, 50] },
  { cohort: "Sep 2025", cohortSize: 42, retention: [100, 89, 82, 74, 70, 64, 61, 58, 54] },
  { cohort: "Oct 2025", cohortSize: 51, retention: [100, 92, 85, 78, 72, 67, 63, 60] },
  { cohort: "Nov 2025", cohortSize: 47, retention: [100, 88, 81, 74, 68, 63, 60] },
  { cohort: "Dec 2025", cohortSize: 33, retention: [100, 84, 76, 69, 64, 59] },
  { cohort: "Jan 2026", cohortSize: 56, retention: [100, 90, 83, 76, 70] },
  { cohort: "Feb 2026", cohortSize: 61, retention: [100, 91, 84, 78] },
  { cohort: "Mar 2026", cohortSize: 68, retention: [100, 92, 85] },
  { cohort: "Apr 2026", cohortSize: 73, retention: [100, 93] },
  { cohort: "May 2026", cohortSize: 71, retention: [100] },
]

export const COHORT_COLUMN_LABELS: ReadonlyArray<string> = [
  "M0",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "M9",
]

export const SAMPLE_NPS_POINTS: ReadonlyArray<NpsTrendPoint> = [
  { period: "Dec", promoters: 42, passives: 16, detractors: 9 },
  { period: "Jan", promoters: 48, passives: 14, detractors: 8 },
  { period: "Feb", promoters: 52, passives: 13, detractors: 7 },
  { period: "Mar", promoters: 51, passives: 18, detractors: 9 },
  { period: "Apr", promoters: 58, passives: 14, detractors: 6 },
  { period: "May", promoters: 64, passives: 12, detractors: 5 },
]

export const SAMPLE_CHURN_FACTORS: ReadonlyArray<ChurnRiskFactor> = [
  { label: "Booking frequency down 38%" },
  { label: "Last QBR cancelled" },
  { label: "Open P1 ticket 11 days" },
  { label: "Lost workshop champion" },
]

export const SAMPLE_LIFECYCLE_HISTORY: ReadonlyArray<JourneyStageEntry> = [
  { stage: "acquisition", enteredOnIso: "2024-08-12", note: "Found us via Manta dyno day" },
  { stage: "onboarding", enteredOnIso: "2024-09-04", note: "First Hilux service in Bay 2" },
  { stage: "adoption", enteredOnIso: "2024-12-02", note: "Online booking + parts portal in use" },
  { stage: "expansion", enteredOnIso: "2025-08-19", note: "Added fleet of 4 utes" },
]

export const SAMPLE_FEATURES: ReadonlyArray<FeatureAdoptionRow> = [
  { id: "f1", feature: "Online booking", adopted: 184, total: 216, delta: 12 },
  { id: "f2", feature: "Auto-quote attachments", adopted: 142, total: 216, delta: 8 },
  { id: "f3", feature: "Loyalty milestones", adopted: 198, total: 216, delta: 4 },
  { id: "f4", feature: "Parts portal self-serve", adopted: 88, total: 216, delta: 22 },
  { id: "f5", feature: "Dyno-tune scheduling", adopted: 41, total: 216, delta: -3 },
  { id: "f6", feature: "Fleet odometer sync", adopted: 19, total: 28, delta: 6 },
]

export const SAMPLE_MILESTONES: ReadonlyArray<SuccessMilestone> = [
  {
    id: "m1",
    label: "First service in Bay 2 booked",
    detail: "Hilux SR5 turbo-back fit-up",
    dueIso: "2026-06-04",
    state: "done",
  },
  {
    id: "m2",
    label: "Loyalty tier confirmed (Platinum)",
    detail: "Auto-applied on second invoice",
    dueIso: "2026-06-11",
    state: "done",
  },
  {
    id: "m3",
    label: "QBR · Bay 2 walkthrough",
    detail: "Joint review of fleet rotation schedule",
    dueIso: "2026-06-18",
    state: "in-progress",
  },
  {
    id: "m4",
    label: "Onboard fleet manager Sarah",
    detail: "Run portal login + dyno scheduling demo",
    dueIso: "2026-06-25",
    state: "todo",
  },
  {
    id: "m5",
    label: "Annual expansion review",
    detail: "Open conversation on cab-chassis additions",
    dueIso: "2026-07-30",
    state: "todo",
  },
  {
    id: "m6",
    label: "Roadworthy backlog",
    detail: "Three RWC sign-offs blocked by transmission supplier",
    dueIso: "2026-06-09",
    state: "blocked",
  },
]

export const SAMPLE_QBR_AGENDA: ReadonlyArray<QbrAgendaItem> = [
  { id: "qa1", label: "FY26 fleet rotation schedule", owner: "Stuart" },
  { id: "qa2", label: "Bay 2 priority — workshop availability", owner: "Jordan" },
  { id: "qa3", label: "Dyno calibration program", owner: "Marcus" },
  { id: "qa4", label: "Parts portal feature requests", owner: "Rita" },
  { id: "qa5", label: "Loyalty Brodie-tier rollout", owner: "Stuart" },
]

export const SAMPLE_QBR_OUTCOMES: ReadonlyArray<QbrOutcome> = [
  {
    id: "qo1",
    kind: "win",
    text: "Closed 12 Hilux turbo-back jobs in Q1 — $48,200 invoiced.",
  },
  {
    id: "qo2",
    kind: "win",
    text: "Online booking adoption hit 88% of active accounts.",
  },
  {
    id: "qo3",
    kind: "risk",
    text: "Parts supplier delays pushed three fitments out by a week.",
  },
  {
    id: "qo4",
    kind: "ask",
    text: "Need cab-chassis pricing model before next QBR.",
  },
]

export const SAMPLE_AT_RISK: ReadonlyArray<AtRiskCustomerRow> = [
  {
    id: "ar-001",
    name: "Wollongong Express Fleet",
    suburb: "Wollongong NSW",
    healthScore: 38,
    lastContact: "21 days ago",
    lifetimeValueAud: 84_500,
    avatarTone: "red",
  },
  {
    id: "ar-002",
    name: "Trent Williams",
    suburb: "Albion Park NSW",
    healthScore: 42,
    lastContact: "12 days ago",
    lifetimeValueAud: 14_200,
    avatarTone: "amber",
  },
  {
    id: "ar-003",
    name: "Kawanda Yuen",
    suburb: "Shellharbour NSW",
    healthScore: 22,
    lastContact: "63 days ago",
    lifetimeValueAud: 6_120,
    avatarTone: "red",
  },
  {
    id: "ar-004",
    name: "Bayside Tow Co.",
    suburb: "Warilla NSW",
    healthScore: 48,
    lastContact: "8 days ago",
    lifetimeValueAud: 41_300,
    avatarTone: "amber",
  },
  {
    id: "ar-005",
    name: "Marshall Yu",
    suburb: "Kiama NSW",
    healthScore: 55,
    lastContact: "15 days ago",
    lifetimeValueAud: 9_640,
    avatarTone: "amber",
  },
  {
    id: "ar-006",
    name: "Reece Beattie",
    suburb: "Oak Flats NSW",
    healthScore: 28,
    lastContact: "42 days ago",
    lifetimeValueAud: 5_840,
    avatarTone: "red",
  },
]

export const SAMPLE_SEGMENT_SLICES: ReadonlyArray<CustomerSegmentSlice> = [
  { segment: "strategic", count: 18 },
  { segment: "growth", count: 64 },
  { segment: "retention", count: 92 },
  { segment: "win-back", count: 42 },
]

export const SAMPLE_VOLUME_POINTS: ReadonlyArray<number> = [
  6, 7, 5, 8, 6, 9, 11, 7, 8, 6, 5, 4,
]

export const SAMPLE_SENTIMENT_POINTS: ReadonlyArray<number> = [
  -30, -22, -15, -8, 4, 12, 18, 24, 28, 32, 38, 42,
]

export const SAMPLE_WINS: ReadonlyArray<BriefingItem> = [
  {
    id: "w1",
    text: "Wollongong Express renewed at +18% ACV.",
    metric: "+$22,400 ACV",
  },
  {
    id: "w2",
    text: "Bay 2 priority program drove 4 new fleet referrals.",
    metric: "+4 logos",
  },
  {
    id: "w3",
    text: "Dyno calibration program closed 9 deals this week.",
    metric: "$31,200 booked",
  },
]

export const SAMPLE_RISKS: ReadonlyArray<BriefingItem> = [
  {
    id: "r1",
    text: "Bayside Tow Co. cancelled their QBR; champion left role.",
    metric: "$41k ARR at risk",
  },
  {
    id: "r2",
    text: "Two retail accounts churned over parts supplier delays.",
    metric: "Win-back queued",
  },
  {
    id: "r3",
    text: "P0 ticket open 6 days on Hurricane exhaust QA fault.",
    metric: "Stuart on call",
  },
]

export const SAMPLE_ASKS: ReadonlyArray<BriefingItem> = [
  {
    id: "a1",
    text: "Need cab-chassis pricing model signed off by Friday.",
  },
  {
    id: "a2",
    text: "Approve hire of second CS lead — Jordan over capacity.",
  },
  {
    id: "a3",
    text: "Push parts portal v3 to all Strategic accounts this sprint.",
  },
]
