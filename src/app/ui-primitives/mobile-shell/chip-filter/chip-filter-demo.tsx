"use client"

import { useState } from "react"

import {
  ChipFilterRow,
  type ChipFilterOption,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const OPTIONS: ReadonlyArray<ChipFilterOption> = [
  { id: "muffler", label: "Mufflers", count: 18 },
  { id: "manifold", label: "Manifolds", count: 7 },
  { id: "catconv", label: "Cat converters", count: 4 },
  { id: "gasket", label: "Gaskets", count: 22 },
  { id: "clamp", label: "Clamps", count: 12 },
  { id: "hanger", label: "Hangers", count: 9 },
]

export function ChipFilterDemo() {
  const [active, setActive] = useState<ReadonlyArray<string>>(["muffler", "gasket"])

  const handleToggle = (id: string) => {
    setActive((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    )
  }

  return (
    <div className={styles.split}>
      <MobileViewport label="Chip filter preview">
        <MobileStatusBar />
        <TopAppBar title="Parts" subtitle={`${active.length} filters`} />
        <ChipFilterRow
          options={OPTIONS}
          active={active}
          onToggle={handleToggle}
          onClear={() => setActive([])}
        />
        <div className={styles.previewBody}>
          <p>Scroll the chips horizontally. The deselect-all chip appears when at least one is active.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>
            Active: {active.length === 0 ? "none" : active.join(", ")}
          </p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Filters</h2>
          <span className={styles.helpLabel}>aria-pressed on each chip</span>
        </div>
        <div className={styles.controlsRow}>
          <span className={styles.statusPill}>{active.length} selected</span>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setActive([])}
            disabled={active.length === 0}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}
