import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./quota-purchase-card.module.css"

export interface QuotaTier {
  id: string
  name: string
  /** Tier monthly price, e.g. "$0", "$49", "$199". */
  price: string
  /** Bundled quota e.g. "10k requests / mo". */
  quota: string
  /** Top three included perks. */
  perks: ReadonlyArray<string>
}

export interface QuotaPurchaseCardProps {
  /** Service/provider name, e.g. "Replicate", "Mailgun". */
  service: string
  /** Current tier identifier. */
  currentTierId: string
  /** Recommended next-tier identifier. */
  recommendedTierId: string
  /** Tier definitions, in price-ascending order. */
  tiers: ReadonlyArray<QuotaTier>
  /** Current usage value. */
  currentUsage: number
  /** Quota cap for the current tier. */
  currentCap: number
  /** Unit label, e.g. "requests", "MB", "minutes". */
  unit: string
  className?: string
}

export function QuotaPurchaseCard({
  service,
  currentTierId,
  recommendedTierId,
  tiers,
  currentUsage,
  currentCap,
  unit,
  className,
}: QuotaPurchaseCardProps) {
  const safeUsage = Math.max(0, currentUsage)
  const safeCap = Math.max(1, currentCap)
  const ratio = Math.min(1, safeUsage / safeCap)
  const pct = Math.round(ratio * 100)
  const progressTone = ratio >= 0.9 ? "red" : ratio >= 0.7 ? "amber" : "green"

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${service} quota — ${pct}% used. Recommended upgrade in card.`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Upgrade tier</span>
          <h3 className={styles.service}>{service}</h3>
        </div>
        <span className={styles.usagePill}>{pct}% used</span>
      </header>

      <div className={styles.usageBlock}>
        <div className={styles.usageNumbers}>
          <span className={styles.usageCurrent}>
            {safeUsage.toLocaleString()} {unit}
          </span>
          <span className={styles.usageCap}>
            of {safeCap.toLocaleString()} {unit}
          </span>
        </div>
        <ProgressLinear
          value={safeUsage}
          max={safeCap}
          tone={progressTone}
          variant="segmented"
          segments={12}
          label={`${service} quota usage`}
        />
      </div>

      <ul className={styles.tiers} aria-label={`${service} pricing tiers`}>
        {tiers.map((tier) => {
          const isCurrent = tier.id === currentTierId
          const isRecommended = tier.id === recommendedTierId
          return (
            <li
              key={tier.id}
              className={[
                styles.tier,
                isCurrent ? styles.tierCurrent : "",
                isRecommended ? styles.tierRecommended : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.tierHead}>
                <span className={styles.tierName}>{tier.name}</span>
                <span className={styles.tierPrice}>{tier.price}</span>
              </div>
              <span className={styles.tierQuota}>{tier.quota}</span>
              <ul className={styles.perks}>
                {tier.perks.map((perk) => (
                  <li key={perk} className={styles.perk}>
                    <span className={styles.perkBullet} aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
              <div className={styles.tierFooter}>
                {isCurrent ? <span className={styles.tierBadge}>Current</span> : null}
                {isRecommended ? (
                  <span className={[styles.tierBadge, styles.tierBadgeRecommended].join(" ")}>
                    Recommended
                  </span>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default QuotaPurchaseCard
