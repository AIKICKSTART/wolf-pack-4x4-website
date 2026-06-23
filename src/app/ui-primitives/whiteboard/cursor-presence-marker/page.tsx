import type { Metadata } from "next"

import { CursorPresenceMarker } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Cursor presence marker | UI Primitives - Whiteboard",
}

export default function CursorPresenceMarkerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 09"
        title="Cursor presence marker"
        description="Live collaborator cursor marker with pointer, user chip, tone and idle state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Cursor presence marker" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Collaborator cursors</span>
          <div className={styles.demoRowJustified}>
            <CursorPresenceMarker name="Marcus" tone="blue" />
            <CursorPresenceMarker name="Jordan" tone="orange" />
            <CursorPresenceMarker name="Sophie" tone="purple" state="idle" />
          </div>
        </div>
      </section>
    </main>
  )
}
