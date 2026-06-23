import styles from "./diff-stats-bar.module.css"

export interface DiffStatsBarProps {
  /** Total inserted lines across the diff. */
  insertions: number
  /** Total deleted lines across the diff. */
  deletions: number
  /** Total file count. */
  filesChanged: number
  className?: string
}

export function DiffStatsBar({
  insertions,
  deletions,
  filesChanged,
  className,
}: DiffStatsBarProps) {
  const classes = [styles.bar, className].filter(Boolean).join(" ")
  const total = Math.max(insertions + deletions, 1)
  const addFraction = insertions / total
  const delFraction = deletions / total
  const trackStyle = {
    "--add-fraction": addFraction.toFixed(4),
    "--del-fraction": delFraction.toFixed(4),
  } as React.CSSProperties

  return (
    <section
      role="region"
      aria-label={`Diff stats: ${insertions} insertions, ${deletions} deletions across ${filesChanged} files`}
      className={classes}
    >
      <header className={styles.head}>
        <div className={styles.counts}>
          <span className={styles.add}>+{insertions}</span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.del}>-{deletions}</span>
        </div>
        <span className={styles.filesChip}>
          <strong>{filesChanged}</strong> files changed
        </span>
      </header>
      <div className={styles.track} style={trackStyle} aria-hidden="true">
        {insertions > 0 ? <span className={styles.segmentAdd} /> : null}
        {deletions > 0 ? <span className={styles.segmentDel} /> : null}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendAdd}>Insertions {insertions}</span>
        <span className={styles.legendDel}>Deletions {deletions}</span>
      </div>
    </section>
  )
}

export default DiffStatsBar
