import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  OwnerResponseCard,
  PhotoReviewAttachment,
  ReviewCard,
  SpamAbuseFlag,
} from "../../components/reviews"
import { Chip } from "../../components/primitives/chip"

import { DEMO_REVIEWS } from "../demo-data"
import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Review card | Reviews",
  description:
    "Primitive 01 — single review card with avatar, verified chip, stars, headline, body, photo strip, workshop reply slot.",
}

const FEATURED = DEMO_REVIEWS[0]
const QUOTE = DEMO_REVIEWS[1]
const CRITICAL = DEMO_REVIEWS[4]

export default function ReviewCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Card"
        title="Review card"
        description="The atom of the customer review system — avatar, name + suburb, verified chip, sentiment chip, star rating, headline + body, helpful counter, optional photo strip, and a nested workshop response."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Review card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Featured review with photos + reply</span>
        <ReviewCard
          reviewerName={FEATURED.reviewer}
          reviewerSuburb={FEATURED.suburb}
          rating={FEATURED.rating}
          headline={FEATURED.headline}
          body={FEATURED.body}
          timestamp={FEATURED.timestamp}
          helpfulCount={FEATURED.helpful}
          verified={FEATURED.verified}
          verifiedDate={FEATURED.verifiedDate}
          sentiment={FEATURED.sentiment}
          tags={FEATURED.tags}
          photos={
            FEATURED.photos ? (
              <PhotoReviewAttachment photos={FEATURED.photos} />
            ) : undefined
          }
          reply={
            FEATURED.reply ? (
              <OwnerResponseCard
                responderName={FEATURED.reply.responderName}
                responderRole={FEATURED.reply.responderRole}
                body={FEATURED.reply.body}
                timestamp={FEATURED.reply.timestamp}
              />
            ) : undefined
          }
          trailing={<Chip label="Report" tone="red" />}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote-confidence review</span>
        <ReviewCard
          reviewerName={QUOTE.reviewer}
          reviewerSuburb={QUOTE.suburb}
          rating={QUOTE.rating}
          headline={QUOTE.headline}
          body={QUOTE.body}
          timestamp={QUOTE.timestamp}
          helpfulCount={QUOTE.helpful}
          verified={QUOTE.verified}
          verifiedDate={QUOTE.verifiedDate}
          sentiment={QUOTE.sentiment}
          tags={QUOTE.tags}
          reply={
            QUOTE.reply ? (
              <OwnerResponseCard
                responderName={QUOTE.reply.responderName}
                responderRole={QUOTE.reply.responderRole}
                body={QUOTE.reply.body}
                timestamp={QUOTE.reply.timestamp}
              />
            ) : undefined
          }
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Critical review with embedded report action</span>
        <ReviewCard
          reviewerName={CRITICAL.reviewer}
          reviewerSuburb={CRITICAL.suburb}
          rating={CRITICAL.rating}
          headline={CRITICAL.headline}
          body={CRITICAL.body}
          timestamp={CRITICAL.timestamp}
          helpfulCount={CRITICAL.helpful}
          verified={CRITICAL.verified}
          verifiedDate={CRITICAL.verifiedDate}
          sentiment={CRITICAL.sentiment}
          tags={CRITICAL.tags}
          reply={
            CRITICAL.reply ? (
              <OwnerResponseCard
                responderName={CRITICAL.reply.responderName}
                responderRole={CRITICAL.reply.responderRole}
                body={CRITICAL.reply.body}
                timestamp={CRITICAL.reply.timestamp}
              />
            ) : undefined
          }
          trailing={<SpamAbuseFlag reviewId={CRITICAL.id} />}
        />
      </section>
    </main>
  )
}
