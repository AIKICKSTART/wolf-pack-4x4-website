import styles from "./unread-divider.module.css"

interface UnreadDividerProps {
  /** Number of unread messages below the divider. */
  count?: number
  /** Override the visible label, defaults to "Unread messages". */
  label?: string
  className?: string
}

export function UnreadDivider({
  count,
  label = "Unread messages",
  className,
}: UnreadDividerProps) {
  const showCount = typeof count === "number" && count > 0
  const ariaLabel = showCount ? `${label} — ${count} new` : label
  const classes = [styles.divider, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="separator"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
    >
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.pill}>
        <span className={styles.dot} aria-hidden="true" />
        {label}
        {showCount ? (
          <span className={styles.count} aria-hidden="true">
            {count}
          </span>
        ) : null}
      </span>
      <span className={styles.line} aria-hidden="true" />
    </div>
  )
}

export default UnreadDivider
