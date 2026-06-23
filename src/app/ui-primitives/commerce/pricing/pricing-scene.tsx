"use client"

import { useState } from "react"

import {
  SubscriptionTierToggle,
  type SubscriptionTier,
  type SubscriptionTierOption,
} from "../../components/commerce/subscription-tier-toggle"
import { PricingTierCard, type PricingFeature } from "../../components/data-display/pricing-tier-card"

import styles from "../commerce.module.css"

const TIER_OPTIONS: ReadonlyArray<SubscriptionTierOption> = [
  { key: "monthly", label: "Monthly" },
  { key: "annual", label: "Annual", savingsBadge: "Save 25%" },
  { key: "lifetime", label: "Lifetime" },
]

interface PricingPlan {
  kicker: string
  name: string
  tagline: string
  ribbon?: string
  highlight?: boolean
  features: ReadonlyArray<PricingFeature>
  prices: Record<SubscriptionTier, { price: string; period: string }>
}

const PLANS: ReadonlyArray<PricingPlan> = [
  {
    kicker: "Workshop Starter",
    name: "Bay Day",
    tagline: "Once-a-month maintenance covered.",
    features: [
      { label: "1 service visit / month" },
      { label: "Free roadworthy check" },
      { label: "Workshop loaner key fob" },
      { label: "Priority booking slots", included: false },
      { label: "Loan vehicle for big jobs", included: false },
    ],
    prices: {
      monthly: { price: "39", period: "per month" },
      annual: { price: "349", period: "per year" },
      lifetime: { price: "999", period: "one-time" },
    },
  },
  {
    kicker: "Workshop Pro",
    name: "Pit Crew",
    tagline: "The Oak Flats favourite. Most bookings.",
    ribbon: "Most popular",
    highlight: true,
    features: [
      { label: "Unlimited services / quarter" },
      { label: "Priority booking slots" },
      { label: "Free roadworthy + rego check" },
      { label: "Member-only parts pricing" },
      { label: "Loan vehicle for big jobs" },
    ],
    prices: {
      monthly: { price: "89", period: "per month" },
      annual: { price: "799", period: "per year" },
      lifetime: { price: "2,899", period: "one-time" },
    },
  },
  {
    kicker: "Fleet & enthusiast",
    name: "Garage Master",
    tagline: "Multi-vehicle households and small fleets.",
    features: [
      { label: "Up to 4 vehicles covered" },
      { label: "Concierge bay scheduling" },
      { label: "Priority booking slots" },
      { label: "Dedicated account manager" },
      { label: "Loan vehicle anytime" },
    ],
    prices: {
      monthly: { price: "189", period: "per month" },
      annual: { price: "1,699", period: "per year" },
      lifetime: { price: "6,499", period: "one-time" },
    },
  },
]

export function PricingScene() {
  const [tier, setTier] = useState<SubscriptionTier>("annual")

  return (
    <>
      <section className={styles.pricingHero}>
        <span className={styles.pricingHeroKicker}>Workshop subscriptions</span>
        <h2 className={styles.pricingHeroTitle}>Drive in, drive out, always covered</h2>
        <p className={styles.pricingHeroCopy}>
          Three flat-rate workshop tiers built for everyday drivers, enthusiasts, and small fleets across the Illawarra. Cancel any time. No setup fees.
        </p>
        <SubscriptionTierToggle
          options={TIER_OPTIONS}
          value={tier}
          onChange={setTier}
        />
      </section>

      <section className={styles.pricingGrid} aria-label="Workshop pricing tiers">
        {PLANS.map((plan) => {
          const price = plan.prices[tier]
          return (
            <PricingTierCard
              key={plan.name}
              kicker={plan.kicker}
              name={plan.name}
              tagline={plan.tagline}
              price={price.price}
              period={price.period}
              ribbon={plan.ribbon}
              highlight={plan.highlight}
              features={plan.features}
              cta={{ label: "Choose tier", href: "/ui-primitives/commerce/checkout" }}
            />
          )
        })}
      </section>
    </>
  )
}
