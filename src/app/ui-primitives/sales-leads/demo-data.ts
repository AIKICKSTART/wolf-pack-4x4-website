// Realistic Mufflermen sales-lead demo data — Manta cat-back quote inquiries,
// Hilux owners, Illawarra fleet customers. AUD throughout. This file is the
// single source of seed data for the sales-leads showcase + full console.

import type {
  AssignmentRule,
  CadenceTouchpoint,
  ImportColumnMapping,
  ImportPreviewRow,
  InquiryFormField,
  LeadFunnelStage,
  LeadScoreSignal,
  LeadSourceMixDatum,
  LostReasonDatum,
  QualificationCriterion,
  SourceRoiRow,
} from "../components/sales-leads"

export const MUFFLERMEN_LEAD_SOURCE_MIX: ReadonlyArray<LeadSourceMixDatum> = [
  { source: "website", count: 86 },
  { source: "phone", count: 54 },
  { source: "referral", count: 42 },
  { source: "social", count: 31 },
  { source: "ad", count: 27 },
  { source: "walk-in", count: 18 },
]

export const MUFFLERMEN_BANT: ReadonlyArray<QualificationCriterion> = [
  {
    key: "budget",
    label: "Budget",
    status: "met",
    note: "Quote ceiling confirmed at $3,200 for the Manta cat-back system.",
  },
  {
    key: "authority",
    label: "Authority",
    status: "met",
    note: "Mick is the vehicle owner — sole decision-maker.",
  },
  {
    key: "need",
    label: "Need",
    status: "partial",
    note: "Hilux SR5 — wants tone improvement and turbo-back fitment before Mudgee trip.",
  },
  {
    key: "timing",
    label: "Timing",
    status: "missing",
    note: "Asked us to call back next week to lock the fitment day.",
  },
]

export const MUFFLERMEN_LEAD_SCORE_SIGNALS: ReadonlyArray<LeadScoreSignal> = [
  {
    id: "sig-1",
    label: "Recent Manta cat-back inquiry",
    points: 18,
    direction: "positive",
    reasoning: ["Manta product", "Cat-back fitment", "High-intent page"],
  },
  {
    id: "sig-2",
    label: "Toyota Hilux SR5 fitment confirmed",
    points: 14,
    direction: "positive",
    reasoning: ["Hilux SR5", "Common platform", "In-stock kit"],
  },
  {
    id: "sig-3",
    label: "Inbound phone touch in last 24h",
    points: 12,
    direction: "positive",
    reasoning: ["Inbound call", "<24h recency", "Workshop direct"],
  },
  {
    id: "sig-4",
    label: "Visited pricing page 3×",
    points: 9,
    direction: "positive",
    reasoning: ["3 sessions", "Pricing intent"],
  },
  {
    id: "sig-5",
    label: "No fitment date booked",
    points: 6,
    direction: "negative",
    reasoning: ["Stalled booking", "Calendar slot vacant"],
  },
  {
    id: "sig-6",
    label: "Lives outside Illawarra service area",
    points: 4,
    direction: "negative",
    reasoning: ["Postcode 2611", "Out of region"],
  },
]

export const MUFFLERMEN_FORM_FIELDS: ReadonlyArray<InquiryFormField> = [
  {
    name: "name",
    label: "Full name",
    required: true,
    conversionRate: 96,
    trend: [78, 82, 84, 86, 88, 92, 94, 95, 96, 96, 95, 96, 96, 96],
  },
  {
    name: "phone",
    label: "Phone",
    required: true,
    conversionRate: 78,
    trend: [62, 65, 68, 70, 73, 74, 76, 76, 77, 78, 78, 79, 78, 78],
  },
  {
    name: "vehicle",
    label: "Vehicle (year + model)",
    required: true,
    conversionRate: 65,
    trend: [50, 52, 54, 56, 58, 60, 62, 63, 64, 64, 65, 65, 66, 65],
  },
  {
    name: "system",
    label: "Exhaust system interest",
    required: false,
    conversionRate: 38,
    trend: [22, 24, 28, 30, 32, 34, 35, 36, 37, 38, 38, 39, 38, 38],
  },
  {
    name: "postcode",
    label: "Postcode",
    required: true,
    conversionRate: 71,
    trend: [56, 58, 60, 62, 64, 66, 68, 69, 70, 70, 71, 71, 72, 71],
  },
  {
    name: "notes",
    label: "Anything else?",
    required: false,
    conversionRate: 24,
    trend: [12, 13, 14, 16, 18, 20, 21, 22, 23, 24, 24, 25, 24, 24],
  },
]

