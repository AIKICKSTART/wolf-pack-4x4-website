import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AutofillDragHandle } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Autofill drag handle | UI Primitives — Spreadsheet",
}

export default function AutofillHandlePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 13"
        title="Autofill drag handle"
        description="Small corner handle used by selection overlay — three sizes, optional pulse."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Autofill handle" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Three sizes · static</span>
          <div className={styles.demoInline}>
            <AutofillDragHandle size="sm" />
            <AutofillDragHandle size="md" />
            <AutofillDragHandle size="lg" />
          </div>
          <span className={styles.demoLabel}>Pulse · attention state</span>
          <div className={styles.demoInline}>
            <AutofillDragHandle size="md" pulse />
            <AutofillDragHandle size="lg" pulse />
          </div>
          <span className={styles.demoLabel}>Composed with selected cell corner</span>
          <div
            style={{
              position: "relative",
              width: 200,
              height: 84,
              border: "2px solid var(--primitive-red)",
              borderRadius: "var(--primitive-radius-xs)",
              background: "color-mix(in oklab, var(--primitive-red) 10%, transparent)",
            }}
          >
            <div style={{ position: "absolute", right: -7, bottom: -7 }}>
              <AutofillDragHandle size="md" />
            </div>
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Used by <code>CellSelectionOverlay</code> but exposed as its own primitive so it can be
            re-purposed (drag handle for table sort rows, comment threads, etc.). Drag-start fires
            on <code>mousedown</code> and <code>touchstart</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
