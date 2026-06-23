import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { ChipFilterDemo } from "./chip-filter-demo"

export const metadata: Metadata = {
  title: "Chip filter row | UI Primitives — Mobile Shell",
}

export default function ChipFilterPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 14"
        title="Chip filter row"
        description="Horizontally scrollable filter chips with a per-chip count and a leading deselect-all chip when at least one filter is active. aria-pressed reflects state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Chip filter" },
        ]}
      />
      <section className={styles.canvas} aria-label="Chip filter demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Parts catalogue filters — mechanic narrows the list while keeping the scan field
            visible.
          </p>
        </div>
        <ChipFilterDemo />
      </section>
    </main>
  )
}
