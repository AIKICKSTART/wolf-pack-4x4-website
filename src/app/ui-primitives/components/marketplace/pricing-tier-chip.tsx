import {
  Building2,
  Crown,
  Gauge,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { PRICING_TIER_LABEL, type PricingTier } from "./marketplace-types"
import styles from "./pricing-tier-chip.module.css"

export interface PricingTierChipProps {
  tier: PricingTier
  priceLabel?: string
  className?: string
}

const TIER_TONE_CLASS: Record<PricingTier, string> = {
  free: styles.toneFree,
  pro: styles.tonePro,
  enterprise: styles.toneEnterprise,
  "pay-per-use": styles.tonePayPerUse,
}

const TIER_ICON: Record<PricingTier, LucideIcon> = {
  free: Sparkles,
  pro: Crown,
  enterprise: Building2,
  "pay-per-use": Gauge,
}

export function PricingTierChip({ tier, priceLabel, className }: PricingTierChipProps) {
  const Icon = TIER_ICON[tier]
  const classes = [styles.chip, TIER_TONE_CLASS[tier], className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} aria-label={`Pricing tier: ${PRICING_TIER_LABEL[tier]}`}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={12} strokeWidth={2.4} />
      </span>
      {PRICING_TIER_LABEL[tier]}
      {priceLabel && <span className={styles.priceSuffix}>· {priceLabel}</span>}
    </span>
  )
}

export default PricingTierChip
