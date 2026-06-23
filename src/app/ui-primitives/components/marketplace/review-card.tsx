"use client"

import { ShieldCheck, Star, ThumbsUp } from "lucide-react"

import styles from "./review-card.module.css"

export interface ReviewCardProps {
  authorName: string
  rating: number
  body: string
  timestamp: string
  helpfulCount: number
  verifiedPurchase?: boolean
  authorInitials?: string
  onHelpful?: () => void
  className?: string
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function ReviewCard({
  authorName,
  rating,
  body,
  timestamp,
  helpfulCount,
  verifiedPurchase = false,
  authorInitials,
  onHelpful,
  className,
}: ReviewCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const clamped = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <article className={classes} aria-label={`Review by ${authorName}, ${clamped} of 5 stars`}>
      <header className={styles.head}>
        <span className={styles.avatar} aria-hidden="true">
          {authorInitials ?? initialsFromName(authorName)}
        </span>
        <div className={styles.identity}>
          <span className={styles.name}>{authorName}</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <span
          className={styles.stars}
          aria-label={`${clamped} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const filled = index < clamped
            return (
              <Star
                key={index}
                size={14}
                strokeWidth={2}
                fill={filled ? "currentColor" : "transparent"}
                className={filled ? undefined : styles.starDim}
                aria-hidden="true"
              />
            )
          })}
        </span>
      </header>

      <p className={styles.body}>{body}</p>

      <div className={styles.footRow}>
        {verifiedPurchase ? (
          <span className={styles.verifiedChip}>
            <ShieldCheck size={11} strokeWidth={2.4} aria-hidden="true" />
            Verified install
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <button type="button" className={styles.helpful} onClick={onHelpful}>
          <ThumbsUp size={12} strokeWidth={2.4} aria-hidden="true" />
          Helpful · {helpfulCount.toLocaleString("en-AU")}
        </button>
      </div>
    </article>
  )
}

export default ReviewCard
