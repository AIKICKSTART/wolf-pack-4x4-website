"use client"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import styles from "./performance-review-row.module.css"

export type PerformanceRating =
  | "exceeds"
  | "meets"
  | "developing"
  | "needs-attention"

interface PerformanceReviewRowProps {
  technicianName: string
  /** Role description, e.g. "Senior Tech". */
  role: string
  /** Display date, e.g. "12 Mar 2026". */
  lastReviewDate: string
  rating: PerformanceRating
  avatarSrc?: string
  avatarTone?: AvatarTone
  /** Click handler for opening the review. */
  onOpen?: () => void
  className?: string
}

const RATING_LABEL: Record<PerformanceRating, string> = {
  exceeds: "Exceeds",
  meets: "Meets",
  developing: "Developing",
  "needs-attention": "Needs attention",
}

const RATING_TONE: Record<PerformanceRating, ChipTone> = {
  exceeds: "green",
  meets: "teal",
  developing: "amber",
  "needs-attention": "red",
}

export function PerformanceReviewRow({
  technicianName,
  role,
  lastReviewDate,
  rating,
  avatarSrc,
  avatarTone = "amber",
  onOpen,
  className,
}: PerformanceReviewRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <Avatar
          name={technicianName}
          src={avatarSrc}
          tone={avatarTone}
          size="md"
        />
        <div className={styles.identityText}>
          <strong>{technicianName}</strong>
          <span>{role}</span>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.kicker}>Last review</span>
        <strong>{lastReviewDate}</strong>
      </div>

      <Chip label={RATING_LABEL[rating]} tone={RATING_TONE[rating]} />

      {onOpen ? (
        <button
          type="button"
          className={styles.btnOpen}
          onClick={onOpen}
          aria-label={`Open review for ${technicianName}`}
        >
          Open review
        </button>
      ) : null}
    </div>
  )
}

export default PerformanceReviewRow
