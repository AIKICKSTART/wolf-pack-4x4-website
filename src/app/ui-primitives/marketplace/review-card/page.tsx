import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewCard } from "../../components/marketplace/review-card"
import { REVIEWS } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Review card | Marketplace | UI Primitives",
  description: "Customer review card with avatar, rating, body, verified-purchase chip and helpful counter.",
}

export default function ReviewCardShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.6 / Review card"
        title="Review card"
        description="Customer review card used on the Reviews tab of every plugin profile — verified install chip surfaces real workshop adopters."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Review card" },
        ]}
      />

      <section className={styles.section} aria-labelledby="review-card-grid">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Reviews</span>
          <h2 id="review-card-grid" className={styles.sectionTitle}>
            Four reviews — Stripe payments
          </h2>
        </header>
        <div className={styles.pluginGrid}>
          {REVIEWS.map((review) => (
            <ReviewCard
              key={review.id}
              authorName={review.authorName}
              rating={review.rating}
              body={review.body}
              timestamp={review.timestamp}
              helpfulCount={review.helpfulCount}
              verifiedPurchase={review.verifiedPurchase}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
