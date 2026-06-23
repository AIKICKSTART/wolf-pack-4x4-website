import { Check, X } from "lucide-react"

import type { LandingPricingTier } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface PricingTableCardProps {
  kicker?: string
  heading: string
  body?: string
  tiers: ReadonlyArray<LandingPricingTier>
  /** Currency prefix shown beside the price. Defaults to "AUD". */
  currency?: string
  className?: string
}

const VARIANT_CLASS = {
  primary: styles.actionPrimary,
  secondary: styles.actionSecondary,
  ghost: styles.actionGhost,
} as const

const ACCENT_VAR: Record<NonNullable<LandingPricingTier["accent"]>, string> = {
  red: "color-mix(in oklab, var(--primitive-red) 20%, transparent)",
  amber: "color-mix(in oklab, var(--primitive-amber) 20%, transparent)",
  teal: "color-mix(in oklab, var(--primitive-teal) 20%, transparent)",
  green: "color-mix(in oklab, var(--primitive-green) 20%, transparent)",
}

/**
 * Primitive 06 — 3-column pricing table. Each card shows tier name, tagline,
 * monthly price (tabular numerics), setup note, an included/excluded feature
 * list with check / X icons, and a single CTA. One tier may carry a
 * `recommended` flag which lifts the card and adds the badge.
 */
export function PricingTableCard({
  kicker,
  heading,
  body,
  tiers,
  currency = "AUD",
  className,
}: PricingTableCardProps) {
  const sectionClasses = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses} aria-labelledby="pricing-heading">
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="pricing-heading" className={styles.heading}>
          {heading}
        </h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <div className={styles.pricingGrid}>
        {tiers.map((tier) => {
          const accentStyle = tier.accent
            ? ({ ["--pricing-accent" as string]: ACCENT_VAR[tier.accent] } as const)
            : undefined
          const cardClasses = [
            styles.pricingCard,
            tier.recommended ? styles.pricingCardRecommended : "",
          ]
            .filter(Boolean)
            .join(" ")
          const ctaVariant = tier.cta.variant ?? "secondary"

          return (
            <article
              key={tier.id}
              className={cardClasses}
              style={accentStyle}
              aria-label={`${tier.name} plan`}
            >
              {tier.recommended ? (
                <span className={styles.pricingBadge}>Recommended</span>
              ) : null}
              <header className={styles.pricingHead}>
                <h3 className={styles.pricingName}>{tier.name}</h3>
                <p className={styles.pricingTagline}>{tier.tagline}</p>
              </header>
              <div>
                <p className={styles.pricingPrice}>
                  <strong>
                    ${tier.monthlyPrice.toLocaleString("en-AU")}
                  </strong>
                  <span>/ mo · {currency}</span>
                </p>
                {tier.setupNote ? (
                  <p className={styles.pricingSetup}>{tier.setupNote}</p>
                ) : null}
              </div>
              <ul className={styles.pricingFeatures}>
                {tier.features.map((feature) => (
                  <li
                    key={feature.label}
                    data-included={feature.included ? "true" : "false"}
                  >
                    <span className={styles.pricingFeatureIcon} aria-hidden="true">
                      {feature.included ? (
                        <Check size={14} strokeWidth={2.2} />
                      ) : (
                        <X size={14} strokeWidth={2.2} />
                      )}
                    </span>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`${styles.action} ${VARIANT_CLASS[ctaVariant]}`}
                href={tier.cta.href}
              >
                <span>{tier.cta.label}</span>
                <span className={styles.arrow} aria-hidden="true" />
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default PricingTableCard
