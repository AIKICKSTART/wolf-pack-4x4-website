import Link from "next/link"

import styles from "./release-notes-entry.module.css"

export type ReleaseChangeCategory =
  | "added"
  | "fixed"
  | "changed"
  | "deprecated"
  | "removed"

export interface ReleaseChange {
  category: ReleaseChangeCategory
  label: string
}

interface ReleaseNotesEntryProps {
  version: string
  releaseDate: string
  releaseIso: string
  summary: string
  changes: ReadonlyArray<ReleaseChange>
  readMoreHref?: string
}

const CATEGORY_LABEL: Record<ReleaseChangeCategory, string> = {
  added: "Added",
  fixed: "Fixed",
  changed: "Changed",
  deprecated: "Deprecated",
  removed: "Removed",
}

const CATEGORY_CLASS: Record<ReleaseChangeCategory, string> = {
  added: "chipAdded",
  fixed: "chipFixed",
  changed: "chipChanged",
  deprecated: "chipDeprecated",
  removed: "chipRemoved",
}

export function ReleaseNotesEntry({
  version,
  releaseDate,
  releaseIso,
  summary,
  changes,
  readMoreHref,
}: ReleaseNotesEntryProps) {
  return (
    <article className={styles.entry} aria-labelledby={`release-${version}`}>
      <aside className={styles.aside}>
        <span className={styles.badge}>v{version}</span>
        <time dateTime={releaseIso} className={styles.date}>
          {releaseDate}
        </time>
      </aside>
      <div className={styles.body}>
        <h3 id={`release-${version}`} className={styles.title}>
          {summary}
        </h3>
        <ul className={styles.changes}>
          {changes.map((change, index) => {
            const className = styles[CATEGORY_CLASS[change.category]]
            return (
              <li key={`${change.category}-${index}`} className={styles.changeItem}>
                <span className={[styles.chip, className].filter(Boolean).join(" ")}>
                  {CATEGORY_LABEL[change.category]}
                </span>
                <span className={styles.changeLabel}>{change.label}</span>
              </li>
            )
          })}
        </ul>
        {readMoreHref && (
          <Link className={styles.readMore} href={readMoreHref}>
            Read full changelog
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export default ReleaseNotesEntry
