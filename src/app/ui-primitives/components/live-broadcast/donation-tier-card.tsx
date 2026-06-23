import { Check, Crown, Sparkles, Wrench } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./donation-tier-card.module.css"
import type { SupporterTier, SupporterTierDescriptor } from "./live-broadcast-types"

interface DonationTierCardProps {
  descriptor: SupporterTierDescriptor
  className?: string
}

const TIER_GLYPH: Record<SupporterTier, ReactNode> = {
  "workshop-crew": <Wrench size={14} strokeWidth={2.2} aria-hidden="true" />,
  "inner-circle": <Sparkles size={14} strokeWidth={2.2} aria-hidden="true" />,
  "pit-boss": <Crown size={14} strokeWidth={2.2} aria-hidden="true" />,
  platinum: <Crown size={14} strokeWidth={2.2} aria-hidden="true" />,
}

const TIER_TONE_CLASS: Record<SupporterTier, string> = {
  "workshop-crew": "toneBronze",
  "inner-circle": "toneSilver",
  "pit-boss": "toneGold",
  platinum: "tonePlatinum",
}

export function DonationTierCard({ descriptor, className }: DonationTierCardProps) {
  const classes = [
    styles.card,
    styles[TIER_TONE_CLASS[descriptor.tier]],
    descriptor.isCurrent ? styles.current : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${descriptor.label} tier`}>
      <header className={styles.head}>
        <span className={styles.tierBadge}>
          {TIER_GLYPH[descriptor.tier]}
          {descriptor.label}
        </span>
        {descriptor.isCurrent ? <span className={styles.currentChip}>Your tier</span> : null}
      </header>

      <div className={styles.priceRow}>
        <span className={styles.price}>{descriptor.priceLabel}</span>
        <span className={styles.supporters}>
          <span className={styles.supportersValue}>
            {descriptor.supporterCount.toLocaleString("en-AU")}
          </span>
          <span className={styles.supportersLabel}>supporters</span>
        </span>
      </div>

      <p className={styles.tagline}>{descriptor.tagline}</p>

      <ul className={styles.perks}>
        {descriptor.perks.map((perk, idx) => (
          <li key={`${descriptor.tier}-perk-${idx}`} className={styles.perk}>
            <span className={styles.perkCheck} aria-hidden="true">
              <Check size={11} strokeWidth={2.6} aria-hidden="true" />
            </span>
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <button type="button" className={styles.cta}>
        {descriptor.isCurrent ? "Manage tier" : `Join ${descriptor.label}`}
      </button>
    </article>
  )
}

export default DonationTierCard
