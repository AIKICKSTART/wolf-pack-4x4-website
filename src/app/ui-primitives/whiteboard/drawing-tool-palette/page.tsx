"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { DrawingToolPalette } from "../../components/whiteboard"
import type { DrawingToolKind } from "../../components/whiteboard"
import styles from "../whiteboard.module.css"

export default function DrawingToolPalettePage() {
  const [active, setActive] = useState<DrawingToolKind>("sticky")

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 02"
        title="Drawing tool palette"
        description="Vertical tool palette with pen, highlighter, eraser, shape, sticky, text, connector, and hand. Active tool highlighted in brand red with a keyboard hint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Drawing tool palette" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>
            Active tool · {active.toUpperCase()} — click any to switch
          </span>
          <div className={styles.demoRowJustified}>
            <DrawingToolPalette activeTool={active} onSelect={setActive} />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Renders with <code>role=&quot;toolbar&quot;</code> and
            <code> aria-orientation=&quot;vertical&quot;</code>. Each button is
            <code> aria-pressed</code> when active and includes an{" "}
            <code>aria-label</code> with the tool name + shortcut. Hint badge shows the
            keyboard mnemonic the host app binds.
          </p>
        </div>
      </section>
    </main>
  )
}
