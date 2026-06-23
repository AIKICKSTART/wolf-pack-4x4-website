"use client"

import { useMemo } from "react"
import { Download } from "lucide-react"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import type { ColumnTypeFamily, QueryResultColumn, QueryResultRow } from "./db-admin-types"
import styles from "./query-results-table.module.css"

interface QueryResultsTableProps {
  columns: ReadonlyArray<QueryResultColumn>
  rows: ReadonlyArray<QueryResultRow>
  /** Execution duration label — e.g. "184ms". */
  duration?: string
  /** Optional export callback — defaults to a stub that does nothing. */
  onExport?: () => void
  className?: string
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 4 })
}

function formatDate(value: string): string {
  if (!value) {
    return ""
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toISOString().replace("T", " ").replace("Z", " UTC")
}

function renderCell(
  family: ColumnTypeFamily,
  value: string | number | boolean | null,
): React.ReactNode {
  if (value === null) {
    return <span className={styles.nullCell}>NULL</span>
  }
  switch (family) {
    case "number":
      return (
        <span className={styles.numberCell}>
          {typeof value === "number" ? formatNumber(value) : String(value)}
        </span>
      )
    case "boolean":
      return (
        <span
          className={`${styles.booleanCell} ${
            value ? styles.booleanTrue : styles.booleanFalse
          }`}
        >
          {value ? "true" : "false"}
        </span>
      )
    case "date":
      return (
        <span className={styles.dateCell}>
          {typeof value === "string" ? formatDate(value) : String(value)}
        </span>
      )
    case "json":
      return <span className={styles.jsonCell}>{String(value)}</span>
    case "binary":
      return <span className={styles.jsonCell}>0x{String(value).slice(0, 16)}…</span>
    case "string":
    default:
      return <span className={styles.stringCell}>{String(value)}</span>
  }
}

export function QueryResultsTable({
  columns,
  rows,
  duration,
  onExport,
  className,
}: QueryResultsTableProps) {
  const tableColumns = useMemo<ReadonlyArray<DataTableColumn<QueryResultRow>>>(() => {
    const rowNumberColumn: DataTableColumn<QueryResultRow> = {
      id: "__row_number",
      header: "#",
      cell: () => null,
      sortable: false,
      align: "right",
      width: "56px",
    }
    const dataColumns = columns.map<DataTableColumn<QueryResultRow>>((column) => ({
      id: column.id,
      header: column.name,
      sortable: true,
      align: column.family === "number" ? "right" : "left",
      cell: (row: QueryResultRow) => renderCell(column.family, row[column.id] ?? null),
    }))
    // Replace the row-number cell with index-aware version via a wrapper below.
    return [rowNumberColumn, ...dataColumns]
  }, [columns])

  // We need row index for the row-number column. DataTable's cell signature
  // is (row) => ReactNode; getRowId already receives the index. We thread the
  // index in via the row object itself by mapping rows to include a synthetic
  // __index field. That keeps DataTable untouched.
  const indexedRows = useMemo(
    () => rows.map((row, index) => ({ ...row, __row_number: index + 1 })),
    [rows],
  )

  const finalColumns = useMemo<ReadonlyArray<DataTableColumn<QueryResultRow>>>(
    () =>
      tableColumns.map((column) =>
        column.id === "__row_number"
          ? {
              ...column,
              cell: (row: QueryResultRow) => (
                <span className={styles.rowNumberCell}>
                  {String(row.__row_number ?? "")}
                </span>
              ),
            }
          : column,
      ),
    [tableColumns],
  )

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.toolbar}>
        <span className={styles.kicker}>Result</span>
        <span>
          {rows.length.toLocaleString("en-US")} row{rows.length === 1 ? "" : "s"}
        </span>
        {duration ? <span>· {duration}</span> : null}
        <span className={styles.summary}>{columns.length} columns</span>
        <button
          type="button"
          className={styles.exportButton}
          onClick={onExport}
          aria-label="Export results as CSV"
        >
          <Download size={11} strokeWidth={2.4} aria-hidden="true" />
          CSV
        </button>
      </div>
      <DataTable
        rows={indexedRows}
        columns={finalColumns}
        density="compact"
        getRowId={(row, index) => `result-row-${index}-${row.__row_number ?? index}`}
        empty="No rows returned"
      />
    </div>
  )
}

export default QueryResultsTable
