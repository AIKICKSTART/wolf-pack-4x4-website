import { AlertTriangle, GitBranch } from "lucide-react"

import type { ChangelogEntry } from "./api-explorer-types"

import styles from "./changelog-entry-card.module.css"

interface ChangelogEntryCardProps extends ChangelogEntry {
  className?: string
}

export function ChangelogEntryCard({
  version,
  releasedAt,
  summary,
  breakingChange = false,
  items,
  className,
}: ChangelogEntryCardProps) {
  const classes = [styles.card, breakingChange && styles.breaking, className]
    .filter(Boolean)
    .join(" ")
  return (
    <article className={classes} aria-label={`Changelog ${version}`}>
      <header className={styles.head}>
        <span className={styles.versionWrap}>
          <GitBranch size={11} strokeWidth={2.4} aria-hidden="true" className={styles.versionIcon} />
          <span className={styles.version}>{version}</span>
        </span>
        <span className={styles.released}>{releasedAt}</span>
        {breakingChange && (
          <span className={styles.badge}>
            <AlertTriangle size={11} strokeWidth={2.4} aria-hidden="true" />
            Breaking
          </span>
        )}
      </header>

      <p className={styles.summary}>{summary}</p>

      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <span className={styles.itemBullet} aria-hidden="true" />
            <span className={styles.itemBody}>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ChangelogEntryCard
