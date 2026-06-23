import type { Metadata } from "next"

import { QnaQueueRow } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { QNA_QUESTIONS } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Q&A queue row | Live broadcast",
  description:
    "Primitive 10 — Q&A queue row with upvote toggle, asker, timestamp, answered chip, host mic and mark-answered actions.",
}

export default function QnaQueueRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Q&A queue row"
        title="Q&A queue row"
        description="One question in the live Q&A queue. Viewers upvote to surface; hosts pull-to-mic or mark answered. The answered chip dims the row but keeps it in the log for later replay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Q&A queue row" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoDouble].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Viewer mode · upvoted state</span>
          <ul className={styles.list}>
            {QNA_QUESTIONS.map((question) => (
              <QnaQueueRow key={question.id} question={question} />
            ))}
          </ul>
        </div>

        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Host mode · pull to mic + mark answered</span>
          <ul className={styles.list}>
            {QNA_QUESTIONS.map((question) => (
              <QnaQueueRow key={question.id} question={question} showHostActions />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
