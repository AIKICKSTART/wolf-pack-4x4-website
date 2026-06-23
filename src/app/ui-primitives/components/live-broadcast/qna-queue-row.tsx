"use client"

import { Check, ChevronUp, Mic } from "lucide-react"
import { useCallback, useState } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./qna-queue-row.module.css"
import type { QnaQuestion } from "./live-broadcast-types"

interface QnaQueueRowProps {
  question: QnaQuestion
  /** Show host actions (mark answered, pull to mic). */
  showHostActions?: boolean
  /** Optional callback when upvote toggled. */
  onUpvote?: (next: boolean) => void
  /** Optional callback when host marks answered. */
  onMarkAnswered?: () => void
  /** Optional callback when host pulls question to mic. */
  onPullToMic?: () => void
  className?: string
}

export function QnaQueueRow({
  question,
  showHostActions = false,
  onUpvote,
  onMarkAnswered,
  onPullToMic,
  className,
}: QnaQueueRowProps) {
  const [upvoted, setUpvoted] = useState<boolean>(question.upvoted ?? false)
  const [voteCount, setVoteCount] = useState<number>(question.upvotes)

  const handleUpvote = useCallback(() => {
    setUpvoted((prev) => {
      const next = !prev
      setVoteCount((current) => current + (next ? 1 : -1))
      onUpvote?.(next)
      return next
    })
  }, [onUpvote])

  const classes = [
    styles.row,
    question.isAnswered ? styles.answered : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <li className={classes}>
      <button
        type="button"
        className={[styles.voteCol, upvoted ? styles.voteOn : ""].filter(Boolean).join(" ")}
        aria-pressed={upvoted}
        aria-label={upvoted ? `Remove upvote (currently ${voteCount})` : `Upvote question (currently ${voteCount})`}
        onClick={handleUpvote}
      >
        <ChevronUp size={14} strokeWidth={2.4} aria-hidden="true" />
        <span className={styles.voteCount}>{voteCount.toLocaleString("en-AU")}</span>
      </button>

      <div className={styles.body}>
        <p className={styles.question}>{question.question}</p>
        <div className={styles.meta}>
          <Avatar
            name={question.asker}
            src={question.askerAvatar}
            size="sm"
            tone="obsidian"
          />
          <span className={styles.asker}>{question.asker}</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span className={styles.timestamp}>{question.askedAt}</span>
        </div>
      </div>

      <div className={styles.statusCol}>
        {question.isAnswered ? (
          <span className={styles.answeredChip}>
            <Check size={11} strokeWidth={2.4} aria-hidden="true" />
            Answered
          </span>
        ) : null}
        {showHostActions ? (
          <div className={styles.actions} role="group" aria-label="Question actions">
            <button
              type="button"
              className={styles.actionBtn}
              onClick={onPullToMic}
              aria-label="Pull question to mic"
              disabled={question.isAnswered}
            >
              <Mic size={11} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={[styles.actionBtn, question.isAnswered ? styles.actionDone : ""].filter(Boolean).join(" ")}
              onClick={onMarkAnswered}
              aria-pressed={question.isAnswered}
              aria-label={question.isAnswered ? "Mark unanswered" : "Mark answered"}
            >
              <Check size={11} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default QnaQueueRow
