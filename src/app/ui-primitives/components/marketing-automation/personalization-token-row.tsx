import styles from "./personalization-token-row.module.css"

interface PersonalizationTokenRowProps {
  /** Token expression, e.g. "{{first_name}}". */
  token: string
  /** Backing source label, e.g. "Contact attribute". */
  source: string
  /** Rendered preview text containing the merged value. */
  previewBefore: string
  previewValue: string
  previewAfter: string
  /** Fallback when value is missing. */
  fallback?: string
  className?: string
}

export function PersonalizationTokenRow({
  token,
  source,
  previewBefore,
  previewValue,
  previewAfter,
  fallback,
  className,
}: PersonalizationTokenRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Personalization token ${token}`}
    >
      <div className={styles.token}>
        <code className={styles.tokenCode}>{token}</code>
        <span className={styles.tokenSource}>{source}</span>
      </div>
      <div className={styles.preview}>
        <span className={styles.previewLabel}>Preview</span>
        <p className={styles.previewBody}>
          {previewBefore}
          <strong>{previewValue}</strong>
          {previewAfter}
        </p>
      </div>
      <div className={styles.fallback}>
        <span className={styles.fallbackLabel}>Fallback</span>
        {fallback ? (
          <span className={styles.fallbackBody}>&ldquo;{fallback}&rdquo;</span>
        ) : (
          <span className={[styles.fallbackBody, styles.fallbackEmpty].join(" ")}>
            Empty — token may render blank
          </span>
        )}
      </div>
    </article>
  )
}

export default PersonalizationTokenRow
