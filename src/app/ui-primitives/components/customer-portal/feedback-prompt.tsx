"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { CheckeredFlagIcon } from "../icons/checkered-flag"
import type { FeedbackContext } from "./customer-portal-types"

import styles from "./feedback-prompt.module.css"

interface FeedbackPromptProps {
  context: FeedbackContext
  /** Optional handler called when submit is hit. */
  onSubmit?: (rating: number, comment: string) => void
  /** Initial seeded rating — useful for showcase states. */
  initialRating?: number
  /** Initial seeded comment. */
  initialComment?: string
  /** When true, renders the post-submit "thanks" state. */
  initiallySubmitted?: boolean
  className?: string
}

const RATING_RANGE = [1, 2, 3, 4, 5] as const

const RATING_HINT: Readonly<Record<number, string>> = {
  0: "Pick a rating, mate",
  1: "Yikes — we owe you a beer",
  2: "Below the line — let&apos;s fix it",
  3: "Fair dinkum — bit average",
  4: "Solid run — happy with it",
  5: "Bloody brilliant — top notch",
}

const COMMENT_MAX = 280

export function FeedbackPrompt({
  context,
  onSubmit,
  initialRating = 0,
  initialComment = "",
  initiallySubmitted = false,
  className,
}: FeedbackPromptProps) {
  const [rating, setRating] = useState<number>(initialRating)
  const [comment, setComment] = useState<string>(initialComment)
  const [submitted, setSubmitted] = useState<boolean>(initiallySubmitted)

  const hint = RATING_HINT[rating] ?? RATING_HINT[0]

  const handleSubmit = () => {
    if (rating <= 0) return
    setSubmitted(true)
    onSubmit?.(rating, comment)
  }

  const classes = [
    styles.prompt,
    submitted ? styles.promptSubmitted : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (submitted) {
    return (
      <section
        className={classes}
        aria-label={`Thanks for the feedback on ${context.serviceLabel}`}
      >
        <span className={styles.thanksKicker}>
          <CheckeredFlagIcon size={14} tone="currentColor" motion="none" />
          Cheers, mate
        </span>
        <h3 className={styles.thanksTitle}>
          Feedback noted — Brad reads every one.
        </h3>
        <p className={styles.thanksCopy}>
          {rating >= 4
            ? "Top notch — your rating helps us keep the bays full."
            : "We&apos;ll have a yarn at the morning huddle and chase up if needed."}
        </p>
      </section>
    )
  }

  return (
    <section
      className={classes}
      aria-label={`Rate your service: ${context.serviceLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          {context.promptLabel ?? "Last service feedback"}
        </span>
        <h3 className={styles.title}>How&apos;d the workshop go?</h3>
        <dl className={styles.facts}>
          <div>
            <dt>Vehicle</dt>
            <dd>{context.vehicleLabel}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{context.serviceLabel}</dd>
          </div>
          <div>
            <dt>Tech</dt>
            <dd>{context.techName}</dd>
          </div>
          <div>
            <dt>Done</dt>
            <dd>
              <time>{context.servicedAt}</time>
            </dd>
          </div>
        </dl>
      </header>

      <fieldset className={styles.rating} aria-label="Star rating">
        <legend className={styles.legend}>Rate it</legend>
        <div className={styles.starRow} role="radiogroup" aria-label="Star rating">
          {RATING_RANGE.map((star) => {
            const active = star <= rating
            return (
              <label
                key={star}
                className={[
                  styles.star,
                  active ? styles.starActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="radio"
                  name={`nps-${context.serviceLabel.replace(/\s+/g, "-")}`}
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className={styles.starInput}
                  aria-label={`${star} star${star === 1 ? "" : "s"}`}
                />
                <span aria-hidden="true">★</span>
              </label>
            )
          })}
        </div>
        <span className={styles.ratingHint}>{hint}</span>
      </fieldset>

      <label className={styles.comment}>
        <span className={styles.commentLabel}>
          Optional — anything else worth sharing?
        </span>
        <textarea
          className={styles.commentInput}
          value={comment}
          onChange={(event) =>
            setComment(event.target.value.slice(0, COMMENT_MAX))
          }
          maxLength={COMMENT_MAX}
          rows={3}
          placeholder="Tell us about the bay turnaround, communication, value — the lot."
        />
        <span className={styles.commentCount}>
          {comment.length}/{COMMENT_MAX}
        </span>
      </label>

      <footer className={styles.foot}>
        <Chip label="Stays anonymous unless you say otherwise" tone="neutral" />
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={rating <= 0}
        >
          Send feedback
        </button>
      </footer>
    </section>
  )
}

export default FeedbackPrompt
