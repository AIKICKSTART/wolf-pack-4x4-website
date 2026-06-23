"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"

import type { StarRating } from "./reviews-types"

import styles from "./star-rating-selector.module.css"

export interface StarRatingSelectorProps {
  value: StarRating
  onChange: (next: StarRating) => void
  /** Allow 0.5-step ratings via click on the left half. */
  allowHalfStars?: boolean
  disabled?: boolean
  label?: string
  className?: string
}

const LABELS_BY_RATING: Record<number, string> = {
  0: "No rating",
  0.5: "Disappointing",
  1: "Poor",
  1.5: "Fair",
  2: "Mediocre",
  2.5: "Average",
  3: "Decent",
  3.5: "Good",
  4: "Very good",
  4.5: "Excellent",
  5: "Outstanding",
}

const STAR_VALUES = [1, 2, 3, 4, 5] as const

export function StarRatingSelector({
  value,
  onChange,
  allowHalfStars = true,
  disabled = false,
  label = "Your rating",
  className,
}: StarRatingSelectorProps) {
  const [hover, setHover] = useState<number | null>(null)
  const groupId = useId()
  const display = hover ?? value
  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(" ")

  const handleSelect = (next: number) => {
    if (disabled) return
    onChange(next as StarRating)
  }

  return (
    <div className={wrapperClasses}>
      {label ? (
        <span
          id={`${groupId}-label`}
          className={styles.legend}
        >
          <span>{label}</span>
          <span className={styles.legendValue}>
            {display > 0 ? `${display.toFixed(1)} · ${LABELS_BY_RATING[display]}` : "Pick a star"}
          </span>
        </span>
      ) : null}
      <div
        className={styles.group}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        onMouseLeave={() => setHover(null)}
      >
        {STAR_VALUES.map((star) => {
          const isFull = display >= star
          const isHalf = !isFull && display >= star - 0.5
          const classNames = [
            styles.star,
            isFull && styles.starFilled,
            isHalf && styles.starHalf,
            hover !== null && hover >= star && styles.starHover,
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <span
              key={star}
              className={classNames}
              role="radio"
              aria-checked={value === star || (allowHalfStars && value === star - 0.5)}
              aria-label={`${star} stars — ${LABELS_BY_RATING[star]}`}
            >
              {allowHalfStars ? (
                <button
                  type="button"
                  className={styles.halfSlot}
                  aria-label={`${star - 0.5} stars`}
                  disabled={disabled}
                  onClick={() => handleSelect(star - 0.5)}
                  onMouseEnter={() => setHover(star - 0.5)}
                  onFocus={() => setHover(star - 0.5)}
                />
              ) : null}
              <button
                type="button"
                className={`${styles.halfSlot} ${styles.halfRight}`}
                aria-label={`${star} stars`}
                disabled={disabled}
                onClick={() => handleSelect(star)}
                onMouseEnter={() => setHover(star)}
                onFocus={() => setHover(star)}
              />
            </span>
          )
        })}
      </div>
      {value > 0 && !disabled ? (
        <Chip
          label="Clear rating"
          tone="neutral"
          onSelect={() => onChange(0)}
        />
      ) : null}
    </div>
  )
}

export default StarRatingSelector
