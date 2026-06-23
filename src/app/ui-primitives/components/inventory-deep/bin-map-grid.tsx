"use client"

import { useMemo } from "react"

import { Chip } from "../primitives/chip"

import styles from "./bin-map-grid.module.css"
import type { BinCell } from "./inventory-deep-types"

export interface BinMapGridProps {
  /** Warehouse / bay label shown in the header. */
  warehouseName: string
  /** All cells in row-major order — `coord.bay` letters A–G typical. */
  cells: ReadonlyArray<BinCell>
  /** Bay letters to render columns for, top-to-bottom. */
  bays: ReadonlyArray<string>
  /** Maximum row number rendered (1-indexed). */
  rows: number
  /** Optional currently-selected cell id, e.g. "C4-2". */
  activeCellId?: string
  /** Fires when an operator clicks a cell. */
  onCellSelect?: (cell: BinCell) => void
}

function densityClass(fill: number, state: BinCell["state"]): string {
  if (state === "blocked") return styles.blocked
  if (state === "reserved") return styles.reserved
  if (state === "empty") return styles.empty
  if (fill >= 90) return styles.capped
  if (fill >= 65) return styles.dense
  if (fill >= 35) return styles.active
  return styles.light
}

function densityLabel(fill: number, state: BinCell["state"]): string {
  if (state === "blocked") return "Blocked"
  if (state === "reserved") return "Reserved"
  if (state === "empty") return "Empty"
  if (fill >= 90) return "Capped"
  if (fill >= 65) return "Dense"
  if (fill >= 35) return "Active"
  return "Light"
}

export function BinMapGrid({
  warehouseName,
  cells,
  bays,
  rows,
  activeCellId,
  onCellSelect,
}: BinMapGridProps) {
  const byKey = useMemo(() => {
    const map = new Map<string, BinCell>()
    for (const cell of cells) {
      map.set(cell.id, cell)
    }
    return map
  }, [cells])

  return (
    <section
      className={styles.wrap}
      role="region"
      aria-label={`${warehouseName} bin map grid`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Bin map · live fill</span>
          <h3 className={styles.title}>{warehouseName}</h3>
        </div>
        <div className={styles.legend} aria-label="Density legend">
          <Chip label="Light" tone="teal" />
          <Chip label="Active" tone="green" />
          <Chip label="Dense" tone="amber" />
          <Chip label="Capped" tone="red" />
          <Chip label="Empty" tone="neutral" />
        </div>
      </header>

      <div
        className={styles.grid}
        role="grid"
        aria-rowcount={rows}
        aria-colcount={bays.length}
        style={{
          gridTemplateColumns: `auto repeat(${bays.length}, minmax(56px, 1fr))`,
        }}
      >
        <span className={styles.cornerLabel} aria-hidden="true">
          Bay →
        </span>
        {bays.map((bay) => (
          <span key={`col-${bay}`} className={styles.colHeader} role="columnheader">
            {bay}
          </span>
        ))}

        {Array.from({ length: rows }, (_, rowIdx) => rowIdx + 1).map((row) => (
          <Row
            key={`row-${row}`}
            row={row}
            bays={bays}
            byKey={byKey}
            activeCellId={activeCellId}
            onCellSelect={onCellSelect}
          />
        ))}
      </div>
    </section>
  )
}

interface RowProps {
  row: number
  bays: ReadonlyArray<string>
  byKey: Map<string, BinCell>
  activeCellId?: string
  onCellSelect?: (cell: BinCell) => void
}

function Row({ row, bays, byKey, activeCellId, onCellSelect }: RowProps) {
  return (
    <>
      <span className={styles.rowHeader} role="rowheader">
        Row {row.toString().padStart(2, "0")}
      </span>
      {bays.map((bay) => {
        const id = `${bay}${row}`
        const cell = byKey.get(id)
        if (!cell) {
          return (
            <span
              key={id}
              role="gridcell"
              className={`${styles.cell} ${styles.empty}`}
              aria-label={`Bin ${id} empty`}
            >
              <span className={styles.cellId}>{id}</span>
            </span>
          )
        }

        const isActive = activeCellId === cell.id
        const classes = [
          styles.cell,
          densityClass(cell.fillPercent, cell.state),
          isActive ? styles.active2 : null,
        ]
          .filter(Boolean)
          .join(" ")
        const label = `Bin ${cell.id}, ${densityLabel(cell.fillPercent, cell.state)}, ${cell.skuCount} SKUs${
          cell.primarySku ? `, primary ${cell.primarySku}` : ""
        }`

        if (!onCellSelect) {
          return (
            <span
              key={cell.id}
              role="gridcell"
              className={classes}
              aria-label={label}
              title={label}
            >
              <span className={styles.cellId}>{cell.id}</span>
              <span className={styles.cellMeta}>{cell.fillPercent}%</span>
              {cell.primarySku ? (
                <span className={styles.cellSku}>{cell.primarySku}</span>
              ) : null}
            </span>
          )
        }

        return (
          <button
            key={cell.id}
            type="button"
            role="gridcell"
            className={classes}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onCellSelect(cell)}
          >
            <span className={styles.cellId}>{cell.id}</span>
            <span className={styles.cellMeta}>{cell.fillPercent}%</span>
            {cell.primarySku ? (
              <span className={styles.cellSku}>{cell.primarySku}</span>
            ) : null}
          </button>
        )
      })}
    </>
  )
}

export default BinMapGrid
