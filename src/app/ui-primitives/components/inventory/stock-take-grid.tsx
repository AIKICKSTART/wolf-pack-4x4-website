"use client"

import { useMemo, useState } from "react"
import type { ChangeEvent } from "react"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import { Chip } from "../primitives/chip"

import styles from "./stock-take-grid.module.css"

export interface StockTakeLine {
  /** SKU code. */
  sku: string
  /** Friendly part name. */
  title: string
  /** Expected (book) quantity. */
  expectedQty: number
}

export interface StockTakeGridProps {
  /** Title for the take session, e.g. "Oak Flats — Q2 2026". */
  sessionLabel: string
  /** Lines to count. */
  lines: ReadonlyArray<StockTakeLine>
  /** Optional pre-populated counts (keyed by SKU). */
  initialCounts?: Record<string, number>
}

interface CountedLine extends StockTakeLine {
  countedQty: number
  variance: number
}

function varianceTone(variance: number): "green" | "amber" | "red" {
  if (variance === 0) return "green"
  if (Math.abs(variance) <= 2) return "amber"
  return "red"
}

export function StockTakeGrid({
  sessionLabel,
  lines,
  initialCounts,
}: StockTakeGridProps) {
  const [counts, setCounts] = useState<Record<string, number>>(
    () => initialCounts ?? {},
  )

  const handleChange = (sku: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseInt(event.target.value, 10)
    setCounts((current) => ({
      ...current,
      [sku]: Number.isFinite(next) ? next : 0,
    }))
  }

  const counted: ReadonlyArray<CountedLine> = useMemo(
    () =>
      lines.map((line) => {
        const countedQty = counts[line.sku] ?? 0
        return {
          ...line,
          countedQty,
          variance: countedQty - line.expectedQty,
        }
      }),
    [lines, counts],
  )

  const columns: ReadonlyArray<DataTableColumn<CountedLine>> = [
    {
      id: "sku",
      header: "SKU",
      cell: (row) => <span className={styles.sku}>{row.sku}</span>,
      width: "140px",
      sortable: true,
    },
    {
      id: "title",
      header: "Part",
      cell: (row) => row.title,
    },
    {
      id: "expected",
      header: "Expected",
      cell: (row) => row.expectedQty,
      align: "right",
      sortable: true,
      width: "100px",
    },
    {
      id: "counted",
      header: "Counted",
      cell: (row) => (
        <input
          type="number"
          inputMode="numeric"
          className={styles.input}
          aria-label={`Counted quantity for ${row.sku}`}
          value={row.countedQty}
          onChange={handleChange(row.sku)}
          min={0}
        />
      ),
      align: "right",
      width: "120px",
    },
    {
      id: "variance",
      header: "Variance",
      cell: (row) => {
        const sign = row.variance > 0 ? "+" : ""
        return (
          <Chip
            label={`${sign}${row.variance}`}
            tone={varianceTone(row.variance)}
          />
        )
      },
      align: "right",
      width: "120px",
    },
  ]

  return (
    <div className={styles.wrap}>
      <DataTable<CountedLine>
        rows={[...counted]}
        columns={columns}
        getRowId={(row) => row.sku}
        density="comfortable"
        kicker="Stock take"
        caption={sessionLabel}
      />
    </div>
  )
}

export default StockTakeGrid
