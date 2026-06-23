"use client"

import { useState } from "react"

import { ActiveFilterChipBar } from "../../components/search"
import type { ActiveFilter } from "../../components/search"
import styles from "../search.module.css"

const INITIAL: ReadonlyArray<ActiveFilter> = [
  { id: "cat-mufflers", group: "Category", label: "Mufflers", value: "mufflers" },
  { id: "sup-magnaflow", group: "Supplier", label: "Magnaflow", value: "magnaflow" },
  { id: "price-2200", group: "Max price", label: "$2,200", value: "2200" },
  { id: "fit-ba", group: "Fitment", label: "BA Falcon", value: "ba-falcon" },
  { id: "stock-in", group: "Stock", label: "In stock", value: "in-stock" },
]

export function ActiveFiltersDemo() {
  const [filters, setFilters] = useState<ReadonlyArray<ActiveFilter>>(INITIAL)

  const handleDismiss = (filter: ActiveFilter) => {
    setFilters((prev) => prev.filter((f) => f.id !== filter.id))
  }

  const handleClear = () => setFilters([])

  const handleReset = () => setFilters(INITIAL)

  return (
    <div className={styles.stage}>
      <div className={styles.stageGrid}>
        <div className={styles.subStage}>
          <h4>Active filters · with content</h4>
          <ActiveFilterChipBar
            filters={filters}
            onDismiss={handleDismiss}
            onClearAll={handleClear}
          />
        </div>
        <div className={styles.subStage}>
          <h4>Empty state · no filters applied</h4>
          <ActiveFilterChipBar
            filters={[]}
            emptyHint="No filters applied · showing all 8,142 parts"
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          style={{
            justifySelf: "start",
            appearance: "none",
            height: 34,
            padding: "0 14px",
            border: "1px solid var(--primitive-btn-secondary-border)",
            borderRadius: "var(--primitive-btn-radius)",
            background: "var(--primitive-btn-secondary-bg)",
            color: "var(--primitive-btn-secondary-fg)",
            fontFamily: "var(--primitive-font-mono)",
            fontSize: "var(--primitive-text-2xs)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Reset demo
        </button>
      </div>
    </div>
  )
}
