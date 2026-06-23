import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FeedbackThumbs } from "../../components/ai"
import type { FeedbackReason } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Feedback thumbs | UI Primitives — AI",
}

const REASONS: ReadonlyArray<FeedbackReason> = [
  { id: "inaccurate", label: "Inaccurate fitment" },
  { id: "missing-context", label: "Missing context" },
  { id: "wrong-price", label: "Wrong price" },
  { id: "tone", label: "Tone off" },
  { id: "too-short", label: "Too short" },
]

export default function FeedbackThumbsPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.14 / Conversation"
        title="Feedback thumbs"
        description="Thumb up / down toggle with aria-pressed. Up vote fires a tiny confetti burst; down vote reveals a reason picker for capturing more structured signal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Feedback thumbs" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <div className={styles.cluster}>
            <div className={styles.clusterHead}>
              <h3 className={styles.clusterTitle}>Variants</h3>
              <span className={styles.clusterMeta}>Default / with reasons</span>
            </div>
            <div className={styles.row}>
              <FeedbackThumbs ariaLabel="Quick feedback" />
              <FeedbackThumbs ariaLabel="Detailed feedback" reasons={REASONS} />
            </div>
          </div>
        </div>

        <div className={styles.note}>
          <span>Motion</span>
          <p>
            The confetti burst respects prefers-reduced-motion: reduce and is
            skipped entirely for users who request reduced motion. The selected
            thumb still gets a static highlight regardless.
          </p>
        </div>
      </section>
    </main>
  )
}
