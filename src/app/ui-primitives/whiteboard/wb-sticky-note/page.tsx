import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WbStickyNote } from "../../components/whiteboard"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "WB sticky note | UI Primitives — Whiteboard",
}

export default function WbStickyNotePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 03"
        title="WB sticky note"
        description="Whiteboard sticky note — six paper tones, a tape strip across the top, an author chip on the bottom, an optional +/- vote indicator, and a small timestamp."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "WB sticky note" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>
            Customer pain points retro · stickies scattered on the board
          </span>
          <div className={styles.stickyScatter}>
            <WbStickyNote
              content="Add ADR cheatsheet to the workshop intake binder."
              author="Dan F"
              authorInitials="DF"
              tone="yellow"
              rotation={-4}
              votes={3}
              timestamp="May 26"
            />
            <WbStickyNote
              content="Photo evidence flow needs SMS link — customers can't find email."
              author="Mira K"
              authorInitials="MK"
              tone="pink"
              rotation={3}
              votes={5}
              timestamp="May 26"
            />
            <WbStickyNote
              content="Quote PDFs are still missing the part-photo column."
              author="Yusuf A"
              authorInitials="YA"
              tone="blue"
              rotation={-2}
              votes={1}
              timestamp="May 24"
            />
            <WbStickyNote
              content="Bay 2 hoist is mis-calibrated — Magnaflow installs taking 40m longer."
              author="Tomas R"
              authorInitials="TR"
              tone="green"
              rotation={5}
              votes={-2}
              timestamp="May 22"
            />
            <WbStickyNote
              content="Loyalty SMS opt-in copy is too long — drop to 1 sentence."
              author="Priya N"
              authorInitials="PN"
              tone="purple"
              rotation={-6}
              votes={4}
              timestamp="May 25"
            />
            <WbStickyNote
              content="Add &quot;Photos uploaded&quot; checkbox to job-card mobile."
              author="Dan F"
              authorInitials="DF"
              tone="orange"
              rotation={2}
              votes={2}
              timestamp="May 27"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Rotation is clamped to ±12°. Author chip includes initials avatar.
            <code> aria-label</code> includes author + truncated content excerpt so screen
            readers always announce who wrote the note. Distinct from
            <code> comments/sticky-note</code> which is an inline review note.
          </p>
        </div>
      </section>
    </main>
  )
}
