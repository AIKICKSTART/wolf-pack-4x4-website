"use client"

import { useId, useState, type ChangeEvent } from "react"

import type { DocsFeedbackVote } from "./docs-suite-types"

import styles from "./feedback-helpful-strip.module.css"

interface FeedbackHelpfulStripProps {
  prompt?: string
  commentMaxLength?: number
  onSubmit?: (vote: DocsFeedbackVote, comment: string) => void
}

export function FeedbackHelpfulStrip({
  prompt = "Was this article helpful?",
  commentMaxLength = 280,
  onSubmit,
}: FeedbackHelpfulStripProps) {
  const [vote, setVote] = useState<DocsFeedbackVote | null>(null)
  const [comment, setComment] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)
  const textareaId = useId()

  const handleVote = (next: DocsFeedbackVote) => {
    if (submitted) {
      return
    }
    setVote(next)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= commentMaxLength) {
      setComment(value)
    }
  }

  const handleSend = () => {
    if (vote === null) {
      return
    }
    onSubmit?.(vote, comment.trim())
    setSubmitted(true)
  }

  return (
    <section className={styles.strip} aria-label="Article feedback">
      <div className={styles.head}>
        <h3 className={styles.prompt}>{prompt}</h3>
        <div className={styles.actions} role="group" aria-label="Vote on this article">
          <button
            type="button"
            className={[styles.btn, styles.btnHelpful].filter(Boolean).join(" ")}
            data-active={vote === "helpful"}
            aria-pressed={vote === "helpful"}
            disabled={submitted}
            onClick={() => handleVote("helpful")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 11v9H4v-9z" strokeLinejoin="round" />
              <path d="M7 11h6V6a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2.3l-1.1 6.4A2 2 0 0 1 18.9 21H7" strokeLinejoin="round" />
            </svg>
            Yes, helpful
          </button>
          <button
            type="button"
            className={[styles.btn, styles.btnNot].filter(Boolean).join(" ")}
            data-active={vote === "not-helpful"}
            aria-pressed={vote === "not-helpful"}
            disabled={submitted}
            onClick={() => handleVote("not-helpful")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M17 13V4h3v9z" strokeLinejoin="round" />
              <path d="M17 13h-6v5a2 2 0 0 1-4 0v-5H4a2 2 0 0 1-2-2.3l1.1-6.4A2 2 0 0 1 5.1 3H17" strokeLinejoin="round" />
            </svg>
            Needs work
          </button>
        </div>
      </div>

      {submitted ? (
        <span className={styles.thanks} role="status">
          Thanks — your feedback was logged
        </span>
      ) : vote !== null ? (
        <div className={styles.commentArea}>
          <label className={styles.commentLabel} htmlFor={textareaId}>
            Tell us more (optional)
          </label>
          <textarea
            id={textareaId}
            className={styles.commentInput}
            value={comment}
            onChange={handleChange}
            placeholder={
              vote === "helpful"
                ? "What worked? Anything we should expand on?"
                : "What was missing or confusing?"
            }
          />
          <div className={styles.commentFoot}>
            <span className={styles.commentCount} aria-live="polite">
              {comment.length} / {commentMaxLength}
            </span>
            <button type="button" className={styles.send} onClick={handleSend}>
              Send feedback
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default FeedbackHelpfulStrip