export const MUFFLERMEN_FUNNEL: ReadonlyArray<LeadFunnelStage> = [
  { key: "lead", count: 258, value: 564_300 },
  { key: "mql", count: 162, value: 412_400 },
  { key: "sql", count: 104, value: 286_800 },
  { key: "quote", count: 68, value: 184_200 },
  { key: "won", count: 34, value: 104_900 },
]

export const MUFFLERMEN_ASSIGNMENT_RULES: ReadonlyArray<AssignmentRule> = [
  {
    id: "rule-1",
    name: "Illawarra fleet customers",
    conditions: [
      { dimension: "region", value: "Illawarra postcodes" },
      { dimension: "segment", value: "Fleet" },
      { dimension: "value", value: "> $5,000" },
    ],
    assigneeName: "Jordan Pham",
    assigneeRole: "Workshop lead",
    matchedCount: 23,
  },
  {
    id: "rule-2",
    name: "Manta cat-back website inquiries",
    conditions: [
      { dimension: "source", value: "Website" },
      { dimension: "segment", value: "Performance" },
    ],
    assigneeName: "Marcus Wells",
    assigneeRole: "Front of house",
    matchedCount: 41,
  },
  {
    id: "rule-3",
    name: "Hilux & Ranger inbound calls",
    conditions: [
      { dimension: "source", value: "Phone" },
      { dimension: "segment", value: "Retail" },
    ],
    assigneeName: "Rita Tan",
    assigneeRole: "Bookings",
    matchedCount: 68,
  },
  {
    id: "rule-4",
    name: "Out-of-region referrals",
    conditions: [
      { dimension: "source", value: "Referral" },
      { dimension: "region", value: "Outside Illawarra" },
    ],
    assigneeName: "Marcus Wells",
    assigneeRole: "Front of house",
    matchedCount: 12,
  },
]

export const MUFFLERMEN_CADENCE_TOUCHPOINTS: ReadonlyArray<CadenceTouchpoint> = [
  {
    step: 1,
    kind: "call",
    dayOffset: 0,
    label:
      "Inbound discovery call — confirm vehicle, intended system, and Mudgee trip date.",
    status: "completed",
  },
  {
    step: 2,
    kind: "email",
    dayOffset: 1,
    label:
      "Send Manta 2.5in cat-back kit options for 2022 Hilux SR5 with three tone variants.",
    status: "completed",
  },
  {
    step: 3,
    kind: "sms",
    dayOffset: 2,
    label: "SMS dyno-result PDF + before/after sound clips.",
    status: "completed",
  },
  {
    step: 4,
    kind: "call",
    dayOffset: 4,
    label: "Follow-up call — lock fitment day before parts arrive Monday.",
    status: "due",
  },
  {
    step: 5,
    kind: "email",
    dayOffset: 7,
    label: "Re-engagement email with workshop walkthrough video.",
    status: "upcoming",
  },
  {
    step: 6,
    kind: "visit",
    dayOffset: 10,
    label: "In-person fitment Tue 4 Jun, Bay 03 — Jordan.",
    status: "upcoming",
  },
]

