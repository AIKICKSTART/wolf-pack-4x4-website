"use client"

import { useId, useState } from "react"

import { StarRatingSelector } from "./star-rating-selector"
import type { StarRating } from "./reviews-types"

import styles from "./review-request-prompt.module.css"

export interface ReviewRequestPromptSubmission {
  rating: StarRating
  body: string
}

export interface ReviewRequestPromptProps {
  jobReference?: string
  kicker?: string
  title?: string
  subtitle?: string
  placeholder?: string
  onSubmit?: (submission: ReviewRequestPromptSubmission) => void
  className?: string
}

export function ReviewRequestPrompt({
  jobReference,
  kicker = "We’d love your feedback",
  title = "How did the Oak Flats Mufflermen go?",
  subtitle = "A 30-second rating helps the next driver pick the right shop for their build.",
  placeholder = "Tell us about your job — fitment, sound, communication.",
  onSubmit,
  className,
}: ReviewRequestPromptProps) {
  const [rating, setRating] = useState<StarRating>(0)
  const [body, setBody] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)
  const textareaId = useId()
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const disabled = rating === 0 || body.trim().length < 8

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (disabled) return
    onSubmit?.({ rating, body: body.trim() })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className={classes} aria-label="Review submission confirmed">
        <span className={styles.kicker}>Thanks for the feedback</span>
        <div className={styles.success} role="status" aria-live="polite">
          <p className={styles.successTitle}>Your review is in moderation</p>
          <p className={styles.successBody}>
            We’ll publish it within a business day. Job {jobReference ?? "OAK-1042"} marked as reviewed.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={classes} aria-label="Leave a review">
      <span className={styles.kicker}>{kicker}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <StarRatingSelector value={rating} onChange={setRating} />
        <label className={styles.fieldLabel} htmlFor={textareaId}>
          Your review
          <textarea
            id={textareaId}
            className={styles.textarea}
            value={body}
            placeholder={placeholder}
            onChange={(event) => setBody(event.target.value)}
            minLength={8}
            maxLength={1200}
          />
        </label>
        <div className={styles.actions}>
          <span className={styles.helper}>
            {jobReference ? `Job ${jobReference}` : "Reviews are public"} · {body.length}/1200
          </span>
          <button
            type="submit"
            className={styles.submit}
            disabled={disabled}
          >
            Post review
          </button>
        </div>
      </form>
    </section>
  )
}

export default ReviewRequestPrompt
