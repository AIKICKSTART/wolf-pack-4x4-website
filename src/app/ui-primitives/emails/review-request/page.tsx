import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailPreviewFrame,
  EmailReviewRequest,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Review request email | Email Templates",
  description:
    "Template 12 — Mufflermen post-job review request with vehicle summary, 1-5 star rating buttons, and incentive chip.",
}

export default function ReviewRequestEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 12 / Review request"
        title="Review request"
        description="Sent a day after the car leaves the bay — vehicle summary, 1-5 star rating buttons (real anchors so they work in every client), and an incentive chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Review request" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <hello@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "How did the workshop go, Jordan?",
        }}
        email={
          <EmailReviewRequest
            recipientFirstName="Jordan"
            vehicleSummary="2003 Holden VY Commodore SS · Phantom Black"
            jobReference="JOB-2026-0331"
            jobCompletedLabel="27 May 2026"
            reviewUrlByRating={[
              { rating: 1, url: "https://mufflermen.com.au/review?job=JOB-2026-0331&rating=1" },
              { rating: 2, url: "https://mufflermen.com.au/review?job=JOB-2026-0331&rating=2" },
              { rating: 3, url: "https://mufflermen.com.au/review?job=JOB-2026-0331&rating=3" },
              { rating: 4, url: "https://mufflermen.com.au/review?job=JOB-2026-0331&rating=4" },
              { rating: 5, url: "https://mufflermen.com.au/review?job=JOB-2026-0331&rating=5" },
            ]}
            incentiveLabel="Leave a public review — get $20 off your next service."
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
