import type { Metadata } from "next"

import { CommentBubble } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Comment bubble | Comments primitives",
  description:
    "Primitive 02 — single comment bubble with avatar, name, role chip, timestamp, body, reactions, reply CTA, and kebab menu.",
}

export default function CommentBubblePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Comment bubble"
        title="Comment bubble"
        description="The atomic unit of a comment thread. Avatar, name, role chip, time, body, reactions, reply CTA, and a kebab menu for edit / delete."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Comment bubble" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Open · with reactions</span>
        <CommentBubble
          author={PEOPLE.jordan}
          body="We need ADR clarification before quoting — rear bracket clearance under the tow bar is only 4mm."
          timestamp="10:14a"
          status="open"
          reactions={[
            { emoji: "lightbulb", count: 3 },
            { emoji: "question", count: 1, mine: true },
          ]}
        />

        <span className={styles.demoLabel}>Resolved · no reactions</span>
        <CommentBubble
          author={PEOPLE.rita}
          body="Final quote includes the spacer kit + 30 mins extra labour. Customer signed off."
          timestamp="Tue 4:02p"
          status="resolved"
        />

        <span className={styles.demoLabel}>Highlighted · in side panel selection</span>
        <CommentBubble
          author={PEOPLE.kara}
          body="Jordan, please double-check the bracket clearance for the fume hood arm — same offset issue."
          timestamp="Wed 9:02a"
          status="open"
          highlighted
          reactions={[{ emoji: "fire", count: 2, mine: true }]}
        />
      </section>
    </main>
  )
}
