import styles from "./streaming-indicator.module.css"

interface StreamingIndicatorProps {
  label?: string
  className?: string
}

export function StreamingIndicator({
  label = "Assistant is typing",
  className,
}: StreamingIndicatorProps) {
  const classes = [styles.indicator, className].filter(Boolean).join(" ")

  return (
    <span className={classes} role="status" aria-live="polite" aria-label={label}>
      <span className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </span>
      <span className={styles.caret} aria-hidden="true" />
    </span>
  )
}

export default StreamingIndicator
