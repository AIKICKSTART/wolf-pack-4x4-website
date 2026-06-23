"use client"

import { Check, Minus } from "lucide-react"

import { formatCurrency } from "./quote-types"
import styles from "./pricing-comparison-block.module.css"

export interface PricingPlan {
  id: string
  name: string
  tagline: string
  price: number
  /** Whether the feature row is included on this plan. Order matches PricingComparisonBlockProps.features. */
  features: ReadonlyArray<boolean>
  recommended?: boolean
  ctaLabel: string
}

interface PricingComparisonBlockProps {
  title: string
  description: string
  features: ReadonlyArray<string>
  plans: ReadonlyArray<PricingPlan>
  currency?: string
  onSelect?: (planId: string) => void
}

export function PricingComparisonBlock({
  title,
  description,
  features,
  plans,
  currency = "AUD",
  onSelect,
}: PricingComparisonBlockProps) {
  return (
    <section className={styles.block} aria-labelledby="pricing-block-title">
      <header className={styles.head}>
        <h3 id="pricing-block-title" className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </header>
      <div
        className={styles.grid}
        style={{ ["--plan-count" as string]: String(plans.length) }}
      >
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={[styles.plan, plan.recommended && styles.planRecommended]
              .filter(Boolean)
              .join(" ")}
            aria-labelledby={`plan-${plan.id}-title`}
          >
            {plan.recommended && (
              <span className={styles.badge}>Recommended</span>
            )}
            <header className={styles.planHead}>
              <h4 id={`plan-${plan.id}-title`} className={styles.planTitle}>{plan.name}</h4>
              <p className={styles.tagline}>{plan.tagline}</p>
              <p className={styles.price}>
                <strong>{formatCurrency(plan.price, currency)}</strong>
                <span className={styles.priceUnit}>+ GST</span>
              </p>
            </header>
            <ul className={styles.features}>
              {features.map((feature, index) => {
                const enabled = plan.features[index] ?? false
                return (
                  <li
                    key={feature}
                    className={[styles.feature, !enabled && styles.featureDisabled]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className={styles.featureIcon} aria-hidden="true">
                      {enabled ? <Check size={14} /> : <Minus size={14} />}
                    </span>
                    <span>{feature}</span>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              className={styles.cta}
              onClick={() => onSelect?.(plan.id)}
            >
              {plan.ctaLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PricingComparisonBlock
