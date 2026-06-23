/**
 * Shared types for the Mufflermen Loyalty + Membership primitives.
 *
 * Mirrors the brand language used by the workshop floor — tier names follow
 * Bronze → Brodie (with Brodie being the top "Bay 2 mates" tier).
 */

export type LoyaltyTier = "bronze" | "silver" | "gold" | "platinum" | "brodie"

export type MilestoneKind =
  | "first-visit"
  | "tier-up"
  | "anniversary"
  | "100-visits"
  | "referral-streak"
  | "birthday"

export type PayoutMethod = "payid" | "bsb-transfer" | "store-credit"

export type RewardKind =
  | "free-dyno"
  | "exhaust-discount"
  | "inspection-waiver"
  | "priority-bay"
  | "branded-merch"
  | "service-credit"

export type MemberStatus = "active" | "pending-renewal" | "lapsed" | "vip-flagged"

export interface LoyaltyTierMeta {
  id: LoyaltyTier
  label: string
  pointsFloor: number
  pointsCeiling: number
  tone: "amber" | "teal" | "red" | "green" | "neutral"
}

export const TIER_META: Readonly<Record<LoyaltyTier, LoyaltyTierMeta>> = {
  bronze: { id: "bronze", label: "Bronze", pointsFloor: 0, pointsCeiling: 2500, tone: "amber" },
  silver: { id: "silver", label: "Silver", pointsFloor: 2500, pointsCeiling: 6000, tone: "neutral" },
  gold: { id: "gold", label: "Gold", pointsFloor: 6000, pointsCeiling: 12000, tone: "amber" },
  platinum: { id: "platinum", label: "Platinum", pointsFloor: 12000, pointsCeiling: 25000, tone: "teal" },
  brodie: { id: "brodie", label: "Brodie", pointsFloor: 25000, pointsCeiling: 100000, tone: "red" },
}

export const REWARD_LABEL: Readonly<Record<RewardKind, string>> = {
  "free-dyno": "Free dyno session",
  "exhaust-discount": "10% off next exhaust",
  "inspection-waiver": "Pre-inspection waiver",
  "priority-bay": "Bay 2 priority booking",
  "branded-merch": "Mufflermen branded merch",
  "service-credit": "Workshop service credit",
}

export const PAYOUT_LABEL: Readonly<Record<PayoutMethod, string>> = {
  payid: "PayID",
  "bsb-transfer": "BSB transfer",
  "store-credit": "Store credit",
}

export const MEMBER_STATUS_LABEL: Readonly<Record<MemberStatus, string>> = {
  active: "Active",
  "pending-renewal": "Pending renewal",
  lapsed: "Lapsed",
  "vip-flagged": "VIP flagged",
}

export function tierBeforeBrodie(tier: LoyaltyTier): LoyaltyTier | null {
  const order: ReadonlyArray<LoyaltyTier> = ["bronze", "silver", "gold", "platinum", "brodie"]
  const index = order.indexOf(tier)
  if (index <= 0) {
    return null
  }
  return order[index - 1]
}

export function nextTier(tier: LoyaltyTier): LoyaltyTier | null {
  const order: ReadonlyArray<LoyaltyTier> = ["bronze", "silver", "gold", "platinum", "brodie"]
  const index = order.indexOf(tier)
  if (index < 0 || index >= order.length - 1) {
    return null
  }
  return order[index + 1]
}