export const MUFFLERMEN_ROI_ROWS: ReadonlyArray<SourceRoiRow> = [
  {
    source: "website",
    spend: 1840,
    leads: 86,
    costPerLead: 21,
    quoteConversion: 42,
    closedWon: 18,
    revenue: 56400,
  },
  {
    source: "phone",
    spend: 0,
    leads: 54,
    costPerLead: 0,
    quoteConversion: 58,
    closedWon: 22,
    revenue: 64800,
  },
  {
    source: "referral",
    spend: 320,
    leads: 42,
    costPerLead: 7,
    quoteConversion: 64,
    closedWon: 24,
    revenue: 72200,
  },
  {
    source: "social",
    spend: 1240,
    leads: 31,
    costPerLead: 40,
    quoteConversion: 28,
    closedWon: 6,
    revenue: 17800,
  },
  {
    source: "ad",
    spend: 3120,
    leads: 27,
    costPerLead: 115,
    quoteConversion: 24,
    closedWon: 4,
    revenue: 12200,
  },
  {
    source: "walk-in",
    spend: 0,
    leads: 18,
    costPerLead: 0,
    quoteConversion: 70,
    closedWon: 9,
    revenue: 28400,
  },
]

export const MUFFLERMEN_LOST_REASONS: ReadonlyArray<LostReasonDatum> = [
  { reason: "Price — went DIY", count: 18 },
  { reason: "Workshop too far", count: 14 },
  { reason: "Compliance / ADR concern", count: 11 },
  { reason: "Waiting on insurance", count: 8 },
  { reason: "Bought used part instead", count: 6 },
  { reason: "Sold vehicle", count: 4 },
  { reason: "Lost contact", count: 3 },
]

export const MUFFLERMEN_IMPORT_MAPPINGS: ReadonlyArray<ImportColumnMapping> = [
  { sourceColumn: "First Name", targetField: "firstName", confidence: 0.98 },
  { sourceColumn: "Last Name", targetField: "lastName", confidence: 0.98 },
  { sourceColumn: "Mobile", targetField: "phone", confidence: 0.92 },
  { sourceColumn: "Email Address", targetField: "email", confidence: 0.96 },
  { sourceColumn: "Vehicle Make + Model", targetField: "vehicle", confidence: 0.78 },
  { sourceColumn: "Suburb", targetField: "suburb", confidence: 0.84 },
  { sourceColumn: "Lead Notes", targetField: "inquiry", confidence: 0.62 },
  { sourceColumn: "Subscribed", targetField: null, confidence: 0.18 },
]

export const MUFFLERMEN_IMPORT_PREVIEW: ReadonlyArray<ImportPreviewRow> = [
  {
    id: "imp-1",
    name: "Mick Davis",
    email: "mick.davis@oakflatsfab.com.au",
    phone: "0414 882 197",
    vehicle: "2022 Toyota Hilux SR5",
    duplicate: true,
  },
  {
    id: "imp-2",
    name: "Sarah Pope",
    email: "sarah@popebuilders.com.au",
    phone: "0438 102 554",
    vehicle: "2024 Ford Ranger Wildtrak",
    duplicate: true,
  },
  {
    id: "imp-3",
    name: "Trent Williams",
    email: "trent.williams@gmail.com",
    phone: "0407 661 099",
    vehicle: "2019 Nissan Patrol Y62",
    duplicate: false,
  },
  {
    id: "imp-4",
    name: "Albion Park Couriers",
    email: "ops@albionparkcouriers.com.au",
    phone: "(02) 4256 1180",
    vehicle: "Fleet of 6 Toyota Hiace",
    duplicate: false,
  },
  {
    id: "imp-5",
    name: "Liam Schaefer",
    email: "liam.schaefer@outlook.com",
    phone: "0421 558 902",
    vehicle: "2018 Mitsubishi Triton MQ",
    duplicate: false,
  },
  {
    id: "imp-6",
    name: "Petra Karlsson",
    email: "petra.k@petraklawn.com.au",
    phone: "0407 113 882",
    vehicle: "2010 Holden Commodore VE SS",
    duplicate: false,
  },
]
