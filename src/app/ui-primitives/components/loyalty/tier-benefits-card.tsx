import { Check, Lock, ChevronRight } from "lucide-react"
import Link from "next/link"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import { TIER_META, type LoyaltyTier } from "./loyalty-types"
import styles from "./tier-benefits-card.module.css"

export interface TierBenefit {
  /** Stable identifier per benefit. */
  id: string
  /** Human-readable benefit headline. */
  label: string
  /** Optional supporting detail. */
  detail?: string
  /** Whether this benefit is already unlocked for the member. */
  unlocked: boolean
}

interface TierBenefitsCardProps {
  tier: LoyaltyTier
  benefits: ReadonlyArray<TierBenefit>
  /** Optional CTA — upgrade or learn more. */
  upgradeHref?: string
  upgradeLabel?: string
  className?: string
}

const TIER_TONE: Record<LoyaltyTier, ChipTone> = {
  bronze: "amber",
  silver: "neutral",
  gold: "amber",
  platinum: "teal",
  brodie: "red",
}

export function TierBenefitsCard({
  tier,
  benefits,
  upgradeHref,
  upgradeLabel = "Unlock next tier",
  className,
}: TierBenefitsCardProps) {
  const meta = TIER_META[tier]
  const classes = [styles.shell, className].filter(Boolean).join(" ")
  const unlockedCount = benefits.filter((entry) => entry.unlocked).length
  const totalCount = benefits.length

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${meta.label} tier benefits — ${unlockedCount} of ${totalCount} unlocked`}
    >
      <DashboardCard
        label={`${meta.label} tier`}
        value={`${unlockedCount}/${totalCount}`}
        unit="perks"
        meta="Benefits unlocked at this tier"
        surface="neuo"
      />
      <ul className={styles.list}>
        {benefits.map((benefit) => (
          <li
            key={benefit.id}
            className={styles.item}
            data-unlocked={benefit.unlocked ? "true" : "false"}
          >
            <span className={styles.icon} aria-hidden="true">
              {benefit.unlocked ? <Check size={16} strokeWidth={2.4} /> : <Lock size={14} strokeWidth={2.2} />}
            </span>
            <div className={styles.body}>
              <p className={styles.label}>{benefit.label}</p>
              {benefit.detail ? <p className={styles.detail}>{benefit.detail}</p> : null}
            </div>
            <Chip
              label={benefit.unlocked ? "Active" : "Locked"}
              tone={benefit.unlocked ? "green" : TIER_TONE[tier]}
            />
          </li>
        ))}
      </ul>
      {upgradeHref ? (
        <Link href={upgradeHref} className={styles.upgrade}>
          <span>{upgradeLabel}</span>
          <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      ) : null}
    </section>
  )
}

export default TierBenefitsCard
