import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FrozenRowColDivider } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Frozen divider | UI Primitives — Spreadsheet",
}

export default function FrozenDividerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 05"
        title="Frozen row / column divider"
        description="Boundary visual between frozen and scrolling regions of a sheet. Tone-coded for orientation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Frozen divider" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Horizontal · top 2 rows frozen</span>
          <FrozenRowColDivider orientation="row" tone="amber" label="Frozen · 2 rows" length={620} />
          <FrozenRowColDivider orientation="row" tone="teal" label="Frozen · header row" length={620} />
          <span className={styles.demoLabel}>Vertical · first column frozen</span>
          <div style={{ display: "flex", gap: "var(--primitive-space-6)", alignItems: "stretch", height: 220 }}>
            <FrozenRowColDivider orientation="column" tone="red" label="Pinned · SKU" />
            <FrozenRowColDivider orientation="column" tone="amber" label="Frozen · 1 col" />
            <FrozenRowColDivider orientation="column" tone="teal" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Purely visual — no state. Place absolutely-positioned along the freeze boundary in the
            host grid. The tone communicates orientation purpose (amber for top freeze, teal for
            informational, red for a hard pin).
          </p>
        </div>
      </section>
    </main>
  )
}
