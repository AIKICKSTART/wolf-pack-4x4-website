import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CellMergeIndicator } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Cell merge indicator | UI Primitives — Spreadsheet",
}

export default function CellMergePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 07"
        title="Cell merge indicator"
        description="Merge / unmerge action card shown when a range is selected — shows kind and cell count."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Cell merge" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Header band over the quote sheet</span>
          <CellMergeIndicator
            range={{ start: { col: 0, row: 0 }, end: { col: 5, row: 0 } }}
            kind="horizontal"
          />
          <CellMergeIndicator
            range={{ start: { col: 0, row: 0 }, end: { col: 0, row: 9 } }}
            kind="vertical"
          />
          <CellMergeIndicator
            range={{ start: { col: 1, row: 1 }, end: { col: 4, row: 6 } }}
            kind="block"
            merged
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Renders alongside the selection overlay when more than one cell is selected. When the
            range is already merged the action flips to <strong>Unmerge</strong>.
          </p>
        </div>
      </section>
    </main>
  )
}
