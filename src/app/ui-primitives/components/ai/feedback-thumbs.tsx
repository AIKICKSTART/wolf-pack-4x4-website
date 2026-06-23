"use client"

import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useRef, useState } from "react"

import { ConfettiBurst } from "../primitives/confetti-burst"
import type { ConfettiBurstHandle } from "../primitives/confetti-burst"
import styles from "./feedback-thumbs.module.css"

export type FeedbackVote = "up" | "down" | null

const CONFETTI_TONE_TOKENS = [
  "--primitive-green",
  "--primitive-amber",
  "--primitive-teal",
  "--primitive-text-strong",
] as const

function resolveConfettiColors(): string[] {
  if (typeof window === "undefined") {
    return []
  }
  const root = getComputedStyle(document.documentElement)
  return CONFETTI_TONE_TOKENS.map((token) => root.getPropertyValue(token).trim()).filter(Boolean)
}

export interface FeedbackReason {
  id: string
  label: string
}

interface FeedbackThumbsProps {
  initialVote?: FeedbackVote
  reasons?: ReadonlyArray<FeedbackReason>
  onVoteChange?: (vote: FeedbackVote) => void
  onReasonChange?: (reasonId: string | null) => void
  ariaLabel?: string
  className?: string
}

export function FeedbackThumbs({
  initialVote = null,
  reasons,
  onVoteChange,
  onReasonChange,
  ariaLabel = "Response feedback",
  className,
}: FeedbackThumbsProps) {
  const [vote, setVote] = useState<FeedbackVote>(initialVote)
  const [reasonId, setReasonId] = useState<string | null>(null)
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)

  const updateVote = (next: FeedbackVote) => {
    const resolved: FeedbackVote = vote === next ? null : next
    setVote(resolved)
    if (resolved !== "down") {
      setReasonId(null)
      onReasonChange?.(null)
    }
    onVoteChange?.(resolved)
    if (resolved === "up") {
      const colors = resolveConfettiColors()
      confettiRef.current?.fire({
        particleCount: 36,
        spread: 50,
        startVelocity: 22,
        scalar: 0.7,
        ...(colors.length > 0 ? { colors } : {}),
      })
    }
  }

  const updateReason = (next: string) => {
    const resolved = reasonId === next ? null : next
    setReasonId(resolved)
    onReasonChange?.(resolved)
  }

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      <div className={styles.row}>
        <button
          type="button"
          className={`${styles.thumb} ${vote === "up" ? styles.active : ""}`}
          aria-label="Mark response as helpful"
          aria-pressed={vote === "up"}
          onClick={() => updateVote("up")}
          data-tone="up"
        >
          <ThumbsUp size={14} strokeWidth={2.4} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.thumb} ${vote === "down" ? styles.active : ""}`}
          aria-label="Mark response as unhelpful"
          aria-pressed={vote === "down"}
          onClick={() => updateVote("down")}
          data-tone="down"
        >
          <ThumbsDown size={14} strokeWidth={2.4} aria-hidden="true" />
        </button>
        <span className={styles.confetti} aria-hidden="true">
          <ConfettiBurst ref={confettiRef} />
        </span>
      </div>

      {vote === "down" && reasons && reasons.length > 0 && (
        <div className={styles.reasonRow} role="radiogroup" aria-label="Reason for feedback">
          {reasons.map((reason) => {
            const isActive = reasonId === reason.id
            return (
              <button
                key={reason.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`${styles.reason} ${isActive ? styles.reasonActive : ""}`}
                onClick={() => updateReason(reason.id)}
              >
                {reason.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FeedbackThumbs
