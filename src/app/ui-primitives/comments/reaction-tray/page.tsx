import type { Metadata } from "next"

import { ReactionTray } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Reaction tray | Comments primitives",
  description:
    "Primitive 05 — persistent floating row of emoji reactions with counts and aria-pressed for own reactions.",
}

export default function ReactionTrayPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Reaction tray"
        title="Reaction tray"
        description="Persistent emoji row attached to every comment — like, love, lightbulb, question, fire, clap. Tapping toggles your reaction and updates the count."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Reaction tray" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mixed counts with one mine</span>
        <ReactionTray
          commentId="demo-1"
          reactions={[
            { emoji: "like", count: 4 },
            { emoji: "lightbulb", count: 2, mine: true },
            { emoji: "fire", count: 1 },
          ]}
        />

        <span className={styles.demoLabel}>All six</span>
        <ReactionTray
          commentId="demo-2"
          reactions={[
            { emoji: "like", count: 1 },
            { emoji: "love", count: 2, mine: true },
            { emoji: "lightbulb", count: 3 },
            { emoji: "question", count: 1 },
            { emoji: "fire", count: 4 },
            { emoji: "clap", count: 2 },
          ]}
        />
      </section>
    </main>
  )
}
