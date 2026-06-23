import styles from "./string-extraction-row.module.css"

export type ExtractionStatus =
  | "detected"
  | "queued"
  | "extracted"
  | "ignored"
  | "needs-context"

export interface DetectedString {
  /** The literal source string. */
  literal: string
  /** Line number inside the source file. */
  line: number
  /** Suggested translation key, e.g. "checkout.cta.confirm". */
  suggestedKey: string
  status: ExtractionStatus
}

export interface StringExtractionRowProps {
  /** Path relative to the repo root, e.g. "src/app/checkout/page.tsx". */
  filePath: string
  /** Detected strings inside the file. */
  strings: ReadonlyArray<DetectedString>
}

const STATUS_LABEL: Record<ExtractionStatus, string> = {
  detected: "Detected",
  queued: "Queued",
  extracted: "Extracted",
  ignored: "Ignored",
  "needs-context": "Needs context",
}

export function StringExtractionRow({ filePath, strings }: StringExtractionRowProps) {
  return (
    <article className={styles.row} aria-label={`Strings detected in ${filePath}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Source file</span>
        <code className={styles.path}>{filePath}</code>
        <span className={styles.count}>{strings.length} strings</span>
      </header>

      <ol className={styles.list}>
        {strings.map((string) => (
          <li key={`${filePath}:${string.line}`} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.line}>L{string.line}</span>
              <span
                className={styles.statusChip}
                data-status={string.status}
                title={STATUS_LABEL[string.status]}
              >
                {STATUS_LABEL[string.status]}
              </span>
            </div>
            <blockquote className={styles.literal}>&ldquo;{string.literal}&rdquo;</blockquote>
            <div className={styles.suggestion}>
              <span className={styles.suggestionLabel}>Suggested key</span>
              <code className={styles.suggestionKey}>{string.suggestedKey}</code>
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default StringExtractionRow
