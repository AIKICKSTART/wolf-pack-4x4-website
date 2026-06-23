import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CellSelectionOverlay } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Cell selection overlay | UI Primitives — Spreadsheet",
}

export default function CellSelectionOverlayPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 06"
        title="Cell selection overlay"
        description="Marching-ant rectangle drawn over the selected range with a labelled plate and autofill drag handle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Selection overlay" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Selection over the quote line-items grid</span>
          <div
            style={{
              position: "relative",
              height: 220,
              border: "1px solid var(--primitive-line-strong)",
              borderRadius: "var(--primitive-radius-md)",
              background:
                "repeating-linear-gradient(0deg, var(--primitive-texture-stroke) 0 30px, var(--primitive-glass-soft) 30px 31px), repeating-linear-gradient(90deg, var(--primitive-texture-stroke) 0 120px, var(--primitive-glass-soft) 120px 121px), var(--primitive-recessed)",
            }}
          >
            <CellSelectionOverlay
              range={{ start: { col: 1, row: 1 }, end: { col: 3, row: 5 } }}
              rect={{ top: 30, left: 120, width: 360, height: 150 }}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The plate shows A1 notation and cell count. The corner autofill handle is provided by
            the <code>AutofillDragHandle</code> primitive. Animation respects{" "}
            <code>prefers-reduced-motion</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
