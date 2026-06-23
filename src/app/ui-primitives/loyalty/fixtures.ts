/**
 * Shared fixtures for loyalty sub-routes — keeps Mufflermen brand voice
 * consistent across every scene.
 */

import type { AffiliatePayoutRow } from "../components/loyalty/affiliate-payout-history"
import type { ReferralLeaderRow } from "../components/loyalty/referral-leaderboard"
import type { TierBenefit } from "../components/loyalty/tier-benefits-card"
import type { LoyaltyTier } from "../components/loyalty/loyalty-types"

export const SAMPLE_MEMBER = {
  id: "OFM-A7320-K9",
  name: "Daniel Fleuren",
  tier: "platinum" as LoyaltyTier,
  pointsBalance: 18420,
  memberSinceISO: "2021-03-08",
  referralCode: "MUFFLER-DAN-2026",
  referralUrl: "https://mufflermen.com.au/r/dan-26",
}

export const SAMPLE_LEDGER: ReadonlyArray<{
  id: string
  timestamp: string
  action: string
  detail: string
  points: number
  kind: "earn" | "bonus" | "redeem" | "adjust"
}> = [
  {
    id: "act-01",
    timestamp: "2026-05-28T09:14:00+10:00",
    action: "Job completed Bay 2",
    detail: "Exhaust rebuild WO-30418 · 3.2 hrs",
    points: 320,
    kind: "earn",
  },
  {
    id: "act-02",
    timestamp: "2026-05-25T15:42:00+10:00",
    action: "Birthday bonus credited",
    detail: "Annual birthday reward",
    points: 1000,
    kind: "bonus",
  },
  {
    id: "act-03",
    timestamp: "2026-05-21T11:08:00+10:00",
    action: "Reward redeemed",
    detail: "Pre-inspection waiver — WO-30381",
    points: -2500,
    kind: "redeem",
  },
  {
    id: "act-04",
    timestamp: "2026-05-18T08:32:00+10:00",
    action: "Mate referred — Sam K.",
    detail: "First service completed",
    points: 600,
    kind: "earn",
  },
  {
    id: "act-05",
    timestamp: "2026-05-14T17:55:00+10:00",
    action: "Stuart adjustment",
    detail: "Goodwill credit · misquoted muffler clamp",
    points: 150,
    kind: "adjust",
  },
]

export const SAMPLE_BENEFITS: ReadonlyArray<TierBenefit> = [
  { id: "b1", label: "Priority Bay 2 booking", detail: "Get the first slot Monday mornings", unlocked: true },
  { id: "b2", label: "Free dyno session quarterly", detail: "Includes printed run sheet", unlocked: true },
  { id: "b3", label: "Pre-inspection waiver", detail: "Skip the rego pre-inspection charge", unlocked: true },
  { id: "b4", label: "Mufflermen branded merch", detail: "Cap, sticker pack, workshop tee", unlocked: true },
  { id: "b5", label: "10% off exhaust systems", detail: "Manta, Genie, X-Force, Hurricane", unlocked: true },
  { id: "b6", label: "Brodie tier price-lock", detail: "Lock current pricing for two years", unlocked: false },
  { id: "b7", label: "Bay 2 mates lounge access", detail: "Quiet floor, coffee, paddock view", unlocked: false },
  { id: "b8", label: "Stuart's mobile after-hours", detail: "Direct line for emergency tow", unlocked: false },
]

export const SAMPLE_LEADERBOARD: ReadonlyArray<ReferralLeaderRow> = [
  { id: "l1", rank: 1, name: "Brodie Tasker", referralCount: 41, earnedAud: 1025 },
  { id: "l2", rank: 2, name: "Mick Halloran", referralCount: 28, earnedAud: 700 },
  { id: "l3", rank: 3, name: "Ange D'Souza", referralCount: 22, earnedAud: 550 },
  { id: "l4", rank: 4, name: "Daniel Fleuren", referralCount: 19, earnedAud: 475 },
  { id: "l5", rank: 5, name: "Sam Kovacic", referralCount: 14, earnedAud: 350 },
  { id: "l6", rank: 6, name: "Marshall Yu", referralCount: 11, earnedAud: 275 },
  { id: "l7", rank: 7, name: "Reece Beattie", referralCount: 9, earnedAud: 225 },
  { id: "l8", rank: 8, name: "Phoebe O'Hara", referralCount: 7, earnedAud: 175 },
]

export const SAMPLE_PAYOUTS: ReadonlyArray<AffiliatePayoutRow> = [
  { id: "p1", dateISO: "2026-05-26", amountAud: 175, method: "payid", status: "paid", reference: "PAYID DAN@MUFFLERMEN.AU" },
  { id: "p2", dateISO: "2026-05-12", amountAud: 125, method: "bsb-transfer", status: "paid", reference: "BSB 062-000 · 1234 5678" },
  { id: "p3", dateISO: "2026-04-28", amountAud: 75, method: "store-credit", status: "paid", reference: "STORE-CR-04-26" },
  { id: "p4", dateISO: "2026-04-14", amountAud: 100, method: "payid", status: "paid", reference: "PAYID DAN@MUFFLERMEN.AU" },
  { id: "p5", dateISO: "2026-05-30", amountAud: 200, method: "payid", status: "scheduled", reference: "PAYID DAN@MUFFLERMEN.AU" },
  { id: "p6", dateISO: "2026-03-30", amountAud: 50, method: "bsb-transfer", status: "failed", reference: "BSB 062-000 · 0000 0000" },
]
