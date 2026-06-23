import type { Metadata } from "next"

import { FeedbackPrompt } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import { FEEDBACK_KAREN, FEEDBACK_MICK } from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Feedback prompt | Customer portal",
  description:
    "Primitive 09 — post-service NPS prompt with 5-star rating and free text — three states.",
}

export default function FeedbackPromptScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Feedback prompt"
        title="Post-service NPS prompt"
        description="Empty (Mick hasn't rated yet), pre-filled (Karen leaning 5-star with a draft comment), and the thank-you state shown immediately after submission."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Feedback prompt" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <FeedbackPrompt context={FEEDBACK_MICK} />
          <FeedbackPrompt
            context={FEEDBACK_KAREN}
            initialRating={5}
            initialComment="Tim nailed the GT sound — that reverse-flow muffler is bloody perfect. Cheers crew."
          />
          <FeedbackPrompt
            context={FEEDBACK_MICK}
            initialRating={5}
            initiallySubmitted
          />
        </div>
      </section>
    </main>
  )
}
