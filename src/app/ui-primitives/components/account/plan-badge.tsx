import { Crown, Sparkles } from "lucide-react"

import styles from "./plan-badge.module.css"

export type PlanTier = "starter" | "workshop" | "fleet" | "enterprise"
export type PlanBadgeSize = "sm" | "md" | "lg"

interface PlanBadgeProps {
  tier: PlanTier
  size?: PlanBadgeSize
  caption?: string
  className?: string
}

const TIER_LABEL: Record<PlanTier, string> = {
  starter: "Starter",
  workshop: "Workshop",
  fleet: "Fleet",
  enterprise: "Enterprise",
}

const TIER_TONE_CLASS: Record<PlanTier, string> = {
  starter: styles.toneStarter,
  workshop: styles.toneWorkshop,
  fleet: styles.toneFleet,
  enterprise: styles.toneEnterprise,
}

const SIZE_CLASS: Record<PlanBadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const TOP_TIERS: ReadonlySet<PlanTier> = new Set(["fleet", "enterprise"])

export function PlanBadge({ tier, size = "md", caption, className }: PlanBadgeProps) {
  const classes = [styles.badge, TIER_TONE_CLASS[tier], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ")
  const isTop = TOP_TIERS.has(tier)

  return (
    <span className={classes} role="status" aria-label={`Plan tier: ${TIER_LABEL[tier]}`}>
      <span className={styles.icon} aria-hidden="true">
        {isTop ? <Crown size={14} strokeWidth={2.2} /> : <Sparkles size={14} strokeWidth={2.2} />}
      </span>
      <span className={styles.label}>
        <span className={styles.kicker}>Plan</span>
        <span className={styles.tier}>{TIER_LABEL[tier]}</span>
      </span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </span>
  )
}

export default PlanBadge
