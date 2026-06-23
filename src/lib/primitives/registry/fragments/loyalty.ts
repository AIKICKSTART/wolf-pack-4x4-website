import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "loyalty",
  "title": "Loyalty & membership",
  "group": "Marketing",
  "summary": "16 loyalty & membership primitives — member cards, tier progress/benefits, rewards catalogue and redeem flows, referral link/leaderboard, affiliate payouts, milestone/birthday celebrations, renewal and lapsed-member rescue — built on a shared LoyaltyTier model.",
  "entries": [
    {
      "key": "loyalty/loyalty-card",
      "family": "loyalty",
      "name": "LoyaltyCard",
      "label": "Loyalty card",
      "description": "Membership card surface showing tier badge, member identity, animated points balance and serial on a neuo/glass treatment.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/loyalty-card",
      "tags": [
        "membership",
        "card",
        "tier",
        "points"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/points-earning-row",
      "family": "loyalty",
      "name": "PointsEarningRow",
      "label": "Points earning row",
      "description": "Activity-feed list row showing a timestamped points action with a tone-coded earn/redeem/bonus/adjust delta chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/points-earning-row",
      "tags": [
        "points",
        "activity",
        "ledger"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/tier-progress-meter",
      "family": "loyalty",
      "name": "TierProgressMeter",
      "label": "Tier progress meter",
      "description": "Segmented progress meter computing distance from the current tier to the next, with a remaining-points chip and next-perk preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/tier-progress-meter",
      "tags": [
        "tier",
        "progress",
        "gamification"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/tier-benefits-card",
      "family": "loyalty",
      "name": "TierBenefitsCard",
      "label": "Tier benefits card",
      "description": "Dashboard card listing a tier's benefits with unlocked/locked state, an unlocked-count summary and an optional upgrade CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/tier-benefits-card",
      "tags": [
        "tier",
        "benefits",
        "perks"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/reward-catalogue-tile",
      "family": "loyalty",
      "name": "RewardCatalogueTile",
      "label": "Reward catalogue tile",
      "description": "Redeemable reward tile showing thumbnail, points cost, stock state and an affordability-gated redeem button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/reward-catalogue-tile",
      "tags": [
        "reward",
        "catalogue",
        "redeem"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/redeem-cta-button",
      "family": "loyalty",
      "name": "RedeemCtaButton",
      "label": "Redeem CTA button",
      "description": "Stateful redeem button cycling idle/confirming/redeemed/fail with async handler support and a confetti burst on success.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/redeem-cta-button",
      "tags": [
        "redeem",
        "cta",
        "button"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/referral-link-generator",
      "family": "loyalty",
      "name": "ReferralLinkGenerator",
      "label": "Referral link generator",
      "description": "Referral panel with copyable link and code, email/SMS/open share actions and an in-shop QR code for the referral URL.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/referral-link-generator",
      "tags": [
        "referral",
        "share",
        "qr"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/referral-leaderboard",
      "family": "loyalty",
      "name": "ReferralLeaderboard",
      "label": "Referral leaderboard",
      "description": "Sortable data table ranking top referrers by referral count and AUD earned, with rank chips and per-rank avatar tones.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/referral-leaderboard",
      "tags": [
        "referral",
        "leaderboard",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/affiliate-payout-history",
      "family": "loyalty",
      "name": "AffiliatePayoutHistory",
      "label": "Affiliate payout history",
      "description": "Sortable data table of affiliate payouts with date, AUD amount price tag, payout method and tone-coded status chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/affiliate-payout-history",
      "tags": [
        "affiliate",
        "payout",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/member-milestone-celebration",
      "family": "loyalty",
      "name": "MemberMilestoneCelebration",
      "label": "Member milestone celebration",
      "description": "Reveal-animated milestone surface with a kind badge, headline, optional earned-reward chip, share action and auto-firing confetti.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/member-milestone-celebration",
      "tags": [
        "milestone",
        "celebration",
        "confetti"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/membership-renewal-banner",
      "family": "loyalty",
      "name": "MembershipRenewalBanner",
      "label": "Membership renewal banner",
      "description": "Sticky renewal banner with urgency-driven copy, a days-remaining countdown chip and an auto-renew toggle.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/membership-renewal-banner",
      "tags": [
        "membership",
        "renewal",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/lapsed-member-rescue-card",
      "family": "loyalty",
      "name": "LapsedMemberRescueCard",
      "label": "Lapsed member rescue card",
      "description": "Win-back feature-spotlight surface with a personalised reactivation offer, win-back bullets and a reactivate CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/lapsed-member-rescue-card",
      "tags": [
        "winback",
        "retention",
        "offer"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/member-benefit-chip",
      "family": "loyalty",
      "name": "MemberBenefitChip",
      "label": "Member benefit chip",
      "description": "Compact chip labelling a member benefit with an earned/saved/redeemed/pending variant and a formatted AUD amount.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/member-benefit-chip",
      "tags": [
        "benefit",
        "chip",
        "savings"
      ],
      "status": "captured"
    },
    {
      "key": "loyalty/birthday-reward-card",
      "family": "loyalty",
      "name": "BirthdayRewardCard",
      "label": "Birthday reward card",
      "description": "Birthday surface greeting the member with bonus-points chip and a claim button/link that fires brand-coloured confetti.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/loyalty",
      "routeHref": "/ui-primitives/loyalty/birthday-reward-card",
      "tags": [
        "birthday",
        "reward",
        "confetti"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
