import type { Metadata } from "next"

import { TypingIndicator } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Typing indicator | Inbox primitives",
  description:
    "Primitive 05 — animated three-dot bouncing typing indicator with reduced-motion fallback.",
}

export default function TypingIndicatorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Typing indicator"
        title="Typing indicator"
        description="Use beneath the active conversation to signal 'X is typing…'. Distinct from the AI assistant streaming indicator — this is for human peer presence."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Typing indicator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Single typer (customer)</span>
        <TypingIndicator author={PEOPLE.mick} />

        <span className={styles.demoLabel}>Single typer (team)</span>
        <TypingIndicator author={PEOPLE.jordan} />

        <span className={styles.demoLabel}>Custom label</span>
        <TypingIndicator
          author={PEOPLE.sophie}
          label="Sophie and Daniel are typing…"
        />
      </section>
    </main>
  )
}
