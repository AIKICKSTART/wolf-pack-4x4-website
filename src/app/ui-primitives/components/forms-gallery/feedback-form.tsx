"use client"

import { Star } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import styles from "./feedback-form.module.css"

export type FeedbackCategory = "service" | "quote" | "fitment" | "handover"

export interface FeedbackFormValues {
  rating: number
  category: FeedbackCategory
  title: string
  message: string
  anonymous: boolean
}

interface FeedbackFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<FeedbackFormValues>
}

const CATEGORIES: ReadonlyArray<{ id: FeedbackCategory; label: string }> = [
  { id: "service", label: "Service" },
  { id: "quote", label: "Quote" },
  { id: "fitment", label: "Fitment" },
  { id: "handover", label: "Handover" },
]

const RATING_COPY: ReadonlyArray<string> = [
  "Tap to rate",
  "Needs work",
  "Below target",
  "Met target",
  "Above target",
  "Workshop legend",
]

export function FeedbackForm({ onSubmit, defaultValues }: FeedbackFormProps) {
  const titleId = useId()
  const messageId = useId()
  const anonId = useId()
  const ratingLabelId = useId()

  const [rating, setRating] = useState<number>(defaultValues?.rating ?? 0)
  const [hover, setHover] = useState<number>(0)
  const [category, setCategory] = useState<FeedbackCategory>(
    defaultValues?.category ?? "service",
  )
  const [anonymous, setAnonymous] = useState<boolean>(
    defaultValues?.anonymous ?? false,
  )
  const [attached, setAttached] = useState<boolean>(false)

  const displayRating = hover > 0 ? hover : rating

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.set("rating", String(rating))
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>05 / Feedback</span>
        <h2 className={styles.title}>Rate the workshop</h2>
        <p className={styles.lede}>
          Tell us how the visit landed. Honest feedback shapes the next quote.
        </p>
      </header>

      <div className={styles.starsRow} role="group" aria-labelledby={ratingLabelId}>
        <div className={styles.starsHead}>
          <span id={ratingLabelId} className={styles.label}>
            Overall rating
          </span>
          <output className={styles.starsValue} aria-live="polite">
            {RATING_COPY[displayRating]}
          </output>
        </div>
        <div className={styles.stars} role="radiogroup" aria-label="Rating from one to five">
          {[1, 2, 3, 4, 5].map((value) => {
            const on = value <= displayRating
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} of 5`}
                className={`${styles.star} ${on ? styles.starOn : ""}`}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onFocus={() => setHover(value)}
                onBlur={() => setHover(0)}
                onClick={() => setRating(value)}
              >
                <Star strokeWidth={1.5} fill={on ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>

      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend className={styles.label}>Category</legend>
        <div className={styles.categoryRow} role="radiogroup" aria-label="Feedback category">
          {CATEGORIES.map((option) => {
            const isOn = category === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isOn}
                className={`${styles.categoryChip} ${isOn ? styles.categoryChipOn : ""}`}
                onClick={() => setCategory(option.id)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <input type="hidden" name="category" value={category} />
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={titleId} className={styles.label}>
          Title
        </label>
        <input
          id={titleId}
          name="title"
          type="text"
          required
          placeholder="Quote was sharp and turnaround was fast"
          defaultValue={defaultValues?.title}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={messageId} className={styles.label}>
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          placeholder="What did the team do well? What could improve?"
          defaultValue={defaultValues?.message}
          className={styles.textarea}
        />
      </div>

      <div className={styles.attachRow}>
        <span className={styles.label}>
          {attached ? "exhaust-after.jpg attached" : "Attach a photo (optional)"}
        </span>
        <button
          type="button"
          className={styles.attachBtn}
          onClick={() => setAttached((current) => !current)}
        >
          {attached ? "Remove" : "Add photo"}
        </button>
      </div>

      <label htmlFor={anonId} className={styles.anon}>
        <span className={styles.toggle}>
          <input
            id={anonId}
            name="anonymous"
            type="checkbox"
            checked={anonymous}
            onChange={(event) => setAnonymous(event.target.checked)}
          />
          <span className={styles.toggleTrack} aria-hidden="true" />
        </span>
        <span>Send anonymously — the workshop will not see your name or contact details.</span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Send feedback
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
