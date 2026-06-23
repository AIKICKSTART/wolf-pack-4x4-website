import type { DiffLine } from "./code-diff-types"
import styles from "./side-by-side-diff.module.css"

interface SideRow {
  lineNumber?: number
  text: string
  kind: "added" | "removed" | "context" | "empty"
}

export interface SideBySideDiffProps {
  /** Diff lines, in unified order — they get split across two columns. */
  lines: ReadonlyArray<DiffLine>
  /** Path or label shown above the old (left) column. */
  oldLabel: string
  /** Path or label shown above the new (right) column. */
  newLabel: string
  /** Optional old commit short sha. */
  oldRef?: string
  /** Optional new commit short sha. */
  newRef?: string
  /** Optional file path used for aria-label. */
  filePath?: string
  className?: string
}

const MARKER = {
  added: "+",
  removed: "-",
  context: " ",
  empty: " ",
} as const

const ROW_CLASS = {
  added: styles.added,
  removed: styles.removed,
  context: styles.context,
  empty: styles.empty,
} as const

/**
 * Convert unified diff lines into paired left/right rows.
 *
 * Strategy: walk lines, queue removals on the left, additions on the right.
 * Context lines flush both queues and emit a matched row.
 */
function pairLines(lines: ReadonlyArray<DiffLine>): { left: SideRow[]; right: SideRow[] } {
  const left: SideRow[] = []
  const right: SideRow[] = []
  let removedQueue: DiffLine[] = []
  let addedQueue: DiffLine[] = []

  const flushQueues = () => {
    const pairCount = Math.max(removedQueue.length, addedQueue.length)
    for (let i = 0; i < pairCount; i += 1) {
      const removed = removedQueue[i]
      const added = addedQueue[i]
      left.push(
        removed
          ? { kind: "removed", lineNumber: removed.oldLineNumber, text: removed.text }
          : { kind: "empty", text: "" },
      )
      right.push(
        added
          ? { kind: "added", lineNumber: added.newLineNumber, text: added.text }
          : { kind: "empty", text: "" },
      )
    }
    removedQueue = []
    addedQueue = []
  }

  for (const line of lines) {
    if (line.kind === "removed") {
      removedQueue.push(line)
      continue
    }
    if (line.kind === "added") {
      addedQueue.push(line)
      continue
    }
    if (line.kind === "context") {
      flushQueues()
      left.push({ kind: "context", lineNumber: line.oldLineNumber, text: line.text })
      right.push({ kind: "context", lineNumber: line.newLineNumber, text: line.text })
      continue
    }
    // meta lines — render as context on both sides
    flushQueues()
    left.push({ kind: "context", text: line.text })
    right.push({ kind: "context", text: line.text })
  }
  flushQueues()

  return { left, right }
}

export function SideBySideDiff({
  lines,
  oldLabel,
  newLabel,
  oldRef,
  newRef,
  filePath,
  className,
}: SideBySideDiffProps) {
  const { left, right } = pairLines(lines)
  const ariaLabel = filePath
    ? `Side-by-side diff for ${filePath}`
    : `Side-by-side diff between ${oldLabel} and ${newLabel}`
  const classes = [styles.frame, className].filter(Boolean).join(" ")

  return (
    <section role="region" aria-label={ariaLabel} className={classes}>
      <header className={styles.head}>
        <div className={styles.headCell}>
          <span className={styles.headLabel}>{oldLabel}</span>
          {oldRef ? <span className={styles.headRef}>{oldRef}</span> : null}
        </div>
        <div className={styles.headCell}>
          <span className={styles.headLabel}>{newLabel}</span>
          {newRef ? <span className={styles.headRef}>{newRef}</span> : null}
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.column} aria-label={`Old: ${oldLabel}`}>
          {left.map((row, index) => (
            <div
              key={`L-${index}-${row.kind}-${row.text.slice(0, 12)}`}
              className={`${styles.row} ${ROW_CLASS[row.kind]}`}
            >
              <span className={styles.gutter}>{row.lineNumber ?? ""}</span>
              <span className={styles.marker} aria-hidden="true">
                {MARKER[row.kind]}
              </span>
              <span className={styles.text}>{row.text === "" ? " " : row.text}</span>
            </div>
          ))}
        </div>
        <div className={styles.column} aria-label={`New: ${newLabel}`}>
          {right.map((row, index) => (
            <div
              key={`R-${index}-${row.kind}-${row.text.slice(0, 12)}`}
              className={`${styles.row} ${ROW_CLASS[row.kind]}`}
            >
              <span className={styles.gutter}>{row.lineNumber ?? ""}</span>
              <span className={styles.marker} aria-hidden="true">
                {MARKER[row.kind]}
              </span>
              <span className={styles.text}>{row.text === "" ? " " : row.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SideBySideDiff
