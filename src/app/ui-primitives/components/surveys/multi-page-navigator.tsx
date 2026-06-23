import styles from "./multi-page-navigator.module.css"

interface MultiPageNavigatorProps {
  /** 1-based current page index. */
  current: number
  /** Total page count. */
  total: number
  /** Disable the back button (e.g. on page 1). */
  backDisabled?: boolean
  /** Label override for the next/back actions. */
  nextLabel?: string
  backLabel?: string
  /** Hide the save-and-resume action. */
  hideResume?: boolean
  className?: string
}

export function MultiPageNavigator({
  current,
  total,
  backDisabled = false,
  nextLabel,
  backLabel = "Back",
  hideResume = false,
  className,
}: MultiPageNavigatorProps) {
  const safeTotal = Math.max(1, Math.floor(total))
  const safeCurrent = Math.min(Math.max(1, Math.floor(current)), safeTotal)
  const isLast = safeCurrent >= safeTotal
  const resolvedNext = nextLabel ?? (isLast ? "Submit" : "Next")

  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label="Survey pagination">
      <button
        type="button"
        className={styles.back}
        disabled={backDisabled || safeCurrent === 1}
      >
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M8 2 4 6l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {backLabel}
      </button>

      <span className={styles.meta} aria-live="polite">
        <span className={styles.metaLabel}>Page</span>
        <span className={styles.metaCurrent}>{safeCurrent}</span>
        <span className={styles.metaSep}>of</span>
        <span className={styles.metaTotal}>{safeTotal}</span>
      </span>

      {!hideResume ? (
        <button type="button" className={styles.resume}>
          <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
            <path d="M3 2v7l3-2 3 2V2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
          </svg>
          Save &amp; continue later
        </button>
      ) : null}

      <button type="button" className={[styles.next, isLast ? styles.nextSubmit : null].filter(Boolean).join(" ")}>
        {resolvedNext}
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M4 2 8 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
    </nav>
  )
}
