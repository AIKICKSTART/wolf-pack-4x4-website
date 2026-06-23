import styles from "./drilldown-inspector.module.css"

export interface DrilldownRow {
  id: string
  label: string
  value: string
  sharePct: number
}

interface DrilldownInspectorProps {
  parentMetric: string
  parentValue: string
  dimensionLabel: string
  rows: ReadonlyArray<DrilldownRow>
  totalDescription: string
  className?: string
}

export function DrilldownInspector({
  parentMetric,
  parentValue,
  dimensionLabel,
  rows,
  totalDescription,
  className,
}: DrilldownInspectorProps) {
  const classes = [styles.inspector, className].filter(Boolean).join(" ")
  const sorted = [...rows].sort((a, b) => b.sharePct - a.sharePct)

  return (
    <section className={classes} aria-label={`Drill down: ${parentMetric}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Drilldown · {dimensionLabel}</span>
        <h3 className={styles.title}>{parentMetric}</h3>
        <p className={styles.summary}>
          Total <strong>{parentValue}</strong> {totalDescription}
        </p>
      </header>

      <div className={styles.rows}>
        {sorted.map((row) => {
          const clamped = Math.max(0, Math.min(100, row.sharePct))
          return (
            <div key={row.id} className={styles.row}>
              <div className={styles.rowLabel}>
                <strong>{row.label}</strong>
                <span className={styles.barTrack} aria-hidden="true">
                  <span className={styles.barFill} style={{ width: `${clamped}%` }} />
                </span>
              </div>
              <div className={styles.rowValue}>
                <span>{row.value}</span>
                <span className={styles.rowShare}>{clamped.toFixed(0)}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.footer}>
        <span>{rows.length} contributors</span>
        <span>Top {sorted[0]?.label ?? "—"}</span>
      </div>
    </section>
  )
}

export default DrilldownInspector
