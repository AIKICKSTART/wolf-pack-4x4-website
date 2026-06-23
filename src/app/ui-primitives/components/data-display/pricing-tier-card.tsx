import Link from "next/link"

import styles from "./pricing-tier-card.module.css"

export interface PricingFeature {
  label: string
  included?: boolean
}

interface PricingTierCardProps {
  kicker?: string
  name: string
  tagline?: string
  price: string
  currency?: string
  period?: string
  ribbon?: string
  features: ReadonlyArray<PricingFeature>
  cta: {
    label: string
    href: string
  }
  highlight?: boolean
  className?: string
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 8h8" strokeLinecap="round" />
    </svg>
  )
}

export function PricingTierCard({
  kicker,
  name,
  tagline,
  price,
  currency = "AUD",
  period = "per month",
  ribbon,
  features,
  cta,
  highlight = false,
  className,
}: PricingTierCardProps) {
  const classes = [styles.card, highlight && styles.highlight, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${name} pricing tier`}>
      {ribbon && <span className={styles.ribbon}>{ribbon}</span>}
      <header>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <h3 className={styles.name}>{name}</h3>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
      </header>
      <div className={styles.priceRow}>
        <span className={styles.currency}>{currency}</span>
        <span className={styles.price}>{price}</span>
        <span className={styles.period}>{period}</span>
      </div>
      <ul className={styles.featureList}>
        {features.map((feature) => {
          const included = feature.included !== false
          return (
            <li key={feature.label} data-included={included ? "true" : "false"}>
              {included ? <CheckIcon /> : <MinusIcon />}
              <span>{feature.label}</span>
            </li>
          )
        })}
      </ul>
      <Link href={cta.href} className={`${styles.cta} ${highlight ? styles.ctaPrimary : ""}`}>
        {cta.label}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default PricingTierCard
