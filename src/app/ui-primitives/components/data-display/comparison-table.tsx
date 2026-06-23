import styles from "./comparison-table.module.css"

export type ComparisonIndicator = "check" | "cross" | "dot" | string

export interface ComparisonColumn {
  id: string
  name: string
  caption?: string
  popular?: boolean
}

export interface ComparisonRow {
  feature: string
  description?: string
  values: ReadonlyArray<ComparisonIndicator>
}

interface ComparisonTableProps {
  columns: ReadonlyArray<ComparisonColumn>
  rows: ReadonlyArray<ComparisonRow>
  caption?: string
  className?: string
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 6.5 5 9l5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 3l6 6M3 9l6-6" strokeLinecap="round" />
    </svg>
  )
}

function renderIndicator(value: ComparisonIndicator) {
  if (value === "check") {
    return (
      <span className={styles.check} aria-label="Included">
        <CheckIcon />
      </span>
    )
  }
  if (value === "cross") {
    return (
      <span className={styles.cross} aria-label="Not included">
        <CrossIcon />
      </span>
    )
  }
  if (value === "dot") {
    return <span className={styles.dot} aria-label="Partial" />
  }
  return <span className={styles.text}>{value}</span>
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  className,
}: ComparisonTableProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={caption ?? "Comparison table"}>
      <div className={styles.scroller}>
        <table className={styles.table}>
          {caption && (
            <caption style={{ position: "absolute", clip: "rect(0 0 0 0)" }}>{caption}</caption>
          )}
          <thead>
            <tr>
              <th scope="col" className={styles.featureCol}>
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={`${styles.colHeader} ${column.popular ? styles.popularCol : ""}`}
                >
                  {column.popular && (
                    <span className={styles.popularRibbon}>Most popular</span>
                  )}
                  <strong>{column.name}</strong>
                  {column.caption && <span>{column.caption}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className={styles.tableRow}>
                <th scope="row" className={styles.featureCol}>
                  <span className={styles.featureName}>
                    <strong>{row.feature}</strong>
                    {row.description && <span>{row.description}</span>}
                  </span>
                </th>
                {row.values.map((value, columnIndex) => {
                  const column = columns[columnIndex]
                  return (
                    <td
                      key={column?.id ?? `${row.feature}-${columnIndex}`}
                      className={`${styles.cellCenter} ${column?.popular ? styles.popularCol : ""}`}
                    >
                      {renderIndicator(value)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ComparisonTable
