"use client"

import { Check, X } from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"

import styles from "./poll-card.module.css"
import type { LivePoll } from "./live-broadcast-types"

interface PollCardProps {
  poll: LivePoll
  /** Optional callback for when user votes. */
  onVote?: (optionId: string) => void
  /** Optional callback when host closes the poll. */
  onClose?: () => void
  /** Whether host controls (close button) are shown. */
  showHostControls?: boolean
  className?: string
}

function calculatePercent(votes: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((votes / total) * 100)
}

export function PollCard({
  poll,
  onVote,
  onClose,
  showHostControls = false,
  className,
}: PollCardProps) {
  const headingId = useId()
  const [selectedId, setSelectedId] = useState<string | undefined>(poll.selectedOptionId)

  const totalVotes = useMemo(
    () => poll.options.reduce((sum, option) => sum + option.votes, 0),
    [poll.options]
  )

  const handleVote = useCallback(
    (optionId: string) => {
      if (poll.isClosed) return
      setSelectedId(optionId)
      onVote?.(optionId)
    },
    [poll.isClosed, onVote]
  )

  const classes = [
    styles.card,
    poll.isClosed ? styles.closed : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-labelledby={headingId}>
      <header className={styles.head}>
        <span className={styles.kicker}>{poll.isClosed ? "Poll result" : "Live poll"}</span>
        <h3 id={headingId} className={styles.question}>{poll.question}</h3>
        {showHostControls && !poll.isClosed ? (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close poll"
          >
            <X size={13} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : null}
      </header>

      <ul className={styles.options}>
        {poll.options.map((option) => {
          const percent = calculatePercent(option.votes, totalVotes)
          const isSelected = selectedId === option.id
          return (
            <li key={option.id}>
              <button
                type="button"
                className={[
                  styles.option,
                  isSelected ? styles.selected : "",
                  poll.isClosed ? styles.optionLocked : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={isSelected}
                disabled={poll.isClosed}
                onClick={() => handleVote(option.id)}
              >
                <span className={styles.bar} style={{ width: `${percent}%` }} aria-hidden="true" />
                <span className={styles.optionRow}>
                  <span className={styles.optionLabel}>
                    {isSelected ? (
                      <Check size={11} strokeWidth={2.4} aria-hidden="true" />
                    ) : null}
                    {option.label}
                  </span>
                  <span className={styles.optionStats}>
                    <span className={styles.optionVotes}>
                      {option.votes.toLocaleString("en-AU")}
                    </span>
                    <span className={styles.optionPercent}>{percent}%</span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <footer className={styles.footer}>
        <span className={styles.totalVotes}>
          {totalVotes.toLocaleString("en-AU")} votes
        </span>
        {poll.isClosed ? (
          <span className={styles.closedChip}>Closed</span>
        ) : poll.secondsLeft !== undefined ? (
          <span className={styles.countdown} aria-live="polite">
            {poll.secondsLeft}s left
          </span>
        ) : null}
      </footer>
    </article>
  )
}

export default PollCard
