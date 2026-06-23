import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewRequestPrompt } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Request prompt | Reviews",
  description:
    "Primitive 10 — post-job ‘leave a review’ inline prompt with star selector and textarea.",
}

export default function ReviewRequestPromptScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Request"
        title="Review request prompt"
        description="Post-job inline prompt — thank-you headline, star selector, body textarea, submit CTA, and a confirmation state when the review enters moderation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Request prompt" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>After a Manta cat-back install — first booking</span>
        <ReviewRequestPrompt jobReference="OAK-2841" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop-tuned copy for ADR jobs</span>
        <ReviewRequestPrompt
          jobReference="OAK-2900"
          kicker="ADR job wrapped"
          title="How did certification go?"
          subtitle="A quick rating helps the next owner picking us for an engineering pass."
          placeholder="Anything specific about the cheatsheet or the cert package?"
        />
      </section>
    </main>
  )
}
