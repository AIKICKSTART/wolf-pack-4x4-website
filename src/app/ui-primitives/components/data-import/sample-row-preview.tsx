import styles from "./sample-row-preview.module.css"

interface SampleRowField {
  sourceLabel: string
  sourceValue: string
  targetLabel: string
  targetValue: string
  transformedFlag?: boolean
  flagged?: boolean
}

interface SampleRowPreviewProps {
  title?: string
  fields: ReadonlyArray<SampleRowField>
  rowNumberLabel?: string
  className?: string
}

export function SampleRowPreview({
  title = "Sample row preview",
  fields,
  rowNumberLabel,
  className,
}: SampleRowPreviewProps) {
  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label={title}
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Sample</span>
          <h3 className={styles.heading}>{title}</h3>
        </div>
        {rowNumberLabel && (
          <span className={styles.rowChip}>{rowNumberLabel}</span>
        )}
      </header>

      <dl className={styles.list}>
        {fields.map((field) => (
          <div
            key={`${field.sourceLabel}-${field.targetLabel}`}
            className={[
              styles.row,
              field.flagged ? styles.rowFlagged : "",
              field.transformedFlag ? styles.rowTransformed : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.source}>
              <dt className={styles.sourceLabel}>{field.sourceLabel}</dt>
              <dd className={styles.sourceValue}>{field.sourceValue}</dd>
            </div>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
            <div className={styles.target}>
              <dt className={styles.targetLabel}>{field.targetLabel}</dt>
              <dd className={styles.targetValue}>
                <code>{field.targetValue}</code>
                {field.transformedFlag && (
                  <span className={styles.transformChip}>transformed</span>
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

export type { SampleRowField }
export default SampleRowPreview
