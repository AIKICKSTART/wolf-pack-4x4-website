import type { PivotRow } from "./reports-types"
import styles from "./pivot-table-preview.module.css"

interface PivotTablePreviewProps {
  title: string
  rowHeader: string
  columnHeaders: ReadonlyArray<string>
  rows: ReadonlyArray<PivotRow>
  totalsLabel?: string
  totals?: ReadonlyArray<string>
  className?: string
}

export function PivotTablePreview({
  title,
  rowHeader,
  columnHeaders,
  rows,
  totalsLabel = "Total",
  totals,
  className,
}: PivotTablePreviewProps) {
  const columnCount = columnHeaders.length + 1
  const gridStyle = {
    gridTemplateColumns: `minmax(160px, 1fr) repeat(${columnHeaders.length}, minmax(80px, 1fr))`,
  }
  const classes = [styles.frame, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Pivot preview: ${title}`}>
      <div className={styles.head}>
        <span className={styles.headTitle}>
          <strong>{title}</strong>
        </span>
        <span>{columnCount} columns · {rows.length} rows</span>
      </div>
      <div className={styles.grid} role="grid" aria-label={title} aria-rowcount={rows.length + 1}>
        <div className={styles.row} style={gridStyle} role="row">
          <span className={`${styles.cell} ${styles.colHead} ${styles.cellHeaderRow}`} role="columnheader">
            {rowHeader}
          </span>
          {columnHeaders.map((header) => (
            <span key={header} className={`${styles.cell} ${styles.colHead}`} role="columnheader">
              {header}
            </span>
          ))}
        </div>
        {rows.map((row, rowIndex) => (
          <div
            key={`${row.header}-${rowIndex}`}
            className={`${styles.row} ${row.subtotal ? styles.subtotal : ""}`}
            style={gridStyle}
            role="row"
          >
            <span className={`${styles.cell} ${styles.cellHeaderRow}`} role="rowheader">
              {row.header}
            </span>
            {row.cells.map((cell, cellIndex) => (
              <span
                key={`${rowIndex}-${cellIndex}`}
                className={`${styles.cell} ${cell.emphasis === "value" ? styles.cellValue : ""}`}
                role="gridcell"
              >
                {cell.value}
              </span>
            ))}
          </div>
        ))}
        {totals && totals.length === columnHeaders.length && (
          <div className={`${styles.row} ${styles.totalRow}`} style={gridStyle} role="row">
            <span className={`${styles.cell} ${styles.cellHeaderRow}`} role="rowheader">
              {totalsLabel}
            </span>
            {totals.map((cell, cellIndex) => (
              <span key={`total-${cellIndex}`} className={styles.cell} role="gridcell">
                {cell}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PivotTablePreview
