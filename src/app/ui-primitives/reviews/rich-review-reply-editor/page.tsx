import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RichReviewReplyEditor } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Reply editor | Reviews",
  description:
    "Primitive 14 — workshop reply editor with canned-reply picker and insert-token chips.",
}

export default function RichReviewReplyEditorScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Reply editor"
        title="Rich review reply editor"
        description="The composer the workshop uses to reply to a review — rich textarea, insert-token chips, canned-reply macro picker, and post-reply CTA. Inserts tokens at cursor position."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Reply editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Replying to a Manta cat-back review</span>
        <RichReviewReplyEditor
          customerFirstName="Marcus"
          reviewSnippet="Manta cat-back on the BA XR6T — drone at 100 km/h gone after they swapped the resonator placement."
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Replying to a quote-walkup review</span>
        <RichReviewReplyEditor
          customerFirstName="Sarah"
          reviewSnippet="The original AUD 980 quote climbed to AUD 1,240 when they hit a seized hanger bolt."
        />
      </section>
    </main>
  )
}
