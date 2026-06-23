import {
  CHANGELOG_CATEGORY_LABEL,
  type ChangelogCategory,
} from "./dev-experience-types"
import styles from "./sdk-changelog-row.module.css"

export interface SdkChangelogRowProps {
  /** Semver version, e.g. "3.4.0". */
  version: string
  /** Release date, e.g. "2026-05-21". */
  date: string
  /** Categorised chips on the entry. */
  categories: ReadonlyArray<ChangelogCategory>
  /** One-line summary of the entry. */
  summary: string
  /** Optional secondary line — used for breaking-change notes. */
  detail?: string
  /** Optional className passthrough. */
  className?: string
}

const CATEGORY_CLASS: Record<ChangelogCategory, string> = {
  added: styles.catAdded,
  changed: styles.catChanged,
  fixed: styles.catFixed,
  deprecated: styles.catDeprecated,
  removed: styles.catRemoved,
}

export function SdkChangelogRow({
  version,
  date,
  categories,
  summary,
  detail,
  className,
}: SdkChangelogRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`SDK changelog entry ${version} released ${date}`}
    >
      <div className={styles.versionCol}>
        <span className={styles.versionChip}>v{version}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.bodyCol}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <span
              key={cat}
              className={`${styles.cat} ${CATEGORY_CLASS[cat]}`}
            >
              {CHANGELOG_CATEGORY_LABEL[cat]}
            </span>
          ))}
        </div>
        <p className={styles.summary}>{summary}</p>
        {detail ? <p className={styles.detail}>{detail}</p> : null}
      </div>
    </article>
  )
}

export default SdkChangelogRow
