import type { DiffLine, HunkRange } from "./code-diff-types"
import { hunkRangeLabel } from "./code-diff-types"
import styles from "./diff-hunk.module.css"

export interface DiffHunkProps {
  /** Header range — produces the @@ -a,b +c,d @@ strip. */
  range: HunkRange
  /** Diff lines inside the hunk. */
  lines: ReadonlyArray<DiffLine>
  /** Optional path used for aria-label. */
  filePath?: string
  /** Optional className passthrough. */
  className?: string
}

const KIND_CLASS = {
  added: styles.added,
  removed: styles.removed,
  context: styles.context,
  meta: styles.meta,
} as const

const KIND_MARKER = {
  added: "+",
  removed: "-",
  context: " ",
  meta: "@",
} as const

export function DiffHunk({ range, lines, filePath, className }: DiffHunkProps) {
  const rangeLabel = hunkRangeLabel(range)
  const ariaLabel = filePath
    ? `Diff hunk in ${filePath} ${rangeLabel}`
    : `Diff hunk ${rangeLabel}`
  const classes = [styles.hunk, className].filter(Boolean).join(" ")

  return (
    <section
      role="region"
      aria-label={ariaLabel}
      className={classes}
    >
      <header className={styles.head}>
        <span className={styles.headRange}>{rangeLabel}</span>
        {range.context ? (
          <span className={styles.headContext}>{range.context}</span>
        ) : null}
      </header>
      <div className={styles.body}>
        {lines.map((line, index) => {
          const marker = KIND_MARKER[line.kind]
          const oldGutter = line.kind === "added" ? "" : line.oldLineNumber ?? ""
          const newGutter = line.kind === "removed" ? "" : line.newLineNumber ?? ""
          return (
            <div
              key={`${line.kind}-${index}-${line.text.slice(0, 16)}`}
              className={`${styles.line} ${KIND_CLASS[line.kind]}`}
              data-kind={line.kind}
            >
              <span className={styles.gutter}>{oldGutter}</span>
              <span className={styles.gutter}>{newGutter}</span>
              <span className={styles.marker} aria-hidden="true">
                {marker}
              </span>
              <span className={styles.text}>{line.text === "" ? " " : line.text}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default DiffHunk
