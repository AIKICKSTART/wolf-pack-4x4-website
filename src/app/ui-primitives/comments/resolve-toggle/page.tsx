import type { Metadata } from "next"

import { ResolveToggle } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Resolve toggle | Comments primitives",
  description:
    "Primitive 06 — resolve / unresolve toggle with checkbox glyph and resolve-with-note expander.",
}

export default function ResolveTogglePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Resolve toggle"
        title="Resolve toggle"
        description="Mark a thread resolved with one tap, or expand to leave a resolution note. Tone shifts to green when resolved, and re-opens with a rotate glyph."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Resolve toggle" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Open · resolve with note option</span>
        <ResolveToggle initialStatus="open" threadId="demo-open" />

        <span className={styles.demoLabel}>Already resolved · re-open available</span>
        <ResolveToggle initialStatus="resolved" threadId="demo-resolved" />
      </section>
    </main>
  )
}
