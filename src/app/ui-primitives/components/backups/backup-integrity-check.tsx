"use client"

import type { IntegrityCheckRow } from "./backup-types"

import styles from "./backup-integrity-check.module.css"

interface BackupIntegrityCheckProps {
  rows: ReadonlyArray<IntegrityCheckRow>
  /** Percent 0-100 representing scan progress. */
  scanProgress: number
  /** When true the surface treats failed rows as alerts. */
  scanComplete?: boolean
  onRemediate?: (snapshotId: string) => void
  className?: string
}

export function BackupIntegrityCheck({
  rows,
  scanProgress,
  scanComplete = false,
  onRemediate,
  className,
}: BackupIntegrityCheckProps) {
  const failedCount = rows.filter((r) => !r.passed).length
  const passedCount = rows.length - failedCount
  const pct = Math.min(100, Math.max(0, Math.round(scanProgress)))
  const classes = [
    styles.surface,
    failedCount > 0 ? styles.hasFailures : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label="Integrity check results">
      <header className={styles.head}>
        <span className={styles.kicker}>Integrity check</span>
        <span className={styles.summary}>
          {passedCount} passed · {failedCount} failed
        </span>
      </header>

      <div
        className={styles.scanTrack}
        role="progressbar"
        aria-label="Scan progress"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className={styles.scanFill} style={{ width: `${pct}%` }} />
        <span className={styles.scanLabel}>
          {scanComplete ? "Scan complete" : `Scanning · ${pct}%`}
        </span>
      </div>

      <ul className={styles.rows}>
        {rows.map((row) => (
          <li
            key={row.snapshotId}
            className={[
              styles.row,
              row.passed ? styles.rowPass : styles.rowFail,
            ].join(" ")}
            {...(!row.passed ? { role: "alert" } : {})}
          >
            <span className={styles.statusDot} aria-hidden="true" />
            <div className={styles.rowMain}>
              <span className={styles.rowSnap}>{row.snapshotId}</span>
              <span className={styles.rowResource}>{row.resourceName}</span>
              {row.reason ? <span className={styles.rowReason}>{row.reason}</span> : null}
            </div>
            {row.passed ? (
              <span className={styles.passChip}>Passed</span>
            ) : (
              <button
                type="button"
                className={styles.remediateBtn}
                onClick={() => onRemediate?.(row.snapshotId)}
              >
                Remediate
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BackupIntegrityCheck
