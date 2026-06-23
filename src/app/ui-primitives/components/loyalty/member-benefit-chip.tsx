import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./member-benefit-chip.module.css"

export type MemberBenefitVariant = "earned" | "saved" | "redeemed" | "pending"

interface MemberBenefitChipProps {
  /** Benefit label, e.g. "Dyno session", "Inspection waiver". */
  benefitLabel: string
  /** Earned/saved amount in AUD (or numeric value). */
  earnedAmount: number
  /** Currency for the amount. Default AUD. */
  currency?: string
  /** Visual variant, drives tone. */
  variant?: MemberBenefitVariant
  className?: string
}

const VARIANT_TONE: Record<MemberBenefitVariant, ChipTone> = {
  earned: "green",
  saved: "teal",
  redeemed: "amber",
  pending: "neutral",
}

const VARIANT_PREFIX: Record<MemberBenefitVariant, string> = {
  earned: "Earned",
  saved: "Saved",
  redeemed: "Redeemed",
  pending: "Pending",
}

function formatAmount(value: number, currency: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function MemberBenefitChip({
  benefitLabel,
  earnedAmount,
  currency = "AUD",
  variant = "earned",
  className,
}: MemberBenefitChipProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const label = `${benefitLabel} · ${VARIANT_PREFIX[variant]} ${formatAmount(earnedAmount, currency)}`

  return (
    <span className={classes} data-variant={variant}>
      <Chip label={label} tone={VARIANT_TONE[variant]} />
    </span>
  )
}

export default MemberBenefitChip
