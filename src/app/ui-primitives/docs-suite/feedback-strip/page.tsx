import type { Metadata } from "next"

import { FeedbackHelpfulStrip } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Feedback helpful strip | UI Primitives — Docs Suite",
}

export default function FeedbackStripPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 08"
        title="Feedback helpful strip"
        description="Was this article helpful? Thumbs strip that expands into an optional 280-character comment box. Tracks both signal and free-text feedback per page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Feedback helpful strip" },
        ]}
      />
      <section className={styles.canvas} aria-label="Feedback helpful strip demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Always renders just before the footer nav row. Anonymous by default — the comment
            is shipped to the docs ops Slack channel so Mia can read it the next morning.
          </p>
        </div>
        <div className={styles.stage}>
          <FeedbackHelpfulStrip />
        </div>
      </section>
    </main>
  )
}
