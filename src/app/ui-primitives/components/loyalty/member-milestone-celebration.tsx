"use client"

import { Share2 } from "lucide-react"
import { useEffect, useRef } from "react"

import { Reveal } from "../motion/reveal"
import { ConfettiBurst, type ConfettiBurstHandle } from "../primitives/confetti-burst"
import { Chip } from "../primitives/chip"

import { type MilestoneKind } from "./loyalty-types"
import styles from "./member-milestone-celebration.module.css"

interface MemberMilestoneCelebrationProps {
  /** Type of milestone to celebrate. */
  kind: MilestoneKind
  /** Headline shown to the member. */
  headline: string
  /** Optional supporting copy. */
  detail?: string
  /** Optional earned reward (chip label). */
  earnedRewardLabel?: string
  /** Whether to fire confetti automatically when the surface appears. */
  autoFire?: boolean
  /** Optional share handler. */
  onShare?: () => void
  className?: string
}

const MILESTONE_BADGE: Record<MilestoneKind, string> = {
  "first-visit": "First Visit",
  "tier-up": "Tier Up",
  anniversary: "Anniversary",
  "100-visits": "Hundred-up",
  "referral-streak": "Referral Streak",
  birthday: "Birthday",
}

export function MemberMilestoneCelebration({
  kind,
  headline,
  detail,
  earnedRewardLabel,
  autoFire = true,
  onShare,
  className,
}: MemberMilestoneCelebrationProps) {
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)
  const firedRef = useRef<boolean>(false)

  useEffect(() => {
    if (!autoFire || firedRef.current) {
      return
    }
    const timer = window.setTimeout(() => {
      confettiRef.current?.cannon({ particleCount: 60, spread: 80, startVelocity: 42 })
      firedRef.current = true
    }, 280)
    return () => window.clearTimeout(timer)
  }, [autoFire])

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <Reveal as="section" from="below" className={classes}>
      <ConfettiBurst ref={confettiRef} className={styles.confetti} ariaLabel="Milestone confetti" />
      <article
        className={styles.inner}
        role="region"
        aria-label={`Milestone celebration — ${MILESTONE_BADGE[kind]}`}
      >
        <span className={styles.badge}>{MILESTONE_BADGE[kind]}</span>
        <h2 className={styles.headline} aria-live="polite">
          {headline}
        </h2>
        {detail ? <p className={styles.detail}>{detail}</p> : null}
        <div className={styles.foot}>
          {earnedRewardLabel ? <Chip label={earnedRewardLabel} tone="amber" /> : null}
          {onShare ? (
            <button type="button" className={styles.share} onClick={onShare}>
              <Share2 size={14} strokeWidth={2.2} aria-hidden="true" />
              <span>Share</span>
            </button>
          ) : null}
        </div>
      </article>
    </Reveal>
  )
}

export default MemberMilestoneCelebration
