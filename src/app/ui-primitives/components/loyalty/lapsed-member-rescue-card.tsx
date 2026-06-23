import { Heart, Wrench } from "lucide-react"

import { FeatureSpotlight } from "../marketing/feature-spotlight"
import { Chip } from "../primitives/chip"

import styles from "./lapsed-member-rescue-card.module.css"

interface LapsedMemberRescueCardProps {
  memberName: string
  /** How long the member has been lapsed (e.g. "8 months"). */
  lapsedSince: string
  /** Offer headline displayed in the spotlight. */
  offerLabel: string
  /** Offer supporting copy. */
  offerDetail: string
  /** CTA URL for reactivation. */
  reactivateHref: string
  /** Last service line — gives the floor team a hook. */
  lastService?: string
  className?: string
}

export function LapsedMemberRescueCard({
  memberName,
  lapsedSince,
  offerLabel,
  offerDetail,
  reactivateHref,
  lastService,
  className,
}: LapsedMemberRescueCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Reactivation offer for ${memberName}`}
    >
      <FeatureSpotlight
        kicker={`We miss you · ${lapsedSince}`}
        heading={`${memberName}, the bay still has your name on it`}
        body={offerDetail}
        bullets={[
          { icon: <Wrench size={14} strokeWidth={2.2} />, label: lastService ?? "Pick up where we left off — service notes saved" },
          { icon: <Heart size={14} strokeWidth={2.2} />, label: "Welcome-back bonus credited day one" },
          { label: "No re-activation fee — Brodie price-lock honoured" },
        ]}
        action={{ label: "Reactivate membership", href: reactivateHref }}
        visual={
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.visualGlow} />
            <Chip label={offerLabel} tone="amber" />
            <span className={styles.visualPlate}>OAK FLATS · BAY 2</span>
          </div>
        }
      />
    </section>
  )
}

export default LapsedMemberRescueCard
