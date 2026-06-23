"use client"

import type { ReactNode } from "react"
import { ThumbsUp } from "lucide-react"

import { Avatar, type AvatarTone } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import { VerifiedPurchaseChip } from "./verified-purchase-chip"
import { ReviewSentimentChip } from "./review-sentiment-chip"
import type { ReviewSentiment, StarRating } from "./reviews-types"
import { clampRating } from "./reviews-types"

import styles from "./review-card.module.css"

export interface ReviewCardProps {
  reviewerName: string
  reviewerSuburb?: string
  avatarSrc?: string
  avatarTone?: AvatarTone
  rating: number
  headline: string
  body: string
  timestamp: string
  helpfulCount?: number
  verified?: boolean
  verifiedDate?: string
  sentiment?: ReviewSentiment
  /** Tag chips below the body (e.g. "Manta cat-back", "Bay 2"). */
  tags?: ReadonlyArray<string>
  /** Slot for nested OwnerResponseCard. */
  reply?: ReactNode
  /** Slot for PhotoReviewAttachment. */
  photos?: ReactNode
  /** Slot for trailing actions (e.g. SpamAbuseFlag trigger). */
  trailing?: ReactNode
  onHelpful?: () => void
  className?: string
}

function renderStars(rating: StarRating): string {
  const full = Math.floor(rating)
  const hasHalf = rating - full === 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)
  return "★".repeat(full) + (hasHalf ? "⯨" : "") + "☆".repeat(empty)
}

export function ReviewCard({
  reviewerName,
  reviewerSuburb,
  avatarSrc,
  avatarTone = "obsidian",
  rating,
  headline,
  body,
  timestamp,
  helpfulCount = 0,
  verified = false,
  verifiedDate,
  sentiment,
  tags,
  reply,
  photos,
  trailing,
  onHelpful,
  className,
}: ReviewCardProps) {
  const safeRating = clampRating(rating)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const ratingLabel = `Rated ${safeRating} out of 5 stars`

  return (
    <article
      className={classes}
      role="region"
      aria-label={`Review by ${reviewerName}, ${ratingLabel}`}
    >
      <header className={styles.header}>
        <Avatar name={reviewerName} src={avatarSrc} tone={avatarTone} size="md" />
        <div className={styles.headerCopy}>
          <div className={styles.nameLine}>
            <h3 className={styles.name}>{reviewerName}</h3>
            {verified ? (
              <VerifiedPurchaseChip transactionDate={verifiedDate} />
            ) : null}
            {sentiment ? <ReviewSentimentChip sentiment={sentiment} /> : null}
          </div>
          <span className={styles.meta}>
            {reviewerSuburb ? `${reviewerSuburb} · ` : ""}
            <span className={styles.rating} aria-label={ratingLabel}>
              <span className={styles.stars} aria-hidden="true">
                {renderStars(safeRating)}
              </span>
              <span className={styles.starsValue}>{safeRating.toFixed(1)}</span>
            </span>
          </span>
        </div>
        <span className={styles.timestamp}>{timestamp}</span>
      </header>

      <div className={styles.body}>
        <h4 className={styles.headline}>{headline}</h4>
        <p className={styles.text}>{body}</p>
      </div>

      {photos ? <div className={styles.photoSlot}>{photos}</div> : null}

      {tags && tags.length > 0 ? (
        <div className={styles.tagRow}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} tone="neutral" />
          ))}
        </div>
      ) : null}

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.helpful}
          onClick={onHelpful}
          aria-label={`Mark this review by ${reviewerName} as helpful`}
        >
          <ThumbsUp size={12} strokeWidth={2.4} aria-hidden="true" />
          Helpful <span className={styles.helpfulCount}>{helpfulCount}</span>
        </button>
        {trailing ? <div className={styles.actions}>{trailing}</div> : null}
      </footer>

      {reply ? <div className={styles.replySlot}>{reply}</div> : null}
    </article>
  )
}

export default ReviewCard
