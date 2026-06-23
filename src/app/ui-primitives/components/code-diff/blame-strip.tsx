import { shortSha } from "./code-diff-types"
import styles from "./blame-strip.module.css"

export interface BlameRow {
  /** Code line text. */
  code: string
  /** Line number rendered in the gutter. */
  lineNumber: number
  /** Commit short sha. */
  sha: string
  /** Author display name. */
  author: string
  /** Date label — pre-formatted. */
  date: string
}

export interface BlameStripProps {
  /** One entry per line of code. */
  rows: ReadonlyArray<BlameRow>
  /** File path shown in the header. */
  filePath: string
  className?: string
}

export function BlameStrip({ rows, filePath, className }: BlameStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")
  return (
    <section
      role="region"
      aria-label={`Blame strip for ${filePath}`}
      className={classes}
    >
      <header className={styles.head}>
        <div className={styles.headCol}>Blame</div>
        <div className={styles.headCol}>{filePath}</div>
      </header>
      <div className={styles.rail} role="list" aria-label="Per-line blame">
        {rows.map((row, index) => {
          const sha = shortSha(row.sha)
          return (
            <div
              key={`blame-${index}-${row.sha}`}
              className={styles.blameCell}
              role="listitem"
              tabIndex={0}
            >
              <span className={styles.shaTag}>{sha}</span>
              <span className={styles.authorName}>{row.author}</span>
              <div className={styles.popover} role="tooltip">
                <span className={styles.popoverAuthor}>{row.author}</span>
                <span className={styles.popoverSha}>{sha}</span>
                <span className={styles.popoverDate}>{row.date}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.body}>
        {rows.map((row, index) => (
          <div key={`code-${index}-${row.lineNumber}`} className={styles.row}>
            <span className={styles.lineNo}>{row.lineNumber}</span>
            <span className={styles.code}>{row.code === "" ? " " : row.code}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BlameStrip
