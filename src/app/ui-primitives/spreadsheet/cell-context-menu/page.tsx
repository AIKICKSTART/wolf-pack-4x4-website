import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CellContextMenu } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Cell context menu | UI Primitives — Spreadsheet",
}

export default function CellContextMenuPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 12"
        title="Cell context menu"
        description="Right-click action menu with clipboard, structure (insert / delete row / column), format, and comment groups."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Context menu" },
        ]}
      />
      <section className={styles.canvas}>
        <div
          className={styles.demoStage}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            display: "grid",
            alignItems: "start",
          }}
        >
          <div>
            <span className={styles.demoLabel}>Cell B3 — full menu</span>
            <div style={{ position: "relative", height: 360 }}>
              <CellContextMenu cellLabel="B3" position={{ top: 0, left: 0 }} />
            </div>
          </div>
          <div>
            <span className={styles.demoLabel}>Cell E12 — read-only (delete disabled)</span>
            <div style={{ position: "relative", height: 320 }}>
              <CellContextMenu
                cellLabel="E12"
                position={{ top: 0, left: 0 }}
                disabled={["delete-row", "delete-column"]}
              />
            </div>
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Pass <code>disabled</code> as an array of action ids to hide them from the menu —
            useful when the cell is in a protected range. Actions emit a single discriminated
            <code>action</code> string.
          </p>
        </div>
      </section>
    </main>
  )
}
