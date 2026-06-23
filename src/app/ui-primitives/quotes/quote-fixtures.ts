/**
 * Showcase fixtures — Mufflermen "Hilux N80 Full Manta Stainless Catback System
 * + Fitment" quote. Reused across every quote sub-route page so the visual
 * reference stays consistent.
 */

import type {
  AcceptanceEvent,
  QuoteLine,
} from "../components/quotes"
import type { CounterOfferChange } from "../components/quotes"
import type { BundleIncludedItem } from "../components/quotes"
import type { DuplicateQuoteSummary } from "../components/quotes"
import type { PricingPlan } from "../components/quotes"
import type { SignatureRequest } from "../components/quotes"
import type { TaxLine } from "../components/quotes"

export const CATALOGUE: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Manta 3″ DPF-back Stainless – Hilux N80", value: "MAN-N80-DPF3" },
  { label: "Manta 3″ Catback Stainless – Hilux N80", value: "MAN-N80-CB3" },
  { label: "Mid-pipe Resonator – 3″ Stainless", value: "MAN-MID-RES3" },
  { label: "Rear muffler – Twin polished tip", value: "MAN-RM-TWIN" },
  { label: "Workshop labour – Cat-back fitment", value: "OFM-LAB-CB" },
  { label: "Workshop labour – Wideband O2 retune", value: "OFM-LAB-O2" },
  { label: "Heat wrap – Header section", value: "OFM-HW-HDR" },
]

export const INITIAL_LINES: ReadonlyArray<QuoteLine> = [
  {
    id: "line-1",
    title: "Manta 3″ Catback Stainless – Hilux N80",
    sku: "MAN-N80-CB3",
    quantity: 1,
    unitPrice: 1895.0,
  },
  {
    id: "line-2",
    title: "Mid-pipe Resonator – 3″ Stainless",
    sku: "MAN-MID-RES3",
    quantity: 1,
    unitPrice: 320.0,
    discount: {
      kind: "percentage",
      amount: 10,
      scope: "Mid-pipe resonator",
      reason: "Showroom pricing — Bathurst weekend",
    },
  },
  {
    id: "line-3",
    title: "Workshop labour – Cat-back fitment",
    sku: "OFM-LAB-CB",
    quantity: 4,
    unitPrice: 95.0,
  },
  {
    id: "line-4",
    title: "Workshop labour – Wideband O2 retune",
    sku: "OFM-LAB-O2",
    quantity: 1,
    unitPrice: 320.0,
  },
]

export const BUNDLE_ITEMS: ReadonlyArray<BundleIncludedItem> = [
  { sku: "MAN-N80-CB3", title: "Manta 3″ Catback Stainless", quantity: 1 },
  { sku: "MAN-MID-RES3", title: "Mid-pipe Resonator", quantity: 1 },
  { sku: "MAN-RM-TWIN", title: "Rear muffler twin tip", quantity: 1 },
  { sku: "OFM-LAB-CB", title: "Workshop labour – Cat-back fitment", quantity: 4 },
  { sku: "OFM-LAB-O2", title: "Workshop labour – O2 retune", quantity: 1 },
  { sku: "OFM-HW-HDR", title: "Heat wrap – Header section", quantity: 1 },
]

export const TAX_LINES: ReadonlyArray<TaxLine> = [
  { label: "GST (Australia)", rate: 10, amount: 268.5 },
]

export const QUOTE_TOTALS = {
  subtotal: 2685.0,
  total: 2953.5,
}

export const ACCEPTANCE_EVENTS: ReadonlyArray<AcceptanceEvent> = [
  { state: "sent", occurredAt: "Tue 27 May · 09:42 AEST", detail: "Sent via Mufflermen portal" },
  { state: "opened", occurredAt: "Tue 27 May · 14:18 AEST", detail: "Opened on iPhone Safari" },
  { state: "viewed", occurredAt: "Wed 28 May · 08:04 AEST", detail: "Viewed for 4 min 12 sec" },
]

export const COUNTER_CHANGES: ReadonlyArray<CounterOfferChange> = [
  {
    lineId: "line-2",
    title: "Mid-pipe Resonator – 3″ Stainless",
    original: 320.0,
    revised: 240.0,
  },
  {
    lineId: "line-4",
    title: "Workshop labour – Wideband O2 retune",
    original: 320.0,
    revised: 180.0,
  },
]

export const PRICING_PLANS: ReadonlyArray<PricingPlan> = [
  {
    id: "plan-essentials",
    name: "Essentials",
    tagline: "Cat-back only",
    price: 1895.0,
    ctaLabel: "Choose Essentials",
    features: [true, false, false, false, true],
  },
  {
    id: "plan-touring",
    name: "Touring",
    tagline: "Cat-back + fitment + tune",
    price: 2685.0,
    ctaLabel: "Choose Touring",
    recommended: true,
    features: [true, true, true, false, true],
  },
  {
    id: "plan-track",
    name: "Track Build",
    tagline: "Full system + heat wrap + bench dyno",
    price: 3845.0,
    ctaLabel: "Choose Track Build",
    features: [true, true, true, true, true],
  },
]

export const PRICING_FEATURES: ReadonlyArray<string> = [
  "Manta 3″ stainless cat-back",
  "Mid-pipe resonator upgrade",
  "Workshop labour included",
  "Bench-dyno verification report",
  "12-month parts & labour warranty",
]

export const SIGNATURE_DEFAULTS: SignatureRequest = {
  signerName: "Mikhail Petrov",
  signerEmail: "mikhail.petrov@silverline-fleet.com.au",
  subject: "Quote OFM-2641 — Hilux N80 Manta cat-back",
  coverNote:
    "G'day Mikhail — quote attached for the Hilux N80 full Manta stainless cat-back with fitment and tune. Valid 14 days from today. Let us know if you'd like the bundled option instead.",
}

export const DUPLICATE_SUMMARY: DuplicateQuoteSummary = {
  quoteNumber: "OFM-2638",
  customer: "Mikhail Petrov · Silverline Fleet Pty Ltd",
  vehicle: "2023 Toyota Hilux SR5 N80 — JTHLA9HX001234567",
  total: 2895.0,
  createdAt: "11 days ago (17 May 2026)",
  similarity: 92,
}
