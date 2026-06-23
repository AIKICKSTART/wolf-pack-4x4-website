"use client"

import { Cake, Gift } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import { Avatar } from "../primitives/avatar"
import { ConfettiBurst, type ConfettiBurstHandle } from "../primitives/confetti-burst"
import { Chip } from "../primitives/chip"

import styles from "./birthday-reward-card.module.css"

const CONFETTI_TONE_TOKENS = [
  "--primitive-amber",
  "--primitive-red",
  "--primitive-teal",
  "--primitive-text-on-accent",
] as const

function resolveConfettiColors(): string[] {
  if (typeof window === "undefined") {
    return []
  }
  const root = getComputedStyle(document.documentElement)
  return CONFETTI_TONE_TOKENS.map((token) => root.getPropertyValue(token).trim()).filter(Boolean)
}

interface BirthdayRewardCardProps {
  memberName: string
  /** Bonus points awarded for birthday. */
  bonusPoints: number
  /** Reward CTA URL when claimed. */
  claimHref?: string
  /** Optional onClaim handler. If provided, overrides href and runs imperatively. */
  onClaim?: () => void
  /** Avatar src for the member. */
  avatarSrc?: string
  className?: string
}

export function BirthdayRewardCard({
  memberName,
  bonusPoints,
  claimHref,
  onClaim,
  avatarSrc,
  className,
}: BirthdayRewardCardProps) {
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)
  const [claimed, setClaimed] = useState<boolean>(false)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleClaim = useCallback(() => {
    const colors = resolveConfettiColors()
    confettiRef.current?.fire({
      particleCount: 90,
      spread: 90,
      ...(colors.length > 0 ? { colors } : {}),
    })
    setClaimed(true)
    onClaim?.()
  }, [onClaim])

  return (
    <article
      className={classes}
      role="region"
      aria-label={`Birthday reward — ${bonusPoints.toLocaleString("en-AU")} bonus points for ${memberName}`}
    >
      <ConfettiBurst ref={confettiRef} className={styles.confetti} ariaLabel="Birthday confetti" />
      <div className={styles.head}>
        <Avatar name={memberName} src={avatarSrc} size="lg" tone="amber" status="online" />
        <div className={styles.headCopy}>
          <span className={styles.kicker}>Birthday Bay</span>
          <h2 className={styles.title}>Happy birthday, {memberName.split(" ")[0]}</h2>
        </div>
        <span className={styles.cake} aria-hidden="true">
          <Cake size={28} strokeWidth={2.2} />
        </span>
      </div>

      <div className={styles.bonusRow}>
        <Chip
          label={`+${bonusPoints.toLocaleString("en-AU")} bonus pts`}
          tone="amber"
          icon={<Gift size={12} strokeWidth={2.4} aria-hidden="true" />}
        />
        <p className={styles.copy}>
          Bay 2 is yours all day. We toss in a free coffee, a Mufflermen sticker pack,
          and {bonusPoints.toLocaleString("en-AU")} bonus points credited tonight.
        </p>
      </div>

      <div className={styles.foot}>
        {claimHref && !onClaim ? (
          <a className={styles.claim} href={claimHref}>
            Claim birthday bonus
          </a>
        ) : (
          <button
            type="button"
            className={styles.claim}
            onClick={handleClaim}
            aria-live="polite"
            aria-disabled={claimed}
            disabled={claimed}
          >
            {claimed ? "Bonus credited" : "Claim birthday bonus"}
          </button>
        )}
      </div>
    </article>
  )
}

export default BirthdayRewardCard
