import type { Metadata } from "next"

import { CommentBubble, ReplyCard } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Reply card | Comments primitives",
  description:
    "Primitive 13 — nested reply card with smaller author header, indentation, and a quieter visual weight than CommentBubble.",
}

export default function ReplyCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Reply card"
        title="Reply card"
        description="A reply is not a top-level comment — the author header is smaller, the body is indented, and visual weight steps down. Drop multiple inside a thread."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Reply card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Root comment + three nested replies</span>
        <div className={styles.demoColumn}>
          <CommentBubble
            author={PEOPLE.jordan}
            body="We need ADR clarification before quoting — rear bracket clearance under the tow bar is only 4mm."
            timestamp="10:14a"
            status="open"
          />
          <ReplyCard
            author={PEOPLE.kara}
            body="Confirmed on Bay 3 lift — spacer kit would push it back to 8mm clear."
            timestamp="10:18a"
            reactions={[{ emoji: "like", count: 2 }]}
          />
          <ReplyCard
            author={PEOPLE.marcus}
            body="Spacers in stock, two sets on shelf 12B."
            timestamp="10:22a"
          />
          <ReplyCard
            author={PEOPLE.rita}
            body="Locking the quote at $48 extra labour + parts."
            timestamp="10:31a"
            reactions={[{ emoji: "clap", count: 3, mine: true }]}
          />
        </div>
      </section>
    </main>
  )
}
