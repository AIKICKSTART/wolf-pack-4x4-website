"use client"

import { useState } from "react"

import {
  ASSET_KIND_GLYPH,
  ASSET_KIND_LABEL,
  type AssetKind,
} from "./asset-library-types"

import styles from "./asset-type-filter.module.css"

export interface AssetTypeFilterCount {
  kind: AssetKind
  count: number
}

interface AssetTypeFilterProps {
  counts: ReadonlyArray<AssetTypeFilterCount>
  defaultSelected?: AssetKind | "all"
  onChange?: (selected: AssetKind | "all") => void
  className?: string
}

export function AssetTypeFilter({
  counts,
  defaultSelected = "all",
  onChange,
  className,
}: AssetTypeFilterProps) {
  const [selected, setSelected] = useState<AssetKind | "all">(defaultSelected)
  const total = counts.reduce((sum, entry) => sum + entry.count, 0)

  const setActive = (next: AssetKind | "all") => {
    setSelected(next)
    onChange?.(next)
  }

  return (
    <div
      className={[styles.filter, className].filter(Boolean).join(" ")}
      role="tablist"
      aria-label="Filter by asset type"
    >
      <button
        type="button"
        role="tab"
        aria-selected={selected === "all"}
        className={[
          styles.chip,
          selected === "all" ? styles.chipSelected : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setActive("all")}
      >
        <span className={styles.glyph} aria-hidden="true">
          ⌬
        </span>
        <span className={styles.label}>All</span>
        <span className={styles.count}>{total}</span>
      </button>
      {counts.map((entry) => {
        const isActive = selected === entry.kind
        return (
          <button
            key={entry.kind}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              styles.chip,
              isActive ? styles.chipSelected : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActive(entry.kind)}
          >
            <span className={styles.glyph} aria-hidden="true">
              {ASSET_KIND_GLYPH[entry.kind]}
            </span>
            <span className={styles.label}>
              {ASSET_KIND_LABEL[entry.kind]}
            </span>
            <span className={styles.count}>{entry.count}</span>
          </button>
        )
      })}
    </div>
  )
}

export default AssetTypeFilter
