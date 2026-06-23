import type { Metadata } from "next"

import { StickyNote } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Sticky note | Comments primitives",
  description:
    "Primitive 10 — Figma-style floating sticky note with drag affordance, author chip, body, and tone variants.",
}

export default function StickyNotePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Sticky note"
        title="Sticky note"
        description="Drop sticky notes anywhere — bay walls, design boards, floor plans. Tones include yellow, pink, teal, and amber for quick visual grouping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Sticky note" },
        ]}
      />
      <section className={styles.demoSurfaceBoard}>
        <span className={styles.boardLabel}>Workshop wall · all 4 tones</span>
        <div className={styles.boardStickyRow}>
          <StickyNote
            author={PEOPLE.jordan}
            body="Order 3x ADR-certified hangers for the Hilux retrofit"
            tone="yellow"
            context="Bay 3 wall"
            timestamp="Mon"
          />
          <StickyNote
            author={PEOPLE.kara}
            body="Check spacer kit clearance — needs 8mm minimum"
            tone="pink"
            context="Lift card"
            timestamp="Tue"
          />
          <StickyNote
            author={PEOPLE.marcus}
            body="Restock 12B by Friday — only 2 sets left"
            tone="teal"
            context="Parts wall"
            timestamp="Wed"
          />
          <StickyNote
            author={PEOPLE.taj}
            body="Move fume hood arm 200mm to clear welder bench"
            tone="amber"
            context="Bay 5"
            timestamp="Thu"
          />
        </div>
      </section>
    </main>
  )
}
