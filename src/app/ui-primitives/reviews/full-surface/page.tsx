"use client"

import { useMemo, useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  MostHelpfulSortBar,
  OwnerResponseCard,
  PhotoReviewAttachment,
  ReviewCard,
  ReviewFilterChips,
  ReviewModerationQueue,
  ReviewRequestPrompt,
  ReviewSummaryCard,
  SpamAbuseFlag,
  type ReviewFilterId,
  type ReviewSortId,
} from "../../components/reviews"

import {
  DEMO_BREAKDOWN,
  DEMO_MODERATION_ROWS,
  DEMO_REVIEWS,
  DEMO_SENTIMENT_SEGMENTS,
  DEMO_TREND,
  type DemoReview,
} from "../demo-data"
import styles from "../reviews.module.css"

interface FilterCounts {
  all: number
  "5-star": number
  "4-star": number
  "3-star": number
  critical: number
  "with-photos": number
  "verified-only": number
  "last-30-days": number
}

const FILTER_COUNTS: FilterCounts = {
  all: 435,
  "5-star": 312,
  "4-star": 84,
  "3-star": 22,
  critical: 17,
  "with-photos": 128,
  "verified-only": 408,
  "last-30-days": 64,
}

function matchesFilter(review: DemoReview, filter: ReviewFilterId): boolean {
  switch (filter) {
    case "all":
      return true
    case "5-star":
      return review.rating >= 5
    case "4-star":
      return review.rating >= 4 && review.rating < 5
    case "3-star":
      return review.rating >= 3 && review.rating < 4
    case "critical":
      return review.rating < 3
    case "with-photos":
      return Boolean(review.photos && review.photos.length > 0)
    case "verified-only":
      return review.verified
    case "last-30-days":
      return review.timestamp.includes("day") || review.timestamp.includes("week")
    default:
      return true
  }
}

function sortReviews(rows: ReadonlyArray<DemoReview>, sort: ReviewSortId): ReadonlyArray<DemoReview> {
  const copy = [...rows]
  switch (sort) {
    case "most-helpful":
      return copy.sort((a, b) => b.helpful - a.helpful)
    case "most-recent":
      return copy
    case "highest-rating":
      return copy.sort((a, b) => b.rating - a.rating)
    case "lowest-rating":
      return copy.sort((a, b) => a.rating - b.rating)
    case "with-photos":
      return copy.sort((a, b) => {
        const aHas = a.photos && a.photos.length > 0 ? 1 : 0
        const bHas = b.photos && b.photos.length > 0 ? 1 : 0
        return bHas - aHas
      })
    default:
      return copy
  }
}

export default function ReviewsFullSurfaceScene() {
  const [filter, setFilter] = useState<ReviewFilterId>("all")
  const [sort, setSort] = useState<ReviewSortId>("most-helpful")

  const visible = useMemo(() => {
    const filtered = DEMO_REVIEWS.filter((review) => matchesFilter(review, filter))
    return sortReviews(filtered, sort)
  }, [filter, sort])

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Reviews / Composition"
        title="Full reviews surface"
        description="The complete customer reviews surface — top summary card, filter + sort bars, the review feed with photo attachments and owner replies, the workshop moderation queue side panel, and the in-flow review request prompt for post-job customers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Full surface" },
        ]}
      />

      <ReviewSummaryCard
        overallRating={4.78}
        totalReviews={435}
        tiers={DEMO_BREAKDOWN}
        sentimentSegments={DEMO_SENTIMENT_SEGMENTS}
        trend={DEMO_TREND}
        recommendPercentage={94}
        meta="435 verified jobs · last 90 days"
      />

      <div className={styles.surfaceComposition}>
        <div className={styles.surfaceMain}>
          <ReviewFilterChips
            selected={filter}
            onSelect={setFilter}
            counts={FILTER_COUNTS}
          />
          <MostHelpfulSortBar
            selected={sort}
            onSelect={setSort}
            resultCount={visible.length}
          />

          <div className={styles.surfaceReviewList}>
            {visible.map((review) => (
              <ReviewCard
                key={review.id}
                reviewerName={review.reviewer}
                reviewerSuburb={review.suburb}
                rating={review.rating}
                headline={review.headline}
                body={review.body}
                timestamp={review.timestamp}
                helpfulCount={review.helpful}
                verified={review.verified}
                verifiedDate={review.verifiedDate}
                sentiment={review.sentiment}
                tags={review.tags}
                photos={
                  review.photos && review.photos.length > 0 ? (
                    <PhotoReviewAttachment photos={review.photos} />
                  ) : undefined
                }
                reply={
                  review.reply ? (
                    <OwnerResponseCard
                      responderName={review.reply.responderName}
                      responderRole={review.reply.responderRole}
                      body={review.reply.body}
                      timestamp={review.reply.timestamp}
                    />
                  ) : undefined
                }
                trailing={
                  review.sentiment === "negative" ? (
                    <SpamAbuseFlag reviewId={review.id} />
                  ) : undefined
                }
              />
            ))}
          </div>

          <ReviewRequestPrompt jobReference="OAK-2900" />
        </div>

        <aside className={styles.surfaceSide}>
          <ReviewModerationQueue rows={DEMO_MODERATION_ROWS} />
        </aside>
      </div>
    </main>
  )
}
