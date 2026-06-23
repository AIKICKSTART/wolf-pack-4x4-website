import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WhiteboardCanvas } from "../../components/whiteboard"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Whiteboard canvas | UI Primitives — Whiteboard",
}

export default function WhiteboardCanvasPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 01"
        title="Whiteboard canvas"
        description="Infinite-pan canvas surface with a dotted background, a zoom-level chip, and a position chip. Visual only — actual pan/zoom drag logic lives in the host app."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Whiteboard canvas" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Board · Q3 marketing campaign — Oak Flats Mufflermen</span>
          <div style={{ minHeight: 480 }}>
            <WhiteboardCanvas
              boardName="Q3 Marketing — Oak Flats"
              zoom={1.25}
              position={{ x: 1024, y: -384 }}
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Flat variant — grid hidden, chrome hidden</span>
          <div style={{ minHeight: 240 }}>
            <WhiteboardCanvas
              boardName="Workshop bay layout"
              zoom={0.7}
              position={{ x: -120, y: 60 }}
              hideGrid
              hideChrome
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The canvas is <code>role=&quot;application&quot;</code> with
            <code> aria-roledescription=&quot;whiteboard&quot;</code>. The dotted background is
            background-image only — host apps overlay their own SVG layer for stickies, frames,
            and connectors. Zoom and position chips reformat values via{" "}
            <code>zoomLabel()</code> and <code>positionLabel()</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
