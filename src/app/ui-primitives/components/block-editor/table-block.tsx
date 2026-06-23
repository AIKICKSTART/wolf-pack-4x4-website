"use client"

import { ChevronDown, ChevronUp, Plus, Sliders } from "lucide-react"
import { useId, useMemo } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockPrimitiveProps,
  TableAlign,
  TableColumn,
  TableFormat,
  TablePayload,
  TableRow,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const ALIGN_CLASS: Record<TableAlign, string> = {
  left: styles.tableAlignLeft,
  right: styles.tableAlignRight,
  center: styles.tableAlignCenter,
}

const FORMAT_LABEL: Record<TableFormat, string> = {
  text: "Text",
  currency: "AUD",
  number: "Number",
  percent: "Percent",
}

/** Apply per-cell formatting before rendering. */
function formatCell(value: string, format: TableFormat): string {
  if (format === "text") {
    return value
  }
  const num = Number(value)
  if (!Number.isFinite(num)) {
    return value
  }
  if (format === "currency") {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(num)
  }
  if (format === "percent") {
    return new Intl.NumberFormat("en-AU", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(num / 100)
  }
  return new Intl.NumberFormat("en-AU").format(num)
}

/** Sort rows by sort state. Numeric columns are sorted as numbers. */
function sortRows(
  rows: ReadonlyArray<TableRow>,
  columns: ReadonlyArray<TableColumn>,
  sort?: TablePayload["sort"],
): ReadonlyArray<TableRow> {
  if (!sort) {
    return rows
  }
  const column = columns.find((c) => c.id === sort.columnId)
  if (!column) {
    return rows
  }
  const isNumeric = column.format !== "text"
  const sorted = [...rows].sort((a, b) => {
    const av = a.cells[sort.columnId] ?? ""
    const bv = b.cells[sort.columnId] ?? ""
    if (isNumeric) {
      const an = Number(av)
      const bn = Number(bv)
      if (Number.isFinite(an) && Number.isFinite(bn)) {
        return sort.direction === "asc" ? an - bn : bn - an
      }
    }
    return sort.direction === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
  })
  return sorted
}

type TableBlockProps = BlockPrimitiveProps<TablePayload>

export function TableBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: TableBlockProps) {
  const captionId = useId()
  const { columns, rows, caption, sort } = data.payload
  const isEdit = mode === "edit"

  const sortedRows = useMemo(() => sortRows(rows, columns, sort), [rows, columns, sort])

  const update = (next: Partial<TablePayload>): void => {
    if (!onChange) {
      return
    }
    onChange({
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    })
  }

  const handleSort = (columnId: string): void => {
    const column = columns.find((c) => c.id === columnId)
    if (!column || !column.sortable) {
      return
    }
    const current = sort && sort.columnId === columnId ? sort.direction : undefined
    const direction: "asc" | "desc" = current === "asc" ? "desc" : "asc"
    update({ sort: { columnId, direction } })
  }

  const toolbar = (
    <>
      <button
        type="button"
        className={styles.toolbarBtn}
        onClick={() => {
          if (!isEdit) {
            return
          }
          const id = `row-${rows.length + 1}`
          const blanks = Object.fromEntries(columns.map((c) => [c.id, ""]))
          const nextRow: TableRow = { id, cells: blanks }
          update({ rows: [...rows, nextRow] })
        }}
        aria-label="Add row"
      >
        <Plus size={12} aria-hidden="true" />
        Row
      </button>
      <button
        type="button"
        className={styles.toolbarBtn}
        aria-label="Adjust column formatting"
      >
        <Sliders size={12} aria-hidden="true" />
        Format
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Table"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={captionId}
    >
      <div className={styles.tableWrap}>
        <div className={styles.tableCaption} id={captionId}>
          {caption}
        </div>
        <div className={styles.tableScroll}>
          <table className={styles.table} role="grid" aria-labelledby={captionId}>
            <thead>
              <tr>
                {columns.map((column) => {
                  const sortDir =
                    sort && sort.columnId === column.id ? sort.direction : undefined
                  return (
                    <th
                      key={column.id}
                      scope="col"
                      className={`${styles.tableHeadCell} ${ALIGN_CLASS[column.align]} ${
                        column.sortable ? styles.tableHeadCellSortable : ""
                      }`}
                      style={{ width: column.width }}
                      aria-sort={
                        sortDir === "asc"
                          ? "ascending"
                          : sortDir === "desc"
                          ? "descending"
                          : column.sortable
                          ? "none"
                          : undefined
                      }
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                      {sortDir === "asc" ? (
                        <ChevronUp
                          size={12}
                          className={styles.tableSortArrow}
                          aria-hidden="true"
                        />
                      ) : sortDir === "desc" ? (
                        <ChevronDown
                          size={12}
                          className={styles.tableSortArrow}
                          aria-hidden="true"
                        />
                      ) : null}
                      {isEdit ? (
                        <span
                          className={styles.tableResizer}
                          aria-hidden="true"
                          role="separator"
                        />
                      ) : null}
                      <span className={styles.toolbarLabel} hidden>
                        {FORMAT_LABEL[column.format]}
                      </span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.id} className={styles.tableRow}>
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.id}`}
                      className={`${styles.tableCell} ${ALIGN_CLASS[column.align]}`}
                    >
                      {formatCell(row.cells[column.id] ?? "", column.format)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BlockShell>
  )
}

export function TableBlockEdit(props: TableBlockProps) {
  return <TableBlock {...props} mode="edit" />
}
