import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PresenceCursor } from "../../components/collab-deep"

import { DEEP_CURSORS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Presence cursor | Collab deep",
  description:
    "Primitive 01 — floating remote cursor with tinted name label and live activity verb.",
}

export default function PresenceCursorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Cursor"
        title="Presence cursor"
        description="Floating remote cursor with a soft bob and tinted name + activity label. Drops into any positioned stage and animates between positions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Presence cursor" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Falcon parts page · live cursors</span>
        <div className={styles.canvasStage} aria-label="Cursor stage with 5 active collaborators">
          <span className={styles.canvasGuide} aria-hidden="true" />
          <article className={styles.canvasDoc} aria-hidden="true">
            <h2 className={styles.canvasTitle}>Falcon FG · 3 inch cat-back</h2>
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
          </article>
          {DEEP_CURSORS.map((cursor) => (
            <PresenceCursor
              key={cursor.id}
              user={cursor.user}
              position={cursor.position}
              activity={cursor.activity}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
