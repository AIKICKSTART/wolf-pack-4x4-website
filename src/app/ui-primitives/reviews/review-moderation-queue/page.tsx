import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewModerationQueue } from "../../components/reviews"

import { DEMO_MODERATION_ROWS } from "../demo-data"
import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Moderation queue | Reviews",
  description:
    "Primitive 11 — pending review moderation queue with approve / edit / reject actions and auto-flag chips.",
}

export default function ReviewModerationQueueScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Moderation"
        title="Review moderation queue"
        description="Workshop moderation surface — semantic table of pending reviews with reviewer + suburb, star score, headline/snippet preview, auto-flag chip, and approve / edit / reject row actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Moderation" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>4 reviews in queue · auto-flag highlighting</span>
        <ReviewModerationQueue rows={DEMO_MODERATION_ROWS} />
      </section>
    </main>
  )
}
