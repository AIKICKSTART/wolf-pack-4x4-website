"use client"

import { DataTable, type DataTableColumn } from "../data-display/data-table"
import { Chip } from "../primitives/chip"

import {
  REVIEW_STATUS_LABEL,
  REVIEW_STATUS_TONE,
  type ReviewStatus,
  type StarRating,
  clampRating,
} from "./reviews-types"

import styles from "./review-moderation-queue.module.css"

export interface ModerationRow {
  id: string
  reviewerName: string
  suburb: string
  rating: StarRating
  headline: string
  snippet: string
  submittedAt: string
  status: ReviewStatus
  /** Auto-flag indicator (e.g. "Profanity", "Possible spam"). */
  autoFlag?: string
}

export interface ReviewModerationQueueProps {
  rows: ReadonlyArray<ModerationRow>
  onApprove?: (row: ModerationRow) => void
  onReject?: (row: ModerationRow) => void
  onRequestEdit?: (row: ModerationRow) => void
  caption?: string
  kicker?: string
  className?: string
}

function renderStarsShort(rating: number): string {
  const safe = clampRating(rating)
  const full = Math.floor(safe)
  const hasHalf = safe - full === 0.5
  return "★".repeat(full) + (hasHalf ? "⯨" : "")
}

export function ReviewModerationQueue({
  rows,
  onApprove,
  onReject,
  onRequestEdit,
  caption = "Pending reviews",
  kicker = "Moderation queue",
  className,
}: ReviewModerationQueueProps) {
  const columns: ReadonlyArray<DataTableColumn<ModerationRow>> = [
    {
      id: "reviewer",
      header: "Reviewer",
      cell: (row) => (
        <div className={styles.reviewerCell}>
          <span className={styles.reviewerName}>{row.reviewerName}</span>
          <span className={styles.reviewerMeta}>{row.suburb}</span>
        </div>
      ),
    },
    {
      id: "rating",
      header: "Rating",
      align: "left",
      cell: (row) => (
        <span
          className={styles.ratingStars}
          aria-label={`${row.rating} out of 5 stars`}
        >
          {renderStarsShort(row.rating)}
        </span>
      ),
    },
    {
      id: "preview",
      header: "Review",
      cell: (row) => (
        <div className={styles.previewCell}>
          <p className={styles.headline}>{row.headline}</p>
          <p className={styles.snippet}>{row.snippet}</p>
        </div>
      ),
    },
    {
      id: "flag",
      header: "Auto-flag",
      cell: (row) =>
        row.autoFlag ? (
          <span className={styles.flagChip}>
            <Chip label={row.autoFlag} tone="amber" />
          </span>
        ) : (
          <span aria-hidden="true">—</span>
        ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <Chip label={REVIEW_STATUS_LABEL[row.status]} tone={REVIEW_STATUS_TONE[row.status]} />
      ),
    },
    {
      id: "submittedAt",
      header: "Submitted",
      cell: (row) => row.submittedAt,
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      cell: (row) => (
        <div className={styles.rowActions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.actionApprove}`}
            onClick={() => onApprove?.(row)}
            aria-label={`Approve review by ${row.reviewerName}`}
          >
            Approve
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.actionEdit}`}
            onClick={() => onRequestEdit?.(row)}
            aria-label={`Request edit on review by ${row.reviewerName}`}
          >
            Edit
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.actionReject}`}
            onClick={() => onReject?.(row)}
            aria-label={`Reject review by ${row.reviewerName}`}
          >
            Reject
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className={[styles.queue, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={[...rows]}
        columns={columns}
        getRowId={(row) => row.id}
        caption={caption}
        kicker={kicker}
        density="comfortable"
        zebra
      />
    </div>
  )
}

export default ReviewModerationQueue
