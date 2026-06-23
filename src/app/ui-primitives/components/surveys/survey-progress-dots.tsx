import styles from "./survey-progress-dots.module.css"

interface SurveyProgressDotsProps {
  /** Total number of questions in the survey. */
  total: number
  /** 1-based index of the question currently displayed. */
  current: number
  /** Optional accessible label override. */
  ariaLabel?: string
  className?: string
}

export function SurveyProgressDots({
  total,
  current,
  ariaLabel,
  className,
}: SurveyProgressDotsProps) {
  const safeTotal = Math.max(1, Math.floor(total))
  const safeCurrent = Math.min(Math.max(1, Math.floor(current)), safeTotal)
  const completed = Math.max(0, safeCurrent - 1)
  const remaining = safeTotal - safeCurrent
  const percent = Math.round((safeCurrent / safeTotal) * 100)

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel ?? `Question ${safeCurrent} of ${safeTotal}`}
    >
      <ol className={styles.dots}>
        {Array.from({ length: completed }, (_, i) => (
          <li key={`done-${i}`} className={`${styles.dot} ${styles.dotDone}`} aria-hidden="true" />
        ))}
        <li
          className={`${styles.dot} ${styles.dotActive}`}
          aria-current="step"
          aria-label={`Question ${safeCurrent}`}
        />
        {Array.from({ length: remaining }, (_, i) => (
          <li key={`todo-${i}`} className={styles.dot} aria-hidden="true" />
        ))}
      </ol>

      <span className={styles.meta} aria-hidden="true">
        <span className={styles.metaCurrent}>{safeCurrent}</span>
        <span className={styles.metaSep}>/</span>
        <span className={styles.metaTotal}>{safeTotal}</span>
        <span className={styles.metaPercent}>{percent}%</span>
      </span>
    </div>
  )
}
