"use client"

import { useCallback, useMemo, useState } from "react"
import type { ReactNode } from "react"

import styles from "./data-table.module.css"

export type DataTableDensity = "compact" | "comfortable" | "wide"
export type DataTableAlign = "left" | "right" | "center"

export interface DataTableColumn<T> {
  id: string
  header: string
  cell: (row: T) => ReactNode
  sortable?: boolean
  align?: DataTableAlign
  /** Optional fixed width override. */
  width?: string
}

interface DataTableProps<T> {
  rows: T[]
  columns: ReadonlyArray<DataTableColumn<T>>
  /** Row-key resolver. */
  getRowId: (row: T, index: number) => string
  density?: DataTableDensity
  selectable?: boolean
  zebra?: boolean
  caption?: string
  kicker?: string
  empty?: ReactNode
  className?: string
}

type SortState = { columnId: string; direction: "asc" | "desc" } | null

const DENSITY_CLASS: Record<DataTableDensity, string> = {
  compact: styles.densityCompact,
  comfortable: styles.densityComfortable,
  wide: styles.densityWide,
}

const ALIGN_CLASS: Record<DataTableAlign, string> = {
  left: "",
  right: styles.alignRight,
  center: styles.alignCenter,
}

function ArrowUp() {
  return (
    <svg viewBox="0 0 8 6" fill="currentColor" aria-hidden="true">
      <path d="M4 0L8 6H0z" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 8 6" fill="currentColor" aria-hidden="true">
      <path d="M0 0h8L4 6z" />
    </svg>
  )
}

export function DataTable<T>({
  rows,
  columns,
  getRowId,
  density = "comfortable",
  selectable = false,
  zebra = true,
  caption,
  kicker,
  empty,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null)
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())

  const toggleSort = useCallback((columnId: string) => {
    setSort((current) => {
      if (!current || current.columnId !== columnId) {
        return { columnId, direction: "asc" }
      }
      if (current.direction === "asc") {
        return { columnId, direction: "desc" }
      }
      return null
    })
  }, [])

  const toggleRow = useCallback((rowId: string) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  const toggleAll = useCallback(
    (rowIds: string[]) => {
      setSelected((current) => {
        if (current.size === rowIds.length) {
          return new Set()
        }
        return new Set(rowIds)
      })
    },
    [],
  )

  const rowIds = useMemo(() => rows.map((row, index) => getRowId(row, index)), [rows, getRowId])
  const allSelected = selectable && rowIds.length > 0 && selected.size === rowIds.length

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")
  const tableClass = [styles.table, DENSITY_CLASS[density]].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label={caption ?? "Data table"}>
      {(caption || kicker) && (
        <div className={styles.caption}>
          {kicker && <span className={styles.captionKicker}>{kicker}</span>}
          {caption && <span className={styles.captionText}>{caption}</span>}
        </div>
      )}
      <div className={styles.scroller}>
        <table className={tableClass}>
          {caption && (
            <caption style={{ position: "absolute", clip: "rect(0 0 0 0)" }}>{caption}</caption>
          )}
          <thead className={styles.head}>
            <tr>
              {selectable && (
                <th scope="col" className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    aria-label="Select all rows"
                    checked={allSelected}
                    onChange={() => toggleAll(rowIds)}
                  />
                </th>
              )}
              {columns.map((column) => {
                const align = column.align ?? "left"
                const isSorted = sort?.columnId === column.id
                const ariaSort: "ascending" | "descending" | "none" = !column.sortable
                  ? "none"
                  : isSorted
                  ? sort.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
                const headClass = [ALIGN_CLASS[align], column.sortable && styles.sortable]
                  .filter(Boolean)
                  .join(" ")
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={headClass}
                    aria-sort={ariaSort}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={styles.sortInner}
                        onClick={() => toggleSort(column.id)}
                      >
                        <span>{column.header}</span>
                        <span
                          className={styles.sortGlyph}
                          data-active={isSorted ? sort?.direction : "none"}
                          aria-hidden="true"
                        >
                          <ArrowUp />
                          <ArrowDown />
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={styles.empty}
                >
                  {empty ?? "No records to display"}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const rowId = rowIds[index]
                const isZebra = zebra && index % 2 === 1
                return (
                  <tr key={rowId} className={isZebra ? styles.zebra : undefined}>
                    {selectable && (
                      <td className={styles.checkboxCell}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          aria-label={`Select row ${rowId}`}
                          checked={selected.has(rowId)}
                          onChange={() => toggleRow(rowId)}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={ALIGN_CLASS[column.align ?? "left"]}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DataTable
