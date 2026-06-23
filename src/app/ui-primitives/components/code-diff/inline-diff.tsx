import type { DiffLine } from "./code-diff-types"
import styles from "./inline-diff.module.css"

export interface InlineDiffProps {
  /** Diff lines in unified order. */
  lines: ReadonlyArray<DiffLine>
  /** Path label shown in the header. */
  filePath: string
  /** Optional commit ref label (sha or branch). */
  commitRef?: string
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

export function InlineDiff({ lines, filePath, commitRef, className }: InlineDiffProps) {
  const classes = [styles.frame, className].filter(Boolean).join(" ")
  const ariaLabel = `Inline diff for ${filePath}`
  return (
    <section role="region" aria-label={ariaLabel} className={classes}>
      <header className={styles.head}>
        <span className={styles.path}>{filePath}</span>
        {commitRef ? <span className={styles.ref}>{commitRef}</span> : null}
      </header>
      <div className={styles.body}>
        {lines.map((line, index) => {
          const marker = KIND_MARKER[line.kind]
          const oldGutter = line.kind === "added" ? "" : line.oldLineNumber ?? ""
          const newGutter = line.kind === "removed" ? "" : line.newLineNumber ?? ""
          return (
            <div
              key={`${line.kind}-${index}-${line.text.slice(0, 12)}`}
              className={`${styles.line} ${KIND_CLASS[line.kind]}`}
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

export default InlineDiff
